# Logos

Logos to be consumed in Mermaid chart.

## Usage

To use the logos in your Mermaid charts, reference them with the `$pkg:$name` syntax. For example, to use the EC2 logo from the AWS package, you would use `aws:ec2`.

## Download more logos

For existing packages such as AWS, visit the [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) page to download the package. After downloading, extract the icons and add them to the `src/images/logos/aws` directory in this repository.

Then, run:

```
pnpm run generate-mermaid-logos
```

If you're adding a new package, such as Kubernetes, you should locate the official icon set online in SVG format, download it, and add the icons to a new directory under `src/images/logos/`. For example, for Kubernetes, you would create `src/images/logos/kubernetes` and place the SVG files there. After adding the icons, run the same command to generate the Mermaid logo definitions.

You can also fine more logos from https://icones.js.org/ and load them in [Mermaid.tsx](./../../components/Mermaid.tsx) by calling `mermaid.registerIconPacks`.
