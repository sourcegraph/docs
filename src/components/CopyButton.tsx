'use client'

import { useState } from 'react'
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline'

export function CopyButton({ text, lang }: { text: string, lang: string }) {
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
    <div className="absolute inline-flex items-center top-0 pt-0.5 pb-0.5 right-0 left-0 w-full border-b-0.1 border-gray-500 rounded-t-lg shadow">
      <div className="relative flex justify-between items-center w-full">
        <div className="text-xs pl-3 pt-0.5 text-dark-text-muted">{lang.toUpperCase()}</div>
        <div className="relative">
          <button
            onClick={handleCopy}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative flex items-center justify-center mr-1 p-2 rounded transition text-gray-300 hover:text-white focus:outline-none"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
            ) : (
              <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" title="Copy to clipboard" />
            )}
          </button>
          {showTooltip && copied && (
            <span className="absolute top-1/2 right-full transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity duration-300">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
