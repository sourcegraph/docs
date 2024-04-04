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
              // { title: "Embeddings", href: "/cody/core-concepts/embeddings", },
              { title: "Keyword Search", href: "/cody/core-concepts/keyword-search", },
              // { title: "Code Graph", href: "/cody/core-concepts/code-graph", },
              { title: "Cody Gateway", href: "/cody/core-concepts/cody-gateway", },
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
          { title: "Capabilities", href: "/code-search/features" },
          {
            title: "Search Types", href: "/code-search/types/exhaustive",
            subsections: [
              { title: "Exhaustive Search", href: "/code-search/types/exhaustive", },
              { title: "Search Jobs", href: "/code-search/types/search-jobs", },
              { title: "Structural Search", href: "/code-search/types/structural", },
              { title: "Fuzzy Search", href: "/code-search/types/fuzzy", },
            ]
          },
          {
            title: "Working with Search", href: "/code-search/working/saved_searches",
            subsections: [
              { title: "Saved Search", href: "/code-search/working/saved_searches", },
              { title: "Search Filters", href: "/code-search/working/search_filters", },
              { title: "Search Snippet", href: "/code-search/working/snippets", },
              { title: "Search Contexts", href: "/code-search/working/search_contexts", },
              { title: "Search Subexpressions", href: "/code-search/working/search_subexpressions", },
            ]
          },
          {
            title: "Search Query Syntax", href: "/code-search/queries",
            subsections: [
              { title: "Query Language", href: "/code-search/queries/language", },
            ]
          },
          {
            title: "Search Examples", href: "/code-search/examples",
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
        title: "Code Navigation",
        href: "/code_navigation",
        sections: [
          { title: "How-to Guides", href: "/code_navigation/how-to" },
          { title: "Explanations", href: "/code_navigation/explanations" },
          { title: "References", href: "/code_navigation/references" },
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
          { title: "Codehosts", href: "/admin/external_service" },
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
      {
        title: "Development",
        href: "/dev",
        sections: [
          { title: "Setup", href: "/dev/setup" },
          { title: "How-to Guides", href: "/dev/how-to" },
          { title: "Contributing", href: "/dev/contributing" },
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
      // {
      //   title: "Support Center",
      //   href: "#",
      //   sections: [
      //     { title: "Intro", href: "#" },
      //     { title: "Examples", href: "#" },
      //   ],
      // },
      {
        title: "Changelog",
        href: "/CHANGELOG",
      },
    ],
  },
];
