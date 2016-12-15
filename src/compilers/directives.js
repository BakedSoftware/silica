export default function directives() {
  for (let k in Silica.directives)
  {
    if (Silica.directives.hasOwnProperty(k))
    {
      let obj = Silica.directives[k];
      let nodes = Silica.queryOfType(this, k);
      let wrapper = document.createElement("div");
      let watchers = obj.controller.watchers;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        // A node can only be used once, so create a new instance for each
        wrapper.innerHTML = obj.template;
        let newChild = wrapper.firstChild;
        let node = nodes[i];
        if (node.hasAttributes())
        {
          let attrs = node.attributes;
          for(let j = attrs.length - 1; j >= 0; j--)
          {
            newChild.setAttribute(attrs[i].name, attrs[i].value);
          }
        }
        for (let j in node.dataset)
        {
          newChild.dataset[j] = node.dataset[j];
        }
        newChild._rt_ctrl = new obj.controller(newChild);
        newChild._rt_ctrl.$ctrl = Silica.getContext(node);
        Silica.cacheTemplates(newChild);
        Silica.interpolate(newChild, newChild._rt_ctrl, false)
        node.parentNode.replaceChild(newChild, node);

        // Remove old watchers if rebuilding a controller for a node
        let v;
        for (w in watchers) {
          v = watchers[w];
          if (!Silica._watch[w]) {
            Silica._watch[w] = [];
          }
          Silica._watch[w].push([newChild._rt_ctrl, v]);
        }
        if (typeof newChild._rt_ctrl.onLoad === "function") {
          newChild._rt_ctrl.onLoad();
        }
      }
    }
  }
}
