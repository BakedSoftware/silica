export default function Disabled() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-disabled]');
  var node;
  var property;
  var negate;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    property = node.dataset.disabled;
    negate = property[0] === "!";
    if (negate) {
      property = property.substr(1);
    }

    if (Silica._show(node, property, negate))
    {
      node.setAttribute("disabled", true);
    }
    else
    {
      node.removeAttribute("disabled");
    }
  }
}
