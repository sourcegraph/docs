import {Callout} from './mdx/Callout';
import {Heading} from './mdx/Heading';
import {LinkCard, LinkCards} from './mdx/LinkCards';
import {ProductCard, ProductCards} from './mdx/ProductCards';
import {QuickLink, QuickLinks} from './mdx/QuickLinks';
import {CustomLink} from './mdx/CustomLink';

const MdxComponents = (version?: string) => {
	return {
		QuickLinks,
		QuickLink: (props: React.ComponentProps<typeof QuickLink>) => (
			<QuickLink {...props} version={version} />
		),
		LinkCards,
		LinkCard: (props: React.ComponentProps<typeof LinkCard>) => (
			<LinkCard {...props} version={version} />
		),
		Callout,
		ProductCards,
		ProductCard: (props: React.ComponentProps<typeof ProductCard>) => (
			<ProductCard {...props} version={version} />
		),
		code: (props: any) => {
			const isCodeBlock = props.style?.display === 'grid';
			// Only apply styles to inline code
			const codeClasses = isCodeBlock
				? 'bg-transparent'
				: 'border font-medium bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded-md border-slate-300 dark:border-slate-700';

			return <code className={codeClasses} {...props} />;
		},
		a: (props: any) => <CustomLink {...props} version={version} />,
		h2: (props: any) => {
			return <Heading level="2" id={props.id} props={props} />;
		},
		h3: (props: any) => {
			return <Heading level="3" id={props.id} props={props} />;
		},
		img: (props: any) => {
			return <img className="rounded-xl" {...props} />;
		},
		video: (props: any) => {
			return <video className="rounded-xl" {...props} />;
		}
	};
};

export default MdxComponents;
