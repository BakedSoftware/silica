export default function Controller(ctx, force = false) {
  var nodes = Silica.query(this, "[data-controller]")
    var node, $elm, constructor, ctrl, k, v, _ref, model;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    if (!force && node._rt_ctrl !== undefined) {
      continue;
    }
    $elm = $(node);
    constructor = $elm.data('controller');
    if (typeof (_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
    {
      model = Silica.getValue($elm.parent()[0],  _ref[2]);
    }
    constructor = _ref[1];
    constructor = eval(constructor);
    if (!constructor) {
      return console.error("Unknown Controller: " + ($elm.data('controller')));
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
    if (node._rt_ctrl && watchers && Object.keys(watchers).length > 0) {
      for (k in watchers) {
        v = watchers[k];
        let stored = Silica._watch[k]
        if (!stored) {
          continue
        }
        for (let pairIdx = stored.length - 1; pairIdx >= 0; --pairIdx)
        {
          let pair = stored[pairIdx];
          if (node._rt_ctrl == pair[0])
          {
            stored.splice(pairIdx, 1);
            break;
          }
        }
      }
    }

    node._rt_live = true;
    node._rt_ctrl = ctrl;
    for (k in watchers) {
      v = watchers[k];
      if (!Silica._watch[k]) {
        Silica._watch[k] = [];
      }
      Silica._watch[k].push([ctrl, v]);
    }
    if (typeof ctrl.onLoad === "function") {
      ctrl.onLoad();
    }
  }
}
