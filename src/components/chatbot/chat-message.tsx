import {Message} from 'ai';
import {Sparkles} from 'lucide-react';
import cn from 'mxcn';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import {useEffect, useState} from 'react';
import {IconUser} from '../icons/UserIcon';
import {ChatMessageActions} from './chat-message-actions';
import {MemoizedReactMarkdown} from './markdown';
import {CodeBlock} from './ui/codeblock';

export interface ChatMessageProps {
	message: Message;
	isLoading?: boolean;
}

export function ChatMessage({
	message,
	isLoading = false,
	...props
}: ChatMessageProps) {
	const [analysisState, setAnalysisState] = useState(0);
	const analysisMessages = ['Thinking...', 'Analyzing...', 'Planning...'];

	useEffect(() => {
		if (isLoading) {
			const interval = setInterval(() => {
				setAnalysisState(prev => (prev + 1) % analysisMessages.length);
			}, 2000); // Change state every 2 seconds
			return () => clearInterval(interval);
		}
	}, [isLoading]);

	const stateStyles = ['text-cyan-500', 'text-[#ec624d]', 'text-[#9424f5]'];
	return (
		<div
			className={cn(
				'group relative mb-4 flex',
				message.content.length > 60 ? 'items-start' : 'items-center'
			)}
			{...props}
		>
			<div
				className={cn(
					'flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl border border-light-border bg-light-bg p-1 text-primary shadow dark:border-dark-border dark:bg-dark-bg'
				)}
			>
				{message.role === 'user' && !isLoading ? (
					<IconUser className="h-5 w-5" />
				) : (
					<Sparkles
						color="#62BECC"
						className="hidden h-5 w-5 sm:block"
					/>
				)}
			</div>
			<div className="ml-4 flex-1 space-y-2 px-1">
				{isLoading ? (
					<div className="space-y-2">
						<div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
						<div className="h-4 w-2/4 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
						<div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>

						<p
							className={`animate-fade text-sm transition-all duration-500 ease-in-out ${stateStyles[analysisState]}`}
						>
							{analysisMessages[analysisState]}
						</p>
					</div>
				) : (
					<>
						<MemoizedReactMarkdown
							className="prose break-words rounded-xl dark:prose-invert prose-p:leading-relaxed prose-pre:rounded-xl prose-pre:p-0"
							remarkPlugins={[remarkGfm, remarkMath]}
							components={{
								p({children}) {
									return (
										<p className="mb-2 last:mb-0">
											{children}
										</p>
									);
								},
								code({
									node,
									inline,
									className,
									children,
									...props
								}) {
									if (children.length) {
										if (children[0] === '▍') {
											return (
												<span className="mt-1 animate-pulse cursor-default">
													▍
												</span>
											);
										}

										children[0] = (
											children[0] as string
										).replace('`▍`', '▍');
									}

									const match = /language-(\w+)/.exec(
										className || ''
									);

									if (inline) {
										return (
											<code
												className={className}
												{...props}
											>
												{children}
											</code>
										);
									}

									return (
										<CodeBlock
											key={Math.random()}
											language={(match && match[1]) || ''}
											value={String(children).replace(
												/\n$/,
												''
											)}
											{...props}
										/>
									);
								}
							}}
						>
							{message.content}
						</MemoizedReactMarkdown>
						<ChatMessageActions message={message} />
					</>
				)}
			</div>
		</div>
	);
}
