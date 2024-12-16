import { NextRequest } from 'next/server';
import { Langbase } from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!
});

export async function POST(req: NextRequest) {
  console.log('request herere')
	const options = await req.json();
	const { stream, threadId } = await langbase.pipe.run({
		...options,
		name: 'docs-agent-cody-api'
	});

	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? ''
		}
	});
}
