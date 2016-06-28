export default function Show() {
  var element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
  _ref = Silica._shws;
  for (k in _ref) {
    elements = _ref[k];
    if (Silica._shws.hasOwnProperty(k)) {
      raw = k;
      negate = k[0] === '!';
      if (negate) {
        k = k.substr(1);
      }
      for (i = _i = 0, _len = elements.length; _i < _len; i = ++_i) {
        element = elements[i];
        if (!Silica.isInDOM(element)) {
          continue;
        }
        isVisible = Silica._show($(element), k, negate);
        if (isVisible && element.classList.contains('hidden')) {
          element.classList.remove('hidden');
        } else if (!isVisible && !element.classList.contains('hidden')) {
          element.classList.add('hidden');
        }
      }
    }
  }
}
