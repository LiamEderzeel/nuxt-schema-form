#!/bin/bash

set -xe

# Restore all git changes
git restore --source=HEAD --staged --worktree -- package.json pnpm-lock.yaml

# Bump versions to edge
pnpm jiti ./scripts/bump-nightly

# Resolve pnpm
pnpm i --frozen-lockfile=false

# Pack with pnpm so catalog: and workspace: versions are resolved
rm -rf .pack
pnpm pack --pack-destination .pack

# Release package (npm >= 11.5.1 authenticates through npm trusted publishing)
echo "⚡ Publishing nightly version"
npx -y npm@11.19.1 publish .pack/*.tgz --access public --tag latest
