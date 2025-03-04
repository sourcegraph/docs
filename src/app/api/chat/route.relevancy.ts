import { Langbase } from 'langbase';
import { NextRequest } from 'next/server';

const apiKey = process.env.LANGBASE_API_KEY!;

const langbase = new Langbase({
	apiKey
});

export async function POST(req: NextRequest) {
	const options = await req.json();

	// Check if relevant
	let parsedResponse;
	let attempts = 0;
	const maxAttempts = 5;

	while (attempts < maxAttempts) {
		try {
			const router = await langbase.pipe.run({
				...options,
				name: 'agent-router-related-to-sourcegraph',
				stream: false,
				variables: [{ name: 'userQuery', value: options.messages[0].content }],
			});

			// @ts-expect-error — TODO: Fix by reporting to Langbase
			parsedResponse = JSON.parse(router.completion);
			break;
		} catch (error) {
			attempts++;
			if (attempts === maxAttempts) {
				return new Response(JSON.stringify({ error: "Service not working at the moment. Please refresh and try again." }), {
					status: 500,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
		}
	}

	// console.log("🚀 ~ parsedResponse:", parsedResponse)


	// If not relevant, return a stream mimicking Langbase's structure
	if (!parsedResponse.relevant) {

		// console.log("🚀 Asking non relevant agent")

		// Ask not relevant questions from agent ask-sourcegraph-docs-unrelated-queries
		const { stream, threadId } = await langbase.pipe.run({
			...options,
			name: 'ask-sourcegraph-docs-unrelated-queries'
		});

		return new Response(stream, {
			status: 200,
			headers: {
				'lb-thread-id': threadId ?? ''
			}
		});

	}

	// Handle relevant question
	// console.log("🚀 Asking relevant agent")

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




// Pretend answer is not relevant.
// const encoder = new TextEncoder();
// const stream = new ReadableStream({
//   start(controller) {
//     const chunk = {
//       id: `cmpl-${Math.random().toString(36).substr(2, 10)}`,
//       object: 'chat.completion.chunk' as const,
//       created: Math.floor(Date.now() / 1000),
//       model: 'gpt-3.5-turbo',
//       choices: [{
//         index: 0,
//         delta: { content: 'Please ask a relevant question to Sourcegraph.' },
//         logprobs: null,
//         finish_reason: 'stop'
//       }]
//     };
//     controller.enqueue(encoder.encode(JSON.stringify(chunk)));
//     controller.close();
//   }
// });

// return new Response(stream, {
//   status: 200,
//   headers: {
//     // Omit 'Content-Type' to allow stream processing
//   }
// });
