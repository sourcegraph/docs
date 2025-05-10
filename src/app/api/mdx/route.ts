import { NextRequest, NextResponse } from 'next/server';
import { getMdxFileBySlug, getVersionedMdxFileBySlug } from '@/lib/mdx';
import path from 'path';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  let path = url.searchParams.get('path');
  const version = url.searchParams.get('version');
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }
  
  // Remove leading slash if present
  path = path.startsWith('/') ? path.substring(1) : path;
  
  // Handle special case for root path
  if (path === '') {
    path = 'index';
  }
  
  const pathParts = path.split('/').filter(Boolean);
  
  try {
    let mdxData;
    
    if (version) {
      mdxData = await getVersionedMdxFileBySlug(version, pathParts);
    } else {
      mdxData = await getMdxFileBySlug(pathParts);
    }
    
    if (!mdxData) {
      // Try alternative paths
      if (pathParts.length > 0) {
        // Try with /index at the end
        const indexPathParts = [...pathParts, 'index'];
        mdxData = version 
          ? await getVersionedMdxFileBySlug(version, indexPathParts)
          : await getMdxFileBySlug(indexPathParts);
      }
      
      if (!mdxData) {
        return NextResponse.json({ error: 'MDX file not found' }, { status: 404 });
      }
    }
    
    return NextResponse.json({ 
      mdxSource: mdxData.source,
      headings: mdxData.headings,
      frontmatter: mdxData.frontmatter
    });
  } catch (error) {
    console.error('Error fetching MDX:', error);
    return NextResponse.json({ error: 'Failed to fetch MDX content' }, { status: 500 });
  }
}