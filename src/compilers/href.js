export default function Href() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-href]');
  var node;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    node.setAttribute("href", Silica.getValue(node, node.dataset.href));
  }
  Silica._capture_links(raw);
}
