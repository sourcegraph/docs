#!/bin/bash
set -eux

# Check if yq is installed, if not, install it using Homebrew
if ! command -v yq &> /dev/null
then
    echo "yq could not be found, installing via Homebrew..."
    if ! command -v brew &> /dev/null
    then
        echo "Homebrew is not installed. Please install Homebrew first."
        exit 1
    fi
    brew install yq
fi


SOURCEGRAPH_DIR=$1
DOCS_DIR=$2
cd "$SOURCEGRAPH_DIR"
pnpm -C internal/openapi compile
yq eval -o=json internal/openapi/tsp-output/@typespec/openapi3/openapi.Sourcegraph.Latest.yaml > "$DOCS_DIR"/src/components/openapi/openapi.Sourcegraph.Latest.json
