# dirstructure

This extension helps you to generate a directory structure of a project, makes document more clear, and easy to edit and update.

```
.
├── dist
├── src
│   ├── css
│   └── js
├── server.js
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

## Known Issues