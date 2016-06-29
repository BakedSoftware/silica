export default function Repeat(context = null) {
  var elements = Silica.querySorted(this, '[data-repeat]');
  let element;
  var $elm, child, children, ctx, expr, html, list, model, obj, repeat, template, raw, _ref;
  let fragment;
  for (var i = 0, length = elements.length; i < length; i++)
  {
    raw = elements[i];
    repeat = raw.dataset.repeat.split(/\s+in\s+/);
    list = repeat[1];
    model = repeat[0];
    ctx = Silica.getContext(raw);

    //Check if we are calling a function with a param
    if (typeof (_ref = list.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
    {
      let funcName = _ref[1];
      let param = _ref[2];
      param = Silica.getValue(raw.parentNode, param);

      list = Silica.getValue(raw,  _ref[1], null, param);
    }
    else
    {
      list = Silica.getPropByString(ctx, list);
    }

    listHash = SparkMD5.hash(JSON.stringify(list, function(key, value){
      if (key.constructor == String && (key == '__elm' || key == '$ctrl' || key.charCodeAt(0) == 95))
      {
        return undefined;
      }
      return value;
    }));
    //raw._rt_ctrl = ctx;
    // Get the template
    template = Silica._repeat_templates[raw.dataset._rt_repeat_template];
    // Compile it
    context = {};
    context.$ctrl = ctx;
    template = Silica.compile($(template), false, context, true)[0];
    // Store the compiled template
    Silica._repeat_templates[raw.dataset._rt_repeat_template] = template;

    raw.innerHTML = "";

    if (ctx.renderedRepeat) {
      ctx.renderedRepeat(raw);
    } else if (ctx.$ctrl && ctx.$ctrl.renderedRepeat) {
      ctx.$ctrl.renderedRepeat(raw);
    }
  }
}
