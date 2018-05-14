goog.module('compilers.blur')

function Blur () {
  var nodes = Silica.query(this, '[data-blur]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onblur = function (evt) {
      Silica._call(this, evt, 'blur')
    }
  }
}

exports = Blur
