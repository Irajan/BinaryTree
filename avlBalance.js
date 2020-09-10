import Tree from "./tree.js";
const tree = new Tree();
export default function avlBalancedTree(values, canvas) {
  if (values instanceof Tree) {
    const { preorder } = values.traverse();
    values = preorder;
  }
  for (let i = 0; i < values.length; i++) {
    tree.insert(values[i]);
    const node = checkRotation(tree.root);

    if (node.rotationRequired == true) {
      tree.draw(canvas.width / 2, 200 + 150 * i, canvas);
      delete node.rotationRequired;
      avlRotate(node);
    }
  }
  return tree;
}

//Function to check if node is balanced or not
function checkRotation(node) {
  if (node == null) return { rotationRequired: false };
  const leftMaxBranch = getMaxBranch(node.LEFT);
  const rightMaxBranch = getMaxBranch(node.RIGHT);

  const difference =
    (node.LEFT != null ? leftMaxBranch.length + 1 : 0) -
    (node.RIGHT != null ? rightMaxBranch.length + 1 : 0);

  if (difference == 2) {
    node.rotationRequired = true;
    node.leftMaxBranch = leftMaxBranch;
    return node;
  } else if (difference == -2) {
    node.rotationRequired = true;
    node.rightMaxBranch = rightMaxBranch;
    return node;
  } else {
    let statusNode = checkRotation(node.LEFT);

    if (statusNode.rotationRequired == true) return statusNode;

    statusNode = checkRotation(node.RIGHT);
    if (statusNode.rotationRequired == true) return statusNode;

    return { rotationRequired: false };
  }
}

//Function to check the maximum branch upto leaf from given node
function getMaxBranch(node) {
  const { preorder } = tree.traverse(node);
  const maxPath = new Array();
  let maxLeaf = node; //Track leaf with max depth
  if (preorder.length == 0) return maxPath;

  for (let key of preorder) {
    const result = tree.search(key, node);
    if (result.isLeaf()) {
      maxLeaf = maxLeaf.depth < result.depth ? result : maxLeaf;
    }
  }

  let currentNode = maxLeaf;

  while (currentNode.value != node.value) {
    maxPath.push(currentNode.getSide());
    currentNode = currentNode.PARENT;
  }
  return maxPath.reverse();
}

//Fucntion to perform rotation

function avlRotate(node) {
  if (node.rightMaxBranch != undefined) {
    if (node.rightMaxBranch[0] == "LEFT") rotateRight(node.RIGHT);
    rotateLeft(node);

    console.log(node.rightMaxBranch);
    delete node.rightMaxBranch;
  } else {
    if (node.leftMaxBranch[0] == "RIGHT") rotateLeft(node.LEFT);
    rotateRight(node);

    console.log(node.leftMaxBranch);
    delete node.leftMaxBranch;
  }

  tree.root.depth = 0;
  tree.root.PARENT = null;

  updateDepth(tree.root.LEFT);
  updateDepth(tree.root.RIGHT);
}

function rotateLeft(node) {
  if (node.PARENT == null) {
    tree.root = node.RIGHT;
    node.PARENT = node.RIGHT;
    node.PARENT.LEFT = node;

    node.RIGHT = null;
  } else {
    const parent = node.PARENT;
    const side = node.getSide();

    node.PARENT = node.RIGHT;
    node.LEFT = null;
    node.RIGHT = null;

    node.PARENT.PARENT = parent;
    node.PARENT.LEFT = node;

    parent[side] = node.PARENT;
  }
}

function rotateRight(node) {
  if (node.PARENT == null) {
    tree.root = node.LEFT;
    node.PARENT = node.LEFT;
    node.PARENT.RIGHT = node;

    node.LEFT = null;
  } else {
    const parent = node.PARENT;
    const side = node.getSide();

    node.PARENT = node.LEFT;
    node.LEFT = null;
    node.RIGHT = null;

    node.PARENT.RIGHT = node;
    node.PARENT.PARENT = parent;

    parent[side] = node.PARENT;
  }
}

function updateDepth(node) {
  if (node == null) return;
  node.depth = node.PARENT.depth + 1;

  updateDepth(node.RIGHT);
  updateDepth(node.LEFT);
}
