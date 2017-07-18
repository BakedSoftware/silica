goog.module('watchers.class');

function updater(element) {
  var hardClass = element.dataset._rt_hard_klass;
  if (hardClass && hardClass.length > 0) {
    element.className = hardClass;
  } else {
    if (hardClass == "") {
      element.className = "";
    } else {
      element.dataset._rt_hard_klass = element.className;
    }
  }
  var klass = Silica.getValue(element, element.dataset['class'], null, [element, element.dataset['parameter']]);
  if (klass) {
    if (klass instanceof Array) {
      element.classList.add.apply(element.classList, klass);
    } else {
      element.classList.add(klass);
    }
  }
  if (element.dataset['show'] != null) {
    var key = element.dataset['show'];
    var negate = key[0] == "!";
    let isVisible = Silica._show(element, key, negate);
    if (isVisible && element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      if (!isVisible && !element.classList.contains("hidden")) {
        element.classList.add("hidden");
      }
    }
  }
}

/** @this Element */
function Class() {
  var elements = this.querySelectorAll('[data-class]');
  if (this.dataset['class']) {
    updater(this);
  }
  for (var i = elements.length - 1; i >= 0; --i) {
    updater(elements[i]);
  }
}

exports = Class;
