import AWSOneClickLaunchForm from './AWSOneClickLaunchForm';
import {ContentTab, ContentTabs} from './ContentTabs';
import FeatureParity from './FeatureParity';
import Accordion from './mdx/Accordion';
import {Callout} from './mdx/Callout';
import {TierCallout} from './mdx/TierCallout';
import {CustomLink} from './mdx/CustomLink';
import {Heading} from './mdx/Heading';
import {LinkCard, LinkCards} from './mdx/LinkCards';
import {ProductCard, ProductCards} from './mdx/ProductCards';
import {QuickLink, QuickLinks} from './mdx/QuickLinks';
import {Tab, Tabs} from './mdx/Tabs';
import {PreCode, PreCodeBlock} from './PreCodeBlock';
import {
	SupportedReleasesTable,
	DeprecatedReleasesTable
} from './ReleasesTable';
import ResourceEstimator from './resource-estimator/ResourceEstimator';
import {Badge} from './ui/badge';

const MdxComponents = (version?: string) => {
	return {
		FeatureParity,
		ResourceEstimator,
		AWSOneClickLaunchForm,
		Accordion,
		ContentTabs: (props: any) => <ContentTabs {...props} />,
		ContentTab: (props: any) => <ContentTab {...props} />,
		Tabs: (props: any) => <Tabs {...props} />,
		Tab: (props: any) => <Tab {...props} />,
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

			return <PreCode className={codeClasses} {...props} />;
		},
		a: (props: any) => <CustomLink {...props} version={version} />,
		h2: (props: any) => {
			return <Heading level="2" id={props.id} props={props} />;
		},
		h3: (props: any) => {
			return <Heading level="3" id={props.id} props={props} />;
		},
		h4: (props: any) => {
			return <Heading level="4" id={props.id} props={props} />;
		},
		h5: (props: any) => {
			return <Heading level="5" id={props.id} props={props} />;
		},
		h6: (props: any) => {
			return <Heading level="6" id={props.id} props={props} />;
		},
		img: (props: any) => {
			return <img className="rounded-xl" {...props} />;
		},
		video: (props: any) => {
			return <video className="rounded-xl" {...props} />;
		},
		pre: (props: any) => <PreCodeBlock {...props} />,
		table: (props: any) => (
			<div {...props} className="w-full table-auto overflow-x-auto">
				<table>{props.children}</table>
			</div>
		),
		Badge,
		TierCallout,
		SupportedReleasesTable,
		DeprecatedReleasesTable
	};
};

export default MdxComponents;
