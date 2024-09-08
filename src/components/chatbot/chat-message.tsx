import {Message} from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import cn from 'mxcn';
import {Sparkles} from 'lucide-react';

import {ChatMessageActions} from './chat-message-actions';
import {MemoizedReactMarkdown} from './markdown';
import {CodeBlock} from './ui/codeblock';
import {IconUser} from '../icons/UserIcon';

export interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({message, isLoading = false, ...props}: ChatMessageProps) {
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
        {message.role === 'user' && !isLoading ? (
          <IconUser className="h-5 w-5" />
        ) : (
          <Sparkles color="#62BECC" className="hidden h-5 w-5 sm:block" />
        )}
      </div>
      <div className="ml-4 flex-1 space-y-2 px-1">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-2/4 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-1/2 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <p className="text-gray-500 text-sm animate-text-fade">Analyzing...</p>
          </div>
        ) : (
          <>
            <MemoizedReactMarkdown
              className="prose break-words rounded-xl dark:prose-invert prose-p:leading-relaxed prose-pre:rounded-xl prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                code({ node, inline, className, children, ...props }) {
                  if (children.length) {
                    if (children[0] === '▍') {
                      return (
                        <span className="mt-1 animate-pulse cursor-default">
                          ▍
                        </span>
                      );
                    }

                    children[0] = (children[0] as string).replace('`▍`', '▍');
                  }

                  const match = /language-(\w+)/.exec(className || '');

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
          </>
        )}
      </div>
    </div>
  );
}
