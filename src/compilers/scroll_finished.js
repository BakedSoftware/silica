goog.module('compilers.scroll_finished')

/** @this Element */
function ScrollFinished () {
  var nodes = Silica.query(this, '[data-on-scroll-finished]')
  var node
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    node._rt_live = true

    var onScrollFinished = Silica.debounce(function (element, evt) {
      Silica._call(element, evt, 'onScrollFinished')
    }, 50)

    node.onscroll = function (evt) {
      if (this.dataset['scroll']) {
        Silica._call(this, evt, 'scroll')
      }
      onScrollFinished(this, evt)
    }
  }
}

exports = ScrollFinished
