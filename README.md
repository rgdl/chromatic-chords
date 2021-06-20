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
grep . -rine todo --exclude-dir node_modules --exclude-dir dist --exclude-dir .git
```
