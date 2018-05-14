goog.module('compilers.scroll')

function Scroll () {
  var nodes = Silica.query(this, '[data-scroll]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true

    node.onscroll = function (evt) {
      Silica._call(this, evt, 'scroll')
    }
  }
}

exports = Scroll
