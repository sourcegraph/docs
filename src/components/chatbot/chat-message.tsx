import {Message} from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import {ChatMessageActions} from './chat-message-actions';
import {MemoizedReactMarkdown} from './markdown';
import {CodeBlock} from './ui/codeblock';
import {IconUser} from '../icons/UserIcon';
import cn from 'mxcn';
import SourceGraphIcon from '@/components/icons/SourceGraphIcon';

export interface ChatMessageProps {
	message: Message;
}

export function ChatMessage({message, ...props}: ChatMessageProps) {
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
					'flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl border bg-light-bg p-1 text-primary shadow dark:bg-dark-bg'
				)}
			>
				{message.role === 'user' ? (
					<IconUser className="h-5 w-5" />
				) : (
					<SourceGraphIcon className="h-5 w-5" />
				)}
			</div>
			<div className="ml-4 flex-1 space-y-2 px-1">
				<MemoizedReactMarkdown
					className="prose break-words rounded-xl dark:prose-invert prose-p:leading-relaxed prose-pre:rounded-xl prose-pre:p-0"
					remarkPlugins={[remarkGfm, remarkMath]}
					components={{
						p({children}) {
							return <p className="mb-2 last:mb-0">{children}</p>;
						},
						code({node, inline, className, children, ...props}) {
							if (children.length) {
								if (children[0] == '▍') {
									return (
										<span className="mt-1 animate-pulse cursor-default">
											▍
										</span>
									);
								}

								children[0] = (children[0] as string).replace(
									'`▍`',
									'▍'
								);
							}

							const match = /language-(\w+)/.exec(
								className || ''
							);

							if (inline) {
								return (
									<code className={className} {...props}>
										{children}
									</code>
								);
							}

							return (
								<CodeBlock
									key={Math.random()}
									language={(match && match[1]) || ''}
									value={String(children).replace(/\n$/, '')}
									{...props}
								/>
							);
						}
					}}
				>
					{message.content}
				</MemoizedReactMarkdown>
				<ChatMessageActions message={message} />
			</div>
		</div>
	);
}
