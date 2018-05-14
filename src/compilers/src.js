goog.module('compilers.src')

function Src () {
  var nodes = Silica.queryOfType(this, 'img', '[data-src]')
  var node
  //  let bounds = {w: window.innerWidth, h: window.innerHeight};
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i]
    let target = Silica.getValue(node, node.dataset['src']) || 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    if (node.src !== target) {
      node.src = target
    }
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
