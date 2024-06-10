'use client';

import { useState, useEffect } from 'react';
import { getMDXComponent } from 'next-contentlayer/hooks';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import MdxComponents from '@/components/MdxComponents';

export function ContentTabs({ children, name }) {
  const params = useParams();
  const router = useRouter();
  const [onTab, setOnTab] = useState(true)
  const [selectedTab, setSelectedTab] = useState(null);
  const [postContent, setPostContent] = useState(null);

  useEffect(() => {
    updateTabFromURL();
  }, []);

  const updateTabFromURL = () => {

    const path = `/${params.slug.join('/')}`;
    const allPaths = children.map(child => child.props.href)

    if (!allPaths.includes(path)) {
      setSelectedTab(allPaths[0])
      const selectedPost = allPosts.find(post => `/${post._raw.flattenedPath}` === allPaths[0] && name == 'main');

      if (selectedPost) {
        const Content = getMDXComponent(selectedPost.body.code);
        setPostContent(<Content components={MdxComponents()} />);
        setOnTab(false)
        
        const url = new URL(window.location.href);
        url.pathname = allPaths[0];
        window.history.replaceState(null, null, url.toString());
        console.log('allPaths__', allPaths[0])
      }
    } else setSelectedTab(path)
  };

  if (!onTab) return <div>{postContent}</div>

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
