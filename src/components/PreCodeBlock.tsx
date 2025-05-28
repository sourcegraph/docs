import { CopyButton } from '@/components/CopyButton'
import React, { DetailedHTMLProps, HTMLAttributes, Children } from 'react'
import config from '../../docs.config'

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

// Use static version from config instead of fetching
function getLatestVersion() {
  return `v${config.DOCS_LATEST_VERSION}`;
}

function trimPrefix(str: string, prefix: string) {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}

export function CURRENT_VERSION_STRING() {
  const v = getLatestVersion()
  return v
}

export function CURRENT_VERSION_STRING_NO_V() {
  const v = getLatestVersion()
  return trimPrefix(v, "v")
}

export function PreCodeBlock({ children, ...props }: PreProps) {
  const propsObj = { ...props }
  const propsValues = Object.values(propsObj)
  const [, , , dataLanguage, dataTheme] = propsValues
  const lang = dataLanguage || "shell"

  let codeContent = props?.raw || ''

  // If raw prop is not available, try to extract content from children
  if (!codeContent && children) {
    React.Children.forEach(children, (child) => {
      // @ts-ignore
      if (React.isValidElement(child) && child.props.children) {
        // @ts-ignore
        codeContent += child.props.children
      }
    })
  }

  const version = getLatestVersion()
  const version_no_v = trimPrefix(version, "v")
  let mustReplaceVersions = false
  if (codeContent.includes("{CURRENT_VERSION}") || codeContent.includes("{CURRENT_VERSION_NO_V}")) {
    mustReplaceVersions = true
  }
  codeContent = codeContent.replace(/{CURRENT_VERSION}/g, version)
  codeContent = codeContent.replace(/{CURRENT_VERSION_NO_V}/g, version_no_v)
  if (mustReplaceVersions) {
    children = codeContent
  }

  return (
    <div className="relative">
      <pre className="pt-12" data-language={lang} data-theme={dataTheme}>
        <CopyButton lang={lang} text={codeContent} />
        {children}
      </pre>
    </div>
  )
}

export function PreCode({ children, ...props }: PreProps) {
  const isCodeBlock = props.style?.display === 'grid';
  // Only apply styles to inline code
  const codeClasses = isCodeBlock
    ? 'bg-transparent'
    : 'border font-medium bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded-md border-slate-300 dark:border-slate-700';

  let codeContent = props?.raw || ''

  // If raw prop is not available, try to extract content from children
  if (!codeContent && children) {
    React.Children.forEach(children, (child) => {
      // @ts-ignore
      if (React.isValidElement(child) && child.props.children) {
        // @ts-ignore
        codeContent += child.props.children
      }
    })
  }

  const version = getLatestVersion()
  const version_no_v = trimPrefix(version, "v")
  if (typeof children === "string") {
    children = children.replace(/{CURRENT_VERSION}/g, version_no_v).replace(/{CURRENT_VERSION_NO_V}/g, version_no_v)
  }

  return (
    <code className={codeClasses}>
      {children}
    </code>
  )
}
