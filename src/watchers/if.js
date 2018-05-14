goog.module('watchers.if')

function _If () {
  var comment, compiled, elements, i, isVisible, k, negate, raw, _len, _ref
  var wrapper = document.createElement('div')
  _ref = Silica._ifs
  for (k in _ref) {
    elements = _ref[k]
    raw = k
    negate = k[0] === '!'
    if (negate) {
      k = k.substr(1)
    }
    for (i = 0, _len = elements.length; i < _len; ++i) {
      let element = elements[i]
      if (element !== this && !Silica.isDescendent(this, element)) {
        continue
      }
      isVisible = Silica._show(element, k, negate)
      if (isVisible) {
        if (element.nodeType === 8) {
          let temp = document.createElement('div')
          temp.innerHTML = element.nodeValue
          compiled = Silica.compile(temp.firstElementChild, false, Silica.getContext(element.parentElement))
          element.parentNode.replaceChild(compiled, element)
          Silica._ifs[raw][i] = compiled
          let _ref
          if ((_ref = Silica.getContext(compiled)) != null) {
            if (typeof _ref['onLoad'] === 'function' && _ref['el'] === compiled) {
              _ref['onLoad']()
            }
          }
        }
      } else {
        if (element.nodeType !== 8) {
          let subNodes = Silica.queryWithComments(element, '[data-if]')
          let subNode
          for (let j = subNodes.length - 1; j >= 0; --j) {
            let list, prop, _ref1
            subNode = subNodes[j]
            if (subNode.nodeType === 8 && !subNode.dataset) {
              wrapper.innerHTML = subNode.data
              prop = wrapper.firstChild.dataset['if']
            } else {
              prop = subNode.dataset['if']
            }
            list = Silica._shws[prop]
            Silica._shws[prop] = (_ref1 = list != null ? list.filter(function (obj) {
              return !obj === subNode
            }) : void 0) != null ? _ref1 : []
          }
          subNodes = Silica.query(element, '[data-controller]')
          for (let j = subNodes.length - 1; j >= 0; --j) {
            let ctrl, list
            subNode = subNodes[j]
            ctrl = subNode._rt_ctrl
            for (k in ctrl != null ? ctrl.constructor['watchers'] : void 0) {
              list = Silica._watch[k]
              Silica._watch[k] = (list != null ? list.filter(function (obj) {
                return obj[0] !== ctrl
              }) : [])
            }
          }
          comment = document.createComment(element.outerHTML)
          element.parentNode.replaceChild(comment, element)
          Silica._ifs[raw][i] = comment
        }
      }
    }
  }
}

exports = _If
