'use client';

import { Chatbot } from '@langbase/components';

import './styles.css'

export default function App() {

  return (
    <Chatbot
      badge='Experimental'
      apiRoute="/docs/api/chat"
      openingMessage='Find precise answers to any question about Sourcegraph documentation with our AI chatbot.'
      suggestions={[
        {
          title: `Explain how to get started in easy steps`,
          prompt: `Explain how to get started in easy steps?`,
        },
        {
          title: `How do I create an API key?`,
          prompt: `How do I create an API key?`,
        },
        {
          title: `What are the supported providers?`,
          prompt: `What are the supported providers?`,
        },
        {
          title: `How do I reset my password?`,
          prompt: `How do I reset my password?`,
        },
      ]}
      customStyles={{
        chatBtn: {
          foregroundColor: '#14171F',
        },
      }}
    />
  );
}
