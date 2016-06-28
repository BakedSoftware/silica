export default function Model() {
  var raw = (this instanceof jQuery ? this[0] : this);
  var elements = raw.querySelectorAll('[data-model]');
  var element, i, type;
  for (i = elements.length - 1; i >= 0; --i)
  {
    element = elements[i];
    type = element.type;
    if (element !== document.activeElement && (type === 'text' || type === 'file' || type === 'number' ||
          type === 'email' || type === 'password' || type === 'time' || type === 'select-one' || type === "textarea"))
    {
      element.value = Silica._model_get_val(element);
    }
    else if (type === 'radio')
    {
      val = element.value;
      if (val.search(/[0-9]/) != -1) {
        val = parseInt(val);
      }
      element.checked = Silica.getValue(element, element.dataset.model) === val;
    }
    else if (type === 'checkbox')
    {
      element.checked = Silica.getValue(element, element.dataset.model);
    }
    else if (element.nodeName === 'SPAN')
    {
      val = Silica._model_get_val(element);
      if (val && val.nodeName) {
        element.innerHTML = "";
        element.appendChild(val);
      } else {
        element.innerHTML = val;
      }
    }
    else if (element.nodeName === 'OPTION')
    {
      element.value = Silica._model_get_val(element);
    }
  }
}
