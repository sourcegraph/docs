import { Langbase } from 'langbase';
import { NextRequest } from 'next/server';

const apiKey = process.env.LANGBASE_API_KEY!;

const langbase = new Langbase({
	apiKey
});

export async function POST(req: NextRequest) {
	const options = await req.json();
	console.log("🚀 ~ options:", options)

	const { completion } = await langbase.pipes.run({
		name: 'query-rewrite',
		messages: [
			{
				role: 'user',
				content: options.messages[options.messages.length - 1].content,
			},
		],
		stream: false
	});
	console.log("🚀 ~ completion:", completion)


	// Parse the completion to get the rewritten query
	const rewrittenQuery = JSON.parse(completion).rewrittenQuery;
	console.log("🚀 ~ rewrittenQuery:", rewrittenQuery)

	// Create a new options object with the rewritten query
	const updatedOptions = {
		...options,
		messages: [
			...options.messages.slice(0, -1), // Keep all messages except the last one
			{
				role: 'user',
				content: rewrittenQuery
			}
		],
		name: 'ask-sourcegraph-docs',
		lastMessageOnly: true,
	};
	console.log("🚀 ~ updatedOptions:", updatedOptions)

	const { stream, threadId } = await langbase.pipes.run(updatedOptions);

	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? ''
		}
	});
}
