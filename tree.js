import Node from "./node.js";

export default class Tree {
  constructor(rootValue) {
    this.root = rootValue ? new Node(rootValue) : null;
  }

  insert(value, currentNode = this.root) {
    if (!(value instanceof Node)) {
      value = new Node(value);
    }

    if (this.root == null) this.root = value;
    //Insert root
    else if (value.value < currentNode.value)
      currentNode.LEFT
        ? this.insert(value, currentNode.LEFT) //Recursively check left sub tree
        : currentNode.addLeft(value);
    //If currentNode don't have left Node insert newNode
    else if (value.value > currentNode.value)
      currentNode.RIGHT
        ? this.insert(value, currentNode.RIGHT) //Recursively check right sub tree
        : currentNode.addRight(value); //If currentNode don't have right node insert newNode

    return;
  }

  remove(value, currentNode = this.root) {
    if (currentNode == null) console.log("Key not found");
    else if (value < currentNode.value) this.remove(value, currentNode.LEFT);
    else if (value > currentNode.value) this.remove(value, currentNode.RIGHT);
    else {
      if (currentNode.isRoot()) return;

      if (currentNode.isLeaf()) {
        currentNode.PARENT[currentNode.getSide()] = null;
        return;
      } else if ((currentNode.RIGHT == null) ^ (currentNode.LEFT == null)) {
        currentNode.LEFT != null
          ? (currentNode.PARENT[currentNode.getSide()] = currentNode.LEFT)
          : (currentNode.PARENT[currentNode.getSide()] = currentNode.RIGHT);
        return;
      } else {
        const { value } = findMax(currentNode.LEFT);

        this.remove(value);
        currentNode.value = value;

        function findMax(node) {
          if (node.RIGHT == null) return node;
          return findMax(node.RIGHT);
        }
      }
    }
  }

  traverse() {
    // initilize arrays for different traversal
    const iN = new Array(); //for in order traversal
    const pre = new Array(); //for pre order traversal
    const post = new Array(); //for post order traversal

    innerTravel(this.root); //inner function for performing recursive traversal

    function innerTravel(currentNode) {
      if (currentNode == null) return;

      pre.push(currentNode.value);
      innerTravel(currentNode.LEFT);
      iN.push(currentNode.value);
      innerTravel(currentNode.RIGHT);
      post.push(currentNode.value);
    }

    return { inorder: iN, preorder: pre, postorder: post };
  }
}
