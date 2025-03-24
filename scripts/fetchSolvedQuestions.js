const fs = require('fs');
const path = require('path');

// Function to fetch solved topics
async function fetchSolvedTopics() {
	try {
		const searchUrl =
			'https://community.sourcegraph.com/search.json?q=status:solved';
		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.posts;
	} catch (error) {
		console.error('Error fetching solved topics:', error);
		return [];
	}
}

// Function to fetch full topic details
async function fetchTopicDetails(topicId) {
	try {
		const topicUrl = `https://community.sourcegraph.com/t/${topicId}.json`;
		const response = await fetch(topicUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching topic ${topicId}:`, error);
		return null;
	}
}

// Function to process and save solved questions and answers
async function processAndSaveSolvedQuestions() {
	const solvedTopics = await fetchSolvedTopics();
	const results = [];

	for (const topic of solvedTopics) {
		const topicDetails = await fetchTopicDetails(topic.topic_id);

		if (
			topicDetails &&
			topicDetails.post_stream &&
			topicDetails.post_stream.posts
		) {
			const posts = topicDetails.post_stream.posts;

			// Extract the question (first post)
			const question = posts[0].cooked;

			// Find the accepted answer - look specifically for the post with accepted_answer: true
			let solution = null;

			const acceptedAnswerPost = posts.find(
				post => post.accepted_answer === true
			);

			if (acceptedAnswerPost) {
				solution = acceptedAnswerPost.cooked;
			} else if (posts.length > 1) {
				// If no post is marked as accepted_answer, use the first reply as a fallback
				solution = posts[1].cooked;
			}

			if (question && solution) {
				results.push({
					topic_id: topic.topic_id,
					title: topicDetails.title,
					question,
					solution
				});
			}
		}
	}

	// Create the data directory if it doesn't exist
	const dataDir = path.join(
		__dirname,
		'../baseai/memory/community-forum/data'
	);
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, {recursive: true});
	}

	// Save all topics in a single JSON file
	fs.writeFileSync(
		path.join(dataDir, 'forum-topics.json'),
		JSON.stringify(results, null, 2)
	);

	console.log(
		'Solved questions and answers saved to baseai/memory/community-forum/data/forum-topics.json'
	);
}

// Run the script
processAndSaveSolvedQuestions();
