'use client';

import { Chatbot } from '@langbase/components';
import '@langbase/components/styles';

export default function Chat() {
	return (
		<div>
			<style jsx>{`
				#langbase-chatbot [type='submit'] {
					background-color: #dedede;
				}
			`}</style>
			<Chatbot
				title="Ask AI"
				triggerText="Ask AI"
				badge="Experimental"
				apiRoute="/docs/api/chat"
				openingMessage="Hi there! I'm Sourcegraph's AI assistant trained for our documentation. How can I help you?"
				// Remember AI can make mistakes, please double-check responses.
				suggestions={[
					{
						title: `Tell me about Sourcegraph.`,
						prompt: `Tell me about Sourcegraph.`
					},
					{
						title: `What is Deep Search?`,
						prompt: `What is Deep Search?`
					},
					{
						title: `What is Sourcegraph search query syntax?`,
						prompt: `What is Sourcegraph search query syntax?`
					},
					{
						title: `Give me language specific query examples?`,
						prompt: `Give me language specific query examples?`
					},
					{
						title: `How to create a Batch Change?`,
						prompt: `How to create a Batch Change?`
					},
					{
						title: `Create a Code Insight`,
						prompt: `How to create a Code Insight?`
					},

				]}
			/>
		</div>
	);
}
