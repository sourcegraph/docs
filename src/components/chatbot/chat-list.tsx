import {type Message} from 'ai';
import {ChatMessage} from './chat-message';
import {Separator} from './ui/separator';

export interface ChatList {
	messages: Message[];
	isLoading: boolean;
	isStreaming: boolean;
}

const exampleMessage: Message = {
	id: '1',
	content: 'Hello, ask me anything related to Sourcegraph.',
	role: 'assistant'
};

export function ChatList({messages, isLoading, isStreaming}: ChatList) {
	return (
		<div className="relative mx-auto w-full max-w-3xl overflow-y-auto">
			{messages.length === 0 && <ChatMessage message={exampleMessage} />}
			{messages?.map((message, index) => (
				<div key={index}>
					<ChatMessage message={message} />
					{index < messages.length - 1 && (
						<Separator className="my-4 md:my-8" />
					)}
					{isLoading &&
						!isStreaming &&
						messages.length === index + 1 && (
							<>
								<Separator className="my-4 md:my-8" />
								<ChatMessage
									message={message}
									isLoading={isLoading}
								/>
							</>
						)}
				</div>
			))}
		</div>
	);
}
