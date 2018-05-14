goog.module('compilers.clickoutside')

function handleClick (evt) {
  for (let node of Silica._clickOutElements) {
    if (node.offsetWidth > 0 || node.offsetHeight > 0) {
      if (evt.target !== node && !Silica.isDescendent(node, evt.target)) {
        Silica._call(node, evt, 'clickOutside')
      }
    }
  }
}

function ClickOutside () {
  var nodes = Silica.query(this, '[data-click-outside]')
  for (var i = nodes.length - 1; i >= 0; i--) {
    Silica._clickOutElements.add(nodes[i])
  }
  if (Silica._clickOutElements.size > 0) {
    window.addEventListener('click', handleClick)
  } else {
    window.removeEventListener('click', handleClick)
  }
}

exports = ClickOutside
