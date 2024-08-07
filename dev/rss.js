const { Feed } = require('feed');
const fs = require('fs');
const path = require('path');

const generateRssFeed = () => {
    const siteURL = 'https://example.com';
    const date = new Date();

    const feed = new Feed({
        title: 'Your Site Name',
        description: 'Your site description',
        id: siteURL,
        link: siteURL,
        language: 'en',
        image: `${siteURL}/favicon.png`,
        favicon: `${siteURL}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, Your Name`,
        updated: date,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${siteURL}/rss.xml`,
        },
        author: {
            name: 'Your Name',
            email: 'your-email@example.com',
            link: siteURL,
        },
    });

    // Here, you would typically fetch your posts or content
    // This is just an example
    const posts = [
        { title: 'Post 1', slug: 'post-1', content: 'Content 1' },
        { title: 'Post 2', slug: 'post-2', content: 'Content 2' },
    ];

    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `${siteURL}/${post.slug}`,
            link: `${siteURL}/${post.slug}`,
            description: post.content,
            date: new Date(),
        });
    });

    fs.writeFileSync(path.join(__dirname, '../public/changelog.rss'), feed.rss2());
}

module.exports = { generateRssFeed }
