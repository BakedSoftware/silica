export default function Controller(force = false) {
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
      console.log("Invoking", constructor, "with", model);
    }
    else
    {
      ctrl = new constructor(node);
    }
    node._rt_live = true;
    node._rt_ctrl = ctrl;
    _ref = constructor.watchers;
    for (k in _ref) {
      v = _ref[k];
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
