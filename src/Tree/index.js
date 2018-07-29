class Tree {
  constructor(nodes = []) {
    this.tree = nodes;
  }

  insert(node, parent) {
    if (!parent) {
      this.tree.push(node);
    } else {
      parent.children.push(node);
      node.parent = parent;
    }
  }

  traverse(callback, nodes) {
    if (!nodes) nodes = this.tree;

    nodes.forEach((node, index) => {
      /**
       * @fixme
       * mark last child
       */
      if (index === nodes.length - 1) {
        node.isLastChild = true;
      }

      callback(node);

      if (node.children.length > 0) {
        this.traverse(callback, node.children);
      }
    })
  }
}

exports.Tree = Tree;