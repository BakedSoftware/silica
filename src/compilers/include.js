export default function Include() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var nodes = Silica.query(raw, '[data-style]');
  var node, partial;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    partial = eval(node.dataset.include);
    delete node.dataset.include;
    $(node).load(partial, function() {
      Silica.compile(this);
      var ctx = Silica.getContext(this);
      if (ctx.onLoad && typeof ctx.onLoad === "function")
      {
        ctx.onLoad(this);
      }
    });
  }
}
