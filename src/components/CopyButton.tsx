'use client';

import {useState} from 'react';
import {DocumentDuplicateIcon, CheckIcon} from '@heroicons/react/24/outline';

export function CopyButton({text, lang}: {text: string; lang: string}) {
	const [copied, setCopied] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setShowTooltip(true);
			setTimeout(() => {
				setCopied(false);
				setShowTooltip(false);
			}, 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	return (
		<div className="absolute left-0 right-0 top-0 inline-flex w-full items-center rounded-t-lg border-b-0.1 border-gray-500 pt-1 shadow">
			<div className="relative flex w-full items-center justify-between">
				<div className="pl-2 text-sm text-white">
					{lang.toUpperCase()}
				</div>
				<div className="relative">
					<button
						onClick={handleCopy}
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						className="text-white-500 relative flex items-center justify-center rounded p-2 transition duration-300 ease-in-out hover:scale-125 focus:outline-none"
					>
						{copied ? (
							<CheckIcon
								className="text-green-400 h-5 w-5"
								aria-hidden="true"
							/>
						) : (
							<DocumentDuplicateIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						)}
					</button>
					{showTooltip && copied && (
						<span className="absolute right-full top-1/2 mr-2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white transition-opacity duration-300">
							Copied!
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
