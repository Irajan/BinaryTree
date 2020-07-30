import { _ } from "./library.js";
import Tree from "./tree.js";
import avlBalance from "./avlBalance.js";
const canvas = _("canvas");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

const tree = new Tree();
const values = [10, 9, 8, 5, 20, 15, 25, 21, 22];

for (let value of values) tree.insert(value);
tree.draw(canvas.width / 2, 20, canvas);
avlBalance(tree, canvas);
