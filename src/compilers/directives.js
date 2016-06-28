export default function directives() {
  for (let k in Silica.directives)
  {
    if (Silica.directives.hasOwnProperty(k))
    {
      let obj = Silica.directives[k];
      let nodes = Silica.queryOfType(this, k);
      let wrapper = document.createElement("div");
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        // A node can only be used once, so create a new instance for each
        wrapper.innerHTML = obj.template;
        let newChild = wrapper.firstChild;
        let node = nodes[i];
        node.parentNode.replaceChild(newChild, node);
      }
    }
  }
}
