'use client';

import {usePathname} from 'next/navigation';
import {createContext, useContext, useEffect, useState} from 'react';

const PreviousPathnameContext = createContext<string | null>(null);

interface Visited {
	current: string;
	previous: string | null;
}

// Kept in sessionStorage (per tab) so it survives full page loads, e.g. when
// the user edits the URL bar, which sends no referrer.
const storageKey = 'docs.visitedPathnames';

function readVisited(): Visited | null {
	try {
		const raw = window.sessionStorage.getItem(storageKey);
		return raw ? (JSON.parse(raw) as Visited) : null;
	} catch {
		return null;
	}
}

function writeVisited(visited: Visited) {
	try {
		window.sessionStorage.setItem(storageKey, JSON.stringify(visited));
	} catch {
		// Storage unavailable; the in-memory value still covers client-side navigations.
	}
}

// Remembers the pathname the user was on before the current one, so the 404
// page can link back to the page whose link was broken. Lives in the root
// layout, which React keeps mounted across client-side navigations. Null when
// this tab has not visited another docs page.
export function PreviousPathnameProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [visited, setVisited] = useState<Visited>({
		current: pathname,
		previous: null
	});

	useEffect(() => {
		const stored = readVisited() ?? {current: pathname, previous: null};
		const next =
			stored.current === pathname
				? stored
				: {current: pathname, previous: stored.current};
		writeVisited(next);
		setVisited(next);
	}, [pathname]);

	return (
		<PreviousPathnameContext.Provider value={visited.previous}>
			{children}
		</PreviousPathnameContext.Provider>
	);
}

export const usePreviousPathname = () => useContext(PreviousPathnameContext);
