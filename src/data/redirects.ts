import {TECHNICAL_CHANGELOG_RSS_URL} from './constants';

// Path redirects (`/old-page` -> `/new-page`) are applied server-side by
// src/middleware.ts.
//
// Heading redirects, where the source has a `#fragment`
// (`/page#old-heading` -> `/page#new-heading`), are applied in the browser by
// src/components/FragmentRedirect.tsx, because browsers never send the
// fragment to the server.
//
// For a given source, the first matching entry wins.
const redirectsData = [
	{
		source: '/integration/img/disable_extension.png',
		destination: '/integration/img/disable-extension.png'
	},
	{
		source: '/admin/tls_ssl',
		destination: '/self-hosted/http-https-configuration'
	},
	{
		source: '/admin/http_https_configuration',
		destination: '/self-hosted/http-https-configuration'
	},
	{
		source: '/docs/admin/deploy_executors',
		destination:
			'https://sourcegraph.com/docs/admin/executors/deploy_executors'
	},
	{
		source: '/dev/roadmap',
		destination: 'https://sourcegraph.com/direction'
	},
	{
		source: '/dev/code_reviews',
		destination:
			'https://docs.sourcegraph.com/dev/background-information/code_reviews'
	},
	{
		source: '/dev/conduct',
		destination: 'https://sourcegraph.com/community/code_of_conduct'
	},
	{
		source: '/dev/devrel_release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/marketing/developer-relations/release_issue_template'
	},
	{
		source: '/dev/documentation/separate_website',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/separate_website'
	},
	{
		source: '/dev/documentation/site',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website'
	},
	{
		source: '/dev/documentation/structure',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation'
	},
	{
		source: '/dev/documentation/style_guide',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation'
	},
	{
		source: '/dev/faq',
		destination: 'https://sourcegraph.com/community/faq'
	},
	{
		source: '/dev/go_style_guide',
		destination:
			'https://docs.sourcegraph.com/dev/background-information/languages/go'
	},
	{
		source: '/dev/incidents',
		destination: 'https://sourcegraph.com/handbook/engineering/incidents'
	},
	{
		source: '/dev/open_source_open_company',
		destination:
			'https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source'
	},
	{
		source: '/dev/patch_release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/engineering/releases/patch_release_issue_template'
	},
	{
		source: '/dev/product',
		destination: 'https://sourcegraph.com/handbook/product'
	},
	{
		source: '/dev/product/personas',
		destination: 'https://sourcegraph.com/handbook/marketing/personas'
	},
	{
		source: '/dev/release_issue_template',
		destination:
			'https://sourcegraph.com/handbook/engineering/releases/release_issue_template'
	},
	{
		source: '/dev/releases',
		destination: 'https://sourcegraph.com/handbook/engineering/releases'
	},
	{
		source: '/dev/retrospectives/3_0',
		destination: 'https://sourcegraph.com/handbook/retrospectives/3_0'
	},
	{
		source: '/dev/retrospectives/3_0_beta',
		destination: 'https://sourcegraph.com/handbook/retrospectives/3_0_beta'
	},
	{
		source: '/dev/retrospectives/3_2',
		destination: 'https://sourcegraph.com/retrospectives/3_2'
	},
	{
		source: '/dev/retrospectives/3_3',
		destination: 'https://sourcegraph.com/retrospectives/3_3'
	},
	{
		source: '/dev/retrospectives/3_4',
		destination: 'https://sourcegraph.com/retrospectives/3_4'
	},
	{
		source: '/dev/retrospectives/3_5',
		destination: 'https://sourcegraph.com/retrospectives/3_5'
	},
	{
		source: '/dev/retrospectives/3_6',
		destination: 'https://sourcegraph.com/retrospectives/3_6'
	},
	{
		source: '/dev/retrospectives/3_7',
		destination: 'https://sourcegraph.com/retrospectives/3_7'
	},
	{
		source: '/dev/retrospectives/3_8',
		destination: 'https://sourcegraph.com/retrospectives/3_8'
	},
	{
		source: '/dev/retrospectives/3_9',
		destination: 'https://sourcegraph.com/retrospectives/3_9'
	},
	{
		source: '/dev/retrospectives/customer_license_expiration',
		destination:
			'https://sourcegraph.com/retrospectives/customer_license_expiration'
	},
	{
		source: '/dev/retrospectives',
		destination: 'https://sourcegraph.com/retrospectives'
	},
	{
		source: '/dev/retrospectives/postgresql_upgrade',
		destination:
			'https://sourcegraph.com/retrospectives/postgresql_upgrade'
	},
	{
		source: '/dev/rfcs',
		destination: 'https://sourcegraph.com/handbook/communication/rfcs'
	},
	{
		source: '/dev/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide'
	},
	{
		source: '/direction',
		destination: 'https://sourcegraph.com/direction'
	},
	{
		source: '/direction/secure',
		destination: 'https://sourcegraph.com/direction'
	},
	{
		source: '/graphbook/communication',
		destination: 'https://sourcegraph.com/handbook'
	},
	{
		source: '/graphbook',
		destination: 'https://sourcegraph.com/handbook'
	},
	{
		source: '/team/graphbook',
		destination: 'https://sourcegraph.com/handbook'
	},
	{
		source: '/team/graphbook/team_meeting',
		destination:
			'https://sourcegraph.com/handbook/communication/company_meeting'
	},
	{
		source: '/team/graphbook/travel',
		destination: 'https://sourcegraph.com/handbook/people-ops/travel'
	},
	{
		source: '/team/gtm/devrel',
		destination:
			'https://sourcegraph.com/handbook/marketing/developer-relations'
	},
	{
		source: '/team/gtm',
		destination: 'https://sourcegraph.com/handbook/sales'
	},
	{
		source: '/team/gtm/support/diagnostics',
		destination: 'https://sourcegraph.com/handbook/support/diagnostics'
	},
	{
		source: '/team/gtm/support',
		destination: 'https://sourcegraph.com/handbook/support'
	},
	{
		source: '/team',
		destination: 'https://sourcegraph.com/handbook'
	},
	{
		source: '/team/product-dev/documentation',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation'
	},
	{
		source: '/team/product-dev/documentation/separate_website',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/separate_website'
	},
	{
		source: '/team/product-dev/documentation/site',
		destination:
			'https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website'
	},
	{
		source: '/team/product-dev/documentation/structure',
		destination:
			'https://sourcegraph.com/handbook/engineering/product_documentation'
	},
	{
		source: '/team/product-dev/documentation/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide'
	},
	{
		source: '/team/product-dev/incidents',
		destination: 'https://sourcegraph.com/handbook/engineering/incidents'
	},
	{
		source: '/team/product-dev',
		destination: 'https://sourcegraph.com/handbook/engineering'
	},
	{
		source: '/team/product-dev/open_source_open_company',
		destination:
			'https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source'
	},
	{
		source: '/team/product-dev/product',
		destination: 'https://sourcegraph.com/handbook/product'
	},
	{
		source: '/team/product-dev/product/personas',
		destination: 'https://sourcegraph.com/handbook/marketing/personas'
	},
	{
		source: '/team/product-dev/releases',
		destination: 'https://sourcegraph.com/handbook/engineering/releases'
	},
	{
		source: '/team/product-dev/retrospectives/3_0',
		destination: 'https://sourcegraph.com/retrospectives/3_0'
	},
	{
		source: '/team/product-dev/retrospectives/3_0_beta',
		destination: 'https://sourcegraph.com/retrospectives/3_0_beta'
	},
	{
		source: '/team/product-dev/retrospectives/3_2',
		destination: 'https://sourcegraph.com/retrospectives/3_2'
	},
	{
		source: '/team/product-dev/retrospectives/3_3',
		destination: 'https://sourcegraph.com/retrospectives/3_3'
	},
	{
		source: '/team/product-dev/retrospectives/3_4',
		destination: 'https://sourcegraph.com/retrospectives/3_4'
	},
	{
		source: '/team/product-dev/retrospectives/3_5',
		destination: 'https://sourcegraph.com/retrospectives/3_5'
	},
	{
		source: '/team/product-dev/retrospectives/3_6',
		destination: 'https://sourcegraph.com/retrospectives/3_6'
	},
	{
		source: '/team/product-dev/retrospectives/3_7',
		destination: 'https://sourcegraph.com/retrospectives/3_7'
	},
	{
		source: '/team/product-dev/retrospectives/3_8',
		destination: 'https://sourcegraph.com/retrospectives/3_8'
	},
	{
		source: '/team/product-dev/retrospectives/3_9',
		destination: 'https://sourcegraph.com/retrospectives/3_9'
	},
	{
		source: '/team/product-dev/retrospectives/customer_license_expiration',
		destination:
			'https://sourcegraph.com/retrospectives/customer_license_expiration'
	},
	{
		source: '/team/product-dev/retrospectives',
		destination: 'https://sourcegraph.com/retrospectives'
	},
	{
		source: '/team/product-dev/retrospectives/postgresql_upgrade',
		destination:
			'https://sourcegraph.com/retrospectives/postgresql_upgrade'
	},
	{
		source: '/team/product-dev/rfcs',
		destination: 'https://sourcegraph.com/handbook/communication/rfcs'
	},
	{
		source: '/team/roadmap',
		destination: 'https://sourcegraph.com/direction'
	},
	{
		source: '/team/style_guide',
		destination:
			'https://sourcegraph.com/handbook/communication/style_guide'
	},
	{
		source: '/adopt/comp',
		destination: 'https://sourcegraph.com/workflow'
	},
	{
		source: '/admin/auth/saml_with_microsoft_adfs',
		destination: '/admin/auth/saml/microsoft_adfs'
	},
	{
		source: '/admin/config/critical_config',
		destination: '/admin/migration/3_11'
	},
	{
		source: '/admin/external_service/bitbucketserver',
		destination: '/integration/bitbucket_server'
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy/index.md'
	},
	{
		source: '/admin/monitoring',
		destination: '/admin/observability'
	},
	{
		source: '/admin/monitoring/reporting_search_timeouts',
		destination:
			'/admin/observability/troubleshooting#scenario-search-timeouts'
	},
	{
		source: '/admin/monitoring/metrics_reference',
		destination: '/admin/observability/metrics_guide'
	},
	{
		source: '/admin/monitoring/slack_alert_channel',
		destination: '/admin/observability/alerting#set-up-alerts-in-grafana'
	},
	{
		source: '/@v5.3.0/admin/observability/alerts',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts'
	},
	{
		source: '/@v5.3.0/admin/observability/dashboards',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards'
	},
	{
		source: '/admin/monitoring_and_tracing',
		destination: '/admin/observability'
	},
	{
		source: '/integration/google_gsuite',
		destination: '/integration/google_workspace'
	},
	{
		source: '/dev/architecture/life-of-a-search-query',
		destination:
			'/dev/background-information/architecture/life-of-a-search-query'
	},
	{
		source: '/dev/architecture/architecture.dot',
		destination:
			'/dev/background-information/architecture/architecture.dot'
	},
	{
		source: '/dev/architecture/life-of-a-ping',
		destination: '/dev/background-information/architecture/life-of-a-ping'
	},
	{
		source: '/dev/architecture/life-of-a-repository',
		destination:
			'/dev/background-information/architecture/life-of-a-repository'
	},
	{
		source: '/dev/architecture/search-pagination',
		destination:
			'/dev/background-information/architecture/search-pagination'
	},
	{
		source: '/dev/architecture/architecture.dot',
		destination:
			'/dev/background-information/architecture/architecture.dot'
	},
	{
		source: '/dev/architecture/architecture.svg',
		destination:
			'/dev/background-information/architecture/architecture.svg'
	},
	{
		source: '/dev/codeintel/architecture',
		destination: '/dev/background-information/codeintel/architecture'
	},
	{
		source: '/dev/codeintel/deployment',
		destination: '/dev/background-information/codeintel/deployment'
	},
	{
		source: '/dev/codeintel/diagrams/architecture.dot',
		destination:
			'/dev/background-information/codeintel/diagrams/architecture.dot'
	},
	{
		source: '/dev/codeintel/diagrams/architecture.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/architecture.svg'
	},
	{
		source: '/dev/codeintel/diagrams/definitions.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/definitions.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/definitions.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/definitions.svg'
	},
	{
		source: '/dev/codeintel/diagrams/extension-definitions.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-definitions.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/extension-definitions.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-definitions.svg'
	},
	{
		source: '/dev/codeintel/diagrams/extension-hover.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-hover.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/extension-hover.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-hover.svg'
	},
	{
		source: '/dev/codeintel/diagrams/extension-references.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-references.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/extension-references.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/extension-references.svg'
	},
	{
		source: '/dev/codeintel/diagrams/hover.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/hover.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/hover.svg',
		destination: '/dev/background-information/codeintel/diagrams/hover.svg'
	},
	{
		source: '/dev/codeintel/diagrams/references.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/references.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/references.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/references.svg'
	},
	{
		source: '/dev/codeintel/diagrams/resolve-page.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/resolve-page.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/resolve-page.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/resolve-page.svg'
	},
	{
		source: '/dev/codeintel/diagrams/upload.mermaid',
		destination:
			'/dev/background-information/codeintel/diagrams/upload.mermaid'
	},
	{
		source: '/dev/codeintel/diagrams/upload.svg',
		destination:
			'/dev/background-information/codeintel/diagrams/upload.svg'
	},
	{
		source: '/dev/codeintel/extensions',
		destination: '/dev/background-information/codeintel/extensions'
	},
	{
		source: '/dev/codeintel/index',
		destination: '/dev/background-information/codeintel/index'
	},
	{
		source: '/dev/codeintel/queries',
		destination: '/dev/background-information/codeintel/queries'
	},
	{
		source: '/dev/codeintel/uploads',
		destination: '/dev/background-information/codeintel/uploads'
	},
	{
		source: '/dev/graphql_api',
		destination: '/dev/background-information/graphql_api'
	},
	{
		source: '/dev/observability',
		destination: '/dev/background-information/observability'
	},
	{
		source: '/dev/postgresql',
		destination: '/dev/background-information/postgresql'
	},
	{
		source: '/dev/renovate',
		destination: '/dev/background-information/renovate'
	},
	{
		source: '/dev/tech_stack',
		destination: '/dev/background-information/tech_stack'
	},
	{
		source: '/dev/telemetry',
		destination: '/dev/background-information/telemetry'
	},
	{
		source: '/dev/testing',
		destination: '/dev/background-information/testing'
	},
	{
		source: '/dev/web/build',
		destination: '/dev/background-information/web/build'
	},
	{
		source: '/dev/code_host_integrations',
		destination: '/dev/background-information/web/code_host_integrations'
	},
	{
		source: '/dev/web/graphql',
		destination: '/dev/background-information/web/graphql'
	},
	{
		source: '/dev/web/index',
		destination: '/dev/background-information/web/index'
	},
	{
		source: '/dev/web/web_app',
		destination: '/dev/background-information/web/web_app'
	},
	{
		source: '/dev/phabricator_gitolite',
		destination: '/dev/how-to/configure_phabricator_gitolite'
	},
	{
		source: '/dev/documentation',
		destination: '/dev/how-to/documentation_implementation'
	},
	{
		source: '/dev/zoekt',
		destination: '/dev/how-to/zoekt_local_dev'
	},
	{
		source: '/user/search/examples',
		destination: '/code_search/tutorials/examples'
	},
	{
		source: '/user/search/queries',
		destination: '/code_search/reference/queries'
	},
	{
		source: '/user/search/language',
		destination: '/code_search/reference/language'
	},
	{
		source: '/user/search/structural',
		destination: '/code_search/reference/structural'
	},
	{
		source: '/user/search/opengrok',
		destination: '/code_search/how-to/opengrok'
	},
	{
		source: '/user/search/saved_searches',
		destination: '/code_search/how-to/saved_searches'
	},
	{
		source: '/user/search/scopes',
		destination: '/code_search/how-to/scopes'
	},
	{
		source: '/user/code_intelligence/lsif_quickstart',
		destination: '/user/code_intelligence/how-to/index_other_languages'
	},
	{
		source: '/user/code_intelligence/basic_code_intelligence',
		destination:
			'/user/code_intelligence/explanations/search_based_code_intelligence'
	},
	{
		source: '/user/code_intelligence/features',
		destination: '/user/code_intelligence/explanations/features'
	},
	{
		source: '/user/code_intelligence/lsif',
		destination:
			'/user/code_intelligence/explanations/precise_code_intelligence'
	},
	{
		source: '/user/code_intelligence/precise_code_intelligence',
		destination:
			'/user/code_intelligence/explanations/precise_code_intelligence'
	},
	{
		source: '/user/code_intelligence/writing_an_indexer',
		destination: '/user/code_intelligence/explanations/writing_an_indexer'
	},
	{
		source: '/user/code_intelligence/adding_lsif_to_many_repos',
		destination: '/user/code_intelligence/how-to/adding_lsif_to_many_repos'
	},
	{
		source: '/user/code_intelligence/adding_lsif_to_workflows',
		destination: '/user/code_intelligence/how-to/adding_lsif_to_workflows'
	},
	{
		source: '/user/code_intelligence/languages/go',
		destination: '/user/code_intelligence/how-to/index_a_go_repository'
	},
	{
		source: '/user/code_intelligence/languages/typescript_and_javascript',
		destination:
			'/user/code_intelligence/how-to/index_a_typescript_and_javascript_repository'
	},
	{
		source: '/user/code_intelligence/explanations/basic_code_intelligence',
		destination:
			'/code_intelligence/explanations/search_based_code_intelligence'
	},
	{
		source: '/user/code_intelligence/explanations/features',
		destination: '/code_intelligence/explanations/features'
	},
	{
		source: '/user/code_intelligence/explanations/precise_code_intelligence',
		destination:
			'/code_intelligence/explanations/precise_code_intelligence'
	},
	{
		source: '/user/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_intelligence/explanations/writing_an_indexer'
	},
	{
		source: '/user/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_intelligence/how-to/adding_lsif_to_many_repos'
	},
	{
		source: '/user/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_intelligence/how-to/adding_lsif_to_workflows'
	},
	{
		source: '/user/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_intelligence/how-to/index_a_go_repository'
	},
	{
		source: '/user/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_intelligence/how-to/index_a_typescript_and_javascript_repository'
	},
	{
		source: '/user/markdown',
		destination: '/admin/markdown'
	},
	{
		source: '/user/organizations',
		destination: '/admin/organizations'
	},
	{
		source: '/user/organizations/index',
		destination: '/admin/organizations'
	},
	{
		source: '/user/usage_statistics',
		destination: '/analytics'
	},
	{
		source: '/admin/analytics',
		destination: '/analytics'
	},
	{
		source: '/user/user_surveys',
		destination: '/admin/user_surveys'
	},
	{
		source: '/user/repository/badges',
		destination: '/user/personalization/badges'
	},
	{
		source: '/user/quick_links',
		destination: '/user/personalization/quick_links'
	},
	{
		source: '/user/themes',
		destination: '/user/personalization/themes'
	},
	{
		source: '/user/search',
		destination: '/code_search'
	},
	{
		source: '/user/code_intelligence',
		destination: '/code_intelligence'
	},
	{
		source: '/user',
		destination: '/getting-started'
	},
	{
		source: '/user/automation',
		destination: '/batch_changes'
	},
	{
		source: '/user/campaigns',
		destination: '/batch_changes'
	},
	{
		source: '/user/campaigns/examples',
		destination: '/batch_changes/tutorials'
	},
	{
		source: '/user/campaigns/managing_access',
		destination: '/batch_changes/explanations/permissions_in_batch_changes'
	},
	{
		source: '/dev/campaigns_database_layout.dot',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.dot'
	},
	{
		source: '/dev/campaigns_database_layout.svg',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.svg'
	},
	{
		source: '/dev/campaigns_design',
		destination:
			'/dev/background-information/batch_changes/batch_changes_design'
	},
	{
		source: '/dev/campaigns_development',
		destination: '/dev/background-information/batch_changes/index'
	},
	{
		source: '/dev/automation_development',
		destination: '/dev/background-information/batch_changes/index'
	},
	{
		source: '/campaigns/campaign_spec_yaml_reference',
		destination: '/batch-changes/batch-spec-yaml-reference'
	},
	{
		source: '/dev/background-information/campaigns/campaigns_database_layout.svg',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.svg'
	},
	{
		source: '/dev/background-information/campaigns/campaigns_database_layout.dot',
		destination:
			'/dev/background-information/batch_changes/batch_changes_database_layout.dot'
	},
	{
		source: '/campaigns/explanations/how_src_executes_a_campaign_spec',
		destination:
			'/batch_changes/explanations/how_src_executes_a_batch_spec'
	},
	{
		source: '/campaigns/explanations/reexecuting_campaign_specs_multiple_times',
		destination:
			'/batch_changes/explanations/reexecuting_batch_specs_multiple_times'
	},
	{
		source: '/campaigns/explanations/permissions_in_batch_changes',
		destination: '/batch_changes/explanations/permissions_in_batch_changes'
	},
	{
		source: '/campaigns/explanations/introduction_to_batch_changes',
		destination:
			'/batch_changes/explanations/introduction_to_batch_changes'
	},
	{
		source: '/campaigns/explanations/batch_changes_design',
		destination: '/batch_changes/explanations/batch_changes_design'
	},
	{
		source: '/campaigns/explanations',
		destination: '/batch_changes/explanations'
	},
	{
		source: '/campaigns/references/requirements',
		destination: '/batch_changes/references/requirements'
	},
	{
		source: '/campaigns/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting'
	},
	{
		source: '/campaigns/references/name-change',
		destination: '/batch_changes/references/name-change'
	},
	{
		source: '/campaigns/references/campaign_spec_yaml_reference',
		destination: '/batch_changes/references/batch_spec_yaml_reference'
	},
	{
		source: '/campaigns/references/faq',
		destination: '/batch_changes/references/faq'
	},
	{
		source: '/campaigns/references/campaign_spec_templating',
		destination: '/batch_changes/references/batch_spec_templating'
	},
	{
		source: '/campaigns/references',
		destination: '/batch_changes/references'
	},
	{
		source: '/campaigns/tutorials/update_base_images_in_dockerfiles',
		destination:
			'/batch_changes/tutorials/update_base_images_in_dockerfiles'
	},
	{
		source: '/campaigns/tutorials/updating_go_import_statements',
		destination: '/batch_changes/tutorials/updating_go_import_statements'
	},
	{
		source: '/campaigns/tutorials/refactor_go_comby',
		destination: '/batch_changes/tutorials/refactor_go_comby'
	},
	{
		source: '/campaigns/tutorials/search_and_replace_specific_terms',
		destination:
			'/batch_changes/tutorials/search_and_replace_specific_terms'
	},
	{
		source: '/campaigns/tutorials',
		destination: '/batch_changes/tutorials'
	},
	{
		source: '/campaigns/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch_changes/how-tos/creating_changesets_per_project_in_monorepos'
	},
	{
		source: '/campaigns/how-tos/handling_errored_changesets',
		destination: '/batch_changes/how-tos/handling_errored_changesets'
	},
	{
		source: '/campaigns/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories'
	},
	{
		source: '/campaigns/how-tos/site_admin_configuration',
		destination: '/batch_changes/how-tos/site_admin_configuration'
	},
	{
		source: '/campaigns/how-tos/publishing_changesets',
		destination: '/batch_changes/how-tos/publishing_changesets'
	},
	{
		source: '/campaigns/how-tos/viewing_batch_changes',
		destination: '/batch_changes/how-tos/viewing_batch_changes'
	},
	{
		source: '/campaigns/how-tos/updating_a_batch_change',
		destination: '/batch_changes/how-tos/updating_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_user_credentials'
	},
	{
		source: '/campaigns/how-tos/closing_or_deleting_a_batch_change',
		destination:
			'/batch_changes/how-tos/closing_or_deleting_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/creating_a_batch_change',
		destination: '/batch_changes/how-tos/creating_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/tracking_existing_changesets',
		destination: '/batch_changes/how-tos/tracking_existing_changesets'
	},
	{
		source: '/campaigns/how-tos',
		destination: '/batch_changes/how-tos'
	},
	{
		source: '/campaigns/quickstart',
		destination: '/batch_changes/quickstart'
	},
	{
		source: '/campaigns',
		destination: '/batch_changes'
	},
	{
		source: '/cli/references/campaigns/apply',
		destination: '/cli/references/batch/apply'
	},
	{
		source: '/cli/references/campaigns/index',
		destination: '/cli/references/batch/index'
	},
	{
		source: '/cli/references/campaigns/new',
		destination: '/cli/references/batch/new'
	},
	{
		source: '/cli/references/campaigns/preview',
		destination: '/cli/references/batch/preview'
	},
	{
		source: '/cli/references/campaigns/repositories',
		destination: '/cli/references/batch/repositories'
	},
	{
		source: '/cli/references/campaigns/validate',
		destination: '/cli/references/batch/validate'
	},
	{
		source: '/cli/references/campaigns',
		destination: '/cli/references/batch'
	},
	{
		source: '/batch_changes/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_credentials'
	},
	{
		source: '/batch-changes/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting'
	},
	{
		source: '/dev/background-information/continuous_integration',
		destination: '/dev/background-information/ci'
	},
	{
		source: '/dev/how-to/add_and_use_logging',
		destination: '/dev/how-to/add_logging'
	},
	{
		source: '/admin/install',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/install/kubernetes/azure',
		destination: '/admin/deploy/kubernetes'
	},
	{
		source: '/admin/install/kubernetes/configure',
		destination: '/admin/deploy/kubernetes/configure'
	},
	{
		source: '/admin/install/kubernetes/eks',
		destination: '/admin/deploy/kubernetes/eks'
	},
	{
		source: '/admin/install/kubernetes/helm',
		destination: '/admin/deploy/kubernetes/helm'
	},
	{
		source: '/admin/install/kubernetes',
		destination: '/admin/deploy/kubernetes'
	},
	{
		source: '/admin/install/kubernetes/kustomize',
		destination: '/admin/deploy/kubernetes/kustomize'
	},
	{
		source: '/admin/install/kubernetes/operations',
		destination: '/admin/deploy/kubernetes/operations'
	},
	{
		source: '/admin/install/kubernetes/scale',
		destination: '/admin/deploy/kubernetes/scale'
	},
	{
		source: '/admin/install/kubernetes/troubleshoot',
		destination: '/admin/deploy/kubernetes/troubleshoot'
	},
	{
		source: '/admin/install/kubernetes/update',
		destination: '/admin/deploy/kubernetes/update'
	},
	{
		source: '/admin/install/kubernetes/overlays',
		destination: '/admin/deploy/kubernetes/configure'
	},
	{
		source: '/admin/install/docker-compose/aws',
		destination: '/admin/deploy/docker-compose/aws'
	},
	{
		source: '/admin/install/docker-compose/digitalocean',
		destination: '/admin/deploy/docker-compose/digitalocean'
	},
	{
		source: '/admin/install/docker-compose/google_cloud',
		destination: '/admin/deploy/docker-compose/google_cloud'
	},
	{
		source: '/admin/install/docker-compose',
		destination: '/admin/deploy/docker-compose'
	},
	{
		source: '/admin/install/docker-compose/migrate',
		destination: '/admin/deploy/docker-compose/migrate'
	},
	{
		source: '/admin/install/docker-compose/operations',
		destination: '/admin/deploy/docker-compose#operations'
	},
	{
		source: '/admin/install/docker-compose/update',
		destination: '/admin/deploy/docker-compose#upgrade'
	},
	{
		source: '/admin/install/docker-compose/configure',
		destination: '/admin/deploy/docker-compose#configure'
	},
	{
		source: '/admin/install/docker/aws',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker/digitalocean',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker/google_cloud',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/managed',
		destination: '/admin/deploy/managed'
	},
	{
		source: '/admin/install/migrate-backup',
		destination: '/admin/deploy/migrate-backup'
	},
	{
		source: '/admin/install/resource_estimator',
		destination: '/admin/deploy/resource_estimator'
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/deploy/cluster',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/deploy/docker',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/observability/alert_solutions',
		destination: '/admin/observability/alerts'
	},
	{
		source: '/admin/deploy/managed',
		destination: '/cloud'
	},
	{
		source: '/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_navigation/explanations/writing_an_indexer'
	},
	{
		source: '/code_intelligence/explanations/auto_indexing_inference',
		destination: '/code_navigation/explanations/auto_indexing_inference'
	},
	{
		source: '/code_intelligence/explanations/auto_indexing',
		destination: '/code_navigation/explanations/auto_indexing'
	},
	{
		source: '/code_intelligence/explanations/features',
		destination: '/code_navigation/explanations/features'
	},
	{
		source: '/code_intelligence/explanations/introduction_to_code_intelligence',
		destination:
			'/code_navigation/explanations/introduction_to_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/precise_code_intelligence',
		destination: '/code_navigation/explanations/precise_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/rockskip',
		destination: '/code_navigation/explanations/rockskip'
	},
	{
		source: '/code_intelligence/explanations/search_based_code_intelligence',
		destination:
			'/code_navigation/explanations/search_based_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/uploads',
		destination: '/code_navigation/explanations/uploads'
	},
	{
		source: '/code_intelligence/explanations',
		destination: '/code_navigation/explanations'
	},
	{
		source: '/code_intelligence/explanations/diagrams',
		destination: '/code_navigation/explanations/diagrams'
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/index-states.mermaid'
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.svg',
		destination: '/code_navigation/explanations/diagrams/index-states.svg'
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/upload-states.mermaid'
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.svg',
		destination: '/code_navigation/explanations/diagrams/upload-states.svg'
	},
	{
		source: '/code_intelligence/apidocs',
		destination: '/code_navigation/apidocs'
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_navigation/how-to/adding_lsif_to_many_repos'
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_navigation/how-to/adding_lsif_to_workflows'
	},
	{
		source: '/code_intelligence/how-to/configure_auto_indexing',
		destination: '/code_navigation/how-to/configure_auto_indexing'
	},
	{
		source: '/code_intelligence/how-to/configure_data_retention',
		destination: '/code_navigation/how-to/configure_data_retention'
	},
	{
		source: '/code_intelligence/how-to/enable_auto_indexing',
		destination: '/code_navigation/how-to/enable_auto_indexing'
	},
	{
		source: '/code_intelligence/how-to/index_a_cpp_repository',
		destination:
			'https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage'
	},
	{
		source: '/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_navigation/how-to/index_a_go_repository'
	},
	{
		source: '/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_navigation/how-to/index_a_typescript_and_javascript_repository'
	},
	{
		source: '/code_intelligence/how-to/index_other_languages',
		destination: '/code_navigation/how-to/index_other_languages'
	},
	{
		source: '/code_intelligence/how-to',
		destination: '/code_navigation/how-to'
	},
	{
		source: '/code_intelligence/how-to/img/CodeReview.gif',
		destination: '/code_navigation/how-to/img/CodeReview.gif'
	},
	{
		source: '/code_intelligence/how-to/img/experimental-language-server-enable.png',
		destination:
			'/code_navigation/how-to/img/experimental-language-server-enable.png'
	},
	{
		source: '/code_intelligence/how-to/img/extension-example.gif',
		destination: '/code_navigation/how-to/img/extension-example.gif'
	},
	{
		source: '/code_intelligence/how-to/img/network-description.png',
		destination: '/code_navigation/how-to/img/network-description.png'
	},
	{
		source: '/code_intelligence/how-to/img/network-waterfall.png',
		destination: '/code_navigation/how-to/img/network-waterfall.png'
	},
	{
		source: '/code_intelligence/how-to/img/popover.png',
		destination: '/code_navigation/how-to/img/popover.png'
	},
	{
		source: '/code_intelligence/how-to/img/Symbols.png',
		destination: '/code_navigation/how-to/img/Symbols.png'
	},
	{
		source: '/code_intelligence/how-to/img/SymbolSidebar.png',
		destination: '/code_navigation/how-to/imgSymbolSidebar.png'
	},
	{
		source: '/code_intelligence/how-to/img/workflow.png',
		destination: '/code_navigation/how-to/img/workflow.png'
	},
	{
		source: '/code_intelligence/how-to/img',
		destination: '/code_navigation/how-to/img'
	},
	{
		source: '/code_intelligence/references/auto_indexing_configuration',
		destination: '/code_navigation/references/auto_indexing_configuration'
	},
	{
		source: '/code_intelligence/references/envvars',
		destination: '/code_navigation/references/envvars'
	},
	{
		source: '/code_intelligence/references/faq',
		destination: '/code_navigation/references/faq'
	},
	{
		source: '/code_intelligence/references/indexers',
		destination: '/code_navigation/references/indexers'
	},
	{
		source: '/code_intelligence/references/precise_examples',
		destination: '/code_navigation/references/precise_examples'
	},
	{
		source: '/code_intelligence/references/requirements',
		destination: '/code_navigation/references/requirements'
	},
	{
		source: '/code_intelligence/references/troubleshooting',
		destination: '/code_navigation/references/troubleshooting'
	},
	{
		source: '/code_intelligence/references',
		destination: '/code_navigation/references'
	},
	{
		source: '/code_intelligence',
		destination: '/code_navigation'
	},
	{
		source: '/cody/autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#what-is-cody-code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#enabling-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#configuring-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance'
	},
	{
		source: '/cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance'
	},
	{
		source: '/cody/autocomplete#accessing-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs'
	},
	{
		source: '/cody/capabilities#access-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs'
	},
	{
		source: '/cody#get-cody',
		destination: '/cody'
	},
	{
		source: '/cody#getting-started',
		destination: '/cody'
	},
	{
		source: '/cody#features',
		destination: '/cody#main-features'
	},
	{
		source: '/cody#chatbot-that-knows-your-code',
		destination: '/cody'
	},
	{
		source: '/cody#fix-code-inline',
		destination: '/cody/capabilities'
	},
	{
		source: '/cody/capabilities#fix-code-inline',
		destination: '/cody/capabilities'
	},
	{
		source: '/cody#recipes',
		destination: '/cody/capabilities/commands'
	},
	{
		source: '/cody/capabilities#cody-recipes',
		destination: '/cody/capabilities/commands'
	},
	{
		source: '/cody#autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/overview',
		destination: '/cody/'
	},
	{
		source: '/cody/explanations/installing_vs_code',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-neovim',
		destination: '/cody/clients/install-neovim'
	},
	{
		source: '/cody/explanations/installing_jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/app',
		destination: '/cody/clients/app'
	},
	{
		source: '/cody/overview/app',
		destination: '/cody/clients/app'
	},
	{
		source: '/cody/explanations/enabling_cody',
		destination: '/cody/clients/cody-with-sourcegraph'
	},
	{
		source: '/cody/overview/cody-with-sourcegraph',
		destination: '/cody/clients/cody-with-sourcegraph'
	},
	{
		source: '/cody/explanations/enabling_cody_enterprise',
		destination: '/cody/clients/enable-cody-enterprise'
	},
	{
		source: '/cody/overview/enable-cody-enterprise',
		destination: '/cody/clients/enable-cody-enterprise'
	},
	{
		source: '/cody/quickstart#quickstart-for-cody-in-vs-code',
		destination: '/cody/quickstart'
	},
	{
		source: '/cody/quickstart#introduction',
		destination: '/cody/quickstart#cody-quickstart'
	},
	{
		source: '/cody/quickstart#getting-started-with-the-cody-extension-and-recipes',
		destination:
			'/cody/quickstart#getting-started-with-cody-extension-and-commands'
	},
	{
		source: '/cody/quickstart#generate-a-unit-test',
		destination: '/cody/quickstart#1-generate-a-unit-test'
	},
	{
		source: '/cody/quickstart#ask-cody-to-pull-reference-documentation',
		destination:
			'/cody/quickstart#3-ask-cody-to-pull-reference-documentation'
	},
	{
		source: '/cody/quickstart#ask-cody-to-write-context-aware-code',
		destination: '/cody/quickstart#working-with-the-cody-extension'
	},
	{
		source: '/cody/overview/install-jetbrains#introduction',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains#requirements',
		destination: '/cody/clients/install-jetbrains#prerequisites'
	},
	{
		source: '/cody/overview/install-jetbrains#prerequisites',
		destination: '/cody/clients/install-jetbrains#prerequisites'
	},
	{
		source: '/cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers'
	},
	{
		source: '/cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers'
	},
	{
		source: '/cody/overview/install-jetbrains#get-started-with-cody',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-vscode#introduction',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode#requirements',
		destination: '/cody/clients/install-vscode#prerequisites'
	},
	{
		source: '/cody/overview/install-vscode#prerequisites',
		destination: '/cody/clients/install-vscode#prerequisites'
	},
	{
		source: '/cody/overview/install-vscode#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional'
	},
	{
		source: '/cody/overview/install-vscode#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly',
		destination:
			'/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-off',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#disable-cody',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody'
	},
	{
		source: '/cody/explanations',
		destination: '/cody/core-concepts'
	},
	{
		source: '/cody/explanations/code_graph_context#embeddings',
		destination: '/cody/embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#embeddings',
		destination: '/cody/embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-embeddings',
		destination: '/cody/embeddings/configure-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings',
		destination: '/cody/embeddings/configure-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#filtering-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#storing-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes'
	},
	{
		source: '/cody/explanations/code_graph_context#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3'
	},
	{
		source: '/cody/explanations/code_graph_context#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs'
	},
	{
		source: '/cody/explanations/code_graph_context#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets'
	},
	{
		source: '/cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service'
	},
	{
		source: '/cody/explanations/code_graph_context#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly',
		destination: '/cody/embeddings#third-party-embeddings-provider'
	},
	{
		source: '/cody/core-concepts/embeddings#third-party-embeddings-provider',
		destination: '/cody/embeddings#third-party-embeddings-provider'
	},
	{
		source: '/cody/explanations/code_graph_context#openai',
		destination: '/cody/embeddings#openai'
	},
	{
		source: '/cody/core-concepts/embeddings#openai',
		destination: '/cody/embeddings#openai'
	},
	{
		source: '/cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span',
		destination: '/cody/embeddings#azure-openai'
	},
	{
		source: '/cody/core-concepts/embeddings#azure-openai',
		destination: '/cody/embeddings#azure-openai'
	},
	{
		source: '/cody/explanations/code_graph_context#disabling-embeddings',
		destination: '/cody/embeddings#disable-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#disable-embeddings',
		destination: '/cody/embeddings#disable-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-the-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit'
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit'
	},
	{
		source: '/cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated'
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated'
	},
	{
		source: '/cody/explanations/indexing',
		destination: '/cody/embeddings/embedding-index'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index',
		destination: '/cody/embeddings/embedding-index'
	},
	{
		source: '/cody/explanations/indexing#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index'
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise'
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom'
	},
	{
		source: '/cody/explanations/indexing#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers'
	},
	{
		source: '/cody/explanations/indexing#extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings'
	},
	{
		source: '/cody/explanations/indexing#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration'
	},
	{
		source: '/cody/explanations/indexing#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson'
	},
	{
		source: '/cody/explanations/policies',
		destination: '/cody/embeddings/configure-embeddings#policies'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#policies',
		destination: '/cody/embeddings/configure-embeddings#policies'
	},
	{
		source: '/cody/explanations/policies#how-to-create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy'
	},
	{
		source: '/cody/explanations/policies#example-1',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#example-2',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#example-3',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy'
	},
	{
		source: '/cody/explanations/schedule_one_off_embeddings_jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs'
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph'
	},
	{
		source: '/cody/explanations/cody_gateway',
		destination: '/cody/core-concepts/cody_gateway'
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph'
	},
	{
		source: '/cody/core-concepts/cody_clients',
		destination: '/cody/clients'
	},
	{
		source: '/cody/overview#getting-started',
		destination: '/cody/clients'
	},
	{
		source: '/cody/core-concepts/cody_gateway',
		destination: '/cody/core-concepts/cody-gateway'
	},
	{
		source: '/cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise',
		destination:
			'/cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise'
	},
	{
		source: '/cody/core-concepts/cody_gateway#configuring-custom-models',
		destination:
			'/cody/core-concepts/cody-gateway#configuring-custom-models'
	},
	{
		source: '/cody/core-concepts/cody_gateway#rate-limits-and-quotas',
		destination: '/cody/core-concepts/cody-gateway#rate-limits-and-quotas'
	},
	{
		source: '/cody/core-concepts/cody_gateway#privacy-and-security',
		destination: '/cody/core-concepts/cody-gateway#privacy-and-security'
	},
	{
		source: '/cody/custom-commands',
		destination: '/cody/capabilities/commands#custom-commands'
	},

	// Code Search revamp redirects

	{
		source: '/code_search',
		destination: '/code-search'
	},
	{
		source: '/code_search/tutorials',
		destination: '/code-search/working/saved_searches'
	},
	{
		source: '/code_search/tutorials/examples',
		destination: '/code-search/queries/examples'
	},

	{
		source: '/code_search/tutorials/search_subexpressions',
		destination: '/code-search/working/search_subexpressions'
	},

	{
		source: '/code_search/how-to',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/how-to/saved_searches',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/how-to/snippets',
		destination: '/code-search/working/snippets'
	},

	{
		source: '/code_search/how-to/search_contexts',
		destination: '/code-search/working/search_contexts'
	},

	{
		source: '/code_search/how-to/exhaustive',
		destination: '/code-search/types/exhaustive'
	},

	{
		source: '/code_search/how-to/search-jobs',
		destination: '/code-search/types/search-jobs'
	},

	{
		source: '/code_search/examples',
		destination: '/code-search/queries/examples'
	},

	{
		source: '/code_search/explanations',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/explanations/features',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/explanations/search_details',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/explanations/tips',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/reference/queries',
		destination: '/code-search/queries'
	},

	{
		source: '/code_search/reference/queries#search-pattern-syntax',
		destination: '/code-search/queries#search-pattern-syntax'
	},

	{
		source: '/code_search/reference/language',
		destination: '/code-search/queries/language'
	},

	// Code Navigation redirects
	{
		source: '/code_navigation',
		destination: '/code-search/code-navigation'
	},

	{
		source: '/code_navigation/how-to/configure_data_retention',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies'
	},

	{
		source: '/code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#automated-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#automated-indexing'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#github-actions',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#github-actions'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#circleci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#circleci'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#travis-ci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#travis-ci'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#manual-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#manual-indexing'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_many_repos',
		destination: '/code-search/code-navigation/precise_code_navigation'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#language-specific-guides',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#language-specific-guides'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#using-indexer-containers',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#using-indexer-containers'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#github-action-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#github-action-examples'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#circle-ci-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#circle-ci-examples'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#travis-ci-examples',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#travis-ci-examples'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#ci-from-scratch',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#ci-from-scratch'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom'
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing'
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#deploy-executors',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors'
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#enable-index-job-scheduling',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#enable-index-job-scheduling'
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#tune-the-index-scheduler',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#tune-the-index-scheduler'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#configure-auto-indexing-policies',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-to-a-specific-repository',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-to-a-specific-repository'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#explicit-index-job-configuration',
		destination:
			'/code-search/code-navigation/auto_indexing#explicit-index-job-configuration'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#private-repositories-and-packages-configuration',
		destination:
			'/code-search/code-navigation/auto_indexing#private-repositories-and-packages-configuration'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#go',
		destination: '/code-search/code-navigation/auto_indexing#go'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#typescriptjavascript',
		destination:
			'/code-search/code-navigation/auto_indexing#typescriptjavascript'
	},

	{
		source: '/code_navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-search/code-navigation/how-to/policies_resource_usage_best_practices'
	},

	{
		source: '/code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing'
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation',
		destination: '/code-search/code-navigation'
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise',
		destination: '/code-search/code-navigation#code-navigation-types'
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation',
		destination: '/code-search/code-navigation/precise_code_navigation'
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation#why-are-my-results-sometimes-incorrect',
		destination:
			'/code-search/code-navigation/troubleshooting#why-are-my-results-sometimes-incorrect'
	},

	{
		source: '/code_navigation/explanations/uploads',
		destination: '/code-search/code-navigation/explanations/uploads'
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload'
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui'
	},

	{
		source: '/code_navigation/explanations/uploads#repository-commit-graph',
		destination:
			'/code-search/code-navigation/explanations/uploads#repository-commit-graph'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation',
		destination:
			'/code-search/code-navigation/search_based_code_navigation'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#how-does-it-work',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#how-does-it-work'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply'
	},

	{
		source: '/code_navigation/explanations/features',
		destination: '/code-search/code-navigation/features'
	},

	{
		source: '/code_navigation/explanations/features#popover',
		destination: '/code-search/code-navigation/features#popover'
	},
	{
		source: '/code_navigation/explanations/features#go-to-definition',
		destination: '/code-search/code-navigation/features#go-to-definition'
	},
	{
		source: '/code_navigation/explanations/features#find-references',
		destination: '/code-search/code-navigation/features#find-references'
	},
	{
		source: '/code_navigation/explanations/features#dependency-navigation',
		destination:
			'/code-search/code-navigation/features#dependency-navigation'
	},
	{
		source: '/code_navigation/explanations/features#find-implementations',
		destination:
			'/code-search/code-navigation/features#find-implementations'
	},

	{
		source: '/code_navigation/explanations/features#perform-an-action',
		destination: '/code-search/code-navigation/features#perform-an-action'
	},

	{
		source: '/code_navigation/explanations/features#symbol-search',
		destination: '/code-search/types/symbol'
	},

	{
		source: '/code_navigation/explanations/rockskip',
		destination: '/code-search/code-navigation/rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#when-should-i-use-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#when-should-i-use-rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-enable-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-enable-rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-long-does-indexing-take',
		destination:
			'/code-search/code-navigation/rockskip#how-long-does-indexing-take'
	},

	{
		source: '/code_navigation/explanations/rockskip#what-resources-does-rockskip-use',
		destination:
			'/code-search/code-navigation/rockskip#what-resources-does-rockskip-use'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status'
	},

	{
		source: '/code_navigation/explanations/rockskip#when-is-indexing-triggered',
		destination:
			'/code-search/code-navigation/rockskip#when-is-indexing-triggered'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer',
		destination:
			'/code-search/code-navigation/writing_an_indexer#writing-an-indexer'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema',
		destination:
			'/code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings',
		destination:
			'/code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		destination:
			'/code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli',
		destination:
			'/code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features',
		destination:
			'/code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features'
	},

	{
		source: '/code_navigation/explanations/auto_indexing',
		destination: '/code-search/code-navigation/auto_indexing'
	},

	{
		source: '/code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#go',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#go'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#typescript',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#typescript'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#java',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#java'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#rust',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#rust'
	},

	{
		source: '/code_navigation/references/troubleshooting',
		destination: '/code-search/code-navigation/troubleshooting'
	},

	{
		source: '/code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence',
		destination:
			'/code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence'
	},

	{
		source: '/code_navigation/references/troubleshooting#gathering-evidence',
		destination:
			'/code-search/code-navigation/troubleshooting#gathering-evidence'
	},

	{
		source: '/code_navigation/references/indexers',
		destination:
			'/code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers'
	},

	{
		source: '/code_navigation/references/indexers#quick-reference',
		destination:
			'/code-search/code-navigation/writing_an_indexer#quick-reference'
	},

	{
		source: '/code_navigation/references/precise_examples',
		destination:
			'/code-search/code-navigation/precise_code_navigation#precise-navigation-examples'
	},

	{
		source: '/code_navigation/references/envvars',
		destination: '/code-search/code-navigation/envvars'
	},

	{
		source: '/code_navigation/references/envvars#frontend',
		destination: '/code-search/code-navigation/envvars#frontend'
	},

	{
		source: '/code_navigation/references/envvars#worker',
		destination: '/code-search/code-navigation/envvars#worker'
	},

	{
		source: '/code_navigation/references/envvars#precise-code-intel-worker',
		destination:
			'/code-search/code-navigation/envvars#precise-code-intel-worker'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration',
		destination: '/code-search/code-navigation/auto_indexing_configuration'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#keys',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#keys'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#index-job-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#index-job-object'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#docker-step-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#docker-step-object'
	},

	{
		source: '/code_navigation/references/inference_configuration',
		destination: '/code-search/code-navigation/inference_configuration'
	},
	{
		source: '/batch_changes',
		destination: '/batch-changes'
	},
	{
		source: '/batch_changes/quickstart',
		destination: '/batch-changes/quickstart'
	},
	{
		source: '/batch_changes/explanations',
		destination: '/batch-changes/'
	},
	{
		source: '/batch_changes/explanations/introduction_to_batch_changes',
		destination: '/batch-changes/'
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#code-host-interactions-in-batch-changes',
		destination:
			'/batch-changes/permissions-in-batch-changes#code-host-interactions-in-batch-changes'
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#repository-permissions-for-batch-changes',
		destination:
			'/batch-changes/permissions-in-batch-changes#repository-permissions-for-batch-changes'
	},
	{
		source: '/batch_changes/explanations/permissions_in_batch_changes#disabling-batch-changes-for-non-site-admin-users',
		destination:
			'/batch-changes/permissions-in-batch-changes#disabling-batch-changes-for-non-site-admin-users'
	},
	{
		source: '/batch_changes/explanations/batch_changes_design',
		destination: '/batch-changes/design'
	},
	{
		source: '/batch_changes/explanations/how_src_executes_a_batch_spec',
		destination: '/batch-changes/how-src-executes-a-batch-spec'
	},
	{
		source: '/batch_changes/explanations/reexecuting_batch_specs_multiple_times',
		destination: '/batch-changes/reexecuting-batch-specs-multiple-times'
	},
	{
		source: '/batch_changes/explanations/server_side',
		destination: '/batch-changes/server-side'
	},
	{
		source: '/batch_changes/tutorials',
		destination: '/batch-changes/examples'
	},
	{
		source: '/batch_changes/tutorials/refactor_go_comby',
		destination: '/batch-changes/refactor-go-comby'
	},
	{
		source: '/batch_changes/tutorials/updating_go_import_statements',
		destination: '/batch-changes/updating-go-import-statements'
	},
	{
		source: '/batch_changes/tutorials/update_base_images_in_dockerfiles',
		destination: '/batch-changes/update-base-images-in-dockerfiles'
	},
	{
		source: '/batch_changes/tutorials/search_and_replace_specific_terms',
		destination: '/batch-changes/search-and-replace-specific-terms'
	},
	{
		source: '/batch_changes/how-tos/creating_a_batch_change',
		destination: '/batch-changes/create-a-batch-change'
	},
	{
		source: '/batch_changes/how-tos/publishing_changesets',
		destination: '/batch-changes/publishing-changesets'
	},
	{
		source: '/batch_changes/how-tos/publishing_changesets#publishing-changesets',
		destination:
			'/batch-changes/publishing-changesets#publishing-changesets'
	},
	{
		source: '/batch_changes/how-tos/updating_a_batch_change',
		destination: '/batch-changes/update-a-batch-change'
	},
	{
		source: '/batch_changes/how-tos/updating_a_batch_change#removing-changesets',
		destination: '/batch-changes/update-a-batch-change#removing-changesets'
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes',
		destination:
			'/batch-changes/create-a-batch-change#viewing-batch-changes'
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes#filtering-batch-changes',
		destination:
			'/batch-changes/create-a-batch-change#filtering-batch-changes'
	},
	{
		source: '/batch_changes/how-tos/viewing_batch_changes#filtering-changesets',
		destination:
			'/batch-changes/create-a-batch-change#filtering-changesets'
	},
	{
		source: '/batch_changes/how-tos/tracking_existing_changesets',
		destination: '/batch-changes/tracking-existing-changesets'
	},
	{
		source: '/batch_changes/how-tos/closing_or_deleting_a_batch_change',
		destination: '/batch-changes/delete-a-batch-change'
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials',
		destination: '/batch-changes/configuring-credentials'
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials#personal-access-tokens',
		destination:
			'/batch-changes/configuring-credentials#personal-access-tokens'
	},
	{
		source: '/batch_changes/how-tos/configuring_credentials#global-service-account-tokens',
		destination:
			'/batch-changes/configuring-credentials#global-service-account-tokens'
	},
	{
		source: '/batch_changes/how-tos/handling_errored_changesets',
		destination: '/batch-changes/handling-errored-changesets'
	},
	{
		source: '/batch_changes/how-tos/bulk_operations_on_changesets',
		destination: '/batch-changes/bulk-operations-on-changesets'
	},
	{
		source: '/batch_changes/how-tos/server_side_file_mounts',
		destination:
			'/batch-changes/server-side#using-file-mounts-with-server-side-execution'
	},
	{
		source: '/batch_changes/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch-changes/creating-changesets-per-project-in-monorepos'
	},
	{
		source: '/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch-changes/creating-multiple-changesets-in-large-repositories'
	},
	{
		source: '/batch_changes/how-tos/site_admin_configuration',
		destination: '/batch-changes/site-admin-configuration'
	},
	{
		source: '/batch_changes/references/requirements',
		destination: '/batch-changes/requirements'
	},
	{
		source: '/batch_changes/references/requirements#batch-changes-effect-on-code-host-rate-limits',
		destination:
			'/batch-changes/requirements#batch-changes-effect-on-code-host-rate-limits'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference',
		destination: '/batch-changes/batch-spec-yaml-reference'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#name',
		destination: '/batch-changes/batch-spec-yaml-reference#name'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#description',
		destination: '/batch-changes/batch-spec-yaml-reference#description'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#on',
		destination: '/batch-changes/batch-spec-yaml-reference#on'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#onrepositoriesmatchingquery',
		destination:
			'/batch-changes/batch-spec-yaml-reference#onrepositoriesmatchingquery'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#onrepository',
		destination: '/batch-changes/batch-spec-yaml-reference#onrepository'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#steps',
		destination: '/batch-changes/batch-spec-yaml-reference#steps'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsrun',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsrun'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepscontainer',
		destination: '/batch-changes/batch-spec-yaml-reference#stepscontainer'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsenv',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsenv'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsfiles',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsfiles'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputs',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsoutputs'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputsnamevalue',
		destination:
			'/batch-changes/batch-spec-yaml-reference#stepsoutputsnamevalue'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsoutputsnameformat',
		destination:
			'/batch-changes/batch-spec-yaml-reference#stepsoutputsnameformat'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsif',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsif'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#stepsmount',
		destination: '/batch-changes/batch-spec-yaml-reference#stepsmount'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesets',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesets'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesetsrepository',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesetsrepository'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#importchangesetsexternalids',
		destination:
			'/batch-changes/batch-spec-yaml-reference#importchangesetsexternalids'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplate',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplate'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatetitle',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatetitle'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatebody',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatebody'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatebranch',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatebranch'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommit',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommit'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitmessage',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommitmessage'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitauthor',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatecommitauthor'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatepublished',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatepublished'
	},
	// Do not comment
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#changesettemplatefork',
		destination:
			'/batch-changes/batch-spec-yaml-reference#changesettemplatefork'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchanges',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchanges'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroup',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroup'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroupdirectory',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroupdirectory'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgroupbranch',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgroupbranch'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#transformchangesgrouprepository',
		destination:
			'/batch-changes/batch-spec-yaml-reference#transformchangesgrouprepository'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspaces',
		destination: '/batch-changes/batch-spec-yaml-reference#workspaces'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesrootatlocationof',
		destination:
			'/batch-changes/batch-spec-yaml-reference#workspacesrootatlocationof'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesin',
		destination: '/batch-changes/batch-spec-yaml-reference#workspacesin'
	},
	{
		source: '/batch_changes/references/batch_spec_yaml_reference#workspacesonlyfetchworkspace',
		destination:
			'/batch-changes/batch-spec-yaml-reference#workspacesonlyfetchworkspace'
	},
	{
		source: '/batch_changes/references/batch_spec_templating',
		destination: '/batch-changes/batch-spec-templating'
	},
	{
		source: '/batch_changes/references/batch_spec_templating#fields-with-template-support',
		destination:
			'/batch-changes/batch-spec-templating#fields-with-template-support'
	},
	{
		source: '/batch_changes/references/batch_spec_cheat_sheet',
		destination: '/batch-changes/batch-spec-cheat-sheet'
	},
	{
		source: '/batch_changes/references/batch_spec_cheat_sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax',
		destination:
			'/batch-changes/batch-spec-cheat-sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax'
	},
	{
		source: '/batch_changes/references/troubleshooting',
		destination: '/batch-changes/troubleshooting'
	},
	{
		source: '/batch_changes/references/faq',
		destination: '/batch-changes/faq'
	},
	{
		source: '/admin/auth/saml_with_microsoft_adfs',
		destination: '/admin/auth/saml/microsoft_adfs'
	},
	{
		source: '/admin/config/critical_config',
		destination: '/admin/migration/3_11'
	},
	{
		source: '/admin/code_hosts/bitbucketserver',
		destination: '/integration/bitbucket_server'
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy/index.md'
	},
	{
		source: '/admin/monitoring',
		destination: '/admin/observability'
	},
	{
		source: '/admin/monitoring/reporting_search_timeouts',
		destination:
			'/admin/observability/troubleshooting#scenario-search-timeouts'
	},
	{
		source: '/admin/monitoring/metrics_reference',
		destination: '/admin/observability/metrics_guide'
	},
	{
		source: '/admin/monitoring/slack_alert_channel',
		destination: '/admin/observability/alerting#set-up-alerts-in-grafana'
	},
	{
		source: '/@v5.3.0/admin/observability/alerts',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts'
	},
	{
		source: '/@v5.3.0/admin/observability/dashboards',
		destination:
			'https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards'
	},
	{
		source: '/admin/monitoring_and_tracing',
		destination: '/admin/observability'
	},
	{
		source: '/integration/google_gsuite',
		destination: '/integration/google_workspace'
	},
	{
		source: '/campaigns/explanations/how_src_executes_a_campaign_spec',
		destination:
			'/batch_changes/explanations/how_src_executes_a_batch_spec'
	},
	{
		source: '/campaigns/explanations/reexecuting_campaign_specs_multiple_times',
		destination:
			'/batch_changes/explanations/reexecuting_batch_specs_multiple_times'
	},
	{
		source: '/campaigns/explanations/permissions_in_batch_changes',
		destination: '/batch_changes/explanations/permissions_in_batch_changes'
	},
	{
		source: '/campaigns/explanations/introduction_to_batch_changes',
		destination:
			'/batch_changes/explanations/introduction_to_batch_changes'
	},
	{
		source: '/campaigns/explanations/batch_changes_design',
		destination: '/batch_changes/explanations/batch_changes_design'
	},
	{
		source: '/campaigns/explanations',
		destination: '/batch_changes/explanations'
	},
	{
		source: '/campaigns/references/requirements',
		destination: '/batch_changes/references/requirements'
	},
	{
		source: '/campaigns/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting'
	},
	{
		source: '/campaigns/references/name-change',
		destination: '/batch_changes/references/name-change'
	},
	{
		source: '/campaigns/references/campaign_spec_yaml_reference',
		destination: '/batch_changes/references/batch_spec_yaml_reference'
	},
	{
		source: '/campaigns/references/faq',
		destination: '/batch_changes/references/faq'
	},
	{
		source: '/campaigns/references/campaign_spec_templating',
		destination: '/batch_changes/references/batch_spec_templating'
	},
	{
		source: '/campaigns/references',
		destination: '/batch_changes/references'
	},
	{
		source: '/campaigns/tutorials/update_base_images_in_dockerfiles',
		destination:
			'/batch_changes/tutorials/update_base_images_in_dockerfiles'
	},
	{
		source: '/campaigns/tutorials/updating_go_import_statements',
		destination: '/batch_changes/tutorials/updating_go_import_statements'
	},
	{
		source: '/campaigns/tutorials/refactor_go_comby',
		destination: '/batch_changes/tutorials/refactor_go_comby'
	},
	{
		source: '/campaigns/tutorials/search_and_replace_specific_terms',
		destination:
			'/batch_changes/tutorials/search_and_replace_specific_terms'
	},
	{
		source: '/campaigns/tutorials',
		destination: '/batch_changes/tutorials'
	},
	{
		source: '/campaigns/how-tos/creating_changesets_per_project_in_monorepos',
		destination:
			'/batch_changes/how-tos/creating_changesets_per_project_in_monorepos'
	},
	{
		source: '/campaigns/how-tos/handling_errored_changesets',
		destination: '/batch_changes/how-tos/handling_errored_changesets'
	},
	{
		source: '/campaigns/how-tos/creating_multiple_changesets_in_large_repositories',
		destination:
			'/batch_changes/how-tos/creating_multiple_changesets_in_large_repositories'
	},
	{
		source: '/campaigns/how-tos/site_admin_configuration',
		destination: '/batch_changes/how-tos/site_admin_configuration'
	},
	{
		source: '/campaigns/how-tos/publishing_changesets',
		destination: '/batch_changes/how-tos/publishing_changesets'
	},
	{
		source: '/campaigns/how-tos/viewing_batch_changes',
		destination: '/batch_changes/how-tos/viewing_batch_changes'
	},
	{
		source: '/campaigns/how-tos/updating_a_batch_change',
		destination: '/batch_changes/how-tos/updating_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_user_credentials'
	},
	{
		source: '/campaigns/how-tos/closing_or_deleting_a_batch_change',
		destination:
			'/batch_changes/how-tos/closing_or_deleting_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/creating_a_batch_change',
		destination: '/batch_changes/how-tos/creating_a_batch_change'
	},
	{
		source: '/campaigns/how-tos/tracking_existing_changesets',
		destination: '/batch_changes/how-tos/tracking_existing_changesets'
	},
	{
		source: '/campaigns/how-tos',
		destination: '/batch_changes/how-tos'
	},
	{
		source: '/campaigns/quickstart',
		destination: '/batch_changes/quickstart'
	},
	{
		source: '/campaigns',
		destination: '/batch_changes'
	},
	{
		source: '/cli/references/campaigns/apply',
		destination: '/cli/references/batch/apply'
	},
	{
		source: '/cli/references/campaigns/index',
		destination: '/cli/references/batch/index'
	},
	{
		source: '/cli/references/campaigns/new',
		destination: '/cli/references/batch/new'
	},
	{
		source: '/cli/references/campaigns/preview',
		destination: '/cli/references/batch/preview'
	},
	{
		source: '/cli/references/campaigns/repositories',
		destination: '/cli/references/batch/repositories'
	},
	{
		source: '/cli/references/campaigns/validate',
		destination: '/cli/references/batch/validate'
	},
	{
		source: '/cli/references/campaigns',
		destination: '/cli/references/batch'
	},
	{
		source: '/batch_changes/how-tos/configuring_user_credentials',
		destination: '/batch_changes/how-tos/configuring_credentials'
	},
	{
		source: '/batch-changes/references/troubleshooting',
		destination: '/batch_changes/references/troubleshooting'
	},
	{
		source: '/dev/background-information/continuous_integration',
		destination: '/dev/background-information/ci'
	},
	{
		source: '/dev/how-to/add_and_use_logging',
		destination: '/dev/how-to/add_logging'
	},
	{
		source: '/admin/install',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/install/kubernetes/azure',
		destination: '/admin/deploy/kubernetes'
	},
	{
		source: '/admin/install/kubernetes/configure',
		destination: '/admin/deploy/kubernetes/configure'
	},
	{
		source: '/admin/install/kubernetes/eks',
		destination: '/admin/deploy/kubernetes/eks'
	},
	{
		source: '/admin/install/kubernetes/helm',
		destination: '/admin/deploy/kubernetes/helm'
	},
	{
		source: '/admin/install/kubernetes',
		destination: '/admin/deploy/kubernetes'
	},
	{
		source: '/admin/install/kubernetes/kustomize',
		destination: '/admin/deploy/kubernetes/kustomize'
	},
	{
		source: '/admin/install/kubernetes/operations',
		destination: '/admin/deploy/kubernetes/operations'
	},
	{
		source: '/admin/install/kubernetes/scale',
		destination: '/admin/deploy/kubernetes/scale'
	},
	{
		source: '/admin/install/kubernetes/troubleshoot',
		destination: '/admin/deploy/kubernetes/troubleshoot'
	},
	{
		source: '/admin/install/kubernetes/update',
		destination: '/admin/deploy/kubernetes/update'
	},
	{
		source: '/admin/install/kubernetes/overlays',
		destination: '/admin/deploy/kubernetes/configure'
	},
	{
		source: '/admin/install/docker-compose/aws',
		destination: '/admin/deploy/docker-compose/aws'
	},
	{
		source: '/admin/install/docker-compose/digitalocean',
		destination: '/admin/deploy/docker-compose/digitalocean'
	},
	{
		source: '/admin/install/docker-compose/google_cloud',
		destination: '/admin/deploy/docker-compose/google_cloud'
	},
	{
		source: '/admin/install/docker-compose',
		destination: '/admin/deploy/docker-compose'
	},
	{
		source: '/admin/install/docker-compose/migrate',
		destination: '/admin/deploy/docker-compose/migrate'
	},
	{
		source: '/admin/install/docker-compose/operations',
		destination: '/admin/deploy/docker-compose#operations'
	},
	{
		source: '/admin/install/docker-compose/update',
		destination: '/admin/deploy/docker-compose#upgrade'
	},
	{
		source: '/admin/install/docker-compose/configure',
		destination: '/admin/deploy/docker-compose#configure'
	},
	{
		source: '/admin/install/docker/aws',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker/digitalocean',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker/google_cloud',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/docker',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/install/managed',
		destination: '/admin/deploy/managed'
	},
	{
		source: '/admin/install/migrate-backup',
		destination: '/admin/deploy/migrate-backup'
	},
	{
		source: '/admin/install/resource_estimator',
		destination: '/admin/deploy/resource_estimator'
	},
	{
		source: '/admin/install/cluster.md',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/deploy/cluster',
		destination: '/admin/deploy'
	},
	{
		source: '/admin/deploy/docker',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/observability/alert_solutions',
		destination: '/admin/observability/alerts'
	},
	{
		source: '/admin/deploy/managed',
		destination: '/cloud'
	},
	{
		source: '/code_intelligence/explanations/writing_an_indexer',
		destination: '/code_navigation/explanations/writing_an_indexer'
	},
	{
		source: '/code_intelligence/explanations/auto_indexing_inference',
		destination: '/code_navigation/explanations/auto_indexing_inference'
	},
	{
		source: '/code_intelligence/explanations/auto_indexing',
		destination: '/code_navigation/explanations/auto_indexing'
	},
	{
		source: '/code_intelligence/explanations/features',
		destination: '/code_navigation/explanations/features'
	},
	{
		source: '/code_intelligence/explanations/introduction_to_code_intelligence',
		destination:
			'/code_navigation/explanations/introduction_to_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/precise_code_intelligence',
		destination: '/code_navigation/explanations/precise_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/rockskip',
		destination: '/code_navigation/explanations/rockskip'
	},
	{
		source: '/code_intelligence/explanations/search_based_code_intelligence',
		destination:
			'/code_navigation/explanations/search_based_code_navigation'
	},
	{
		source: '/code_intelligence/explanations/uploads',
		destination: '/code_navigation/explanations/uploads'
	},
	{
		source: '/code_intelligence/explanations',
		destination: '/code_navigation/explanations'
	},
	{
		source: '/code_intelligence/explanations/diagrams',
		destination: '/code_navigation/explanations/diagrams'
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/index-states.mermaid'
	},
	{
		source: '/code_intelligence/explanations/diagrams/index-states.svg',
		destination: '/code_navigation/explanations/diagrams/index-states.svg'
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.mermaid',
		destination:
			'/code_navigation/explanations/diagrams/upload-states.mermaid'
	},
	{
		source: '/code_intelligence/explanations/diagrams/upload-states.svg',
		destination: '/code_navigation/explanations/diagrams/upload-states.svg'
	},
	{
		source: '/code_intelligence/apidocs',
		destination: '/code_navigation/apidocs'
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_many_repos',
		destination: '/code_navigation/how-to/adding_lsif_to_many_repos'
	},
	{
		source: '/code_intelligence/how-to/adding_lsif_to_workflows',
		destination: '/code_navigation/how-to/adding_lsif_to_workflows'
	},
	{
		source: '/code_intelligence/how-to/configure_auto_indexing',
		destination: '/code_navigation/how-to/configure_auto_indexing'
	},
	{
		source: '/code_intelligence/how-to/configure_data_retention',
		destination: '/code_navigation/how-to/configure_data_retention'
	},
	{
		source: '/code_intelligence/how-to/enable_auto_indexing',
		destination: '/code_navigation/how-to/enable_auto_indexing'
	},
	{
		source: '/code_intelligence/how-to/index_a_cpp_repository',
		destination:
			'https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage'
	},
	{
		source: '/code_intelligence/how-to/index_a_go_repository',
		destination: '/code_navigation/how-to/index_a_go_repository'
	},
	{
		source: '/code_intelligence/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code_navigation/how-to/index_a_typescript_and_javascript_repository'
	},
	{
		source: '/code_intelligence/how-to/index_other_languages',
		destination: '/code_navigation/how-to/index_other_languages'
	},
	{
		source: '/code_intelligence/how-to',
		destination: '/code_navigation/how-to'
	},
	{
		source: '/code_intelligence/how-to/img/CodeReview.gif',
		destination: '/code_navigation/how-to/img/CodeReview.gif'
	},
	{
		source: '/code_intelligence/how-to/img/experimental-language-server-enable.png',
		destination:
			'/code_navigation/how-to/img/experimental-language-server-enable.png'
	},
	{
		source: '/code_intelligence/how-to/img/extension-example.gif',
		destination: '/code_navigation/how-to/img/extension-example.gif'
	},
	{
		source: '/code_intelligence/how-to/img/network-description.png',
		destination: '/code_navigation/how-to/img/network-description.png'
	},
	{
		source: '/code_intelligence/how-to/img/network-waterfall.png',
		destination: '/code_navigation/how-to/img/network-waterfall.png'
	},
	{
		source: '/code_intelligence/how-to/img/popover.png',
		destination: '/code_navigation/how-to/img/popover.png'
	},
	{
		source: '/code_intelligence/how-to/img/Symbols.png',
		destination: '/code_navigation/how-to/img/Symbols.png'
	},
	{
		source: '/code_intelligence/how-to/img/SymbolSidebar.png',
		destination: '/code_navigation/how-to/imgSymbolSidebar.png'
	},
	{
		source: '/code_intelligence/how-to/img/workflow.png',
		destination: '/code_navigation/how-to/img/workflow.png'
	},
	{
		source: '/code_intelligence/how-to/img',
		destination: '/code_navigation/how-to/img'
	},
	{
		source: '/code_intelligence/references/auto_indexing_configuration',
		destination: '/code_navigation/references/auto_indexing_configuration'
	},
	{
		source: '/code_intelligence/references/envvars',
		destination: '/code_navigation/references/envvars'
	},
	{
		source: '/code_intelligence/references/faq',
		destination: '/code_navigation/references/faq'
	},
	{
		source: '/code_intelligence/references/indexers',
		destination: '/code_navigation/references/indexers'
	},
	{
		source: '/code_intelligence/references/precise_examples',
		destination: '/code_navigation/references/precise_examples'
	},
	{
		source: '/code_intelligence/references/requirements',
		destination: '/code_navigation/references/requirements'
	},
	{
		source: '/code_intelligence/references/troubleshooting',
		destination: '/code_navigation/references/troubleshooting'
	},
	{
		source: '/code_intelligence/references',
		destination: '/code_navigation/references'
	},
	{
		source: '/code_intelligence',
		destination: '/code_navigation'
	},
	{
		source: '/cody/autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#what-is-cody-code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#enabling-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/autocomplete#configuring-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance'
	},
	{
		source: '/cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise',
		destination:
			'/cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance'
	},
	{
		source: '/cody/autocomplete#accessing-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs'
	},
	{
		source: '/cody/capabilities#access-autocomplete-logs',
		destination: '/cody/capabilities/autocomplete#access-autocomplete-logs'
	},
	{
		source: '/cody#get-cody',
		destination: '/cody'
	},
	{
		source: '/cody#getting-started',
		destination: '/cody'
	},
	{
		source: '/cody#features',
		destination: '/cody#main-features'
	},
	{
		source: '/cody#chatbot-that-knows-your-code',
		destination: '/cody'
	},
	{
		source: '/cody#fix-code-inline',
		destination: '/cody/capabilities'
	},
	{
		source: '/cody/capabilities#fix-code-inline',
		destination: '/cody/capabilities'
	},
	{
		source: '/cody#recipes',
		destination: '/cody/capabilities/commands'
	},
	{
		source: '/cody/capabilities#cody-recipes',
		destination: '/cody/capabilities/commands'
	},
	{
		source: '/cody#autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/capabilities#code-autocomplete',
		destination: '/cody/capabilities/autocomplete'
	},
	{
		source: '/cody/overview',
		destination: '/cody/'
	},
	{
		source: '/cody/explanations/installing_vs_code',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-neovim',
		destination: '/cody/clients/install-neovim'
	},
	{
		source: '/cody/explanations/installing_jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/app',
		destination: '/cody/clients/app'
	},
	{
		source: '/cody/overview/app',
		destination: '/cody/clients/app'
	},
	{
		source: '/cody/explanations/enabling_cody',
		destination: '/cody/clients/cody-with-sourcegraph'
	},
	{
		source: '/cody/overview/cody-with-sourcegraph',
		destination: '/cody/clients/cody-with-sourcegraph'
	},
	{
		source: '/cody/explanations/enabling_cody_enterprise',
		destination: '/cody/clients/enable-cody-enterprise'
	},
	{
		source: '/cody/overview/enable-cody-enterprise',
		destination: '/cody/clients/enable-cody-enterprise'
	},
	{
		source: '/cody/quickstart#quickstart-for-cody-in-vs-code',
		destination: '/cody/quickstart'
	},
	{
		source: '/cody/quickstart#introduction',
		destination: '/cody/quickstart#cody-quickstart'
	},
	{
		source: '/cody/quickstart#getting-started-with-the-cody-extension-and-recipes',
		destination:
			'/cody/quickstart#getting-started-with-cody-extension-and-commands'
	},
	{
		source: '/cody/quickstart#generate-a-unit-test',
		destination: '/cody/quickstart#1-generate-a-unit-test'
	},
	{
		source: '/cody/quickstart#ask-cody-to-pull-reference-documentation',
		destination:
			'/cody/quickstart#3-ask-cody-to-pull-reference-documentation'
	},
	{
		source: '/cody/quickstart#ask-cody-to-write-context-aware-code',
		destination: '/cody/quickstart#working-with-the-cody-extension'
	},
	{
		source: '/cody/overview/install-jetbrains#introduction',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains#requirements',
		destination: '/cody/clients/install-jetbrains#prerequisites'
	},
	{
		source: '/cody/overview/install-jetbrains#prerequisites',
		destination: '/cody/clients/install-jetbrains#prerequisites'
	},
	{
		source: '/cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers'
	},
	{
		source: '/cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional',
		destination:
			'/cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers'
	},
	{
		source: '/cody/overview/install-jetbrains#get-started-with-cody',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-jetbrains',
		destination: '/cody/clients/install-jetbrains'
	},
	{
		source: '/cody/overview/install-vscode#introduction',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode',
		destination: '/cody/clients/install-vscode'
	},
	{
		source: '/cody/overview/install-vscode#requirements',
		destination: '/cody/clients/install-vscode#prerequisites'
	},
	{
		source: '/cody/overview/install-vscode#prerequisites',
		destination: '/cody/clients/install-vscode#prerequisites'
	},
	{
		source: '/cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider',
		destination:
			'/cody/clients/enable-cody-enterprise#supported-models-and-model-providers'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users',
		destination:
			'/cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#turning-cody-off',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody'
	},
	{
		source: '/cody/overview/enable-cody-enterprise#disable-cody',
		destination: '/cody/clients/enable-cody-enterprise#disable-cody'
	},
	{
		source: '/cody/explanations',
		destination: '/cody/core-concepts'
	},
	{
		source: '/cody/explanations/code_graph_context#embeddings',
		destination: '/cody/embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#embeddings',
		destination: '/cody/embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-embeddings',
		destination: '/cody/embeddings/configure-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings',
		destination: '/cody/embeddings/configure-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#filtering-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings',
		destination:
			'/cody/embeddings/manage-embeddings#filter-files-from-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#storing-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes',
		destination:
			'/cody/embeddings/manage-embeddings#store-embedding-indexes'
	},
	{
		source: '/cody/explanations/code_graph_context#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-s3',
		destination: '/cody/embeddings/manage-embeddings#using-s3'
	},
	{
		source: '/cody/explanations/code_graph_context#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#using-gcs',
		destination: '/cody/embeddings/manage-embeddings#using-gcs'
	},
	{
		source: '/cody/explanations/code_graph_context#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets',
		destination: '/cody/embeddings/manage-embeddings#provisioning-buckets'
	},
	{
		source: '/cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service'
	},
	{
		source: '/cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service',
		destination:
			'/cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service'
	},
	{
		source: '/cody/explanations/code_graph_context#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#incremental-embeddings',
		destination: '/cody/embeddings#incremental-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings',
		destination:
			'/cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly',
		destination: '/cody/embeddings#third-party-embeddings-provider'
	},
	{
		source: '/cody/core-concepts/embeddings#third-party-embeddings-provider',
		destination: '/cody/embeddings#third-party-embeddings-provider'
	},
	{
		source: '/cody/explanations/code_graph_context#openai',
		destination: '/cody/embeddings#openai'
	},
	{
		source: '/cody/core-concepts/embeddings#openai',
		destination: '/cody/embeddings#openai'
	},
	{
		source: '/cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span',
		destination: '/cody/embeddings#azure-openai'
	},
	{
		source: '/cody/core-concepts/embeddings#azure-openai',
		destination: '/cody/embeddings#azure-openai'
	},
	{
		source: '/cody/explanations/code_graph_context#disabling-embeddings',
		destination: '/cody/embeddings#disable-embeddings'
	},
	{
		source: '/cody/core-concepts/embeddings#disable-embeddings',
		destination: '/cody/embeddings#disable-embeddings'
	},
	{
		source: '/cody/explanations/code_graph_context#configuring-the-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit'
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit',
		destination:
			'/cody/embeddings/usage-and-limits#configure-global-policy-match-limit'
	},
	{
		source: '/cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated'
	},
	{
		source: '/cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated',
		destination:
			'/cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated'
	},
	{
		source: '/cody/explanations/indexing',
		destination: '/cody/embeddings/embedding-index'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index',
		destination: '/cody/embeddings/embedding-index'
	},
	{
		source: '/cody/explanations/indexing#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#generate-embeddings-index',
		destination:
			'/cody/embeddings/embedding-index#generate-embeddings-index'
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise',
		destination: '/cody/embeddings/embedding-index#sourcegraph-enterprise'
	},
	{
		source: '/cody/explanations/indexing#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#sourcegraph-com',
		destination: '/cody/embeddings/embedding-index#sourcegraphcom'
	},
	{
		source: '/cody/explanations/indexing#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers',
		destination:
			'/cody/embeddings/embedding-index#enable-codebase-aware-answers'
	},
	{
		source: '/cody/explanations/indexing#extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings',
		destination:
			'/cody/embeddings/embedding-index#cody-vs-code-extension-settings'
	},
	{
		source: '/cody/explanations/indexing#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#manual-configuration',
		destination: '/cody/embeddings/embedding-index#manual-configuration'
	},
	{
		source: '/cody/explanations/indexing#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson'
	},
	{
		source: '/cody/core-concepts/embeddings/embedding-index#settings-json',
		destination: '/cody/embeddings/embedding-index#settingsjson'
	},
	{
		source: '/cody/explanations/policies',
		destination: '/cody/embeddings/configure-embeddings#policies'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#policies',
		destination: '/cody/embeddings/configure-embeddings#policies'
	},
	{
		source: '/cody/explanations/policies#how-to-create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#create-an-embeddings-policy'
	},
	{
		source: '/cody/explanations/policies#example-1',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#example-2',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#example-3',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works',
		destination:
			'/cody/embeddings/configure-embeddings#how-pattern-matching-works'
	},
	{
		source: '/cody/explanations/policies#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy',
		destination:
			'/cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy'
	},
	{
		source: '/cody/explanations/schedule_one_off_embeddings_jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs'
	},
	{
		source: '/cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs',
		destination:
			'/cody/embeddings/configure-embeddings#schedule-embeddings-jobs'
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph'
	},
	{
		source: '/cody/explanations/cody_gateway',
		destination: '/cody/core-concepts/cody_gateway'
	},
	{
		source: '/cody/explanations/code_graph_context',
		destination: '/cody/core-concepts/code-graph'
	},
	{
		source: '/cody/core-concepts/cody_clients',
		destination: '/cody/clients'
	},
	{
		source: '/cody/overview#getting-started',
		destination: '/cody/clients'
	},
	{
		source: '/cody/core-concepts/cody_gateway',
		destination: '/cody/core-concepts/cody-gateway'
	},
	{
		source: '/cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise',
		destination:
			'/cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise'
	},
	{
		source: '/cody/core-concepts/cody_gateway#configuring-custom-models',
		destination:
			'/cody/core-concepts/cody-gateway#configuring-custom-models'
	},
	{
		source: '/cody/core-concepts/cody_gateway#rate-limits-and-quotas',
		destination: '/cody/core-concepts/cody-gateway#rate-limits-and-quotas'
	},
	{
		source: '/cody/core-concepts/cody_gateway#privacy-and-security',
		destination: '/cody/core-concepts/cody-gateway#privacy-and-security'
	},
	{
		source: '/cody/custom-commands',
		destination: '/cody/capabilities/commands#custom-commands'
	},

	// Code Search revamp redirects

	{
		source: '/code_search',
		destination: '/code-search'
	},
	{
		source: '/code_search/tutorials',
		destination: '/code-search/working/saved_searches'
	},
	{
		source: '/code_search/tutorials/examples',
		destination: '/code-search/queries/examples'
	},

	{
		source: '/code_search/tutorials/search_subexpressions',
		destination: '/code-search/working/search_subexpressions'
	},

	{
		source: '/code_search/how-to',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/how-to/saved_searches',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/how-to/snippets',
		destination: '/code-search/working/snippets'
	},

	{
		source: '/code_search/how-to/search_contexts',
		destination: '/code-search/working/search_contexts'
	},

	{
		source: '/code_search/how-to/exhaustive',
		destination: '/code-search/types/exhaustive'
	},

	{
		source: '/code_search/how-to/search-jobs',
		destination: '/code-search/types/search-jobs'
	},

	{
		source: '/code_search/explanations',
		destination: '/code-search/working/saved_searches'
	},

	{
		source: '/code_search/explanations/features',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/explanations/search_details',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/explanations/tips',
		destination: '/code-search/features'
	},

	{
		source: '/code_search/reference/queries',
		destination: '/code-search/queries'
	},

	{
		source: '/code_search/reference/queries#search-pattern-syntax',
		destination: '/code-search/queries#search-pattern-syntax'
	},

	{
		source: '/code_search/reference/language',
		destination: '/code-search/queries/language'
	},

	// Code Navigation redirects
	{
		source: '/code_navigation',
		destination: '/code-search/code-navigation'
	},

	{
		source: '/code_navigation/how-to/configure_data_retention',
		destination:
			'/code-search/code-navigation/auto_indexing#configure-auto-indexing-policies'
	},

	{
		source: '/code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally',
		destination:
			'/code-search/code-navigation/auto_indexing#applying-indexing-policies-globally'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#automated-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#automated-indexing'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#github-actions',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#github-actions'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#circleci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#circleci'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#travis-ci',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#travis-ci'
	},

	{
		source: '/code_navigation/how-to/index_a_go_repository#manual-indexing',
		destination:
			'/code-search/code-navigation/how-to/index_a_go_repository#manual-indexing'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly'
	},

	{
		source: '/code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags',
		destination:
			'/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_many_repos',
		destination: '/code-search/code-navigation/precise_code_navigation'
	},

	{
		source: '/code_navigation/how-to/adding_lsif_to_workflows',
		destination:
			'/code-search/code-navigation/how-to/adding_lsif_to_workflows'
	},

	{
		source: '/code_navigation/how-to/enable_auto_indexing#deploy-executors',
		destination:
			'/code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors'
	},

	{
		source: '/code_navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-search/code-navigation/how-to/policies_resource_usage_best_practices'
	},

	{
		source: '/code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing'
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation',
		destination: '/code-search/code-navigation'
	},

	{
		source: '/code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise',
		destination: '/code-search/code-navigation#code-navigation-types'
	},

	{
		source: '/code_navigation/explanations/precise_code_navigation',
		destination: '/code-search/code-navigation/precise_code_navigation'
	},

	// {
	//   source: "/code_navigation/explanations/precise_code_navigation#why-are-my-results-sometimes-incorrect",
	//   destination: "/code-search/code-navigation/troubleshooting#why-are-my-results-sometimes-incorrect"
	// },

	{
		source: '/code_navigation/explanations/uploads',
		destination: '/code-search/code-navigation/explanations/uploads'
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload'
	},

	{
		source: '/code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui',
		destination:
			'/code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui'
	},

	{
		source: '/code_navigation/explanations/uploads#repository-commit-graph',
		destination:
			'/code-search/code-navigation/explanations/uploads#repository-commit-graph'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation',
		destination:
			'/code-search/code-navigation/search_based_code_navigation'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#how-does-it-work',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#how-does-it-work'
	},

	{
		source: '/code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply',
		destination:
			'/code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply'
	},

	{
		source: '/code_navigation/explanations/features',
		destination: '/code-search/code-navigation/features'
	},

	{
		source: '/code_navigation/explanations/features#popover',
		destination: '/code-search/code-navigation/features#popover'
	},
	{
		source: '/code_navigation/explanations/features#go-to-definition',
		destination: '/code-search/code-navigation/features#go-to-definition'
	},
	{
		source: '/code_navigation/explanations/features#find-references',
		destination: '/code-search/code-navigation/features#find-references'
	},
	{
		source: '/code_navigation/explanations/features#dependency-navigation',
		destination:
			'/code-search/code-navigation/features#dependency-navigation'
	},
	{
		source: '/code_navigation/explanations/features#find-implementations',
		destination:
			'/code-search/code-navigation/features#find-implementations'
	},

	{
		source: '/code_navigation/explanations/features#perform-an-action',
		destination: '/code-search/code-navigation/features#perform-an-action'
	},

	{
		source: '/code_navigation/explanations/features#symbol-search',
		destination: '/code-search/types/symbol'
	},

	{
		source: '/code_navigation/explanations/rockskip',
		destination: '/code-search/code-navigation/rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#when-should-i-use-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#when-should-i-use-rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-enable-rockskip',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-enable-rockskip'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-long-does-indexing-take',
		destination:
			'/code-search/code-navigation/rockskip#how-long-does-indexing-take'
	},

	{
		source: '/code_navigation/explanations/rockskip#what-resources-does-rockskip-use',
		destination:
			'/code-search/code-navigation/rockskip#what-resources-does-rockskip-use'
	},

	{
		source: '/code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status',
		destination:
			'/code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status'
	},

	{
		source: '/code_navigation/explanations/rockskip#when-is-indexing-triggered',
		destination:
			'/code-search/code-navigation/rockskip#when-is-indexing-triggered'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer',
		destination:
			'/code-search/code-navigation/writing_an_indexer#writing-an-indexer'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema',
		destination:
			'/code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings',
		destination:
			'/code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information',
		destination:
			'/code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli',
		destination:
			'/code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli'
	},

	{
		source: '/code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features',
		destination:
			'/code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features'
	},

	{
		source: '/code_navigation/explanations/auto_indexing',
		destination: '/code-search/code-navigation/auto_indexing'
	},

	{
		source: '/code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job'
	},

	{
		source: '/code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui',
		destination:
			'/code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#go',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#go'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#typescript',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#typescript'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#java',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#java'
	},

	{
		source: '/code_navigation/explanations/auto_indexing_inference#rust',
		destination:
			'/code-search/code-navigation/explanations/auto_indexing_inference#rust'
	},

	{
		source: '/code_navigation/references/troubleshooting',
		destination: '/code-search/code-navigation/troubleshooting'
	},

	{
		source: '/code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence',
		destination:
			'/code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence'
	},

	{
		source: '/code_navigation/references/troubleshooting#gathering-evidence',
		destination:
			'/code-search/code-navigation/troubleshooting#gathering-evidence'
	},

	{
		source: '/code_navigation/references/indexers',
		destination:
			'/code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers'
	},

	{
		source: '/code_navigation/references/indexers#quick-reference',
		destination:
			'/code-search/code-navigation/writing_an_indexer#quick-reference'
	},

	{
		source: '/code_navigation/references/precise_examples',
		destination:
			'/code-search/code-navigation/precise_code_navigation#precise-navigation-examples'
	},

	{
		source: '/code_navigation/references/envvars',
		destination: '/code-search/code-navigation/envvars'
	},

	{
		source: '/code_navigation/references/envvars#frontend',
		destination: '/code-search/code-navigation/envvars#frontend'
	},

	{
		source: '/code_navigation/references/envvars#worker',
		destination: '/code-search/code-navigation/envvars#worker'
	},

	{
		source: '/code_navigation/references/envvars#precise-code-intel-worker',
		destination:
			'/code-search/code-navigation/envvars#precise-code-intel-worker'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration',
		destination: '/code-search/code-navigation/auto_indexing_configuration'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#keys',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#keys'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#index-job-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#index-job-object'
	},

	{
		source: '/code_navigation/references/auto_indexing_configuration#docker-step-object',
		destination:
			'/code-search/code-navigation/auto_indexing_configuration#docker-step-object'
	},

	{
		source: '/code_navigation/references/inference_configuration',
		destination: '/code-search/code-navigation/inference_configuration'
	},
	// Model Config docs
	{
		source: '/cody/clients/model-configuration',
		destination: '/cody/enterprise/model-configuration'
	},

	//Commands redirects
	{
		source: '/cody/capabilities/commands',
		destination: '/cody/capabilities/prompts'
	},

	//Eclipse redirects
	{
		source: '/cody/clients/install-eclipse',
		destination: '/cody/clients'
	},

	//Pricing redirects
	{
		source: '/pricing',
		destination: 'https://sourcegraph.com/pricing'
	},
	{
		source: '/pricing/free',
		destination: 'https://sourcegraph.com/pricing'
	},
	{
		source: '/pricing/plans/free',
		destination: 'https://sourcegraph.com/pricing'
	},
	{
		source: '/pricing/enterprise-starter',
		destination: '/pricing/plans/enterprise-starter'
	},
	{
		source: '/pricing/enterprise',
		destination: '/pricing/plans/enterprise'
	},
	{
		source: '/pricing/plan-comparison',
		destination: 'https://sourcegraph.com/pricing'
	},
	{
		source: '/pricing/billing-faqs',
		destination: '/pricing/faqs'
	},

	// Admin pricing docs redirects
	{
		source: '/admin/pricing',
		destination: 'https://sourcegraph.com/pricing'
	},
	{
		source: '/pricing/plans',
		destination: 'https://sourcegraph.com/pricing'
	},

	{
		source: '/admin/pricing#how-are-active-users-calculated-for-sourcegraph-cody',
		destination: '/cody/usage-and-pricing#billing-faqs-for-cody-enterprise'
	},

	{
		source: '/admin/pricing#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform',
		destination:
			'/pricing/faqs#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform'
	},

	{
		source: '/cody/embedded-repos',
		destination: '/cody'
	},

	// Redirect for self-hosted analytics

	{
		source: '/analytics/self-hosted',
		destination: '/analytics'
	},
	{
		source: '/analytics/air-gapped',
		destination: '/analytics'
	},

	//Agentic chat redirect
	{
		source: '/cody/capabilities/agentic-chat',
		destination: '/cody/capabilities/agentic-context-fetching'
	},

	//Rmv embeddings permanently:https://sourcegraph.com/docs/cody/core-concepts/embeddings
	{
		source: '/cody/core-concepts/embeddings',
		destination: '/cody/'
	},

	//Rmv Query types permanently:https://sourcegraph.com/docs/cody/capabilities/query-types
	{
		source: '/cody/capabilities/query-types',
		destination: '/cody/capabilities/chat'
	},

	{
		source: '/analytics/cloud#access-tokens',
		destination: '/analytics/api#access-tokens'
	},
	{
		source: '/analytics/cloud#token-management-apis',
		destination: '/analytics/api#token-management-apis'
	},
	{
		source: '/analytics/cloud#enablement-instructions',
		destination: '/analytics#enablement-instructions'
	},
	{
		source: '/analytics/cloud#data-export',
		destination: '/analytics#data-export-and-api'
	},
	{
		source: '/analytics/cloud#token-creation',
		destination: '/analytics/api#token-creation'
	},
	{
		source: '/analytics/cloud#token-listing',
		destination: '/analytics/api#token-listing'
	},
	{
		source: '/analytics/cloud#token-revocation',
		destination: '/analytics/api#token-revocation'
	},
	{
		source: '/analytics/cloud#api-reference',
		destination: '/analytics/api#api-reference'
	},
	{
		source: '/analytics/cloud#csv-export',
		destination: '/analytics/api#csv-export'
	},
	{
		source: '/analytics/cloud',
		destination: '/analytics'
	},
	{
		source: '/code-search/types/deep-search',
		destination: '/deep-search'
	},

	// Cody Pricing docs redirect

	{
		source: '/cody/usage-and-pricing',
		destination: 'https://sourcegraph.com/pricing'
	},

	// Code monitoring redirects - merged pages into consolidated index
	{
		source: '/code_monitoring/explanations/best_practices',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/explanations/core_concepts',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/explanations',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/how-tos',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/how-tos/slack',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/how-tos/starting_points',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/how-tos/webhook',
		destination: '/code_monitoring'
	},
	{
		source: '/code_monitoring/quickstart',
		destination: '/code_monitoring'
	},
	{
		source: '/admin/nginx',
		destination: '/admin/http_https_configuration'
	},
	{
		source: '/admin/access_control/service_accounts',
		destination: '/admin/service_accounts'
	},
	{
		source: '/cody/core-concepts/cody-gateway',
		destination: '/model-provider'
	},
	{
		source: '/cody/core-concepts/enterprise-architecture',
		destination: '/admin/architecture#cody'
	},
	{
		source: '/how-to-videos',
		destination: '/tutorials'
	},
	{
		source: '/how-to-videos/code-search',
		destination: '/tutorials#code-search-how-to-videos'
	},
	{
		source: '/how-to-videos/cody',
		destination: '/tutorials#cody'
	},
	{
		source: '/code-search/code-navigation/auto_indexing',
		destination: '/code-navigation/auto_indexing'
	},
	{
		source: '/code-search/code-navigation/auto_indexing_configuration',
		destination: '/code-navigation/auto_indexing_configuration'
	},
	{
		source: '/code-search/code-navigation/envvars',
		destination: '/code-navigation/envvars'
	},
	{
		source: '/code-search/code-navigation/explanations/auto_indexing_inference',
		destination: '/code-navigation/explanations/auto_indexing_inference'
	},
	{
		source: '/code-search/code-navigation/explanations/uploads',
		destination: '/code-navigation/explanations/uploads'
	},
	{
		source: '/code-search/code-navigation/features',
		destination: '/code-navigation/features'
	},
	{
		source: '/code-search/code-navigation/how-to/adding_scip_to_workflows',
		destination: '/code-navigation/how-to/adding_scip_to_workflows'
	},
	{
		source: '/code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing'
	},
	{
		source: '/code-search/code-navigation/how-to',
		destination: '/code-navigation/how-to'
	},
	{
		source: '/code-search/code-navigation/how-to/index_a_go_repository',
		destination: '/code-navigation/how-to/index_a_go_repository'
	},
	{
		source: '/code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-navigation/how-to/index_a_typescript_and_javascript_repository'
	},
	{
		source: '/code-search/code-navigation/how-to/index_other_languages',
		destination: '/code-navigation/how-to/index_other_languages'
	},
	{
		source: '/code-search/code-navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-navigation/how-to/policies_resource_usage_best_practices'
	},
	{
		source: '/code-search/code-navigation',
		destination: '/code-navigation'
	},
	{
		source: '/code-search/code-navigation/inference_configuration',
		destination: '/code-navigation/inference_configuration'
	},
	{
		source: '/code-search/code-navigation/precise_code_navigation',
		destination: '/code-navigation/precise_code_navigation'
	},
	{
		source: '/code-search/code-navigation/private-maven-repository-configuration',
		destination: '/code-navigation/private-maven-repository-configuration'
	},
	{
		source: '/code-search/code-navigation/rockskip',
		destination: '/code-navigation/rockskip'
	},
	{
		source: '/code-search/code-navigation/search_based_code_navigation',
		destination: '/code-navigation/search_based_code_navigation'
	},
	{
		source: '/code-search/code-navigation/syntactic_code_navigation',
		destination: '/code-navigation/syntactic_code_navigation'
	},
	{
		source: '/code-search/code-navigation/troubleshooting',
		destination: '/code-navigation/troubleshooting'
	},
	{
		source: '/code-search/code-navigation/writing_an_indexer',
		destination: '/code-navigation/writing_an_indexer'
	},
	{
		source: '/admin/self-hosted',
		destination: '/self-hosted'
	},
	{
		source: '/enterprise-portal',
		destination: '/admin/enterprise-portal'
	},
	{
		source: '/admin/observability/outbound-request-log',
		destination: '/admin/outbound-request-log'
	},
	{
		source: '/admin/config/webhooks/incoming',
		destination: '/admin/webhooks/incoming'
	},
	{
		source: '/admin/config/webhooks',
		destination: '/admin/webhooks'
	},
	{
		source: '/admin/config/webhooks/outgoing',
		destination: '/admin/webhooks/outgoing'
	},
	{
		source: '/admin/config/advanced_config_file',
		destination: '/self-hosted/advanced_config_file'
	},
	{
		source: '/admin/deploy/docker-compose/aws',
		destination: '/self-hosted/deploy/docker-compose/aws'
	},
	{
		source: '/admin/deploy/docker-compose/azure',
		destination: '/self-hosted/deploy/docker-compose/azure'
	},
	{
		source: '/admin/deploy/docker-compose/configuration',
		destination: '/self-hosted/deploy/docker-compose/configuration'
	},
	{
		source: '/admin/deploy/docker-compose/digitalocean',
		destination: '/self-hosted/deploy/docker-compose/digitalocean'
	},
	{
		source: '/admin/deploy/docker-compose/google_cloud',
		destination: '/self-hosted/deploy/docker-compose/google_cloud'
	},
	{
		source: '/admin/deploy/docker-compose',
		destination: '/self-hosted/deploy/docker-compose'
	},
	{
		source: '/admin/deploy/docker-compose/migrate',
		destination: '/self-hosted/deploy/docker-compose/migrate'
	},
	{
		source: '/admin/deploy/docker-compose/operations',
		destination: '/self-hosted/deploy/docker-compose/operations'
	},
	{
		source: '/admin/deploy/docker-compose/upgrade',
		destination: '/self-hosted/deploy/docker-compose/upgrade'
	},
	{
		source: '/admin/deploy/docker-single-container/aws',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/deploy/docker-single-container/digitalocean',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/deploy/docker-single-container/google_cloud',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/deploy/docker-single-container',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/deploy',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/deploy/instance-size',
		destination: '/self-hosted/deploy/instance-size'
	},
	{
		source: '/admin/deploy/kubernetes/azure',
		destination: '/self-hosted/deploy/kubernetes/azure'
	},
	{
		source: '/admin/deploy/kubernetes/configure',
		destination: '/self-hosted/deploy/kubernetes/configure'
	},
	{
		source: '/admin/deploy/kubernetes/eks',
		destination: '/self-hosted/deploy/kubernetes/eks'
	},
	{
		source: '/admin/deploy/kubernetes',
		destination: '/self-hosted/deploy/kubernetes'
	},
	{
		source: '/admin/deploy/kubernetes/kustomize',
		destination: '/self-hosted/deploy/kubernetes/kustomize'
	},
	{
		source: '/admin/deploy/kubernetes/kustomize/eks',
		destination: '/self-hosted/deploy/kubernetes/kustomize/eks'
	},
	{
		source: '/admin/deploy/kubernetes/kustomize/gke',
		destination: '/self-hosted/deploy/kubernetes/kustomize/gke'
	},
	{
		source: '/admin/deploy/kubernetes/kustomize',
		destination: '/self-hosted/deploy/kubernetes/kustomize'
	},
	{
		source: '/admin/deploy/kubernetes/kustomize/migrate',
		destination: '/self-hosted/deploy/kubernetes/kustomize/migrate'
	},
	{
		source: '/admin/deploy/kubernetes/operations',
		destination: '/self-hosted/deploy/kubernetes/operations'
	},
	{
		source: '/admin/deploy/kubernetes/scale',
		destination: '/self-hosted/deploy/kubernetes/scale'
	},
	{
		source: '/admin/deploy/kubernetes/troubleshoot',
		destination: '/self-hosted/deploy/kubernetes/troubleshoot'
	},
	{
		source: '/admin/deploy/kubernetes/upgrade',
		destination: '/self-hosted/deploy/kubernetes/upgrade'
	},
	{
		source: '/admin/deploy/machine-images/aws-ami',
		destination: '/self-hosted/deploy/machine-images/aws-ami'
	},
	{
		source: '/admin/deploy/machine-images/aws-oneclick',
		destination: '/self-hosted/deploy/machine-images/aws-oneclick'
	},
	{
		source: '/admin/deploy/machine-images/gce',
		destination: '/self-hosted/deploy/machine-images/gce'
	},
	{
		source: '/admin/deploy/machine-images',
		destination: '/self-hosted/deploy/machine-images'
	},
	{
		source: '/admin/deploy/migrate-backup',
		destination: '/self-hosted/deploy/migrate-backup'
	},
	{
		source: '/admin/deploy/repositories',
		destination: '/self-hosted/deploy/repositories'
	},
	{
		source: '/admin/deploy/resource_estimator',
		destination: '/self-hosted/deploy/resource_estimator'
	},
	{
		source: '/admin/deploy/scale',
		destination: '/self-hosted/deploy/scale'
	},
	{
		source: '/admin/deploy/single-node',
		destination: '/self-hosted/deploy/single-node'
	},
	{
		source: '/admin/deploy/single-node/script',
		destination: '/self-hosted/deploy/single-node/script'
	},
	{
		source: '/admin/deploy/without_service_discovery',
		destination: '/self-hosted/deploy/without_service_discovery'
	},
	{
		source: '/admin/deployment_best_practices',
		destination: '/self-hosted/deployment_best_practices'
	},
	{
		source: '/admin/config/email',
		destination: '/self-hosted/email'
	},
	{
		source: '/admin/config/encryption',
		destination: '/self-hosted/encryption'
	},
	{
		source: '/admin/executors/deploy_executors',
		destination: '/self-hosted/executors'
	},
	{
		source: '/admin/executors/deploy_executors_binary',
		destination: '/self-hosted/executors/deploy_executors_binary'
	},
	{
		source: '/admin/executors/deploy_executors_binary_offline',
		destination: '/self-hosted/executors/deploy_executors_binary_offline'
	},
	{
		source: '/admin/executors/deploy_executors_dind',
		destination: '/self-hosted/executors/deploy_executors_dind'
	},
	{
		source: '/admin/executors/deploy_executors_docker',
		destination: '/self-hosted/executors/deploy_executors_docker'
	},
	{
		source: '/admin/executors/deploy_executors_kubernetes',
		destination: '/self-hosted/executors/deploy_executors_kubernetes'
	},
	{
		source: '/admin/executors/deploy_executors_terraform',
		destination: '/self-hosted/executors/deploy_executors_terraform'
	},
	{
		source: '/admin/executors/executors_config',
		destination: '/self-hosted/executors/executors_config'
	},
	{
		source: '/admin/executors/executors_troubleshooting',
		destination: '/self-hosted/executors/executors_troubleshooting'
	},
	{
		source: '/admin/executors/firecracker',
		destination: '/self-hosted/executors/firecracker'
	},
	{
		source: '/admin/external_services',
		destination: '/self-hosted/external_services'
	},
	{
		source: '/admin/external_services/object_storage',
		destination: '/self-hosted/external_services/object_storage'
	},
	{
		source: '/admin/external_services/postgres',
		destination: '/self-hosted/external_services/postgres'
	},
	{
		source: '/admin/external_services/redis',
		destination: '/self-hosted/external_services/redis'
	},
	{
		source: '/admin/how-to/blobstore_debugging',
		destination: '/self-hosted/how-to/blobstore_debugging'
	},
	{
		source: '/admin/how-to/blobstore_update_notes',
		destination: '/self-hosted/how-to/blobstore_update_notes'
	},
	{
		source: '/admin/how-to/clear_codeintel_data',
		destination: '/self-hosted/how-to/clear_codeintel_data'
	},
	{
		source: '/admin/how-to/dirty_database',
		destination: '/self-hosted/how-to/dirty_database'
	},
	{
		source: '/admin/how-to/dirty_database_pre_3_37',
		destination: '/self-hosted/how-to/dirty_database_pre_3_37'
	},
	{
		source: '/admin/how-to/monitoring-guide',
		destination: '/self-hosted/how-to/monitoring-guide'
	},
	{
		source: '/admin/how-to/postgres14-index-corruption',
		destination: '/self-hosted/how-to/postgres14-index-corruption'
	},
	{
		source: '/admin/how-to/postgres_12_to_16_drift',
		destination: '/self-hosted/how-to/postgres_12_to_16_drift'
	},
	{
		source: '/admin/how-to/precise-code-intel-worker-crashloopbackoff',
		destination:
			'/self-hosted/how-to/precise-code-intel-worker-crashloopbackoff'
	},
	{
		source: '/admin/how-to/privileged_migrations',
		destination: '/self-hosted/how-to/privileged_migrations'
	},
	{
		source: '/admin/how-to/rebuild-corrupt-postgres-indexes',
		destination: '/self-hosted/how-to/rebuild-corrupt-postgres-indexes'
	},
	{
		source: '/admin/how-to/redis_configmap',
		destination: '/self-hosted/how-to/redis_configmap'
	},
	{
		source: '/admin/how-to/rollback_database',
		destination: '/self-hosted/how-to/rollback_database'
	},
	{
		source: '/admin/how-to/run-psql',
		destination: '/self-hosted/how-to/run-psql'
	},
	{
		source: '/admin/how-to/setup-https',
		destination: '/self-hosted/how-to/setup-https'
	},
	{
		source: '/admin/how-to/troubleshoot-pod-eviction',
		destination: '/self-hosted/how-to/troubleshoot-pod-eviction'
	},
	{
		source: '/admin/how-to/unfinished_migration',
		destination: '/self-hosted/how-to/unfinished_migration'
	},
	{
		source: '/admin/how-to/upgrade-postgres-12-16-builtin-dbs',
		destination: '/self-hosted/how-to/upgrade-postgres-12-16-builtin-dbs'
	},
	{
		source: '/admin/http_https_configuration',
		destination: '/self-hosted/http_https_configuration'
	},
	{
		source: '/admin/config/network-filtering',
		destination: '/self-hosted/network-filtering'
	},
	{
		source: '/admin/observability/.gitattributes',
		destination: '/self-hosted/observability/.gitattributes'
	},
	{
		source: '/admin/observability/alerting',
		destination: '/self-hosted/observability/alerting'
	},
	{
		source: '/admin/observability/alerting_custom_consumption',
		destination: '/self-hosted/observability/alerting_custom_consumption'
	},
	{
		source: '/admin/observability/alerts',
		destination: '/self-hosted/observability/alerts'
	},
	{
		source: '/admin/observability/dashboards',
		destination: '/self-hosted/observability/dashboards'
	},
	{
		source: '/admin/observability/health_checks',
		destination: '/self-hosted/observability/health_checks'
	},
	{
		source: '/admin/observability',
		destination: '/self-hosted/observability'
	},
	{
		source: '/admin/observability/logs',
		destination: '/self-hosted/observability/logs'
	},
	{
		source: '/admin/observability/metrics',
		destination: '/self-hosted/observability/metrics'
	},
	{
		source: '/admin/observability/opentelemetry',
		destination: '/self-hosted/observability/opentelemetry'
	},
	{
		source: '/admin/observability/tracing',
		destination: '/self-hosted/observability/tracing'
	},
	{
		source: '/admin/observability/troubleshooting',
		destination: '/self-hosted/observability/troubleshooting'
	},
	{
		source: '/admin/config/postgres-conf',
		destination: '/self-hosted/postgres-conf'
	},
	{
		source: '/admin/postgres',
		destination: '/self-hosted/postgres'
	},
	{
		source: '/admin/postgres12_end_of_life_notice',
		destination: '/self-hosted/postgres12_end_of_life_notice'
	},
	{
		source: '/admin/postgresql_collation_version_mismatch_resolution',
		destination:
			'/self-hosted/postgresql_collation_version_mismatch_resolution'
	},
	{
		source: '/admin/pprof',
		destination: '/self-hosted/pprof'
	},
	{
		source: '/admin/config/private-network',
		destination: '/self-hosted/private-network'
	},
	{
		source: '/admin/config/restore',
		destination: '/self-hosted/restore'
	},
	{
		source: '/admin/sourcegraph-nginx-mermaid',
		destination: '/self-hosted/sourcegraph-nginx-mermaid'
	},
	{
		source: '/admin/ssl_https_self_signed_cert_nginx',
		destination: '/self-hosted/ssl_https_self_signed_cert_nginx'
	},
	{
		source: '/admin/updates/automatic',
		destination: '/self-hosted/updates/automatic'
	},
	{
		source: '/admin/updates/docker_compose',
		destination:
			'https://sourcegraph.com/changelog/self-hosted/docker-compose'
	},
	{
		source: '/admin/updates',
		destination: '/self-hosted/updates'
	},
	{
		source: '/admin/updates/kubernetes',
		destination: 'https://sourcegraph.com/changelog/self-hosted/kubernetes'
	},
	{
		source: '/admin/updates/migrator/downgrading',
		destination: '/self-hosted/updates/migrator/downgrading'
	},
	{
		source: '/admin/updates/migrator',
		destination: '/self-hosted/updates/migrator'
	},
	{
		source: '/admin/updates/migrator/migrator-operations',
		destination: '/self-hosted/updates/migrator/migrator-operations'
	},
	{
		source: '/admin/updates/migrator/schema-drift',
		destination: '/self-hosted/updates/migrator/schema-drift'
	},
	{
		source: '/admin/updates/migrator/troubleshooting-upgrades',
		destination: '/self-hosted/updates/migrator/troubleshooting-upgrades'
	},
	{
		source: '/admin/updates/migrator/upgrading-early-versions',
		destination: '/self-hosted/updates/migrator/upgrading-early-versions'
	},
	{
		source: '/admin/updates/pure_docker',
		destination: '/self-hosted/deploy/docker-compose/upgrade'
	},
	{
		source: '/admin/updates/server',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/admin/url',
		destination: '/self-hosted/url'
	},
	{
		source: '/admin/validation',
		destination: '/self-hosted/validation'
	},
	{
		source: '/admin/workers',
		destination: '/self-hosted/workers'
	},
	// Underscore to hyphen redirects (added for URL consistency)
	{
		source: '/admin/access_control',
		destination: '/admin/access-control'
	},
	{
		source: '/admin/access_control/batch_changes',
		destination: '/admin/access-control/batch-changes'
	},
	{
		source: '/admin/audit_log',
		destination: '/admin/audit-log'
	},
	{
		source: '/admin/auth/login_form',
		destination: '/admin/auth/login-form'
	},
	{
		source: '/admin/auth/saml/azure_ad',
		destination: '/admin/auth/saml/azure-ad'
	},
	{
		source: '/admin/auth/saml/jump_cloud',
		destination: '/admin/auth/saml/jump-cloud'
	},
	{
		source: '/admin/auth/saml/microsoft_adfs',
		destination: '/admin/auth/saml/microsoft-adfs'
	},
	{
		source: '/admin/auth/saml/one_login',
		destination: '/admin/auth/saml/one-login'
	},
	{
		source: '/admin/beta_and_experimental_features',
		destination: '/beta-and-experimental'
	},
	{
		source: '/admin/code_hosts',
		destination: '/admin/code-hosts'
	},
	{
		source: '/admin/code_hosts/aws_codecommit',
		destination: '/admin/code-hosts/aws-codecommit'
	},
	{
		source: '/admin/code_hosts/azuredevops',
		destination: '/admin/code-hosts/azuredevops'
	},
	{
		source: '/admin/code_hosts/bitbucket_cloud',
		destination: '/admin/code-hosts/bitbucket-cloud'
	},
	{
		source: '/admin/code_hosts/bitbucket_server',
		destination: '/admin/code-hosts/bitbucket-server'
	},
	{
		source: '/admin/code_hosts/gerrit',
		destination: '/admin/code-hosts/gerrit'
	},
	{
		source: '/admin/code_hosts/github',
		destination: '/admin/code-hosts/github'
	},
	{
		source: '/admin/code_hosts/gitlab',
		destination: '/admin/code-hosts/gitlab'
	},
	{
		source: '/admin/code_hosts/gitolite',
		destination: '/admin/code-hosts/gitolite'
	},
	{
		source: '/admin/code_hosts/non-git',
		destination: '/admin/code-hosts/non-git'
	},
	{
		source: '/admin/code_hosts/other',
		destination: '/admin/code-hosts/other'
	},
	{
		source: '/admin/code_hosts/phabricator',
		destination: '/admin/code-hosts/phabricator'
	},
	{
		source: '/admin/code_hosts/rate_limits',
		destination: '/admin/code-hosts/rate-limits'
	},
	{
		source: '/admin/code_hosts/src_serve_git',
		destination: '/admin/code-hosts/src-serve-git'
	},
	{
		source: '/admin/config/authorization_and_authentication',
		destination: '/admin/config/authorization-and-authentication'
	},
	{
		source: '/admin/config/batch_changes',
		destination: '/admin/config/batch-changes'
	},
	{
		source: '/admin/config/site_config',
		destination: '/admin/config/site-config'
	},
	{
		source: '/admin/enterprise_getting_started_guide',
		destination: '/admin/enterprise-getting-started-guide'
	},
	{
		source: '/admin/executors/executor_secrets',
		destination: '/admin/executors/executor-secrets'
	},
	{
		source: '/admin/how-to/internal_github_repos',
		destination: '/admin/how-to/internal-github-repos'
	},
	{
		source: '/admin/how-to/lsif_scip_migration',
		destination: '/admin/how-to/lsif-scip-migration'
	},
	{
		source: '/admin/how-to/update_repo_failure',
		destination: '/admin/how-to/update-repo-failure'
	},
	{
		source: '/admin/oauth_apps',
		destination: '/admin/oauth-apps'
	},
	{
		source: '/admin/repo/git_config',
		destination: '/admin/repo/git-config'
	},
	{
		source: '/admin/repo/update_frequency',
		destination: '/admin/repo/update-frequency'
	},
	{
		source: '/admin/security_event_logs',
		destination: '/admin/security-event-logs'
	},
	{
		source: '/admin/service_accounts',
		destination: '/admin/service-accounts'
	},
	{
		source: '/admin/user_data_deletion',
		destination: '/admin/user-data-deletion'
	},
	{
		source: '/admin/user_surveys',
		destination: '/admin/user-surveys'
	},
	{
		source: '/api/stream_api',
		destination: '/api/stream-api'
	},
	{
		source: '/cli/how-tos/creating_an_access_token',
		destination: '/cli/how-tos/creating-an-access-token'
	},
	{
		source: '/cli/how-tos/fetch_sboms',
		destination: '/cli/how-tos/fetch-sboms'
	},
	{
		source: '/cli/how-tos/managing_access_tokens',
		destination: '/cli/how-tos/managing-access-tokens'
	},
	{
		source: '/cli/how-tos/revoking_an_access_token',
		destination: '/cli/how-tos/revoking-an-access-token'
	},
	{
		source: '/cli/how-tos/verify_container_signatures',
		destination: '/cli/how-tos/verify-container-signatures'
	},
	{
		source: '/cloud/logpush_gcs',
		destination: '/cloud/logpush-gcs'
	},
	{
		source: '/cloud/logpush_s3',
		destination: '/cloud/logpush-s3'
	},
	{
		source: '/cloud/private_connectivity_aws',
		destination: '/cloud/private-connectivity-aws'
	},
	{
		source: '/cloud/private_connectivity_gcp',
		destination: '/cloud/private-connectivity-gcp'
	},
	{
		source: '/cloud/private_connectivity_public_lb',
		destination: '/cloud/private-connectivity-public-lb'
	},
	{
		source: '/cloud/private_connectivity_sourcegraph_connect',
		destination: '/cloud/private-connectivity-sourcegraph-connect'
	},
	{
		source: '/code_insights',
		destination: '/code-insights'
	},
	{
		source: '/code_insights/quickstart',
		destination: '/code-insights/quickstart'
	},
	{
		source: '/code_insights/explanations',
		destination: '/code-insights/explanations'
	},
	{
		source: '/code_insights/explanations/administration_and_security_of_code_insights',
		destination:
			'/code-insights/explanations/administration-and-security-of-code-insights'
	},
	{
		source: '/code_insights/explanations/automatically_generated_data_series',
		destination:
			'/code-insights/explanations/automatically-generated-data-series'
	},
	{
		source: '/code_insights/explanations/code_insights_filters',
		destination: '/code-insights/explanations/code-insights-filters'
	},
	{
		source: '/code_insights/explanations/current_limitations_of_code_insights',
		destination:
			'/code-insights/explanations/current-limitations-of-code-insights'
	},
	{
		source: '/code_insights/explanations/data_retention',
		destination: '/code-insights/explanations/data-retention'
	},
	{
		source: '/code_insights/explanations/search_results_aggregations',
		destination: '/code-insights/explanations/search-results-aggregations'
	},
	{
		source: '/code_insights/explanations/viewing_code_insights',
		destination: '/code-insights/explanations/viewing-code-insights'
	},
	{
		source: '/code_insights/how-tos',
		destination: '/code-insights/how-tos'
	},
	{
		source: '/code_insights/how-tos/creating_a_custom_dashboard_of_code_insights',
		destination:
			'/code-insights/how-tos/creating-a-custom-dashboard-of-code-insights'
	},
	{
		source: '/code_insights/how-tos/filtering_an_insight',
		destination: '/code-insights/how-tos/filtering-an-insight'
	},
	{
		source: '/code_insights/language_insight_quickstart',
		destination: '/code-insights/language-insight-quickstart'
	},
	{
		source: '/code_insights/references',
		destination: '/code-insights/references'
	},
	{
		source: '/code_insights/references/common_reasons_code_insights_may_not_match_search_results',
		destination:
			'/code-insights/references/common-reasons-code-insights-may-not-match-search-results'
	},
	{
		source: '/code_insights/references/common_use_cases',
		destination: '/code-insights/references/common-use-cases'
	},
	{
		source: '/code_insights/references/incomplete_data_points',
		destination: '/code-insights/references/incomplete-data-points'
	},
	{
		source: '/code_insights/references/repository_scope',
		destination: '/code-insights/references/repository-scope'
	},
	{
		source: '/code_insights/references/search_aggregations_use_cases',
		destination: '/code-insights/references/search-aggregations-use-cases'
	},
	{
		source: '/code_monitoring',
		destination: '/code-monitoring'
	},
	{
		source: '/code-navigation/auto_indexing',
		destination: '/code-navigation/auto-indexing'
	},
	{
		source: '/code-navigation/auto_indexing_configuration',
		destination: '/code-navigation/auto-indexing-configuration'
	},
	{
		source: '/code-navigation/explanations/auto_indexing_inference',
		destination: '/code-navigation/explanations/auto-indexing-inference'
	},
	{
		source: '/code-navigation/how-to/adding_scip_to_workflows',
		destination: '/code-navigation/how-to/adding-scip-to-workflows'
	},
	{
		source: '/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing',
		destination:
			'/code-navigation/how-to/combining-scip-uploads-from-ci-cd-and-auto-indexing'
	},
	{
		source: '/code-navigation/how-to/index_a_go_repository',
		destination: '/code-navigation/how-to/index-a-go-repository'
	},
	{
		source: '/code-navigation/how-to/index_a_typescript_and_javascript_repository',
		destination:
			'/code-navigation/how-to/index-a-typescript-and-javascript-repository'
	},
	{
		source: '/code-navigation/how-to/index_other_languages',
		destination: '/code-navigation/how-to/index-other-languages'
	},
	{
		source: '/code-navigation/how-to/policies_resource_usage_best_practices',
		destination:
			'/code-navigation/how-to/policies-resource-usage-best-practices'
	},
	{
		source: '/code-navigation/inference_configuration',
		destination: '/code-navigation/inference-configuration'
	},
	{
		source: '/code-navigation/precise_code_navigation',
		destination: '/code-navigation/precise-code-navigation'
	},
	{
		source: '/code-navigation/search_based_code_navigation',
		destination: '/code-navigation/search-based-code-navigation'
	},
	{
		source: '/code-navigation/syntactic_code_navigation',
		destination: '/code-navigation/syntactic-code-navigation'
	},
	{
		source: '/code-navigation/writing_an_indexer',
		destination: '/code-navigation/writing-an-indexer'
	},
	{
		source: '/code-search/how-to/create_search_context_graphql',
		destination: '/code-search/how-to/create-search-context-graphql'
	},
	{
		source: '/code-search/working/saved_searches',
		destination: '/code-search/working/saved-searches'
	},
	{
		source: '/code-search/working/search_contexts',
		destination: '/code-search/working/search-contexts'
	},
	{
		source: '/code-search/working/search_filters',
		destination: '/code-search/working/search-filters'
	},
	{
		source: '/code-search/working/search_subexpressions',
		destination: '/code-search/working/search-subexpressions'
	},
	{
		source: '/dotcom/indexing_open_source_code',
		destination: '/dotcom/indexing-open-source-code'
	},
	{
		source: '/integration/aws_codecommit',
		destination: '/integration/aws-codecommit'
	},
	{
		source: '/integration/bitbucket_cloud',
		destination: '/integration/bitbucket-cloud'
	},
	{
		source: '/integration/bitbucket_server',
		destination: '/integration/bitbucket-server'
	},
	{
		source: '/integration/browser_extension',
		destination: '/integration/browser-extension'
	},
	{
		source: '/integration/browser_extension/how-tos/browser_search_engine',
		destination:
			'/integration/browser-extension/how-tos/browser-search-engine'
	},
	{
		source: '/integration/browser_extension/how-tos/google_workspace',
		destination: '/integration/browser-extension/how-tos/google-workspace'
	},
	{
		source: '/integration/migrating_firefox_extension',
		destination: '/integration/migrating-firefox-extension'
	},
	{
		source: '/integration/open_in_editor',
		destination: '/integration/open-in-editor'
	},
	{
		source: '/own/assigned_ownership',
		destination: '/own/assigned-ownership'
	},
	{
		source: '/own/codeowners_format',
		destination: '/own/codeowners-format'
	},
	{
		source: '/own/codeowners_ingestion',
		destination: '/own/codeowners-ingestion'
	},
	{
		source: '/own/configuration_reference',
		destination: '/own/configuration-reference'
	},
	{
		source: '/self-hosted/advanced_config_file',
		destination: '/self-hosted/advanced-config-file'
	},
	{
		source: '/self-hosted/deploy/docker-compose/google_cloud',
		destination: '/self-hosted/deploy/docker-compose/google-cloud'
	},
	{
		source: '/self-hosted/deploy/docker-single-container/google_cloud',
		destination: '/self-hosted/deploy'
	},
	{
		source: '/self-hosted/deploy/resource_estimator',
		destination: '/self-hosted/deploy/resource-estimator'
	},
	{
		source: '/self-hosted/deploy/without_service_discovery',
		destination: '/self-hosted/deploy/without-service-discovery'
	},
	{
		source: '/self-hosted/deployment_best_practices',
		destination: '/self-hosted/deployment-best-practices'
	},
	{
		source: '/self-hosted/executors/deploy_executors',
		destination: '/self-hosted/executors'
	},
	{
		source: '/self-hosted/executors/deploy-executors',
		destination: '/self-hosted/executors'
	},
	{
		source: '/self-hosted/executors/deploy_executors_binary',
		destination: '/self-hosted/executors/deploy-executors-binary'
	},
	{
		source: '/self-hosted/executors/deploy_executors_binary_offline',
		destination: '/self-hosted/executors/deploy-executors-binary-offline'
	},
	{
		source: '/self-hosted/executors/deploy_executors_dind',
		destination: '/self-hosted/executors/deploy-executors-dind'
	},
	{
		source: '/self-hosted/executors/deploy_executors_docker',
		destination: '/self-hosted/executors/deploy-executors-docker'
	},
	{
		source: '/self-hosted/executors/deploy_executors_kubernetes',
		destination: '/self-hosted/executors/deploy-executors-kubernetes'
	},
	{
		source: '/self-hosted/executors/deploy_executors_terraform',
		destination: '/self-hosted/executors/deploy-executors-terraform'
	},
	{
		source: '/self-hosted/executors/executors_config',
		destination: '/self-hosted/executors/executors-config'
	},
	{
		source: '/self-hosted/executors/executors_troubleshooting',
		destination: '/self-hosted/executors/executors-troubleshooting'
	},
	{
		source: '/self-hosted/external_services',
		destination: '/self-hosted/external-services'
	},
	{
		source: '/self-hosted/external_services/object_storage',
		destination: '/self-hosted/external-services/object-storage'
	},
	{
		source: '/self-hosted/how-to/blobstore_debugging',
		destination: '/self-hosted/how-to/blobstore-debugging'
	},
	{
		source: '/self-hosted/how-to/blobstore_update_notes',
		destination: '/self-hosted/how-to/blobstore-update-notes'
	},
	{
		source: '/self-hosted/how-to/clear_codeintel_data',
		destination: '/self-hosted/how-to/clear-codeintel-data'
	},
	{
		source: '/self-hosted/how-to/dirty_database',
		destination: '/self-hosted/how-to/dirty-database'
	},
	{
		source: '/self-hosted/how-to/dirty_database_pre_3_37',
		destination: '/self-hosted/how-to/dirty-database-pre-3-37'
	},
	{
		source: '/self-hosted/how-to/postgres_12_to_16_drift',
		destination: '/self-hosted/how-to/postgres-12-to-16-drift'
	},
	{
		source: '/self-hosted/how-to/privileged_migrations',
		destination: '/self-hosted/how-to/privileged-migrations'
	},
	{
		source: '/self-hosted/how-to/redis_configmap',
		destination: '/self-hosted/how-to/redis-configmap'
	},
	{
		source: '/self-hosted/how-to/rollback_database',
		destination: '/self-hosted/how-to/rollback-database'
	},
	{
		source: '/self-hosted/how-to/unfinished_migration',
		destination: '/self-hosted/how-to/unfinished-migration'
	},
	{
		source: '/self-hosted/http_https_configuration',
		destination: '/self-hosted/http-https-configuration'
	},
	{
		source: '/self-hosted/observability/alerting_custom_consumption',
		destination: '/self-hosted/observability/alerting-custom-consumption'
	},
	{
		source: '/self-hosted/observability/health_checks',
		destination: '/self-hosted/observability/health-checks'
	},
	{
		source: '/self-hosted/postgres12_end_of_life_notice',
		destination: '/self-hosted/postgres12-end-of-life-notice'
	},
	{
		source: '/self-hosted/postgresql_collation_version_mismatch_resolution',
		destination:
			'/self-hosted/postgresql-collation-version-mismatch-resolution'
	},
	{
		source: '/self-hosted/ssl_https_self_signed_cert_nginx',
		destination: '/self-hosted/ssl-https-self-signed-cert-nginx'
	},
	{
		source: '/self-hosted/updates/docker_compose',
		destination:
			'https://sourcegraph.com/changelog/self-hosted/docker-compose'
	},
	{
		source: '/self-hosted/updates/pure-docker',
		destination: '/self-hosted/deploy/docker-compose/upgrade'
	},
	{
		source: '/admin/enterprise-getting-started-guide',
		destination: '/admin'
	},
	{
		source: '/admin/config',
		destination: '/admin'
	},
	{
		source: '/admin/repo/permissions',
		destination: '/admin/permissions'
	},
	{
		source: '/admin/beta-and-experimental-features',
		destination: '/beta-and-experimental'
	},
	// RSS feed moved from /docs/technical-changelog.rss to /changelog/technical-changelog.rss
	// This redirect preserves existing RSS subscriptions
	{
		source: '/technical-changelog.rss',
		destination: TECHNICAL_CHANGELOG_RSS_URL
	},
	// Self-hosted update pages moved to /changelog/self-hosted/
	{
		source: '/self-hosted/updates/docker-compose',
		destination:
			'https://sourcegraph.com/changelog/self-hosted/docker-compose'
	},
	{
		source: '/self-hosted/updates/kubernetes',
		destination: 'https://sourcegraph.com/changelog/self-hosted/kubernetes'
	},
	{
		source: '/self-hosted/updates/server',
		destination: '/self-hosted/deploy'
	},
	// code ownership redirects
	{
		source: '/own',
		destination: '/code-ownership'
	},
	{
		source: '/own/assigned-ownership',
		destination: '/code-ownership'
	},
	{
		source: '/own/configuration-reference',
		destination: '/code-ownership'
	},
	{
		source: '/own/codeowners-ingestion',
		destination: '/code-ownership'
	},
	{
		source: '/own/codeowners-format',
		destination: '/code-ownership/codeowners-format'
	},
	{
		source: '/api/graphql/examples',
		destination: '/api/graphql'
	},
	{
		source: '/api/graphql/search',
		destination: '/api/stream-api'
	},
	{
		source: '/api/graphql/managing-code-insights-with-api',
		destination: '/api/graphql'
	},
	{
		source: '/api/graphql/managing-search-contexts-with-api',
		destination: '/api/graphql'
	},
	{
		source: '/code-search/how-to/create-search-context-graphql',
		destination: '/api'
	},
];

export const updatedRedirectsData = redirectsData.map(redirect => {
	return {
		source: String(redirect.source).replace(
			'http://localhost:3000/docs',
			''
		),
		destination: String(redirect.destination).replace(
			'http://localhost:3000/docs',
			''
		)
	};
});
