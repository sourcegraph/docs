import { Langbase } from 'langbase';
import { NextRequest } from 'next/server';

const apiKey = process.env.LANGBASE_API_KEY!;

const langbase = new Langbase({
	apiKey
});

export async function POST(req: NextRequest) {
	const options = await req.json();
	// console.log("🚀 ~ options:", options)

	// Create a new options object with the rewritten query
	const updatedOptions = {
		...options,
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
