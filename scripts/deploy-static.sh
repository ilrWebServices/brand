#!/usr/bin/env bash

set -e

# Check out a temporary worktree for the gh-pages branch.
tmp_dir=$(mktemp -d /tmp/brand-static.XXXXXX)
git worktree add $tmp_dir gh-pages
cd $tmp_dir

# Get any remote changes.
git pull origin gh-pages

# Spider the brand dev site.
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent --no-host-directories https://develop-sr3snxi-c2n64gvielbrk.us.platform.sh

# Prevent the Jekyll build step, since this is static HTML.
touch .nojekyll

# Commit changes.
git add .
git commit -m 'Add static site files'

# Push to github.
git push origin gh-pages

# Remove temp worktree.
git worktree remove $tmp_dir

exit 0
