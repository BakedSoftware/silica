goog.module('compilers.click')

function Click () {
  var nodes = Silica.query(this, '[data-click]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    node.onclick = function (evt) {
      if (node !== evt.target && (evt.target.nodeName === 'SELECT' || evt.target.nodeName === 'INPUT')) {
        return
      }
      Silica._call(this, evt, 'click')
    }
  }
}

exports = Click
