goog.module('compilers.generic');

function Generic() {
  var nodes = Silica.query(this, '[data-silica]');
  var node;
  var comps, attribute, valueKey;
  var params, paramsKeys;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node       =  nodes[i];
    comps      =  node.dataset['silica'].split("=");
    if (comps.length !== 2)
    {
      console.error("Invalid generic binding", node.dataset['silica'], "for node", node);
      return
    }

    attribute   =  comps[0];
    valueKey    =  comps[1];
    paramsKeys  =  valueKey.match("\\((.*)\\)");

    if (paramsKeys !== null)
    {
      paramsKeys.shift();
      params = [];
      for (let j = 0, length = paramsKeys.length; j < length; j++)
      {
        params.push(Silica.getValue(node, paramsKeys[j]));
      }
      valueKey = valueKey.substr(0, valueKey.indexOf("("));
    }

    if (attribute !== "innerHTML") {
      node.setAttribute(attribute, Silica.getValue(node, valueKey, null, params));
    } else {
      node.innerHTML = Silica.getValue(node, valueKey, null, params);
    }
  }
  Silica._capture_links(this);
}

exports = Generic;
