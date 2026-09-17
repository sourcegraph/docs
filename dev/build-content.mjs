#!/usr/bin/env node

/**
 * Runs `contentlayer2 build` so that its cache works on Vercel.
 *
 * Without this every deploy re-renders all ~500 MDX pages (~25s on Vercel's
 * 4-core build machine); with it, only the pages whose source changed. Two
 * things stand in the way:
 *
 * - Contentlayer only writes its cache to .contentlayer/.cache, and Vercel only
 *   keeps .next/cache between builds. So .contentlayer/.cache is a symlink into
 *   .next/cache.
 * - Contentlayer decides whether a cached document is current by comparing the
 *   source file's mtime, and a fresh git clone sets every mtime to the clone
 *   time, so on Vercel every entry misses. So each source file's mtime is set
 *   from a hash of its content, which is the same wherever the same content is
 *   checked out. This is a workaround for contentlayer2 keying its cache on
 *   mtime (@contentlayer2/source-files, makeCacheItemFromFilePath.ts) and can
 *   go once https://github.com/timlrx/contentlayer2/pull/94 ships.
 */

import {execFileSync} from 'child_process';
import {createHash} from 'crypto';
import {
	lstatSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	symlinkSync,
	utimesSync
} from 'fs';
import path from 'path';

const contentDir = 'docs';
const cacheDir = path.join('.next', 'cache', 'contentlayer');
const cacheLink = path.join('.contentlayer', '.cache');

// Workaround: content-derived mtimes so contentlayer's cache hits on a fresh
// clone. Remove once https://github.com/timlrx/contentlayer2/pull/94 ships.
for (const entry of readdirSync(contentDir, {
	recursive: true,
	withFileTypes: true
})) {
	if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;
	const file = path.join(entry.parentPath, entry.name);
	// Whole seconds, so the value survives any filesystem's timestamp precision
	const seconds = createHash('sha1')
		.update(readFileSync(file))
		.digest()
		.readUInt32BE(0);
	utimesSync(file, seconds, seconds);
}

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
