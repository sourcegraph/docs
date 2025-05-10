'use client';

import { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import MdxComponents from '@/components/MdxComponents';

export function ContentTabs({ children, name }) {
	const params = useParams();
	const router = useRouter();
	const [onTab, setOnTab] = useState(true);
	const [selectedTab, setSelectedTab] = useState(null);
	const [postContent, setPostContent] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		updateTabFromURL();
	}, []);

	const updateTabFromURL = async () => {
		const path = `/${params.slug?.join('/') || ''}`;
		// @ts-ignore
		const allPaths = children.map(child => child.props.href);

		if (!allPaths.includes(path)) {
			setSelectedTab(allPaths[0]);
			
			try {
				// Clean up the path before sending to API
				const cleanPath = allPaths[0].startsWith('/') ? allPaths[0].substring(1) : allPaths[0];
				
				// We need to fetch the MDX content for the selected tab
				const response = await fetch(`/api/mdx?path=${encodeURIComponent(cleanPath)}`);
				
				if (response.ok) {
					const data = await response.json();
					setPostContent(
						<MDXRemote {...data.mdxSource} components={MdxComponents()} />
					);
					setOnTab(false);
					
					const url = new URL(window.location.href);
					url.pathname = allPaths[0];
					window.history.replaceState(null, null, url.toString());
				}
			} catch (error) {
				console.error('Failed to load MDX content:', error);
			}
		} else {
			setSelectedTab(path);
		}
	};

	if (!onTab) {
		if (loading) {
			return <div>Loading content...</div>;
		}
		return <div>{postContent}</div>;
	}

	return (
		<div>
			<div className="flex flex-wrap border-b overflow-auto">
				{children.map((child, index) => (
					<button
						key={index}
						className={clsx(
							'py-2 px-3 mr-4 text-sm transition-colors duration-300 whitespace-nowrap',
							selectedTab === child.props.href ? 'font-semibold border-b-2 border-[#3098AA] text-[#3098AA]' : 'hover:border-b-2 hover:border-gray-300 text-gray-500 dark:text-white'
						)}
						onClick={() => router.push(child.props.href)}
					>
						{child.props.title}
					</button>
				))}
			</div>
			<div className="mt-4">{postContent}</div>
		</div>
	);
}

export function ContentTab({ title, href, selected }) {
	return null;
}
