goog.module("compilers.include");

const Controller = goog.require("compilers.controller");

let stackDepth = 0;

function loadCallback(element) {
  var ctx = Silica.getContext(element);
  if (ctx["onLoad"] && typeof ctx["onLoad"] === "function") {
    ctx["onLoad"](element);
  }
}
function clearContent(element) {
  while (element.hasChildNodes()) {
    Silica.removeFromDOM(element.lastChild);
  }
}

function processInclude(element, html) {
  let fragment = document.createElement("div");
  fragment.innerHTML = html;

  clearContent(element);
  while (fragment.children.length) {
    element.appendChild(fragment.children[0]);
  }

  stackDepth++;
  Include.apply(element);
  stackDepth--;

  if (stackDepth === 0) {
    Silica.compile(element);
  }

  Silica.apply(function () {
    loadCallback(element);
  }, Silica.getContext(element).el);
}
// loadPartial asynchronously retreives content and replaces the elements
// content with the loaded content.
function loadPartial(url, element) {
  if (element.dataset["siO2IncludedUrl"] === url) {
    return;
  }

  element.dataset["siO2IncludedUrl"] = url;

  clearContent(element);

  let cached = Silica._includeCache[url];
  if (cached) {
    processInclude(element, cached);
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      Silica._includeCache[url] = xhr.responseText;
      if (element.dataset["siO2IncludedUrl"] === url) {
        processInclude(element, xhr.responseText);
      }
    }
  };

  xhr.open("GET", url, true);
  xhr.send(null);
}

/** @this Element */
function IncludeUpdater(_, url) {
  // Don't try include empty url
  if (!url || url === "") {
    this.dataset["siO2IncludedUrl"] = "";
    clearContent(this);
    return;
  }

  loadPartial(url, this);
}

/** @this Element */
function Include(ctx, value) {
  var nodes = Silica.query(this, "[data-include]");
  var node;
  for (let i = nodes.length - 1; i >= 0; --i) {
    node = nodes[i];
    let property = node.dataset["include"];
    Silica.observer.register(node, property, IncludeUpdater);
  }
}

exports = Include;
