/** @type {import('prettier').Options} */
module.exports = {
	trailingComma: 'none',
	bracketSpacing: false,
	arrowParens: 'avoid',
	singleQuote: true,
	printWidth: 80,
	useTabs: true,
	tabWidth: 4,
	semi: true,
	plugins: ['prettier-plugin-tailwindcss'],
	// Nested Markdown bullets are indented 2 spaces (.markdownlint-cli2.jsonc)
	overrides: [{files: ['*.md', '*.mdx'], options: {tabWidth: 2}}]
};
