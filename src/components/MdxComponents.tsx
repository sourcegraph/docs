import {Callout} from './Callout';
import {Heading} from './Heading';
import {LinkCard, LinkCards} from './LinkCards';
import {ProductCard, ProductCards} from './ProductCards';
import {QuickLink, QuickLinks} from './QuickLinks';
import {CustomLink} from './custom/link';

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
	}
};

export default MdxComponents;
