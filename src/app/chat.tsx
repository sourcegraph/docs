'use client';

import {Chatbot} from '@langbase/components';
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
						title: `What are the input/output token limits for Cody?`,
						prompt: `What are the input/output token limits for Cody?`
					},
					{
						title: `Why doesn't Cody work with VPN?`,
						prompt: `Why doesn't Cody work with VPN?`
					},
					{
						title: `How do I add all open files to context in Cody?`,
						prompt: `How do I add all open files to context in Cody?`
					},
					{
						title: `What is Sourcegraph search query syntax?`,
						prompt: `What is Sourcegraph search query syntax?`
					},
					{
						title: `Give me language specific query examples?`,
						prompt: `Give me language specific query examples?`
					}
				]}
			/>
		</div>
	);
}
