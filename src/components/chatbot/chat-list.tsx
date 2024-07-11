import {type Message} from 'ai';

import {Separator} from './ui/separator';
import {ChatMessage} from './chat-message';

export interface ChatList {
	messages: Message[];
}

export function ChatList({messages}: ChatList) {
	return (
		<div className="relative mx-auto w-full max-w-5xl overflow-y-auto px-10">
			<div className="mb-8 flex-shrink-0">
				<h1 className="text-2xl font-semibold">Ask Sourcegraph AI</h1>
				<p className="subtitle mt-4 opacity-70">
					Find precise answers to any question about Sourcegraph
					documentation with our AI chatbot.
				</p>
			</div>
			{messages?.map((message, index) => (
				<div key={index}>
					<ChatMessage message={message} />
					{index < messages.length - 1 && (
						<Separator className="my-4 md:my-8" />
					)}
				</div>
			))}
		</div>
	);
}
