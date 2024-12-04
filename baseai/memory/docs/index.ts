import { MemoryI } from '@baseai/core';
import path from 'path';

const memoryDocs = (): MemoryI => ({
  name: 'docs',
  description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
  config: {
    useGitRepo: true,
    dirToTrack: path.posix.join('.', 'docs'),
    extToTrack: [".md", ".mdx"]
  }
});

export default memoryDocs;
