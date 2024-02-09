import { run } from 'spectaql'

const cwd = process.cwd()

const spectaqlOptions = {
   specFile: `${cwd}/spectaql-config.yml`,
   resolveWithOutput: true,
}

const { html } = await run(spectaqlOptions)

(async () => {
   // download all graphql docs in a dir
})()
