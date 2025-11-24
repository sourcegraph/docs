# Sourcegraph Docs - Agent Instructions

## Build Commands

-   **Type Check**: `npx tsc --noEmit`
-   **Build**: `npm run build`
-   **Dev**: `npm run dev`
-   **Lint**: `npm run lint`

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

### Previous Integration

Previously used **Langbase** with custom React components. This has been completely removed:

-   Removed `@langbase/components` and `langbase` packages
-   Removed custom chat components (`src/app/chat.tsx`, `src/components/ChatBot/`)
-   Removed API routes (`src/app/api/chat/`)
-   Removed memory creation scripts

## Important Notes

-   **Assistant ID**: The `runllm-assistant-id` is currently set to "YOUR_ASSISTANT_ID" and needs to be updated with the actual Sourcegraph runLLM assistant ID
-   **Deployment**: After updating the assistant ID, add the deployment URL to the runLLM dashboard
-   **Styling**: The widget inherits the site's theme and uses the Sourcegraph brand color (#FF5543)
