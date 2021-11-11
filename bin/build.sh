#!/usr/bin/env zsh

npx eslint .

# Don't compile if linter fails
[ $? -eq 0 ] || exit 1

# Otherwise, compile js
npx webpack
lessc style/style.less style.css
