export default function Controller(ctx, force = false, storeWatchers = true) {
  var node, constructor, ctrl, k, v, _ref, model;
  var nodes = Silica.query(this, "[data-controller]")
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    if (!force && node._rt_ctrl !== undefined) {
      continue;
    }
    lastCtrl = node._rt_ctrl;
    delete node._rt_ctrl;
    constructor = node.dataset.controller;
    if (typeof (_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
    {
      let parent = node.parentNode;
      if (parent)
      {
        model = Silica.getValue(parent,  _ref[2]);
        if (model == null) {
          storeWatchers = false;
        }
      }
      else
      {
        model = Silica.getValue(node,  _ref[2], node._rt_ctx);
        if (model == null) {
          storeWatchers = false;
        }
      }
    }
    constructor = _ref[1];
    constructor = eval(constructor);
    if (!constructor) {
      return console.error("Unknown Controller: " + (node.dataset.controller));
    }
    if (typeof model !== 'undefined')
    {
      ctrl = new constructor(node, model);
    }
    else
    {
      ctrl = new constructor(node);
    }

    // Remove old watchers if rebuilding a controller for a node
    let watchers = constructor.watchers;
    if (lastCtrl && watchers && Object.keys(watchers).length > 0) {
      for (k in watchers) {
        v = watchers[k];
        let stored = Silica._watch[k]
        if (!stored) {
          continue
        }
        for (let pairIdx = stored.length - 1; pairIdx >= 0; --pairIdx)
        {
          let pair = stored[pairIdx];
          if (lastCtrl == pair[0])
          {
            stored.splice(pairIdx, 1);
          }
        }
      }
    }

    node._rt_live = true;
    node._rt_ctrl = ctrl;
    if (storeWatchers)
    {
      for (k in watchers) {
        v = watchers[k];
        if (!Silica._watch[k]) {
          Silica._watch[k] = [];
        }
        Silica._watch[k].push([ctrl, v]);
      }
    }
    if (typeof ctrl.onLoad === "function") {
      ctrl.onLoad();
    }
  }
}
