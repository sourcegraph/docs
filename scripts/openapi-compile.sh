#!/bin/bash
set -eux

SOURCEGRAPH_DIR=$1
DOCS_DIR=$2
cd $SOURCEGRAPH_DIR
pnpm -C internal/openapi compile
cp internal/openapi/tsp-output/@typespec/openapi3/openapi.Sourcegraph.Latest.yaml $DOCS_DIR/public/openapi/openapi.Sourcegraph.Latest.yaml

