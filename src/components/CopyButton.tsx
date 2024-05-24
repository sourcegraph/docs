'use client'

import { useState } from 'react'
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setShowTooltip(true)
      setTimeout(() => {
        setCopied(false)
        setShowTooltip(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="absolute inline-flex items-center top-2 right-2">
      <button
        onClick={handleCopy}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center p-2 text-white-500 rounded transition duration-300 ease-in-out hover:scale-125 focus:outline-none"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        ) : (
          <DocumentDuplicateIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {showTooltip && copied && (
        <span className="absolute top-0 right-full mt-2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity duration-300">
          Copied!
        </span>
      )}
    </div>
  )
}
