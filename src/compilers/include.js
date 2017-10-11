goog.module('compilers.include');

function loadCallback(element)
{
  var ctx = Silica.getContext(element);
  if (ctx['onLoad'] && typeof ctx['onLoad'] === "function")
  {
    ctx['onLoad'](element);
  }
}
function clearContent(element)
{
  while(element.hasChildNodes())
  {
    element.removeChild(element.lastChild);
  }
}
//loadPartial asynchronously retreives content and replaces the elements
//content with the loaded content.
function loadPartial(url, element)
{
  if (element.dataset['sio2IncludedUrl'] == url) {
    return;
  }

  element.dataset['sio2IncludedUrl'] = url;

  clearContent(element);

  let cached = Silica._includeCache[url];
  if (cached)
  {
    element.appendChild(cached);
    Silica.flush(element);
    loadCallback(element);
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function()
  {
    if(xhr.readyState == 4)
    {
      let fragment = document.createElement('div');
      fragment.innerHTML = xhr.responseText;

      if (element.dataset['sio2IncludedUrl'] === url)
      {
        clearContent(element);
        element.appendChild(fragment);
        Silica.compile(element);
        Silica._includeCache[url] = fragment;
        Silica.apply(function(){
          loadCallback(element);
        });
      }
    }
  };

  xhr.open("GET", url , true);
  xhr.send(null);
}

function Include() {
  var nodes = Silica.query(this, '[data-include]');
  var node, url;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    url = Silica.getValue(node, node.dataset['include']);

    // Don't try include empty url
    if (!url || url === "")
    {
      node.removeAttribute('data-sio2-included-url');
      clearContent(node);
      continue;
    }

    loadPartial(url, node);
  }
}

exports = Include;
