#!/usr/bin/env bash

# Env variables
export versionRegex="[0-9]+\.[0-9]+\.[0-9]+"
# versionRegex
# currentVersion
# newVersion
export newVersion="5.7.0"

# Update Sourcegraph versions in installation guides
# find ./docs/admin/deploy/ -type f -name '*.mdx' -exec gsed -i -E "s/SOURCEGRAPH_VERSION=v${versionRegex}/SOURCEGRAPH_VERSION=v${newVersion}/g" {} +
# find ./docs/admin/deploy/ -type f -name '*.mdx' -exec gsed -i -E "s/--version ${versionRegex}/--version ${newVersion}/g" {} +
# sed -i -E "s/${versionRegex}/${newVersion}/g" ./docs/admin/deploy_executors_kubernetes.mdx

# # Update fork variables in installation guides
find ./docs/admin/deploy/ -type f -name '*.mdx' -exec gsed -i -E "s/DEPLOY_SOURCEGRAPH_DOCKER_FORK_REVISION='v${versionRegex}'/DEPLOY_SOURCEGRAPH_DOCKER_FORK_REVISION='v${newVersion}'/g" {} +
