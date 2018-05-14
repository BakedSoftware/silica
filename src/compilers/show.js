goog.module('compilers.show')

function Show () {
  var nodes = Silica.query(this, '[data-show]')
  var node
  var isVisible, negate, raw, val
  for (var i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    raw = val = node.dataset['show']
    negate = val[0] === '!'
    if (negate) {
      val = val.substr(1)
    }
    if (!Silica._shws[raw]) {
      Silica._shws[raw] = []
    }
    if (Silica._shws[raw].some(function (obj) { return obj === node })) {
      continue
    }
    node.onremove = function () {
      var list = Silica._shws[raw]
      if (list !== undefined && list !== null) {
        Silica._shws[raw] = list.filter(function (obj) {
          return obj !== node
        })
      } else {
        Silica._shws[raw] = []
      }
    }
    isVisible = Silica._show(node, val, negate)
    Silica._shws[raw].push(node)
    if (isVisible) {
      node.classList.remove('hidden')
    } else {
      node.classList.add('hidden')
    }
  }
}

exports = Show
