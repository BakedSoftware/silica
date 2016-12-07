export default function Class() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, "[data-class]");
  var node;
  var klass;

  if (raw.nodeType != 9 && raw.dataset.class)
  {
    if (raw.dataset._rt_hard_klass == null)
    {
      raw.dataset._rt_hard_klass = raw.className;
    }
    klass = Silica.getValue(raw, raw.dataset.class, null, null);
    if (klass)
    {
      raw.classList.add(klass);
    }
  }

  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    if (node.dataset._rt_hard_klass == null) {
      node.dataset._rt_hard_klass = node.className.split('hidden').join(" ").trim();
    }
    klass = Silica.getValue(node, node.dataset.class, null, [node, node.dataset.parameter]);
    if (klass)
    {
      node.classList.add(klass);
    }
  }
}
