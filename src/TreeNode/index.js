class TreeNode {
  constructor(text, level, comment) {
    this.text = text;
    this.level = level;
    this.comment = comment;

    this.children = [];
    this.isLastChild = false;
    this.parent = null;
  }
}

exports.TreeNode = TreeNode;