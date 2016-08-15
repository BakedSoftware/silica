export default function Href() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-silica]');
  var node;
  var comps, attribute, valueKey;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node       =  nodes[i];
    comps      =  node.dataset.silica.split("=");
    if (comps.length !== 2) {
      console.error("Invalid generic binding", node.dataset.silica, "for node", node);
      return
    }
    attribute  =  comps[0];
    valueKey   =  comps[1];

    node.setAttribute(attribute, Silica.getValue(node, valueKey));
  }
  Silica._capture_links(raw);
}
