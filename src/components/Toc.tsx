'use client';

import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Heading {
	level: number;
	title: string;
	id?: string;
}

interface Props {
	headings: Heading[];
}

export function TableOfContents({headings}: Props) {
	let [currentSection, setCurrentSection] = useState(headings[0]?.id);

	let getHeadings = useCallback((headings: Heading[]) => {
		return headings
			.map(heading => {
				if (heading.id) {
					let el = document.getElementById(heading.id);
					if (!el) return null;

					let style = window.getComputedStyle(el);
					let scrollMt = parseFloat(style.scrollMarginTop);

					let top =
						window.scrollY +
						el.getBoundingClientRect().top -
						scrollMt;
					return {id: heading.id, top};
				}
			})
			.filter((x): x is {id: string; top: number} => x !== null);
	}, []);

	useEffect(() => {
		if (headings.length === 0) return;

		let headingsWithPositions = getHeadings(headings);

		function onScroll() {
			let top = window.scrollY;
			let current = headingsWithPositions[0]?.id;

			for (let heading of headingsWithPositions) {
				if (top >= heading.top - 10) {
					current = heading.id;
				} else {
					break;
				}
			}

			setCurrentSection(current);
		}

		window.addEventListener('scroll', onScroll, {passive: true});
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [getHeadings, headings]);

	function isActive(heading: Heading) {
		return heading.id === currentSection;
	}

	return (
		<div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
			<nav aria-labelledby="on-this-page-title" className="w-56">
				{headings.length > 0 && (
					<>
						<h2
							id="on-this-page-title"
							className="font-display text-sm font-medium text-slate-900 dark:text-white"
						>
							On this page
						</h2>
						<ol role="list" className="mt-4 space-y-3 text-sm">
							{headings.map(heading => (
								<li key={heading.id}>
									{heading.level === 1 && (
										<h3>
											<Link
												href={`#${heading.id}`}
												className={clsx(
													isActive(heading)
														? 'font-semibold text-link-light dark:text-link'
														: 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
												)}
											>
												{heading.title}
											</Link>
										</h3>
									)}
									{heading.level === 2 && (
										<ol
											role="list"
											className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
										>
											<li key={heading.id}>
												<Link
													href={`#${heading.id}`}
													className={clsx(
														isActive(heading)
															? 'font-semibold text-link-light dark:text-link'
															: 'hover:text-slate-600 dark:hover:text-slate-300'
													)}
												>
													{heading.title}
												</Link>
											</li>
										</ol>
									)}
								</li>
							))}
						</ol>
					</>
				)}
			</nav>
		</div>
	);
}
