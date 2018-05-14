goog.module('compilers.mousewheel')

function MouseWheel () {
  var nodes = Silica.query(this, '[data-mousewheel]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onmousewheel = function (evt) {
      Silica._call(this, evt, 'mousewheel')
    }
  }
}

exports = MouseWheel
