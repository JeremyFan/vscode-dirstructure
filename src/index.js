const vscode = require('vscode');
const { Range } = vscode;
const { Tree } = require('./Tree');
const { TreeNode } = require('./TreeNode');

const lineReg = /\r\n|\r|\n/;
const contentReg = /^(\s*)(\w.*)\#?(\.*)$/;

function toTree(e, d, sel) {
  e.edit(edit => {
    for (var x = 0; x < sel.length; x++) {
      const txt = d.getText(new Range(sel[x].start, sel[x].end));

      const lines = txt.split(lineReg);

      let nodeList = new Tree,
        parents = [],
        prevNode = null;

      lines.forEach(line => {
        const matched = line.match(contentReg);
        if (!matched) return;

        const [, space, text, comment] = matched;
        const level = space.length / 2;

        const node = new TreeNode(text, level, comment);

        const prevLevel = prevNode ? prevNode.level : 0;

        if (level <= prevLevel) {
          let times = prevLevel - level;
          while (times >= 0) {
            parents.pop();
            times--;
          }
        }
        parents.push(node);

        if (parents[parents.length - 2]) {
          nodeList.insert(node, parents[parents.length - 2]);
        }

        if (level === 0) {
          parents = [node];
          nodeList.insert(node);
        }

        prevNode = node;
      });

      render(nodeList, sel[x], edit);
    }
  })
}

function toMD(e, d, sel) {
  e.edit(edit => {
    for (var x = 0; x < sel.length; x++) {
      const txt = d.getText(new Range(sel[x].start, sel[x].end));

      const lines = txt.split(lineReg)
        .filter(line => line !== '.')
        .map(line => line.replace(/├─|│ |─ |└─|\s{2}/g, ' ').replace(/\s{2}/, ''));

      edit.replace(sel[x], lines.join('\n'));
    }
  })
}

function getPrefix(node) {
  if (!node.parent) {
    return '';
  }

  return getPrefix(node.parent) + (node.parent.isLastChild ? '    ' : '│   ');
}

function toLineStr(node) {
  return getPrefix(node) + (node.isLastChild ? '└── ' : '├── ') + node.text;
}

function render(nodeList, sel, edit) {
  const list = [];
  nodeList.traverse(node => list.push(toLineStr(node)));

  list.unshift('.');
  edit.replace(sel, list.join('\n'));
}

function activate(context) {
  console.log('Congratulations, your extension "dirStructure" is now active!');
  let disposable = vscode.commands.registerCommand('extension.dirStructure', dirStructure);

  context.subscriptions.push(disposable);
}

function dirStructure() {
  if (!vscode.window.activeTextEditor) {
    vscode.window.showInformationMessage('Open a file first to manipulate text selections');
    return;
  }

  const commands = [
    { label: "toTree", description: "Convert source to dir tree" },
    { label: "toMD", description: "Convert dir tree to source" },
  ]

  vscode.window.showQuickPick(commands).then((selection) => {
    if (!selection) {
      return;
    }
    let e = vscode.window.activeTextEditor;
    let d = e.document;
    let sel = e.selections;

    switch (selection.label) {
      case "toTree":
        toTree(e, d, sel);
        break;
      case "toMD":
        toMD(e, d, sel);
        break;
      default:
        console.log("hum this should not have happend - no selection")
        break;
    }
  })
}

exports.activate = activate;
