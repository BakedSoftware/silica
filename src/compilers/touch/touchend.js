goog.module('compilers.touch.end')

function TouchEnd () {
  var nodes = Silica.query(this, '[data-touchend]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.ontouchend = function (evt) {
      Silica._call(this, evt, 'touchend')
    }
  }
}

exports = TouchEnd
