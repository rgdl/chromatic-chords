To run linter:
```bash
npx eslint .
```

To build:
```bash
npx webpack
```

Find TODOs:
```bash
grep . -rine todo --exclude-dir node_modules --exclude-dir dist --exclude-dir .git
```
