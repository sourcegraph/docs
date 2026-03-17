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
		separator: 'Code intelligence',
		topics: [
			{
				title: 'Code Search',
				href: '/code-search',
				sections: [
					{title: 'Features', href: '/code-search/features'},
						{
							title: 'Search query syntax',
							href: '/code-search/queries',
							subsections: [
								{
									title: 'Search filters panel',
									href: '/code-search/working/search-filters'
								},
								{
									title: 'Search examples',
									href: '/code-search/queries/examples'
								},
								{
									title: 'Symbol search',
									href: '/code-search/types/symbol'
								},
								{
									title: 'Language reference',
									href: '/code-search/queries/language'
								}
							]
						},
						{
							title: 'Advanced features',
							href: '/code-search/working/saved-searches',
							subsections: [
								{
									title: 'Fuzzy finder',
									href: '/code-search/types/fuzzy'
								},
								{
									title: 'Search contexts',
									href: '/code-search/working/search-contexts'
								},
								{
									title: 'Search jobs',
									href: '/code-search/types/search-jobs'
								},
								{
									title: 'Search snippets',
									href: '/code-search/working/snippets'
								},
								{
									title: 'Search subexpressions',
									href: '/code-search/working/search-subexpressions'
								},
								{
									title: 'Saved searches',
									href: '/code-search/working/saved-searches'
								},
								{
									title: 'Structural search',
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
							title: 'Slack integration',
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
							title: 'Environment variables',
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
							title: 'Completions configuration',
							href: '/cody/enterprise/completions-configuration'
						},
						{
							title: 'Model configuration',
							href: '/cody/enterprise/model-configuration'
						},
						{
							title: 'Model configuration examples',
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
									title: 'Agentic context fetching',
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
									title: 'Debug code',
									href: '/cody/capabilities/debug-code'
								},
								{
									title: 'Context filters',
									href: '/cody/capabilities/ignore-context'
								},
								{
									title: 'Proxy setup',
									href: '/cody/capabilities/proxy-setup'
								},
								{
									title: 'Supported models',
									href: '/cody/capabilities/supported-models'
								},
								{
									title: 'Feature parity reference',
									href: '/cody/clients/feature-reference'
								}
							]
						},
						{
							title: 'Core concepts',
							href: '/cody/core-concepts/context',
							subsections: [
							{
								title: 'Context',
								href: '/cody/core-concepts/context'
							},
								{
									title: 'Token limits',
									href: '/cody/core-concepts/token-limits'
								},
								{
									title: 'Prompts guide',
									href: '/cody/prompts-guide'
								},
								{
									title: 'Enterprise architecture',
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
			separator: 'Code management',
		topics: [
			{
				title: 'Batch Changes',
				href: '/batch-changes',
				sections: [
					{title: 'Quickstart', href: '/batch-changes/quickstart'},
						{
							title: 'Create a batch change',
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
							title: 'Update a batch change',
							href: '/batch-changes/update-a-batch-change'
						},
						{
							title: 'Close a batch change',
							href: '/batch-changes/delete-a-batch-change'
						},
						{
							title: 'Bulk operations',
							href: '/batch-changes/bulk-operations-on-changesets',
							subsections: [
								{
									title: 'Publishing changesets',
									href: '/batch-changes/publishing-changesets'
								},
								{
									title: 'Pushing code',
									href: '/batch-changes/push-only-changesets'
								},
								{
									title: 'Tracking changesets',
									href: '/batch-changes/tracking-existing-changesets'
								},
								{
									title: 'Rebasing changesets',
									href: '/batch-changes/rebasing-changesets'
								}
							]
						},
						{
							title: 'Configuring credentials',
							href: '/batch-changes/configuring-credentials',
							subsections: [
								{
									title: 'Site admin config',
									href: '/batch-changes/site-admin-configuration'
								}
							]
						},
						{
							title: 'Access permissions',
							href: '/batch-changes/permissions-in-batch-changes'
						},
						{
							title: 'Changesets in monorepos',
							href: '/batch-changes/creating-changesets-per-project-in-monorepos',
							subsections: [
								{
									title: 'Changesets in large repos',
									href: '/batch-changes/creating-multiple-changesets-in-large-repositories'
								}
							]
						},
						{
							title: 'Error handling',
							href: '/batch-changes/handling-errored-changesets'
						},
					{
						title: 'Examples',
						href: '/batch-changes/examples',
						subsections: [
								{
									title: 'Refactor Go code via Comby',
									href: '/batch-changes/refactor-go-comby'
								},
								{
									title: 'Update Go import statements via Comby',
									href: '/batch-changes/updating-go-import-statements'
								},
								{
									title: 'Update base images in Dockerfiles',
									href: '/batch-changes/update-base-images-in-dockerfiles'
								},
								{
									title: 'Search and replace specific terms',
									href: '/batch-changes/search-and-replace-specific-terms'
								}
							]
						},
						{
							title: 'Batch spec reference',
							href: '/batch-changes/batch-spec-yaml-reference',
							subsections: [
								{
									title: 'Batch spec templating',
									href: '/batch-changes/batch-spec-templating'
								},
								{
									title: 'Batch spec cheatsheet',
									href: '/batch-changes/batch-spec-cheat-sheet'
								}
							]
						},
					{
						title: 'Working with the CLI',
						href: '/batch-changes/how-src-executes-a-batch-spec',
						subsections: [
								{
									title: 'Re-executing batch specs',
									href: '/batch-changes/reexecuting-batch-specs-multiple-times'
								},
								{
									title: 'CLI subcommands',
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
					href: '/code-ownership',
					sections: [
						{
							title: 'CODEOWNERS format',
							href: '/code-ownership/codeowners-format'
						}
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
						{title: 'How-to guides', href: '/code-insights/how-tos'},
					{title: 'References', href: '/code-insights/references'}
				]
			}
		]
	},
		{
			separator: 'Developer tools',
		topics: [
			{
				title: 'Sourcegraph CLI',
				href: '/cli',
				sections: [
					{title: 'Quickstart', href: '/cli/quickstart'},
					{title: 'Explanations', href: '/cli/explanations'},
						{title: 'How-to guides', href: '/cli/how-tos'},
					{title: 'References', href: '/cli/references'}
				]
			},
			{
				title: 'Cody CLI',
				href: '/cody/clients/install-cli'
			},
				{
					title: 'Browser extension',
					href: '/integration/browser-extension',
					sections: [
						{
							title: 'Browser search engine',
							href: '/integration/browser-extension/how-tos/browser-search-engine'
						}
					]
				},
				{
					title: 'Editor extensions',
					href: '/integration/editor'
				},
			{
				title: 'APIs',
				href: '/api',
				sections: [
					{title: 'Sourcegraph API', href: '/api'},
					{title: 'Streaming search API', href: '/api/stream-api'},
					{title: 'Analytics API', href: '/analytics/api'},
					{title: 'Debug API', href: '/api/graphql'}
				]
			},
				{
					title: 'MCP server',
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
							title: 'Enterprise portal',
							href: '/admin/enterprise-portal'
						},
					{title: 'Codehosts', href: '/admin/code-hosts'},
						{title: 'User authentication', href: '/admin/auth'},
						{title: 'Access control', href: '/admin/access-control'},
						{
							title: 'Repository permissions',
							href: '/admin/permissions'
						},
						{title: 'OAuth apps', href: '/admin/oauth-apps'},
					{title: 'Executors', href: '/admin/executors'},
					{title: 'FAQs', href: '/admin/faq'},
						{title: 'How-to guides', href: '/admin/how-to'},
					{title: 'Architecture', href: '/admin/architecture'}
				]
			},
			{
				title: 'Sourcegraph Cloud',
				href: '/cloud'
			},
				{
					title: 'Enterprise self-hosted',
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
							title: 'External services',
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
							title: 'How-to guides',
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
					title: 'Plan comparison',
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
					title: 'SLAs & premium support',
					href: '/sla'
				},
			{
				title: 'Tutorials',
				href: '/tutorials'
			},
				{
					title: 'Sourcegraph accounts',
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
