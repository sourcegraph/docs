# Sourcegraph Docs - Agent Instructions

## Build Commands

-   **Type Check**: `npx tsc --noEmit`
-   **Build**: `npm run build`
-   **Dev**: `npm run dev`
-   **Lint**: `npm run lint`
-   **Checks**: `npm run check` runs every `dev/check-*.mjs` (links, filenames, images); `npm run build` runs them first, so any finding fails a deploy
-   **Check links**: `npm run check -- links --check-anchors --check-self-links` (CI comments on PRs that break links; see `dev/check-links.mjs`; the build runs it without flags, so only dead page links fail a deploy). When moving a page or renaming a heading, update every link to it; a redirect in `src/data/redirects.ts` does not satisfy the check. Link to this site with relative paths (`/admin/config/site-config`), never `https://sourcegraph.com/docs/…` or `https://docs.sourcegraph.com/…`. To also probe the external links you added: `npm run check -- links --check-anchors --check-self-links --check-external --diff <(git diff -U0 origin/main)`
-   **Prove changed links resolve on a deploy**: `node dev/verify-links-live.mjs --site <vercel-preview-url>` prints a Markdown table for the PR description
-   **Vercel build failures**: Vercel shows build logs only to its team members, so `.github/workflows/vercel-build-report.yml` attaches the log to the Vercel Slack app's "failed to deploy" post in `#alerts-vercel-doc-site` and comments a link to it on the PR (see `dev/report-vercel-build.mjs`). The log itself never goes on the PR, since the repository is public. It reads Vercel with the `VERCEL_TOKEN` repo secret, a token scoped to the `sourcegraph-docs` project that expires 2026-12-10; mint a new one with `POST /v3/user/tokens?teamId=<team>` and `projectId` in the body. Slack needs the `SLACK_BOT_TOKEN` repo secret and `SLACK_CHANNEL_ID` repo variable. The bot is the Slack app in `dev/slack-app-vercel-build-report.json`; to recreate it, paste that manifest at <https://api.slack.com/apps?new_app=1> (From a manifest), install it, copy its Bot User OAuth Token into the secret, and `/invite @Vercel build log` to the channel

## AI Chat Integration

This site uses **runLLM** for the AI chat widget. The integration is implemented via:

-   **Location**: `src/app/layout.tsx`
-   **Widget**: runLLM script loaded via Next.js `<Script>` component
-   **Configuration**:
    -   Position: BOTTOM_RIGHT
    -   Theme color: #FF5543 (Sourcegraph brand color)
    -   Button text: "Ask AI"
    -   Keyboard shortcut: Mod+j

### runLLM Configuration

To update the runLLM assistant ID or other settings, modify the Script component in `src/app/layout.tsx`:

```tsx
<Script
	id="runllm-widget-script"
	type="module"
	src="https://widget.runllm.com"
	crossOrigin=""
	runllm-keyboard-shortcut="Mod+j"
	runllm-name="Sourcegraph AI Assistant"
	runllm-position="BOTTOM_RIGHT"
	runllm-assistant-id="YOUR_ASSISTANT_ID" // Update this
	runllm-theme-color="#FF5543"
	runllm-floating-button-text="Ask AI"
	async
/>
```

The previous **Langbase** / `baseai` chatbot integration has been fully removed (packages, components, API routes, `baseai/` memory config, and the `pnpm sync` script).

## Important Notes

-   **Assistant ID**: The `runllm-assistant-id` is currently set to "YOUR_ASSISTANT_ID" and needs to be updated with the actual Sourcegraph runLLM assistant ID
-   **Deployment**: After updating the assistant ID, add the deployment URL to the runLLM dashboard
-   **Styling**: The widget inherits the site's theme and uses the Sourcegraph brand color (#FF5543)
