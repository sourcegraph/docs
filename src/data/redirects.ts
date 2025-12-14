const redirectsData = [
	{
		source: '/docs/admin/deploy_executors',
		destination:
			'https://sourcegraph.com/docs/admin/executors/deploy_executors',
		permanent: true
	},
	{
		source: '/dev/roadmap',
		destination: 'https://sourcegraph.com/direction',
		permanent: true
	},
	{
		source: '/dev/code_reviews',
		destination:
			'https://docs.sourcegraph.com/dev/background-information/code_reviews',
		permanent: true
	},
	{
		source: '/dev/conduct',
		destination: 'https://sourcegraph.com/community/code_of_conduct',
		permanent: true
	},
	{
		source: '/dev/devrel_release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/marketing/developer-relations/release_issue_template',
		permanent: true
	},
	{
		source: '/dev/documentation/separate_website',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/separate_website',
		permanent: true
	},
	{
		source: '/dev/documentation/site',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website',
		permanent: true
	},
	{
		source: '/dev/documentation/structure',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation',
		permanent: true
	},
	{
		source: '/dev/documentation/style_guide',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation',
		permanent: true
	},
	{
		source: '/dev/faq',
		destination: 'https://sourcegraph.com/community/faq',
		permanent: true
	},
	{
		source: '/dev/go_style_guide',
		destination:
			'https://docs.sourcegraph.com/dev/background-information/languages/go',
		permanent: true
	},
	{
		source: '/dev/incidents',
		destination: 'https://sourcegraph.com/handbook/engineering/incidents',
		permanent: true
	},
	{
		source: '/dev/open_source_open_company',
		destination:
			'https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source',
		permanent: true
	},
	{
		source: '/dev/patch_release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/engineering/releases/patch_release_issue_template',
		permanent: true
	},
	{
		source: '/dev/product',
		destination: 'https://sourcegraph.com/handbook/product',
		permanent: true
	},
	{
		source: '/dev/product/personas',
		destination: 'https://sourcegraph.com/handbook/marketing/personas',
		permanent: true
	},
	{
		source: '/dev/release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/engineering/releases/release_issue_template',
		permanent: true
	},
	{
		source: '/dev/releases',
		destination: 'https://sourcegraph.com/handbook/engineering/releases',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_0',
		destination: 'https://sourcegraph.com/handbook/retrospectives/3_0',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_0_beta',
		destination: 'https://sourcegraph.com/handbook/retrospectives/3_0_beta',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_2',
		destination: 'https://sourcegraph.com/retrospectives/3_2',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_3',
		destination: 'https://sourcegraph.com/retrospectives/3_3',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_4',
		destination: 'https://sourcegraph.com/retrospectives/3_4',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_5',
		destination: 'https://sourcegraph.com/retrospectives/3_5',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_6',
		destination: 'https://sourcegraph.com/retrospectives/3_6',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_7',
		destination: 'https://sourcegraph.com/retrospectives/3_7',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_8',
		destination: 'https://sourcegraph.com/retrospectives/3_8',
		permanent: true
	},
	{
		source: '/dev/retrospectives/3_9',
		destination: 'https://sourcegraph.com/retrospectives/3_9',
		permanent: true
	},
	{
		source: '/dev/retrospectives/customer_license_expiration',
		destination:
			'https://sourcegraph.com/retrospectives/customer_license_expiration',
		permanent: true
	},
	{
		source: '/dev/retrospectives',
		destination: 'https://sourcegraph.com/retrospectives',
		permanent: true
	},
	{
		source: '/dev/retrospectives/postgresql_upgrade',
		destination:
			'https://sourcegraph.com/retrospectives/postgresql_upgrade',
		permanent: true
	},
	{
		source: '/dev/rfcs',
		destination: 'https://sourcegraph.com/handbook/communication/rfcs',
		permanent: true
	},
	{
		source: '/dev/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide',
		permanent: true
	},
	{
		source: '/direction',
		destination: 'https://sourcegraph.com/direction',
		permanent: true
	},
	{
		source: '/direction/secure',
		destination: 'https://sourcegraph.com/direction',
		permanent: true
	},
	{
		source: '/graphbook/communication',
		destination: 'https://sourcegraph.com/handbook',
		permanent: true
	},
	{
		source: '/graphbook',
		destination: 'https://sourcegraph.com/handbook',
		permanent: true
	},
	{
		source: '/team/graphbook',
		destination: 'https://sourcegraph.com/handbook',
		permanent: true
	},
	{
		source: '/team/graphbook/team_meeting',
		destination:
			'https://sourcegraph.com/handbook/communication/company_meeting',
		permanent: true
	},
	{
		source: '/team/graphbook/travel',
		destination: 'https://sourcegraph.com/handbook/people-ops/travel',
		permanent: true
	},
	{
		source: '/team/gtm/devrel',
		destination:
			'https://sourcegraph.com/handbook/marketing/developer-relations',
		permanent: true
	},
	{
		source: '/team/gtm',
		destination: 'https://sourcegraph.com/handbook/sales',
		permanent: true
	},
	{
		source: '/team/gtm/support/diagnostics',
		destination: 'https://sourcegraph.com/handbook/support/diagnostics',
		permanent: true
	},
	{
		source: '/team/gtm/support',
		destination: 'https://sourcegraph.com/handbook/support',
		permanent: true
	},
	{
		source: '/team',
		destination: 'https://sourcegraph.com/handbook',
		permanent: true
	},
	{
		source: '/team/product-dev/documentation',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation',
		permanent: true
	},
	{
		source: '/team/product-dev/documentation/separate_website',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/separate_website',
		permanent: true
	},
	{
		source: '/team/product-dev/documentation/site',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website',
		permanent: true
	},
	{
		source: '/team/product-dev/documentation/structure',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation',
		permanent: true
	},
	{
		source: '/team/product-dev/documentation/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide',
		permanent: true
	},
	{
		source: '/team/product-dev/incidents',
		destination: 'https://sourcegraph.com/handbook/engineering/incidents',
		permanent: true
	},
	{
		source: '/team/product-dev',
		destination: 'https://sourcegraph.com/handbook/engineering',
		permanent: true
	},
	{
		source: '/team/product-dev/open_source_open_company',
		destination:
			'https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source',
		permanent: true
	},
	{
		source: '/team/product-dev/product',
		destination: 'https://sourcegraph.com/handbook/product',
		permanent: true
	},
	{
		source: '/team/product-dev/product/personas',
		destination: 'https://sourcegraph.com/handbook/marketing/personas',
		permanent: true
	},
	{
		source: '/team/product-dev/releases',
		destination: 'https://sourcegraph.com/handbook/engineering/releases',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_0',
		destination: 'https://sourcegraph.com/retrospectives/3_0',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_0_beta',
		destination: 'https://sourcegraph.com/retrospectives/3_0_beta',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_2',
		destination: 'https://sourcegraph.com/retrospectives/3_2',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_3',
		destination: 'https://sourcegraph.com/retrospectives/3_3',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_4',
		destination: 'https://sourcegraph.com/retrospectives/3_4',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_5',
		destination: 'https://sourcegraph.com/retrospectives/3_5',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_6',
		destination: 'https://sourcegraph.com/retrospectives/3_6',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_7',
		destination: 'https://sourcegraph.com/retrospectives/3_7',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_8',
		destination: 'https://sourcegraph.com/retrospectives/3_8',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/3_9',
		destination: 'https://sourcegraph.com/retrospectives/3_9',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/customer_license_expiration',
		destination:
			'https://sourcegraph.com/retrospectives/customer_license_expiration',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives',
		destination: 'https://sourcegraph.com/retrospectives',
		permanent: true
	},
	{
		source: '/team/product-dev/retrospectives/postgresql_upgrade',
		destination:
			'https://sourcegraph.com/retrospectives/postgresql_upgrade',
		permanent: true
	},
	{
		source: '/team/product-dev/rfcs',
		destination: 'https://sourcegraph.com/handbook/communication/rfcs',
		permanent: true
	},
	{
		source: '/team/roadmap',
		destination: 'https://sourcegraph.com/direction',
		permanent: true
	},
	{
		source: '/team/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide',
		permanent: true
	},
	{
		source: '/adopt/comp',
		destination: 'https://sourcegraph.com/workflow',
		permanent: true
	},
	{
		source: '/admin/auth/saml_with_microsoft_adfs',
		destination: '/admin/auth/saml/microsoft_adfs',
		permanent: true
	},
	{
		source: '/admin/config/critical_config',
		destination: '/admin/migration/3_11',
		permanent: true
	},
	{
		source: '/admin/external_service/bitbucketserver',
		destination: '/integration/bitbucket_server',
		permanent: true
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy/index.md',
		permanent: true
	},
	{
		source: '/admin/monitoring',
		destination: '/admin/observability',
		permanent: true
	},
	{
		source: '/admin/monitoring/reporting_search_timeouts',
		destination:
			'/admin/observability/troubleshooting#scenario-search-timeouts',
		permanent: true
	},
	{
		source: '/admin/monitoring/metrics_reference',
		destination: '/admin/observability/metrics_guide',
		permanent: true
	},
	{
		source: '/admin/monitoring/slack_alert_channel',
		destination: '/admin/observability/alerting#set-up-alerts-in-grafana',
		permanent: true
	},
	{
		source: '/@v5.3.0/admin/observability/alerts',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts',
		permanent: false
	},
	{
		source: '/@v5.3.0/admin/observability/dashboards',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards',
		permanent: false
	},
	{
		source: '/admin/monitoring_and_tracing',
		destination: '/admin/observability',
		permanent: true
	},
	{
		source: '/integration/google_gsuite',
		destination: '/integration/google_workspace',
		permanent: true
	},
	{
		source: '/dev/architecture/life-of-a-search-query',
		destination:
			'/dev/background-information/architecture/life-of-a-search-query',
		permanent: true
	},
	{
		source: '/dev/architecture/architecture.dot',
		destination:
			'/dev/background-information/architecture/architecture.dot',
		permanent: true
	},
	{
		source: '/dev/architecture/life-of-a-ping',
		destination: '/dev/background-information/architecture/life-of-a-ping',
		permanent: true
	},
	{
		source: '/dev/architecture/life-of-a-repository',
		destination:
			'/dev/background-information/architecture/life-of-a-repository',
		permanent: true
	},
	{
		source: '/dev/architecture/search-pagination',
		destination:
			'/dev/background-information/architecture/search-pagination',
		permanent: true
	},
	{
		source: '/dev/architecture/architecture.dot',
		destination:
			'/dev/background-information/architecture/architecture.dot',
		permanent: true
	},
	{
		source: '/dev/architecture/architecture.svg',
		destination:
			'/dev/background-information/architecture/architecture.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/architecture',
		destination: '/dev/background-information/codeintel/architecture',
		permanent: true
	},
	{
		source: '/dev/codeintel/deployment',
		destination: '/dev/background-information/codeintel/deployment',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/architecture.dot',
		destination:
			'/dev/background-information/codeintel/diagrams/architecture.dot',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/architecture.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/architecture.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/definitions.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/definitions.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/definitions.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/definitions.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-definitions.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-definitions.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-definitions.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-definitions.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-hover.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-hover.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-hover.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-hover.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-references.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-references.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/extension-references.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-references.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/hover.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/hover.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/hover.svg',
		destination: '/dev/background-information/codeintel/diagrams/hover.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/references.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/references.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/references.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/references.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/resolve-page.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/resolve-page.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/resolve-page.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/resolve-page.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/upload.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/upload.mermaid',
		permanent: true
	},
	{
		source: '/dev/codeintel/diagrams/upload.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/upload.svg',
		permanent: true
	},
	{
		source: '/dev/codeintel/extensions',
		destination: '/dev/background-information/codeintel/extensions',
		permanent: true
	},
	{
		source: '/dev/codeintel/index',
		destination: '/dev/background-information/codeintel/index',
		permanent: true
	},
	{
		source: '/dev/codeintel/queries',
		destination: '/dev/background-information/codeintel/queries',
		permanent: true
	},
	{
		source: '/dev/codeintel/uploads',
		destination: '/dev/background-information/codeintel/uploads',
		permanent: true
	},
	{
		source: '/dev/graphql_api',
		destination: '/dev/background-information/graphql_api',
		permanent: true
	},
	{
		source: '/dev/observability',
		destination: '/dev/background-information/observability',
		permanent: true
	},
	{
		source: '/dev/postgresql',
		destination: '/dev/background-information/postgresql',
		permanent: true
	},
	{
		source: '/dev/renovate',
		destination: '/dev/background-information/renovate',
		permanent: true
	},
	{
		source: '/dev/tech_stack',
		destination: '/dev/background-information/tech_stack',
		permanent: true
	},
	{
		source: '/dev/telemetry',
		destination: '/dev/background-information/telemetry',
		permanent: true
	},
	{
		source: '/dev/testing',
		destination: '/dev/background-information/testing',
		permanent: true
	},
	{
		source: '/dev/web/build',
		destination: '/dev/background-information/web/build',
		permanent: true
	},
	{
		source: '/dev/code_host_integrations',
		destination: '/dev/background-information/web/code_host_integrations',
		permanent: true
	},
	{
		source: '/dev/web/graphql',
		destination: '/dev/background-information/web/graphql',
		permanent: true
	},
	{
		source: '/dev/web/index',
		destination: '/dev/background-information/web/index',
		permanent: true
	},
	{
		source: '/dev/web/web_app',
		destination: '/dev/background-information/web/web_app',
		permanent: true
	},
	{
		source: '/dev/phabricator_gitolite',
		destination: '/dev/how-to/configure_phabricator_gitolite',
		permanent: true
	},
	{
		source: '/dev/documentation',
		destination: '/dev/how-to/documentation_implementation',
		permanent: true
	},
	{
		source: '/dev/zoekt',
		destination: '/dev/how-to/zoekt_local_dev',
		permanent: true
	},
	{
		source: '/user/search/examples',
		destination: '/code_search/tutorials/examples',
		permanent: true
	},
	{
		source: '/user/search/queries',
		destination: '/code_search/reference/queries',
		permanent: true
	},
	{
		source: '/user/search/language',
		destination: '/code_search/reference/language',
		permanent: true
	},
	{
		source: '/user/search/structural',
		destination: '/code_search/reference/structural',
		permanent: true
	},
	{
		source: '/user/search/opengrok',
		destination: '/code_search/how-to/opengrok',
		permanent: true
	},
	{
		source: '/user/search/saved_searches',
		destination: '/code_search/how-to/saved_searches',
		permanent: true
	},
	{
		source: '/user/search/scopes',
		destination: '/code_search/how-to/scopes',
		permanent: true
	},
	{
		source: '/user/code_intelligence/lsif_quickstart',
		destination: '/user/code_intelligence/how-to/index_other_languages',
		permanent: true
	},
	{
		source: '/user/code_intelligence/basic_code_intelligence',
		destination:
			'/user/code_intelligence/explanations/search_based_code_intelligence',
		permanent: true
	},
	{
		source: '/user/code_intelligence/features',
		destination: '/user/code_intelligence/explanations/features',
		permanent: true
	},
	{
		source: '/user/code_intelligence/lsif',
		destination:
			'/user/code_intelligence/explanations/precise_code_intelligence',
		permanent: true
	},
	{
		source: '/user/code_intelligence/precise_code_intelligence',
		destination:
			'/user/code_intelligence/explanations/precise_code_intelligence',
		permanent: true
	},
	{
		source: '/user/code_intelligence/writing_an_indexer',
		destination: '/user/code_intelligence/explanations/writing_an_indexer',
		permanent: true
	},
	{
		source: '/user/code_intelligence/adding_lsif_to_many_repos',
		destination: '/user/code_intelligence/how-to/adding_lsif_to_many_repos',
		permanent: true
	},
	{
		source: '/user/code_intelligence/adding_lsif_to_workflows',
		destination: '/user/code_intelligence/how-to/adding_lsif_to_workflows',
		permanent: true
	},
	{
		source: '/user/code_intelligence/languages/go',
		destination: '/user/code_intelligence/how-to/index_a_go_repository',
		permanent: true
	},
	{
		source: '/user/code_intelligence/languages/typescript_and_javascript',
		destination:
			'/user/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},
	{
		source: '/user/code_intelligence/explanations/basic_code_intelligence',
		destination:
			'/code_intelligence/explanations/search_based_code_intelligence',
		permanent: true
	},
	{
		source: '/user/code_intelligence/explanations/features',
		destination: '/code_intelligence/explanations/features',
		permanent: true
	},
	{
		source: '/user/code_intelligence/explanations/precise_code_intelligence',
		destination:
			'/code_intelligence/explanations/precise_code_intelligence',
		permanent: true
	},
	{
		source: '/user/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_intelligence/explanations/writing_an_indexer',
		permanent: true
	},
	{
		source: '/user/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_intelligence/how-to/adding_lsif_to_many_repos',
		permanent: true
	},
	{
		source: '/user/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_intelligence/how-to/adding_lsif_to_workflows',
		permanent: true
	},
	{
		source: '/user/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_intelligence/how-to/index_a_go_repository',
		permanent: true
	},
	{
		source: '/user/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},
	{
		source: '/user/markdown',
		destination: '/admin/markdown',
		permanent: true
	},
	{
		source: '/user/organizations',
		destination: '/admin/organizations',
		permanent: true
	},
	{
		source: '/user/organizations/index',
		destination: '/admin/organizations',
		permanent: true
	},
	{
		source: '/user/usage_statistics',
		destination: '/analytics',
		permanent: true
	},
	{
		source: '/admin/analytics',
		destination: '/analytics',
		permanent: true
	},
	{
		source: '/user/user_surveys',
		destination: '/admin/user_surveys',
		permanent: true
	},
	{
		source: '/user/repository/badges',
		destination: '/user/personalization/badges',
		permanent: true
	},
	{
		source: '/user/quick_links',
		destination: '/user/personalization/quick_links',
		permanent: true
	},
	{
		source: '/user/themes',
		destination: '/user/personalization/themes',
		permanent: true
	},
	{
		source: '/user/search',
		destination: '/code_search',
		permanent: true
	},
	{
		source: '/user/code_intelligence',
		destination: '/code_intelligence',
		permanent: true
	},
	{
		source: '/user',
		destination: '/getting-started',
		permanent: true
	},
	{
		source: '/user/automation',
		destination: '/batch_changes',
		permanent: true
	},
	{
		source: '/user/campaigns',
		destination: '/batch_changes',
		permanent: true
	},
	{
		source: '/user/campaigns/examples',
		destination: '/batch_changes/tutorials',
		permanent: true
	},
	{
		source: '/user/campaigns/managing_access',
		destination: '/batch_changes/explanations/permissions_in_batch_changes',
		permanent: true
	},
	{
		source: '/dev/campaigns_database_layout.dot',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.dot',
		permanent: true
	},
	{
		source: '/dev/campaigns_database_layout.svg',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.svg',
		permanent: true
	},
	{
		source: '/dev/campaigns_design',
		destination:
			'/dev/background-information/batch_changes/batch_changes_design',
		permanent: true
	},
	{
		source: '/dev/campaigns_development',
		destination: '/dev/background-information/batch_changes/index',
		permanent: true
	},
	{
		source: '/dev/automation_development',
		destination: '/dev/background-information/batch_changes/index',
		permanent: true
	},
	{
		source: '/campaigns/campaign_spec_yaml_reference',
		destination: '/batch-changes/batch-spec-yaml-reference',
		permanent: true
	},
	{
		source: '/dev/background-information/campaigns/campaigns_database_layout.svg',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.svg',
		permanent: true
	},
	{
		source: '/dev/background-information/campaigns/campaigns_database_layout.dot',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.dot',
		permanent: true
	},
	{
		source: '/campaigns/explanations/how_src_executes_a_campaign_spec',
		destination:
			'/batch_changes/explanations/how_src_executes_a_batch_spec',
		permanent: true
	},
	{
		source: '/campaigns/explanations/reexecuting_campaign_specs_multiple_times',
		destination:
			'/batch_changes/explanations/reexecuting_batch_specs_multiple_times',
		permanent: true
	},
	{
		source: '/campaigns/explanations/permissions_in_batch_changes',
		destination: '/batch_changes/explanations/permissions_in_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/explanations/introduction_to_batch_changes',
		destination:
			'/batch_changes/explanations/introduction_to_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/explanations/batch_changes_design',
		destination: '/batch_changes/explanations/batch_changes_design',
		permanent: true
	},
	{
		source: '/campaigns/explanations',
		destination: '/batch_changes/explanations',
		permanent: true
	},
	{
		source: '/campaigns/references/requirements',
		destination: '/batch_changes/references/requirements',
		permanent: true
	},
	{
		source: '/campaigns/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting',
		permanent: true
	},
	{
		source: '/campaigns/references/name-change',
		destination: '/batch_changes/references/name-change',
		permanent: true
	},
	{
		source: '/campaigns/references/campaign_spec_yaml_reference',
		destination: '/batch_changes/references/batch_spec_yaml_reference',
		permanent: true
	},
	{
		source: '/campaigns/references/faq',
		destination: '/batch_changes/references/faq',
		permanent: true
	},
	{
		source: '/campaigns/references/campaign_spec_templating',
		destination: '/batch_changes/references/batch_spec_templating',
		permanent: true
	},
	{
		source: '/campaigns/references',
		destination: '/batch_changes/references',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/update_base_images_in_dockerfiles',
		destination:
			'/batch_changes/tutorials/update_base_images_in_dockerfiles',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/updating_go_import_statements',
		destination: '/batch_changes/tutorials/updating_go_import_statements',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/refactor_go_comby',
		destination: '/batch_changes/tutorials/refactor_go_comby',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/search_and_replace_specific_terms',
		destination:
			'/batch_changes/tutorials/search_and_replace_specific_terms',
		permanent: true
	},
	{
		source: '/campaigns/tutorials',
		destination: '/batch_changes/tutorials',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch_changes/how-tos/creating_changesets_per_project_in_monorepos',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/handling_errored_changesets',
		destination: '/batch_changes/how-tos/handling_errored_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/site_admin_configuration',
		destination: '/batch_changes/how-tos/site_admin_configuration',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/publishing_changesets',
		destination: '/batch_changes/how-tos/publishing_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/viewing_batch_changes',
		destination: '/batch_changes/how-tos/viewing_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/updating_a_batch_change',
		destination: '/batch_changes/how-tos/updating_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_user_credentials',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/closing_or_deleting_a_batch_change',
		destination:
			'/batch_changes/how-tos/closing_or_deleting_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_a_batch_change',
		destination: '/batch_changes/how-tos/creating_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/tracking_existing_changesets',
		destination: '/batch_changes/how-tos/tracking_existing_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos',
		destination: '/batch_changes/how-tos',
		permanent: true
	},
	{
		source: '/campaigns/quickstart',
		destination: '/batch_changes/quickstart',
		permanent: true
	},
	{
		source: '/campaigns',
		destination: '/batch_changes',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/apply',
		destination: '/cli/references/batch/apply',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/index',
		destination: '/cli/references/batch/index',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/new',
		destination: '/cli/references/batch/new',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/preview',
		destination: '/cli/references/batch/preview',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/repositories',
		destination: '/cli/references/batch/repositories',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/validate',
		destination: '/cli/references/batch/validate',
		permanent: true
	},
	{
		source: '/cli/references/campaigns',
		destination: '/cli/references/batch',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_credentials',
		permanent: true
	},
	{
		source: '/batch-changes/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting',
		permanent: true
	},
	{
		source: '/dev/background-information/continuous_integration',
		destination: '/dev/background-information/ci',
		permanent: true
	},
	{
		source: '/dev/how-to/add_and_use_logging',
		destination: '/dev/how-to/add_logging',
		permanent: true
	},
	{
		source: '/admin/install',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/azure',
		destination: '/admin/deploy/kubernetes',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/configure',
		destination: '/admin/deploy/kubernetes/configure',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/eks',
		destination: '/admin/deploy/kubernetes/eks',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/helm',
		destination: '/admin/deploy/kubernetes/helm',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes',
		destination: '/admin/deploy/kubernetes',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/kustomize',
		destination: '/admin/deploy/kubernetes/kustomize',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/operations',
		destination: '/admin/deploy/kubernetes/operations',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/scale',
		destination: '/admin/deploy/kubernetes/scale',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/troubleshoot',
		destination: '/admin/deploy/kubernetes/troubleshoot',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/update',
		destination: '/admin/deploy/kubernetes/update',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/overlays',
		destination: '/admin/deploy/kubernetes/configure',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/aws',
		destination: '/admin/deploy/docker-compose/aws',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/digitalocean',
		destination: '/admin/deploy/docker-compose/digitalocean',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/google_cloud',
		destination: '/admin/deploy/docker-compose/google_cloud',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose',
		destination: '/admin/deploy/docker-compose',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/migrate',
		destination: '/admin/deploy/docker-compose/migrate',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/operations',
		destination: '/admin/deploy/docker-compose#operations',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/update',
		destination: '/admin/deploy/docker-compose#upgrade',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/configure',
		destination: '/admin/deploy/docker-compose#configure',
		permanent: true
	},
	{
		source: '/admin/install/docker/aws',
		destination: '/admin/deploy/docker-single-container/aws',
		permanent: true
	},
	{
		source: '/admin/install/docker/digitalocean',
		destination: '/admin/deploy/docker-single-container/digitalocean',
		permanent: true
	},
	{
		source: '/admin/install/docker/google_cloud',
		destination: '/admin/deploy/docker-single-container/google_cloud',
		permanent: true
	},
	{
		source: '/admin/install/docker',
		destination: '/admin/deploy/docker-single-container',
		permanent: true
	},
	{
		source: '/admin/install/managed',
		destination: '/admin/deploy/managed',
		permanent: true
	},
	{
		source: '/admin/install/migrate-backup',
		destination: '/admin/deploy/migrate-backup',
		permanent: true
	},
	{
		source: '/admin/install/resource_estimator',
		destination: '/admin/deploy/resource_estimator',
		permanent: true
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/deploy/cluster',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/deploy/docker',
		destination: '/admin/deploy/docker-single-container',
		permanent: true
	},
	{
		source: '/admin/observability/alert_solutions',
		destination: '/admin/observability/alerts',
		permanent: true
	},
	{
		source: '/admin/deploy/managed',
		destination: '/cloud',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_navigation/explanations/writing_an_indexer',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/auto_indexing_inference',
		destination: '/code_navigation/explanations/auto_indexing_inference',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/auto_indexing',
		destination: '/code_navigation/explanations/auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/features',
		destination: '/code_navigation/explanations/features',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/introduction_to_code_intelligence',
		destination:
			'/code_navigation/explanations/introduction_to_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/precise_code_intelligence',
		destination: '/code_navigation/explanations/precise_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/rockskip',
		destination: '/code_navigation/explanations/rockskip',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/search_based_code_intelligence',
		destination:
			'/code_navigation/explanations/search_based_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/uploads',
		destination: '/code_navigation/explanations/uploads',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations',
		destination: '/code_navigation/explanations',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams',
		destination: '/code_navigation/explanations/diagrams',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/index-states.mermaid',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.svg',
		destination: '/code_navigation/explanations/diagrams/index-states.svg',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/upload-states.mermaid',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.svg',
		destination: '/code_navigation/explanations/diagrams/upload-states.svg',
		permanent: true
	},
	{
		source: '/code_intelligence/apidocs',
		destination: '/code_navigation/apidocs',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_navigation/how-to/adding_lsif_to_many_repos',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_navigation/how-to/adding_lsif_to_workflows',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/configure_auto_indexing',
		destination: '/code_navigation/how-to/configure_auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/configure_data_retention',
		destination: '/code_navigation/how-to/configure_data_retention',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/enable_auto_indexing',
		destination: '/code_navigation/how-to/enable_auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_cpp_repository',
		destination:
			'https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_navigation/how-to/index_a_go_repository',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_other_languages',
		destination: '/code_navigation/how-to/index_other_languages',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to',
		destination: '/code_navigation/how-to',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/CodeReview.gif',
		destination: '/code_navigation/how-to/img/CodeReview.gif',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/experimental-language-server-enable.png',
		destination:
			'/code_navigation/how-to/img/experimental-language-server-enable.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/extension-example.gif',
		destination: '/code_navigation/how-to/img/extension-example.gif',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/network-description.png',
		destination: '/code_navigation/how-to/img/network-description.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/network-waterfall.png',
		destination: '/code_navigation/how-to/img/network-waterfall.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/popover.png',
		destination: '/code_navigation/how-to/img/popover.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/Symbols.png',
		destination: '/code_navigation/how-to/img/Symbols.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/SymbolSidebar.png',
		destination: '/code_navigation/how-to/imgSymbolSidebar.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/workflow.png',
		destination: '/code_navigation/how-to/img/workflow.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img',
		destination: '/code_navigation/how-to/img',
		permanent: true
	},
	{
		source: '/code_intelligence/references/auto_indexing_configuration',
		destination: '/code_navigation/references/auto_indexing_configuration',
		permanent: true
	},
	{
		source: '/code_intelligence/references/envvars',
		destination: '/code_navigation/references/envvars',
		permanent: true
	},
	{
		source: '/code_intelligence/references/faq',
		destination: '/code_navigation/references/faq',
		permanent: true
	},
	{
		source: '/code_intelligence/references/indexers',
		destination: '/code_navigation/references/indexers',
		permanent: true
	},
	{
		source: '/code_intelligence/references/precise_examples',
		destination: '/code_navigation/references/precise_examples',
		permanent: true
	},
	{
		source: '/code_intelligence/references/requirements',
		destination: '/code_navigation/references/requirements',
		permanent: true
	},
	{
		source: '/code_intelligence/references/troubleshooting',
		destination: '/code_navigation/references/troubleshooting',
		permanent: true
	},
	{
		source: '/code_intelligence/references',
		destination: '/code_navigation/references',
		permanent: true
	},
	{
		source: '/code_intelligence',
		destination: '/code_navigation',
		permanent: true
	},
	{
		source: '/cody/autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#what-is-cody-code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#enabling-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#configuring-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance',
		permanent: true
	},
	{
		source: '/cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance',
		permanent: true
	},
	{
		source: '/cody/autocomplete#accessing-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs',
		permanent: true
	},
	{
		source: '/cody/capabilities#access-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs',
		permanent: true
	},
	{
		source: '/cody#get-cody',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#getting-started',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#features',
		destination: '/cody#main-features',
		permanent: true
	},
	{
		source: '/cody#chatbot-that-knows-your-code',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#fix-code-inline',
		destination: '/cody/capabilities',
		permanent: true
	},
	{
		source: '/cody/capabilities#fix-code-inline',
		destination: '/cody/capabilities',
		permanent: true
	},
	{
		source: '/cody#recipes',
		destination: '/cody/capabilities/commands',
		permanent: true
	},
	{
		source: '/cody/capabilities#cody-recipes',
		destination: '/cody/capabilities/commands',
		permanent: true
	},
	{
		source: '/cody#autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/overview',
		destination: '/cody/',
		permanent: true
	},
	{
		source: '/cody/explanations/installing_vs_code',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-neovim',
		destination: '/cody/clients/install-neovim',
		permanent: true
	},
	{
		source: '/cody/explanations/installing_jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/app',
		destination: '/cody/clients/app',
		permanent: true
	},
	{
		source: '/cody/overview/app',
		destination: '/cody/clients/app',
		permanent: true
	},
	{
		source: '/cody/explanations/enabling_cody',
		destination: '/cody/clients/cody-with-sourcegraph',
		permanent: true
	},
	{
		source: '/cody/overview/cody-with-sourcegraph',
		destination: '/cody/clients/cody-with-sourcegraph',
		permanent: true
	},
	{
		source: '/cody/explanations/enabling_cody_enterprise',
		destination: '/cody/clients/enable-cody-enterprise',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise',
		destination: '/cody/clients/enable-cody-enterprise',
		permanent: true
	},
	{
		source: '/cody/quickstart#quickstart-for-cody-in-vs-code',
		destination: '/cody/quickstart',
		permanent: true
	},
	{
		source: '/cody/quickstart#introduction',
		destination: '/cody/quickstart#cody-quickstart',
		permanent: true
	},
	{
		source: '/cody/quickstart#getting-started-with-the-cody-extension-and-recipes',
		destination:
			'/cody/quickstart#getting-started-with-cody-extension-and-commands',
		permanent: true
	},
	{
		source: '/cody/quickstart#generate-a-unit-test',
		destination: '/cody/quickstart#1-generate-a-unit-test',
		permanent: true
	},
	{
		source: '/cody/quickstart#ask-cody-to-pull-reference-documentation',
		destination:
			'/cody/quickstart#3-ask-cody-to-pull-reference-documentation',
		permanent: true
	},
	{
		source: '/cody/quickstart#ask-cody-to-write-context-aware-code',
		destination: '/cody/quickstart#working-with-the-cody-extension',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#introduction',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#requirements',
		destination: '/cody/clients/install-jetbrains#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#prerequisites',
		destination: '/cody/clients/install-jetbrains#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#get-started-with-cody',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#introduction',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#requirements',
		destination: '/cody/clients/install-vscode#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#prerequisites',
		destination: '/cody/clients/install-vscode#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly',
		destination:
			'/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-off',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#disable-cody',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody',
		permanent: true
	},
	{
		source: '/cody/explanations',
		destination: '/cody/core-concepts',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#embeddings',
		destination: '/cody/embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#embeddings',
		destination: '/cody/embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-embeddings',
		destination: '/cody/embeddings/configure-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings',
		destination: '/cody/embeddings/configure-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#filtering-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#storing-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly',
		destination: '/cody/embeddings#third-party-embeddings-provider',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#third-party-embeddings-provider',
		destination: '/cody/embeddings#third-party-embeddings-provider',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#openai',
		destination: '/cody/embeddings#openai',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#openai',
		destination: '/cody/embeddings#openai',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span',
		destination: '/cody/embeddings#azure-openai',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#azure-openai',
		destination: '/cody/embeddings#azure-openai',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#disabling-embeddings',
		destination: '/cody/embeddings#disable-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#disable-embeddings',
		destination: '/cody/embeddings#disable-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-the-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing',
		destination: '/cody/embeddings/embedding-index',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index',
		destination: '/cody/embeddings/embedding-index',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson',
		permanent: true
	},
	{
		source: '/cody/explanations/policies',
		destination: '/cody/embeddings/configure-embeddings#policies',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#policies',
		destination: '/cody/embeddings/configure-embeddings#policies',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#how-to-create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-1',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-2',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-3',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/explanations/schedule_one_off_embeddings_jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph',
		permanent: true
	},
	{
		source: '/cody/explanations/cody_gateway',
		destination: '/cody/core-concepts/cody_gateway',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_clients',
		destination: '/cody/clients',
		permanent: true
	},
	{
		source: '/cody/overview#getting-started',
		destination: '/cody/clients',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway',
		destination: '/cody/core-concepts/cody-gateway',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise',
		destination:
			'/cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#configuring-custom-models',
		destination:
			'/cody/core-concepts/cody-gateway#configuring-custom-models',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#rate-limits-and-quotas',
		destination: '/cody/core-concepts/cody-gateway#rate-limits-and-quotas',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#privacy-and-security',
		destination: '/cody/core-concepts/cody-gateway#privacy-and-security',
		permanent: true
	},
	{
		source: '/cody/custom-commands',
		destination: '/cody/capabilities/commands#custom-commands',
		permanent: true
	},

	// Code Search revamp redirects

	{
		source: '/code_search',
		destination: '/code-search',
		permanent: true
	},
	{
		source: '/code_search/tutorials',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},
	{
		source: '/code_search/tutorials/examples',
		destination: '/code-search/queries/examples',
		permanent: true
	},

	{
		source: '/code_search/tutorials/search_subexpressions',
		destination: '/code-search/working/search_subexpressions',
		permanent: true
	},

	{
		source: '/code_search/how-to',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/how-to/saved_searches',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/how-to/snippets',
		destination: '/code-search/working/snippets',
		permanent: true
	},

	{
		source: '/code_search/how-to/search_contexts',
		destination: '/code-search/working/search_contexts',
		permanent: true
	},

	{
		source: '/code_search/how-to/exhaustive',
		destination: '/code-search/types/exhaustive',
		permanent: true
	},

	{
		source: '/code_search/how-to/search-jobs',
		destination: '/code-search/types/search-jobs',
		permanent: true
	},

	{
		source: '/code_search/examples',
		destination: '/code-search/queries/examples',
		permanent: true
	},

	{
		source: '/code_search/explanations',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/explanations/features',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/explanations/search_details',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/explanations/tips',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/reference/queries',
		destination: '/code-search/queries',
		permanent: true
	},

	{
		source: '/code_search/reference/queries#search-pattern-syntax',
		destination: '/code-search/queries#search-pattern-syntax',
		permanent: true
	},

	{
		source: '/code_search/reference/language',
		destination: '/code-search/queries/language',
		permanent: true
	},

	// Code Navigation redirects
	{
		source: '/code_navigation',
		destination: '/code-search/code-navigation',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_data_retention',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#automated-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#automated-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#github-actions',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#github-actions',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#circleci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#circleci',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#travis-ci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#travis-ci',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#manual-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#manual-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_many_repos',
		destination: '/code-search/code-navigation/precise_code_navigation',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#language-specific-guides',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#language-specific-guides',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#using-indexer-containers',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#using-indexer-containers',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#github-action-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#github-action-examples',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#circle-ci-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#circle-ci-examples',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#travis-ci-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#travis-ci-examples',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#ci-from-scratch',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#ci-from-scratch',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#deploy-executors',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#enable-index-job-scheduling',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#enable-index-job-scheduling',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#tune-the-index-scheduler',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#tune-the-index-scheduler',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#configure-auto-indexing-policies',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-to-a-specific-repository',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-to-a-specific-repository',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#explicit-index-job-configuration',
		destination:
			'/code-search/code-navigation/auto_indexing#explicit-index-job-configuration',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#private-repositories-and-packages-configuration',
		destination:
			'/code-search/code-navigation/auto_indexing#private-repositories-and-packages-configuration',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#go',
		destination: '/code-search/code-navigation/auto_indexing#go',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#typescriptjavascript',
		destination:
			'/code-search/code-navigation/auto_indexing#typescriptjavascript',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-search/code-navigation/how-to/policies_resource_usage_best_practices',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation',
		destination: '/code-search/code-navigation',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise',
		destination: '/code-search/code-navigation#code-navigation-types',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation',
		destination: '/code-search/code-navigation/precise_code_navigation',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation#why-are-my-results-sometimes-incorrect',
		destination:
			'/code-search/code-navigation/troubleshooting#why-are-my-results-sometimes-incorrect',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads',
		destination: '/code-search/code-navigation/explanations/uploads',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#repository-commit-graph',
		destination:
			'/code-search/code-navigation/explanations/uploads#repository-commit-graph',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation',
		destination:
			'/code-search/code-navigation/search_based_code_navigation',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#how-does-it-work',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#how-does-it-work',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features',
		destination: '/code-search/code-navigation/features',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#popover',
		destination: '/code-search/code-navigation/features#popover',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#go-to-definition',
		destination: '/code-search/code-navigation/features#go-to-definition',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#find-references',
		destination: '/code-search/code-navigation/features#find-references',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#dependency-navigation',
		destination:
			'/code-search/code-navigation/features#dependency-navigation',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#find-implementations',
		destination:
			'/code-search/code-navigation/features#find-implementations',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#perform-an-action',
		destination: '/code-search/code-navigation/features#perform-an-action',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#symbol-search',
		destination: '/code-search/types/symbol',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip',
		destination: '/code-search/code-navigation/rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#when-should-i-use-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#when-should-i-use-rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-enable-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-enable-rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-long-does-indexing-take',
		destination:
			'/code-search/code-navigation/rockskip#how-long-does-indexing-take',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#what-resources-does-rockskip-use',
		destination:
			'/code-search/code-navigation/rockskip#what-resources-does-rockskip-use',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#when-is-indexing-triggered',
		destination:
			'/code-search/code-navigation/rockskip#when-is-indexing-triggered',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer',
		destination:
			'/code-search/code-navigation/writing_an_indexer#writing-an-indexer',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema',
		destination:
			'/code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings',
		destination:
			'/code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		destination:
			'/code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli',
		destination:
			'/code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features',
		destination:
			'/code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing',
		destination: '/code-search/code-navigation/auto_indexing',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#go',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#go',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#typescript',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#typescript',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#java',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#java',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#rust',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#rust',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting',
		destination: '/code-search/code-navigation/troubleshooting',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence',
		destination:
			'/code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting#gathering-evidence',
		destination:
			'/code-search/code-navigation/troubleshooting#gathering-evidence',
		permanent: true
	},

	{
		source: '/code_navigation/references/indexers',
		destination:
			'/code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers',
		permanent: true
	},

	{
		source: '/code_navigation/references/indexers#quick-reference',
		destination:
			'/code-search/code-navigation/writing_an_indexer#quick-reference',
		permanent: true
	},

	{
		source: '/code_navigation/references/precise_examples',
		destination:
			'/code-search/code-navigation/precise_code_navigation#precise-navigation-examples',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars',
		destination: '/code-search/code-navigation/envvars',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#frontend',
		destination: '/code-search/code-navigation/envvars#frontend',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#worker',
		destination: '/code-search/code-navigation/envvars#worker',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#precise-code-intel-worker',
		destination:
			'/code-search/code-navigation/envvars#precise-code-intel-worker',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration',
		destination: '/code-search/code-navigation/auto_indexing_configuration',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#keys',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#keys',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#index-job-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#index-job-object',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#docker-step-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#docker-step-object',
		permanent: true
	},

	{
		source: '/code_navigation/references/inference_configuration',
		destination: '/code-search/code-navigation/inference_configuration',
		permanent: true
	},
	{
		source: '/batch_changes',
		destination: '/batch-changes',
		permanent: true
	},
	{
		source: '/batch_changes/quickstart',
		destination: '/batch-changes/quickstart',
		permanent: true
	},
	{
		source: '/batch_changes/explanations',
		destination: '/batch-changes/',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/introduction_to_batch_changes',
		destination: '/batch-changes/',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#code-host-interactions-in-batch-changes',
		destination:
			'/batch-changes/permissions-in-batch-changes#code-host-interactions-in-batch-changes',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#repository-permissions-for-batch-changes',
		destination:
			'/batch-changes/permissions-in-batch-changes#repository-permissions-for-batch-changes',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#disabling-batch-changes-for-non-site-admin-users',
		destination:
			'/batch-changes/permissions-in-batch-changes#disabling-batch-changes-for-non-site-admin-users',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/batch_changes_design',
		destination: '/batch-changes/design',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/how_src_executes_a_batch_spec',
		destination: '/batch-changes/how-src-executes-a-batch-spec',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/reexecuting_batch_specs_multiple_times',
		destination: '/batch-changes/reexecuting-batch-specs-multiple-times',
		permanent: true
	},
	{
		source: '/batch_changes/explanations/server_side',
		destination: '/batch-changes/server-side',
		permanent: true
	},
	{
		source: '/batch_changes/tutorials',
		destination: '/batch-changes/examples',
		permanent: true
	},
	{
		source: '/batch_changes/tutorials/refactor_go_comby',
		destination: '/batch-changes/refactor-go-comby',
		permanent: true
	},
	{
		source: '/batch_changes/tutorials/updating_go_import_statements',
		destination: '/batch-changes/updating-go-import-statements',
		permanent: true
	},
	{
		source: '/batch_changes/tutorials/update_base_images_in_dockerfiles',
		destination: '/batch-changes/update-base-images-in-dockerfiles',
		permanent: true
	},
	{
		source: '/batch_changes/tutorials/search_and_replace_specific_terms',
		destination: '/batch-changes/search-and-replace-specific-terms',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/creating_a_batch_change',
		destination: '/batch-changes/create-a-batch-change',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/publishing_changesets',
		destination: '/batch-changes/publishing-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/publishing_changesets#publishing-changesets',
		destination:
			'/batch-changes/publishing-changesets#publishing-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/updating_a_batch_change',
		destination: '/batch-changes/update-a-batch-change',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/updating_a_batch_change#removing-changesets',
		destination: '/batch-changes/update-a-batch-change#removing-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes',
		destination:
			'/batch-changes/create-a-batch-change#viewing-batch-changes',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes#filtering-batch-changes',
		destination:
			'/batch-changes/create-a-batch-change#filtering-batch-changes',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes#filtering-changesets',
		destination:
			'/batch-changes/create-a-batch-change#filtering-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/tracking_existing_changesets',
		destination: '/batch-changes/tracking-existing-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/closing_or_deleting_a_batch_change',
		destination: '/batch-changes/delete-a-batch-change',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials',
		destination: '/batch-changes/configuring-credentials',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials#personal-access-tokens',
		destination:
			'/batch-changes/configuring-credentials#personal-access-tokens',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials#global-service-account-tokens',
		destination:
			'/batch-changes/configuring-credentials#global-service-account-tokens',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/handling_errored_changesets',
		destination: '/batch-changes/handling-errored-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/bulk_operations_on_changesets',
		destination: '/batch-changes/bulk-operations-on-changesets',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/server_side_file_mounts',
		destination:
			'/batch-changes/server-side#using-file-mounts-with-server-side-execution',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch-changes/creating-changesets-per-project-in-monorepos',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch-changes/creating-multiple-changesets-in-large-repositories',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/site_admin_configuration',
		destination: '/batch-changes/site-admin-configuration',
		permanent: true
	},
	{
		source: '/batch_changes/references/requirements',
		destination: '/batch-changes/requirements',
		permanent: true
	},
	{
		source: '/batch_changes/references/requirements#batch-changes-effect-on-code-host-rate-limits',
		destination:
			'/batch-changes/requirements#batch-changes-effect-on-code-host-rate-limits',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference',
		destination: '/batch-changes/batch-spec-yaml-reference',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#name',
		destination: '/batch-changes/batch-spec-yaml-reference#name',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#description',
		destination: '/batch-changes/batch-spec-yaml-reference#description',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#on',
		destination: '/batch-changes/batch-spec-yaml-reference#on',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#onrepositoriesmatchingquery',
		destination:
			'/batch-changes/batch-spec-yaml-reference#onrepositoriesmatchingquery',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#onrepository',
		destination: '/batch-changes/batch-spec-yaml-reference#onrepository',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#steps',
		destination: '/batch-changes/batch-spec-yaml-reference#steps',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsrun',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsrun',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepscontainer',
		destination: '/batch-changes/batch-spec-yaml-reference#stepscontainer',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsenv',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsenv',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsfiles',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsfiles',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputs',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsoutputs',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputsnamevalue',
		destination:
			'/batch-changes/batch-spec-yaml-reference#stepsoutputsnamevalue',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputsnameformat',
		destination:
			'/batch-changes/batch-spec-yaml-reference#stepsoutputsnameformat',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsif',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsif',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsmount',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsmount',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesets',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesets',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesetsrepository',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesetsrepository',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesetsexternalids',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesetsexternalids',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplate',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplate',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatetitle',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatetitle',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatebody',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatebody',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatebranch',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatebranch',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommit',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommit',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitmessage',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommitmessage',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitauthor',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommitauthor',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatepublished',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatepublished',
		permanent: true
	},
	// Do not comment
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatefork',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatefork',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchanges',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchanges',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroup',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroup',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroupdirectory',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroupdirectory',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroupbranch',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroupbranch',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgrouprepository',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgrouprepository',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspaces',
		destination: '/batch-changes/batch-spec-yaml-reference#workspaces',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesrootatlocationof',
		destination:
			'/batch-changes/batch-spec-yaml-reference#workspacesrootatlocationof',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesin',
		destination: '/batch-changes/batch-spec-yaml-reference#workspacesin',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesonlyfetchworkspace',
		destination:
			'/batch-changes/batch-spec-yaml-reference#workspacesonlyfetchworkspace',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_templating',
		destination: '/batch-changes/batch-spec-templating',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_templating#fields-with-template-support',
		destination:
			'/batch-changes/batch-spec-templating#fields-with-template-support',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_cheat_sheet',
		destination: '/batch-changes/batch-spec-cheat-sheet',
		permanent: true
	},
	{
		source: '/batch_changes/references/batch_spec_cheat_sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax',
		destination:
			'/batch-changes/batch-spec-cheat-sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax',
		permanent: true
	},
	{
		source: '/batch_changes/references/troubleshooting',
		destination: '/batch-changes/troubleshooting',
		permanent: true
	},
	{
		source: '/batch_changes/references/faq',
		destination: '/batch-changes/faq',
		permanent: true
	},
	{
		source: '/admin/auth/saml_with_microsoft_adfs',
		destination: '/admin/auth/saml/microsoft_adfs',
		permanent: true
	},
	{
		source: '/admin/config/critical_config',
		destination: '/admin/migration/3_11',
		permanent: true
	},
	{
		source: '/admin/code_hosts/bitbucketserver',
		destination: '/integration/bitbucket_server',
		permanent: true
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy/index.md',
		permanent: true
	},
	{
		source: '/admin/monitoring',
		destination: '/admin/observability',
		permanent: true
	},
	{
		source: '/admin/monitoring/reporting_search_timeouts',
		destination:
			'/admin/observability/troubleshooting#scenario-search-timeouts',
		permanent: true
	},
	{
		source: '/admin/monitoring/metrics_reference',
		destination: '/admin/observability/metrics_guide',
		permanent: true
	},
	{
		source: '/admin/monitoring/slack_alert_channel',
		destination: '/admin/observability/alerting#set-up-alerts-in-grafana',
		permanent: true
	},
	{
		source: '/@v5.3.0/admin/observability/alerts',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts',
		permanent: false
	},
	{
		source: '/@v5.3.0/admin/observability/dashboards',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards',
		permanent: false
	},
	{
		source: '/admin/monitoring_and_tracing',
		destination: '/admin/observability',
		permanent: true
	},
	{
		source: '/integration/google_gsuite',
		destination: '/integration/google_workspace',
		permanent: true
	},
	{
		source: '/campaigns/explanations/how_src_executes_a_campaign_spec',
		destination:
			'/batch_changes/explanations/how_src_executes_a_batch_spec',
		permanent: true
	},
	{
		source: '/campaigns/explanations/reexecuting_campaign_specs_multiple_times',
		destination:
			'/batch_changes/explanations/reexecuting_batch_specs_multiple_times',
		permanent: true
	},
	{
		source: '/campaigns/explanations/permissions_in_batch_changes',
		destination: '/batch_changes/explanations/permissions_in_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/explanations/introduction_to_batch_changes',
		destination:
			'/batch_changes/explanations/introduction_to_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/explanations/batch_changes_design',
		destination: '/batch_changes/explanations/batch_changes_design',
		permanent: true
	},
	{
		source: '/campaigns/explanations',
		destination: '/batch_changes/explanations',
		permanent: true
	},
	{
		source: '/campaigns/references/requirements',
		destination: '/batch_changes/references/requirements',
		permanent: true
	},
	{
		source: '/campaigns/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting',
		permanent: true
	},
	{
		source: '/campaigns/references/name-change',
		destination: '/batch_changes/references/name-change',
		permanent: true
	},
	{
		source: '/campaigns/references/campaign_spec_yaml_reference',
		destination: '/batch_changes/references/batch_spec_yaml_reference',
		permanent: true
	},
	{
		source: '/campaigns/references/faq',
		destination: '/batch_changes/references/faq',
		permanent: true
	},
	{
		source: '/campaigns/references/campaign_spec_templating',
		destination: '/batch_changes/references/batch_spec_templating',
		permanent: true
	},
	{
		source: '/campaigns/references',
		destination: '/batch_changes/references',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/update_base_images_in_dockerfiles',
		destination:
			'/batch_changes/tutorials/update_base_images_in_dockerfiles',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/updating_go_import_statements',
		destination: '/batch_changes/tutorials/updating_go_import_statements',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/refactor_go_comby',
		destination: '/batch_changes/tutorials/refactor_go_comby',
		permanent: true
	},
	{
		source: '/campaigns/tutorials/search_and_replace_specific_terms',
		destination:
			'/batch_changes/tutorials/search_and_replace_specific_terms',
		permanent: true
	},
	{
		source: '/campaigns/tutorials',
		destination: '/batch_changes/tutorials',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch_changes/how-tos/creating_changesets_per_project_in_monorepos',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/handling_errored_changesets',
		destination: '/batch_changes/how-tos/handling_errored_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/site_admin_configuration',
		destination: '/batch_changes/how-tos/site_admin_configuration',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/publishing_changesets',
		destination: '/batch_changes/how-tos/publishing_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/viewing_batch_changes',
		destination: '/batch_changes/how-tos/viewing_batch_changes',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/updating_a_batch_change',
		destination: '/batch_changes/how-tos/updating_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_user_credentials',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/closing_or_deleting_a_batch_change',
		destination:
			'/batch_changes/how-tos/closing_or_deleting_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/creating_a_batch_change',
		destination: '/batch_changes/how-tos/creating_a_batch_change',
		permanent: true
	},
	{
		source: '/campaigns/how-tos/tracking_existing_changesets',
		destination: '/batch_changes/how-tos/tracking_existing_changesets',
		permanent: true
	},
	{
		source: '/campaigns/how-tos',
		destination: '/batch_changes/how-tos',
		permanent: true
	},
	{
		source: '/campaigns/quickstart',
		destination: '/batch_changes/quickstart',
		permanent: true
	},
	{
		source: '/campaigns',
		destination: '/batch_changes',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/apply',
		destination: '/cli/references/batch/apply',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/index',
		destination: '/cli/references/batch/index',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/new',
		destination: '/cli/references/batch/new',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/preview',
		destination: '/cli/references/batch/preview',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/repositories',
		destination: '/cli/references/batch/repositories',
		permanent: true
	},
	{
		source: '/cli/references/campaigns/validate',
		destination: '/cli/references/batch/validate',
		permanent: true
	},
	{
		source: '/cli/references/campaigns',
		destination: '/cli/references/batch',
		permanent: true
	},
	{
		source: '/batch_changes/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_credentials',
		permanent: true
	},
	{
		source: '/batch-changes/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting',
		permanent: true
	},
	{
		source: '/dev/background-information/continuous_integration',
		destination: '/dev/background-information/ci',
		permanent: true
	},
	{
		source: '/dev/how-to/add_and_use_logging',
		destination: '/dev/how-to/add_logging',
		permanent: true
	},
	{
		source: '/admin/install',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/azure',
		destination: '/admin/deploy/kubernetes',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/configure',
		destination: '/admin/deploy/kubernetes/configure',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/eks',
		destination: '/admin/deploy/kubernetes/eks',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/helm',
		destination: '/admin/deploy/kubernetes/helm',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes',
		destination: '/admin/deploy/kubernetes',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/kustomize',
		destination: '/admin/deploy/kubernetes/kustomize',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/operations',
		destination: '/admin/deploy/kubernetes/operations',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/scale',
		destination: '/admin/deploy/kubernetes/scale',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/troubleshoot',
		destination: '/admin/deploy/kubernetes/troubleshoot',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/update',
		destination: '/admin/deploy/kubernetes/update',
		permanent: true
	},
	{
		source: '/admin/install/kubernetes/overlays',
		destination: '/admin/deploy/kubernetes/configure',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/aws',
		destination: '/admin/deploy/docker-compose/aws',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/digitalocean',
		destination: '/admin/deploy/docker-compose/digitalocean',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/google_cloud',
		destination: '/admin/deploy/docker-compose/google_cloud',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose',
		destination: '/admin/deploy/docker-compose',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/migrate',
		destination: '/admin/deploy/docker-compose/migrate',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/operations',
		destination: '/admin/deploy/docker-compose#operations',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/update',
		destination: '/admin/deploy/docker-compose#upgrade',
		permanent: true
	},
	{
		source: '/admin/install/docker-compose/configure',
		destination: '/admin/deploy/docker-compose#configure',
		permanent: true
	},
	{
		source: '/admin/install/docker/aws',
		destination: '/admin/deploy/docker-single-container/aws',
		permanent: true
	},
	{
		source: '/admin/install/docker/digitalocean',
		destination: '/admin/deploy/docker-single-container/digitalocean',
		permanent: true
	},
	{
		source: '/admin/install/docker/google_cloud',
		destination: '/admin/deploy/docker-single-container/google_cloud',
		permanent: true
	},
	{
		source: '/admin/install/docker',
		destination: '/admin/deploy/docker-single-container',
		permanent: true
	},
	{
		source: '/admin/install/managed',
		destination: '/admin/deploy/managed',
		permanent: true
	},
	{
		source: '/admin/install/migrate-backup',
		destination: '/admin/deploy/migrate-backup',
		permanent: true
	},
	{
		source: '/admin/install/resource_estimator',
		destination: '/admin/deploy/resource_estimator',
		permanent: true
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/deploy/cluster',
		destination: '/admin/deploy',
		permanent: true
	},
	{
		source: '/admin/deploy/docker',
		destination: '/admin/deploy/docker-single-container',
		permanent: true
	},
	{
		source: '/admin/observability/alert_solutions',
		destination: '/admin/observability/alerts',
		permanent: true
	},
	{
		source: '/admin/deploy/managed',
		destination: '/cloud',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_navigation/explanations/writing_an_indexer',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/auto_indexing_inference',
		destination: '/code_navigation/explanations/auto_indexing_inference',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/auto_indexing',
		destination: '/code_navigation/explanations/auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/features',
		destination: '/code_navigation/explanations/features',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/introduction_to_code_intelligence',
		destination:
			'/code_navigation/explanations/introduction_to_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/precise_code_intelligence',
		destination: '/code_navigation/explanations/precise_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/rockskip',
		destination: '/code_navigation/explanations/rockskip',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/search_based_code_intelligence',
		destination:
			'/code_navigation/explanations/search_based_code_navigation',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/uploads',
		destination: '/code_navigation/explanations/uploads',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations',
		destination: '/code_navigation/explanations',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams',
		destination: '/code_navigation/explanations/diagrams',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/index-states.mermaid',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.svg',
		destination: '/code_navigation/explanations/diagrams/index-states.svg',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/upload-states.mermaid',
		permanent: true
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.svg',
		destination: '/code_navigation/explanations/diagrams/upload-states.svg',
		permanent: true
	},
	{
		source: '/code_intelligence/apidocs',
		destination: '/code_navigation/apidocs',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_navigation/how-to/adding_lsif_to_many_repos',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_navigation/how-to/adding_lsif_to_workflows',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/configure_auto_indexing',
		destination: '/code_navigation/how-to/configure_auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/configure_data_retention',
		destination: '/code_navigation/how-to/configure_data_retention',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/enable_auto_indexing',
		destination: '/code_navigation/how-to/enable_auto_indexing',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_cpp_repository',
		destination:
			'https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_navigation/how-to/index_a_go_repository',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/index_other_languages',
		destination: '/code_navigation/how-to/index_other_languages',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to',
		destination: '/code_navigation/how-to',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/CodeReview.gif',
		destination: '/code_navigation/how-to/img/CodeReview.gif',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/experimental-language-server-enable.png',
		destination:
			'/code_navigation/how-to/img/experimental-language-server-enable.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/extension-example.gif',
		destination: '/code_navigation/how-to/img/extension-example.gif',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/network-description.png',
		destination: '/code_navigation/how-to/img/network-description.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/network-waterfall.png',
		destination: '/code_navigation/how-to/img/network-waterfall.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/popover.png',
		destination: '/code_navigation/how-to/img/popover.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/Symbols.png',
		destination: '/code_navigation/how-to/img/Symbols.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/SymbolSidebar.png',
		destination: '/code_navigation/how-to/imgSymbolSidebar.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img/workflow.png',
		destination: '/code_navigation/how-to/img/workflow.png',
		permanent: true
	},
	{
		source: '/code_intelligence/how-to/img',
		destination: '/code_navigation/how-to/img',
		permanent: true
	},
	{
		source: '/code_intelligence/references/auto_indexing_configuration',
		destination: '/code_navigation/references/auto_indexing_configuration',
		permanent: true
	},
	{
		source: '/code_intelligence/references/envvars',
		destination: '/code_navigation/references/envvars',
		permanent: true
	},
	{
		source: '/code_intelligence/references/faq',
		destination: '/code_navigation/references/faq',
		permanent: true
	},
	{
		source: '/code_intelligence/references/indexers',
		destination: '/code_navigation/references/indexers',
		permanent: true
	},
	{
		source: '/code_intelligence/references/precise_examples',
		destination: '/code_navigation/references/precise_examples',
		permanent: true
	},
	{
		source: '/code_intelligence/references/requirements',
		destination: '/code_navigation/references/requirements',
		permanent: true
	},
	{
		source: '/code_intelligence/references/troubleshooting',
		destination: '/code_navigation/references/troubleshooting',
		permanent: true
	},
	{
		source: '/code_intelligence/references',
		destination: '/code_navigation/references',
		permanent: true
	},
	{
		source: '/code_intelligence',
		destination: '/code_navigation',
		permanent: true
	},
	{
		source: '/cody/autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#what-is-cody-code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#enabling-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/autocomplete#configuring-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance',
		permanent: true
	},
	{
		source: '/cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance',
		permanent: true
	},
	{
		source: '/cody/autocomplete#accessing-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs',
		permanent: true
	},
	{
		source: '/cody/capabilities#access-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs',
		permanent: true
	},
	{
		source: '/cody#get-cody',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#getting-started',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#features',
		destination: '/cody#main-features',
		permanent: true
	},
	{
		source: '/cody#chatbot-that-knows-your-code',
		destination: '/cody',
		permanent: true
	},
	{
		source: '/cody#fix-code-inline',
		destination: '/cody/capabilities',
		permanent: true
	},
	{
		source: '/cody/capabilities#fix-code-inline',
		destination: '/cody/capabilities',
		permanent: true
	},
	{
		source: '/cody#recipes',
		destination: '/cody/capabilities/commands',
		permanent: true
	},
	{
		source: '/cody/capabilities#cody-recipes',
		destination: '/cody/capabilities/commands',
		permanent: true
	},
	{
		source: '/cody#autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete',
		permanent: true
	},
	{
		source: '/cody/overview',
		destination: '/cody/',
		permanent: true
	},
	{
		source: '/cody/explanations/installing_vs_code',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-neovim',
		destination: '/cody/clients/install-neovim',
		permanent: true
	},
	{
		source: '/cody/explanations/installing_jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/app',
		destination: '/cody/clients/app',
		permanent: true
	},
	{
		source: '/cody/overview/app',
		destination: '/cody/clients/app',
		permanent: true
	},
	{
		source: '/cody/explanations/enabling_cody',
		destination: '/cody/clients/cody-with-sourcegraph',
		permanent: true
	},
	{
		source: '/cody/overview/cody-with-sourcegraph',
		destination: '/cody/clients/cody-with-sourcegraph',
		permanent: true
	},
	{
		source: '/cody/explanations/enabling_cody_enterprise',
		destination: '/cody/clients/enable-cody-enterprise',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise',
		destination: '/cody/clients/enable-cody-enterprise',
		permanent: true
	},
	{
		source: '/cody/quickstart#quickstart-for-cody-in-vs-code',
		destination: '/cody/quickstart',
		permanent: true
	},
	{
		source: '/cody/quickstart#introduction',
		destination: '/cody/quickstart#cody-quickstart',
		permanent: true
	},
	{
		source: '/cody/quickstart#getting-started-with-the-cody-extension-and-recipes',
		destination:
			'/cody/quickstart#getting-started-with-cody-extension-and-commands',
		permanent: true
	},
	{
		source: '/cody/quickstart#generate-a-unit-test',
		destination: '/cody/quickstart#1-generate-a-unit-test',
		permanent: true
	},
	{
		source: '/cody/quickstart#ask-cody-to-pull-reference-documentation',
		destination:
			'/cody/quickstart#3-ask-cody-to-pull-reference-documentation',
		permanent: true
	},
	{
		source: '/cody/quickstart#ask-cody-to-write-context-aware-code',
		destination: '/cody/quickstart#working-with-the-cody-extension',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#introduction',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#requirements',
		destination: '/cody/clients/install-jetbrains#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#prerequisites',
		destination: '/cody/clients/install-jetbrains#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains#get-started-with-cody',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#introduction',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#requirements',
		destination: '/cody/clients/install-vscode#prerequisites',
		permanent: true
	},
	{
		source: '/cody/overview/install-vscode#prerequisites',
		destination: '/cody/clients/install-vscode#prerequisites',
		permanent: true
	},
	{
		source: '/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-off',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody',
		permanent: true
	},
	{
		source: '/cody/overview/enable-cody-enterprise#disable-cody',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody',
		permanent: true
	},
	{
		source: '/cody/explanations',
		destination: '/cody/core-concepts',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#embeddings',
		destination: '/cody/embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#embeddings',
		destination: '/cody/embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-embeddings',
		destination: '/cody/embeddings/configure-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings',
		destination: '/cody/embeddings/configure-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#filtering-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#storing-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly',
		destination: '/cody/embeddings#third-party-embeddings-provider',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#third-party-embeddings-provider',
		destination: '/cody/embeddings#third-party-embeddings-provider',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#openai',
		destination: '/cody/embeddings#openai',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#openai',
		destination: '/cody/embeddings#openai',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span',
		destination: '/cody/embeddings#azure-openai',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#azure-openai',
		destination: '/cody/embeddings#azure-openai',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#disabling-embeddings',
		destination: '/cody/embeddings#disable-embeddings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings#disable-embeddings',
		destination: '/cody/embeddings#disable-embeddings',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-the-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing',
		destination: '/cody/embeddings/embedding-index',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index',
		destination: '/cody/embeddings/embedding-index',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration',
		permanent: true
	},
	{
		source: '/cody/explanations/indexing#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson',
		permanent: true
	},
	{
		source: '/cody/explanations/policies',
		destination: '/cody/embeddings/configure-embeddings#policies',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#policies',
		destination: '/cody/embeddings/configure-embeddings#policies',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#how-to-create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-1',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-2',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#example-3',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works',
		permanent: true
	},
	{
		source: '/cody/explanations/policies#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		permanent: true
	},
	{
		source: '/cody/explanations/schedule_one_off_embeddings_jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs',
		permanent: true
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph',
		permanent: true
	},
	{
		source: '/cody/explanations/cody_gateway',
		destination: '/cody/core-concepts/cody_gateway',
		permanent: true
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_clients',
		destination: '/cody/clients',
		permanent: true
	},
	{
		source: '/cody/overview#getting-started',
		destination: '/cody/clients',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway',
		destination: '/cody/core-concepts/cody-gateway',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise',
		destination:
			'/cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#configuring-custom-models',
		destination:
			'/cody/core-concepts/cody-gateway#configuring-custom-models',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#rate-limits-and-quotas',
		destination: '/cody/core-concepts/cody-gateway#rate-limits-and-quotas',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody_gateway#privacy-and-security',
		destination: '/cody/core-concepts/cody-gateway#privacy-and-security',
		permanent: true
	},
	{
		source: '/cody/custom-commands',
		destination: '/cody/capabilities/commands#custom-commands',
		permanent: true
	},

	// Code Search revamp redirects

	{
		source: '/code_search',
		destination: '/code-search',
		permanent: true
	},
	{
		source: '/code_search/tutorials',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},
	{
		source: '/code_search/tutorials/examples',
		destination: '/code-search/queries/examples',
		permanent: true
	},

	{
		source: '/code_search/tutorials/search_subexpressions',
		destination: '/code-search/working/search_subexpressions',
		permanent: true
	},

	{
		source: '/code_search/how-to',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/how-to/saved_searches',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/how-to/snippets',
		destination: '/code-search/working/snippets',
		permanent: true
	},

	{
		source: '/code_search/how-to/search_contexts',
		destination: '/code-search/working/search_contexts',
		permanent: true
	},

	{
		source: '/code_search/how-to/exhaustive',
		destination: '/code-search/types/exhaustive',
		permanent: true
	},

	{
		source: '/code_search/how-to/search-jobs',
		destination: '/code-search/types/search-jobs',
		permanent: true
	},

	{
		source: '/code_search/explanations',
		destination: '/code-search/working/saved_searches',
		permanent: true
	},

	{
		source: '/code_search/explanations/features',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/explanations/search_details',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/explanations/tips',
		destination: '/code-search/features',
		permanent: true
	},

	{
		source: '/code_search/reference/queries',
		destination: '/code-search/queries',
		permanent: true
	},

	{
		source: '/code_search/reference/queries#search-pattern-syntax',
		destination: '/code-search/queries#search-pattern-syntax',
		permanent: true
	},

	{
		source: '/code_search/reference/language',
		destination: '/code-search/queries/language',
		permanent: true
	},

	// Code Navigation redirects
	{
		source: '/code_navigation',
		destination: '/code-search/code-navigation',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_data_retention',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#automated-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#automated-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#github-actions',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#github-actions',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#circleci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#circleci',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#travis-ci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#travis-ci',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#manual-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#manual-indexing',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_many_repos',
		destination: '/code-search/code-navigation/precise_code_navigation',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#deploy-executors',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-search/code-navigation/how-to/policies_resource_usage_best_practices',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation',
		destination: '/code-search/code-navigation',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise',
		destination: '/code-search/code-navigation#code-navigation-types',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation',
		destination: '/code-search/code-navigation/precise_code_navigation',
		permanent: true
	},

	// {
	//   source: "/code_navigation/explanations/precise_code_navigation#why-are-my-results-sometimes-incorrect",
	//   destination: "/code-search/code-navigation/troubleshooting#why-are-my-results-sometimes-incorrect",
	//   permanent: true
	// },

	{
		source: '/code_navigation/explanations/uploads',
		destination: '/code-search/code-navigation/explanations/uploads',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/uploads#repository-commit-graph',
		destination:
			'/code-search/code-navigation/explanations/uploads#repository-commit-graph',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation',
		destination:
			'/code-search/code-navigation/search_based_code_navigation',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#how-does-it-work',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#how-does-it-work',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features',
		destination: '/code-search/code-navigation/features',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#popover',
		destination: '/code-search/code-navigation/features#popover',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#go-to-definition',
		destination: '/code-search/code-navigation/features#go-to-definition',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#find-references',
		destination: '/code-search/code-navigation/features#find-references',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#dependency-navigation',
		destination:
			'/code-search/code-navigation/features#dependency-navigation',
		permanent: true
	},
	{
		source: '/code_navigation/explanations/features#find-implementations',
		destination:
			'/code-search/code-navigation/features#find-implementations',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#perform-an-action',
		destination: '/code-search/code-navigation/features#perform-an-action',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/features#symbol-search',
		destination: '/code-search/types/symbol',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip',
		destination: '/code-search/code-navigation/rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#when-should-i-use-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#when-should-i-use-rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-enable-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-enable-rockskip',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-long-does-indexing-take',
		destination:
			'/code-search/code-navigation/rockskip#how-long-does-indexing-take',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#what-resources-does-rockskip-use',
		destination:
			'/code-search/code-navigation/rockskip#what-resources-does-rockskip-use',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/rockskip#when-is-indexing-triggered',
		destination:
			'/code-search/code-navigation/rockskip#when-is-indexing-triggered',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer',
		destination:
			'/code-search/code-navigation/writing_an_indexer#writing-an-indexer',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema',
		destination:
			'/code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings',
		destination:
			'/code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		destination:
			'/code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli',
		destination:
			'/code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features',
		destination:
			'/code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing',
		destination: '/code-search/code-navigation/auto_indexing',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job',
		permanent: true
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#go',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#go',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#typescript',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#typescript',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#java',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#java',
		permanent: true
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#rust',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#rust',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting',
		destination: '/code-search/code-navigation/troubleshooting',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence',
		destination:
			'/code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence',
		permanent: true
	},

	{
		source: '/code_navigation/references/troubleshooting#gathering-evidence',
		destination:
			'/code-search/code-navigation/troubleshooting#gathering-evidence',
		permanent: true
	},

	{
		source: '/code_navigation/references/indexers',
		destination:
			'/code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers',
		permanent: true
	},

	{
		source: '/code_navigation/references/indexers#quick-reference',
		destination:
			'/code-search/code-navigation/writing_an_indexer#quick-reference',
		permanent: true
	},

	{
		source: '/code_navigation/references/precise_examples',
		destination:
			'/code-search/code-navigation/precise_code_navigation#precise-navigation-examples',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars',
		destination: '/code-search/code-navigation/envvars',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#frontend',
		destination: '/code-search/code-navigation/envvars#frontend',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#worker',
		destination: '/code-search/code-navigation/envvars#worker',
		permanent: true
	},

	{
		source: '/code_navigation/references/envvars#precise-code-intel-worker',
		destination:
			'/code-search/code-navigation/envvars#precise-code-intel-worker',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration',
		destination: '/code-search/code-navigation/auto_indexing_configuration',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#keys',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#keys',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#index-job-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#index-job-object',
		permanent: true
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#docker-step-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#docker-step-object',
		permanent: true
	},

	{
		source: '/code_navigation/references/inference_configuration',
		destination: '/code-search/code-navigation/inference_configuration',
		permanent: true
	},
	// Model Config docs
	{
		source: '/cody/clients/model-configuration',
		destination: '/cody/enterprise/model-configuration',
		permanent: true
	},

	//Commands redirects
	{
		source: '/cody/capabilities/commands',
		destination: '/cody/capabilities/prompts',
		permanent: true
	},

	//Eclispe redirects
	{
		source: '/cody/clients/install-eclipse',
		destination: '/cody/clients',
		permanent: true
	},

	//Pricing redirects
	{
		source: '/pricing/free',
		destination: '/pricing/plans/free',
		permanent: true
	},
	{
		source: '/pricing/enterprise-starter',
		destination: '/pricing/plans/enterprise-starter',
		permanent: true
	},
	{
		source: '/pricing/enterprise',
		destination: '/pricing/plans/enterprise',
		permanent: true
	},
	{
		source: '/pricing/billing-faqs',
		destination: '/pricing/faqs',
		permanent: true
	},

	// Admin pricing docs redirects
	{
		source: '/admin/pricing',
		destination: '/pricing/plans',
		permanent: true
	},

	{
		source: '/admin/pricing#how-are-active-users-calculated-for-sourcegraph-cody',
		destination: '/cody/usage-and-pricing#billing-faqs-for-cody-enterprise',
		permanent: true
	},

	{
		source: '/admin/pricing#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform',
		destination:
			'/pricing/faqs#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform',
		permanent: true
	},

	{
		source: '/cody/embedded-repos',
		destination: '/cody',
		permanent: true
	},

	// Redirect for self-hosted analytics

	{
		source: '/analytics/self-hosted',
		destination: '/analytics',
		permanent: true
	},
	{
		source: '/analytics/air-gapped',
		destination: '/analytics',
		permanent: true
	},

	//Agentic chat redirect
	{
		source: '/cody/capabilities/agentic-chat',
		destination: '/cody/capabilities/agentic-context-fetching',
		permanent: true
	},

	//Rmv embeddings permanentaly:https://sourcegraph.com/docs/cody/core-concepts/embeddings
	{
		source: '/cody/core-concepts/embeddings',
		destination: '/cody/',
		permanent: true
	},

	//Rmv Query types permanentaly:https://sourcegraph.com/docs/cody/capabilities/query-types
	{
		source: '/cody/capabilities/query-types',
		destination: '/cody/capabilities/chat',
		permanent: true
	},

	{
		source: '/analytics/cloud#access-tokens',
		destination: '/analytics/api#access-tokens',
		permanent: true
	},
	{
		source: '/analytics/cloud#token-management-apis',
		destination: '/analytics/api#token-management-apis',
		permanent: true
	},
	{
		source: '/analytics/cloud#enablement-instructions',
		destination: '/analytics#enablement-instructions',
		permanent: true
	},
	{
		source: '/analytics/cloud#data-export',
		destination: '/analytics#data-export-and-api',
		permanent: true
	},
	{
		source: '/analytics/cloud#token-creation',
		destination: '/analytics/api#token-creation',
		permanent: true
	},
	{
		source: '/analytics/cloud#token-listing',
		destination: '/analytics/api#token-listing',
		permanent: true
	},
	{
		source: '/analytics/cloud#token-revocation',
		destination: '/analytics/api#token-revocation',
		permanent: true
	},
	{
		source: '/analytics/cloud#api-reference',
		destination: '/analytics/api#api-reference',
		permanent: true
	},
	{
		source: '/analytics/cloud#csv-export',
		destination: '/analytics/api#csv-export',
		permanent: true
	},
	{
		source: '/analytics/cloud',
		destination: '/analytics',
		permanent: true
	},
	{
		source: '/code-search/types/deep-search',
		destination: '/deep-search',
		permanent: true
	},

	// Cody Pricing docs redirect

	{
		source: '/cody/usage-and-pricing',
		destination: 'https://sourcegraph.com/pricing',
		permanent: true
	},

	// Code monitoring redirects - merged pages into consolidated index
	{
		source: '/code_monitoring/explanations/best_practices',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/explanations/core_concepts',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/explanations',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/how-tos',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/how-tos/slack',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/how-tos/starting_points',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/how-tos/webhook',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/code_monitoring/quickstart',
		destination: '/code_monitoring',
		permanent: true
	},
	{
		source: '/admin/nginx',
		destination: '/admin/http_https_configuration',
		permanent: true
	},
	{
		source: '/admin/access_control/service_accounts',
		destination: '/admin/service_accounts',
		permanent: true
	},
	{
		source: '/cody/core-concepts/cody-gateway',
		destination: '/model-provider',
		permanent: true
	},
	{
		source: '/cody/core-concepts/enterprise-architecture',
		destination: '/admin/architecture#cody',
		permanent: true
	},
	{
		source: '/how-to-videos',
		destination: '/tutorials',
		permanent: true
	},
	{
		source: '/how-to-videos/code-search',
		destination: '/tutorials#code-search-how-to-videos',
		permanent: true
	},
	{
		source: '/how-to-videos/cody',
		destination: '/tutorials#cody',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/auto_indexing',
		destination: '/code-navigation/auto_indexing',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/auto_indexing_configuration',
		destination: '/code-navigation/auto_indexing_configuration',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/envvars',
		destination: '/code-navigation/envvars',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/explanations/auto_indexing_inference',
		destination: '/code-navigation/explanations/auto_indexing_inference',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/explanations/uploads',
		destination: '/code-navigation/explanations/uploads',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/features',
		destination: '/code-navigation/features',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/adding_scip_to_workflows',
		destination: '/code-navigation/how-to/adding_scip_to_workflows',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to',
		destination: '/code-navigation/how-to',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/index_a_go_repository',
		destination: '/code-navigation/how-to/index_a_go_repository',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/index_other_languages',
		destination: '/code-navigation/how-to/index_other_languages',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-navigation/how-to/policies_resource_usage_best_practices',
		permanent: true
	},
	{
		source: '/code-search/code-navigation',
		destination: '/code-navigation',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/inference_configuration',
		destination: '/code-navigation/inference_configuration',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/precise_code_navigation',
		destination: '/code-navigation/precise_code_navigation',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/private-maven-repository-configuration',
		destination: '/code-navigation/private-maven-repository-configuration',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/rockskip',
		destination: '/code-navigation/rockskip',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/search_based_code_navigation',
		destination: '/code-navigation/search_based_code_navigation',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/syntactic_code_navigation',
		destination: '/code-navigation/syntactic_code_navigation',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/troubleshooting',
		destination: '/code-navigation/troubleshooting',
		permanent: true
	},
	{
		source: '/code-search/code-navigation/writing_an_indexer',
		destination: '/code-navigation/writing_an_indexer',
		permanent: true
	}
];

const updatedRedirectsData = redirectsData.map(redirect => {
	return {
		source: String(redirect.source).replace(
			'http://localhost:3000/docs',
			''
		),
		destination: String(redirect.destination).replace(
			'http://localhost:3000/docs',
			''
		),
		permanent: redirect.permanent
	};
});

module.exports = {
	updatedRedirectsData
};
