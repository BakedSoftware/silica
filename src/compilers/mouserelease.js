export default function MouseRelease() {
  var nodes = Silica.query(this, "[data-mouserelease]");
  var node;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    node._rt_live = true;
    node.onmouserelease = function(evt) {
      Silica._call(this, evt, 'mouserelease');
    };
  }
}
