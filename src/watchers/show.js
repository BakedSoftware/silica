export default function Show() {
  var element, elements, i, isVisible, k, negate, raw;
  raw = this instanceof jQuery ? this[0] : this;
  elements = raw.querySelectorAll("[data-show]");
  if(raw.dataset.show){
    if (elements.length == 0) {
      elements = [raw];
    } else {
      let a = [];
      for (let i = elements.length - 1; i >= 0; i--)
      {
        a[i] = elements[i];
      }
      elements = a;
    }
  }
  for(var i = elements.length - 1; i >= 0; i--){
    element = elements[i];
    if (!Silica.isInDOM(element)) {
      continue;
    }

    k = element.dataset.show;
    negate = k[0] === "!";
    if (negate) {
      k = k.substr(1);
    }

    isVisible = Silica._show(element, k, negate);
    if (isVisible && element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      if (!isVisible && !element.classList.contains("hidden")) {
        element.classList.add("hidden");
      }
    }
  }
}
