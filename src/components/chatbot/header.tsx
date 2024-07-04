import { buttonVariants } from './ui/button'
import cn from 'mxcn'
import Link from 'next/link'
import { IconFork, IconGitHub } from './ui/icons'

export async function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4">
      <div className="flex h-16 shrink-0 items-center">
        <h1>
          <Link href="/" className="font-bold">
            <span
              aria-hidden="true"
              className="border-muted-foreground/10 bg-muted mr-1 select-none rounded-lg border px-[0.2rem] py-[0.1rem] text-sm font-bold shadow-2xl"
            >
              ⌘
            </span>
            Langbase
          </Link>
        </h1>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-chatbot"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden md:flex">GitHub</span>
        </a>
        <a
          target="_blank"
          href="https://beta.langbase.com/examples/ai-chatbot"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <IconFork />
          <span className="hidden md:flex gap-1">
            Fork on <span className="font-bold">Langbase</span>
          </span>
        </a>
      </div>
    </header>
  )
}
