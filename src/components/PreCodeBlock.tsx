import { CopyButton } from '@/components/CopyButton'
import React, { DetailedHTMLProps, HTMLAttributes, Children } from 'react'

interface PreProps extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  raw?: string
}

interface ReleaseInfo {
  id: number;
  name: string;
  public: boolean;
  created_at: string;
  promoted_at: string;
  version: string;
  git_sha: string;
  is_development: boolean;
  tags: string[] | null;
  canonical_name: string;
}

async function getLatestVersion() {
  const url = new URL('https://releaseregistry.sourcegraph.com/v1/releases/sourcegraph/latest');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const releaseInfo: ReleaseInfo = await response.json();
  return releaseInfo.version
}

export async function CURRENT_VERSION_STRING() {
  const v = await getLatestVersion()
  return v
}

export async function PreCodeBlock({ children, ...props }: PreProps) {
  const propsObj = { ...props }
  const propsValues = Object.values(propsObj)
  const [, , , dataLanguage, dataTheme] = propsValues
  const lang = dataLanguage || "shell"

  let codeContent = props?.raw || ''

  // If raw prop is not available, try to extract content from children
  if (!codeContent && children) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.children) {
        codeContent += child.props.children
      }
    })
  }

  const version = await getLatestVersion()
  codeContent = codeContent.replace(/{CURRENT_VERSION}/g, version)

  return (
    <div className="relative">
      <pre className="pt-12" data-language={lang} data-theme={dataTheme}>
        <CopyButton lang={lang} text={codeContent} />
        {codeContent}
      </pre>
    </div>
  )
}
