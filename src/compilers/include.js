//loadPartial asynchronously retreives content and replaces the elements
//content with the loaded content.
function loadPartial(url, element)
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function()
  {
    if(xhr.readyState == 4)
    {
      element.innerHTML = xhr.responseText;
      Silica.compile(element);
      var ctx = Silica.getContext(element);
      if (ctx.onLoad && typeof ctx.onLoad === "function")
      {
        ctx.onLoad(element);
      }
    }
  };

  xhr.open("GET", url , true);
  xhr.send(null);
}

export default function Include() {
  var nodes = Silica.query(this, '[data-include]');
  var node, partial;
  for (let i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    partial = eval(node.dataset['include']);
    delete node.dataset['include'];
    loadPartial(partial, node);
  }
}
