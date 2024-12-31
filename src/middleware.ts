import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import docsConfig from '../docs.config.js'

const { updatedRedirectsData } = require('./data/redirects.ts');

function createRedirectUrl(request: NextRequest, destination: string, path: string): string {
  // Handle absolute URLs
  if (destination.startsWith('http')) {
    // Handle dynamic slug replacements
    if (destination.includes(':slug')) {
      const slugMatch = path.match(/[^/]+$/)
      const slug = slugMatch ? slugMatch[0] : ''
      destination = destination.replace(':slug*', slug)
    }
    // Handle version replacements
    if (destination.includes(':version')) {
      const versionMatch = path.match(/\d+\.\d+/)
      const version = versionMatch ? versionMatch[0] : ''
      destination = destination.replace(':version', version)
    }

    return destination
  }

  // Handle relative paths
  const basePath = '/docs'
  return destination.startsWith('/') ? 
    `${request.nextUrl.origin}${basePath}${destination}` : 
    `${request.nextUrl.origin}${basePath}/${destination}`
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const pathWithoutBase = path.replace('/docs', '')

  // Handle base redirects from redirects.ts
  const redirect = updatedRedirectsData.find((r: any) => r.source === pathWithoutBase)
  if (redirect) {
    return NextResponse.redirect(createRedirectUrl(request, redirect.destination, path))
  }
  // Handle version without slug
  const versionOnlyMatch = pathWithoutBase.match(/^\/v\/(\d+\.\d+)$/)
  if (versionOnlyMatch) {
    return NextResponse.redirect(`https://${versionOnlyMatch[1]}.sourcegraph.com/`)
  }
  // Handle version-specific redirects
  if (pathWithoutBase.startsWith(`/v/${docsConfig.DOCS_LATEST_VERSION}/`)) {
    return NextResponse.redirect(createRedirectUrl(
      request,
      `https://sourcegraph.com/docs/:slug*`,
      pathWithoutBase
    ))
  }
  if (pathWithoutBase.startsWith(`/@${docsConfig.DOCS_LATEST_VERSION}/`)) {
    return NextResponse.redirect(createRedirectUrl(
      request,
      `https://sourcegraph.com/docs/:slug*`,
      pathWithoutBase
    ))
  }
  const versionMatch = pathWithoutBase.match(/^\/v\/(\d+\.\d+)\/(.*)/)
  if (versionMatch) {
    return NextResponse.redirect(createRedirectUrl(
      request,
      'https://:version.sourcegraph.com/:slug*',
      pathWithoutBase
    ))
  }
  const atVersionMatch = pathWithoutBase.match(/^\/@(\d+\.\d+)\/(.*)/)
  if (atVersionMatch) {
    return NextResponse.redirect(createRedirectUrl(
      request,
      'https://:version.sourcegraph.com/:slug*',
      pathWithoutBase
    ))
  }
  if (pathWithoutBase === '/changelog.rss') 
    return NextResponse.redirect(createRedirectUrl(request, '/technical-changelog.rss', path))

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}
