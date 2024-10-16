import { MemoryI } from '@baseai/core';
import path from 'path';

const memoryDocs = (): MemoryI => ({
  name: 'docs',
  description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
  config: {
    deployedCommitHash: '7a147cfb18f19d5584ffb3805b678db47191960a',
		useGitRepo: true,
		dirToTrack: path.posix.join('.', 'docs'),
		extToTrack: [".md",".mdx"]
  }
});

export default memoryDocs;
