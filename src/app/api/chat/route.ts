import {OpenAIStream, StreamingTextResponse} from 'ai';

export const runtime = 'edge';

/**
 * Stream AI Chat Messages from Langbase
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
	try {
		if (!process.env.NEXT_LB_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
			);
		}

		const endpointUrl = 'https://api.langbase.com/beta/chat';
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
		};

		// Get chat prompt messages and threadId from the client.
		const body = await req.json();
		const {messages, threadId} = body;

		const requestBody = {
			messages,
			...(threadId && {threadId}) // Only include threadId if it exists
		};

		// Send the request to Langbase API.
		const response = await fetch(endpointUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			const res = await response.json();
			throw new Error(`Error ${res.error.status}: ${res.error.message}`);
		}

		// Handle Langbase response, which is a stream in OpenAI format.
		const stream = OpenAIStream(response);
		// Respond with a text stream.
		return new StreamingTextResponse(stream, {
			headers: response.headers
		});
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), {status: 500});
	}
}
