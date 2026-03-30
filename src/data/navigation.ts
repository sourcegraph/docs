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
					{title: 'Query assist', href: '/code-search/query-assist'},
					{
						title: 'Search query syntax',
						href: '/code-search/queries',
						subsections: [
							{
								title: 'Search filters',
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
								title: 'Search query language reference',
								href: '/code-search/queries/language'
							}
						]
					},
					{
						title: 'Advanced features',
						href: '/code-search/features',
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
								title: 'Saved Searches',
								href: '/code-search/working/saved-searches'
							},
							{
								title: 'Structural search',
								href: '/code-search/types/structural'
							}
						]
					},
					{
						title: 'Cody FAQs',
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
						title: 'Code Navigation features',
						href: '/code-navigation/features'
					},
					{
						title: 'Search-based Code Navigation',
						href: '/code-navigation/search-based-code-navigation'
					},
					{
						title: 'Precise Code Navigation',
						href: '/code-navigation/precise-code-navigation'
					},
					{
						title: 'Syntactic Code Navigation',
						href: '/code-navigation/syntactic-code-navigation'
					},
					{
						title: 'Auto-indexing',
						href: '/code-navigation/auto-indexing'
					},
					{
						title: 'Code Navigation environment variables',
						href: '/code-navigation/envvars'
					},
					{
						title: 'Code Navigation troubleshooting guide',
						href: '/code-navigation/troubleshooting'
					}
				]
			},
			{
				title: 'Cody',
				href: '/cody',
				sections: [
					{title: 'Cody quickstart', href: '/cody/quickstart'},
					{
						title: 'Cody clients',
						href: '/cody/clients',
						subsections: [
							{
								title: 'Installing Cody in VS Code',
								href: '/cody/clients/install-vscode'
							},
							{
								title: 'Installing Cody for JetBrains',
								href: '/cody/clients/install-jetbrains'
							},
							{
								title: 'Installing Cody in Visual Studio',
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
								title: 'Cody Enterprise features',
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
						title: 'Cody capabilities',
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
								title: 'Manage Cody context',
								href: '/cody/capabilities/ignore-context'
							},
							{
								title: 'Run Cody via proxies',
								href: '/cody/capabilities/proxy-setup'
							},
							{
								title: 'Supported LLMs',
								href: '/cody/capabilities/supported-models'
							},
							{
								title: 'Feature parity reference for Cody clients',
								href: '/cody/clients/feature-reference'
							}
						]
					},
					{
						title: 'Cody context',
						href: '/cody/core-concepts/context',
						subsections: [
							{
								title: 'Cody context',
								href: '/cody/core-concepts/context'
							},
							{
								title: 'Cody input and output token limits',
								href: '/cody/core-concepts/token-limits'
							},
							{
								title: 'Cody prompting guide',
								href: '/cody/prompts-guide'
							},
							{
								title: 'Sourcegraph architecture',
								href: '/admin/architecture#cody'
							}
						]
					},
					{
						title: 'Troubleshooting Cody',
						href: '/cody/troubleshooting'
					},
					{title: 'Administration FAQ', href: '/cody/faq'}
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
						title: 'Creating a batch change',
						href: '/batch-changes/create-a-batch-change',
						subsections: [
							{
								title: 'On your Sourcegraph instance',
								href: '/batch-changes/create-a-batch-change#on-your-sourcegraph-instance'
							},
							{
								title: 'Using the Sourcegraph CLI',
								href: '/batch-changes/create-a-batch-change#using-the-sourcegraph-cli'
							}
						]
					},
					{
						title: 'Viewing batch changes',
						href: '/batch-changes/view-batch-changes'
					},
					{
						title: 'Update a batch change',
						href: '/batch-changes/update-a-batch-change'
					},
					{
						title: 'Closing and deleting a batch change',
						href: '/batch-changes/delete-a-batch-change'
					},
					{
						title: 'Bulk operations on changesets',
						href: '/batch-changes/bulk-operations-on-changesets',
						subsections: [
							{
								title: 'Publishing changesets to the code host',
								href: '/batch-changes/publishing-changesets'
							},
							{
								title: 'Pushing code to a code host',
								href: '/batch-changes/push-only-changesets'
							},
							{
								title: 'Tracking existing changesets',
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
								title: 'Admin configuration for Batch Changes',
								href: '/batch-changes/site-admin-configuration'
							}
						]
					},
					{
						title: 'Permissions in Batch Changes',
						href: '/batch-changes/permissions-in-batch-changes'
					},
					{
						title: 'Creating changesets per project in monorepos',
						href: '/batch-changes/creating-changesets-per-project-in-monorepos',
						subsections: [
							{
								title: 'Creating multiple changesets in large repositories',
								href: '/batch-changes/creating-multiple-changesets-in-large-repositories'
							}
						]
					},
					{
						title: 'Error handling of changesets',
						href: '/batch-changes/handling-errored-changesets'
					},
					{
						title: 'Examples',
						href: '/batch-changes/examples',
						subsections: [
							{
								title: 'Refactor Go code using Comby',
								href: '/batch-changes/refactor-go-comby'
							},
							{
								title: 'Updating Go import statements using Comby',
								href: '/batch-changes/updating-go-import-statements'
							},
							{
								title: 'Updating base images in Dockerfiles',
								href: '/batch-changes/update-base-images-in-dockerfiles'
							},
							{
								title: 'Search and replace specific terms',
								href: '/batch-changes/search-and-replace-specific-terms'
							}
						]
					},
					{
						title: 'Batch spec YAML reference',
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
						title: 'How `src` executes a batch spec',
						href: '/batch-changes/how-src-executes-a-batch-spec',
						subsections: [
							{
								title: 'Re-executing batch specs multiple times',
								href: '/batch-changes/reexecuting-batch-specs-multiple-times'
							},
							{
								title: '`src batch`',
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
				title: 'Code Insights',
				href: '/code-insights',
				sections: [
					{
						title: 'Quickstart for src',
						href: '/code-insights/quickstart'
					},
					{
						title: 'Explanations',
						href: '/code-insights/explanations'
					},
					{title: 'How-tos', href: '/code-insights/how-tos'},
					{title: '`src`', href: '/code-insights/references'}
				]
			},
			{
				title: 'Code Ownership',
				href: '/code-ownership',
				sections: [
					{
						title: 'The CODEOWNERS format',
						href: '/code-ownership/codeowners-format'
					}
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
					{title: 'How-tos', href: '/cli/how-tos'},
					{title: 'References', href: '/cli/references'}
				]
			},
			{
				title: 'Install Cody CLI',
				href: '/cody/clients/install-cli'
			},
			{
				title: 'Browser extensions',
				href: '/integration/browser-extension',
				sections: [
					{
						title: 'Browser search engine shortcuts',
						href: '/integration/browser-extension/how-tos/browser-search-engine'
					}
				]
			},
			{
				title: 'Editor integrations',
				href: '/integration/editor'
			},
			{
				title: 'Sourcegraph API',
				href: '/api',
				sections: [
					{title: 'Sourcegraph API', href: '/api'},
					{
						title: 'Sourcegraph streaming search API',
						href: '/api/stream-api'
					},
					{
						title: 'Sourcegraph Analytics API',
						href: '/analytics/api'
					},
					{
						title: 'Sourcegraph GraphQL debug API',
						href: '/api/graphql'
					}
				]
			},
			{
				title: 'Sourcegraph MCP server',
				href: '/api/mcp',
				sections: [
					{title: 'Client integrations', href: '/api/mcp/client-integrations'}
				]
			}
		]
	},
	{
		separator: 'Platform',
		topics: [
			{
				title: 'Administration',
				href: '/admin',
				sections: [
					{title: 'Administration', href: '/admin'},
					{title: 'Licensing', href: '/admin/licensing'},
					{
						title: 'Sourcegraph Enterprise Portal',
						href: '/admin/enterprise-portal'
					},
					{title: 'Code host connections', href: '/admin/code-hosts'},
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
					{
						title: 'Sourcegraph architecture',
						href: '/admin/architecture'
					}
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
						title: 'Deployment',
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
								title: 'Sourcegraph on Kubernetes with Helm',
								href: '/self-hosted/deploy/kubernetes'
							},
							{
								title: 'Sourcegraph machine images',
								href: '/self-hosted/deploy/machine-images'
							}
						]
					},
					{
						title: 'Updating Sourcegraph',
						href: '/self-hosted/updates',
						subsections: [
							{
								title: 'Migrator resources',
								href: '/self-hosted/updates/migrator'
							}
						]
					},
					{
						title: 'Using external services',
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
					{title: 'Sourcegraph Analytics API', href: '/analytics/api'}
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
				title: 'Sourcegraph pricing plans',
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
				title: 'Sourcegraph pricing plan comparison',
				href: '/pricing/plan-comparison'
			},
			{
				title: 'FAQs',
				href: '/pricing/faqs'
			}
		]
	},
	{
		separator: 'Help & support',
		topics: [
			{
				title: 'SLAs and premium support',
				href: '/sla'
			},
			{
				title: 'Sourcegraph tutorials',
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
				title: 'Sourcegraph releases',
				href: '/releases'
			}
		]
	}
];
