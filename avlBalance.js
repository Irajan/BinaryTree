import Tree from "./tree.js";
const tree = new Tree();
export default function avlBalancedTree(values, canvas) {
  if (values instanceof Tree) {
    const { preorder } = values.traverse();
    values = preorder;
  }
  for (let i = 0; i < values.length; i++) {
    tree.insert(values[i]);

    const { status, check, node } = checkRotation(tree.root);

    if (status == true) {
      avlRotate(node, check);
      tree.draw((i - 2) * 150 + 100, canvas.height / 2, canvas);
    }
  }

  return tree;
}

//Function to check if node is balanced or not
function checkRotation(node) {
  if (node == null) return { status: false };

  const check = getMaxBranch(node.LEFT) - getMaxBranch(node.RIGHT);
  if (Math.abs(check) >= 2) return { status: true, check, node };
  else {
    let statusNode = checkRotation(node.LEFT);

    if (statusNode.status == true) return statusNode;

    statusNode = checkRotation(node.RIGHT);
    if (statusNode.status == true) return statusNode;

    return { status: false };
  }
}

//Function to check the maximum branch upto leaf from given node
function getMaxBranch(node) {
  const { preorder } = tree.traverse(node);
  if (preorder.length == 0) return 0;

  let max = 0;
  for (let key of preorder) {
    const result = tree.search(key, node);
    if (result.isLeaf()) max = max < result.depth ? result.depth : max;
  }
  return max;
}

//Fucntion to perform rotation

function avlRotate(node, check) {
  if (check < 0) {
    rotateLeft(node);
  } else {
    rotateRight(node);
  }
}

function rotateLeft(node) {
  console.log("Rotate Left");
}

function rotateRight(node) {
  const x = node;
  const y = node.LEFT;

  y.PARENT = x.PARENT;

  if (y.PARENT == null) tree.root = y;
  else y.PARENT[x.getSide()] = y;

  x.PARENT = y;
  x.LEFT = y.RIGHT;
  y.RIGHT = x;

  y.depth -= 1;

  updateDepth(y.LEFT);
  updateDepth(y.RIGHT);
}

//Function to update depth of tree from the given node
function updateDepth(node) {
  if (node == null) return;

  node.depth = node.PARENT.depth + 1;
  updateDepth(node.LEFT);
  updateDepth(node.RIGHT);
}
