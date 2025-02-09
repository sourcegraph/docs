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
			<Chatbot apiRoute="/docs/api/chat"
				openingMessage="Hi there! Welcome to Ask Sourcegraph AI agent. How can I help you?"
				// Remember AI can make mistakes, please double-check responses.
				suggestions={[
					{
						title: `What is SourceGraph?`,
						prompt: `What is SourceGraph?`
					},
					{
						title: `What is Cody?`,
						prompt: `What is Cody?`
					},
					{
						title: `What can I do with Cody?`,
						prompt: `What can I do with Cody?`
					},
					{
						title: `What are search query types?`,
						prompt: `What are search query types?`
					}
				]}
			/>
		</div>
	);
}
