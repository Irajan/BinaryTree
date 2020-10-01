import { _ } from "./library.js";
import Tree from "./tree.js";
import avlBalance from "./avlBalance.js";
const canvas = _("canvas"),
  input = _("input"),
  tree = new Tree();

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;

const takeInput = function (e) {
  e.preventDefault();
  input.disabled = false;
  input.focus();
};

window.addEventListener("contextmenu", takeInput);
window.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    tree.insert(+input.value);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    tree.draw(canvas.width / 3, canvas.height / 5, canvas, 80, 100);
    const { balancedTree, rotated } = avlBalance(tree);
    balancedTree.draw(
      (2 * canvas.width) / 3,
      canvas.height / 5,
      canvas,
      80,
      100
    );

    if (rotated) {
      const { preorder } = balancedTree.traverse();
      tree.root = null;

      for (let i = 0; i < preorder.length; i++) tree.insert(preorder[i]);
    }
    input.value = null;
  }
});
window.addEventListener("dblclick", function () {
  input.disabled = true;
});
