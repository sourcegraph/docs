import {Callout} from './mdx/Callout';
import {Heading} from './mdx/Heading';
import {LinkCard, LinkCards} from './mdx/LinkCards';
import {ProductCard, ProductCards} from './mdx/ProductCards';
import {QuickLink, QuickLinks} from './mdx/QuickLinks';
import {CustomLink} from './mdx/CustomLink';

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
	},
	a: CustomLink,
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

export default MdxComponents;
