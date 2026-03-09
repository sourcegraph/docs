'use client';

import type mermaidAPI from 'mermaid';
import {useTheme} from 'next-themes';
import {useCallback, useEffect, useId, useRef, useState} from 'react';

import {createPortal} from 'react-dom';

import * as logoPacks from '../images/logos/';

type MermaidType = typeof mermaidAPI;

const LIGHT_THEME = {
	primaryColor: '#FFF3F0',
	secondaryColor: '#FFE5E0',
	tertiaryColor: '#FFD6CF',
	primaryTextColor: '#060000',
	secondaryTextColor: '#060000',
	tertiaryTextColor: '#060000',
	primaryBorderColor: '#F34E3F',
	lineColor: '#F34E3F',
	nodeBorder: '#F34E3F',
	nodeTextColor: '#060000',
	mainBkg: '#FFFFFF',
	clusterBkg: '#FFF3F0',
	clusterBorder: '#F34E3F',
	actorBkg: '#FFF3F0',
	actorBorder: '#F34E3F',
	actorTextColor: '#060000',
	actorLineColor: '#F34E3F',
	signalColor: '#060000',
	signalTextColor: '#060000',
	activationBkgColor: '#FFE5E0',
	activationBorderColor: '#F34E3F',
	labelBoxBkgColor: '#FFF3F0',
	labelBoxBorderColor: '#F34E3F',
	labelTextColor: '#060000',
	noteBkgColor: '#FFF3F0',
	noteBorderColor: '#F34E3F',
	noteTextColor: '#060000',
	edgeLabelBackground: '#FFFFFF',
	fontFamily: 'var(--font-polysans), system-ui, sans-serif'
};

const DARK_THEME = {
	primaryColor: '#3D1A16',
	secondaryColor: '#2A100D',
	tertiaryColor: '#1A0A08',
	primaryTextColor: '#FFF3F0',
	secondaryTextColor: '#FFF3F0',
	tertiaryTextColor: '#FFF3F0',
	primaryBorderColor: '#F34E3F',
	lineColor: '#FF7867',
	nodeBorder: '#F34E3F',
	nodeTextColor: '#FFF3F0',
	mainBkg: '#060000',
	clusterBkg: '#2A100D',
	clusterBorder: '#F34E3F',
	actorBkg: '#3D1A16',
	actorBorder: '#F34E3F',
	actorTextColor: '#FFF3F0',
	actorLineColor: '#FF7867',
	signalColor: '#FFF3F0',
	signalTextColor: '#FFF3F0',
	activationBkgColor: '#3D1A16',
	activationBorderColor: '#F34E3F',
	labelBoxBkgColor: '#2A100D',
	labelBoxBorderColor: '#F34E3F',
	labelTextColor: '#FFF3F0',
	noteBkgColor: '#3D1A16',
	noteBorderColor: '#FF7867',
	noteTextColor: '#FFF3F0',
	edgeLabelBackground: '#060000',
	fontFamily: 'var(--font-polysans), system-ui, sans-serif'
};

interface MermaidProps {
	chart: string;
}

