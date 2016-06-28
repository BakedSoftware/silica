export default function Style() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-style]');
  var node;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    node.setAttribute("style", Silica.getValue(node, node.dataset.style));
  }
}
