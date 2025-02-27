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
						title: `What is Sourcegraph?`,
						prompt: `What is Sourcegraph?`
					},
					{
						title: `What is Cody?`,
						prompt: `What is Cody?`
					},
					{
						title: `Search query syntax`,
						prompt: `What is the search query syntax?`
					},
					{
						title: `Language specific query examples`,
						prompt: `Give me language specific query examples?`
					}
				]}
			/>
		</div>
	);
}
