# Agnostic
[Components](https://agnostic.netlify.com)

### Run app example
```ssh
npm start
```

### Build project
```ssh
npm run build -- <project>
```

### Test project
```ssh
npm run test -- <project>
```


### Release
Release command prepare all projects for the release: 
* for each project run tests
* for each project run build
* for each project define a version (the main version is in root/package.json)
* create a new package.json for `@qwentes/agnostic` in `/dist` 
```
npm run release
```

**params:**
* --skip-test
  * run build command without test
  
### Documentation
```
npm run storybook:dev
```
