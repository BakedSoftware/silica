goog.module('compilers.keyup')

function KeyUp (context = null) {
  var elements = Silica.query(this, '[data-keyup]')
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].addEventListener('keyup', function (evt) {
      Silica._call(this, evt, 'keyup')
    })
  }
}

exports = KeyUp
