import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to convert HTML to plain text
function htmlToText(html: string): string {
	// Remove HTML tags
	let text = html.replace(/<[^>]*>/g, ' ');

	// Replace HTML entities
	text = text
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&nbsp;/g, ' ');

	// Replace multiple spaces with a single space
	text = text.replace(/\s+/g, ' ');

	// Trim leading and trailing spaces
	return text.trim();
}

export async function POST(request: NextRequest) {
	try {
		const {url} = await request.json();

		if (!url) {
			return NextResponse.json({error: 'URL is required'}, {status: 400});
		}

		// Extract the topic ID from the URL
		let topicUrl = url;

		// Ensure the URL ends with .json
		if (!topicUrl.endsWith('.json')) {
			topicUrl = `${topicUrl}.json`;
		}

		// Fetch the topic data
		const response = await fetch(topicUrl);

		if (!response.ok) {
			return NextResponse.json(
				{
					error: `Failed to fetch topic: ${response.status} ${response.statusText}`
				},
				{status: 500}
			);
		}

		const topicData = await response.json();

		if (
			!topicData.post_stream ||
			!topicData.post_stream.posts ||
			topicData.post_stream.posts.length === 0
		) {
			return NextResponse.json(
				{error: 'Invalid topic data format'},
				{status: 400}
			);
		}

		const posts = topicData.post_stream.posts;

		// Find the accepted answer
		let solution = null;

		// First check if there's an accepted_answer object at the root level with excerpt
		if (topicData.accepted_answer && topicData.accepted_answer.excerpt) {
			// Use the excerpt directly as it's already in plain text
			solution = htmlToText(topicData.accepted_answer.excerpt);

		} else {
			// If no excerpt, try to find the post with the matching post_number
			let solutionHtml = null;

			if (
				topicData.accepted_answer &&
				topicData.accepted_answer.post_number
			) {
				const acceptedPost = posts.find(
					post =>
						post.post_number ===
						topicData.accepted_answer.post_number
				);
				if (acceptedPost) {
					solutionHtml = acceptedPost.cooked;
				}
			}

			// If still no solution, try the post.accepted_answer property
			if (!solutionHtml) {
				const acceptedAnswerPost = posts.find(
					post => post.accepted_answer === true
				);

				if (acceptedAnswerPost) {
					solutionHtml = acceptedAnswerPost.cooked;
				} else if (posts.length > 1) {
					// If no post is marked as accepted_answer, use the first reply as a fallback
					solutionHtml = posts[1].cooked;
				}
			}

			if (solutionHtml) {
				solution = htmlToText(solutionHtml);
			}
		}

		if (!solution) {
			return NextResponse.json(
				{
					error: 'Could not extract solution from the topic'
				},
				{status: 400}
			);
		}

		// Extract the original URL without .json
		const originalUrl = url.endsWith('.json')
			? url.substring(0, url.length - 5)
			: url;

		// Create a more descriptive title
		const descriptiveTitle = topicData.title
			? `Troubleshooting ${topicData.title.toLowerCase()}`
			: posts[0].topic_slug.replace(/-/g, ' ');

		// Create the new entry with the target structure
		const newEntry = {
			url: originalUrl,
			title: descriptiveTitle,
			answer: solution
		};

		// Read the existing data
		const dataFilePath = path.join(
			process.cwd(),
			'baseai/memory/community-forum/data/forum-topics.json'
		);
		let existingData = [];

		try {
			const fileContent = fs.readFileSync(dataFilePath, 'utf8');
			existingData = JSON.parse(fileContent);
		} catch (error) {
			console.error('Error reading forum-topics.json:', error);
			// If file doesn't exist or is empty, we'll start with an empty array
		}

		// Check if the topic already exists (by URL)
		const existingIndex = existingData.findIndex(
			item => item.url === newEntry.url
		);

		if (existingIndex !== -1) {
			// Update existing entry
			existingData[existingIndex] = newEntry;
		} else {
			// Add new entry
			existingData.push(newEntry);
		}

		// Write the updated data back to the file
		fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

		return NextResponse.json({
			success: true,
			message: 'Forum post added successfully',
			entry: newEntry
		});
	} catch (error) {
		console.error('Error processing forum post:', error);
		return NextResponse.json(
			{
				error: 'Failed to process forum post'
			},
			{status: 500}
		);
	}
}
