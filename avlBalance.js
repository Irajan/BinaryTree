import Tree from "./tree.js";

const tree = new Tree();
export default function avlBalancedTree(values, canvas) {
  if (values instanceof Tree) {
    const { preorder } = values.traverse();
    values = preorder;
  }
  for (let i = 0; i < values.length; i++) {
    tree.insert(values[i]);
    const { status, node } = checkRotation(tree.root);
    if (status) {
      avlRotate(node);
      tree.draw((i - 2) * 150 + 100, canvas.height / 2, canvas);
    }
  }
  return tree;
}

function checkRotation(node) {
  if (node == null) return { status: false };
  console.log(node.value);
  const check = getMaxBranch(node.LEFT) - getMaxBranch(node.RIGHT);
  console.log(Math.abs(check));
  if (Math.abs(check) >= 2) return { status: true, node };
  else
    return node.LEFT == null
      ? checkRotation(node.RIGHT)
      : checkRotation(node.LEFT);
}

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

function avlRotate(node) {
  //console.log(node);
  if (node.LEFT.LEFT != null) rotateRight(node);
  // else if (node.RIGHT.RIGHT != null) rotateLeft(node);
  // else if (node.RIGHT.LEFT != null) {
  //   rotateLeft(node.RIGHT);
  //   rotateRight(node);
  // } else {
  //   rotateRight(node.LEFT);
  //   rotateLeft(node);
  // }
}

function rotateLeft(node) {
  console.log("Rotate Left");
}

function rotateRight(node) {
  if (node.PARENT == null) {
    tree.root = node.LEFT;

    node.PARENT = node.LEFT;
    node.LEFT = null;
    node.depth += 1;

    tree.root.RIGHT = node;
    tree.root.PARENT = null;
    tree.root.depth = 0;

    tree.root.LEFT.depth -= 1;
  }
}
