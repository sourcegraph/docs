import {CopyButton} from '@/components/CopyButton';
import dynamic from 'next/dynamic';
import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import config from '../../docs.config';

const Mermaid = dynamic(() => import('@/components/Mermaid').then(mod => mod.Mermaid), {
	ssr: false
});

interface PreProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
	raw?: string;
	'data-language'?: string;
	'data-theme'?: string;
}

interface ReleaseInfo {
	id: number;
	name: string;
	public: boolean;
	created_at: string;
	promoted_at: string;
	version: string;
	git_sha: string;
	is_development: boolean;
	tags: string[] | null;
	canonical_name: string;
}

async function getLatestVersion() {
	const url = new URL(
		'https://releaseregistry.sourcegraph.com/v1/releases/sourcegraph/latest'
	);

	try {
		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const releaseInfo: ReleaseInfo = await response.json();
		return releaseInfo.version;
	} catch (error) {
		return config.DOCS_LATEST_VERSION;
	}
}

function trimPrefix(str: string, prefix: string) {
	if (str.startsWith(prefix)) {
		return str.slice(prefix.length);
	}
	return str;
}

export async function CURRENT_VERSION_STRING() {
	const v = await getLatestVersion();
	return v;
}

export async function CURRENT_VERSION_STRING_NO_V() {
	const v = await getLatestVersion();
	return trimPrefix(v, 'v');
}

export async function PreCodeBlock({children, ...props}: PreProps) {
	const dataLanguage = props['data-language'];
	const dataTheme = props['data-theme'];
	const lang = dataLanguage || 'shell';

	let codeContent = props?.raw || '';

	// If raw prop is not available, try to extract content from children
	if (!codeContent && children) {
		const extractText = (node: React.ReactNode): string => {
			if (typeof node === 'string') return node;
			if (typeof node === 'number') return String(node);
			if (!node) return '';
			if (Array.isArray(node)) return node.map(extractText).join('');
			if (React.isValidElement(node) && node.props.children) {
				return extractText(node.props.children);
			}
			return '';
		};
		codeContent = extractText(children);
	}

	// Render mermaid diagrams
	if (lang === 'mermaid') {
		return <Mermaid chart={codeContent} />;
	}

	const version = await getLatestVersion();
	const version_no_v = trimPrefix(version, 'v');
	let mustReplaceVersions = false;
	if (
		codeContent.includes('{CURRENT_VERSION}') ||
		codeContent.includes('{CURRENT_VERSION_NO_V}')
	) {
		mustReplaceVersions = true;
	}
	codeContent = codeContent.replace(/{CURRENT_VERSION}/g, version);
	codeContent = codeContent.replace(/{CURRENT_VERSION_NO_V}/g, version_no_v);
	if (mustReplaceVersions) {
		children = codeContent;
	}

	return (
		<div className="relative">
			<pre className="pt-12" data-language={lang} data-theme={dataTheme}>
				<CopyButton lang={lang} text={codeContent} />
				{children}
			</pre>
		</div>
	);
}

export async function PreCode({children, ...props}: PreProps) {
	const isCodeBlock = props.style?.display === 'grid';
	// Only apply styles to inline code
	const codeClasses = isCodeBlock
		? 'bg-transparent'
		: 'border font-medium bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded-md border-slate-300 dark:border-slate-700';

	let codeContent = props?.raw || '';

	// If raw prop is not available, try to extract content from children
	if (!codeContent && children) {
		React.Children.forEach(children, child => {
			if (React.isValidElement(child) && child.props.children) {
				codeContent += child.props.children;
			}
		});
	}

	const version = await getLatestVersion();
	const version_no_v = trimPrefix(version, 'v');
	if (typeof children === 'string') {
		children = children
			.replace(/{CURRENT_VERSION}/g, version_no_v)
			.replace(/{CURRENT_VERSION_NO_V}/g, version_no_v);
	}

	return <code className={codeClasses}>{children}</code>;
}
