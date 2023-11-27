import Link from 'next/link';
import {LinkCard, LinkCards} from './LinkCards';
import {Callout} from './Callout';
import {QuickLink, QuickLinks} from './QuickLinks';
import {ProductCard, ProductCards} from './ProductCards';

const MdxComponents = {
	QuickLinks,
	QuickLink,
	LinkCards,
	LinkCard,
	Callout,
	ProductCards,
	ProductCard,
	code: (props: any) => {
		const isCodeBlock = props.style?.display === 'grid';
		// Only apply styles to inline code
		const codeClasses = isCodeBlock
			? 'bg-transparent'
			: 'border font-medium bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded-md border-slate-300 dark:border-slate-700';

		return <code className={codeClasses} {...props} />;
	}

	// a: ({href = '', ...props}) => {
	// 	if (href.startsWith('#')) {
	// 		return (
	// 			<a
	// 				className="not-prose hover:underline"
	// 				href={href}
	// 				{...props}
	// 			/>
	// 		);
	// 	}

	// 	return <Link href={href} {...props} />;
	// }
	// h1: (props: any) => (
	// 	<h1
	// 		className="-ml-[1em] pl-[1em] no-underline before:absolute before:-ml-[1em] before:text-white/0 before:content-['#'] hover:before:text-white/50"
	// 		{...props}
	// 	/>
	// )
};

export default MdxComponents;
