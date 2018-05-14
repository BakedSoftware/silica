goog.module('compilers.touch.start')

function TouchStart () {
  var nodes = Silica.query(this, '[data-touchstart]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.ontouchstart = function (evt) {
      Silica._call(this, evt, 'touchstart')
    }
  }
}

exports = TouchStart
