import { type Message } from 'ai'

import { Separator } from './ui/separator'
import { ChatMessage } from './chat-message'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  return (
    <div className="relative mx-auto max-w-5xl px-10 w-full h-full overflow-y-auto">
      <div className="flex-shrink-0 mb-8">
        <h1 className="text-2xl font-semibold">Ask Sourcegraph</h1>
        <p className="subtitle">Get information faster by asking our AI chatbot assistant.</p>
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
  )
}
