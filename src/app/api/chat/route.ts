import { Langbase } from 'langbase';
import { NextRequest } from 'next/server';

const apiKey = process.env.LANGBASE_API_KEY!;

const langbase = new Langbase({
	apiKey
});

export async function POST(req: NextRequest) {
	const options = await req.json();

	const { stream, threadId } = await langbase.pipe.run({
		...options,
		name: 'ask-sourcegraph-docs'
	});

	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? ''
		}
	});
}
