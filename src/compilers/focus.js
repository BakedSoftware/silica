goog.module('compilers.focus')

function Focus () {
  var nodes = Silica.query(this, '[data-focus]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onfocus = function (evt) {
      Silica._call(this, evt, 'focus')
    }
  }
}

exports = Focus
