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

    return value;
  }

  search(key, currentNode = this.root) {
    if (currentNode == null) return new Error(`Key ${key} not found`);
    else if (key < currentNode.value) return this.search(key, currentNode.LEFT);
    else if (key > currentNode.value)
      return this.search(key, currentNode.RIGHT);
    else return currentNode;
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

  traverse(node = this.root) {
    // initilize arrays for different traversal
    const iN = new Array(); //for in order traversal
    const pre = new Array(); //for pre order traversal
    const post = new Array(); //for post order traversal

    innerTravel(node); //inner function for performing recursive traversal

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

  draw(x, y, canvas, currentNode = this.root, dx = 40, dy = 50) {
    if (currentNode == null) return;
    var r = 15;
    var cc = canvas.getContext("2d");

    //Fill the x and y position with the node value
    cc.fillText(currentNode.value, x - r / 2, y);

    //If left node exists draw line towards left
    cc.beginPath();
    cc.moveTo(x, y + r);
    currentNode.LEFT == null
      ? cc.lineTo(x, y + r)
      : cc.lineTo(x - dx, y + dy - r);
    cc.stroke();

    //If right node exists draw line towards right
    cc.beginPath();
    cc.moveTo(x, y + r);
    currentNode.RIGHT == null
      ? cc.lineTo(x, y + r)
      : cc.lineTo(x + dx, y + dy - r);
    cc.stroke();

    //Draw the circle with the x and y center
    cc.beginPath();
    cc.arc(x, y, r, Math.PI * 2, false);
    cc.closePath();
    cc.stroke();

    //Recursevely change x and y value wiht respect to dx and dy
    //dx and dy are the variables to separate left and right node
    //dx and dy are also reduced as distance between node goes decreasing
    //as we dive deep inside tree
    this.draw(x - dx, y + dy, canvas, currentNode.LEFT, (1 / 2) * dx, dy - 2);
    this.draw(x + dx, y + dy, canvas, currentNode.RIGHT, (1 / 2) * dx, dy - 2);
  }
}
