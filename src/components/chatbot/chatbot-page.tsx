'use client';

import { useChat, type Message } from 'ai/react';
import cn from 'mxcn';
import { useState } from 'react';
import { toast } from 'sonner';
import { ChatInput } from './chat-input';
import { ChatList } from './chat-list';

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string; // Optional: Thread ID if you want to persist the chat in a DB
  initialMessages?: Message[]; // Optional: Messages to pre-populate the chat from DB
}

export function Chatbot({ id, initialMessages, className }: ChatProps) {
  const [threadId, setThreadId] = useState<null | string>(null);

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: '/api/chat',
      initialMessages,
      body: { threadId },
      onResponse(response) {
        if (response.status !== 200) {
          console.log('✨ ~ response:', response);
          toast.error(response.statusText);
        }

        // Get Thread ID from response header
        const lbThreadId = response.headers.get('lb-thread-id');
        setThreadId(lbThreadId);
      }
    });

  return (
    <div
      className={cn(
        'relative flex min-h-[80vh] min-w-0 flex-auto flex-col px-4 py-16 text-slate-800 dark:text-slate-200 lg:pl-8 lg:pr-0 xl:px-16',
        className
      )}
    >
      <div className="mx-auto mb-8 w-full max-w-3xl flex-shrink-0">
        <h1 className="text-2xl font-semibold">Ask AI</h1>
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
        <ChatList messages={messages} isLoading={isLoading} />
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
