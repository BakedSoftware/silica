goog.module('compilers.model')
const ModelUpdater = goog.require('watchers.model')

/** @this Element */
function Model (context = null) {
  var elements = Silica.query(this, '[data-model]')
  for (let elm of elements) {
    Silica.observer.register(elm, elm.dataset['model'], Silica.watchers['Model'])
  }
  ModelUpdater.call(this, context, undefined)
  elements = Silica.query(this, 'input[data-model]', 'select[data-model]', 'textarea[data-model]', 'option[data-model]')
  for (let i = elements.length - 1; i >= 0; i--) {
    let elm = elements[i]
    let change = function () {
      var obj, _ref, _ref1, _ref2
      var val = this.value
      var ctx = Silica.getContext(this)
      var model = this.dataset['model']
      if (this.type === 'radio') {
        if (val.match(/[0-9]/)) {
          val = parseInt(val, 10)
        }
      } else if (this.type === 'checkbox') {
        val = this.checked
      }
      if (Silica.isInApply) {
        obj = (_ref = this._rt_ctx) != null ? _ref : ctx
        Silica.setPropByString(obj, model, val)
      } else if ((_ref = this.dataset['trap']) != null) {
        obj = (_ref1 = this._rt_ctx) != null ? _ref1 : ctx
        let scope
        if (_ref.toLowerCase() === 'true') {
          scope = this
        } else {
          scope = document
          _ref1 = this
          while ((_ref1 = _ref1.parentElement)) {
            if (_ref1.classList.contains(_ref)) {
              scope = _ref1
              break
            }
          }
        }
        Silica.apply(function () {
          return Silica.setPropByString(obj, model, val)
        }, scope)
      } else {
        obj = (_ref2 = this._rt_ctx) != null ? _ref2 : ctx
        Silica.apply(function () {
          return Silica.setPropByString(obj, model, val)
        })
      }
    }
    elm.onchange = change
    elm.onkeyup = change
    elm.onsearch = change
    if (elm.hasAttribute('x-webkit-speech')) {
      elm.onwebkitspeechchange = change
    }
    elm.addEventListener('focus', function () { Silica.__activeElement = this })
    elm.addEventListener('blur', function () { if (Silica.__activeElement === this) Silica.__activeElement = null })
  }
}

exports = Model
