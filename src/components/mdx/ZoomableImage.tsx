'use client';

import {useCallback, useEffect, useState} from 'react';

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function ZoomableImage({className, alt, ...props}: ZoomableImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeModal();
		};

		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, closeModal]);

	return (
		<>
			<img
				className={`cursor-zoom-in rounded-xl ${className ?? ''}`}
				alt={alt}
				onClick={openModal}
				{...props}
			/>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
					onClick={closeModal}
					role="dialog"
					aria-modal="true"
					aria-label={alt || 'Zoomed image'}
				>
					<button
						className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
						onClick={closeModal}
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
					<img
						className="max-h-[90vh] max-w-[90vw] cursor-zoom-out rounded-lg object-contain"
						alt={alt}
						onClick={e => e.stopPropagation()}
						{...props}
					/>
				</div>
			)}
		</>
	);
}
