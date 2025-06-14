'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddForumPost() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error',
    message: string
  }>({ type: 'idle', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setStatus({
        type: 'error',
        message: 'Please enter a forum post URL'
      })
      return
    }

    setStatus({ type: 'loading', message: 'Processing forum post...' })

    try {
      const basePath = process.env.VERCEL_ENV === 'production' ? '/docs' : ''
      const response = await fetch(`${basePath}/api/add-forum-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add forum post')
      }

      setStatus({
        type: 'success',
        message: 'Forum post added successfully!'
      })
      setUrl('')
    } catch (error) {
      console.error('Error adding forum post:', error)
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      })
    }
  }

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-[2.25rem] font-normal mb-8 text-[#0f172A] dark:text-white">Add  Community Forum Post</h1>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              Enter the URL of a Sourcegraph community forum post.
            </p>

            <div className="flex w-full items-center space-x-3">
              <Input
                id="url"
                type="text"
                placeholder="Enter Post URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                type="submit"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Processing...' : 'Add Post'}
              </Button>
            </div>
          </div>

          {status.message && (
            <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-700' :
              status.type === 'error' ? 'bg-red-50 text-red-700' :
                'text-vermilion-11'
              }`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
