#!/bin/bash

set -xe

# Restore all git changes
git restore --source=HEAD --staged --worktree -- package.json pnpm-lock.yaml

# The first release is published by hand, because npm trusted publishing needs the package to exist
PKG_NAME=$(node -p "require('./package.json').name")
PKG_VERSION=$(node -p "require('./package.json').version")
if npx -y npm@11.19.1 view "$PKG_NAME@$PKG_VERSION" version > /dev/null 2>&1; then
  echo "$PKG_NAME@$PKG_VERSION is already published, skipping"
  exit 0
fi

# Resolve pnpm
pnpm i --frozen-lockfile=false

# Pack with pnpm so catalog: and workspace: versions are resolved
rm -rf .pack
pnpm pack --pack-destination .pack

# Release package (npm >= 11.5.1 authenticates through npm trusted publishing)
echo "⚡ Publishing with tag latest"
npx -y npm@11.19.1 publish .pack/*.tgz --access public --tag latest
