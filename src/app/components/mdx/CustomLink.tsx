import Link from 'next/link';

export function CustomLink(props: any) {
	let href = props.href;
	const cleanedHref = href.replace(/\.mdx?$/, '');

	if (href.startsWith('http')) {
		return <a target="_blank" rel="noopener noreferrer" {...props} />;
	}

	if (href.startsWith('#')) {
		return <a {...props} />;
	}
	return (
		<Link href={cleanedHref} {...props}>
			{props.children}
		</Link>
	);
}
