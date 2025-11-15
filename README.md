<!-- Working Branch for May Release -->

# Sourcegraph Docs

<!-- Working branch for Sourcegraph 6.5 Release -->

Welcome to the Sourcegraph documentation! We're excited to have you contribute to our docs. Our docs tech stack is powered by Next.js, TailwindCSS and deployed on Vercel. This guide will walk you through the process of contributing to our documentation.

## Get started

To get started with this template, clone this repository to your local machine using the following command:

```sh
git clone https://github.com/sourcegraph/docs.git docs
```

Navigate to the project directory by typing the following command in your terminal:

```sh
cd docs
```

Before the dependencies are installed make sure your local machine has the following versions of `node` and `pnpm` installed:

-   node: `v20.8.1`
-   pnpm: `8.13.1`

**Note**: If you have `mise` available you can install the above versions for only this repository by running the following command from your terminal in the root folder:

```sh
mise install
```

Now that the base requirements of the project have been satisfied, we can install the required dependencies to run the development server!

```sh
pnpm install
```

Next, run the development server:

```sh
pnpm run dev
```

Finally, open [`http://localhost:3000`](http://localhost:3000) in your browser to view the website.

## Writing and contributing to Sourcegraph Docs

### (Easy) Using GitHub to edit existing files

You can easily update existing docs pages using [GitHub's file editor](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files). All you need to do is:

1. Find the corresponding `.mdx` file in the [folder structure](#folder-structure).
2. Click the pencil icon to open the file editor.
3. Make your changes.
4. Click on the green "Commit changes..." button.
5. Provide a Commit message and an Extended description.
6. Click on the green "Propose changes" button to create a PR.
7. Add a PR reviewer to the Reviewers panel by clicking on the gear icon.
8. Tag `@maedahbatool` in the `#docs` Slack channel and link to your PR to get a quick review.
    > NOTE: "Edit from GitHub" is generally recommended for text-based edits. For more structural-based contributions like adding React components and code blocks, it's always better to go with a local setup. This way, you can preview changes before you commit.

### (Advanced) Local dev environment

To add new or update existing docs content. Create a new branch and checkout by via:

```sh
git switch -c BRANCH_NAME_HERE
```

### Folder structure

The folder structure is exactly the same here. All the docs reside within the `/docs` folder. Here you'll find separate folders for every docs section like `cody`, `code_search`, `cli`, etc.

-   Navigate to the relevant relevant section for your contribution
-   If you're adding a new page, create a new MDX file (e.g., `my-new-page.mdx`) in the appropriate folder

### Using MDX

We use MDX for our documentation, which allows you to seamlessly integrate JSX (React components) within Markdown. Write your content using standard markdown syntax. For example,

```

# This is heading 1

This is an introductory paragraph.

## This is heading 2

### This is heading 3

These are the details for heading three.

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
<Callout type="note">Cody is currently in Beta for all users.</Callout>
```

This snippet creates a single `<QuickLink>` titled as "Get Cody". You can add as many cards you want while filling out all the relevant details.

Here are the list of all the supported components we have:

-   `<QuickLinks>`
-   `<ProductLinks>`
-   `<LinkCards>`
-   `<Callout>`

For a better docs experience, we'll continue adding more components in the future.

### Adding a link

To add a `link` to any docs page, use the following routing syntax: `[Link text](path-to-link)`.

-   Do not include `/docs` in the link paths. The base URL will be `sourcegraph.com/docs`
-   There should be **no file extension** in the path name

For example, if you want to link to the Cody Quickstart somewhere in the Code Search docs, you should use:

```markdown
-   This is a link to [Cody Quickstart](/cody/quickstart) in Code Search docs
-   This is a way to hash-link to [Cody for VSCode installation](/cody/clients/install-vscode#verifying-the-installation) in Code Search docs
```

### Adding media assets (images, videos and gifs)

You can upload images, videos and gifs to Sourcegraph docs. For a more detailed instructions visit [this page](https://www.notion.so/sourcegraph/How-to-host-blog-assets-using-GCP-file-storage-a2cae02bd0c74166a12eaff5062c41ad).

> Note: Make sure to use [ImageOptim.app](https://imageoptim.com/mac) to reduce the size of the images before uploading, since large images degrade page loading speed.

## Previewing Changes

### Locally

As you make changes to the documentation, the development server will automatically update. Review your changes by navigating to `http://localhost:3000` in your browser.

### Previewing Vercel Deployments

When you open a PR Vercel deploys and provides you with a preview deployment link. To view your deployment, click the **Visit Preview** link from Vercel's deployment panel in your PRs and you get a preview of your docs

![CleanShot 2024-11-05 at 10 11 29@2x](https://github.com/user-attachments/assets/b0911e2e-95a7-4f56-b2ff-b659d13077d8)

## Submitting your Contribution

Once you're satisfied with your changes, follow these steps:

-   Commit your changes
-   Create a pull request to the [Sourcegraph documentation repository](https://github.com/sourcegraph/docs).
-   Tag `@maedahbatool` in `#docs` channel through Slack to get a quick review

Thank you for contributing to Sourcegraph documentation! Your efforts help us provide top-notch learning experiences for our users. If you have any questions or need assistance, feel free to reach out.
