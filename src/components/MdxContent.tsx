'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxComponents from './MdxComponents';

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
  version?: string;
}

export default function MdxContent({ source, version }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents(version)} />;
}