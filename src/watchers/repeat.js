goog.module('watchers.repeat');
// Import browser hax
const Hax = goog.require('hax');
const ControllerCompiler = goog.require('compilers.controller');

function Repeat() {
  var changed, child, container, context, ctx, expr, html, list, model, newList, newListHash, obj, oldList, repeat, rt_model, template, _i, _len, _ref;
  var elements = Silica.querySorted(this, '[data-repeat]');
  let raw, cache_display;
  for (let i =0, length = elements.length; i < length; ++i)
  {
    raw = elements[i];
    repeat = raw.dataset['repeat'].split(/\s+in\s+/);
    list = repeat[1];
    model = repeat[0];
    ctx = Silica.getContext(raw);

    //Check if we are calling a function with a param
    if (typeof (_ref = list.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] !== 'undefined')
    {
      let funcName = _ref[1];
      let param = _ref[2];
      param = Silica.getValue(raw.parentNode, param);

      newList = Silica.getValue(raw,  _ref[1], null, param);
    }
    else
    {
      newList = Silica.getValue(raw, list);
    }

    newListHash = md5(JSON.stringify(newList, function(key, value){
      //Keys starting with an underscore (char code 95) will be ignored
      if (key.constructor == String && (key == '__elm' || key == '$ctrl' || key.charCodeAt(0) === 95))
      {
        return undefined;
      }
      return value;
    }));

    let existing = raw.childNodes;
    oldList = raw._rt_repeat_list;
    changed = oldList && newList ? oldList !== newListHash : true;

    if (!changed) {
      continue;
    }

    if (newList) {
      raw._rt_repeat_list = newListHash;
    } else {
      raw._rt_repeat_list = null;
    }

    if (!newList) {
      while(raw.childNodes.length > 0) {
        Silica.removeFromDOM(raw.childNodes[0]);
      }
      continue;
    }

    // Add support for iterating X times
    if (newList.constructor === Number)
    {
      newList = new Array(newList);
    }

    // Get the template
    template = Silica._repeat_templates[Hax.getDatasetProperty(raw, "_rt_repeat_template")];
    if (newList.constructor == Object) {
      let keys = Object.keys(newList);
      let obj = newList;
      newList = [];
      let key, val;
      for (let j = 0, len = keys.length, key = keys[j]; j < len; j++) {
        key = keys[j];
        newList[j] = { key: key, value: obj[key] };
      }
    }

    let count_diff = raw.childElementCount - newList.length;
    let node;

    while (count_diff > 0)
    {
      Silica.removeFromDOM(existing[count_diff-1]);
      --count_diff;
    }

    let fragment = document.createDocumentFragment();

    while (count_diff < 0)
    {
      context = {};
      context[model] = newList[0 - count_diff - 1];
      context.$ctrl = ctx;
      child = template.cloneNode(true);
      child._rt_ctx = context;
      for (let key in Silica.compilers) {
        Silica.compilers[key].call(child)
      }
      fragment.appendChild(child);
      ++count_diff;
    }
    if (fragment.hasChildNodes())
    {
      raw.appendChild(fragment);
    }

    for (_i = 0, _len = newList.length; _i < _len; _i++)
    {
      obj = newList[_i];
      node = existing[_i];
      let modelChanged = model != obj;
      if (node._rt_ctx)
      {
        node._rt_ctx[model] = obj;
      }
      else
      {
        context = {};
        context[model] = obj;
        context.$ctrl = ctx;
        node._rt_ctx = context;
      }
      // Rebuild controllers if the model changed
      if (modelChanged) {
        ControllerCompiler.call(node, node._rt_ctx, true);
      }
      node._rt_ctx.index = _i;
      Silica.flush(node, false, {}, true);
    }

    if (ctx.renderedRepeat) {
      ctx.renderedRepeat(raw);
    } else if (ctx.$ctrl && ctx.$ctrl.renderedRepeat) {
      ctx.$ctrl.renderedRepeat(raw);
    }
  }
}

exports = Repeat;
