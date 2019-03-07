goog.module('compilers.src')

function defaultSrcForNode (node) {
  switch (node.nodeName) {
    case 'IMG': return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    default: return ''
  }
}

/** @this Element */
function Src (ctx, value) {
  if (value !== undefined && value !== this.src) {
    this.setAttribute('src', value || defaultSrcForNode(this))
  } else {
    var nodes = Silica.query(this, '[data-src]')
    var node
    //  let bounds = {w: window.innerWidth, h: window.innerHeight};
    for (let i = nodes.length - 1; i >= 0; --i) {
      node = nodes[i]
      let property = node.dataset['src']
      Silica.observer.register(node, property, Src) || defaultSrcForNode(node)
      /*
    if (node.src !== target)
    {

      let rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top <= bounds.h && rect.left < bounds.w)
      {
        node.src = target;
      }
    }
    */
    }
  }
}

/*
function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

window.addEventListener("scroll", debounce(function DataSrcCheck() {
  Src.call(document.body);
}, 16, false));

window.addEventListener("resize", debounce(function DataSrcCheck() {
  Src.call(document.body);
}, 16, false));
*/

exports = Src
