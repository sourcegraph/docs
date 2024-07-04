import Link from 'next/link'

export function Opening() {
  return (
    <div className="mx-auto max-w-3xl px-2 sm:max-w-4xl sm:px-0">
      <div className="light:ring-ring:ring-border ring-ring/10 relative my-7 rounded-lg py-3.5 pl-[1.625rem] pr-4 ring-1 ring-inset [--callout-border:theme(colors.indigo.400)] [--callout-icon:theme(colors.indigo.400)] [--callout-title:theme(colors.indigo.400)] dark:[--callout-border:theme(colors.indigo.400)] dark:[--callout-icon:theme(colors.indigo.400)] dark:[--callout-title:theme(colors.indigo.400)] [&>*]:my-0 [&>*]:py-0">
        <div className="absolute inset-y-2 left-2 w-0.5 rounded-full bg-[--callout-border]"></div>
        <div className="mb-2 mt-0 flex items-center justify-start gap-1">
          <span className="text-xs font-medium text-[--callout-title]">
            Chatbot Example
          </span>
        </div>

        <div className="mt-2">
          <header className="mb-8">
            <h4 className="text-foreground text-sm sm:text-base mt-4 flex gap-1 tracking-wide">
              <span>AI Chatbot by a</span>
              <Link
                target="_blank"
                className="underline hover:text-indigo-400 mb-2"
                href="https://beta.langbase.com/examples/ai-chatbot"
              >
                <span className="font-bold">pipe on ⌘ Langbase</span>
              </Link>
            </h4>
            <h5 className="text-sm text-muted-foreground">
              Ship hyper-personalized AI assistants with memory.
            </h5>
          </header>

          <div className="mt-4 flex flex-col gap-4 text-sm [&>p]:my-0 [&>p]:py-0">
            <p>Learn more by checking out:</p>
            <div className="flex flex-col gap-4 mt-2 text-sm">
              <Dlink href="https://beta.langbase.com/examples/ai-chatbot">
                <span>1.</span>
                <span>Fork this AI Chatbot Pipe on ⌘ Langbase</span>
              </Dlink>
              <Dlink href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-chatbot">
                <span>2.</span>
                <span>Use LangUI.dev's open source code compnents</span>
              </Dlink>

              <Dlink href="https://langbase.com/docs/pipe/quickstart">
                <span>3.</span>
                <span>Go through Documentaion: Pipe Quickstart </span>
              </Dlink>
              <Dlink href="https://langbase.com/docs">
                <span>4.</span>
                <span>
                  Learn more about Pipes & Memory features on ⌘ Langbase
                </span>
              </Dlink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Description Link
function Dlink({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
  [key: string]: any
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex hover:text-indigo-400 flex items-center gap-2 [&>span:first-child]:text-indigo-400"
      {...props}
    >
      {children}
    </Link>
  )
}
