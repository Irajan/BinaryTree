export default class Node {
  constructor(value = null) {
    this.LEFT = null;
    this.RIGHT = null;
    this.PARENT = null;
    this.depth = 0;
    this.value = value;
    Node.number = ++Node.number || 1;
  }
  getSide() {
    const parent = this.PARENT;

    if (parent == null) return "ROOT";

    if (parent.LEFT != null && parent.LEFT.value == this.value) return "LEFT";

    if (parent.RIGHT != null && parent.RIGHT.value == this.value)
      return "RIGHT";
  }
  addLeft(newNode) {
    newNode.PARENT = this;
    this.LEFT = newNode;
    newNode.depth = this.depth + 1;
  }

  addRight(newNode) {
    newNode.PARENT = this;
    this.RIGHT = newNode;
    newNode.depth = this.depth + 1;
  }

  isLeaf() {
    return this.LEFT == null && this.RIGHT == null;
  }

  isRoot() {
    return this.PARENT == null;
  }
}
