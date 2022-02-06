#!/usr/bin/env sh

# Source this to have some handy aliases
alias todo='grep . -Irine todo --exclude-dir={node_modules,dist,.git} --exclude={README.md,aliases.sh}'
alias tree='tree -aCI ".git|node_modules"'
