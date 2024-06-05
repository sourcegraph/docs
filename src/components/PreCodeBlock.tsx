import { CopyButton } from '@/components/CopyButton'
import React, { DetailedHTMLProps, HTMLAttributes, Children } from 'react'

interface PreProps extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  raw?: string
}

export function PreCodeBlock ({ children, ...props }: PreProps) {
  const propsObj = { ...props }
  const propsValues = Object.values(propsObj)
  const [, , dataLanguage, dataTheme] = propsValues
  const lang = dataLanguage || "shell"
  
  let codeContent = ''
  Children.forEach(children, child => {
    if (typeof child === 'string') codeContent += child
  })

  return (
    <div className="relative">
      <pre className="pt-12" data-language={lang} data-theme={dataTheme}>
        <CopyButton text={props?.raw || ''}/>
        {children}
      </pre>
    </div>
  )
}
