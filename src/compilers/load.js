goog.module('compilers.load')

function Load () {
  var nodes = Silica.query(this, '[data-load]')
  var node = null
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onload = function (evt) {
      Silica._call(this, evt, 'load')
    }
  }
}

exports = Load
