export default function Submit() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-submit]');
  var node;
  var handler = function(evt)
  {
    Silica._call(this, evt, 'submit');
    return false;
  };
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    node.onsubmit = handler;
    node._rt_live = true;
  }
}
