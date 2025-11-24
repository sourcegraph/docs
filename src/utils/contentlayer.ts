import type {Document, MDX} from 'contentlayer/core';

const isProduction = process.env.NODE_ENV === 'production';

export type MDXDocument = Document & {body: MDX};

type ConvertUndefined<T> = OrNull<{
	[K in keyof T as undefined extends T[K] ? K : never]-?: T[K];
}>;
type OrNull<T> = {[K in keyof T]: Exclude<T[K], undefined> | null};
type PickRequired<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>;

/**
 * A typesafe omit helper function
 * @example pick(content, ['title', 'description'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {ConvertPick<{ [K in Keys]: Obj[K] }>}
 */
export const pick = <Obj, Keys extends keyof Obj>(
	obj: Obj,
	keys: Keys[]
): ConvertPick<{[K in Keys]: Obj[K]}> => {
	return keys.reduce((acc, key) => {
		acc[key] = obj[key] ?? null;
		return acc;
	}, {} as any);
};

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(
	obj: Obj,
	keys: Keys[]
): Omit<Obj, Keys> => {
	const result = Object.assign({}, obj);
	keys.forEach(key => {
		delete result[key];
	});
	return result;
};

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>;

/**
 * Omit body, _raw, _id from MDX document and return only the core content
 *
 * @param {T} content
 * @return {*}  {CoreContent<T>}
 */
export function coreContent<T extends MDXDocument>(content: T): CoreContent<T> {
	return omit(content, ['body', '_raw', '_id']);
}

/**
 * Omit body, _raw, _id from a list of MDX documents and returns only the core content
 * If `NODE_ENV` === "production", it will also filter out any documents with draft: true.
 *
 * @param {T[]} contents
 * @return {*}  {CoreContent<T>[]}
 */
export function allCoreContent<T extends MDXDocument>(
	contents: T[]
): CoreContent<T>[] {
	if (isProduction)
		return contents
			.map(c => coreContent(c))
			.filter(c => !('draft' in c && c.draft === true));
	return contents.map(c => coreContent(c));
}
