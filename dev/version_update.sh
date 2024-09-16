#!/usr/bin/env bash

# Env variables
export versionRegex="d+\.\d+\.\d+"
# versionRegex
# currentVersion
# newVersion
export newVersion="5.7.0"

# Update references to Sourcegraph versions in docs
sed -i -E "s/version ${versionRegex}/version ${newVersion}/g" docs/index.md

# Update Sourcegraph versions in installation guides
# find ./docs/admin/deploy/ -type f -name '*.mdx' -exec sed -i -E "s/SOURCEGRAPH_VERSION=v${versionRegex}/SOURCEGRAPH_VERSION=v${newVersion}/g" {} +
# find ./docs/admin/deploy/ -type f -name '*.mdx' -exec sed -i -E "s/--version ${versionRegex}/--version ${newVersion}/g" {} +
# sed -i -E "s/${versionRegex}/${newVersion}/g" ./docs/admin/deploy_executors_kubernetes.md
#
# # Update fork variables in installation guides
# find ./docs/admin/deploy/ -type f -name '*.md' -exec sed -i -E "s/DEPLOY_SOURCEGRAPH_DOCKER_FORK_REVISION=v${versionRegex}/DEPLOY_SOURCEGRAPH_DOCKER_FORK_REVISION=v${newVersion}/g" {} +
