export default function Class() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var elements = raw.querySelectorAll('[data-class]');
  var element;
  var klass;
  var hardClass;
  for (let i = elements.length - 1; i >= 0; --i)
  {
    element = elements[i];
    hardClass = element.dataset._rt_hard_klass;
    if (hardClass && hardClass.length > 0)
    {
      element.className = hardClass;
    }
    else
    {
      if (hardClass == "")
      {
        element.className = "";
      }
      else
      {
        element.dataset._rt_hard_klass = element.className;
      }
    }
    klass = Silica.getValue(element, element.dataset.class, null, [element, element.dataset.parameter]);
    if (klass)
    {
      if (klass instanceof Array)
      {
        element.classList.add.apply(element.classList, klass);
      }
      else
      {
        element.classList.add(klass);
      }
    }
    if (element.dataset.show != null) {
      var key = element.dataset.show;
      var negate = key[0] == "!";
      isVisible = Silica._show($(element), key, negate);
      if (isVisible && element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      } else if (!isVisible && !element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    }
  }
}
