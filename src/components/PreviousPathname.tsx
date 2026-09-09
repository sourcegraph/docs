'use client';

import {usePathname} from 'next/navigation';
import {createContext, useContext, useEffect, useState} from 'react';

const PreviousPathnameContext = createContext<string | null>(null);

// Remembers the pathname the user was on before the current one. Lives in the
// root layout, which React keeps mounted across client-side navigations, so
// the 404 page can link back to the page whose link was broken. Null on a
// fresh page load.
export function PreviousPathnameProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [visited, setVisited] = useState<{
		current: string;
		previous: string | null;
	}>({current: pathname, previous: null});

	useEffect(() => {
		setVisited(visited =>
			visited.current === pathname
				? visited
				: {current: pathname, previous: visited.current}
		);
	}, [pathname]);

	return (
		<PreviousPathnameContext.Provider value={visited.previous}>
			{children}
		</PreviousPathnameContext.Provider>
	);
}

export const usePreviousPathname = () => useContext(PreviousPathnameContext);
