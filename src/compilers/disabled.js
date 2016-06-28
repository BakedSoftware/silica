export default function Disabled() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-disabled]');
  var node;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    if (Silica.getValue(node, node.dataset.disabled))
    {
      node.setAttribute("disabled", true);
    }
    else
    {
      node.removeAttribute("disabled");
    }
  }
}
