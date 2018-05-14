goog.module('compilers.scroll_finished')

/** @this Element */
function ScrollFinished () {
  var nodes = Silica.query(this, '[data-scroll-finished]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true
    let element = this

    var onscrollfinished = Silica.debounce(function (element, evt) {
      Silica._call(element, evt, 'scroll-finished')
    }, 50)

    node.onscroll = function (evt) {
      if (this.dataset['scroll']) {
        Silica._call(this, evt, 'scroll')
      }
      onscrollfinished(element, evt)
    }
  }
}

exports = ScrollFinished
