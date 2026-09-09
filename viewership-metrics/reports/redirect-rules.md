# Redirect rules by hits (last 90 days)

- Window: 2026-06-11T09:00:00.000Z to 2026-09-09T08:00:00.000Z (UTC)
- Host: sourcegraph.com; paths: /docs, /changelog, /blog
- Filters: Bot Management likely_human; excluding ASN Hetzner Online GmbH; excluding countries CN
- Rules: 1324 in src/data/redirects.ts; 962 live, 362 shadowed by an earlier rule with the same source (never match), 689 live with zero hits
- Hits: 35740 redirects matched a rule, of 41820 redirects on /docs paths (the rest are version and other redirects)
- Hits count 3xx responses on /docs<Source> with the same filters as the page views reports; adaptive-sampled estimates.
- Chains: 269 live rules redirect to another rule's source, so the browser follows more redirects (longest chain: 5 more). Chain shows the extra hops and where the user ends up.
- Sitemap: whether the rule's destination is in https://sourcegraph.com/sitemap.xml (blank when it leaves the site). 512 live rules point at an unlisted page, 12100 hits; unless Chain shows a further redirect, on /docs that is likely a soft 404.

| Line | Source | Destination | Hits | Chain | Sitemap |
| ---: | --- | --- | ---: | --- | --- |
| 4745 | /code-search/code-navigation/precise_code_navigation | /code-navigation/precise_code_navigation | 2060 | 1 more → /code-navigation/precise-code-navigation | no |
| 5585 | /code-navigation/precise_code_navigation | /code-navigation/precise-code-navigation | 1980 |  | yes |
| 2193 | /code_navigation/explanations/precise_code_navigation | /code-search/code-navigation/precise_code_navigation | 1470 | 2 more → /code-navigation/precise-code-navigation | no |
| 1952 | /code_search/reference/language | /code-search/queries/language | 1200 |  | yes |
| 1942 | /code_search/reference/queries | /code-search/queries | 1120 |  | yes |
| 4485 | /pricing | https://sourcegraph.com/pricing | 850 |  | yes |
| 4873 | /admin/deploy/kubernetes | /self-hosted/deploy/kubernetes | 710 |  | yes |
| 4769 | /code-search/code-navigation/writing_an_indexer | /code-navigation/writing_an_indexer | 630 | 1 more → /code-navigation/writing-an-indexer | no |
| 5597 | /code-navigation/writing_an_indexer | /code-navigation/writing-an-indexer | 620 |  | yes |
| 1290 | /code_intelligence | /code_navigation | 590 | 2 more → /code-navigation | no |
| 1958 | /code_navigation | /code-search/code-navigation | 590 | 1 more → /code-navigation | no |
| 4737 | /code-search/code-navigation | /code-navigation | 570 |  | yes |
| 4473 | /cody/capabilities/commands | /cody/capabilities/prompts | 500 |  | yes |
| 4519 | /pricing/plans | https://sourcegraph.com/pricing | 500 |  | yes |
| 4682 | /code-search/code-navigation/auto_indexing | /code-navigation/auto_indexing | 490 | 1 more → /code-navigation/auto-indexing | no |
| 5637 | /integration/browser_extension | /integration/browser-extension | 460 |  | yes |
| 2430 | /code_navigation/references/indexers | /code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers | 450 | 2 more → /code-navigation/writing-an-indexer | no |
| 2496 | /batch_changes | /batch-changes | 440 |  | yes |
| 5313 | /admin/code_hosts/github | /admin/code-hosts/github | 440 |  | yes |
| 5824 | /admin/config | /admin | 440 |  | yes |
| 4609 | /code-search/types/deep-search | /deep-search | 410 |  | yes |
| 1869 | /code_search | /code-search | 400 |  | yes |
| 5542 | /code-navigation/auto_indexing | /code-navigation/auto-indexing | 400 |  | yes |
| 5828 | /admin/repo/permissions | /admin/permissions | 370 |  | yes |
| 714 | /admin/analytics | /analytics | 360 |  | yes |
| 1128 | /code_intelligence/explanations/precise_code_intelligence | /code_navigation/explanations/precise_code_navigation | 330 | 3 more → /code-navigation/precise-code-navigation | no |
| 1376 | /cody/overview | /cody/ | 330 |  | yes |
| 5200 | /admin/updates | /self-hosted/updates | 330 |  | yes |
| 4853 | /admin/deploy | /self-hosted/deploy | 320 |  | yes |
| 5150 | /admin/observability/troubleshooting | /self-hosted/observability/troubleshooting | 310 |  | yes |
| 999 | /admin/install/kubernetes | /admin/deploy/kubernetes | 290 | 1 more → /self-hosted/deploy/kubernetes | no |
| 1115 | /code_intelligence/explanations/auto_indexing | /code_navigation/explanations/auto_indexing | 290 | 3 more → /code-navigation/auto-indexing | no |
| 4821 | /admin/deploy/docker-compose | /self-hosted/deploy/docker-compose | 290 |  | yes |
| 4849 | /admin/deploy/docker-single-container | /self-hosted/deploy | 280 |  | yes |
| 1107 | /code_intelligence/explanations/writing_an_indexer | /code_navigation/explanations/writing_an_indexer | 260 | 3 more → /code-navigation/writing-an-indexer | no |
| 1071 | /admin/install/docker | /self-hosted/deploy | 250 |  | yes |
| 1862 | /cody/custom-commands | /cody/capabilities/commands#custom-commands | 250 | 1 more → /cody/capabilities/prompts | no |
| 2360 | /code_navigation/explanations/auto_indexing | /code-search/code-navigation/auto_indexing | 250 | 2 more → /code-navigation/auto-indexing | no |
| 4719 | /code-search/code-navigation/how-to/index_a_go_repository | /code-navigation/how-to/index_a_go_repository | 240 | 1 more → /code-navigation/how-to/index-a-go-repository | no |
| 5305 | /admin/code_hosts/bitbucket_server | /admin/code-hosts/bitbucket-server | 240 |  | yes |
| 5758 | /self-hosted/how-to/dirty_database | /self-hosted/how-to/dirty-database | 230 |  | yes |
| 2531 | /batch_changes/explanations/how_src_executes_a_batch_spec | /batch-changes/how-src-executes-a-batch-spec | 220 |  | yes |
| 4552 | /cody/capabilities/agentic-chat | /cody/capabilities/agentic-context-fetching | 220 |  | yes |
| 4658 | /admin/access_control/service_accounts | /admin/service_accounts | 200 | 1 more → /admin/service-accounts | no |
| 4723 | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository | /code-navigation/how-to/index_a_typescript_and_javascript_repository | 200 | 1 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 4865 | /admin/deploy/kubernetes/configure | /self-hosted/deploy/kubernetes/configure | 200 |  | yes |
| 4937 | /admin/deploy/resource_estimator | /self-hosted/deploy/resource_estimator | 200 | 1 more → /self-hosted/deploy/resource-estimator | no |
| 5409 | /cli/how-tos/creating_an_access_token | /cli/how-tos/creating-an-access-token | 200 |  | yes |
| 2657 | /batch_changes/references/batch_spec_yaml_reference | /batch-changes/batch-spec-yaml-reference | 180 |  | yes |
| 4702 | /code-search/code-navigation/features | /code-navigation/features | 180 |  | yes |
| 5609 | /code-search/working/search_contexts | /code-search/working/search-contexts | 180 |  | yes |
| 5122 | /admin/observability/dashboards | /self-hosted/observability/dashboards | 170 |  | yes |
| 5353 | /admin/config/site_config | /admin/config/site-config | 170 |  | yes |
| 5405 | /api/stream_api | /api/stream-api | 170 |  | yes |
| 979 | /admin/install | /admin/deploy | 160 | 1 more → /self-hosted/deploy | no |
| 5037 | /admin/how-to/dirty_database | /self-hosted/how-to/dirty_database | 160 | 1 more → /self-hosted/how-to/dirty-database | no |
| 2011 | /code_navigation/how-to/index_a_typescript_and_javascript_repository | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository | 150 | 2 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 5538 | /code_monitoring | /code-monitoring | 150 |  | yes |
| 5873 | /own/codeowners-format | /code-ownership/codeowners-format | 150 |  | yes |
| 2324 | /code_navigation/explanations/writing_an_indexer | /code-search/code-navigation/writing_an_indexer#writing-an-indexer | 140 | 2 more → /code-navigation/writing-an-indexer | no |
| 838 | /campaigns/references/campaign_spec_yaml_reference | /batch_changes/references/batch_spec_yaml_reference | 130 | 1 more → /batch-changes/batch-spec-yaml-reference | no |
| 5154 | /admin/config/postgres-conf | /self-hosted/postgres-conf | 130 |  | yes |
| 5522 | /code_insights/references/common_use_cases | /code-insights/references/common-use-cases | 130 |  | yes |
| 5877 | /api/graphql/examples | /api/graphql | 130 |  | yes |
| 931 | /campaigns | /batch_changes | 120 | 1 more → /batch-changes | no |
| 1195 | /code_intelligence/how-to/index_a_cpp_repository | https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage | 120 |  | no |
| 2850 | /batch_changes/references/faq | /batch-changes/faq | 120 |  | yes |
| 4467 | /cody/clients/model-configuration | /cody/enterprise/model-configuration | 120 |  | yes |
| 4662 | /cody/core-concepts/cody-gateway | /model-provider | 120 |  | yes |
| 5146 | /admin/observability/tracing | /self-hosted/observability/tracing | 120 |  | yes |
| 5162 | /admin/postgres12_end_of_life_notice | /self-hosted/postgres12_end_of_life_notice | 120 | 1 more → /self-hosted/postgres12-end-of-life-notice | no |
| 5484 | /code_insights/explanations/data_retention | /code-insights/explanations/data-retention | 120 |  | yes |
| 5686 | /self-hosted/deploy/resource_estimator | /self-hosted/deploy/resource-estimator | 120 |  | yes |
| 4825 | /admin/deploy/docker-compose/migrate | /self-hosted/deploy/docker-compose/migrate | 110 |  | yes |
| 5130 | /admin/observability | /self-hosted/observability | 110 |  | yes |
| 5369 | /admin/how-to/lsif_scip_migration | /admin/how-to/lsif-scip-migration | 110 |  | yes |
| 5567 | /code-navigation/how-to/index_a_typescript_and_javascript_repository | /code-navigation/how-to/index-a-typescript-and-javascript-repository | 110 |  | yes |
| 5589 | /code-navigation/search_based_code_navigation | /code-navigation/search-based-code-navigation | 110 |  | yes |
| 5869 | /own/codeowners-ingestion | /code-ownership | 110 |  | yes |
| 1388 | /cody/overview/install-neovim | /cody/clients/install-neovim | 100 |  | yes |
| 4813 | /admin/deploy/docker-compose/digitalocean | /self-hosted/deploy/docker-compose/digitalocean | 100 |  | yes |
| 4897 | /admin/deploy/kubernetes/operations | /self-hosted/deploy/kubernetes/operations | 100 |  | yes |
| 5142 | /admin/observability/opentelemetry | /self-hosted/observability/opentelemetry | 100 |  | yes |
| 5397 | /admin/user_data_deletion | /admin/user-data-deletion | 100 |  | yes |
| 5546 | /code-navigation/auto_indexing_configuration | /code-navigation/auto-indexing-configuration | 100 |  | yes |
| 5563 | /code-navigation/how-to/index_a_go_repository | /code-navigation/how-to/index-a-go-repository | 100 |  | yes |
| 5674 | /self-hosted/advanced_config_file | /self-hosted/advanced-config-file | 100 |  | yes |
| 5706 | /self-hosted/executors/deploy_executors_binary | /self-hosted/executors/deploy-executors-binary | 100 |  | yes |
| 738 | /user/code_intelligence | /code_intelligence | 90 | 3 more → /code-navigation | no |
| 2563 | /batch_changes/how-tos/creating_a_batch_change | /batch-changes/create-a-batch-change | 90 |  | yes |
| 4558 | /cody/core-concepts/embeddings | /cody/ | 90 |  | yes |
| 4616 | /cody/usage-and-pricing | https://sourcegraph.com/pricing | 90 |  | yes |
| 5216 | /admin/updates/migrator/migrator-operations | /self-hosted/updates/migrator/migrator-operations | 90 |  | yes |
| 5285 | /admin/beta_and_experimental_features | /beta-and-experimental | 90 |  | yes |
| 5393 | /admin/service_accounts | /admin/service-accounts | 90 |  | yes |
| 5633 | /integration/bitbucket_server | /integration/bitbucket-server | 90 |  | yes |
| 742 | /user | /getting-started | 80 |  | yes |
| 1200 | /code_intelligence/how-to/index_a_go_repository | /code_navigation/how-to/index_a_go_repository | 80 | 3 more → /code-navigation/how-to/index-a-go-repository | no |
| 2607 | /batch_changes/how-tos/configuring_credentials | /batch-changes/configuring-credentials | 80 |  | yes |
| 4973 | /admin/executors/deploy_executors_binary | /self-hosted/executors/deploy_executors_binary | 80 | 1 more → /self-hosted/executors/deploy-executors-binary | no |
| 5094 | /admin/how-to/upgrade-postgres-12-16-builtin-dbs | /self-hosted/how-to/upgrade-postgres-12-16-builtin-dbs | 80 |  | yes |
| 5204 | /admin/updates/kubernetes | https://sourcegraph.com/changelog/self-hosted/kubernetes | 80 |  | yes |
| 5385 | /admin/repo/update_frequency | /admin/repo/update-frequency | 80 |  | yes |
| 5453 | /code_insights | /code-insights | 80 |  | yes |
| 5662 | /own/codeowners_format | /own/codeowners-format | 80 | 1 more → /code-ownership/codeowners-format | no |
| 5742 | /self-hosted/external_services/object_storage | /self-hosted/external-services/object-storage | 80 |  | yes |
| 2539 | /batch_changes/explanations/server_side | /batch-changes/server-side | 70 |  | yes |
| 4917 | /admin/deploy/machine-images/aws-oneclick | /self-hosted/deploy/machine-images/aws-oneclick | 70 |  | yes |
| 5158 | /admin/postgres | /self-hosted/postgres | 70 |  | yes |
| 5289 | /admin/code_hosts | /admin/code-hosts | 70 |  | yes |
| 5734 | /self-hosted/executors/executors_troubleshooting | /self-hosted/executors/executors-troubleshooting | 70 |  | yes |
| 628 | /user/code_intelligence/features | /user/code_intelligence/explanations/features | 60 | 4 more → /code-navigation/features | no |
| 672 | /user/code_intelligence/explanations/precise_code_intelligence | /code_intelligence/explanations/precise_code_intelligence | 60 | 4 more → /code-navigation/precise-code-navigation | no |
| 1007 | /admin/install/kubernetes/operations | /admin/deploy/kubernetes/operations | 60 | 1 more → /self-hosted/deploy/kubernetes/operations | no |
| 2245 | /code_navigation/explanations/features | /code-search/code-navigation/features | 60 | 1 more → /code-navigation/features | no |
| 4634 | /code_monitoring/how-tos | /code_monitoring | 60 | 1 more → /code-monitoring | no |
| 4941 | /admin/deploy/scale | /self-hosted/deploy/scale | 60 |  | yes |
| 5017 | /admin/external_services/postgres | /self-hosted/external_services/postgres | 60 |  | no |
| 5118 | /admin/observability/alerts | /self-hosted/observability/alerts | 60 |  | yes |
| 5138 | /admin/observability/metrics | /self-hosted/observability/metrics | 60 |  | yes |
| 5187 | /admin/ssl_https_self_signed_cert_nginx | /self-hosted/ssl_https_self_signed_cert_nginx | 60 | 1 more → /self-hosted/ssl-https-self-signed-cert-nginx | no |
| 5208 | /admin/updates/migrator/downgrading | /self-hosted/updates/migrator/downgrading | 60 |  | yes |
| 5349 | /admin/config/batch_changes | /admin/config/batch-changes | 60 |  | yes |
| 5641 | /integration/browser_extension/how-tos/browser_search_engine | /integration/browser-extension/how-tos/browser-search-engine | 60 |  | yes |
| 5666 | /own/codeowners_ingestion | /own/codeowners-ingestion | 60 | 1 more → /code-ownership | no |
| 5722 | /self-hosted/executors/deploy_executors_kubernetes | /self-hosted/executors/deploy-executors-kubernetes | 60 |  | yes |
| 5798 | /self-hosted/postgres12_end_of_life_notice | /self-hosted/postgres12-end-of-life-notice | 60 |  | yes |
| 5857 | /own | /code-ownership | 60 |  | yes |
| 5881 | /api/graphql/search | /api/stream-api | 60 |  | yes |
| 1204 | /code_intelligence/how-to/index_a_typescript_and_javascript_repository | /code_navigation/how-to/index_a_typescript_and_javascript_repository | 50 | 3 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 1892 | /code_search/how-to/saved_searches | /code-search/working/saved_searches | 50 | 1 more → /code-search/working/saved-searches | no |
| 2648 | /batch_changes/references/requirements | /batch-changes/requirements | 50 |  | yes |
| 2828 | /batch_changes/references/batch_spec_templating | /batch-changes/batch-spec-templating | 50 |  | yes |
| 4642 | /code_monitoring/how-tos/starting_points | /code_monitoring | 50 | 1 more → /code-monitoring | no |
| 4690 | /code-search/code-navigation/envvars | /code-navigation/envvars | 50 |  | yes |
| 4710 | /code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | /code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | 50 | 1 more → /code-navigation/how-to/combining-scip-uploads-from-ci-cd-and-auto-indexing | no |
| 4797 | /admin/config/advanced_config_file | /self-hosted/advanced_config_file | 50 | 1 more → /self-hosted/advanced-config-file | no |
| 5074 | /admin/how-to/rollback_database | /self-hosted/how-to/rollback_database | 50 | 1 more → /self-hosted/how-to/rollback-database | no |
| 5317 | /admin/code_hosts/gitlab | /admin/code-hosts/gitlab | 50 |  | yes |
| 5457 | /code_insights/quickstart | /code-insights/quickstart | 50 |  | yes |
| 5479 | /code_insights/explanations/current_limitations_of_code_insights | /code-insights/explanations/current-limitations-of-code-insights | 50 |  | yes |
| 5526 | /code_insights/references/incomplete_data_points | /code-insights/references/incomplete-data-points | 50 |  | yes |
| 5738 | /self-hosted/external_services | /self-hosted/external-services | 50 |  | yes |
| 5750 | /self-hosted/how-to/blobstore_update_notes | /self-hosted/how-to/blobstore-update-notes | 50 |  | yes |
| 5762 | /self-hosted/how-to/dirty_database_pre_3_37 | /self-hosted/how-to/dirty-database-pre-3-37 | 50 |  | yes |
| 25 | /dev/code_reviews | https://docs.sourcegraph.com/dev/background-information/code_reviews | 40 |  |  |
| 1039 | /admin/install/docker-compose | /admin/deploy/docker-compose | 40 | 1 more → /self-hosted/deploy/docker-compose | no |
| 1063 | /admin/install/docker/digitalocean | /self-hosted/deploy | 40 |  | yes |
| 1416 | /cody/explanations/enabling_cody_enterprise | /cody/clients/enable-cody-enterprise | 40 |  | yes |
| 4489 | /pricing/free | https://sourcegraph.com/pricing | 40 |  | yes |
| 4505 | /pricing/plan-comparison | https://sourcegraph.com/pricing | 40 |  | yes |
| 4535 | /cody/embedded-repos | /cody | 40 |  | yes |
| 4728 | /code-search/code-navigation/how-to/index_other_languages | /code-navigation/how-to/index_other_languages | 40 | 1 more → /code-navigation/how-to/index-other-languages | no |
| 4753 | /code-search/code-navigation/rockskip | /code-navigation/rockskip | 40 |  | yes |
| 4785 | /admin/config/webhooks/incoming | /admin/webhooks/incoming | 40 |  | yes |
| 4929 | /admin/deploy/migrate-backup | /self-hosted/deploy/migrate-backup | 40 |  | yes |
| 4957 | /admin/deployment_best_practices | /self-hosted/deployment_best_practices | 40 | 1 more → /self-hosted/deployment-best-practices | no |
| 4965 | /admin/config/encryption | /self-hosted/encryption | 40 |  | yes |
| 5090 | /admin/how-to/unfinished_migration | /self-hosted/how-to/unfinished_migration | 40 | 1 more → /self-hosted/how-to/unfinished-migration | no |
| 5261 | /admin/audit_log | /admin/audit-log | 40 |  | yes |
| 5345 | /admin/config/authorization_and_authentication | /admin/config/authorization-and-authentication | 40 |  | yes |
| 5534 | /code_insights/references/search_aggregations_use_cases | /code-insights/references/search-aggregations-use-cases | 40 |  | yes |
| 21 | /dev/roadmap | https://sourcegraph.com/direction | 30 |  | no |
| 583 | /dev/documentation | /dev/how-to/documentation_implementation | 30 |  | no |
| 689 | /user/code_intelligence/how-to/index_a_go_repository | /code_intelligence/how-to/index_a_go_repository | 30 | 4 more → /code-navigation/how-to/index-a-go-repository | no |
| 1075 | /admin/install/managed | /admin/deploy/managed | 30 | 1 more → /cloud | no |
| 1270 | /code_intelligence/references/indexers | /code_navigation/references/indexers | 30 | 3 more → /code-navigation/writing-an-indexer | no |
| 1820 | /cody/explanations/code_graph_context | /cody/core-concepts/code-graph | 30 |  | yes |
| 1902 | /code_search/how-to/search_contexts | /code-search/working/search_contexts | 30 | 1 more → /code-search/working/search-contexts | no |
| 1907 | /code_search/how-to/exhaustive | /code-search/types/exhaustive | 30 |  | no |
| 1932 | /code_search/explanations/search_details | /code-search/features | 30 |  | yes |
| 2183 | /code_navigation/explanations/introduction_to_code_navigation | /code-search/code-navigation | 30 | 1 more → /code-navigation | no |
| 2508 | /batch_changes/explanations/introduction_to_batch_changes | /batch-changes/ | 30 |  | yes |
| 2543 | /batch_changes/tutorials | /batch-changes/examples | 30 |  | yes |
| 2837 | /batch_changes/references/batch_spec_cheat_sheet | /batch-changes/batch-spec-cheat-sheet | 30 |  | yes |
| 4515 | /admin/pricing | https://sourcegraph.com/pricing | 30 |  | yes |
| 4670 | /how-to-videos | /tutorials | 30 |  | yes |
| 4674 | /how-to-videos/code-search | /tutorials#code-search-how-to-videos | 30 |  | yes |
| 4715 | /code-search/code-navigation/how-to | /code-navigation/how-to | 30 |  | yes |
| 4805 | /admin/deploy/docker-compose/azure | /self-hosted/deploy/docker-compose/azure | 30 |  | yes |
| 4893 | /admin/deploy/kubernetes/kustomize/migrate | /self-hosted/deploy/kubernetes/kustomize/migrate | 30 |  | yes |
| 4905 | /admin/deploy/kubernetes/troubleshoot | /self-hosted/deploy/kubernetes/troubleshoot | 30 |  | yes |
| 4953 | /admin/deploy/without_service_discovery | /self-hosted/deploy/without_service_discovery | 30 | 1 more → /self-hosted/deploy/without-service-discovery | no |
| 4961 | /admin/config/email | /self-hosted/email | 30 |  | yes |
| 5001 | /admin/executors/executors_troubleshooting | /self-hosted/executors/executors_troubleshooting | 30 | 1 more → /self-hosted/executors/executors-troubleshooting | no |
| 5110 | /admin/observability/alerting | /self-hosted/observability/alerting | 30 |  | yes |
| 5257 | /admin/access_control/batch_changes | /admin/access-control/batch-changes | 30 |  | yes |
| 5475 | /code_insights/explanations/code_insights_filters | /code-insights/explanations/code-insights-filters | 30 |  | yes |
| 5554 | /code-navigation/how-to/adding_scip_to_workflows | /code-navigation/how-to/adding-scip-to-workflows | 30 |  | yes |
| 5581 | /code-navigation/inference_configuration | /code-navigation/inference-configuration | 30 |  | yes |
| 5605 | /code-search/working/saved_searches | /code-search/working/saved-searches | 30 |  | yes |
| 5646 | /integration/browser_extension/how-tos/google_workspace | /integration/browser-extension/how-tos/google-workspace | 30 |  | yes |
| 5816 | /self-hosted/updates/pure-docker | /self-hosted/deploy/docker-compose/upgrade | 30 |  | yes |
| 5843 | /self-hosted/updates/docker-compose | https://sourcegraph.com/changelog/self-hosted/docker-compose | 30 |  | yes |
| 5861 | /own/assigned-ownership | /code-ownership | 30 |  | yes |
| 12 | /admin/http_https_configuration | /self-hosted/http-https-configuration | 20 |  | yes |
| 153 | /dev/rfcs | https://sourcegraph.com/handbook/communication/rfcs | 20 |  | no |
| 333 | /admin/auth/saml_with_microsoft_adfs | /admin/auth/saml/microsoft_adfs | 20 | 1 more → /admin/auth/saml/microsoft-adfs | no |
| 380 | /integration/google_gsuite | /integration/google_workspace | 20 |  | no |
| 611 | /user/search/saved_searches | /code_search/how-to/saved_searches | 20 | 2 more → /code-search/working/saved-searches | no |
| 955 | /cli/references/campaigns/validate | /cli/references/batch/validate | 20 |  | yes |
| 1019 | /admin/install/kubernetes/update | /admin/deploy/kubernetes/update | 20 |  | no |
| 1027 | /admin/install/docker-compose/aws | /admin/deploy/docker-compose/aws | 20 | 1 more → /self-hosted/deploy/docker-compose/aws | no |
| 1043 | /admin/install/docker-compose/migrate | /admin/deploy/docker-compose/migrate | 20 | 1 more → /self-hosted/deploy/docker-compose/migrate | no |
| 1099 | /admin/observability/alert_solutions | /admin/observability/alerts | 20 | 1 more → /self-hosted/observability/alerts | no |
| 1119 | /code_intelligence/explanations/features | /code_navigation/explanations/features | 20 | 2 more → /code-navigation/features | no |
| 1145 | /code_intelligence/explanations | /code_navigation/explanations | 20 |  | no |
| 1209 | /code_intelligence/how-to/index_other_languages | /code_navigation/how-to/index_other_languages | 20 |  | no |
| 1554 | /cody/core-concepts/embeddings/configure-embeddings | /cody/embeddings/configure-embeddings | 20 |  | no |
| 1873 | /code_search/tutorials | /code-search/working/saved_searches | 20 | 1 more → /code-search/working/saved-searches | no |
| 1963 | /code_navigation/how-to/configure_data_retention | /code-search/code-navigation/auto_indexing#configure-auto-indexing-policies | 20 | 2 more → /code-navigation/auto-indexing | no |
| 1975 | /code_navigation/how-to/index_a_go_repository | /code-search/code-navigation/how-to/index_a_go_repository | 20 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 2046 | /code_navigation/how-to/adding_lsif_to_workflows | /code-search/code-navigation/how-to/adding_lsif_to_workflows | 20 |  | no |
| 2204 | /code_navigation/explanations/uploads | /code-search/code-navigation/explanations/uploads | 20 | 1 more → /code-navigation/explanations/uploads | no |
| 2442 | /code_navigation/references/precise_examples | /code-search/code-navigation/precise_code_navigation#precise-navigation-examples | 20 | 2 more → /code-navigation/precise-code-navigation | no |
| 2500 | /batch_changes/quickstart | /batch-changes/quickstart | 20 |  | yes |
| 2567 | /batch_changes/how-tos/publishing_changesets | /batch-changes/publishing-changesets | 20 |  | yes |
| 2846 | /batch_changes/references/troubleshooting | /batch-changes/troubleshooting | 20 |  | yes |
| 4493 | /pricing/plans/free | https://sourcegraph.com/pricing | 20 |  | yes |
| 4497 | /pricing/enterprise-starter | /pricing/plans/enterprise-starter | 20 |  | yes |
| 4605 | /analytics/cloud | /analytics | 20 |  | yes |
| 4622 | /code_monitoring/explanations/best_practices | /code_monitoring | 20 | 1 more → /code-monitoring | no |
| 4732 | /code-search/code-navigation/how-to/policies_resource_usage_best_practices | /code-navigation/how-to/policies_resource_usage_best_practices | 20 | 1 more → /code-navigation/how-to/policies-resource-usage-best-practices | no |
| 4801 | /admin/deploy/docker-compose/aws | /self-hosted/deploy/docker-compose/aws | 20 |  | yes |
| 5013 | /admin/external_services/object_storage | /self-hosted/external_services/object_storage | 20 | 1 more → /self-hosted/external-services/object-storage | no |
| 5041 | /admin/how-to/dirty_database_pre_3_37 | /self-hosted/how-to/dirty_database_pre_3_37 | 20 | 1 more → /self-hosted/how-to/dirty-database-pre-3-37 | no |
| 5070 | /admin/how-to/redis_configmap | /self-hosted/how-to/redis_configmap | 20 | 1 more → /self-hosted/how-to/redis-configmap | no |
| 5114 | /admin/observability/alerting_custom_consumption | /self-hosted/observability/alerting_custom_consumption | 20 | 1 more → /self-hosted/observability/alerting-custom-consumption | no |
| 5224 | /admin/updates/migrator/troubleshooting-upgrades | /self-hosted/updates/migrator/troubleshooting-upgrades | 20 |  | yes |
| 5248 | /admin/workers | /self-hosted/workers | 20 |  | yes |
| 5253 | /admin/access_control | /admin/access-control | 20 |  | yes |
| 5265 | /admin/auth/login_form | /admin/auth/login-form | 20 |  | yes |
| 5337 | /admin/code_hosts/rate_limits | /admin/code-hosts/rate-limits | 20 |  | yes |
| 5373 | /admin/how-to/update_repo_failure | /admin/how-to/update-repo-failure | 20 |  | yes |
| 5445 | /cloud/private_connectivity_public_lb | /cloud/private-connectivity-public-lb | 20 |  | yes |
| 5500 | /code_insights/how-tos/creating_a_custom_dashboard_of_code_insights | /code-insights/how-tos/creating-a-custom-dashboard-of-code-insights | 20 |  | yes |
| 5617 | /code-search/working/search_subexpressions | /code-search/working/search-subexpressions | 20 |  | yes |
| 5726 | /self-hosted/executors/deploy_executors_terraform | /self-hosted/executors/deploy-executors-terraform | 20 |  | yes |
| 5838 | /technical-changelog.rss | TECHNICAL_CHANGELOG_RSS_URL | 20 |  |  |
| 111 | /dev/retrospectives/3_3 | https://sourcegraph.com/retrospectives/3_3 | 10 |  | no |
| 337 | /admin/config/critical_config | /admin/migration/3_11 | 10 |  | no |
| 710 | /user/usage_statistics | /analytics | 10 |  | yes |
| 746 | /user/automation | /batch_changes | 10 | 1 more → /batch-changes | no |
| 987 | /admin/install/kubernetes/configure | /admin/deploy/kubernetes/configure | 10 | 1 more → /self-hosted/deploy/kubernetes/configure | no |
| 1015 | /admin/install/kubernetes/troubleshoot | /admin/deploy/kubernetes/troubleshoot | 10 | 1 more → /self-hosted/deploy/kubernetes/troubleshoot | no |
| 1059 | /admin/install/docker/aws | /self-hosted/deploy | 10 |  | yes |
| 1067 | /admin/install/docker/google_cloud | /self-hosted/deploy | 10 |  | yes |
| 1132 | /code_intelligence/explanations/rockskip | /code_navigation/explanations/rockskip | 10 | 2 more → /code-navigation/rockskip | no |
| 1400 | /app | /cody/clients/app | 10 |  | no |
| 1412 | /cody/overview/cody-with-sourcegraph | /cody/clients/cody-with-sourcegraph | 10 |  | yes |
| 1682 | /cody/explanations/indexing | /cody/embeddings/embedding-index | 10 |  | no |
| 1752 | /cody/explanations/policies | /cody/embeddings/configure-embeddings#policies | 10 |  | no |
| 1840 | /cody/core-concepts/cody_gateway | /cody/core-concepts/cody-gateway | 10 | 1 more → /model-provider | no |
| 1882 | /code_search/tutorials/search_subexpressions | /code-search/working/search_subexpressions | 10 | 1 more → /code-search/working/search-subexpressions | no |
| 1927 | /code_search/explanations/features | /code-search/features | 10 |  | yes |
| 2547 | /batch_changes/tutorials/refactor_go_comby | /batch-changes/refactor-go-comby | 10 |  | yes |
| 2639 | /batch_changes/how-tos/creating_multiple_changesets_in_large_repositories | /batch-changes/creating-multiple-changesets-in-large-repositories | 10 |  | yes |
| 4646 | /code_monitoring/how-tos/webhook | /code_monitoring | 10 | 1 more → /code-monitoring | no |
| 4666 | /cody/core-concepts/enterprise-architecture | /admin/architecture#cody | 10 |  | yes |
| 4741 | /code-search/code-navigation/inference_configuration | /code-navigation/inference_configuration | 10 | 1 more → /code-navigation/inference-configuration | no |
| 4757 | /code-search/code-navigation/search_based_code_navigation | /code-navigation/search_based_code_navigation | 10 | 1 more → /code-navigation/search-based-code-navigation | no |
| 4901 | /admin/deploy/kubernetes/scale | /self-hosted/deploy/kubernetes/scale | 10 |  | yes |
| 4925 | /admin/deploy/machine-images | /self-hosted/deploy/machine-images | 10 |  | yes |
| 4933 | /admin/deploy/repositories | /self-hosted/deploy/repositories | 10 |  | yes |
| 4981 | /admin/executors/deploy_executors_dind | /self-hosted/executors/deploy_executors_dind | 10 | 1 more → /self-hosted/executors/deploy-executors-dind | no |
| 4989 | /admin/executors/deploy_executors_kubernetes | /self-hosted/executors/deploy_executors_kubernetes | 10 | 1 more → /self-hosted/executors/deploy-executors-kubernetes | no |
| 5005 | /admin/executors/firecracker | /self-hosted/executors/firecracker | 10 |  | yes |
| 5102 | /admin/config/network-filtering | /self-hosted/network-filtering | 10 |  | yes |
| 5465 | /code_insights/explanations/administration_and_security_of_code_insights | /code-insights/explanations/administration-and-security-of-code-insights | 10 |  | yes |
| 5654 | /integration/open_in_editor | /integration/open-in-editor | 10 |  | yes |
| 5690 | /self-hosted/deploy/without_service_discovery | /self-hosted/deploy/without-service-discovery | 10 |  | yes |
| 5698 | /self-hosted/executors/deploy_executors | /self-hosted/executors | 10 |  | yes |
| 5889 | /api/graphql/managing-search-contexts-with-api | /api/graphql | 10 |  | yes |
| 4 | /integration/img/disable_extension.png | /integration/img/disable-extension.png | 0 |  | no |
| 8 | /admin/tls_ssl | /self-hosted/http-https-configuration | 0 |  | yes |
| 16 | /docs/admin/deploy_executors | https://sourcegraph.com/docs/admin/executors/deploy_executors | 0 | 1 more → /self-hosted/executors | no |
| 30 | /dev/conduct | https://sourcegraph.com/community/code_of_conduct | 0 |  | no |
| 34 | /dev/devrel_release_issue_template | https://sourcegraph.com/handbook/marketing/developer-relations/release_issue_template | 0 |  | no |
| 39 | /dev/documentation/separate_website | https://sourcegraph.com/handbook/engineering/distribution/separate_website | 0 |  | no |
| 44 | /dev/documentation/site | https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website | 0 |  | no |
| 49 | /dev/documentation/structure | https://sourcegraph.com/handbook/engineering/product_documentation | 0 |  | no |
| 54 | /dev/documentation/style_guide | https://sourcegraph.com/handbook/engineering/product_documentation | 0 |  | no |
| 59 | /dev/faq | https://sourcegraph.com/community/faq | 0 |  | no |
| 63 | /dev/go_style_guide | https://docs.sourcegraph.com/dev/background-information/languages/go | 0 |  |  |
| 68 | /dev/incidents | https://sourcegraph.com/handbook/engineering/incidents | 0 |  | no |
| 72 | /dev/open_source_open_company | https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source | 0 |  | no |
| 77 | /dev/patch_release_issue_template | https://sourcegraph.com/handbook/engineering/releases/patch_release_issue_template | 0 |  | no |
| 82 | /dev/product | https://sourcegraph.com/handbook/product | 0 |  | no |
| 86 | /dev/product/personas | https://sourcegraph.com/handbook/marketing/personas | 0 |  | no |
| 90 | /dev/release_issue_template | https://sourcegraph.com/handbook/engineering/releases/release_issue_template | 0 |  | no |
| 95 | /dev/releases | https://sourcegraph.com/handbook/engineering/releases | 0 |  | no |
| 99 | /dev/retrospectives/3_0 | https://sourcegraph.com/handbook/retrospectives/3_0 | 0 |  | no |
| 103 | /dev/retrospectives/3_0_beta | https://sourcegraph.com/handbook/retrospectives/3_0_beta | 0 |  | no |
| 107 | /dev/retrospectives/3_2 | https://sourcegraph.com/retrospectives/3_2 | 0 |  | no |
| 115 | /dev/retrospectives/3_4 | https://sourcegraph.com/retrospectives/3_4 | 0 |  | no |
| 119 | /dev/retrospectives/3_5 | https://sourcegraph.com/retrospectives/3_5 | 0 |  | no |
| 123 | /dev/retrospectives/3_6 | https://sourcegraph.com/retrospectives/3_6 | 0 |  | no |
| 127 | /dev/retrospectives/3_7 | https://sourcegraph.com/retrospectives/3_7 | 0 |  | no |
| 131 | /dev/retrospectives/3_8 | https://sourcegraph.com/retrospectives/3_8 | 0 |  | no |
| 135 | /dev/retrospectives/3_9 | https://sourcegraph.com/retrospectives/3_9 | 0 |  | no |
| 139 | /dev/retrospectives/customer_license_expiration | https://sourcegraph.com/retrospectives/customer_license_expiration | 0 |  | no |
| 144 | /dev/retrospectives | https://sourcegraph.com/retrospectives | 0 |  | no |
| 148 | /dev/retrospectives/postgresql_upgrade | https://sourcegraph.com/retrospectives/postgresql_upgrade | 0 |  | no |
| 157 | /dev/style_guide | https://sourcegraph.com/handbook/communication/style_guide | 0 |  | no |
| 162 | /direction | https://sourcegraph.com/direction | 0 |  | no |
| 166 | /direction/secure | https://sourcegraph.com/direction | 0 |  | no |
| 170 | /graphbook/communication | https://sourcegraph.com/handbook | 0 |  | no |
| 174 | /graphbook | https://sourcegraph.com/handbook | 0 |  | no |
| 178 | /team/graphbook | https://sourcegraph.com/handbook | 0 |  | no |
| 182 | /team/graphbook/team_meeting | https://sourcegraph.com/handbook/communication/company_meeting | 0 |  | no |
| 187 | /team/graphbook/travel | https://sourcegraph.com/handbook/people-ops/travel | 0 |  | no |
| 191 | /team/gtm/devrel | https://sourcegraph.com/handbook/marketing/developer-relations | 0 |  | no |
| 196 | /team/gtm | https://sourcegraph.com/handbook/sales | 0 |  | no |
| 200 | /team/gtm/support/diagnostics | https://sourcegraph.com/handbook/support/diagnostics | 0 |  | no |
| 204 | /team/gtm/support | https://sourcegraph.com/handbook/support | 0 |  | no |
| 208 | /team | https://sourcegraph.com/handbook | 0 |  | no |
| 212 | /team/product-dev/documentation | https://sourcegraph.com/handbook/engineering/product_documentation | 0 |  | no |
| 217 | /team/product-dev/documentation/separate_website | https://sourcegraph.com/handbook/engineering/distribution/separate_website | 0 |  | no |
| 222 | /team/product-dev/documentation/site | https://sourcegraph.com/handbook/engineering/distribution/update_sourcegraph_website | 0 |  | no |
| 227 | /team/product-dev/documentation/structure | https://sourcegraph.com/handbook/engineering/product_documentation | 0 |  | no |
| 232 | /team/product-dev/documentation/style_guide | https://sourcegraph.com/handbook/communication/style_guide | 0 |  | no |
| 237 | /team/product-dev/incidents | https://sourcegraph.com/handbook/engineering/incidents | 0 |  | no |
| 241 | /team/product-dev | https://sourcegraph.com/handbook/engineering | 0 |  | no |
| 245 | /team/product-dev/open_source_open_company | https://sourcegraph.com/company#sourcegraph-open-product-open-company-open-source | 0 |  | no |
| 250 | /team/product-dev/product | https://sourcegraph.com/handbook/product | 0 |  | no |
| 254 | /team/product-dev/product/personas | https://sourcegraph.com/handbook/marketing/personas | 0 |  | no |
| 258 | /team/product-dev/releases | https://sourcegraph.com/handbook/engineering/releases | 0 |  | no |
| 262 | /team/product-dev/retrospectives/3_0 | https://sourcegraph.com/retrospectives/3_0 | 0 |  | no |
| 266 | /team/product-dev/retrospectives/3_0_beta | https://sourcegraph.com/retrospectives/3_0_beta | 0 |  | no |
| 270 | /team/product-dev/retrospectives/3_2 | https://sourcegraph.com/retrospectives/3_2 | 0 |  | no |
| 274 | /team/product-dev/retrospectives/3_3 | https://sourcegraph.com/retrospectives/3_3 | 0 |  | no |
| 278 | /team/product-dev/retrospectives/3_4 | https://sourcegraph.com/retrospectives/3_4 | 0 |  | no |
| 282 | /team/product-dev/retrospectives/3_5 | https://sourcegraph.com/retrospectives/3_5 | 0 |  | no |
| 286 | /team/product-dev/retrospectives/3_6 | https://sourcegraph.com/retrospectives/3_6 | 0 |  | no |
| 290 | /team/product-dev/retrospectives/3_7 | https://sourcegraph.com/retrospectives/3_7 | 0 |  | no |
| 294 | /team/product-dev/retrospectives/3_8 | https://sourcegraph.com/retrospectives/3_8 | 0 |  | no |
| 298 | /team/product-dev/retrospectives/3_9 | https://sourcegraph.com/retrospectives/3_9 | 0 |  | no |
| 302 | /team/product-dev/retrospectives/customer_license_expiration | https://sourcegraph.com/retrospectives/customer_license_expiration | 0 |  | no |
| 307 | /team/product-dev/retrospectives | https://sourcegraph.com/retrospectives | 0 |  | no |
| 311 | /team/product-dev/retrospectives/postgresql_upgrade | https://sourcegraph.com/retrospectives/postgresql_upgrade | 0 |  | no |
| 316 | /team/product-dev/rfcs | https://sourcegraph.com/handbook/communication/rfcs | 0 |  | no |
| 320 | /team/roadmap | https://sourcegraph.com/direction | 0 |  | no |
| 324 | /team/style_guide | https://sourcegraph.com/handbook/communication/style_guide | 0 |  | no |
| 329 | /adopt/comp | https://sourcegraph.com/workflow | 0 |  | no |
| 341 | /admin/external_service/bitbucketserver | /integration/bitbucket_server | 0 | 1 more → /integration/bitbucket-server | no |
| 345 | /admin/install/cluster.md | /admin/deploy/index.md | 0 |  | no |
| 349 | /admin/monitoring | /admin/observability | 0 | 1 more → /self-hosted/observability | no |
| 353 | /admin/monitoring/reporting_search_timeouts | /admin/observability/troubleshooting#scenario-search-timeouts | 0 | 1 more → /self-hosted/observability/troubleshooting | no |
| 358 | /admin/monitoring/metrics_reference | /admin/observability/metrics_guide | 0 |  | no |
| 362 | /admin/monitoring/slack_alert_channel | /admin/observability/alerting#set-up-alerts-in-grafana | 0 | 1 more → /self-hosted/observability/alerting | no |
| 366 | /@v5.3.0/admin/observability/alerts | https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts | 0 |  |  |
| 371 | /@v5.3.0/admin/observability/dashboards | https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards | 0 |  |  |
| 376 | /admin/monitoring_and_tracing | /admin/observability | 0 | 1 more → /self-hosted/observability | no |
| 384 | /dev/architecture/life-of-a-search-query | /dev/background-information/architecture/life-of-a-search-query | 0 |  | no |
| 389 | /dev/architecture/architecture.dot | /dev/background-information/architecture/architecture.dot | 0 |  | no |
| 394 | /dev/architecture/life-of-a-ping | /dev/background-information/architecture/life-of-a-ping | 0 |  | no |
| 398 | /dev/architecture/life-of-a-repository | /dev/background-information/architecture/life-of-a-repository | 0 |  | no |
| 403 | /dev/architecture/search-pagination | /dev/background-information/architecture/search-pagination | 0 |  | no |
| 413 | /dev/architecture/architecture.svg | /dev/background-information/architecture/architecture.svg | 0 |  | no |
| 418 | /dev/codeintel/architecture | /dev/background-information/codeintel/architecture | 0 |  | no |
| 422 | /dev/codeintel/deployment | /dev/background-information/codeintel/deployment | 0 |  | no |
| 426 | /dev/codeintel/diagrams/architecture.dot | /dev/background-information/codeintel/diagrams/architecture.dot | 0 |  | no |
| 431 | /dev/codeintel/diagrams/architecture.svg | /dev/background-information/codeintel/diagrams/architecture.svg | 0 |  | no |
| 436 | /dev/codeintel/diagrams/definitions.mermaid | /dev/background-information/codeintel/diagrams/definitions.mermaid | 0 |  | no |
| 441 | /dev/codeintel/diagrams/definitions.svg | /dev/background-information/codeintel/diagrams/definitions.svg | 0 |  | no |
| 446 | /dev/codeintel/diagrams/extension-definitions.mermaid | /dev/background-information/codeintel/diagrams/extension-definitions.mermaid | 0 |  | no |
| 451 | /dev/codeintel/diagrams/extension-definitions.svg | /dev/background-information/codeintel/diagrams/extension-definitions.svg | 0 |  | no |
| 456 | /dev/codeintel/diagrams/extension-hover.mermaid | /dev/background-information/codeintel/diagrams/extension-hover.mermaid | 0 |  | no |
| 461 | /dev/codeintel/diagrams/extension-hover.svg | /dev/background-information/codeintel/diagrams/extension-hover.svg | 0 |  | no |
| 466 | /dev/codeintel/diagrams/extension-references.mermaid | /dev/background-information/codeintel/diagrams/extension-references.mermaid | 0 |  | no |
| 471 | /dev/codeintel/diagrams/extension-references.svg | /dev/background-information/codeintel/diagrams/extension-references.svg | 0 |  | no |
| 476 | /dev/codeintel/diagrams/hover.mermaid | /dev/background-information/codeintel/diagrams/hover.mermaid | 0 |  | no |
| 481 | /dev/codeintel/diagrams/hover.svg | /dev/background-information/codeintel/diagrams/hover.svg | 0 |  | no |
| 485 | /dev/codeintel/diagrams/references.mermaid | /dev/background-information/codeintel/diagrams/references.mermaid | 0 |  | no |
| 490 | /dev/codeintel/diagrams/references.svg | /dev/background-information/codeintel/diagrams/references.svg | 0 |  | no |
| 495 | /dev/codeintel/diagrams/resolve-page.mermaid | /dev/background-information/codeintel/diagrams/resolve-page.mermaid | 0 |  | no |
| 500 | /dev/codeintel/diagrams/resolve-page.svg | /dev/background-information/codeintel/diagrams/resolve-page.svg | 0 |  | no |
| 505 | /dev/codeintel/diagrams/upload.mermaid | /dev/background-information/codeintel/diagrams/upload.mermaid | 0 |  | no |
| 510 | /dev/codeintel/diagrams/upload.svg | /dev/background-information/codeintel/diagrams/upload.svg | 0 |  | no |
| 515 | /dev/codeintel/extensions | /dev/background-information/codeintel/extensions | 0 |  | no |
| 519 | /dev/codeintel/index | /dev/background-information/codeintel/index | 0 |  | no |
| 523 | /dev/codeintel/queries | /dev/background-information/codeintel/queries | 0 |  | no |
| 527 | /dev/codeintel/uploads | /dev/background-information/codeintel/uploads | 0 |  | no |
| 531 | /dev/graphql_api | /dev/background-information/graphql_api | 0 |  | no |
| 535 | /dev/observability | /dev/background-information/observability | 0 |  | no |
| 539 | /dev/postgresql | /dev/background-information/postgresql | 0 |  | no |
| 543 | /dev/renovate | /dev/background-information/renovate | 0 |  | no |
| 547 | /dev/tech_stack | /dev/background-information/tech_stack | 0 |  | no |
| 551 | /dev/telemetry | /dev/background-information/telemetry | 0 |  | no |
| 555 | /dev/testing | /dev/background-information/testing | 0 |  | no |
| 559 | /dev/web/build | /dev/background-information/web/build | 0 |  | no |
| 563 | /dev/code_host_integrations | /dev/background-information/web/code_host_integrations | 0 |  | no |
| 567 | /dev/web/graphql | /dev/background-information/web/graphql | 0 |  | no |
| 571 | /dev/web/index | /dev/background-information/web/index | 0 |  | no |
| 575 | /dev/web/web_app | /dev/background-information/web/web_app | 0 |  | no |
| 579 | /dev/phabricator_gitolite | /dev/how-to/configure_phabricator_gitolite | 0 |  | no |
| 587 | /dev/zoekt | /dev/how-to/zoekt_local_dev | 0 |  | no |
| 591 | /user/search/examples | /code_search/tutorials/examples | 0 | 1 more → /code-search/queries/examples | no |
| 595 | /user/search/queries | /code_search/reference/queries | 0 | 1 more → /code-search/queries | no |
| 599 | /user/search/language | /code_search/reference/language | 0 | 1 more → /code-search/queries/language | no |
| 603 | /user/search/structural | /code_search/reference/structural | 0 |  | no |
| 607 | /user/search/opengrok | /code_search/how-to/opengrok | 0 |  | no |
| 615 | /user/search/scopes | /code_search/how-to/scopes | 0 |  | no |
| 619 | /user/code_intelligence/lsif_quickstart | /user/code_intelligence/how-to/index_other_languages | 0 |  | no |
| 623 | /user/code_intelligence/basic_code_intelligence | /user/code_intelligence/explanations/search_based_code_intelligence | 0 |  | no |
| 632 | /user/code_intelligence/lsif | /user/code_intelligence/explanations/precise_code_intelligence | 0 | 5 more → /code-navigation/precise-code-navigation | no |
| 637 | /user/code_intelligence/precise_code_intelligence | /user/code_intelligence/explanations/precise_code_intelligence | 0 | 5 more → /code-navigation/precise-code-navigation | no |
| 642 | /user/code_intelligence/writing_an_indexer | /user/code_intelligence/explanations/writing_an_indexer | 0 | 5 more → /code-navigation/writing-an-indexer | no |
| 646 | /user/code_intelligence/adding_lsif_to_many_repos | /user/code_intelligence/how-to/adding_lsif_to_many_repos | 0 | 5 more → /code-navigation/precise-code-navigation | no |
| 650 | /user/code_intelligence/adding_lsif_to_workflows | /user/code_intelligence/how-to/adding_lsif_to_workflows | 0 | 3 more → /code-search/code-navigation/how-to/adding_lsif_to_workflows | no |
| 654 | /user/code_intelligence/languages/go | /user/code_intelligence/how-to/index_a_go_repository | 0 | 5 more → /code-navigation/how-to/index-a-go-repository | no |
| 658 | /user/code_intelligence/languages/typescript_and_javascript | /user/code_intelligence/how-to/index_a_typescript_and_javascript_repository | 0 | 5 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 663 | /user/code_intelligence/explanations/basic_code_intelligence | /code_intelligence/explanations/search_based_code_intelligence | 0 | 4 more → /code-navigation/search-based-code-navigation | no |
| 668 | /user/code_intelligence/explanations/features | /code_intelligence/explanations/features | 0 | 3 more → /code-navigation/features | no |
| 677 | /user/code_intelligence/explanations/writing_an_indexer | /code_intelligence/explanations/writing_an_indexer | 0 | 4 more → /code-navigation/writing-an-indexer | no |
| 681 | /user/code_intelligence/how-to/adding_lsif_to_many_repos | /code_intelligence/how-to/adding_lsif_to_many_repos | 0 | 4 more → /code-navigation/precise-code-navigation | no |
| 685 | /user/code_intelligence/how-to/adding_lsif_to_workflows | /code_intelligence/how-to/adding_lsif_to_workflows | 0 | 2 more → /code-search/code-navigation/how-to/adding_lsif_to_workflows | no |
| 693 | /user/code_intelligence/how-to/index_a_typescript_and_javascript_repository | /code_intelligence/how-to/index_a_typescript_and_javascript_repository | 0 | 4 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 698 | /user/markdown | /admin/markdown | 0 |  | yes |
| 702 | /user/organizations | /admin/organizations | 0 |  | yes |
| 706 | /user/organizations/index | /admin/organizations | 0 |  | yes |
| 718 | /user/user_surveys | /admin/user_surveys | 0 | 1 more → /admin/user-surveys | no |
| 722 | /user/repository/badges | /user/personalization/badges | 0 |  | no |
| 726 | /user/quick_links | /user/personalization/quick_links | 0 |  | no |
| 730 | /user/themes | /user/personalization/themes | 0 |  | no |
| 734 | /user/search | /code_search | 0 | 1 more → /code-search | no |
| 750 | /user/campaigns | /batch_changes | 0 | 1 more → /batch-changes | no |
| 754 | /user/campaigns/examples | /batch_changes/tutorials | 0 | 1 more → /batch-changes/examples | no |
| 758 | /user/campaigns/managing_access | /batch_changes/explanations/permissions_in_batch_changes | 0 |  | no |
| 762 | /dev/campaigns_database_layout.dot | /dev/background-information/batch_changes/batch_changes_database_layout.dot | 0 |  | no |
| 767 | /dev/campaigns_database_layout.svg | /dev/background-information/batch_changes/batch_changes_database_layout.svg | 0 |  | no |
| 772 | /dev/campaigns_design | /dev/background-information/batch_changes/batch_changes_design | 0 |  | no |
| 777 | /dev/campaigns_development | /dev/background-information/batch_changes/index | 0 |  | no |
| 781 | /dev/automation_development | /dev/background-information/batch_changes/index | 0 |  | no |
| 785 | /campaigns/campaign_spec_yaml_reference | /batch-changes/batch-spec-yaml-reference | 0 |  | yes |
| 789 | /dev/background-information/campaigns/campaigns_database_layout.svg | /dev/background-information/batch_changes/batch_changes_database_layout.svg | 0 |  | no |
| 794 | /dev/background-information/campaigns/campaigns_database_layout.dot | /dev/background-information/batch_changes/batch_changes_database_layout.dot | 0 |  | no |
| 799 | /campaigns/explanations/how_src_executes_a_campaign_spec | /batch_changes/explanations/how_src_executes_a_batch_spec | 0 | 1 more → /batch-changes/how-src-executes-a-batch-spec | no |
| 804 | /campaigns/explanations/reexecuting_campaign_specs_multiple_times | /batch_changes/explanations/reexecuting_batch_specs_multiple_times | 0 | 1 more → /batch-changes/reexecuting-batch-specs-multiple-times | no |
| 809 | /campaigns/explanations/permissions_in_batch_changes | /batch_changes/explanations/permissions_in_batch_changes | 0 |  | no |
| 813 | /campaigns/explanations/introduction_to_batch_changes | /batch_changes/explanations/introduction_to_batch_changes | 0 | 1 more → /batch-changes/ | no |
| 818 | /campaigns/explanations/batch_changes_design | /batch_changes/explanations/batch_changes_design | 0 | 1 more → /batch-changes/design | no |
| 822 | /campaigns/explanations | /batch_changes/explanations | 0 | 1 more → /batch-changes/ | no |
| 826 | /campaigns/references/requirements | /batch_changes/references/requirements | 0 | 1 more → /batch-changes/requirements | no |
| 830 | /campaigns/references/troubleshooting | /batch_changes/references/troubleshooting | 0 | 1 more → /batch-changes/troubleshooting | no |
| 834 | /campaigns/references/name-change | /batch_changes/references/name-change | 0 |  | no |
| 842 | /campaigns/references/faq | /batch_changes/references/faq | 0 | 1 more → /batch-changes/faq | no |
| 846 | /campaigns/references/campaign_spec_templating | /batch_changes/references/batch_spec_templating | 0 | 1 more → /batch-changes/batch-spec-templating | no |
| 850 | /campaigns/references | /batch_changes/references | 0 |  | no |
| 854 | /campaigns/tutorials/update_base_images_in_dockerfiles | /batch_changes/tutorials/update_base_images_in_dockerfiles | 0 | 1 more → /batch-changes/update-base-images-in-dockerfiles | no |
| 859 | /campaigns/tutorials/updating_go_import_statements | /batch_changes/tutorials/updating_go_import_statements | 0 | 1 more → /batch-changes/updating-go-import-statements | no |
| 863 | /campaigns/tutorials/refactor_go_comby | /batch_changes/tutorials/refactor_go_comby | 0 | 1 more → /batch-changes/refactor-go-comby | no |
| 867 | /campaigns/tutorials/search_and_replace_specific_terms | /batch_changes/tutorials/search_and_replace_specific_terms | 0 | 1 more → /batch-changes/search-and-replace-specific-terms | no |
| 872 | /campaigns/tutorials | /batch_changes/tutorials | 0 | 1 more → /batch-changes/examples | no |
| 876 | /campaigns/how-tos/creating_changesets_per_project_in_monorepos | /batch_changes/how-tos/creating_changesets_per_project_in_monorepos | 0 | 1 more → /batch-changes/creating-changesets-per-project-in-monorepos | no |
| 881 | /campaigns/how-tos/handling_errored_changesets | /batch_changes/how-tos/handling_errored_changesets | 0 | 1 more → /batch-changes/handling-errored-changesets | no |
| 885 | /campaigns/how-tos/creating_multiple_changesets_in_large_repositories | /batch_changes/how-tos/creating_multiple_changesets_in_large_repositories | 0 | 1 more → /batch-changes/creating-multiple-changesets-in-large-repositories | no |
| 890 | /campaigns/how-tos/site_admin_configuration | /batch_changes/how-tos/site_admin_configuration | 0 | 1 more → /batch-changes/site-admin-configuration | no |
| 894 | /campaigns/how-tos/publishing_changesets | /batch_changes/how-tos/publishing_changesets | 0 | 1 more → /batch-changes/publishing-changesets | no |
| 898 | /campaigns/how-tos/viewing_batch_changes | /batch_changes/how-tos/viewing_batch_changes | 0 | 1 more → /batch-changes/create-a-batch-change#viewing-batch-changes | no |
| 902 | /campaigns/how-tos/updating_a_batch_change | /batch_changes/how-tos/updating_a_batch_change | 0 | 1 more → /batch-changes/update-a-batch-change | no |
| 906 | /campaigns/how-tos/configuring_user_credentials | /batch_changes/how-tos/configuring_user_credentials | 0 | 2 more → /batch-changes/configuring-credentials | no |
| 910 | /campaigns/how-tos/closing_or_deleting_a_batch_change | /batch_changes/how-tos/closing_or_deleting_a_batch_change | 0 | 1 more → /batch-changes/delete-a-batch-change | no |
| 915 | /campaigns/how-tos/creating_a_batch_change | /batch_changes/how-tos/creating_a_batch_change | 0 | 1 more → /batch-changes/create-a-batch-change | no |
| 919 | /campaigns/how-tos/tracking_existing_changesets | /batch_changes/how-tos/tracking_existing_changesets | 0 | 1 more → /batch-changes/tracking-existing-changesets | no |
| 923 | /campaigns/how-tos | /batch_changes/how-tos | 0 |  | no |
| 927 | /campaigns/quickstart | /batch_changes/quickstart | 0 | 1 more → /batch-changes/quickstart | no |
| 935 | /cli/references/campaigns/apply | /cli/references/batch/apply | 0 |  | yes |
| 939 | /cli/references/campaigns/index | /cli/references/batch/index | 0 |  | no |
| 943 | /cli/references/campaigns/new | /cli/references/batch/new | 0 |  | yes |
| 947 | /cli/references/campaigns/preview | /cli/references/batch/preview | 0 |  | yes |
| 951 | /cli/references/campaigns/repositories | /cli/references/batch/repositories | 0 |  | yes |
| 959 | /cli/references/campaigns | /cli/references/batch | 0 |  | yes |
| 963 | /batch_changes/how-tos/configuring_user_credentials | /batch_changes/how-tos/configuring_credentials | 0 | 1 more → /batch-changes/configuring-credentials | no |
| 967 | /batch-changes/references/troubleshooting | /batch_changes/references/troubleshooting | 0 | 1 more → /batch-changes/troubleshooting | no |
| 971 | /dev/background-information/continuous_integration | /dev/background-information/ci | 0 |  | no |
| 975 | /dev/how-to/add_and_use_logging | /dev/how-to/add_logging | 0 |  | no |
| 983 | /admin/install/kubernetes/azure | /admin/deploy/kubernetes | 0 | 1 more → /self-hosted/deploy/kubernetes | no |
| 991 | /admin/install/kubernetes/eks | /admin/deploy/kubernetes/eks | 0 | 1 more → /self-hosted/deploy/kubernetes/eks | no |
| 995 | /admin/install/kubernetes/helm | /admin/deploy/kubernetes/helm | 0 |  | no |
| 1003 | /admin/install/kubernetes/kustomize | /admin/deploy/kubernetes/kustomize | 0 | 1 more → /self-hosted/deploy/kubernetes/kustomize | no |
| 1011 | /admin/install/kubernetes/scale | /admin/deploy/kubernetes/scale | 0 | 1 more → /self-hosted/deploy/kubernetes/scale | no |
| 1023 | /admin/install/kubernetes/overlays | /admin/deploy/kubernetes/configure | 0 | 1 more → /self-hosted/deploy/kubernetes/configure | no |
| 1031 | /admin/install/docker-compose/digitalocean | /admin/deploy/docker-compose/digitalocean | 0 | 1 more → /self-hosted/deploy/docker-compose/digitalocean | no |
| 1035 | /admin/install/docker-compose/google_cloud | /admin/deploy/docker-compose/google_cloud | 0 | 2 more → /self-hosted/deploy/docker-compose/google-cloud | no |
| 1047 | /admin/install/docker-compose/operations | /admin/deploy/docker-compose#operations | 0 | 1 more → /self-hosted/deploy/docker-compose | no |
| 1051 | /admin/install/docker-compose/update | /admin/deploy/docker-compose#upgrade | 0 | 1 more → /self-hosted/deploy/docker-compose | no |
| 1055 | /admin/install/docker-compose/configure | /admin/deploy/docker-compose#configure | 0 | 1 more → /self-hosted/deploy/docker-compose | no |
| 1079 | /admin/install/migrate-backup | /admin/deploy/migrate-backup | 0 | 1 more → /self-hosted/deploy/migrate-backup | no |
| 1083 | /admin/install/resource_estimator | /admin/deploy/resource_estimator | 0 | 2 more → /self-hosted/deploy/resource-estimator | no |
| 1091 | /admin/deploy/cluster | /admin/deploy | 0 | 1 more → /self-hosted/deploy | no |
| 1095 | /admin/deploy/docker | /self-hosted/deploy | 0 |  | yes |
| 1103 | /admin/deploy/managed | /cloud | 0 |  | yes |
| 1111 | /code_intelligence/explanations/auto_indexing_inference | /code_navigation/explanations/auto_indexing_inference | 0 | 3 more → /code-navigation/explanations/auto-indexing-inference | no |
| 1123 | /code_intelligence/explanations/introduction_to_code_intelligence | /code_navigation/explanations/introduction_to_code_navigation | 0 | 2 more → /code-navigation | no |
| 1136 | /code_intelligence/explanations/search_based_code_intelligence | /code_navigation/explanations/search_based_code_navigation | 0 | 3 more → /code-navigation/search-based-code-navigation | no |
| 1141 | /code_intelligence/explanations/uploads | /code_navigation/explanations/uploads | 0 | 2 more → /code-navigation/explanations/uploads | no |
| 1149 | /code_intelligence/explanations/diagrams | /code_navigation/explanations/diagrams | 0 |  | no |
| 1153 | /code_intelligence/explanations/diagrams/index-states.mermaid | /code_navigation/explanations/diagrams/index-states.mermaid | 0 |  | no |
| 1158 | /code_intelligence/explanations/diagrams/index-states.svg | /code_navigation/explanations/diagrams/index-states.svg | 0 |  | no |
| 1162 | /code_intelligence/explanations/diagrams/upload-states.mermaid | /code_navigation/explanations/diagrams/upload-states.mermaid | 0 |  | no |
| 1167 | /code_intelligence/explanations/diagrams/upload-states.svg | /code_navigation/explanations/diagrams/upload-states.svg | 0 |  | no |
| 1171 | /code_intelligence/apidocs | /code_navigation/apidocs | 0 |  | no |
| 1175 | /code_intelligence/how-to/adding_lsif_to_many_repos | /code_navigation/how-to/adding_lsif_to_many_repos | 0 | 3 more → /code-navigation/precise-code-navigation | no |
| 1179 | /code_intelligence/how-to/adding_lsif_to_workflows | /code_navigation/how-to/adding_lsif_to_workflows | 0 | 1 more → /code-search/code-navigation/how-to/adding_lsif_to_workflows | no |
| 1183 | /code_intelligence/how-to/configure_auto_indexing | /code_navigation/how-to/configure_auto_indexing | 0 | 3 more → /code-navigation/auto-indexing | no |
| 1187 | /code_intelligence/how-to/configure_data_retention | /code_navigation/how-to/configure_data_retention | 0 | 3 more → /code-navigation/auto-indexing | no |
| 1191 | /code_intelligence/how-to/enable_auto_indexing | /code_navigation/how-to/enable_auto_indexing | 0 | 3 more → /code-navigation/auto-indexing | no |
| 1213 | /code_intelligence/how-to | /code_navigation/how-to | 0 |  | no |
| 1217 | /code_intelligence/how-to/img/CodeReview.gif | /code_navigation/how-to/img/CodeReview.gif | 0 |  | no |
| 1221 | /code_intelligence/how-to/img/experimental-language-server-enable.png | /code_navigation/how-to/img/experimental-language-server-enable.png | 0 |  | no |
| 1226 | /code_intelligence/how-to/img/extension-example.gif | /code_navigation/how-to/img/extension-example.gif | 0 |  | no |
| 1230 | /code_intelligence/how-to/img/network-description.png | /code_navigation/how-to/img/network-description.png | 0 |  | no |
| 1234 | /code_intelligence/how-to/img/network-waterfall.png | /code_navigation/how-to/img/network-waterfall.png | 0 |  | no |
| 1238 | /code_intelligence/how-to/img/popover.png | /code_navigation/how-to/img/popover.png | 0 |  | no |
| 1242 | /code_intelligence/how-to/img/Symbols.png | /code_navigation/how-to/img/Symbols.png | 0 |  | no |
| 1246 | /code_intelligence/how-to/img/SymbolSidebar.png | /code_navigation/how-to/imgSymbolSidebar.png | 0 |  | no |
| 1250 | /code_intelligence/how-to/img/workflow.png | /code_navigation/how-to/img/workflow.png | 0 |  | no |
| 1254 | /code_intelligence/how-to/img | /code_navigation/how-to/img | 0 |  | no |
| 1258 | /code_intelligence/references/auto_indexing_configuration | /code_navigation/references/auto_indexing_configuration | 0 | 3 more → /code-navigation/auto-indexing-configuration | no |
| 1262 | /code_intelligence/references/envvars | /code_navigation/references/envvars | 0 | 2 more → /code-navigation/envvars | no |
| 1266 | /code_intelligence/references/faq | /code_navigation/references/faq | 0 |  | no |
| 1274 | /code_intelligence/references/precise_examples | /code_navigation/references/precise_examples | 0 | 3 more → /code-navigation/precise-code-navigation | no |
| 1278 | /code_intelligence/references/requirements | /code_navigation/references/requirements | 0 |  | no |
| 1282 | /code_intelligence/references/troubleshooting | /code_navigation/references/troubleshooting | 0 | 2 more → /code-navigation/troubleshooting | no |
| 1286 | /code_intelligence/references | /code_navigation/references | 0 |  | no |
| 1294 | /cody/autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1298 | /cody/autocomplete#code-autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1302 | /cody/autocomplete#what-is-cody-code-autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1306 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1310 | /cody/autocomplete#enabling-autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1318 | /cody/autocomplete#configuring-on-sourcegraph-enterprise | /cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance | 0 |  | yes |
| 1323 | /cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise | /cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance | 0 |  | yes |
| 1328 | /cody/autocomplete#accessing-autocomplete-logs | /cody/capabilities/autocomplete#access-autocomplete-logs | 0 |  | yes |
| 1332 | /cody/capabilities#access-autocomplete-logs | /cody/capabilities/autocomplete#access-autocomplete-logs | 0 |  | yes |
| 1336 | /cody#get-cody | /cody | 0 |  | yes |
| 1340 | /cody#getting-started | /cody | 0 |  | yes |
| 1344 | /cody#features | /cody#main-features | 0 |  | yes |
| 1348 | /cody#chatbot-that-knows-your-code | /cody | 0 |  | yes |
| 1352 | /cody#fix-code-inline | /cody/capabilities | 0 |  | yes |
| 1356 | /cody/capabilities#fix-code-inline | /cody/capabilities | 0 |  | yes |
| 1360 | /cody#recipes | /cody/capabilities/commands | 0 | 1 more → /cody/capabilities/prompts | no |
| 1364 | /cody/capabilities#cody-recipes | /cody/capabilities/commands | 0 | 1 more → /cody/capabilities/prompts | no |
| 1368 | /cody#autocomplete | /cody/capabilities/autocomplete | 0 |  | yes |
| 1380 | /cody/explanations/installing_vs_code | /cody/clients/install-vscode | 0 |  | yes |
| 1384 | /cody/overview/install-vscode | /cody/clients/install-vscode | 0 |  | yes |
| 1392 | /cody/explanations/installing_jetbrains | /cody/clients/install-jetbrains | 0 |  | yes |
| 1396 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | 0 |  | yes |
| 1404 | /cody/overview/app | /cody/clients/app | 0 |  | no |
| 1408 | /cody/explanations/enabling_cody | /cody/clients/cody-with-sourcegraph | 0 |  | yes |
| 1420 | /cody/overview/enable-cody-enterprise | /cody/clients/enable-cody-enterprise | 0 |  | yes |
| 1424 | /cody/quickstart#quickstart-for-cody-in-vs-code | /cody/quickstart | 0 |  | yes |
| 1428 | /cody/quickstart#introduction | /cody/quickstart#cody-quickstart | 0 |  | yes |
| 1432 | /cody/quickstart#getting-started-with-the-cody-extension-and-recipes | /cody/quickstart#getting-started-with-cody-extension-and-commands | 0 |  | yes |
| 1437 | /cody/quickstart#generate-a-unit-test | /cody/quickstart#1-generate-a-unit-test | 0 |  | yes |
| 1441 | /cody/quickstart#ask-cody-to-pull-reference-documentation | /cody/quickstart#3-ask-cody-to-pull-reference-documentation | 0 |  | yes |
| 1446 | /cody/quickstart#ask-cody-to-write-context-aware-code | /cody/quickstart#working-with-the-cody-extension | 0 |  | yes |
| 1450 | /cody/overview/install-jetbrains#introduction | /cody/clients/install-jetbrains | 0 |  | yes |
| 1458 | /cody/overview/install-jetbrains#requirements | /cody/clients/install-jetbrains#prerequisites | 0 |  | yes |
| 1462 | /cody/overview/install-jetbrains#prerequisites | /cody/clients/install-jetbrains#prerequisites | 0 |  | yes |
| 1466 | /cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | /cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | 0 |  | yes |
| 1471 | /cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional | /cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | 0 |  | yes |
| 1476 | /cody/overview/install-jetbrains#get-started-with-cody | /cody/clients/install-jetbrains | 0 |  | yes |
| 1484 | /cody/overview/install-vscode#introduction | /cody/clients/install-vscode | 0 |  | yes |
| 1492 | /cody/overview/install-vscode#requirements | /cody/clients/install-vscode#prerequisites | 0 |  | yes |
| 1496 | /cody/overview/install-vscode#prerequisites | /cody/clients/install-vscode#prerequisites | 0 |  | yes |
| 1500 | /cody/overview/install-vscode#optional-enable-code-graph-context-for-context-aware-answers | /cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional | 0 |  | yes |
| 1505 | /cody/overview/install-vscode#enable-code-graph-context-for-context-aware-answers-optional | /cody/clients/install-vscode#enable-code-graph-context-for-context-aware-answers-optional | 0 |  | yes |
| 1510 | /cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly | /cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider | 0 |  | yes |
| 1515 | /cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider | /cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider | 0 |  | yes |
| 1520 | /cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users | /cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users | 0 |  | yes |
| 1525 | /cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users | /cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users | 0 |  | yes |
| 1530 | /cody/overview/enable-cody-enterprise#turning-cody-off | /cody/clients/enable-cody-enterprise#disable-cody | 0 |  | yes |
| 1534 | /cody/overview/enable-cody-enterprise#disable-cody | /cody/clients/enable-cody-enterprise#disable-cody | 0 |  | yes |
| 1538 | /cody/explanations | /cody/core-concepts | 0 |  | yes |
| 1542 | /cody/explanations/code_graph_context#embeddings | /cody/embeddings | 0 |  | no |
| 1546 | /cody/core-concepts/embeddings#embeddings | /cody/embeddings | 0 |  | no |
| 1550 | /cody/explanations/code_graph_context#configuring-embeddings | /cody/embeddings/configure-embeddings | 0 |  | no |
| 1558 | /cody/explanations/code_graph_context#filtering-files-from-embeddings | /cody/embeddings/manage-embeddings#filter-files-from-embeddings | 0 |  | no |
| 1563 | /cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings | /cody/embeddings/manage-embeddings#filter-files-from-embeddings | 0 |  | no |
| 1568 | /cody/explanations/code_graph_context#storing-embedding-indexes | /cody/embeddings/manage-embeddings#store-embedding-indexes | 0 |  | no |
| 1573 | /cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes | /cody/embeddings/manage-embeddings#store-embedding-indexes | 0 |  | no |
| 1578 | /cody/explanations/code_graph_context#using-s3 | /cody/embeddings/manage-embeddings#using-s3 | 0 |  | no |
| 1582 | /cody/core-concepts/embeddings/manage-embeddings#using-s3 | /cody/embeddings/manage-embeddings#using-s3 | 0 |  | no |
| 1586 | /cody/explanations/code_graph_context#using-gcs | /cody/embeddings/manage-embeddings#using-gcs | 0 |  | no |
| 1590 | /cody/core-concepts/embeddings/manage-embeddings#using-gcs | /cody/embeddings/manage-embeddings#using-gcs | 0 |  | no |
| 1594 | /cody/explanations/code_graph_context#provisioning-buckets | /cody/embeddings/manage-embeddings#provisioning-buckets | 0 |  | no |
| 1598 | /cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets | /cody/embeddings/manage-embeddings#provisioning-buckets | 0 |  | no |
| 1602 | /cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service | /cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | 0 |  | no |
| 1607 | /cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | /cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | 0 |  | no |
| 1612 | /cody/explanations/code_graph_context#incremental-embeddings | /cody/embeddings#incremental-embeddings | 0 |  | no |
| 1616 | /cody/core-concepts/embeddings#incremental-embeddings | /cody/embeddings#incremental-embeddings | 0 |  | no |
| 1620 | /cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings | /cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | 0 |  | no |
| 1625 | /cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | /cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | 0 |  | no |
| 1630 | /cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly | /cody/embeddings#third-party-embeddings-provider | 0 |  | no |
| 1634 | /cody/core-concepts/embeddings#third-party-embeddings-provider | /cody/embeddings#third-party-embeddings-provider | 0 |  | no |
| 1638 | /cody/explanations/code_graph_context#openai | /cody/embeddings#openai | 0 |  | no |
| 1642 | /cody/core-concepts/embeddings#openai | /cody/embeddings#openai | 0 |  | no |
| 1646 | /cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span | /cody/embeddings#azure-openai | 0 |  | no |
| 1650 | /cody/core-concepts/embeddings#azure-openai | /cody/embeddings#azure-openai | 0 |  | no |
| 1654 | /cody/explanations/code_graph_context#disabling-embeddings | /cody/embeddings#disable-embeddings | 0 |  | no |
| 1658 | /cody/core-concepts/embeddings#disable-embeddings | /cody/embeddings#disable-embeddings | 0 |  | no |
| 1662 | /cody/explanations/code_graph_context#configuring-the-global-policy-match-limit | /cody/embeddings/usage-and-limits#configure-global-policy-match-limit | 0 |  | no |
| 1667 | /cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit | /cody/embeddings/usage-and-limits#configure-global-policy-match-limit | 0 |  | no |
| 1672 | /cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated | /cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | 0 |  | no |
| 1677 | /cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | /cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | 0 |  | no |
| 1686 | /cody/core-concepts/embeddings/embedding-index | /cody/embeddings/embedding-index | 0 |  | no |
| 1690 | /cody/explanations/indexing#generate-embeddings-index | /cody/embeddings/embedding-index#generate-embeddings-index | 0 |  | no |
| 1695 | /cody/core-concepts/embeddings/embedding-index#generate-embeddings-index | /cody/embeddings/embedding-index#generate-embeddings-index | 0 |  | no |
| 1700 | /cody/explanations/indexing#sourcegraph-enterprise | /cody/embeddings/embedding-index#sourcegraph-enterprise | 0 |  | no |
| 1704 | /cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise | /cody/embeddings/embedding-index#sourcegraph-enterprise | 0 |  | no |
| 1708 | /cody/explanations/indexing#sourcegraph-com | /cody/embeddings/embedding-index#sourcegraphcom | 0 |  | no |
| 1712 | /cody/core-concepts/embeddings/embedding-index#sourcegraph-com | /cody/embeddings/embedding-index#sourcegraphcom | 0 |  | no |
| 1716 | /cody/explanations/indexing#enable-codebase-aware-answers | /cody/embeddings/embedding-index#enable-codebase-aware-answers | 0 |  | no |
| 1721 | /cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers | /cody/embeddings/embedding-index#enable-codebase-aware-answers | 0 |  | no |
| 1726 | /cody/explanations/indexing#extension-settings | /cody/embeddings/embedding-index#cody-vs-code-extension-settings | 0 |  | no |
| 1731 | /cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings | /cody/embeddings/embedding-index#cody-vs-code-extension-settings | 0 |  | no |
| 1736 | /cody/explanations/indexing#manual-configuration | /cody/embeddings/embedding-index#manual-configuration | 0 |  | no |
| 1740 | /cody/core-concepts/embeddings/embedding-index#manual-configuration | /cody/embeddings/embedding-index#manual-configuration | 0 |  | no |
| 1744 | /cody/explanations/indexing#settings-json | /cody/embeddings/embedding-index#settingsjson | 0 |  | no |
| 1748 | /cody/core-concepts/embeddings/embedding-index#settings-json | /cody/embeddings/embedding-index#settingsjson | 0 |  | no |
| 1756 | /cody/core-concepts/embeddings/configure-embeddings#policies | /cody/embeddings/configure-embeddings#policies | 0 |  | no |
| 1760 | /cody/explanations/policies#how-to-create-an-embeddings-policy | /cody/embeddings/configure-embeddings#create-an-embeddings-policy | 0 |  | no |
| 1765 | /cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy | /cody/embeddings/configure-embeddings#create-an-embeddings-policy | 0 |  | no |
| 1770 | /cody/explanations/policies#example-1 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | 0 |  | no |
| 1775 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | 0 |  | no |
| 1780 | /cody/explanations/policies#example-2 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | 0 |  | no |
| 1790 | /cody/explanations/policies#example-3 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | 0 |  | no |
| 1800 | /cody/explanations/policies#lifecycle-of-an-embeddings-policy | /cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | 0 |  | no |
| 1805 | /cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | /cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | 0 |  | no |
| 1810 | /cody/explanations/schedule_one_off_embeddings_jobs | /cody/embeddings/configure-embeddings#schedule-embeddings-jobs | 0 |  | no |
| 1815 | /cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs | /cody/embeddings/configure-embeddings#schedule-embeddings-jobs | 0 |  | no |
| 1824 | /cody/explanations/cody_gateway | /cody/core-concepts/cody_gateway | 0 | 2 more → /model-provider | no |
| 1832 | /cody/core-concepts/cody_clients | /cody/clients | 0 |  | yes |
| 1836 | /cody/overview#getting-started | /cody/clients | 0 |  | yes |
| 1844 | /cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise | /cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise | 0 | 1 more → /model-provider | no |
| 1849 | /cody/core-concepts/cody_gateway#configuring-custom-models | /cody/core-concepts/cody-gateway#configuring-custom-models | 0 | 1 more → /model-provider | no |
| 1854 | /cody/core-concepts/cody_gateway#rate-limits-and-quotas | /cody/core-concepts/cody-gateway#rate-limits-and-quotas | 0 | 1 more → /model-provider | no |
| 1858 | /cody/core-concepts/cody_gateway#privacy-and-security | /cody/core-concepts/cody-gateway#privacy-and-security | 0 | 1 more → /model-provider | no |
| 1877 | /code_search/tutorials/examples | /code-search/queries/examples | 0 |  | yes |
| 1887 | /code_search/how-to | /code-search/working/saved_searches | 0 | 1 more → /code-search/working/saved-searches | no |
| 1897 | /code_search/how-to/snippets | /code-search/working/snippets | 0 |  | yes |
| 1912 | /code_search/how-to/search-jobs | /code-search/types/search-jobs | 0 |  | yes |
| 1917 | /code_search/examples | /code-search/queries/examples | 0 |  | yes |
| 1922 | /code_search/explanations | /code-search/working/saved_searches | 0 | 1 more → /code-search/working/saved-searches | no |
| 1937 | /code_search/explanations/tips | /code-search/features | 0 |  | yes |
| 1947 | /code_search/reference/queries#search-pattern-syntax | /code-search/queries#search-pattern-syntax | 0 |  | yes |
| 1969 | /code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally | /code-search/code-navigation/auto_indexing#applying-indexing-policies-globally | 0 | 2 more → /code-navigation/auto-indexing | no |
| 1981 | /code_navigation/how-to/index_a_go_repository#automated-indexing | /code-search/code-navigation/how-to/index_a_go_repository#automated-indexing | 0 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 1987 | /code_navigation/how-to/index_a_go_repository#github-actions | /code-search/code-navigation/how-to/index_a_go_repository#github-actions | 0 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 1993 | /code_navigation/how-to/index_a_go_repository#circleci | /code-search/code-navigation/how-to/index_a_go_repository#circleci | 0 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 1999 | /code_navigation/how-to/index_a_go_repository#travis-ci | /code-search/code-navigation/how-to/index_a_go_repository#travis-ci | 0 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 2005 | /code_navigation/how-to/index_a_go_repository#manual-indexing | /code-search/code-navigation/how-to/index_a_go_repository#manual-indexing | 0 | 2 more → /code-navigation/how-to/index-a-go-repository | no |
| 2017 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly | 0 | 2 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 2023 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags | 0 | 2 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 2029 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-the-scip-typescript-docker-image | 0 | 2 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 2035 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#one-off-indexing-using-scip-typescript-locally | 0 | 2 more → /code-navigation/how-to/index-a-typescript-and-javascript-repository | no |
| 2041 | /code_navigation/how-to/adding_lsif_to_many_repos | /code-search/code-navigation/precise_code_navigation | 0 | 2 more → /code-navigation/precise-code-navigation | no |
| 2052 | /code_navigation/how-to/adding_lsif_to_workflows#language-specific-guides | /code-search/code-navigation/how-to/adding_lsif_to_workflows#language-specific-guides | 0 |  | no |
| 2058 | /code_navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration | /code-search/code-navigation/how-to/adding_lsif_to_workflows#benefits-of-ci-integration | 0 |  | no |
| 2064 | /code_navigation/how-to/adding_lsif_to_workflows#using-indexer-containers | /code-search/code-navigation/how-to/adding_lsif_to_workflows#using-indexer-containers | 0 |  | no |
| 2070 | /code_navigation/how-to/adding_lsif_to_workflows#github-action-examples | /code-search/code-navigation/how-to/adding_lsif_to_workflows#github-action-examples | 0 |  | no |
| 2076 | /code_navigation/how-to/adding_lsif_to_workflows#circle-ci-examples | /code-search/code-navigation/how-to/adding_lsif_to_workflows#circle-ci-examples | 0 |  | no |
| 2082 | /code_navigation/how-to/adding_lsif_to_workflows#travis-ci-examples | /code-search/code-navigation/how-to/adding_lsif_to_workflows#travis-ci-examples | 0 |  | no |
| 2088 | /code_navigation/how-to/adding_lsif_to_workflows#ci-from-scratch | /code-search/code-navigation/how-to/adding_lsif_to_workflows#ci-from-scratch | 0 |  | no |
| 2094 | /code_navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom | /code-search/code-navigation/how-to/adding_lsif_to_workflows#uploading-indexes-to-sourcegraphcom | 0 |  | no |
| 2100 | /code_navigation/how-to/enable_auto_indexing | /code-search/code-navigation/auto_indexing#enable-auto-indexing | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2106 | /code_navigation/how-to/enable_auto_indexing#deploy-executors | /code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2112 | /code_navigation/how-to/enable_auto_indexing#enable-index-job-scheduling | /code-search/code-navigation/auto_indexing#enable-auto-indexing#enable-index-job-scheduling | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2118 | /code_navigation/how-to/enable_auto_indexing#tune-the-index-scheduler | /code-search/code-navigation/auto_indexing#enable-auto-indexing#tune-the-index-scheduler | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2124 | /code_navigation/how-to/configure_auto_indexing | /code-search/code-navigation/auto_indexing#configure-auto-indexing | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2130 | /code_navigation/how-to/configure_auto_indexing#configure-auto-indexing-policies | /code-search/code-navigation/auto_indexing#configure-auto-indexing-policies | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2136 | /code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-globally | /code-search/code-navigation/auto_indexing#applying-indexing-policies-globally | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2142 | /code_navigation/how-to/configure_auto_indexing#applying-indexing-policies-to-a-specific-repository | /code-search/code-navigation/auto_indexing#applying-indexing-policies-to-a-specific-repository | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2148 | /code_navigation/how-to/configure_auto_indexing#explicit-index-job-configuration | /code-search/code-navigation/auto_indexing#explicit-index-job-configuration | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2154 | /code_navigation/how-to/configure_auto_indexing#private-repositories-and-packages-configuration | /code-search/code-navigation/auto_indexing#private-repositories-and-packages-configuration | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2160 | /code_navigation/how-to/configure_auto_indexing#go | /code-search/code-navigation/auto_indexing#go | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2165 | /code_navigation/how-to/configure_auto_indexing#typescriptjavascript | /code-search/code-navigation/auto_indexing#typescriptjavascript | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2171 | /code_navigation/how-to/policies_resource_usage_best_practices | /code-search/code-navigation/how-to/policies_resource_usage_best_practices | 0 | 2 more → /code-navigation/how-to/policies-resource-usage-best-practices | no |
| 2177 | /code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | /code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | 0 | 2 more → /code-navigation/how-to/combining-scip-uploads-from-ci-cd-and-auto-indexing | no |
| 2188 | /code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise | /code-search/code-navigation#code-navigation-types | 0 | 1 more → /code-navigation | no |
| 2198 | /code_navigation/explanations/precise_code_navigation#why-are-my-results-sometimes-incorrect | /code-search/code-navigation/troubleshooting#why-are-my-results-sometimes-incorrect | 0 | 1 more → /code-navigation/troubleshooting | no |
| 2209 | /code_navigation/explanations/uploads#lifecycle-of-an-upload | /code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload | 0 | 1 more → /code-navigation/explanations/uploads | no |
| 2215 | /code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui | /code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui | 0 | 1 more → /code-navigation/explanations/uploads | no |
| 2221 | /code_navigation/explanations/uploads#repository-commit-graph | /code-search/code-navigation/explanations/uploads#repository-commit-graph | 0 | 1 more → /code-navigation/explanations/uploads | no |
| 2227 | /code_navigation/explanations/search_based_code_navigation | /code-search/code-navigation/search_based_code_navigation | 0 | 2 more → /code-navigation/search-based-code-navigation | no |
| 2233 | /code_navigation/explanations/search_based_code_navigation#how-does-it-work | /code-search/code-navigation/search_based_code_navigation#how-does-it-work | 0 | 2 more → /code-navigation/search-based-code-navigation | no |
| 2239 | /code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply | /code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply | 0 | 2 more → /code-navigation/search-based-code-navigation | no |
| 2250 | /code_navigation/explanations/features#popover | /code-search/code-navigation/features#popover | 0 | 1 more → /code-navigation/features | no |
| 2254 | /code_navigation/explanations/features#go-to-definition | /code-search/code-navigation/features#go-to-definition | 0 | 1 more → /code-navigation/features | no |
| 2258 | /code_navigation/explanations/features#find-references | /code-search/code-navigation/features#find-references | 0 | 1 more → /code-navigation/features | no |
| 2262 | /code_navigation/explanations/features#dependency-navigation | /code-search/code-navigation/features#dependency-navigation | 0 | 1 more → /code-navigation/features | no |
| 2267 | /code_navigation/explanations/features#find-implementations | /code-search/code-navigation/features#find-implementations | 0 | 1 more → /code-navigation/features | no |
| 2273 | /code_navigation/explanations/features#perform-an-action | /code-search/code-navigation/features#perform-an-action | 0 | 1 more → /code-navigation/features | no |
| 2278 | /code_navigation/explanations/features#symbol-search | /code-search/types/symbol | 0 |  | yes |
| 2283 | /code_navigation/explanations/rockskip | /code-search/code-navigation/rockskip | 0 | 1 more → /code-navigation/rockskip | no |
| 2288 | /code_navigation/explanations/rockskip#when-should-i-use-rockskip | /code-search/code-navigation/rockskip#when-should-i-use-rockskip | 0 | 1 more → /code-navigation/rockskip | no |
| 2294 | /code_navigation/explanations/rockskip#how-do-i-enable-rockskip | /code-search/code-navigation/rockskip#how-do-i-enable-rockskip | 0 | 1 more → /code-navigation/rockskip | no |
| 2300 | /code_navigation/explanations/rockskip#how-long-does-indexing-take | /code-search/code-navigation/rockskip#how-long-does-indexing-take | 0 | 1 more → /code-navigation/rockskip | no |
| 2306 | /code_navigation/explanations/rockskip#what-resources-does-rockskip-use | /code-search/code-navigation/rockskip#what-resources-does-rockskip-use | 0 | 1 more → /code-navigation/rockskip | no |
| 2312 | /code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status | /code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status | 0 | 1 more → /code-navigation/rockskip | no |
| 2318 | /code_navigation/explanations/rockskip#when-is-indexing-triggered | /code-search/code-navigation/rockskip#when-is-indexing-triggered | 0 | 1 more → /code-navigation/rockskip | no |
| 2330 | /code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema | /code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2336 | /code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings | /code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2342 | /code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information | /code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2348 | /code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli | /code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2354 | /code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features | /code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2365 | /code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2371 | /code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2377 | /code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui | 0 | 2 more → /code-navigation/auto-indexing | no |
| 2383 | /code_navigation/explanations/auto_indexing_inference | /code-search/code-navigation/explanations/auto_indexing_inference | 0 | 2 more → /code-navigation/explanations/auto-indexing-inference | no |
| 2389 | /code_navigation/explanations/auto_indexing_inference#go | /code-search/code-navigation/explanations/auto_indexing_inference#go | 0 | 2 more → /code-navigation/explanations/auto-indexing-inference | no |
| 2395 | /code_navigation/explanations/auto_indexing_inference#typescript | /code-search/code-navigation/explanations/auto_indexing_inference#typescript | 0 | 2 more → /code-navigation/explanations/auto-indexing-inference | no |
| 2401 | /code_navigation/explanations/auto_indexing_inference#java | /code-search/code-navigation/explanations/auto_indexing_inference#java | 0 | 2 more → /code-navigation/explanations/auto-indexing-inference | no |
| 2407 | /code_navigation/explanations/auto_indexing_inference#rust | /code-search/code-navigation/explanations/auto_indexing_inference#rust | 0 | 2 more → /code-navigation/explanations/auto-indexing-inference | no |
| 2413 | /code_navigation/references/troubleshooting | /code-search/code-navigation/troubleshooting | 0 | 1 more → /code-navigation/troubleshooting | no |
| 2418 | /code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence | /code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence | 0 | 1 more → /code-navigation/troubleshooting | no |
| 2424 | /code_navigation/references/troubleshooting#gathering-evidence | /code-search/code-navigation/troubleshooting#gathering-evidence | 0 | 1 more → /code-navigation/troubleshooting | no |
| 2436 | /code_navigation/references/indexers#quick-reference | /code-search/code-navigation/writing_an_indexer#quick-reference | 0 | 2 more → /code-navigation/writing-an-indexer | no |
| 2448 | /code_navigation/references/envvars | /code-search/code-navigation/envvars | 0 | 1 more → /code-navigation/envvars | no |
| 2453 | /code_navigation/references/envvars#frontend | /code-search/code-navigation/envvars#frontend | 0 | 1 more → /code-navigation/envvars | no |
| 2458 | /code_navigation/references/envvars#worker | /code-search/code-navigation/envvars#worker | 0 | 1 more → /code-navigation/envvars | no |
| 2463 | /code_navigation/references/envvars#precise-code-intel-worker | /code-search/code-navigation/envvars#precise-code-intel-worker | 0 | 1 more → /code-navigation/envvars | no |
| 2469 | /code_navigation/references/auto_indexing_configuration | /code-search/code-navigation/auto_indexing_configuration | 0 | 2 more → /code-navigation/auto-indexing-configuration | no |
| 2474 | /code_navigation/references/auto_indexing_configuration#keys | /code-search/code-navigation/auto_indexing_configuration#keys | 0 | 2 more → /code-navigation/auto-indexing-configuration | no |
| 2480 | /code_navigation/references/auto_indexing_configuration#index-job-object | /code-search/code-navigation/auto_indexing_configuration#index-job-object | 0 | 2 more → /code-navigation/auto-indexing-configuration | no |
| 2486 | /code_navigation/references/auto_indexing_configuration#docker-step-object | /code-search/code-navigation/auto_indexing_configuration#docker-step-object | 0 | 2 more → /code-navigation/auto-indexing-configuration | no |
| 2492 | /code_navigation/references/inference_configuration | /code-search/code-navigation/inference_configuration | 0 | 2 more → /code-navigation/inference-configuration | no |
| 2504 | /batch_changes/explanations | /batch-changes/ | 0 |  | yes |
| 2512 | /batch_changes/explanations/permissions_in_batch_changes#code-host-interactions-in-batch-changes | /batch-changes/permissions-in-batch-changes#code-host-interactions-in-batch-changes | 0 |  | yes |
| 2517 | /batch_changes/explanations/permissions_in_batch_changes#repository-permissions-for-batch-changes | /batch-changes/permissions-in-batch-changes#repository-permissions-for-batch-changes | 0 |  | yes |
| 2522 | /batch_changes/explanations/permissions_in_batch_changes#disabling-batch-changes-for-non-site-admin-users | /batch-changes/permissions-in-batch-changes#disabling-batch-changes-for-non-site-admin-users | 0 |  | yes |
| 2527 | /batch_changes/explanations/batch_changes_design | /batch-changes/design | 0 |  | yes |
| 2535 | /batch_changes/explanations/reexecuting_batch_specs_multiple_times | /batch-changes/reexecuting-batch-specs-multiple-times | 0 |  | yes |
| 2551 | /batch_changes/tutorials/updating_go_import_statements | /batch-changes/updating-go-import-statements | 0 |  | yes |
| 2555 | /batch_changes/tutorials/update_base_images_in_dockerfiles | /batch-changes/update-base-images-in-dockerfiles | 0 |  | yes |
| 2559 | /batch_changes/tutorials/search_and_replace_specific_terms | /batch-changes/search-and-replace-specific-terms | 0 |  | yes |
| 2571 | /batch_changes/how-tos/publishing_changesets#publishing-changesets | /batch-changes/publishing-changesets#publishing-changesets | 0 |  | yes |
| 2576 | /batch_changes/how-tos/updating_a_batch_change | /batch-changes/update-a-batch-change | 0 |  | yes |
| 2580 | /batch_changes/how-tos/updating_a_batch_change#removing-changesets | /batch-changes/update-a-batch-change#removing-changesets | 0 |  | yes |
| 2584 | /batch_changes/how-tos/viewing_batch_changes | /batch-changes/create-a-batch-change#viewing-batch-changes | 0 |  | yes |
| 2589 | /batch_changes/how-tos/viewing_batch_changes#filtering-batch-changes | /batch-changes/create-a-batch-change#filtering-batch-changes | 0 |  | yes |
| 2594 | /batch_changes/how-tos/viewing_batch_changes#filtering-changesets | /batch-changes/create-a-batch-change#filtering-changesets | 0 |  | yes |
| 2599 | /batch_changes/how-tos/tracking_existing_changesets | /batch-changes/tracking-existing-changesets | 0 |  | yes |
| 2603 | /batch_changes/how-tos/closing_or_deleting_a_batch_change | /batch-changes/delete-a-batch-change | 0 |  | yes |
| 2611 | /batch_changes/how-tos/configuring_credentials#personal-access-tokens | /batch-changes/configuring-credentials#personal-access-tokens | 0 |  | yes |
| 2616 | /batch_changes/how-tos/configuring_credentials#global-service-account-tokens | /batch-changes/configuring-credentials#global-service-account-tokens | 0 |  | yes |
| 2621 | /batch_changes/how-tos/handling_errored_changesets | /batch-changes/handling-errored-changesets | 0 |  | yes |
| 2625 | /batch_changes/how-tos/bulk_operations_on_changesets | /batch-changes/bulk-operations-on-changesets | 0 |  | yes |
| 2629 | /batch_changes/how-tos/server_side_file_mounts | /batch-changes/server-side#using-file-mounts-with-server-side-execution | 0 |  | yes |
| 2634 | /batch_changes/how-tos/creating_changesets_per_project_in_monorepos | /batch-changes/creating-changesets-per-project-in-monorepos | 0 |  | yes |
| 2644 | /batch_changes/how-tos/site_admin_configuration | /batch-changes/site-admin-configuration | 0 |  | yes |
| 2652 | /batch_changes/references/requirements#batch-changes-effect-on-code-host-rate-limits | /batch-changes/requirements#batch-changes-effect-on-code-host-rate-limits | 0 |  | yes |
| 2661 | /batch_changes/references/batch_spec_yaml_reference#name | /batch-changes/batch-spec-yaml-reference#name | 0 |  | yes |
| 2665 | /batch_changes/references/batch_spec_yaml_reference#description | /batch-changes/batch-spec-yaml-reference#description | 0 |  | yes |
| 2669 | /batch_changes/references/batch_spec_yaml_reference#on | /batch-changes/batch-spec-yaml-reference#on | 0 |  | yes |
| 2673 | /batch_changes/references/batch_spec_yaml_reference#onrepositoriesmatchingquery | /batch-changes/batch-spec-yaml-reference#onrepositoriesmatchingquery | 0 |  | yes |
| 2678 | /batch_changes/references/batch_spec_yaml_reference#onrepository | /batch-changes/batch-spec-yaml-reference#onrepository | 0 |  | yes |
| 2682 | /batch_changes/references/batch_spec_yaml_reference#steps | /batch-changes/batch-spec-yaml-reference#steps | 0 |  | yes |
| 2686 | /batch_changes/references/batch_spec_yaml_reference#stepsrun | /batch-changes/batch-spec-yaml-reference#stepsrun | 0 |  | yes |
| 2690 | /batch_changes/references/batch_spec_yaml_reference#stepscontainer | /batch-changes/batch-spec-yaml-reference#stepscontainer | 0 |  | yes |
| 2694 | /batch_changes/references/batch_spec_yaml_reference#stepsenv | /batch-changes/batch-spec-yaml-reference#stepsenv | 0 |  | yes |
| 2698 | /batch_changes/references/batch_spec_yaml_reference#stepsfiles | /batch-changes/batch-spec-yaml-reference#stepsfiles | 0 |  | yes |
| 2702 | /batch_changes/references/batch_spec_yaml_reference#stepsoutputs | /batch-changes/batch-spec-yaml-reference#stepsoutputs | 0 |  | yes |
| 2706 | /batch_changes/references/batch_spec_yaml_reference#stepsoutputsnamevalue | /batch-changes/batch-spec-yaml-reference#stepsoutputsnamevalue | 0 |  | yes |
| 2711 | /batch_changes/references/batch_spec_yaml_reference#stepsoutputsnameformat | /batch-changes/batch-spec-yaml-reference#stepsoutputsnameformat | 0 |  | yes |
| 2716 | /batch_changes/references/batch_spec_yaml_reference#stepsif | /batch-changes/batch-spec-yaml-reference#stepsif | 0 |  | yes |
| 2720 | /batch_changes/references/batch_spec_yaml_reference#stepsmount | /batch-changes/batch-spec-yaml-reference#stepsmount | 0 |  | yes |
| 2724 | /batch_changes/references/batch_spec_yaml_reference#importchangesets | /batch-changes/batch-spec-yaml-reference#importchangesets | 0 |  | yes |
| 2729 | /batch_changes/references/batch_spec_yaml_reference#importchangesetsrepository | /batch-changes/batch-spec-yaml-reference#importchangesetsrepository | 0 |  | yes |
| 2734 | /batch_changes/references/batch_spec_yaml_reference#importchangesetsexternalids | /batch-changes/batch-spec-yaml-reference#importchangesetsexternalids | 0 |  | yes |
| 2739 | /batch_changes/references/batch_spec_yaml_reference#changesettemplate | /batch-changes/batch-spec-yaml-reference#changesettemplate | 0 |  | yes |
| 2744 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatetitle | /batch-changes/batch-spec-yaml-reference#changesettemplatetitle | 0 |  | yes |
| 2749 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatebody | /batch-changes/batch-spec-yaml-reference#changesettemplatebody | 0 |  | yes |
| 2754 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatebranch | /batch-changes/batch-spec-yaml-reference#changesettemplatebranch | 0 |  | yes |
| 2759 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatecommit | /batch-changes/batch-spec-yaml-reference#changesettemplatecommit | 0 |  | yes |
| 2764 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitmessage | /batch-changes/batch-spec-yaml-reference#changesettemplatecommitmessage | 0 |  | yes |
| 2769 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatecommitauthor | /batch-changes/batch-spec-yaml-reference#changesettemplatecommitauthor | 0 |  | yes |
| 2774 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatepublished | /batch-changes/batch-spec-yaml-reference#changesettemplatepublished | 0 |  | yes |
| 2780 | /batch_changes/references/batch_spec_yaml_reference#changesettemplatefork | /batch-changes/batch-spec-yaml-reference#changesettemplatefork | 0 |  | yes |
| 2785 | /batch_changes/references/batch_spec_yaml_reference#transformchanges | /batch-changes/batch-spec-yaml-reference#transformchanges | 0 |  | yes |
| 2790 | /batch_changes/references/batch_spec_yaml_reference#transformchangesgroup | /batch-changes/batch-spec-yaml-reference#transformchangesgroup | 0 |  | yes |
| 2795 | /batch_changes/references/batch_spec_yaml_reference#transformchangesgroupdirectory | /batch-changes/batch-spec-yaml-reference#transformchangesgroupdirectory | 0 |  | yes |
| 2800 | /batch_changes/references/batch_spec_yaml_reference#transformchangesgroupbranch | /batch-changes/batch-spec-yaml-reference#transformchangesgroupbranch | 0 |  | yes |
| 2805 | /batch_changes/references/batch_spec_yaml_reference#transformchangesgrouprepository | /batch-changes/batch-spec-yaml-reference#transformchangesgrouprepository | 0 |  | yes |
| 2810 | /batch_changes/references/batch_spec_yaml_reference#workspaces | /batch-changes/batch-spec-yaml-reference#workspaces | 0 |  | yes |
| 2814 | /batch_changes/references/batch_spec_yaml_reference#workspacesrootatlocationof | /batch-changes/batch-spec-yaml-reference#workspacesrootatlocationof | 0 |  | yes |
| 2819 | /batch_changes/references/batch_spec_yaml_reference#workspacesin | /batch-changes/batch-spec-yaml-reference#workspacesin | 0 |  | yes |
| 2823 | /batch_changes/references/batch_spec_yaml_reference#workspacesonlyfetchworkspace | /batch-changes/batch-spec-yaml-reference#workspacesonlyfetchworkspace | 0 |  | yes |
| 2832 | /batch_changes/references/batch_spec_templating#fields-with-template-support | /batch-changes/batch-spec-templating#fields-with-template-support | 0 |  | yes |
| 2841 | /batch_changes/references/batch_spec_cheat_sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax | /batch-changes/batch-spec-cheat-sheet#write-a-github-actions-workflow-that-includes-github-expression-syntax | 0 |  | yes |
| 2862 | /admin/code_hosts/bitbucketserver | /integration/bitbucket_server | 0 | 1 more → /integration/bitbucket-server | no |
| 3606 | /cody/clients/enable-cody-enterprise#using-a-third-party-llm-provider | /cody/clients/enable-cody-enterprise#supported-models-and-model-providers | 0 |  | yes |
| 4479 | /cody/clients/install-eclipse | /cody/clients | 0 |  | yes |
| 4501 | /pricing/enterprise | /pricing/plans/enterprise | 0 |  | yes |
| 4509 | /pricing/billing-faqs | /pricing/faqs | 0 |  | yes |
| 4524 | /admin/pricing#how-are-active-users-calculated-for-sourcegraph-cody | /cody/usage-and-pricing#billing-faqs-for-cody-enterprise | 0 | 1 more → https://sourcegraph.com/pricing | no |
| 4529 | /admin/pricing#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform | /pricing/faqs#how-are-active-users-calculated-for-sourcegraph-code-search-and-code-intelligence-platform | 0 |  | yes |
| 4542 | /analytics/self-hosted | /analytics | 0 |  | yes |
| 4546 | /analytics/air-gapped | /analytics | 0 |  | yes |
| 4564 | /cody/capabilities/query-types | /cody/capabilities/chat | 0 |  | yes |
| 4569 | /analytics/cloud#access-tokens | /analytics/api#access-tokens | 0 |  | yes |
| 4573 | /analytics/cloud#token-management-apis | /analytics/api#token-management-apis | 0 |  | yes |
| 4577 | /analytics/cloud#enablement-instructions | /analytics#enablement-instructions | 0 |  | yes |
| 4581 | /analytics/cloud#data-export | /analytics#data-export-and-api | 0 |  | yes |
| 4585 | /analytics/cloud#token-creation | /analytics/api#token-creation | 0 |  | yes |
| 4589 | /analytics/cloud#token-listing | /analytics/api#token-listing | 0 |  | yes |
| 4593 | /analytics/cloud#token-revocation | /analytics/api#token-revocation | 0 |  | yes |
| 4597 | /analytics/cloud#api-reference | /analytics/api#api-reference | 0 |  | yes |
| 4601 | /analytics/cloud#csv-export | /analytics/api#csv-export | 0 |  | yes |
| 4626 | /code_monitoring/explanations/core_concepts | /code_monitoring | 0 | 1 more → /code-monitoring | no |
| 4630 | /code_monitoring/explanations | /code_monitoring | 0 | 1 more → /code-monitoring | no |
| 4638 | /code_monitoring/how-tos/slack | /code_monitoring | 0 | 1 more → /code-monitoring | no |
| 4650 | /code_monitoring/quickstart | /code_monitoring | 0 | 1 more → /code-monitoring | no |
| 4654 | /admin/nginx | /admin/http_https_configuration | 0 | 1 more → /self-hosted/http-https-configuration | no |
| 4678 | /how-to-videos/cody | /tutorials#cody | 0 |  | yes |
| 4686 | /code-search/code-navigation/auto_indexing_configuration | /code-navigation/auto_indexing_configuration | 0 | 1 more → /code-navigation/auto-indexing-configuration | no |
| 4694 | /code-search/code-navigation/explanations/auto_indexing_inference | /code-navigation/explanations/auto_indexing_inference | 0 | 1 more → /code-navigation/explanations/auto-indexing-inference | no |
| 4698 | /code-search/code-navigation/explanations/uploads | /code-navigation/explanations/uploads | 0 |  | yes |
| 4706 | /code-search/code-navigation/how-to/adding_scip_to_workflows | /code-navigation/how-to/adding_scip_to_workflows | 0 | 1 more → /code-navigation/how-to/adding-scip-to-workflows | no |
| 4749 | /code-search/code-navigation/private-maven-repository-configuration | /code-navigation/private-maven-repository-configuration | 0 |  | yes |
| 4761 | /code-search/code-navigation/syntactic_code_navigation | /code-navigation/syntactic_code_navigation | 0 | 1 more → /code-navigation/syntactic-code-navigation | no |
| 4765 | /code-search/code-navigation/troubleshooting | /code-navigation/troubleshooting | 0 |  | yes |
| 4773 | /admin/self-hosted | /self-hosted | 0 |  | yes |
| 4777 | /enterprise-portal | /admin/enterprise-portal | 0 |  | yes |
| 4781 | /admin/observability/outbound-request-log | /admin/outbound-request-log | 0 |  | yes |
| 4789 | /admin/config/webhooks | /admin/webhooks | 0 |  | yes |
| 4793 | /admin/config/webhooks/outgoing | /admin/webhooks/outgoing | 0 |  | yes |
| 4809 | /admin/deploy/docker-compose/configuration | /self-hosted/deploy/docker-compose/configuration | 0 |  | yes |
| 4817 | /admin/deploy/docker-compose/google_cloud | /self-hosted/deploy/docker-compose/google_cloud | 0 | 1 more → /self-hosted/deploy/docker-compose/google-cloud | no |
| 4829 | /admin/deploy/docker-compose/operations | /self-hosted/deploy/docker-compose/operations | 0 |  | yes |
| 4833 | /admin/deploy/docker-compose/upgrade | /self-hosted/deploy/docker-compose/upgrade | 0 |  | yes |
| 4837 | /admin/deploy/docker-single-container/aws | /self-hosted/deploy | 0 |  | yes |
| 4841 | /admin/deploy/docker-single-container/digitalocean | /self-hosted/deploy | 0 |  | yes |
| 4845 | /admin/deploy/docker-single-container/google_cloud | /self-hosted/deploy | 0 |  | yes |
| 4857 | /admin/deploy/instance-size | /self-hosted/deploy/instance-size | 0 |  | yes |
| 4861 | /admin/deploy/kubernetes/azure | /self-hosted/deploy/kubernetes/azure | 0 |  | yes |
| 4869 | /admin/deploy/kubernetes/eks | /self-hosted/deploy/kubernetes/eks | 0 |  | yes |
| 4877 | /admin/deploy/kubernetes/kustomize | /self-hosted/deploy/kubernetes/kustomize | 0 |  | yes |
| 4881 | /admin/deploy/kubernetes/kustomize/eks | /self-hosted/deploy/kubernetes/kustomize/eks | 0 |  | yes |
| 4885 | /admin/deploy/kubernetes/kustomize/gke | /self-hosted/deploy/kubernetes/kustomize/gke | 0 |  | yes |
| 4909 | /admin/deploy/kubernetes/upgrade | /self-hosted/deploy/kubernetes/upgrade | 0 |  | yes |
| 4913 | /admin/deploy/machine-images/aws-ami | /self-hosted/deploy/machine-images/aws-ami | 0 |  | yes |
| 4921 | /admin/deploy/machine-images/gce | /self-hosted/deploy/machine-images/gce | 0 |  | yes |
| 4945 | /admin/deploy/single-node | /self-hosted/deploy/single-node | 0 |  | yes |
| 4949 | /admin/deploy/single-node/script | /self-hosted/deploy/single-node/script | 0 |  | yes |
| 4969 | /admin/executors/deploy_executors | /self-hosted/executors | 0 |  | yes |
| 4977 | /admin/executors/deploy_executors_binary_offline | /self-hosted/executors/deploy_executors_binary_offline | 0 | 1 more → /self-hosted/executors/deploy-executors-binary-offline | no |
| 4985 | /admin/executors/deploy_executors_docker | /self-hosted/executors/deploy_executors_docker | 0 | 1 more → /self-hosted/executors/deploy-executors-docker | no |
| 4993 | /admin/executors/deploy_executors_terraform | /self-hosted/executors/deploy_executors_terraform | 0 | 1 more → /self-hosted/executors/deploy-executors-terraform | no |
| 4997 | /admin/executors/executors_config | /self-hosted/executors/executors_config | 0 | 1 more → /self-hosted/executors/executors-config | no |
| 5009 | /admin/external_services | /self-hosted/external_services | 0 | 1 more → /self-hosted/external-services | no |
| 5021 | /admin/external_services/redis | /self-hosted/external_services/redis | 0 |  | no |
| 5025 | /admin/how-to/blobstore_debugging | /self-hosted/how-to/blobstore_debugging | 0 | 1 more → /self-hosted/how-to/blobstore-debugging | no |
| 5029 | /admin/how-to/blobstore_update_notes | /self-hosted/how-to/blobstore_update_notes | 0 | 1 more → /self-hosted/how-to/blobstore-update-notes | no |
| 5033 | /admin/how-to/clear_codeintel_data | /self-hosted/how-to/clear_codeintel_data | 0 | 1 more → /self-hosted/how-to/clear-codeintel-data | no |
| 5045 | /admin/how-to/monitoring-guide | /self-hosted/how-to/monitoring-guide | 0 |  | yes |
| 5049 | /admin/how-to/postgres14-index-corruption | /self-hosted/how-to/postgres14-index-corruption | 0 |  | yes |
| 5053 | /admin/how-to/postgres_12_to_16_drift | /self-hosted/how-to/postgres_12_to_16_drift | 0 | 1 more → /self-hosted/how-to/postgres-12-to-16-drift | no |
| 5057 | /admin/how-to/precise-code-intel-worker-crashloopbackoff | /self-hosted/how-to/precise-code-intel-worker-crashloopbackoff | 0 |  | yes |
| 5062 | /admin/how-to/privileged_migrations | /self-hosted/how-to/privileged_migrations | 0 | 1 more → /self-hosted/how-to/privileged-migrations | no |
| 5066 | /admin/how-to/rebuild-corrupt-postgres-indexes | /self-hosted/how-to/rebuild-corrupt-postgres-indexes | 0 |  | yes |
| 5078 | /admin/how-to/run-psql | /self-hosted/how-to/run-psql | 0 |  | yes |
| 5082 | /admin/how-to/setup-https | /self-hosted/how-to/setup-https | 0 |  | yes |
| 5086 | /admin/how-to/troubleshoot-pod-eviction | /self-hosted/how-to/troubleshoot-pod-eviction | 0 |  | yes |
| 5106 | /admin/observability/.gitattributes | /self-hosted/observability/.gitattributes | 0 |  | no |
| 5126 | /admin/observability/health_checks | /self-hosted/observability/health_checks | 0 | 1 more → /self-hosted/observability/health-checks | no |
| 5134 | /admin/observability/logs | /self-hosted/observability/logs | 0 |  | yes |
| 5166 | /admin/postgresql_collation_version_mismatch_resolution | /self-hosted/postgresql_collation_version_mismatch_resolution | 0 | 1 more → /self-hosted/postgresql-collation-version-mismatch-resolution | no |
| 5171 | /admin/pprof | /self-hosted/pprof | 0 |  | yes |
| 5175 | /admin/config/private-network | /self-hosted/private-network | 0 |  | yes |
| 5179 | /admin/config/restore | /self-hosted/restore | 0 |  | yes |
| 5183 | /admin/sourcegraph-nginx-mermaid | /self-hosted/sourcegraph-nginx-mermaid | 0 |  | yes |
| 5191 | /admin/updates/automatic | /self-hosted/updates/automatic | 0 |  | yes |
| 5195 | /admin/updates/docker_compose | https://sourcegraph.com/changelog/self-hosted/docker-compose | 0 |  | yes |
| 5212 | /admin/updates/migrator | /self-hosted/updates/migrator | 0 |  | yes |
| 5220 | /admin/updates/migrator/schema-drift | /self-hosted/updates/migrator/schema-drift | 0 |  | yes |
| 5228 | /admin/updates/migrator/upgrading-early-versions | /self-hosted/updates/migrator/upgrading-early-versions | 0 |  | yes |
| 5232 | /admin/updates/pure_docker | /self-hosted/deploy/docker-compose/upgrade | 0 |  | yes |
| 5236 | /admin/updates/server | /self-hosted/deploy | 0 |  | yes |
| 5240 | /admin/url | /self-hosted/url | 0 |  | yes |
| 5244 | /admin/validation | /self-hosted/validation | 0 |  | yes |
| 5269 | /admin/auth/saml/azure_ad | /admin/auth/saml/azure-ad | 0 |  | yes |
| 5273 | /admin/auth/saml/jump_cloud | /admin/auth/saml/jump-cloud | 0 |  | yes |
| 5277 | /admin/auth/saml/microsoft_adfs | /admin/auth/saml/microsoft-adfs | 0 |  | yes |
| 5281 | /admin/auth/saml/one_login | /admin/auth/saml/one-login | 0 |  | yes |
| 5293 | /admin/code_hosts/aws_codecommit | /admin/code-hosts/aws-codecommit | 0 |  | yes |
| 5297 | /admin/code_hosts/azuredevops | /admin/code-hosts/azuredevops | 0 |  | yes |
| 5301 | /admin/code_hosts/bitbucket_cloud | /admin/code-hosts/bitbucket-cloud | 0 |  | yes |
| 5309 | /admin/code_hosts/gerrit | /admin/code-hosts/gerrit | 0 |  | yes |
| 5321 | /admin/code_hosts/gitolite | /admin/code-hosts/gitolite | 0 |  | yes |
| 5325 | /admin/code_hosts/non-git | /admin/code-hosts/non-git | 0 |  | yes |
| 5329 | /admin/code_hosts/other | /admin/code-hosts/other | 0 |  | yes |
| 5333 | /admin/code_hosts/phabricator | /admin/code-hosts/phabricator | 0 |  | yes |
| 5341 | /admin/code_hosts/src_serve_git | /admin/code-hosts/src-serve-git | 0 |  | yes |
| 5357 | /admin/enterprise_getting_started_guide | /admin/enterprise-getting-started-guide | 0 | 1 more → /admin | no |
| 5361 | /admin/executors/executor_secrets | /admin/executors/executor-secrets | 0 |  | yes |
| 5365 | /admin/how-to/internal_github_repos | /admin/how-to/internal-github-repos | 0 |  | yes |
| 5377 | /admin/oauth_apps | /admin/oauth-apps | 0 |  | yes |
| 5381 | /admin/repo/git_config | /admin/repo/git-config | 0 |  | yes |
| 5389 | /admin/security_event_logs | /admin/security-event-logs | 0 |  | yes |
| 5401 | /admin/user_surveys | /admin/user-surveys | 0 |  | yes |
| 5413 | /cli/how-tos/fetch_sboms | /cli/how-tos/fetch-sboms | 0 |  | yes |
| 5417 | /cli/how-tos/managing_access_tokens | /cli/how-tos/managing-access-tokens | 0 |  | yes |
| 5421 | /cli/how-tos/revoking_an_access_token | /cli/how-tos/revoking-an-access-token | 0 |  | yes |
| 5425 | /cli/how-tos/verify_container_signatures | /cli/how-tos/verify-container-signatures | 0 |  | yes |
| 5429 | /cloud/logpush_gcs | /cloud/logpush-gcs | 0 |  | yes |
| 5433 | /cloud/logpush_s3 | /cloud/logpush-s3 | 0 |  | yes |
| 5437 | /cloud/private_connectivity_aws | /cloud/private-connectivity-aws | 0 |  | yes |
| 5441 | /cloud/private_connectivity_gcp | /cloud/private-connectivity-gcp | 0 |  | yes |
| 5449 | /cloud/private_connectivity_sourcegraph_connect | /cloud/private-connectivity-sourcegraph-connect | 0 |  | yes |
| 5461 | /code_insights/explanations | /code-insights/explanations | 0 |  | yes |
| 5470 | /code_insights/explanations/automatically_generated_data_series | /code-insights/explanations/automatically-generated-data-series | 0 |  | yes |
| 5488 | /code_insights/explanations/search_results_aggregations | /code-insights/explanations/search-results-aggregations | 0 |  | yes |
| 5492 | /code_insights/explanations/viewing_code_insights | /code-insights/explanations/viewing-code-insights | 0 |  | yes |
| 5496 | /code_insights/how-tos | /code-insights/how-tos | 0 |  | yes |
| 5505 | /code_insights/how-tos/filtering_an_insight | /code-insights/how-tos/filtering-an-insight | 0 |  | yes |
| 5509 | /code_insights/language_insight_quickstart | /code-insights/language-insight-quickstart | 0 |  | yes |
| 5513 | /code_insights/references | /code-insights/references | 0 |  | yes |
| 5517 | /code_insights/references/common_reasons_code_insights_may_not_match_search_results | /code-insights/references/common-reasons-code-insights-may-not-match-search-results | 0 |  | yes |
| 5530 | /code_insights/references/repository_scope | /code-insights/references/repository-scope | 0 |  | yes |
| 5550 | /code-navigation/explanations/auto_indexing_inference | /code-navigation/explanations/auto-indexing-inference | 0 |  | yes |
| 5558 | /code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | /code-navigation/how-to/combining-scip-uploads-from-ci-cd-and-auto-indexing | 0 |  | yes |
| 5572 | /code-navigation/how-to/index_other_languages | /code-navigation/how-to/index-other-languages | 0 |  | yes |
| 5576 | /code-navigation/how-to/policies_resource_usage_best_practices | /code-navigation/how-to/policies-resource-usage-best-practices | 0 |  | yes |
| 5593 | /code-navigation/syntactic_code_navigation | /code-navigation/syntactic-code-navigation | 0 |  | yes |
| 5601 | /code-search/how-to/create_search_context_graphql | /code-search/how-to/create-search-context-graphql | 0 | 1 more → /api | no |
| 5613 | /code-search/working/search_filters | /code-search/working/search-filters | 0 |  | yes |
| 5621 | /dotcom/indexing_open_source_code | /dotcom/indexing-open-source-code | 0 |  | yes |
| 5625 | /integration/aws_codecommit | /integration/aws-codecommit | 0 |  | yes |
| 5629 | /integration/bitbucket_cloud | /integration/bitbucket-cloud | 0 |  | yes |
| 5650 | /integration/migrating_firefox_extension | /integration/migrating-firefox-extension | 0 |  | yes |
| 5658 | /own/assigned_ownership | /own/assigned-ownership | 0 | 1 more → /code-ownership | no |
| 5670 | /own/configuration_reference | /own/configuration-reference | 0 | 1 more → /code-ownership | no |
| 5678 | /self-hosted/deploy/docker-compose/google_cloud | /self-hosted/deploy/docker-compose/google-cloud | 0 |  | yes |
| 5682 | /self-hosted/deploy/docker-single-container/google_cloud | /self-hosted/deploy | 0 |  | yes |
| 5694 | /self-hosted/deployment_best_practices | /self-hosted/deployment-best-practices | 0 |  | yes |
| 5702 | /self-hosted/executors/deploy-executors | /self-hosted/executors | 0 |  | yes |
| 5710 | /self-hosted/executors/deploy_executors_binary_offline | /self-hosted/executors/deploy-executors-binary-offline | 0 |  | yes |
| 5714 | /self-hosted/executors/deploy_executors_dind | /self-hosted/executors/deploy-executors-dind | 0 |  | yes |
| 5718 | /self-hosted/executors/deploy_executors_docker | /self-hosted/executors/deploy-executors-docker | 0 |  | yes |
| 5730 | /self-hosted/executors/executors_config | /self-hosted/executors/executors-config | 0 |  | yes |
| 5746 | /self-hosted/how-to/blobstore_debugging | /self-hosted/how-to/blobstore-debugging | 0 |  | yes |
| 5754 | /self-hosted/how-to/clear_codeintel_data | /self-hosted/how-to/clear-codeintel-data | 0 |  | yes |
| 5766 | /self-hosted/how-to/postgres_12_to_16_drift | /self-hosted/how-to/postgres-12-to-16-drift | 0 |  | yes |
| 5770 | /self-hosted/how-to/privileged_migrations | /self-hosted/how-to/privileged-migrations | 0 |  | yes |
| 5774 | /self-hosted/how-to/redis_configmap | /self-hosted/how-to/redis-configmap | 0 |  | yes |
| 5778 | /self-hosted/how-to/rollback_database | /self-hosted/how-to/rollback-database | 0 |  | yes |
| 5782 | /self-hosted/how-to/unfinished_migration | /self-hosted/how-to/unfinished-migration | 0 |  | yes |
| 5786 | /self-hosted/http_https_configuration | /self-hosted/http-https-configuration | 0 |  | yes |
| 5790 | /self-hosted/observability/alerting_custom_consumption | /self-hosted/observability/alerting-custom-consumption | 0 |  | yes |
| 5794 | /self-hosted/observability/health_checks | /self-hosted/observability/health-checks | 0 |  | yes |
| 5802 | /self-hosted/postgresql_collation_version_mismatch_resolution | /self-hosted/postgresql-collation-version-mismatch-resolution | 0 |  | yes |
| 5807 | /self-hosted/ssl_https_self_signed_cert_nginx | /self-hosted/ssl-https-self-signed-cert-nginx | 0 |  | yes |
| 5811 | /self-hosted/updates/docker_compose | https://sourcegraph.com/changelog/self-hosted/docker-compose | 0 |  | yes |
| 5820 | /admin/enterprise-getting-started-guide | /admin | 0 |  | yes |
| 5832 | /admin/beta-and-experimental-features | /beta-and-experimental | 0 |  | yes |
| 5848 | /self-hosted/updates/kubernetes | https://sourcegraph.com/changelog/self-hosted/kubernetes | 0 |  | yes |
| 5852 | /self-hosted/updates/server | /self-hosted/deploy | 0 |  | yes |
| 5865 | /own/configuration-reference | /code-ownership | 0 |  | yes |
| 5885 | /api/graphql/managing-code-insights-with-api | /api/graphql | 0 |  | yes |
| 5893 | /code-search/how-to/create-search-context-graphql | /api | 0 |  | yes |
| 4164 | /code_navigation/explanations/precise_code_navigation | /code-search/code-navigation/precise_code_navigation | shadowed by line 2193 |  | no |
| 4048 | /code_search/reference/language | /code-search/queries/language | shadowed by line 1952 |  | yes |
| 4038 | /code_search/reference/queries | /code-search/queries | shadowed by line 1942 |  | yes |
| 3396 | /code_intelligence | /code_navigation | shadowed by line 1290 |  | no |
| 4054 | /code_navigation | /code-search/code-navigation | shadowed by line 1958 |  | no |
| 4400 | /code_navigation/references/indexers | /code-search/code-navigation/writing_an_indexer#sourcegraph-recommended-indexers | shadowed by line 2430 |  | no |
| 3970 | /code_search | /code-search | shadowed by line 1869 |  | yes |
| 3234 | /code_intelligence/explanations/precise_code_intelligence | /code_navigation/explanations/precise_code_navigation | shadowed by line 1128 |  | no |
| 3482 | /cody/overview | /cody/ | shadowed by line 1376 |  | yes |
| 3105 | /admin/install/kubernetes | /admin/deploy/kubernetes | shadowed by line 999 |  | no |
| 3221 | /code_intelligence/explanations/auto_indexing | /code_navigation/explanations/auto_indexing | shadowed by line 1115 |  | no |
| 3213 | /code_intelligence/explanations/writing_an_indexer | /code_navigation/explanations/writing_an_indexer | shadowed by line 1107 |  | no |
| 3177 | /admin/install/docker | /self-hosted/deploy | shadowed by line 1071 |  | yes |
| 3963 | /cody/custom-commands | /cody/capabilities/commands#custom-commands | shadowed by line 1862 |  | no |
| 4330 | /code_navigation/explanations/auto_indexing | /code-search/code-navigation/auto_indexing | shadowed by line 2360 |  | no |
| 3085 | /admin/install | /admin/deploy | shadowed by line 979 |  | no |
| 4107 | /code_navigation/how-to/index_a_typescript_and_javascript_repository | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository | shadowed by line 2011 |  | no |
| 4294 | /code_navigation/explanations/writing_an_indexer | /code-search/code-navigation/writing_an_indexer#writing-an-indexer | shadowed by line 2324 |  | no |
| 2944 | /campaigns/references/campaign_spec_yaml_reference | /batch_changes/references/batch_spec_yaml_reference | shadowed by line 838 |  | no |
| 3037 | /campaigns | /batch_changes | shadowed by line 931 |  | no |
| 3301 | /code_intelligence/how-to/index_a_cpp_repository | https://sourcegraph.com/github.com/sourcegraph/scip-clang/-/blob/README.md#usage | shadowed by line 1195 |  | no |
| 3494 | /cody/overview/install-neovim | /cody/clients/install-neovim | shadowed by line 1388 |  | yes |
| 3306 | /code_intelligence/how-to/index_a_go_repository | /code_navigation/how-to/index_a_go_repository | shadowed by line 1200 |  | no |
| 3113 | /admin/install/kubernetes/operations | /admin/deploy/kubernetes/operations | shadowed by line 1007 |  | no |
| 4215 | /code_navigation/explanations/features | /code-search/code-navigation/features | shadowed by line 2245 |  | no |
| 3310 | /code_intelligence/how-to/index_a_typescript_and_javascript_repository | /code_navigation/how-to/index_a_typescript_and_javascript_repository | shadowed by line 1204 |  | no |
| 3993 | /code_search/how-to/saved_searches | /code-search/working/saved_searches | shadowed by line 1892 |  | no |
| 3145 | /admin/install/docker-compose | /admin/deploy/docker-compose | shadowed by line 1039 |  | no |
| 3169 | /admin/install/docker/digitalocean | /self-hosted/deploy | shadowed by line 1063 |  | yes |
| 3522 | /cody/explanations/enabling_cody_enterprise | /cody/clients/enable-cody-enterprise | shadowed by line 1416 |  | yes |
| 1828 | /cody/explanations/code_graph_context | /cody/core-concepts/code-graph | shadowed by line 1820 |  | yes |
| 3181 | /admin/install/managed | /admin/deploy/managed | shadowed by line 1075 |  | no |
| 3376 | /code_intelligence/references/indexers | /code_navigation/references/indexers | shadowed by line 1270 |  | no |
| 3921 | /cody/explanations/code_graph_context | /cody/core-concepts/code-graph | shadowed by line 1820 |  | yes |
| 3929 | /cody/explanations/code_graph_context | /cody/core-concepts/code-graph | shadowed by line 1820 |  | yes |
| 4003 | /code_search/how-to/search_contexts | /code-search/working/search_contexts | shadowed by line 1902 |  | no |
| 4008 | /code_search/how-to/exhaustive | /code-search/types/exhaustive | shadowed by line 1907 |  | no |
| 4028 | /code_search/explanations/search_details | /code-search/features | shadowed by line 1932 |  | yes |
| 4154 | /code_navigation/explanations/introduction_to_code_navigation | /code-search/code-navigation | shadowed by line 2183 |  | no |
| 2854 | /admin/auth/saml_with_microsoft_adfs | /admin/auth/saml/microsoft_adfs | shadowed by line 333 |  | no |
| 2901 | /integration/google_gsuite | /integration/google_workspace | shadowed by line 380 |  | no |
| 3061 | /cli/references/campaigns/validate | /cli/references/batch/validate | shadowed by line 955 |  | yes |
| 3125 | /admin/install/kubernetes/update | /admin/deploy/kubernetes/update | shadowed by line 1019 |  | no |
| 3133 | /admin/install/docker-compose/aws | /admin/deploy/docker-compose/aws | shadowed by line 1027 |  | no |
| 3149 | /admin/install/docker-compose/migrate | /admin/deploy/docker-compose/migrate | shadowed by line 1043 |  | no |
| 3205 | /admin/observability/alert_solutions | /admin/observability/alerts | shadowed by line 1099 |  | no |
| 3225 | /code_intelligence/explanations/features | /code_navigation/explanations/features | shadowed by line 1119 |  | no |
| 3251 | /code_intelligence/explanations | /code_navigation/explanations | shadowed by line 1145 |  | no |
| 3315 | /code_intelligence/how-to/index_other_languages | /code_navigation/how-to/index_other_languages | shadowed by line 1209 |  | no |
| 3655 | /cody/core-concepts/embeddings/configure-embeddings | /cody/embeddings/configure-embeddings | shadowed by line 1554 |  | no |
| 3974 | /code_search/tutorials | /code-search/working/saved_searches | shadowed by line 1873 |  | no |
| 4059 | /code_navigation/how-to/configure_data_retention | /code-search/code-navigation/auto_indexing#configure-auto-indexing-policies | shadowed by line 1963 |  | no |
| 4071 | /code_navigation/how-to/index_a_go_repository | /code-search/code-navigation/how-to/index_a_go_repository | shadowed by line 1975 |  | no |
| 4130 | /code_navigation/how-to/adding_lsif_to_workflows | /code-search/code-navigation/how-to/adding_lsif_to_workflows | shadowed by line 2046 |  | no |
| 4174 | /code_navigation/explanations/uploads | /code-search/code-navigation/explanations/uploads | shadowed by line 2204 |  | no |
| 4412 | /code_navigation/references/precise_examples | /code-search/code-navigation/precise_code_navigation#precise-navigation-examples | shadowed by line 2442 |  | no |
| 5098 | /admin/http_https_configuration | /self-hosted/http_https_configuration | shadowed by line 12 |  | no |
| 2858 | /admin/config/critical_config | /admin/migration/3_11 | shadowed by line 337 |  | no |
| 3093 | /admin/install/kubernetes/configure | /admin/deploy/kubernetes/configure | shadowed by line 987 |  | no |
| 3121 | /admin/install/kubernetes/troubleshoot | /admin/deploy/kubernetes/troubleshoot | shadowed by line 1015 |  | no |
| 3165 | /admin/install/docker/aws | /self-hosted/deploy | shadowed by line 1059 |  | yes |
| 3173 | /admin/install/docker/google_cloud | /self-hosted/deploy | shadowed by line 1067 |  | yes |
| 3238 | /code_intelligence/explanations/rockskip | /code_navigation/explanations/rockskip | shadowed by line 1132 |  | no |
| 3506 | /app | /cody/clients/app | shadowed by line 1400 |  | no |
| 3518 | /cody/overview/cody-with-sourcegraph | /cody/clients/cody-with-sourcegraph | shadowed by line 1412 |  | yes |
| 3783 | /cody/explanations/indexing | /cody/embeddings/embedding-index | shadowed by line 1682 |  | no |
| 3853 | /cody/explanations/policies | /cody/embeddings/configure-embeddings#policies | shadowed by line 1752 |  | no |
| 3941 | /cody/core-concepts/cody_gateway | /cody/core-concepts/cody-gateway | shadowed by line 1840 |  | no |
| 3983 | /code_search/tutorials/search_subexpressions | /code-search/working/search_subexpressions | shadowed by line 1882 |  | no |
| 4023 | /code_search/explanations/features | /code-search/features | shadowed by line 1927 |  | yes |
| 408 | /dev/architecture/architecture.dot | /dev/background-information/architecture/architecture.dot | shadowed by line 389 |  | no |
| 1087 | /admin/install/cluster.md | /admin/deploy | shadowed by line 345 |  | no |
| 1314 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1306 |  | yes |
| 1372 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1306 |  | yes |
| 1454 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | shadowed by line 1396 |  | yes |
| 1480 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | shadowed by line 1396 |  | yes |
| 1488 | /cody/overview/install-vscode | /cody/clients/install-vscode | shadowed by line 1384 |  | yes |
| 1785 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1775 |  | no |
| 1795 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1775 |  | no |
| 2866 | /admin/install/cluster.md | /admin/deploy/index.md | shadowed by line 345 |  | no |
| 2870 | /admin/monitoring | /admin/observability | shadowed by line 349 |  | no |
| 2874 | /admin/monitoring/reporting_search_timeouts | /admin/observability/troubleshooting#scenario-search-timeouts | shadowed by line 353 |  | no |
| 2879 | /admin/monitoring/metrics_reference | /admin/observability/metrics_guide | shadowed by line 358 |  | no |
| 2883 | /admin/monitoring/slack_alert_channel | /admin/observability/alerting#set-up-alerts-in-grafana | shadowed by line 362 |  | no |
| 2887 | /@v5.3.0/admin/observability/alerts | https://docs.sourcegraph.com/@v5.3.0/admin/observability/alerts | shadowed by line 366 |  |  |
| 2892 | /@v5.3.0/admin/observability/dashboards | https://docs.sourcegraph.com/@v5.3.0/admin/observability/dashboards | shadowed by line 371 |  |  |
| 2897 | /admin/monitoring_and_tracing | /admin/observability | shadowed by line 376 |  | no |
| 2905 | /campaigns/explanations/how_src_executes_a_campaign_spec | /batch_changes/explanations/how_src_executes_a_batch_spec | shadowed by line 799 |  | no |
| 2910 | /campaigns/explanations/reexecuting_campaign_specs_multiple_times | /batch_changes/explanations/reexecuting_batch_specs_multiple_times | shadowed by line 804 |  | no |
| 2915 | /campaigns/explanations/permissions_in_batch_changes | /batch_changes/explanations/permissions_in_batch_changes | shadowed by line 809 |  | no |
| 2919 | /campaigns/explanations/introduction_to_batch_changes | /batch_changes/explanations/introduction_to_batch_changes | shadowed by line 813 |  | no |
| 2924 | /campaigns/explanations/batch_changes_design | /batch_changes/explanations/batch_changes_design | shadowed by line 818 |  | no |
| 2928 | /campaigns/explanations | /batch_changes/explanations | shadowed by line 822 |  | no |
| 2932 | /campaigns/references/requirements | /batch_changes/references/requirements | shadowed by line 826 |  | no |
| 2936 | /campaigns/references/troubleshooting | /batch_changes/references/troubleshooting | shadowed by line 830 |  | no |
| 2940 | /campaigns/references/name-change | /batch_changes/references/name-change | shadowed by line 834 |  | no |
| 2948 | /campaigns/references/faq | /batch_changes/references/faq | shadowed by line 842 |  | no |
| 2952 | /campaigns/references/campaign_spec_templating | /batch_changes/references/batch_spec_templating | shadowed by line 846 |  | no |
| 2956 | /campaigns/references | /batch_changes/references | shadowed by line 850 |  | no |
| 2960 | /campaigns/tutorials/update_base_images_in_dockerfiles | /batch_changes/tutorials/update_base_images_in_dockerfiles | shadowed by line 854 |  | no |
| 2965 | /campaigns/tutorials/updating_go_import_statements | /batch_changes/tutorials/updating_go_import_statements | shadowed by line 859 |  | no |
| 2969 | /campaigns/tutorials/refactor_go_comby | /batch_changes/tutorials/refactor_go_comby | shadowed by line 863 |  | no |
| 2973 | /campaigns/tutorials/search_and_replace_specific_terms | /batch_changes/tutorials/search_and_replace_specific_terms | shadowed by line 867 |  | no |
| 2978 | /campaigns/tutorials | /batch_changes/tutorials | shadowed by line 872 |  | no |
| 2982 | /campaigns/how-tos/creating_changesets_per_project_in_monorepos | /batch_changes/how-tos/creating_changesets_per_project_in_monorepos | shadowed by line 876 |  | no |
| 2987 | /campaigns/how-tos/handling_errored_changesets | /batch_changes/how-tos/handling_errored_changesets | shadowed by line 881 |  | no |
| 2991 | /campaigns/how-tos/creating_multiple_changesets_in_large_repositories | /batch_changes/how-tos/creating_multiple_changesets_in_large_repositories | shadowed by line 885 |  | no |
| 2996 | /campaigns/how-tos/site_admin_configuration | /batch_changes/how-tos/site_admin_configuration | shadowed by line 890 |  | no |
| 3000 | /campaigns/how-tos/publishing_changesets | /batch_changes/how-tos/publishing_changesets | shadowed by line 894 |  | no |
| 3004 | /campaigns/how-tos/viewing_batch_changes | /batch_changes/how-tos/viewing_batch_changes | shadowed by line 898 |  | no |
| 3008 | /campaigns/how-tos/updating_a_batch_change | /batch_changes/how-tos/updating_a_batch_change | shadowed by line 902 |  | no |
| 3012 | /campaigns/how-tos/configuring_user_credentials | /batch_changes/how-tos/configuring_user_credentials | shadowed by line 906 |  | no |
| 3016 | /campaigns/how-tos/closing_or_deleting_a_batch_change | /batch_changes/how-tos/closing_or_deleting_a_batch_change | shadowed by line 910 |  | no |
| 3021 | /campaigns/how-tos/creating_a_batch_change | /batch_changes/how-tos/creating_a_batch_change | shadowed by line 915 |  | no |
| 3025 | /campaigns/how-tos/tracking_existing_changesets | /batch_changes/how-tos/tracking_existing_changesets | shadowed by line 919 |  | no |
| 3029 | /campaigns/how-tos | /batch_changes/how-tos | shadowed by line 923 |  | no |
| 3033 | /campaigns/quickstart | /batch_changes/quickstart | shadowed by line 927 |  | no |
| 3041 | /cli/references/campaigns/apply | /cli/references/batch/apply | shadowed by line 935 |  | yes |
| 3045 | /cli/references/campaigns/index | /cli/references/batch/index | shadowed by line 939 |  | no |
| 3049 | /cli/references/campaigns/new | /cli/references/batch/new | shadowed by line 943 |  | yes |
| 3053 | /cli/references/campaigns/preview | /cli/references/batch/preview | shadowed by line 947 |  | yes |
| 3057 | /cli/references/campaigns/repositories | /cli/references/batch/repositories | shadowed by line 951 |  | yes |
| 3065 | /cli/references/campaigns | /cli/references/batch | shadowed by line 959 |  | yes |
| 3069 | /batch_changes/how-tos/configuring_user_credentials | /batch_changes/how-tos/configuring_credentials | shadowed by line 963 |  | no |
| 3073 | /batch-changes/references/troubleshooting | /batch_changes/references/troubleshooting | shadowed by line 967 |  | no |
| 3077 | /dev/background-information/continuous_integration | /dev/background-information/ci | shadowed by line 971 |  | no |
| 3081 | /dev/how-to/add_and_use_logging | /dev/how-to/add_logging | shadowed by line 975 |  | no |
| 3089 | /admin/install/kubernetes/azure | /admin/deploy/kubernetes | shadowed by line 983 |  | no |
| 3097 | /admin/install/kubernetes/eks | /admin/deploy/kubernetes/eks | shadowed by line 991 |  | no |
| 3101 | /admin/install/kubernetes/helm | /admin/deploy/kubernetes/helm | shadowed by line 995 |  | no |
| 3109 | /admin/install/kubernetes/kustomize | /admin/deploy/kubernetes/kustomize | shadowed by line 1003 |  | no |
| 3117 | /admin/install/kubernetes/scale | /admin/deploy/kubernetes/scale | shadowed by line 1011 |  | no |
| 3129 | /admin/install/kubernetes/overlays | /admin/deploy/kubernetes/configure | shadowed by line 1023 |  | no |
| 3137 | /admin/install/docker-compose/digitalocean | /admin/deploy/docker-compose/digitalocean | shadowed by line 1031 |  | no |
| 3141 | /admin/install/docker-compose/google_cloud | /admin/deploy/docker-compose/google_cloud | shadowed by line 1035 |  | no |
| 3153 | /admin/install/docker-compose/operations | /admin/deploy/docker-compose#operations | shadowed by line 1047 |  | no |
| 3157 | /admin/install/docker-compose/update | /admin/deploy/docker-compose#upgrade | shadowed by line 1051 |  | no |
| 3161 | /admin/install/docker-compose/configure | /admin/deploy/docker-compose#configure | shadowed by line 1055 |  | no |
| 3185 | /admin/install/migrate-backup | /admin/deploy/migrate-backup | shadowed by line 1079 |  | no |
| 3189 | /admin/install/resource_estimator | /admin/deploy/resource_estimator | shadowed by line 1083 |  | no |
| 3193 | /admin/install/cluster.md | /admin/deploy | shadowed by line 345 |  | no |
| 3197 | /admin/deploy/cluster | /admin/deploy | shadowed by line 1091 |  | no |
| 3201 | /admin/deploy/docker | /self-hosted/deploy | shadowed by line 1095 |  | yes |
| 3209 | /admin/deploy/managed | /cloud | shadowed by line 1103 |  | yes |
| 3217 | /code_intelligence/explanations/auto_indexing_inference | /code_navigation/explanations/auto_indexing_inference | shadowed by line 1111 |  | no |
| 3229 | /code_intelligence/explanations/introduction_to_code_intelligence | /code_navigation/explanations/introduction_to_code_navigation | shadowed by line 1123 |  | no |
| 3242 | /code_intelligence/explanations/search_based_code_intelligence | /code_navigation/explanations/search_based_code_navigation | shadowed by line 1136 |  | no |
| 3247 | /code_intelligence/explanations/uploads | /code_navigation/explanations/uploads | shadowed by line 1141 |  | no |
| 3255 | /code_intelligence/explanations/diagrams | /code_navigation/explanations/diagrams | shadowed by line 1149 |  | no |
| 3259 | /code_intelligence/explanations/diagrams/index-states.mermaid | /code_navigation/explanations/diagrams/index-states.mermaid | shadowed by line 1153 |  | no |
| 3264 | /code_intelligence/explanations/diagrams/index-states.svg | /code_navigation/explanations/diagrams/index-states.svg | shadowed by line 1158 |  | no |
| 3268 | /code_intelligence/explanations/diagrams/upload-states.mermaid | /code_navigation/explanations/diagrams/upload-states.mermaid | shadowed by line 1162 |  | no |
| 3273 | /code_intelligence/explanations/diagrams/upload-states.svg | /code_navigation/explanations/diagrams/upload-states.svg | shadowed by line 1167 |  | no |
| 3277 | /code_intelligence/apidocs | /code_navigation/apidocs | shadowed by line 1171 |  | no |
| 3281 | /code_intelligence/how-to/adding_lsif_to_many_repos | /code_navigation/how-to/adding_lsif_to_many_repos | shadowed by line 1175 |  | no |
| 3285 | /code_intelligence/how-to/adding_lsif_to_workflows | /code_navigation/how-to/adding_lsif_to_workflows | shadowed by line 1179 |  | no |
| 3289 | /code_intelligence/how-to/configure_auto_indexing | /code_navigation/how-to/configure_auto_indexing | shadowed by line 1183 |  | no |
| 3293 | /code_intelligence/how-to/configure_data_retention | /code_navigation/how-to/configure_data_retention | shadowed by line 1187 |  | no |
| 3297 | /code_intelligence/how-to/enable_auto_indexing | /code_navigation/how-to/enable_auto_indexing | shadowed by line 1191 |  | no |
| 3319 | /code_intelligence/how-to | /code_navigation/how-to | shadowed by line 1213 |  | no |
| 3323 | /code_intelligence/how-to/img/CodeReview.gif | /code_navigation/how-to/img/CodeReview.gif | shadowed by line 1217 |  | no |
| 3327 | /code_intelligence/how-to/img/experimental-language-server-enable.png | /code_navigation/how-to/img/experimental-language-server-enable.png | shadowed by line 1221 |  | no |
| 3332 | /code_intelligence/how-to/img/extension-example.gif | /code_navigation/how-to/img/extension-example.gif | shadowed by line 1226 |  | no |
| 3336 | /code_intelligence/how-to/img/network-description.png | /code_navigation/how-to/img/network-description.png | shadowed by line 1230 |  | no |
| 3340 | /code_intelligence/how-to/img/network-waterfall.png | /code_navigation/how-to/img/network-waterfall.png | shadowed by line 1234 |  | no |
| 3344 | /code_intelligence/how-to/img/popover.png | /code_navigation/how-to/img/popover.png | shadowed by line 1238 |  | no |
| 3348 | /code_intelligence/how-to/img/Symbols.png | /code_navigation/how-to/img/Symbols.png | shadowed by line 1242 |  | no |
| 3352 | /code_intelligence/how-to/img/SymbolSidebar.png | /code_navigation/how-to/imgSymbolSidebar.png | shadowed by line 1246 |  | no |
| 3356 | /code_intelligence/how-to/img/workflow.png | /code_navigation/how-to/img/workflow.png | shadowed by line 1250 |  | no |
| 3360 | /code_intelligence/how-to/img | /code_navigation/how-to/img | shadowed by line 1254 |  | no |
| 3364 | /code_intelligence/references/auto_indexing_configuration | /code_navigation/references/auto_indexing_configuration | shadowed by line 1258 |  | no |
| 3368 | /code_intelligence/references/envvars | /code_navigation/references/envvars | shadowed by line 1262 |  | no |
| 3372 | /code_intelligence/references/faq | /code_navigation/references/faq | shadowed by line 1266 |  | no |
| 3380 | /code_intelligence/references/precise_examples | /code_navigation/references/precise_examples | shadowed by line 1274 |  | no |
| 3384 | /code_intelligence/references/requirements | /code_navigation/references/requirements | shadowed by line 1278 |  | no |
| 3388 | /code_intelligence/references/troubleshooting | /code_navigation/references/troubleshooting | shadowed by line 1282 |  | no |
| 3392 | /code_intelligence/references | /code_navigation/references | shadowed by line 1286 |  | no |
| 3400 | /cody/autocomplete | /cody/capabilities/autocomplete | shadowed by line 1294 |  | yes |
| 3404 | /cody/autocomplete#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1298 |  | yes |
| 3408 | /cody/autocomplete#what-is-cody-code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1302 |  | yes |
| 3412 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1306 |  | yes |
| 3416 | /cody/autocomplete#enabling-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1310 |  | yes |
| 3420 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1306 |  | yes |
| 3424 | /cody/autocomplete#configuring-on-sourcegraph-enterprise | /cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance | shadowed by line 1318 |  | yes |
| 3429 | /cody/capabilities#configure-autocomplete-on-sourcegraph-enterprise | /cody/capabilities/autocomplete#configure-autocomplete-on-an-enterprise-sourcegraph-instance | shadowed by line 1323 |  | yes |
| 3434 | /cody/autocomplete#accessing-autocomplete-logs | /cody/capabilities/autocomplete#access-autocomplete-logs | shadowed by line 1328 |  | yes |
| 3438 | /cody/capabilities#access-autocomplete-logs | /cody/capabilities/autocomplete#access-autocomplete-logs | shadowed by line 1332 |  | yes |
| 3442 | /cody#get-cody | /cody | shadowed by line 1336 |  | yes |
| 3446 | /cody#getting-started | /cody | shadowed by line 1340 |  | yes |
| 3450 | /cody#features | /cody#main-features | shadowed by line 1344 |  | yes |
| 3454 | /cody#chatbot-that-knows-your-code | /cody | shadowed by line 1348 |  | yes |
| 3458 | /cody#fix-code-inline | /cody/capabilities | shadowed by line 1352 |  | yes |
| 3462 | /cody/capabilities#fix-code-inline | /cody/capabilities | shadowed by line 1356 |  | yes |
| 3466 | /cody#recipes | /cody/capabilities/commands | shadowed by line 1360 |  | no |
| 3470 | /cody/capabilities#cody-recipes | /cody/capabilities/commands | shadowed by line 1364 |  | no |
| 3474 | /cody#autocomplete | /cody/capabilities/autocomplete | shadowed by line 1368 |  | yes |
| 3478 | /cody/capabilities#code-autocomplete | /cody/capabilities/autocomplete | shadowed by line 1306 |  | yes |
| 3486 | /cody/explanations/installing_vs_code | /cody/clients/install-vscode | shadowed by line 1380 |  | yes |
| 3490 | /cody/overview/install-vscode | /cody/clients/install-vscode | shadowed by line 1384 |  | yes |
| 3498 | /cody/explanations/installing_jetbrains | /cody/clients/install-jetbrains | shadowed by line 1392 |  | yes |
| 3502 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | shadowed by line 1396 |  | yes |
| 3510 | /cody/overview/app | /cody/clients/app | shadowed by line 1404 |  | no |
| 3514 | /cody/explanations/enabling_cody | /cody/clients/cody-with-sourcegraph | shadowed by line 1408 |  | yes |
| 3526 | /cody/overview/enable-cody-enterprise | /cody/clients/enable-cody-enterprise | shadowed by line 1420 |  | yes |
| 3530 | /cody/quickstart#quickstart-for-cody-in-vs-code | /cody/quickstart | shadowed by line 1424 |  | yes |
| 3534 | /cody/quickstart#introduction | /cody/quickstart#cody-quickstart | shadowed by line 1428 |  | yes |
| 3538 | /cody/quickstart#getting-started-with-the-cody-extension-and-recipes | /cody/quickstart#getting-started-with-cody-extension-and-commands | shadowed by line 1432 |  | yes |
| 3543 | /cody/quickstart#generate-a-unit-test | /cody/quickstart#1-generate-a-unit-test | shadowed by line 1437 |  | yes |
| 3547 | /cody/quickstart#ask-cody-to-pull-reference-documentation | /cody/quickstart#3-ask-cody-to-pull-reference-documentation | shadowed by line 1441 |  | yes |
| 3552 | /cody/quickstart#ask-cody-to-write-context-aware-code | /cody/quickstart#working-with-the-cody-extension | shadowed by line 1446 |  | yes |
| 3556 | /cody/overview/install-jetbrains#introduction | /cody/clients/install-jetbrains | shadowed by line 1450 |  | yes |
| 3560 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | shadowed by line 1396 |  | yes |
| 3564 | /cody/overview/install-jetbrains#requirements | /cody/clients/install-jetbrains#prerequisites | shadowed by line 1458 |  | yes |
| 3568 | /cody/overview/install-jetbrains#prerequisites | /cody/clients/install-jetbrains#prerequisites | shadowed by line 1462 |  | yes |
| 3572 | /cody/overview/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | /cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | shadowed by line 1466 |  | yes |
| 3577 | /cody/overview/install-jetbrains#enable-code-graph-context-for-context-aware-answers-optional | /cody/clients/install-jetbrains#optional-enable-code-graph-context-for-context-aware-answers | shadowed by line 1471 |  | yes |
| 3582 | /cody/overview/install-jetbrains#get-started-with-cody | /cody/clients/install-jetbrains | shadowed by line 1476 |  | yes |
| 3586 | /cody/overview/install-jetbrains | /cody/clients/install-jetbrains | shadowed by line 1396 |  | yes |
| 3590 | /cody/overview/install-vscode#introduction | /cody/clients/install-vscode | shadowed by line 1484 |  | yes |
| 3594 | /cody/overview/install-vscode | /cody/clients/install-vscode | shadowed by line 1384 |  | yes |
| 3598 | /cody/overview/install-vscode#requirements | /cody/clients/install-vscode#prerequisites | shadowed by line 1492 |  | yes |
| 3602 | /cody/overview/install-vscode#prerequisites | /cody/clients/install-vscode#prerequisites | shadowed by line 1496 |  | yes |
| 3611 | /cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider-directly | /cody/clients/enable-cody-enterprise#supported-models-and-model-providers | shadowed by line 1510 |  | yes |
| 3616 | /cody/overview/enable-cody-enterprise#using-a-third-party-llm-provider | /cody/clients/enable-cody-enterprise#supported-models-and-model-providers | shadowed by line 1515 |  | yes |
| 3621 | /cody/overview/enable-cody-enterprise#turning-cody-on-only-for-some-users | /cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users | shadowed by line 1520 |  | yes |
| 3626 | /cody/overview/enable-cody-enterprise#enable-cody-only-for-some-users | /cody/clients/enable-cody-enterprise#enable-cody-only-for-some-users | shadowed by line 1525 |  | yes |
| 3631 | /cody/overview/enable-cody-enterprise#turning-cody-off | /cody/clients/enable-cody-enterprise#disable-cody | shadowed by line 1530 |  | yes |
| 3635 | /cody/overview/enable-cody-enterprise#disable-cody | /cody/clients/enable-cody-enterprise#disable-cody | shadowed by line 1534 |  | yes |
| 3639 | /cody/explanations | /cody/core-concepts | shadowed by line 1538 |  | yes |
| 3643 | /cody/explanations/code_graph_context#embeddings | /cody/embeddings | shadowed by line 1542 |  | no |
| 3647 | /cody/core-concepts/embeddings#embeddings | /cody/embeddings | shadowed by line 1546 |  | no |
| 3651 | /cody/explanations/code_graph_context#configuring-embeddings | /cody/embeddings/configure-embeddings | shadowed by line 1550 |  | no |
| 3659 | /cody/explanations/code_graph_context#filtering-files-from-embeddings | /cody/embeddings/manage-embeddings#filter-files-from-embeddings | shadowed by line 1558 |  | no |
| 3664 | /cody/core-concepts/embeddings/manage-embeddings#filter-files-from-embeddings | /cody/embeddings/manage-embeddings#filter-files-from-embeddings | shadowed by line 1563 |  | no |
| 3669 | /cody/explanations/code_graph_context#storing-embedding-indexes | /cody/embeddings/manage-embeddings#store-embedding-indexes | shadowed by line 1568 |  | no |
| 3674 | /cody/core-concepts/embeddings/manage-embeddings#store-embedding-indexes | /cody/embeddings/manage-embeddings#store-embedding-indexes | shadowed by line 1573 |  | no |
| 3679 | /cody/explanations/code_graph_context#using-s3 | /cody/embeddings/manage-embeddings#using-s3 | shadowed by line 1578 |  | no |
| 3683 | /cody/core-concepts/embeddings/manage-embeddings#using-s3 | /cody/embeddings/manage-embeddings#using-s3 | shadowed by line 1582 |  | no |
| 3687 | /cody/explanations/code_graph_context#using-gcs | /cody/embeddings/manage-embeddings#using-gcs | shadowed by line 1586 |  | no |
| 3691 | /cody/core-concepts/embeddings/manage-embeddings#using-gcs | /cody/embeddings/manage-embeddings#using-gcs | shadowed by line 1590 |  | no |
| 3695 | /cody/explanations/code_graph_context#provisioning-buckets | /cody/embeddings/manage-embeddings#provisioning-buckets | shadowed by line 1594 |  | no |
| 3699 | /cody/core-concepts/embeddings/manage-embeddings#provisioning-buckets | /cody/embeddings/manage-embeddings#provisioning-buckets | shadowed by line 1598 |  | no |
| 3703 | /cody/explanations/code_graph_context#environment-variables-for-the-embeddings-service | /cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | shadowed by line 1602 |  | no |
| 3708 | /cody/core-concepts/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | /cody/embeddings/manage-embeddings#environment-variables-for-the-embeddings-service | shadowed by line 1607 |  | no |
| 3713 | /cody/explanations/code_graph_context#incremental-embeddings | /cody/embeddings#incremental-embeddings | shadowed by line 1612 |  | no |
| 3717 | /cody/core-concepts/embeddings#incremental-embeddings | /cody/embeddings#incremental-embeddings | shadowed by line 1616 |  | no |
| 3721 | /cody/explanations/code_graph_context#adjust-the-minimum-time-interval-between-automatically-scheduled-embeddings | /cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | shadowed by line 1620 |  | no |
| 3726 | /cody/core-concepts/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | /cody/embeddings#minimum-time-interval-between-automatically-scheduled-embeddings | shadowed by line 1625 |  | no |
| 3731 | /cody/explanations/code_graph_context#using-a-third-party-embeddings-provider-directly | /cody/embeddings#third-party-embeddings-provider | shadowed by line 1630 |  | no |
| 3735 | /cody/core-concepts/embeddings#third-party-embeddings-provider | /cody/embeddings#third-party-embeddings-provider | shadowed by line 1634 |  | no |
| 3739 | /cody/explanations/code_graph_context#openai | /cody/embeddings#openai | shadowed by line 1638 |  | no |
| 3743 | /cody/core-concepts/embeddings#openai | /cody/embeddings#openai | shadowed by line 1642 |  | no |
| 3747 | /cody/explanations/code_graph_context#azure-openai-span-class-badge-badge-experimental-experimental-span | /cody/embeddings#azure-openai | shadowed by line 1646 |  | no |
| 3751 | /cody/core-concepts/embeddings#azure-openai | /cody/embeddings#azure-openai | shadowed by line 1650 |  | no |
| 3755 | /cody/explanations/code_graph_context#disabling-embeddings | /cody/embeddings#disable-embeddings | shadowed by line 1654 |  | no |
| 3759 | /cody/core-concepts/embeddings#disable-embeddings | /cody/embeddings#disable-embeddings | shadowed by line 1658 |  | no |
| 3763 | /cody/explanations/code_graph_context#configuring-the-global-policy-match-limit | /cody/embeddings/usage-and-limits#configure-global-policy-match-limit | shadowed by line 1662 |  | no |
| 3768 | /cody/core-concepts/embeddings/usage-and-limits#configure-global-policy-match-limit | /cody/embeddings/usage-and-limits#configure-global-policy-match-limit | shadowed by line 1667 |  | no |
| 3773 | /cody/explanations/code_graph_context#limitting-the-number-of-embeddings-that-can-be-generated | /cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | shadowed by line 1672 |  | no |
| 3778 | /cody/core-concepts/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | /cody/embeddings/usage-and-limits#limit-the-number-of-embeddings-that-can-be-generated | shadowed by line 1677 |  | no |
| 3787 | /cody/core-concepts/embeddings/embedding-index | /cody/embeddings/embedding-index | shadowed by line 1686 |  | no |
| 3791 | /cody/explanations/indexing#generate-embeddings-index | /cody/embeddings/embedding-index#generate-embeddings-index | shadowed by line 1690 |  | no |
| 3796 | /cody/core-concepts/embeddings/embedding-index#generate-embeddings-index | /cody/embeddings/embedding-index#generate-embeddings-index | shadowed by line 1695 |  | no |
| 3801 | /cody/explanations/indexing#sourcegraph-enterprise | /cody/embeddings/embedding-index#sourcegraph-enterprise | shadowed by line 1700 |  | no |
| 3805 | /cody/core-concepts/embeddings/embedding-index#sourcegraph-enterprise | /cody/embeddings/embedding-index#sourcegraph-enterprise | shadowed by line 1704 |  | no |
| 3809 | /cody/explanations/indexing#sourcegraph-com | /cody/embeddings/embedding-index#sourcegraphcom | shadowed by line 1708 |  | no |
| 3813 | /cody/core-concepts/embeddings/embedding-index#sourcegraph-com | /cody/embeddings/embedding-index#sourcegraphcom | shadowed by line 1712 |  | no |
| 3817 | /cody/explanations/indexing#enable-codebase-aware-answers | /cody/embeddings/embedding-index#enable-codebase-aware-answers | shadowed by line 1716 |  | no |
| 3822 | /cody/core-concepts/embeddings/embedding-index#enable-codebase-aware-answers | /cody/embeddings/embedding-index#enable-codebase-aware-answers | shadowed by line 1721 |  | no |
| 3827 | /cody/explanations/indexing#extension-settings | /cody/embeddings/embedding-index#cody-vs-code-extension-settings | shadowed by line 1726 |  | no |
| 3832 | /cody/core-concepts/embeddings/embedding-index#cody-vs-code-extension-settings | /cody/embeddings/embedding-index#cody-vs-code-extension-settings | shadowed by line 1731 |  | no |
| 3837 | /cody/explanations/indexing#manual-configuration | /cody/embeddings/embedding-index#manual-configuration | shadowed by line 1736 |  | no |
| 3841 | /cody/core-concepts/embeddings/embedding-index#manual-configuration | /cody/embeddings/embedding-index#manual-configuration | shadowed by line 1740 |  | no |
| 3845 | /cody/explanations/indexing#settings-json | /cody/embeddings/embedding-index#settingsjson | shadowed by line 1744 |  | no |
| 3849 | /cody/core-concepts/embeddings/embedding-index#settings-json | /cody/embeddings/embedding-index#settingsjson | shadowed by line 1748 |  | no |
| 3857 | /cody/core-concepts/embeddings/configure-embeddings#policies | /cody/embeddings/configure-embeddings#policies | shadowed by line 1756 |  | no |
| 3861 | /cody/explanations/policies#how-to-create-an-embeddings-policy | /cody/embeddings/configure-embeddings#create-an-embeddings-policy | shadowed by line 1760 |  | no |
| 3866 | /cody/core-concepts/embeddings/configure-embeddings#create-an-embeddings-policy | /cody/embeddings/configure-embeddings#create-an-embeddings-policy | shadowed by line 1765 |  | no |
| 3871 | /cody/explanations/policies#example-1 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1770 |  | no |
| 3876 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1775 |  | no |
| 3881 | /cody/explanations/policies#example-2 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1780 |  | no |
| 3886 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1775 |  | no |
| 3891 | /cody/explanations/policies#example-3 | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1790 |  | no |
| 3896 | /cody/core-concepts/embeddings/configure-embeddings#how-pattern-matching-works | /cody/embeddings/configure-embeddings#how-pattern-matching-works | shadowed by line 1775 |  | no |
| 3901 | /cody/explanations/policies#lifecycle-of-an-embeddings-policy | /cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | shadowed by line 1800 |  | no |
| 3906 | /cody/core-concepts/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | /cody/embeddings/configure-embeddings#lifecycle-of-an-embeddings-policy | shadowed by line 1805 |  | no |
| 3911 | /cody/explanations/schedule_one_off_embeddings_jobs | /cody/embeddings/configure-embeddings#schedule-embeddings-jobs | shadowed by line 1810 |  | no |
| 3916 | /cody/core-concepts/embeddings/configure-embeddings#schedule-embeddings-jobs | /cody/embeddings/configure-embeddings#schedule-embeddings-jobs | shadowed by line 1815 |  | no |
| 3925 | /cody/explanations/cody_gateway | /cody/core-concepts/cody_gateway | shadowed by line 1824 |  | no |
| 3933 | /cody/core-concepts/cody_clients | /cody/clients | shadowed by line 1832 |  | yes |
| 3937 | /cody/overview#getting-started | /cody/clients | shadowed by line 1836 |  | yes |
| 3945 | /cody/core-concepts/cody_gateway#using-cody-gateway-in-sourcegraph-enterprise | /cody/core-concepts/cody-gateway#using-cody-gateway-in-sourcegraph-enterprise | shadowed by line 1844 |  | no |
| 3950 | /cody/core-concepts/cody_gateway#configuring-custom-models | /cody/core-concepts/cody-gateway#configuring-custom-models | shadowed by line 1849 |  | no |
| 3955 | /cody/core-concepts/cody_gateway#rate-limits-and-quotas | /cody/core-concepts/cody-gateway#rate-limits-and-quotas | shadowed by line 1854 |  | no |
| 3959 | /cody/core-concepts/cody_gateway#privacy-and-security | /cody/core-concepts/cody-gateway#privacy-and-security | shadowed by line 1858 |  | no |
| 3978 | /code_search/tutorials/examples | /code-search/queries/examples | shadowed by line 1877 |  | yes |
| 3988 | /code_search/how-to | /code-search/working/saved_searches | shadowed by line 1887 |  | no |
| 3998 | /code_search/how-to/snippets | /code-search/working/snippets | shadowed by line 1897 |  | yes |
| 4013 | /code_search/how-to/search-jobs | /code-search/types/search-jobs | shadowed by line 1912 |  | yes |
| 4018 | /code_search/explanations | /code-search/working/saved_searches | shadowed by line 1922 |  | no |
| 4033 | /code_search/explanations/tips | /code-search/features | shadowed by line 1937 |  | yes |
| 4043 | /code_search/reference/queries#search-pattern-syntax | /code-search/queries#search-pattern-syntax | shadowed by line 1947 |  | yes |
| 4065 | /code_navigation/how-to/configure_data_retention#applying-data-retention-policies-globally | /code-search/code-navigation/auto_indexing#applying-indexing-policies-globally | shadowed by line 1969 |  | no |
| 4077 | /code_navigation/how-to/index_a_go_repository#automated-indexing | /code-search/code-navigation/how-to/index_a_go_repository#automated-indexing | shadowed by line 1981 |  | no |
| 4083 | /code_navigation/how-to/index_a_go_repository#github-actions | /code-search/code-navigation/how-to/index_a_go_repository#github-actions | shadowed by line 1987 |  | no |
| 4089 | /code_navigation/how-to/index_a_go_repository#circleci | /code-search/code-navigation/how-to/index_a_go_repository#circleci | shadowed by line 1993 |  | no |
| 4095 | /code_navigation/how-to/index_a_go_repository#travis-ci | /code-search/code-navigation/how-to/index_a_go_repository#travis-ci | shadowed by line 1999 |  | no |
| 4101 | /code_navigation/how-to/index_a_go_repository#manual-indexing | /code-search/code-navigation/how-to/index_a_go_repository#manual-indexing | shadowed by line 2005 |  | no |
| 4113 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#indexing-in-ci-using-scip-typescript-directly | shadowed by line 2017 |  | no |
| 4119 | /code_navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags | /code-search/code-navigation/how-to/index_a_typescript_and_javascript_repository#optional-scip-typescript-flags | shadowed by line 2023 |  | no |
| 4125 | /code_navigation/how-to/adding_lsif_to_many_repos | /code-search/code-navigation/precise_code_navigation | shadowed by line 2041 |  | no |
| 4136 | /code_navigation/how-to/enable_auto_indexing#deploy-executors | /code-search/code-navigation/auto_indexing#enable-auto-indexing#deploy-executors | shadowed by line 2106 |  | no |
| 4142 | /code_navigation/how-to/policies_resource_usage_best_practices | /code-search/code-navigation/how-to/policies_resource_usage_best_practices | shadowed by line 2171 |  | no |
| 4148 | /code_navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | /code-search/code-navigation/how-to/combining_scip_uploads_from_ci_cd_and_auto_indexing | shadowed by line 2177 |  | no |
| 4159 | /code_navigation/explanations/introduction_to_code_navigation#search-based-vs-precise | /code-search/code-navigation#code-navigation-types | shadowed by line 2188 |  | no |
| 4179 | /code_navigation/explanations/uploads#lifecycle-of-an-upload | /code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload | shadowed by line 2209 |  | no |
| 4185 | /code_navigation/explanations/uploads#lifecycle-of-an-upload-via-ui | /code-search/code-navigation/explanations/uploads#lifecycle-of-an-upload-via-ui | shadowed by line 2215 |  | no |
| 4191 | /code_navigation/explanations/uploads#repository-commit-graph | /code-search/code-navigation/explanations/uploads#repository-commit-graph | shadowed by line 2221 |  | no |
| 4197 | /code_navigation/explanations/search_based_code_navigation | /code-search/code-navigation/search_based_code_navigation | shadowed by line 2227 |  | no |
| 4203 | /code_navigation/explanations/search_based_code_navigation#how-does-it-work | /code-search/code-navigation/search_based_code_navigation#how-does-it-work | shadowed by line 2233 |  | no |
| 4209 | /code_navigation/explanations/search_based_code_navigation#what-configuration-settings-can-i-apply | /code-search/code-navigation/search_based_code_navigation#what-configuration-settings-can-i-apply | shadowed by line 2239 |  | no |
| 4220 | /code_navigation/explanations/features#popover | /code-search/code-navigation/features#popover | shadowed by line 2250 |  | no |
| 4224 | /code_navigation/explanations/features#go-to-definition | /code-search/code-navigation/features#go-to-definition | shadowed by line 2254 |  | no |
| 4228 | /code_navigation/explanations/features#find-references | /code-search/code-navigation/features#find-references | shadowed by line 2258 |  | no |
| 4232 | /code_navigation/explanations/features#dependency-navigation | /code-search/code-navigation/features#dependency-navigation | shadowed by line 2262 |  | no |
| 4237 | /code_navigation/explanations/features#find-implementations | /code-search/code-navigation/features#find-implementations | shadowed by line 2267 |  | no |
| 4243 | /code_navigation/explanations/features#perform-an-action | /code-search/code-navigation/features#perform-an-action | shadowed by line 2273 |  | no |
| 4248 | /code_navigation/explanations/features#symbol-search | /code-search/types/symbol | shadowed by line 2278 |  | yes |
| 4253 | /code_navigation/explanations/rockskip | /code-search/code-navigation/rockskip | shadowed by line 2283 |  | no |
| 4258 | /code_navigation/explanations/rockskip#when-should-i-use-rockskip | /code-search/code-navigation/rockskip#when-should-i-use-rockskip | shadowed by line 2288 |  | no |
| 4264 | /code_navigation/explanations/rockskip#how-do-i-enable-rockskip | /code-search/code-navigation/rockskip#how-do-i-enable-rockskip | shadowed by line 2294 |  | no |
| 4270 | /code_navigation/explanations/rockskip#how-long-does-indexing-take | /code-search/code-navigation/rockskip#how-long-does-indexing-take | shadowed by line 2300 |  | no |
| 4276 | /code_navigation/explanations/rockskip#what-resources-does-rockskip-use | /code-search/code-navigation/rockskip#what-resources-does-rockskip-use | shadowed by line 2306 |  | no |
| 4282 | /code_navigation/explanations/rockskip#how-do-i-check-the-indexing-status | /code-search/code-navigation/rockskip#how-do-i-check-the-indexing-status | shadowed by line 2312 |  | no |
| 4288 | /code_navigation/explanations/rockskip#when-is-indexing-triggered | /code-search/code-navigation/rockskip#when-is-indexing-triggered | shadowed by line 2318 |  | no |
| 4300 | /code_navigation/explanations/writing_an_indexer#understanding-the-scip-protobuf-schema | /code-search/code-navigation/writing_an_indexer#understanding-the-scip-protobuf-schema | shadowed by line 2330 |  | no |
| 4306 | /code_navigation/explanations/writing_an_indexer#importing-or-generating-scip-bindings | /code-search/code-navigation/writing_an_indexer#importing-or-generating-scip-bindings | shadowed by line 2336 |  | no |
| 4312 | /code_navigation/explanations/writing_an_indexer#generating-minimal-index-with-occurrence-information | /code-search/code-navigation/writing_an_indexer#generating-minimal-index-with-occurrence-information | shadowed by line 2342 |  | no |
| 4318 | /code_navigation/explanations/writing_an_indexer#snapshot-testing-with-scip-cli | /code-search/code-navigation/writing_an_indexer#snapshot-testing-with-scip-cli | shadowed by line 2348 |  | no |
| 4324 | /code_navigation/explanations/writing_an_indexer#progressively-adding-support-for-language-features | /code-search/code-navigation/writing_an_indexer#progressively-adding-support-for-language-features | shadowed by line 2354 |  | no |
| 4335 | /code_navigation/explanations/auto_indexing#lifecycle-of-an-indexing-job | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job | shadowed by line 2365 |  | no |
| 4341 | /code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job | shadowed by line 2371 |  | no |
| 4347 | /code_navigation/how-to/configure_auto_indexing#lifecycle-of-an-indexing-job-via-ui | /code-search/code-navigation/auto_indexing#lifecycle-of-an-indexing-job-via-ui | shadowed by line 2377 |  | no |
| 4353 | /code_navigation/explanations/auto_indexing_inference | /code-search/code-navigation/explanations/auto_indexing_inference | shadowed by line 2383 |  | no |
| 4359 | /code_navigation/explanations/auto_indexing_inference#go | /code-search/code-navigation/explanations/auto_indexing_inference#go | shadowed by line 2389 |  | no |
| 4365 | /code_navigation/explanations/auto_indexing_inference#typescript | /code-search/code-navigation/explanations/auto_indexing_inference#typescript | shadowed by line 2395 |  | no |
| 4371 | /code_navigation/explanations/auto_indexing_inference#java | /code-search/code-navigation/explanations/auto_indexing_inference#java | shadowed by line 2401 |  | no |
| 4377 | /code_navigation/explanations/auto_indexing_inference#rust | /code-search/code-navigation/explanations/auto_indexing_inference#rust | shadowed by line 2407 |  | no |
| 4383 | /code_navigation/references/troubleshooting | /code-search/code-navigation/troubleshooting | shadowed by line 2413 |  | no |
| 4388 | /code_navigation/references/troubleshooting#when-are-issues-related-to-code-intelligence | /code-search/code-navigation/troubleshooting#when-are-issues-related-to-code-intelligence | shadowed by line 2418 |  | no |
| 4394 | /code_navigation/references/troubleshooting#gathering-evidence | /code-search/code-navigation/troubleshooting#gathering-evidence | shadowed by line 2424 |  | no |
| 4406 | /code_navigation/references/indexers#quick-reference | /code-search/code-navigation/writing_an_indexer#quick-reference | shadowed by line 2436 |  | no |
| 4418 | /code_navigation/references/envvars | /code-search/code-navigation/envvars | shadowed by line 2448 |  | no |
| 4423 | /code_navigation/references/envvars#frontend | /code-search/code-navigation/envvars#frontend | shadowed by line 2453 |  | no |
| 4428 | /code_navigation/references/envvars#worker | /code-search/code-navigation/envvars#worker | shadowed by line 2458 |  | no |
| 4433 | /code_navigation/references/envvars#precise-code-intel-worker | /code-search/code-navigation/envvars#precise-code-intel-worker | shadowed by line 2463 |  | no |
| 4439 | /code_navigation/references/auto_indexing_configuration | /code-search/code-navigation/auto_indexing_configuration | shadowed by line 2469 |  | no |
| 4444 | /code_navigation/references/auto_indexing_configuration#keys | /code-search/code-navigation/auto_indexing_configuration#keys | shadowed by line 2474 |  | no |
| 4450 | /code_navigation/references/auto_indexing_configuration#index-job-object | /code-search/code-navigation/auto_indexing_configuration#index-job-object | shadowed by line 2480 |  | no |
| 4456 | /code_navigation/references/auto_indexing_configuration#docker-step-object | /code-search/code-navigation/auto_indexing_configuration#docker-step-object | shadowed by line 2486 |  | no |
| 4462 | /code_navigation/references/inference_configuration | /code-search/code-navigation/inference_configuration | shadowed by line 2492 |  | no |
| 4889 | /admin/deploy/kubernetes/kustomize | /self-hosted/deploy/kubernetes/kustomize | shadowed by line 4877 |  | yes |
