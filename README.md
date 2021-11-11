To run linter:
```bash
npx eslint .
```

To build js bundle:
```bash
npx webpack

# To build automatically as files change (with linter)
fswatch -or js -e ".*\.swp" | xargs -n1 -I{} bin/build.sh
```

To build stylesheet
```bash
lessc style/style.less style.css

# To build automatically as files change
fswatch -or style -e ".*\.swp" | xargs -n1 -I{} bin/build-stylesheet.sh
```

To build automatically when a file is changed:
```bash
fswatch -or . | xargs -n1 -I{} bin/build.sh
```

Find TODOs:
```bash
grep . -Irine todo --exclude-dir={node_modules,dist,.git} --exclude README.md
```

tree without git and node modules:
```bash
tree -aCI ".git|node_modules"
```
