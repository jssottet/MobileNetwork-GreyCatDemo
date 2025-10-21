#!/bin/bash

curl -fsSL https://get.greycat.io/install.sh | bash -s stable

pnpm i && pnpm build

rm -rf ./gcdata && greycat serve --user=1

