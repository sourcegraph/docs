'use client'

import { ChatList } from './chat-list'
import { useChat, type Message } from 'ai/react'
import cn from 'mxcn'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string // Optional: Thread ID if you want to persist the chat in a DB
  initialMessages?: Message[] // Optional: Messages to pre-populate the chat from DB
}

export function Chatbot({ id, initialMessages, className }: ChatProps) {
  const [threadId, setThreadId] = useState<null | string>(null)
  
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: '/api/chat',
      initialMessages,
      body: { threadId },
      onResponse(response) {
        if (response.status !== 200) {
          console.log('✨ ~ response:', response)
          toast.error(response.statusText)
        }

        // Get Thread ID from response header
        const lbThreadId = response.headers.get('lb-thread-id')
        setThreadId(lbThreadId)
      }
    })

  return (
    <div className={cn('min-w-0 flex-auto py-16 lg:pl-8 lg:pr-0 xl:px-16 flex flex-col h-[calc(100vh-20px)]', className)}>
      <div className={cn('flex-1 overflow-y-auto pb-4', className)}>
        <ChatList messages={messages} />
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
  )
}
