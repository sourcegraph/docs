type Subsection = {
  title: string;
  href: string;
};

type Section = {
  title: string;
  href: string;
  subsections?: Subsection[];
};

export type Topic = {
  title: string;
  href: string;
  sections?: Section[];
};

export type NavigationItem = {
  separator: string;
  topics: Topic[];
};

export type VersionNavigations = Record<string, NavigationItem[]>;

export const navigation: NavigationItem[] = [
  {
    separator: "Code Intelligence",
    topics: [
      {
        title: "Cody",
        href: "/cody",
        sections: [
          { title: "Quickstart", href: "/cody/quickstart" },
          {
            title: "Installation", href: "/cody/clients",
            subsections: [
              { title: "Cody for VS Code", href: "/cody/clients/install-vscode", },
              { title: "Cody for JetBrains", href: "/cody/clients/install-jetbrains", },
              { title: "Cody for Web", href: "/cody/clients/cody-with-sourcegraph", },
              { title: "Cody for CLI", href: "/cody/clients/install-cli", },
              { title: "Cody for Enterprise", href: "/cody/clients/enable-cody-enterprise", },
              { title: "Model Configuration", href: "/cody/clients/model-configuration", },
            ]
          },
          {
            title: "Capabilities", href: "/cody/capabilities",
            subsections: [
              { title: "Chat", href: "/cody/capabilities/chat", },
              { title: "Autocomplete", href: "/cody/capabilities/autocomplete", },
              { title: "Prompts & Commands", href: "/cody/capabilities/commands", },
              { title: "OpenCtx", href: "/cody/capabilities/openctx", },
              { title: "Debug Code", href: "/cody/capabilities/debug-code", },
              { title: "Context Filters", href: "/cody/capabilities/ignore-context", },
              { title: "Proxy Setup", href: "/cody/capabilities/proxy-setup", },
              { title: "Supported Models", href: "/cody/capabilities/supported-models", },
              { title: "Feature Parity Reference", href: "/cody/clients/feature-reference", },
            ]
          },
          {
            title: "Core Concepts", href: "/cody/core-concepts/context",
            subsections: [
              { title: "Context", href: "/cody/core-concepts/context", },
              { title: "Token Limits", href: "/cody/core-concepts/token-limits", },
              // { title: "Embeddings", href: "/cody/core-concepts/embeddings", },
              { title: "Keyword Search", href: "/cody/core-concepts/keyword-search", },
              // { title: "Code Graph", href: "/cody/core-concepts/code-graph", },
              { title: "Cody Gateway", href: "/cody/core-concepts/cody-gateway", },
              { title: "Enterprise Architecture", href: "/cody/core-concepts/enterprise-architecture", },
            ]
          },
          // {
          //   title: "Use Cases", href: "/cody/use-cases/generate-unit-tests",
          //   subsections: [
          //     { title: "Generate Unit Tests", href: "/cody/use-cases/generate-unit-tests", },
          //     // { title: "Build UI", href: "/cody/use-cases/build-ui", },
          //   ]
          // },
          { title: "Usage and Pricing", href: "/cody/usage-and-pricing" },
          { title: "Troubleshooting", href: "/cody/troubleshooting" },
          { title: "FAQs", href: "/cody/faq" },
        ],
      },
      {
        title: "Code Search",
        href: "/code-search",
        sections: [
          { title: "Features", href: "/code-search/features" },
          {
            title: "Search Query Syntax", href: "/code-search/queries",
            subsections: [
              { title: "Search Filters Panel", href: "/code-search/working/search_filters", },
              { title: "Search Examples", href: "/code-search/queries/examples", },
              { title: "Symbol Search", href: "/code-search/types/symbol", },
              { title: "Language Reference", href: "/code-search/queries/language", },
            ]
          },
          {
            title: "Code Navigation", href: "/code-search/code-navigation",
            subsections: [
              { title: "Features", href: "/code-search/code-navigation/features", },
              { title: "Search-based code navigation", href: "/code-search/code-navigation/search_based_code_navigation", },
              { title: "Precise code navigation", href: "/code-search/code-navigation/precise_code_navigation", },
              { title: "Indexers", href: "/code-search/code-navigation/writing_an_indexer", },
              { title: "Auto-indexing", href: "/code-search/code-navigation/auto_indexing", },
              { title: "Environment Variables", href: "/code-search/code-navigation/envvars", },
              { title: "Troubleshooting", href: "/code-search/code-navigation/troubleshooting", },
            ]
          },
          {
            title: "Advanced Features", href: "/code-search/working/saved_searches",
            subsections: [
              { title: "Fuzzy Finder", href: "/code-search/types/fuzzy", },
              { title: "Search Contexts", href: "/code-search/working/search_contexts", },
              { title: "Search Jobs", href: "/code-search/types/search-jobs", },
              { title: "Search Snippets", href: "/code-search/working/snippets", },
              { title: "Search Subexpressions", href: "/code-search/working/search_subexpressions", },
              { title: "Saved Searches", href: "/code-search/working/saved_searches", },
              { title: "Structural Search", href: "/code-search/types/structural", }
            ]
          },
          {
            title: "FAQs", href: "/code-search/faq",
          },
        ],
      },
    ],
  },
  {
    separator: "Code Management",
    topics: [
      {
        title: "Batch Changes",
        href: "/batch-changes",
        sections: [
          { title: "Quickstart", href: "/batch-changes/quickstart" },
          {
            title: "Create a Batch Change", href: "/batch-changes/create-a-batch-change",
            subsections: [
              { title: "Update a Batch Change", href: "/batch-changes/update-a-batch-change", },
              { title: "Close a Batch Change", href: "/batch-changes/delete-a-batch-change", },
              { title: "Run Server Side", href: "/batch-changes/server-side", },

            ]
          },
          {
            title: "Bulk Operations", href: "/batch-changes/bulk-operations-on-changesets",
            subsections: [
              { title: "Publishing Changesets", href: "/batch-changes/publishing-changesets", },
              { title: "Tracking Changesets", href: "/batch-changes/tracking-existing-changesets", },
            ]
          },
          {
            title: "Configuring Credentials", href: "/batch-changes/configuring-credentials",
            subsections: [
              { title: "Site Admin Config", href: "/batch-changes/site-admin-configuration", },
            ]
          },
          { title: "Access Permissions", href: "/batch-changes/permissions-in-batch-changes" },
          {
            title: "Changesets in Monorepo", href: "/batch-changes/creating-changesets-per-project-in-monorepos",
            subsections: [
              { title: "Changesets in Large Repos", href: "/batch-changes/creating-multiple-changesets-in-large-repositories", },
            ]
          },
          { title: "Error Handling", href: "/batch-changes/handling-errored-changesets" },
          {
            title: "Examples", href: "/batch-changes/examples",
            subsections: [
              { title: "Refactor Go Code via Comby", href: "/batch-changes/refactor-go-comby", },
              { title: "Update Go Import Statements via Comby", href: "/batch-changes/updating-go-import-statements", },
              { title: "Update Base Images in Dockerfiles", href: "/batch-changes/update-base-images-in-dockerfiles", },
              { title: "Search and Replace Specific Terms", href: "/batch-changes/search-and-replace-specific-terms", },
            ]
          },
          {
            title: "Batch Spec Reference", href: "/batch-changes/batch-spec-yaml-reference",
            subsections: [
              { title: "Batch Spec Templating", href: "/batch-changes/batch-spec-templating", },
              { title: "Batch Spec Cheatsheet", href: "/batch-changes/batch-spec-cheat-sheet", },
            ]
          },
          {
            title: "Working with CLI", href: "/batch-changes/how-src-executes-a-batch-spec",
            subsections: [
              { title: "Re-executing Batch Specs", href: "/batch-changes/reexecuting-batch-specs-multiple-times", },
              { title: "CLI Subcommands", href: "/cli/references/batch", },
            ]
          },
          { title: "Troubleshooting", href: "/batch-changes/troubleshooting" },
          { title: "FAQs", href: "/batch-changes/faq" },
        ],
      },
      {
        title: "Code Monitoring",
        href: "/code_monitoring",
        sections: [
          { title: "Quickstart", href: "/code_monitoring/quickstart" },
          { title: "Explanations", href: "/code_monitoring/explanations" },
          { title: "How-to Guides", href: "/code_monitoring/how-tos" },
        ],
      },
      {
        title: "Code Ownership",
        href: "/own",
        sections: [
          { title: "CODEOWNERS Format", href: "/own/codeowners_format" },
          { title: "CODEOWNERS Ingestion", href: "/own/codeowners_ingestion" },
          { title: "Configuration Reference", href: "/own/configuration_reference" },
          { title: "Assigned Ownership", href: "/own/assigned_ownership" },

        ],
      },
      {
        title: "Code Insights",
        href: "/code_insights",
        sections: [
          { title: "Quickstart", href: "/code_insights/quickstart" },
          { title: "Explanations", href: "/code_insights/explanations" },
          { title: "How-to Guides", href: "/code_insights/how-tos" },
          { title: "References", href: "/code_insights/references" },
        ],
      },
      {
        title: "Notebooks",
        href: "/notebooks",
        sections: [{ title: "Quickstart", href: "/notebooks/quickstart" }],
      },
    ],
  },
  {
    separator: "Platform",
    topics: [
      {
        title: "Sourcegraph Admin",
        href: "/admin",
        sections: [
          { title: "Deploy", href: "/admin/deploy" },
          { title: "Upgrade", href: "/admin/updates" },
          { title: "Configuration", href: "/admin/config" },
          { title: "Licensing", href: "/admin/licensing" },
          { title: "Codehosts", href: "/admin/code_hosts" },
          { title: "User Authentication", href: "/admin/auth" },
          { title: "Access Control", href: "/admin/access_control" },
          { title: "Repository Permissions", href: "/admin/permissions" },
          { title: "Observability", href: "/admin/observability" },
          { title: "Analytics", href: "/admin/analytics" },
          { title: "Executors", href: "/admin/executors" },
          { title: "FAQs", href: "/admin/faq" },
          { title: "Troubleshooting", href: "/admin/troubleshooting" },
          { title: "How-to Guides", href: "/admin/how-to" },
          {
            title: "Enterprise Getting Started",
            href: "/admin/enterprise_getting_started_guide",
          },
          { title: "Pricing", href: "/admin/pricing" },
        ],
      },
      {
        title: "Sourcegraph Cloud",
        href: "/cloud",
      },
      {
        title: "Integrations",
        href: "/integration",
        sections: [
          {
            title: "Browser Extension",
            href: "/integration/browser_extension",
          },
          { title: "Editors", href: "/integration/editor" },
          {
            title: "Browser Search Engine",
            href: "/integration/browser_extension/how-tos/browser_search_engine",
          },
        ],
      },
    ],
  },
  {
    separator: "CLI & API",
    topics: [
      {
        title: "Sourcegraph CLI",
        href: "/cli",
        sections: [
          { title: "Quickstart", href: "/cli/quickstart" },
          { title: "Explanations", href: "/cli/explanations" },
          { title: "How-to Guides", href: "/cli/how-tos" },
          { title: "References", href: "/cli/references" },
        ],
      },
      {
        title: "Sourcegraph GraphQL API",
        href: "/api/graphql",
      },
      {
        title: "Sourcegraph Search API",
        href: "/api/stream_api",
      },
      {
        title: "Sourcegraph REST API",
        href: "/api/openapi",
      },
    ],
  },
  {
    separator: "Help & Support",
    topics: [
      {
        title: "SLAs & Premium Support",
        href: "/sla",
      },
      {
        title: "How to videos",
        href: "/how-to-videos",
        sections: [
          { title: "Code Search", href: "/how-to-videos/code-search" },
          { title: "Cody", href: "/how-to-videos/cody" },
        ],
      },
      {
        title: "Tutorials",
        href: "/tutorials",
      },
      {
        title: "Sourcegraph Accounts",
        href: "/sourcegraph-accounts"
      },
      {
        title: "Changelog",
        href: "https://sourcegraph.com/changelog",
      },
      {
        title: "Releases",
        href: "/releases",
      },
    ],
  }
];

