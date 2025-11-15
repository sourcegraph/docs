# How we use Docs Chatbot?

Contact the docs team for any more questions on this.

## To sync all the latest docs changes in the `main` branch check out to the `main` branch and run

```sh
pnpm sync
```

This will verify all the changes since the last sync, update these files, and then write the commit hash to `baseai/memory/docs/index.ts` file which you should commit to keep track.
