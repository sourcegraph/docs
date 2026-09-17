#!/usr/bin/env node

/**
 * Runs `contentlayer2 build` with its cache kept under .next/cache.
 *
 * Contentlayer only writes its cache to .contentlayer/.cache, and Vercel only
 * keeps .next/cache between builds. Without this every deploy re-renders all
 * ~500 MDX pages (~25s on Vercel's 4-core build machine); with it, only the
 * pages whose source changed.
 */

import {execFileSync} from 'child_process';
import {lstatSync, mkdirSync, rmSync, symlinkSync} from 'fs';
import path from 'path';

const cacheDir = path.join('.next', 'cache', 'contentlayer');
const cacheLink = path.join('.contentlayer', '.cache');

mkdirSync(cacheDir, {recursive: true});
mkdirSync('.contentlayer', {recursive: true});

// A real directory here is a cache from an earlier `next build --webpack`.
const existing = lstatSync(cacheLink, {throwIfNoEntry: false});
if (existing && !existing.isSymbolicLink()) {
	rmSync(cacheLink, {recursive: true});
}
if (!existing || !existing.isSymbolicLink()) {
	symlinkSync(path.relative('.contentlayer', cacheDir), cacheLink);
}

execFileSync('contentlayer2', ['build'], {stdio: 'inherit'});
