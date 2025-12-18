'use client';

import {useSearchParams} from 'next/navigation';
import {notFound} from 'next/navigation';

export function PreviewGuard({
	isPreview,
	children
}: {
	isPreview: boolean;
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();

	if (isPreview && !searchParams.has('preview')) {
		notFound();
	}

	return <>{children}</>;
}
