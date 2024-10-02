"use client"

import React from 'react';
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import '@stoplight/elements/styles.min.css';
import './styles.css';

interface OpenApiProps {
  apiDescriptionUrl: string;
  router: 'history' | 'hash' | 'memory';
}

// @ts-ignore - Ignoring TypeScript errors for dynamic import
const OpenAPi = dynamic<OpenApiProps>(() => import('@stoplight/elements').then(mod => mod.API), {
  ssr: false
})

const OpenApiPage: React.FC = () => (
  <div className="App">
    <nav className='p-6 bg-white'>
      <Link href='/' className="!font-grotesk group inline-flex items-center text-sm text-gray-600 hover:text-gray-800 font-medium">
        <ArrowLeftIcon className="inline h-3 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Docs
      </Link>
    </nav>
    <OpenAPi
      apiDescriptionUrl="./openapi/openapi.Sourcegraph.Latest.yaml"
      router="hash"
    />
  </div>
)

export default OpenApiPage