const navigation_5_2: NavigationItem[] = [
  {
    separator: "Code Intelligence",
    topics: [
      {
        title: "Cody",
        href: "/cody",
        sections: [
          { title: "Quickstart", href: "/cody/quickstart" },
          {
            title: "Installation", href: "/cody/clients",
            subsections: [
              { title: "Cody for VS Code", href: "/cody/clients/install-vscode", },
              { title: "Cody for JetBrains", href: "/cody/clients/install-jetbrains", },
              { title: "Cody for Neovim", href: "/cody/clients/install-neovim", },
              { title: "Cody for Web", href: "/cody/clients/cody-with-sourcegraph", },
              { title: "Cody for Enterprise", href: "/cody/clients/enable-cody-enterprise", },
              { title: "LLM Model Configuration", href: "/cody/clients/model-configuration", },
            ]
          },
          {
            title: "Capabilities", href: "/cody/capabilities",
            subsections: [
              { title: "Chat", href: "/cody/capabilities/chat", },
              { title: "Autocomplete", href: "/cody/capabilities/autocomplete", },
              { title: "Commands", href: "/cody/capabilities/commands", },
              { title: "Debug Code", href: "/cody/capabilities/debug-code", },
              { title: "Manage Context", href: "/cody/capabilities/ignore-context", },
              { title: "Feature Parity Reference", href: "/cody/clients/feature-reference", },
            ]
          },
          {
            title: "Core Concepts", href: "/cody/core-concepts/context",
            subsections: [
              { title: "Context", href: "/cody/core-concepts/context", },
              { title: "Keyword Search", href: "/cody/core-concepts/keyword-search", },
              { title: "Cody Gateway", href: "/cody/core-concepts/cody-gateway", },
            ]
          },
          { title: "Usage and Pricing", href: "/cody/usage-and-pricing" },
          { title: "Troubleshooting", href: "/cody/troubleshooting" },
          { title: "FAQs", href: "/cody/faq" },
        ],
      },
      {
        title: "Code Search",
        href: "/code-search",
        sections: [
          { title: "Features", href: "/code-search/features" },
          {
            title: "Search Query Syntax", href: "/code-search/queries",
            subsections: [
              { title: "Search Filters Panel", href: "/code-search/working/search_filters", },
              { title: "Search Examples", href: "/code-search/queries/examples", },
              { title: "Symbol Search", href: "/code-search/types/symbol", },
              { title: "Language Reference", href: "/code-search/queries/language", },
            ]
          },
          {
            title: "Advanced Features", href: "/code-search/working/saved_searches",
            subsections: [
              { title: "Fuzzy Finder", href: "/code-search/types/fuzzy", },
              { title: "Search Contexts", href: "/code-search/working/search_contexts", },
              { title: "Search Jobs", href: "/code-search/types/search-jobs", },
              { title: "Search Snippets", href: "/code-search/working/snippets", },
              { title: "Search Subexpressions", href: "/code-search/working/search_subexpressions", },
              { title: "Saved Searches", href: "/code-search/working/saved_searches", },
              { title: "Structural Search", href: "/code-search/types/structural", }
            ]
          },
          {
            title: "FAQs", href: "/code-search/faq",
          },
        ],
      },
      {
        title: "Code Navigation", href: "/code_navigation",
        sections: [
          { title: "Features", href: "/code_navigation/explanations/features", },
          { title: "Search-based code navigation", href: "/code_navigation/explanations/search_based_code_navigation", },
          { title: "Precise code navigation", href: "/code_navigation/explanations/precise_code_navigation", },
          { title: "Indexers", href: "/code_navigation/explanations/writing_an_indexer", },
          { title: "Auto-indexing", href: "/code_navigation/explanations/auto_indexing", },
          { title: "Environment Variables", href: "/code_navigation/references/envvars", },
          { title: "Troubleshooting", href: "/code_navigation/references/troubleshooting", },
        ]
      },
    ],
  },
  {
    separator: "Code Management",
    topics: [
      {
        title: "Batch Changes",
        href: "/batch_changes",
        sections: [
          { title: "Quickstart", href: "/batch_changes/quickstart" },
          { title: "Explanations", href: "/batch_changes/explanations" },
          { title: "Tutorials", href: "/batch_changes/tutorials" },
          { title: "How-to Guides", href: "/batch_changes/how-tos" },
          { title: "Reference", href: "/batch_changes/references" },
        ],
      },
      {
        title: "Code Monitoring",
        href: "/code_monitoring",
        sections: [
          { title: "Quickstart", href: "/code_monitoring/quickstart" },
          { title: "Explanations", href: "/code_monitoring/explanations" },
          { title: "How-to Guides", href: "/code_monitoring/how-tos" },
        ],
      },
      {
        title: "Code Ownership",
        href: "/own",
        sections: [
          { title: "CODEOWNERS Format", href: "/own/codeowners_format" },
          { title: "CODEOWNERS Ingestion", href: "/own/codeowners_ingestion" },
          { title: "Configuration Reference", href: "/own/configuration_reference" },
          { title: "Assigned Ownership", href: "/own/assigned_ownership" },

        ],
      },
      {
        title: "Code Insights",
        href: "/code_insights",
        sections: [
          { title: "Quickstart", href: "/code_insights/quickstart" },
          { title: "Explanations", href: "/code_insights/explanations" },
          { title: "How-to Guides", href: "/code_insights/how-tos" },
          { title: "References", href: "/code_insights/references" },
        ],
      },
      {
        title: "Notebooks",
        href: "/notebooks",
        sections: [{ title: "Quickstart", href: "/notebooks/quickstart" }],
      },
    ],
  },
  {
    separator: "Platform",
    topics: [
      {
        title: "Sourcegraph Admin",
        href: "/admin",
        sections: [
          { title: "Deploy", href: "/admin/deploy" },
          { title: "Upgrade", href: "/admin/updates" },
          { title: "Configuration", href: "/admin/config" },
          { title: "Licensing", href: "/admin/licensing" },
          { title: "Codehosts", href: "/admin/code_hosts" },
          { title: "User Authentication", href: "/admin/auth" },
          { title: "Access Control", href: "/admin/access_control" },
          { title: "Repository Permissions", href: "/admin/permissions" },
          { title: "Observability", href: "/admin/observability" },
          { title: "Analytics", href: "/admin/analytics" },
          { title: "Executors", href: "/admin/executors" },
          { title: "FAQs", href: "/admin/faq" },
          { title: "Troubleshooting", href: "/admin/troubleshooting" },
          { title: "How-to Guides", href: "/admin/how-to" },
          {
            title: "Enterprise Getting Started",
            href: "/admin/enterprise_getting_started_guide",
          },
          { title: "Pricing", href: "/admin/pricing" },
        ],
      },
      {
        title: "Sourcegraph Cloud",
        href: "/cloud",
      },
      {
        title: "Integrations",
        href: "/integration",
        sections: [
          {
            title: "Browser Extension",
            href: "/integration/browser_extension",
          },
          { title: "Editors", href: "/integration/editor" },
          {
            title: "Browser Search Engine",
            href: "/integration/browser_extension/how-tos/browser_search_engine",
          },
        ],
      },
    ],
  },
  {
    separator: "CLI & API",
    topics: [
      {
        title: "Sourcegraph CLI",
        href: "/cli",
        sections: [
          { title: "Quickstart", href: "/cli/quickstart" },
          { title: "Explanations", href: "/cli/explanations" },
          { title: "How-to Guides", href: "/cli/how-tos" },
          { title: "References", href: "/cli/references" },
        ],
      },
      {
        title: "Sourcegraph GraphQL API",
        href: "/api/graphql",
      },
      {
        title: "Sourcegraph Stream API",
        href: "/api/stream_api",
      },
    ],
  },
  {
    separator: "Help & Support",
    topics: [
      {
        title: "SLAs & Premium Support",
        href: "/sla",
      },
      {
        title: "Tutorials",
        href: "/tutorials",
      },
      {
        title: "Sourcegraph Accounts",
        href: "/sourcegraph-accounts"
      },
      {
        title: "Changelog",
        href: "https://sourcegraph.com/changelog",
      },
    ],
  },
];

