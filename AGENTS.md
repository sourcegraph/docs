# Sourcegraph Docs - Agent Instructions

## Build Commands

-   **Type Check**: `npx tsc --noEmit`
-   **Build**: `npm run build`
-   **Dev**: `npm run dev`
-   **Lint**: `npm run lint`
-   **Check links**: `npm run check-links -- --check-anchors --check-self-links` (CI comments on PRs that break links; see `dev/check-links.mjs`; `npm run build` runs it without flags, so only dead page links fail a deploy). When moving a page or renaming a heading, update every link to it; a redirect in `src/data/redirects.ts` does not satisfy the check. Link to this site with relative paths (`/admin/config/site-config`), never `https://sourcegraph.com/docs/…` or `https://docs.sourcegraph.com/…`. To also probe the external links you added: `npm run check-links -- --check-anchors --check-self-links --check-external --diff <(git diff -U0 origin/main)`
-   **Prove changed links resolve on a deploy**: `node dev/verify-links-live.mjs --site <vercel-preview-url>` prints a Markdown table for the PR description

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
