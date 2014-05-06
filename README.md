Setup
==========================================================================
```sh
git subtree pull --prefix=htdocs git@github.com:gotanda-pm/gotanda-pm.github.io.git master
npm install -g grunt-cli
npm install
bundle install
carton install
```

Easy usage
==========================================================================
build(CSS/JS)
--------------------------------------------------------------------------
```sh
grunt build
```

publish(Riji)
--------------------------------------------------------------------------
```sh
grunt publish
```

edit and preview
--------------------------------------------------------------------------
```sh
grunt server
```

deploy
--------------------------------------------------------------------------
```sh
git commit -av
git subtree push --prefix=htdocs git@github.com:gotanda-pm/gotanda-pm.github.io.git master
```
