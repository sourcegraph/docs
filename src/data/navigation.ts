type Subsection = {
	title: string;
	href: string;
	preview?: boolean;
};

type Section = {
	title: string;
	href: string;
	subsections?: Subsection[];
	preview?: boolean;
};

export type Topic = {
	title: string;
	href: string;
	sections?: Section[];
	preview?: boolean;
};

export type NavigationItem = {
	separator: string;
	topics: Topic[];
};

export const navigation: NavigationItem[] = [
	{
		separator: 'Code Intelligence',
		topics: [
			{
				title: 'Code Search',
				href: '/code-search',
				sections: [
					{title: 'Features', href: '/code-search/features'},
					{
						title: 'Search Query Syntax',
						href: '/code-search/queries',
						subsections: [
							{
								title: 'Search Filters Panel',
								href: '/code-search/working/search-filters'
							},
							{
								title: 'Search Examples',
								href: '/code-search/queries/examples'
							},
							{
								title: 'Symbol Search',
								href: '/code-search/types/symbol'
							},
							{
								title: 'Language Reference',
								href: '/code-search/queries/language'
							}
						]
					},
					{
						title: 'Advanced Features',
						href: '/code-search/working/saved-searches',
						subsections: [
							{
								title: 'Fuzzy Finder',
								href: '/code-search/types/fuzzy'
							},
							{
								title: 'Search Contexts',
								href: '/code-search/working/search-contexts'
							},
							{
								title: 'Search Jobs',
								href: '/code-search/types/search-jobs'
							},
							{
								title: 'Search Snippets',
								href: '/code-search/working/snippets'
							},
							{
								title: 'Search Subexpressions',
								href: '/code-search/working/search-subexpressions'
							},
							{
								title: 'Saved Searches',
								href: '/code-search/working/saved-searches'
							},
							{
								title: 'Structural Search',
								href: '/code-search/types/structural'
							}
						]
					},
					{
						title: 'FAQs',
						href: '/code-search/faq'
					}
				]
			},
			{
				title: 'Deep Search',
				href: '/deep-search',
				sections: [
					{
						title: 'Slack Integration',
						href: '/slack-integration'
					}
				]
			},
			{
				title: 'Code Navigation',
				href: '/code-navigation',
				sections: [
					{
						title: 'Features',
						href: '/code-navigation/features'
					},
					{
						title: 'Search-based code navigation',
						href: '/code-navigation/search-based-code-navigation'
					},
					{
						title: 'Precise code navigation',
						href: '/code-navigation/precise-code-navigation'
					},
					{
						title: 'Syntactic code navigation',
						href: '/code-navigation/syntactic-code-navigation'
					},
					{
						title: 'Auto-indexing',
						href: '/code-navigation/auto-indexing'
					},
					{
						title: 'Environment Variables',
						href: '/code-navigation/envvars'
					},
					{
						title: 'Troubleshooting',
						href: '/code-navigation/troubleshooting'
					}
				]
			},
			{
				title: 'Cody',
				href: '/cody',
				sections: [
					{title: 'Quickstart', href: '/cody/quickstart'},
					{
						title: 'Installation',
						href: '/cody/clients',
						subsections: [
							{
								title: 'Cody for VS Code',
								href: '/cody/clients/install-vscode'
							},
							{
								title: 'Cody for JetBrains',
								href: '/cody/clients/install-jetbrains'
							},
							{
								title: 'Cody for Visual Studio',
								href: '/cody/clients/install-visual-studio'
							},
							// { title: "Cody for Eclipse", href: "/cody/clients/install-eclipse", },
							{
								title: 'Cody for Web',
								href: '/cody/clients/cody-with-sourcegraph'
							}
						]
					},
					{
						title: 'Cody for Enterprise',
						href: '/cody/clients/enable-cody-enterprise',
						subsections: [
							{
								title: 'Features',
								href: '/cody/enterprise/features'
							},
							{
								title: 'Completions Configuration',
								href: '/cody/enterprise/completions-configuration'
							},
							{
								title: 'Model Configuration',
								href: '/cody/enterprise/model-configuration'
							},
							{
								title: 'Model Configuration examples',
								href: '/cody/enterprise/model-config-examples'
							}
						]
					},
					{
						title: 'Capabilities',
						href: '/cody/capabilities',
						subsections: [
							{title: 'Chat', href: '/cody/capabilities/chat'},
							{
								title: 'Agentic Context Fetching',
								href: '/cody/capabilities/agentic-context-fetching'
							},
							{
								title: 'Auto-edit',
								href: '/cody/capabilities/auto-edit'
							},
							{
								title: 'Autocomplete',
								href: '/cody/capabilities/autocomplete'
							},
							{
								title: 'Prompts',
								href: '/cody/capabilities/prompts'
							},
							{
								title: 'Debug Code',
								href: '/cody/capabilities/debug-code'
							},
							{
								title: 'Context Filters',
								href: '/cody/capabilities/ignore-context'
							},
							{
								title: 'Proxy Setup',
								href: '/cody/capabilities/proxy-setup'
							},
							{
								title: 'Supported Models',
								href: '/cody/capabilities/supported-models'
							},
							{
								title: 'Feature Parity Reference',
								href: '/cody/clients/feature-reference'
							}
						]
					},
					{
						title: 'Core Concepts',
						href: '/cody/core-concepts/context',
						subsections: [
							{
								title: 'Context',
								href: '/cody/core-concepts/context'
							},
							{
								title: 'Token Limits',
								href: '/cody/core-concepts/token-limits'
							},
							{
								title: 'Prompts Guide',
								href: '/cody/prompts-guide'
							},
							{
								title: 'Enterprise Architecture',
								href: '/admin/architecture#cody'
							}
						]
					},
					{title: 'Troubleshooting', href: '/cody/troubleshooting'},
					{title: 'FAQs', href: '/cody/faq'}
				]
			}
		]
	},
	{
		separator: 'Code Management',
		topics: [
			{
				title: 'Batch Changes',
				href: '/batch-changes',
				sections: [
					{title: 'Quickstart', href: '/batch-changes/quickstart'},
					{
						title: 'Create a Batch Change',
						href: '/batch-changes/create-a-batch-change',
						subsections: [
							{
								title: 'Sourcegraph UI',
								href: '/batch-changes/create-a-batch-change#on-your-sourcegraph-instance'
							},
							{
								title: 'Sourcegraph CLI',
								href: '/batch-changes/create-a-batch-change#using-the-sourcegraph-cli'
							}
						]
					},
					{
						title: 'View Batch Changes',
						href: '/batch-changes/view-batch-changes'
					},
					{
						title: 'Update a Batch Change',
						href: '/batch-changes/update-a-batch-change'
					},
					{
						title: 'Close a Batch Change',
						href: '/batch-changes/delete-a-batch-change'
					},
					{
						title: 'Bulk Operations',
						href: '/batch-changes/bulk-operations-on-changesets',
						subsections: [
							{
								title: 'Publishing Changesets',
								href: '/batch-changes/publishing-changesets'
							},
							{
								title: 'Pushing Code',
								href: '/batch-changes/push-only-changesets'
							},
							{
								title: 'Tracking Changesets',
								href: '/batch-changes/tracking-existing-changesets'
							},
							{
								title: 'Rebasing Changesets',
								href: '/batch-changes/rebasing-changesets'
							}
						]
					},
					{
						title: 'Configuring Credentials',
						href: '/batch-changes/configuring-credentials',
						subsections: [
							{
								title: 'Site Admin Config',
								href: '/batch-changes/site-admin-configuration'
							}
						]
					},
					{
						title: 'Access Permissions',
						href: '/batch-changes/permissions-in-batch-changes'
					},
					{
						title: 'Changesets in Monorepos',
						href: '/batch-changes/creating-changesets-per-project-in-monorepos',
						subsections: [
							{
								title: 'Changesets in Large Repos',
								href: '/batch-changes/creating-multiple-changesets-in-large-repositories'
							}
						]
					},
					{
						title: 'Error Handling',
						href: '/batch-changes/handling-errored-changesets'
					},
					{
						title: 'Examples',
						href: '/batch-changes/examples',
						subsections: [
							{
								title: 'Refactor Go Code via Comby',
								href: '/batch-changes/refactor-go-comby'
							},
							{
								title: 'Update Go Import Statements via Comby',
								href: '/batch-changes/updating-go-import-statements'
							},
							{
								title: 'Update Base Images in Dockerfiles',
								href: '/batch-changes/update-base-images-in-dockerfiles'
							},
							{
								title: 'Search and Replace Specific Terms',
								href: '/batch-changes/search-and-replace-specific-terms'
							}
						]
					},
					{
						title: 'Batch Spec Reference',
						href: '/batch-changes/batch-spec-yaml-reference',
						subsections: [
							{
								title: 'Batch Spec Templating',
								href: '/batch-changes/batch-spec-templating'
							},
							{
								title: 'Batch Spec Cheatsheet',
								href: '/batch-changes/batch-spec-cheat-sheet'
							}
						]
					},
					{
						title: 'Working with the CLI',
						href: '/batch-changes/how-src-executes-a-batch-spec',
						subsections: [
							{
								title: 'Re-executing Batch Specs',
								href: '/batch-changes/reexecuting-batch-specs-multiple-times'
							},
							{
								title: 'CLI Subcommands',
								href: '/cli/references/batch'
							}
						]
					},
					{
						title: 'Troubleshooting',
						href: '/batch-changes/troubleshooting'
					},
					{title: 'FAQs', href: '/batch-changes/faq'}
				]
			},
			{
				title: 'Code Monitoring',
				href: '/code-monitoring'
			},
			{
				title: 'Code Ownership',
				href: '/own',
				sections: [
					{
						title: 'CODEOWNERS Format',
						href: '/own/codeowners-format'
					},
				]
			},
			{
				title: 'Code Insights',
				href: '/code-insights',
				sections: [
					{title: 'Quickstart', href: '/code-insights/quickstart'},
					{
						title: 'Explanations',
						href: '/code-insights/explanations'
					},
					{title: 'How-to Guides', href: '/code-insights/how-tos'},
					{title: 'References', href: '/code-insights/references'}
				]
			}
		]
	},
	{
		separator: 'Developer Tools',
		topics: [
			{
				title: 'Sourcegraph CLI',
				href: '/cli',
				sections: [
					{title: 'Quickstart', href: '/cli/quickstart'},
					{title: 'Explanations', href: '/cli/explanations'},
					{title: 'How-to Guides', href: '/cli/how-tos'},
					{title: 'References', href: '/cli/references'}
				]
			},
			{
				title: 'Cody CLI',
				href: '/cody/clients/install-cli'
			},
			{
				title: 'Browser Extension',
				href: '/integration/browser-extension',
				sections: [
					{
						title: 'Browser Search Engine',
						href: '/integration/browser-extension/how-tos/browser-search-engine'
					}
				]
			},
			{
				title: 'Editor Extensions',
				href: '/integration/editor'
			},
			{
				title: 'APIs',
				href: '/api/graphql',
				sections: [
					{title: 'GraphQL API', href: '/api/graphql'},
					{title: 'Stream API', href: '/api/stream-api'},
					{title: 'Analytics API', href: '/analytics/api'},
					{
						title: 'Deep Search API',
						href: '/deep-search/api',
						preview: true
					}
				]
			},
			{
				title: 'MCP Server',
				href: '/api/mcp'
			}
		]
	},
	{
		separator: 'Platform',
		topics: [
			{
				title: 'Sourcegraph Admin',
				href: '/admin',
				sections: [
					{title: 'Configuration', href: '/admin'},
					{title: 'Licensing', href: '/admin/licensing'},
					{
						title: 'Enterprise Portal',
						href: '/admin/enterprise-portal'
					},
					{title: 'Codehosts', href: '/admin/code-hosts'},
					{title: 'User Authentication', href: '/admin/auth'},
					{title: 'Access Control', href: '/admin/access-control'},
					{
						title: 'Repository Permissions',
						href: '/admin/permissions'
					},
					{title: 'OAuth Apps', href: '/admin/oauth-apps'},
					{title: 'Executors', href: '/admin/executors'},
					{title: 'FAQs', href: '/admin/faq'},
					{title: 'How-to Guides', href: '/admin/how-to'},
					{title: 'Architecture', href: '/admin/architecture'}
				]
			},
			{
				title: 'Sourcegraph Cloud',
				href: '/cloud'
			},
			{
				title: 'Enterprise Self-Hosted',
				href: '/self-hosted',
				sections: [
					{
						title: 'Deploy',
						href: '/self-hosted/deploy',
						subsections: [
							{
								title: 'Single-node',
								href: '/self-hosted/deploy/single-node'
							},
							{
								title: 'Docker Compose',
								href: '/self-hosted/deploy/docker-compose'
							},
							{
								title: 'Kubernetes',
								href: '/self-hosted/deploy/kubernetes'
							},
							{
								title: 'Machine Images',
								href: '/self-hosted/deploy/machine-images'
							}
						]
					},
					{
						title: 'Upgrade',
						href: '/self-hosted/updates',
						subsections: [
							{
								title: 'Migrator',
								href: '/self-hosted/updates/migrator'
							}
						]
					},
					{
						title: 'External Services',
						href: '/self-hosted/external-services'
					},
					{
						title: 'Executors',
						href: '/self-hosted/executors'
					},
					{
						title: 'Observability',
						href: '/self-hosted/observability'
					},
					{
						title: 'How-to Guides',
						href: '/self-hosted/how-to'
					},
					{
						title: 'FAQs',
						href: '/self-hosted/faq'
					}
				]
			},
			{
				title: 'Sourcegraph Analytics',
				href: '/analytics',
				sections: [
					{title: 'Metrics', href: '/analytics#metrics'},
					{title: 'API', href: '/analytics/api'}
				]
			},
			{
				title: 'Sourcegraph Model Provider',
				href: '/model-provider'
			}
		]
	},
	{
		separator: 'Pricing',
		topics: [
			{
				title: 'Plans',
				href: '/pricing/plans',
				sections: [
					{title: 'Free', href: '/pricing/plans/free'},
					{
						title: 'Enterprise Starter',
						href: '/pricing/plans/enterprise-starter'
					},
					{title: 'Enterprise', href: '/pricing/plans/enterprise'}
				]
			},
			{
				title: 'Plan Comparison',
				href: '/pricing/plan-comparison'
			},
			{
				title: 'FAQs',
				href: '/pricing/faqs'
			}
		]
	},
	{
		separator: 'Help & Support',
		topics: [
			{
				title: 'SLAs & Premium Support',
				href: '/sla'
			},
			{
				title: 'Tutorials',
				href: '/tutorials'
			},
			{
				title: 'Sourcegraph Accounts',
				href: '/sourcegraph-accounts'
			},
			{
				title: 'Changelog',
				href: 'https://sourcegraph.com/changelog'
			},
			{
				title: 'Releases',
				href: '/releases'
			}
		]
	}
];