const navigation_5_3: NavigationItem[] = [
  {
    separator: "Code Intelligence",
    topics: [
      {
        title: "Cody",
        href: "/cody",
        sections: [
          { title: "Quickstart", href: "/cody/quickstart" },
          {
            title: "Installation", href: "/cody/clients",
            subsections: [
              { title: "Cody for VS Code", href: "/cody/clients/install-vscode", },
              { title: "Cody for JetBrains", href: "/cody/clients/install-jetbrains", },
              { title: "Cody for Neovim", href: "/cody/clients/install-neovim", },
              { title: "Cody for Web", href: "/cody/clients/cody-with-sourcegraph", },
              { title: "Cody for Enterprise", href: "/cody/clients/enable-cody-enterprise", },
            ]
          },
          {
            title: "Capabilities", href: "/cody/capabilities",
            subsections: [
              { title: "Chat", href: "/cody/capabilities/chat", },
              { title: "Autocomplete", href: "/cody/capabilities/autocomplete", },
              { title: "Commands", href: "/cody/capabilities/commands", },
              { title: "Debug Code", href: "/cody/capabilities/debug-code", },
              { title: "Cody Ignore", href: "/cody/capabilities/ignore-context", },
              { title: "Supported Models", href: "/cody/capabilities/supported-models", },
              { title: "Feature Parity Reference", href: "/cody/clients/feature-reference", },
            ]
          },
          {
            title: "Core Concepts", href: "/cody/core-concepts/context",
            subsections: [
              { title: "Context", href: "/cody/core-concepts/context", },
              { title: "Token Limits", href: "/cody/core-concepts/token-limits", },
              // { title: "Embeddings", href: "/cody/core-concepts/embeddings", },
              { title: "Keyword Search", href: "/cody/core-concepts/keyword-search", },
              // { title: "Code Graph", href: "/cody/core-concepts/code-graph", },
              { title: "Cody Gateway", href: "/cody/core-concepts/cody-gateway", },
              { title: "Enterprise Architecture", href: "/cody/core-concepts/enterprise-architecture", },
            ]
          },
          // {
          //   title: "Use Cases", href: "/cody/use-cases/generate-unit-tests",
          //   subsections: [
          //     { title: "Generate Unit Tests", href: "/cody/use-cases/generate-unit-tests", },
          //     // { title: "Build UI", href: "/cody/use-cases/build-ui", },
          //   ]
          // },
          { title: "Usage and Pricing", href: "/cody/usage-and-pricing" },
          { title: "Troubleshooting", href: "/cody/troubleshooting" },
          { title: "FAQs", href: "/cody/faq" },
        ],
      },
      {
        title: "Code Search",
        href: "/code-search",
        sections: [
          { title: "Features", href: "/code-search/features" },
          {
            title: "Search Query Syntax", href: "/code-search/queries",
            subsections: [
              { title: "Search Filters Panel", href: "/code-search/working/search_filters", },
              { title: "Search Examples", href: "/code-search/queries/examples", },
              { title: "Symbol Search", href: "/code-search/types/symbol", },
              { title: "Language Reference", href: "/code-search/queries/language", },
            ]
          },
          {
            title: "Code Navigation", href: "/code-search/code-navigation",
            subsections: [
              { title: "Features", href: "/code-search/code-navigation/features", },
              { title: "Search-based code navigation", href: "/code-search/code-navigation/search_based_code_navigation", },
              { title: "Precise code navigation", href: "/code-search/code-navigation/precise_code_navigation", },
              { title: "Indexers", href: "/code-search/code-navigation/writing_an_indexer", },
              { title: "Auto-indexing", href: "/code-search/code-navigation/auto_indexing", },
              { title: "Environment Variables", href: "/code-search/code-navigation/envvars", },
              { title: "Troubleshooting", href: "/code-search/code-navigation/troubleshooting", },
            ]
          },
          {
            title: "Advanced Features", href: "/code-search/working/saved_searches",
            subsections: [
              { title: "Fuzzy Finder", href: "/code-search/types/fuzzy", },
              { title: "Search Contexts", href: "/code-search/working/search_contexts", },
              { title: "Search Subexpressions", href: "/code-search/working/search_subexpressions", },
              { title: "Search Jobs", href: "/code-search/types/search-jobs", },
              { title: "Search Snippets", href: "/code-search/working/snippets", },
              { title: "Saved Searches", href: "/code-search/working/saved_searches", },
              { title: "Structural Search", href: "/code-search/types/structural", }
            ]
          },
          {
            title: "FAQs", href: "/code-search/faq",
          },
        ],
      },
    ],
  },
  {
    separator: "Code Management",
    topics: [
      {
        title: "Batch Changes",
        href: "/batch-changes",
        sections: [
          { title: "Quickstart", href: "/batch-changes/quickstart" },
          {
            title: "Create a Batch Change", href: "/batch-changes/create-a-batch-change",
            subsections: [
              { title: "Update a Batch Change", href: "/batch-changes/update-a-batch-change", },
              { title: "Close a Batch Change", href: "/batch-changes/delete-a-batch-change", },
              { title: "Run Server Side", href: "/batch-changes/server-side", },

            ]
          },
          {
            title: "Bulk Operations", href: "/batch-changes/bulk-operations-on-changesets",
            subsections: [
              { title: "Publishing Changesets", href: "/batch-changes/publishing-changesets", },
              { title: "Tracking Changesets", href: "/batch-changes/tracking-existing-changesets", },
            ]
          },
          {
            title: "Configuring Credentials", href: "/batch-changes/configuring-credentials",
            subsections: [
              { title: "Site Admin Config", href: "/batch-changes/site-admin-configuration", },
            ]
          },
          { title: "Access Permissions", href: "/batch-changes/permissions-in-batch-changes" },
          {
            title: "Changesets in Monorepo", href: "/batch-changes/creating-changesets-per-project-in-monorepos",
            subsections: [
              { title: "Changesets in Large Repos", href: "/batch-changes/creating-multiple-changesets-in-large-repositories", },
            ]
          },
          { title: "Error Handling", href: "/batch-changes/handling-errored-changesets" },
          {
            title: "Examples", href: "/batch-changes/examples",
            subsections: [
              { title: "Refactor Go Code via Comby", href: "/batch-changes/refactor-go-comby", },
              { title: "Update Go Import Statements via Comby", href: "/batch-changes/updating-go-import-statements", },
              { title: "Update Base Images in Dockerfiles", href: "/batch-changes/update-base-images-in-dockerfiles", },
              { title: "Search and Replace Specific Terms", href: "/batch-changes/search-and-replace-specific-terms", },
            ]
          },
          {
            title: "Batch Spec Reference", href: "/batch-changes/batch-spec-yaml-reference",
            subsections: [
              { title: "Batch Spec Templating", href: "/batch-changes/batch-spec-templating", },
              { title: "Batch Spec Cheatsheet", href: "/batch-changes/batch-spec-cheat-sheet", },
            ]
          },
          {
            title: "Working with CLI", href: "/batch-changes/how-src-executes-a-batch-spec",
            subsections: [
              { title: "Re-executing Batch Specs", href: "/batch-changes/reexecuting-batch-specs-multiple-times", },
            ]
          },
          { title: "Troubleshooting", href: "/batch-changes/troubleshooting" },
          { title: "FAQs", href: "/batch-changes/faq" },
        ],
      },
      {
        title: "Code Monitoring",
        href: "/code_monitoring",
        sections: [
          { title: "Quickstart", href: "/code_monitoring/quickstart" },
          { title: "Explanations", href: "/code_monitoring/explanations" },
          { title: "How-to Guides", href: "/code_monitoring/how-tos" },
        ],
      },
      {
        title: "Code Ownership",
        href: "/own",
        sections: [
          { title: "CODEOWNERS Format", href: "/own/codeowners_format" },
          { title: "CODEOWNERS Ingestion", href: "/own/codeowners_ingestion" },
          { title: "Configuration Reference", href: "/own/configuration_reference" },
          { title: "Assigned Ownership", href: "/own/assigned_ownership" },

        ],
      },
      {
        title: "Code Insights",
        href: "/code_insights",
        sections: [
          { title: "Quickstart", href: "/code_insights/quickstart" },
          { title: "Explanations", href: "/code_insights/explanations" },
          { title: "How-to Guides", href: "/code_insights/how-tos" },
          { title: "References", href: "/code_insights/references" },
        ],
      },
      {
        title: "Notebooks",
        href: "/notebooks",
        sections: [{ title: "Quickstart", href: "/notebooks/quickstart" }],
      },
    ],
  },
  {
    separator: "Platform",
    topics: [
      {
        title: "Sourcegraph Admin",
        href: "/admin",
        sections: [
          { title: "Deploy", href: "/admin/deploy" },
          { title: "Upgrade", href: "/admin/updates" },
          { title: "Configuration", href: "/admin/config" },
          { title: "Licensing", href: "/admin/licensing" },
          { title: "Codehosts", href: "/admin/code_hosts" },
          { title: "User Authentication", href: "/admin/auth" },
          { title: "Access Control", href: "/admin/access_control" },
          { title: "Repository Permissions", href: "/admin/permissions" },
          { title: "Observability", href: "/admin/observability" },
          { title: "Analytics", href: "/admin/analytics" },
          { title: "Executors", href: "/admin/executors" },
          { title: "FAQs", href: "/admin/faq" },
          { title: "Troubleshooting", href: "/admin/troubleshooting" },
          { title: "How-to Guides", href: "/admin/how-to" },
          {
            title: "Enterprise Getting Started",
            href: "/admin/enterprise_getting_started_guide",
          },
          { title: "Pricing", href: "/admin/pricing" },
        ],
      },
      {
        title: "Sourcegraph Cloud",
        href: "/cloud",
      },
      {
        title: "Integrations",
        href: "/integration",
        sections: [
          {
            title: "Browser Extension",
            href: "/integration/browser_extension",
          },
          { title: "Editors", href: "/integration/editor" },
          {
            title: "Browser Search Engine",
            href: "/integration/browser_extension/how-tos/browser_search_engine",
          },
        ],
      },
    ],
  },
  {
    separator: "CLI & API",
    topics: [
      {
        title: "Sourcegraph CLI",
        href: "/cli",
        sections: [
          { title: "Quickstart", href: "/cli/quickstart" },
          { title: "Explanations", href: "/cli/explanations" },
          { title: "How-to Guides", href: "/cli/how-tos" },
          { title: "References", href: "/cli/references" },
        ],
      },
      {
        title: "Sourcegraph GraphQL API",
        href: "/api/graphql",
      },
      {
        title: "Sourcegraph Stream API",
        href: "/api/stream_api",
      },
    ],
  },
  {
    separator: "Help & Support",
    topics: [
      {
        title: "SLAs & Premium Support",
        href: "/sla",
      },
      {
        title: "Tutorials",
        href: "/tutorials",
      },
      {
        title: "Sourcegraph Accounts",
        href: "/sourcegraph-accounts"
      },
      {
        title: "Changelog",
        href: "https://sourcegraph.com/changelog",
      },
    ],
  },
];

export const versionNavigations: VersionNavigations = {
  navigation, // latest version
  '5.2': navigation_5_2,
  '5.3': navigation_5_3,
}
