goog.module('compilers.keydown')

function KeyDown (context = null) {
  var elements = Silica.query(this, '[data-keydown]')
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].addEventListener('keydown', function (evt) {
      Silica._call(this, evt, 'keydown')
    })
  }
}

exports = KeyDown
