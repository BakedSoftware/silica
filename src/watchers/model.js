goog.module('watchers.model')

var inputTypes = ['text', 'file', 'number', 'email', 'password', 'tel', 'search', 'url', 'range', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'color', 'textarea', 'select', 'select-one']

function setValue (activeElement, element, value) {
  if (element === activeElement && element.type !== 'radio' && element.type !== 'checkbox') {
    return
  }
  let type = element.type
  if (inputTypes.indexOf(type) !== -1) {
    element.value = value
  } else if (type === 'radio') {
    let val = element.value
    if (val.search(/[0-9]/) !== -1) {
      val = parseInt(val, 10)
    }
    element.checked = value === val
  } else if (type === 'checkbox') {
    element.checked = Silica.getValue(element, element.dataset['model'])
  } else if (element.nodeName === 'OPTION') {
    element.value = value
  } else {
    if (value) {
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
function Model (context, value) {
  var activeElement = document.activeElement || Silica.__activeElement
  if (value !== undefined) {
    setValue(activeElement, this, value)
  } else {
    var elements = Silica.query(this, '[data-model]')
    var element, i
    for (i = elements.length - 1; i >= 0; --i) {
      element = elements[i]
      if (element === activeElement && element.type !== 'radio' && element.type !== 'checkbox') {
        continue
      }
      setValue(activeElement, element, Silica._model_get_val(element))
    }
  }
}

exports = Model
