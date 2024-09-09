import {type Message} from 'ai';
import {useEffect, useRef, useState} from 'react';
import {ChatMessage} from './chat-message';
import {Separator} from './ui/separator';

export interface ChatList {
	messages: Message[];
	isLoading: boolean;
	isStreaming: boolean;
}

const exampleMessage: Message = {
	id: '1',
	content: '👋 Ask me anything about Sourcegraph.',
	role: 'assistant'
};

export function ChatList({messages, isLoading, isStreaming}: ChatList) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [autoScroll, setAutoScroll] = useState(true);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	useEffect(() => {
		if (autoScroll) {
			scrollToBottom();
		}
	}, [messages, isStreaming, autoScroll]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const {scrollTop, scrollHeight, clientHeight} = container;
			const atBottom = scrollHeight - scrollTop === clientHeight;
			setAutoScroll(atBottom);
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative mx-auto w-full max-w-3xl overflow-y-auto"
			style={{maxHeight: 'calc(100vh - 200px)'}} // Adjust this value as needed
		>
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
			<div ref={messagesEndRef} />
		</div>
	);
}
