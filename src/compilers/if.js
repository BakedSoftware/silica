goog.module('compilers.if')

/** @this Element */
function _if () {
  var nodes = Silica.queryWithComments(this, '[data-if]')
  var isVisible, negate, raw, val, node, comment, _ref
  var temp = document.createElement('div')
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    if (node.nodeType === 8) {
      temp.innerHTML = node.nodeValue
      raw = val = temp.firstElementChild.dataset['if']
    } else {
      raw = val = node.dataset['if']
    }
    negate = val[0] === '!'
    if (negate) {
      val = val.substr(1)
    }
    if (!Silica._ifs[raw]) {
      Silica._ifs[raw] = []
    }
    isVisible = Silica._show(node, val, negate)
    if (isVisible) {
      if (node.nodeType !== 8) {
        Silica._ifs[raw].push(node)
      } else {
        let live = temp.firstElementChild
        Silica._ifs[raw].push(live)
        node.parentElement.insertBefore(live, node)
        node.remove()
        node = live
      }

      if ((_ref = Silica.getContext(node)) != null) {
        if (typeof _ref['onLoad'] === 'function' && _ref['el'] === node) {
          _ref['onLoad']()
        }
      }
    } else if (node.nodeType !== 8) {
      // Remove subnodes registered with Silica
      let subNodes = Silica.queryWithComments(node, '[data-if]')
      let subNode
      var list, prop
      for (let j = subNodes.length - 1; j >= 0; --j) {
        subNode = subNodes[j]
        prop = subNode.dataset['if']
        list = Silica._shws[prop]
        Silica._shws[prop] = (list != null ? list.filter(function (obj) {
          return obj !== subNode
        }) : [])
      }
      subNodes = Silica.query(this, '[data-controller]')
      for (let j = subNodes.length - 1; j >= 0; --j) {
        subNode = subNodes[j]
        let ctrl = this._rt_ctrl
        let k, list
        // Note: This is compilled, need to change it to something more
        // readable
        for (k in ctrl != null ? ctrl.watchers : void 0) {
          list = Silica._watch[k]
          Silica._watch[k] = (list != null ? list.filter(function (obj) {
            return obj[0] !== ctrl
          }) : [])
        }
      }
      comment = document.createComment(node.outerHTML)
      Silica._ifs[raw].push(comment)
      node.parentNode.replaceChild(comment, node)
    }
  }
}

exports = _if
