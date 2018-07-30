# vscode-dirstructure

This is a vscode extenstion helps you generate a directory structure of a project, makes project documention more clear, and more easier to edit and update.

Simply write down the file directory like this:
```
dist
src#source code
  css
  js
server
  index.js#server entry
package.json
```
dirstructure can convert to:
```
.
├── dist
├── src ............. source code
│   ├── css
│   └── js
├── server
│   └── index.js .... server entry
└── package.json
```

![](./preview.gif)

## Install
Open vscode extensions marketplace(⌘P and type ext install) and search `dirstructure`.

## Usage
- Select lines, type `Alt+D` to select `toTree` or `toMD`.
- 2 spaces indent every level.
- Use # to set comments.

`toTree` generates structures:
```
.
├── dist ···················· after build
├── public
│   ├── logos
│   └── fonts
├── src ····················· source code
│   ├── css
│   ├── js
│   │   ├── libs
│   │   └── api ············· api module
│   │       └── index.js
│   └── images
├── server.js
├── package.json
└── webpack.config.js ······· webpack config
```

`toMD` for edit and update:
```
dist#after build
public
  logos
  fonts
src#source code
  css
  js
    libs
    api#api module
      index.js
  images
server.js
package.json
webpack.config.js#webpack config
```

## Sublime Version
It has a sublime-text version for this extension, but the feature is not exactly the same, know more about [sublime-dirstructure](https://github.com/JeremyFan/sublime-dirstructure).

## Known Issues
