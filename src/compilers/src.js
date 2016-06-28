export default function Src() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.queryOfType(raw, 'img', '[data-src]');
  var node;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    node.src = Silica.getValue(node, node.dataset.src);
  }
}
