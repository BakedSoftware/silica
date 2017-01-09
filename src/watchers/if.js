export default function _If() {
  var comment, compiled, element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
  var wrapper = document.createElement("div");
  _ref = Silica._ifs;
  for (k in _ref) {
    elements = _ref[k];
    if (Silica._ifs.hasOwnProperty(k)) {
      raw = k;
      negate = k[0] === '!';
      if (negate) {
        k = k.substr(1);
      }
      for (i = _i = 0, _len = elements.length; _i < _len; i = ++_i) {
        element = elements[i];
        if (element != this && !Silica.isDescendent(this, element))
        {
          continue;
        }
        isVisible = Silica._show(element, k, negate);
        if (isVisible) {
          if (element.nodeType === 8) {
            compiled = Silica.compile(element.nodeValue, false, Silica.getContext(element));
            element.parentNode.insertBefore(compiled, element);
            element.remove();
            Silica._ifs[raw][i] = compiled;
            let _ref;
            if ((_ref = Silica.getContext(compiled)) != null) {
              if (typeof _ref.onLoad === "function" && _ref.el == compiled) {
                _ref.onLoad();
              }
            }
          }
        } else {
          if (element.nodeType !== 8) {
            let subNodes = Silica.queryWithComments(element, '[data-if]');
            let subNode;
            for (let j = subNodes.length -1; j >= 0; --j)
            {
              var list, prop, _ref1;
              subNode = subNodes[j];
              if (subNode.nodeType === 8 && !subNode.dataset)
              {
                wrapper.innerHTML = subNode.data;
                prop = wrapper.firstChild.dataset['if'];
              }
              else
              {
                prop = subNode.dataset['if'];
              }
              list = Silica._shws[prop];
              Silica._shws[prop] = (_ref1 = list != null ? list.filter(function(obj) {
                return !obj == subNode;
              }) : void 0) != null ? _ref1 : [];
            }
            subNodes = Silica.query(element, '[data-controller]');
            for (let j = subNodes.length -1; j >= 0; --j)
            {
              var ctrl, list, _ref1, _results;
              subNode = subNodes[j];
              ctrl = subNode._rt_ctrl;
              for (k in ctrl != null ? ctrl.constructor.watchers : void 0) {
                list = Silica._watch[k];
                Silica._watch[k] = (list != null ? list.filter(function(obj) {
                  return obj[0] !== ctrl;
                }) : []);
              }
            }
            comment = document.createComment(element.outerHTML);
            comment.parentElement = element.parentElement;
            Silica._ifs[raw][i] = comment;
            element.parentNode.replaceChild(comment, element);
          }
        }
      }
    }
  }
}
