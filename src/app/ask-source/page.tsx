'use client';

import React from 'react';
import { Chatbot } from '@/components/chatbot/chatbot-page';

const AskSourceChat = () => (
  <>
    <Chatbot className='overflow-y-auto' />
    <div className="hidden lg:block lg:w-22 xl:w-22" />
  </>
)

export default AskSourceChat
