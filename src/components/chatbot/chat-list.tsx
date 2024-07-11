import {type Message} from 'ai';

import {Separator} from './ui/separator';
import {ChatMessage} from './chat-message';

export interface ChatList {
	messages: Message[];
}

const exampleMessage: Message = {
	id: '1',
	content: 'Hello, how can I help you today?',
	role: 'assistant'
};

export function ChatList({messages}: ChatList) {
	return (
		<div className="relative mx-auto w-full max-w-3xl overflow-y-auto">
			{messages.length === 0 && <ChatMessage message={exampleMessage} />}
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
