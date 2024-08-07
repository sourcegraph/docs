'use client';

import cn from 'mxcn';
import * as React from 'react';

function IconSpinner({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4 animate-spin', className)}
			{...props}
		>
			<path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
		</svg>
	);
}

function IconMessage({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z" />
		</svg>
	);
}

function IconRefresh({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z" />
		</svg>
	);
}

export function IconRegenerate(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 5C8.13401 5 5 8.13401 5 12C5 14.3776 6.18526 16.4797 8 17.7455V15C8 14.4477 8.44772 14 9 14C9.55228 14 10 14.4477 10 15V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19H6.34293C4.30475 17.3508 3 14.8284 3 12C3 7.02944 7.02944 3 12 3C13.1917 3 14.3316 3.23213 15.3752 3.65458C15.8871 3.8618 16.1342 4.4448 15.9269 4.95673C15.7197 5.46867 15.1367 5.71568 14.6248 5.50845C13.8155 5.18088 12.9301 5 12 5Z"
				fill="currentColor"
			/>
			<path
				d="M13 21C13.5523 21 14 20.5523 14 20C14 19.4477 13.5523 19 13 19C12.4477 19 12 19.4477 12 20C12 20.5523 12.4477 21 13 21Z"
				fill="currentColor"
			/>
			<path
				d="M21 11C21 10.4477 20.5523 9.99999 20 9.99999C19.4477 9.99999 19 10.4477 19 11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11Z"
				fill="currentColor"
			/>
			<path
				d="M19.9295 14.2679C20.4078 14.5441 20.5716 15.1557 20.2955 15.634C20.0193 16.1123 19.4078 16.2761 18.9295 16C18.4512 15.7238 18.2873 15.1123 18.5634 14.634C18.8396 14.1557 19.4512 13.9918 19.9295 14.2679Z"
				fill="currentColor"
			/>
			<path
				d="M17.3676 19.2942C17.8459 19.0181 18.0098 18.4065 17.7336 17.9282C17.4575 17.4499 16.8459 17.286 16.3676 17.5621C15.8893 17.8383 15.7254 18.4499 16.0016 18.9282C16.2777 19.4065 16.8893 19.5703 17.3676 19.2942Z"
				fill="currentColor"
			/>
			<path
				d="M18.9269 7.99998C18.4487 8.27612 17.8371 8.11225 17.5609 7.63396C17.2848 7.15566 17.4487 6.54407 17.9269 6.26793C18.4052 5.99179 19.0168 6.15566 19.293 6.63396C19.5691 7.11225 19.4052 7.72384 18.9269 7.99998Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function IconStop({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z" />
		</svg>
	);
}

function IconCopy({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
		</svg>
	);
}

function IconCheck({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
		</svg>
	);
}

function IconDownload({className, ...props}: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4', className)}
			{...props}
		>
			<path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
		</svg>
	);
}

export function IconChat(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 9C2 5.68629 4.68629 3 8 3H16C19.3137 3 22 5.68629 22 9V15C22 18.3137 19.3137 21 16 21H3C2.44772 21 2 20.5523 2 20V9ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11H15C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9H9ZM9 13C8.44772 13 8 13.4477 8 14C8 14.5523 8.44772 15 9 15H12C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13H9Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export {
	IconCheck,
	IconCopy,
	IconDownload,
	IconMessage,
	IconRefresh,
	IconSpinner,
	IconStop
};
