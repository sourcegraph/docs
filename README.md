# Sourcegraph Docs

Welcome to the Sourcegraph documentation! We're excited to have you contribute to our docs. We've recently rearchitectured our docs tech stack — powered by Next.js, TailwindCSS and deployed on Vercel. This guide will walk you through the process of contributing to our documentation using the new tech stack.

## Get started

To get started with this template, clone this repository to your local machine using the following command:

```sh
git clone https://github.com/sourcegraph/sourcegraph-docs-v2.git
```

Navigate to the project directory by typing the following command in your terminal:

```sh
cd sourcegraph-docs-v2
```

Once you are inside the `sourcegraph-docs-v2` root folder, install the dependencies. Type the following in terminal:

```sh
npm install
```

Next, run the development server:

```sh
npm run dev
```

Finally, open [`http://localhost:3000`](http://localhost:3000) in your browser to view the website.

## Writing and contributing to Sourcegraph Docs

To add new or update existing docs content. Create a new branch and checkout by via:

```sh
git checkout -b BRANCH_NAME_HERE
```

### Folder structure

The folder structure is exactly the same here. All the docs reside within the `/docs` folder. Here you'll find separate folders for every docs section like `cody`, `code_search`, `cli`, etc.

- Navigate to the relevant relevant section for your contribution
- If you're adding a new page, create a new MDX file (e.g., `my-new-page.mdx`) in the appropriate folder

### Using MDX

We use MDX for our documentation, which allows you to seamlessly integrate JSX (React components) within Markdown. Write your content using standard markdown syntax. For example,

```

# This is heading 1

This is an introductory paragraph.

## This is heading 2

### This is heading 3

These are the details for heading three. And this how you add an image.

![demo-image](https://storage.googleapis.com/sourcegraph-assets/Docs/cody-sign-in.png)

This is how you add a [demo-link](https://sourcegraph.com/)

- This is a bullet 1
- This is bullet 2
- This is bullet 3
```

### Including React Components

The only difference with this new stack is its ability to use React components. We have a set of reusable React components located in the `src/components` directory. These components are designed to enhance the user experience and maintain consistency across our documentation.

For example the cards layout appears by using the `<Callout>` component that can add `note`, `info`, or `warning` notices in docs.

![](https://storage.googleapis.com/sourcegraph-assets/Docs/CleanShot%202023-12-12%20at%2012.00.29%402x.png)

You can use this component within your content as follows:

```js
<Callout type="note">Cody is currently in Beta stage for all users.</Callout>
```

This snippet creates a single `<QuickLink>` titled as "Get Cody". You can add as many cards you want while filling out all the relevant details.

Here are the list of all the supported components we have:

- `<QuickLinks>`
- `<ProductLinks>`
- `<LinkCards>`
- `<Callout>`

For a better docs experience we'll continue adding more components in future.

### Adding a link

To add a `link` to any docs page, use the following routing syntax: `[Link text](path-to-link)`.

- Do not include `/docs` in the link paths. The base URL will be `sourcegraph.com/docs`
- There should be **no file extension** in the path name

For example, if you want to link to the Cody Quickstart somewhere in the Code Search docs, you should use:

```markdown
- This is a link to [Cody Quickstart](/cody/quickstart) in Code Search docs
- This is a way to hash-link to [Cody for VSCode installation](/cody/clients/install-vscode#verifying-the-installation) in Code Search docs
```

## Previewing Changes

### Locally

As you make changes to the documentation, the development server will automatically update. Review your changes by navigating to `http://localhost:3000` in your browser.

### Deployed Preview URL

When you open a new PR you will get a deployed preview link from Vercel to view it. Use this link to view and share with other teammates.

![](https://storage.googleapis.com/sourcegraph-assets/Docs/CleanShot%202023-12-13%20at%2016.19.14%402x.png)

> NOTE: To view the docs please append `/docs` in the end of the preview URL. Otherwise you'll get a 404 error on the base URL.

## Submitting your Contribution

Once you're satisfied with your changes, follow these steps:

- Commit your changes
- Create a pull request to the [Sourcegraph documentation repository](https://github.com/sourcegraph/sourcegraph-docs-v2).
- Tag `@maedahbatool` in `#docs` channel through Slack to get a quick review

Thank you for contributing to Sourcegraph documentation! Your efforts help us provide top-notch learning experiences for our users. If you have any questions or need assistance, feel free to reach out.
