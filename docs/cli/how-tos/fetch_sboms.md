# How to Fetch SBOMs for Sourcegraph

Sourcegraph publishes Software Bill of Materials (SBOM) for all of its container images. The SBOMs for each Sourcegraph release are signed, and stored in our container registry alongside our published container images.

To retrieve the SBOMs for a specific release, you can use the `src` command line interface for Sourcegraph:

1. Install `src` by following the [Quickstart](../quickstart.md).
2. Install `cosign` by following the [Installation Guide](https://docs.sigstore.dev/cosign/system_config/installation/).
3. Identify your Sourcegraph instance's version - you can do this by checking your deployment, or visiting the Settings page on your Sourcegraph instance at and checking the version shown in the bottom left corner. 
4. Run `src sbom fetch -v <version>` to fetch SBOMs for all containers in this release. `src` will automatically validate that all SBOMs were signed by Sourcegraph.
```bash
# Fetch SBOMs for Sourcegraph release 5.8.123
$ src sbom fetch -v 5.8.123
```
5. Once completed, you can find the set of validated SBOMs under `sourcegraph-sboms/sourcegraph-<version>/`.

**Note:** `src sbom fetch` will retrieve SBOMs for **all** containers that make up a Sourcegraph release. Your Sourcegraph instance will use only a subset of these containers - please check your deployment to determine which SBOM files are relevant to your deployment.
