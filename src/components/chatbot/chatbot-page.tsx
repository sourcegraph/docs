'use client';

import {useChat, type Message} from 'ai/react';
import cn from 'mxcn';
import {useState} from 'react';
import {toast} from 'sonner';
import {ChatInput} from './chat-input';
import {ChatList} from './chat-list';

export interface ChatProps extends React.ComponentProps<'div'> {
	id?: string;
	initialMessages?: Message[];
}

export function Chatbot({id, initialMessages, className}: ChatProps) {
	const [threadId, setThreadId] = useState<null | string>(null);
	const [isStreaming, setIsStreaming] = useState(false);

	const {messages, append, reload, stop, isLoading, input, setInput} =
		useChat({
			api: '/docs/api/chat',
			initialMessages,
			body: {threadId},
			onResponse(response) {
				if (response.status !== 200) {
					toast.error(response.statusText);
				}

				const lbThreadId = response.headers.get('lb-thread-id');
				setThreadId(lbThreadId);
				setIsStreaming(true);
			},
			onFinish() {
				setIsStreaming(false);
			}
		});

	return (
		<div
			className={cn(
				'relative flex min-h-[80vh] min-w-0 flex-auto flex-col px-4 pt-16 text-slate-800 lg:pl-8 lg:pr-0 xl:px-16 dark:text-slate-200',
				className
			)}
		>
			<div className="mx-auto mb-8 w-full max-w-3xl flex-shrink-0">
				<h1 className="text-2xl font-semibold text-slate-100">
					Ask AI
				</h1>
				<p className="subtitle my-2 opacity-70">
					Find precise answers to any question about Sourcegraph
					documentation with our AI chatbot.
				</p>
			</div>
			<div
				className={cn(
					'relative max-h-[50vh] flex-1 overflow-y-auto pb-4',
					className
				)}
			>
				<ChatList
					messages={messages}
					isLoading={isLoading}
					isStreaming={isStreaming}
				/>
			</div>

			<ChatInput
				id={id}
				isLoading={isLoading}
				stop={stop}
				append={append}
				reload={reload}
				messages={messages}
				input={input}
				setInput={setInput}
			/>
		</div>
	);
}