export function Mermaid({chart}: MermaidProps) {
	const id = useId().replace(/:/g, '-');
	const [svg, setSvg] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [renderKey, setRenderKey] = useState(() =>
		Math.random().toString(36).slice(2)
	);
	const [isExpanded, setIsExpanded] = useState(false);
	const [mounted, setMounted] = useState(false);
	const portalRef = useRef<HTMLDivElement | null>(null);
	const mermaidRef = useRef<MermaidType | null>(null);
	const {resolvedTheme} = useTheme();

	useEffect(() => {
		setMounted(true);
		const div = document.createElement('div');
		div.id = `mermaid-portal-${id}`;
		document.body.appendChild(div);
		portalRef.current = div;
		return () => {
			if (portalRef.current) {
				document.body.removeChild(portalRef.current);
			}
		};
	}, [id]);

	useEffect(() => {
		if (!mounted) return;

		const initMermaid = async () => {
			const mermaidModule = await import('mermaid');
			const mermaid = mermaidModule.default;
			mermaidRef.current = mermaid;

			mermaid.registerIconPacks(
				Object.values(logoPacks).map(icons => ({
					name: icons.prefix,
					icons
				}))
			);

			const isDark = resolvedTheme === 'dark';
			mermaid.initialize({
				startOnLoad: false,
				theme: 'base',
				themeVariables: isDark ? DARK_THEME : LIGHT_THEME,
				themeCSS: isDark
					? '.node-bkg { stroke: #F34E3F !important; }'
					: ''
			});

			setRenderKey(Math.random().toString(36).slice(2));
		};

		initMermaid();
	}, [resolvedTheme, mounted]);

	useEffect(() => {
		if (!chart || !chart.trim() || !mounted || !mermaidRef.current) {
			return;
		}

		let isMounted = true;
		const elementId = `mermaid-${id}-${renderKey}`;

		const renderChart = async () => {
			try {
				const existing = document.getElementById(elementId);
				if (existing) {
					existing.remove();
				}

				const {svg} = await mermaidRef.current!.render(
					elementId,
					chart
				);
				if (isMounted) {
					setSvg(svg);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error
							? err.message
							: 'Failed to render diagram'
					);
				}
			}
		};

		renderChart();

		return () => {
			isMounted = false;
		};
	}, [chart, id, renderKey, mounted]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape' && isExpanded) {
				setIsExpanded(false);
			}
		},
		[isExpanded]
	);

	useEffect(() => {
		if (isExpanded) {
			document.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isExpanded, handleKeyDown]);

	if (!mounted) {
		return null;
	}

	if (error) {
		return (
			<div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
				<p className="font-medium">Mermaid diagram error:</p>
				<pre className="mt-2 text-sm">{error}</pre>
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="flex h-32 items-center justify-center rounded-lg bg-light-bg-2 dark:bg-vermilion-01">
				<span className="text-vermilion-07 dark:text-vermilion-08">
					Loading diagram...
				</span>
			</div>
		);
	}

	const isDark = resolvedTheme === 'dark';
	const bgColor = isDark ? DARK_THEME.mainBkg : LIGHT_THEME.mainBkg;

	return (
		<>
			<div
				className="group relative my-4 overflow-x-auto rounded-lg border border-light-border p-4 dark:border-vermilion-02"
				style={{backgroundColor: bgColor}}
			>
				<button
					type="button"
					onClick={() => setIsExpanded(true)}
					className="absolute right-2 top-2 z-20 rounded-md bg-black/20 p-2 text-slate-700 hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
					aria-label="Expand diagram"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
					</svg>
				</button>
				{!isExpanded && (
					<div
						className="[&_.clickable:hover]:opacity-80 [&_.clickable]:cursor-pointer [&_.clickable]:underline"
						dangerouslySetInnerHTML={{__html: svg}}
					/>
				)}
			</div>

			{isExpanded &&
				mounted &&
				portalRef.current &&
				createPortal(
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
						onClick={() => setIsExpanded(false)}
					>
						<div
							className="relative max-h-[95vh] max-w-[95vw] overflow-auto rounded-lg p-8 pt-16 shadow-2xl"
							style={{backgroundColor: bgColor}}
							onClick={e => {
								// Close if clicking on a clickable element (link), otherwise prevent closing
								if (
									(e.target as HTMLElement).closest(
										'.clickable'
									)
								) {
									setIsExpanded(false);
								} else {
									e.stopPropagation();
								}
							}}
						>
							<button
								type="button"
								onClick={() => setIsExpanded(false)}
								className="absolute right-4 top-4 z-10 rounded-md bg-black/20 p-2 text-slate-700 hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
								aria-label="Close expanded diagram"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</button>
							<div
								className="flex items-center justify-center [&_.clickable:hover]:opacity-80 [&_.clickable]:cursor-pointer [&_.clickable]:underline [&_svg]:h-auto [&_svg]:max-h-[80vh] [&_svg]:w-auto [&_svg]:min-w-[80vw]"
								dangerouslySetInnerHTML={{__html: svg}}
							/>
						</div>
					</div>,
					portalRef.current
				)}
		</>
	);
}
