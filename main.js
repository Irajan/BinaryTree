import { _ } from "./library.js";
import Tree from "./tree.js";

const canvas = _("canvas");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

const tree = new Tree();

tree.insert(40);
tree.insert(20);
tree.insert(30);
tree.insert(10);
tree.insert(15);
tree.insert(17);

//tree.draw(canvas.width / 2, 20, canvas);

//remove nodes here
tree.remove(20);
//tree.draw(canvas.width / 2, canvas.height / 2 + 20, canvas);
