goog.module("compilers.with");

function createUpdater(target) {
  return function (_, value) {
    Silica.setPropByString(Silica.getContext(this), target, value);
  };
}

/** @this Element */
function With(ctx) {
  var nodes = Silica.query(this, "[data-with]");
  for (var i = nodes.length - 1; i >= 0; --i) {
    let node = nodes[i];
    let components = node.dataset["with"].split(" as ");
    if (components.length != 2) {
      throw new Error(
        `With used with invalid property: ${node.dataset["with"]}`
      );
    }
    let source = components[0].trim();
    let target = components[1].trim();
    let context = {};
    context.$ctrl = Silica.getContext(node);
    node._rt_ctx = context;
    context[target] = null;
    let updater = createUpdater(target);
    node.onremove = function () {
      Silica.observer.deregister(node, source, updater);
    };
    Silica.observer.register(node, source, updater);
  }
}

exports = With;
