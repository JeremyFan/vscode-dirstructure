class TreeNode {
  constructor(text, level, comment) {
    this.text = text;
    this.level = level;
    this.comment = comment;

    this.children = [];
    this.isLastChild = false;
    this.parent = null;
  }

  length() {
    return (this.level + 1) * TreeNode.indent + this.text.length;
  }
}

TreeNode.indent = 4;

exports.TreeNode = TreeNode;