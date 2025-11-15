const {Feed} = require('feed');
const fs = require('fs');
const path = require('path');

const loadChangelog = () => {
	const changelogPath = path.join(
		__dirname,
		'..',
		'docs',
		'technical-changelog.mdx'
	);
	return fs.readFileSync(changelogPath, 'utf8');
};

const extractRSSComments = content => {
	const regex = /\{\/\*\s*RSS=(.*?)\s*\*\/}/g;
	const matches = [];
	let match;

	while ((match = regex.exec(content)) !== null) {
		matches.push(JSON.parse(match[1].trim()));
	}

	return matches;
};

const generateRssFeed = () => {
	const baseURL = 'https://sourcegraph.com';
	const siteURL = 'https://sourcegraph.com/docs';
	const date = new Date();

	const feed = new Feed({
		title: 'Sourcegraph RSS',
		description: 'RSS feed for Sourcegraph',
		id: siteURL,
		link: baseURL,
		language: 'en',
		image: `${siteURL}/sourcegraph-mark.png`,
		favicon: `${siteURL}/sourcegraph-mark.png`,
		copyright: `All rights reserved ${date.getFullYear()}, Sourcegraph`,
		updated: date,
		generator: 'Sourcegraph RSS Feed',
		feedLinks: {
			rss2: `${siteURL}/technical-changelog.rss`
		},
		author: {
			name: 'Sourcegraph',
			email: 'hi@sourcegraph.com',
			link: 'https://sourcegraph.com'
		}
	});

	const changelog = loadChangelog();
	const rssComments = extractRSSComments(changelog);

	// the rss comments have the structure: {/* RSS={"version":"vX.Y.Z", "releasedAt": "<TS>" */}
	for (let idx = 0; idx < rssComments.length; idx++) {
		const comment = rssComments[idx];
		if (!comment.version || !comment.releasedAt) {
			continue;
		}
		const tag = comment.version.replace('v', '');
		const versionDocLink = `${siteURL}/technical-changelog#${comment.version.replaceAll(
			'.',
			''
		)}`;
		feed.addItem({
			title: `Sourcegraph ${tag}`,
			id: comment.version,
			link: versionDocLink,
			description: `Sourcegraph ${tag} is now available! Note: we've updated our versioning conventions. Please see our releases page for more information.`,
			date: new Date(comment.releasedAt)
		});
	}

	fs.writeFileSync(
		path.join(__dirname, '../public/technical-changelog.rss'),
		feed.rss2()
	);
};

module.exports = {generateRssFeed};
