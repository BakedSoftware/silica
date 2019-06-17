goog.module('compilers.model')

function setValue (activeElement, element, value) {
  if (element === activeElement && element.type !== 'radio' && element.type !== 'checkbox') {
    return
  }
  let type = element.type
  if (type === 'radio') {
    let val = element.value
    if (val.search(/[0-9]/) !== -1) {
      val = parseInt(val, 10)
    }
    element.checked = value === val
  } else if (type === 'checkbox') {
    element.checked = Silica.getValue(element, element.dataset['model'])
  } else if (element.nodeName === 'OPTION') {
    element.value = value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    element.value = value
  } else if (element.nodeName === 'SELECT') {
    for (let option of element.querySelectorAll('option')) {
      option.selected = option.value == value
    }
  } else {
    if (value !== null) {
      if (value.nodeName) {
        element.innerHTML = ''
        element.appendChild(value)
      } else if (element.innerHTML !== value) {
        element.innerHTML = value
      }
    } else if (element.innerHTML !== '') {
      element.innerHTML = ''
    }
  }
}

/** @this Element */
function ModelUpdater (context, value) {
  var activeElement = document.activeElement || Silica.__activeElement
  if (this === activeElement && this.type !== 'radio' && this.type !== 'checkbox') {
    return
  }
  setValue(activeElement, this, value)
}

/** @this Element */
function Model (context = null) {
  var elements = Silica.query(this, '[data-model]')
  for (let elm of elements) {
    let property = elm.dataset['model']
    Silica.observer.register(elm, property, ModelUpdater)
  }
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
    elm.onchange = Silica.debounce(change, 16)
    elm.onkeyup = Silica.debounce(change, 16)
    elm.onsearch = Silica.debounce(change, 16)
    if (elm.hasAttribute('x-webkit-speech')) {
      elm.onwebkitspeechchange = change
    }
    elm.addEventListener('focus', function () { Silica.__activeElement = this })
    elm.addEventListener('blur', function () { if (Silica.__activeElement === this) Silica.__activeElement = null })
  }
}

exports.Compiler = Model
exports.Updater = ModelUpdater
