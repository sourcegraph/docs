#!/bin/bash
set -eux


# Check if entr is installed
if ! command -v entr &> /dev/null
then
    echo "entr could not be found, installing with Homebrew..."
    brew install entr
fi

COMPILE_SCRIPT=$(dirname "${BASH_SOURCE[0]}")/openapi-compile.sh
DOCS_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}")/../)
SOURCEGRAPH_DIR=${SOURCEGRAPH_DIR:-$(dirname "${BASH_SOURCE[0]}")/../../sourcegraph}
SOURCEGRAPH_DIR=$(realpath $SOURCEGRAPH_DIR)
echo $SOURCEGRAPH_DIR/internal/openapi/public.tsp | entr $COMPILE_SCRIPT $SOURCEGRAPH_DIR $DOCS_DIR
