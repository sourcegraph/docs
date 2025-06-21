'use client';

import {useState, useEffect} from 'react';
import {MDXRemote} from 'next-mdx-remote';
import clsx from 'clsx';
import {useParams, useRouter} from 'next/navigation';
import MdxComponents from '@/components/MdxComponents';
import {getPostBySlug} from '@/lib/api';

export function ContentTabs({children, name}) {
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
		const allPaths = children.map(child => child.props.href);

		if (!allPaths.includes(path)) {
			setSelectedTab(allPaths[0]);
			setLoading(true);

			try {
				const cleanPath = allPaths[0].startsWith('/')
					? allPaths[0].substring(1)
					: allPaths[0];
				const post = await getPostBySlug(cleanPath);

				if (post) {
					setPostContent(
						<MDXRemote
							{...post.source}
							components={MdxComponents()}
						/>
					);
					setOnTab(false);

					const url = new URL(window.location.href);
					url.pathname = allPaths[0];
					window.history.replaceState(null, null, url.toString());
				}
			} catch (error) {
				console.error('Failed to load MDX content:', error);
			} finally {
				setLoading(false);
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
			<div className="flex flex-wrap overflow-auto border-b">
				{children.map((child, index) => (
					<button
						key={index}
						className={clsx(
							'mr-4 whitespace-nowrap px-3 py-2 text-sm transition-colors duration-300',
							selectedTab === child.props.href
								? 'border-b-2 border-[#3098AA] font-semibold text-[#3098AA]'
								: 'text-gray-500 hover:border-b-2 hover:border-gray-300 dark:text-white'
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

export function ContentTab({title, href, selected}) {
	return null;
}
