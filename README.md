To run linter:
```bash
npx eslint .
```

To build:
```bash
npx webpack
```

To build automatically when a file is changed:
```bash
fswatch -or . | xargs -n1 -I{} npx webpack
```

Find TODOs:
```bash
grep . -Irine todo --exclude-dir={node_modules,dist,.git} --exclude README.md
```

tree without git and node modules:
```bash
tree -aCI ".git|node_modules"
```
