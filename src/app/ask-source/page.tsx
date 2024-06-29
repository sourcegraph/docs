'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import SourceGraphIcon from '@/components/icons/SourceGraphIcon';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const AskSourceChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'What is Sourcegraph? What is Sourcegraph? What is Sourcegraph? What is Sourcegraph? What is Sourcegraph?' },
    { sender: 'bot', text: 'Sourcegraph is a code search and intelligence tool. Sourcegraph is a code search and intelligence tool.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Add state for user login
  const charLimit = 250;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: inputValue }]);
    setInputValue('');
    setCharCount(0);

    // Dummy bot response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Thank you for your message!' }]);
      scrollToBottom();
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-90px)] p-4">
        <div className="flex-shrink-0 mb-4">
          <h1 className="text-2xl font-bold">Ask Sourcegraph</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get information faster by asking our AI chatbot assistant.</p>
        </div>
        <div className="flex-1 no-scrollbar overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={clsx('flex mb-4', {
                'justify-end': message.sender === 'user',
                'justify-start': message.sender === 'bot'
              })}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="rounded-full h-10 w-10 p-1.5 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <SourceGraphIcon />
                  </div>
                </div>
              )}
              <div className={clsx('p-2 rounded-lg max-w-[90%]', {
                'bg-[#62BECC] text-white justify-end': message.sender === 'user',
                'bg-gray-200 dark:bg-gray-600 text-black dark:text-white justify-start': message.sender === 'bot'
              })}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {!isLoggedIn && (
          <div className="flex items-center justify-center h-full">
            <button className="p-3 text-white w-48 bg-[#62BECC] rounded-md shadow-md font-bold">
              Log in to unlock
            </button>
          </div>
        )}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-[#62BECC] focus:border-transparent"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={charLimit}
                placeholder="Follow up..."
                disabled={!isLoggedIn}
              />
              <button
                className="p-2 text-white bg-[#62BECC] rounded-md shadow-md"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{charCount}/{charLimit}</p>
          </div>
      </div>
      <div className="hidden lg:block lg:w-64 xl:w-72"></div>
    </>
  );
};

export default AskSourceChat;
