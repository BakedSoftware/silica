import Controllers from './controllers/controllers';
// Import the compilers
import Compilers from './compilers/compilers';
// Import the watchers
import Watchers from './watchers/watchers';

var Silica = {
  context               :  window,
  contextName           :  '',
  directives            :  {},
  filters               :  {},
  router                :  {},
  _ifs                  :  {}, // Stores the registered ifs
  _shws                 :  {}, // Stores the registered shows
  _klass                :  {}, // Stores the registered css class
  _watch                :  {}, // Stores the registered watchers
  _repeat_templates     :  {}, // Stores a map between repeats and their templates
  _isReady              :  false, // Keeps track if app is ready
  _appRoot              :  null,
  interpolationPattern  :  /\{\{(.*?)\}\}/,
  usePushState          :  true,
  version               :  "0.9.5",

  // Set the root context
  setContext(contextName)
  {
    this.contextName = contextName;
    this.context = window[contextName];
  },

  setRouter(router)
  {
    this.router = router;
    window.onhashchange = () => {
      this.apply(() => this.router.route(location.hash));
    };
    if (Silica.usePushState) {
      window.onpopstate = () => {
        this.apply(() => this.router.route(Silica.usePushState ? location.pathname : location.hash));
      };
    }
  },

  goTo(pathname)
  {
    var route;
    if (Silica.usePushState) {
      history.pushState(null, null, pathname);
      route = pathname;
    } else {
      window.location.hash = "#" + pathname;
      route = window.location.hash;
    }
    if (Silica.router) {
      Silica.apply(function() {
        Silica.router.route(route);
      });
    }
  },

  // Interpolate and link all Silica directives within an element
  compile(element, flush = true, context = null, onlySafe = false, storeWatchers = true)
  {
    if (Silica._appRoot === null) {
      Silica._appRoot = element;
    }
    var func, k, _ref;
    if (!(element instanceof jQuery))
    {
      element = $(element);
    }
    if (element[0] == document)
    {
      element[0] = document.body.parentElement;
      context = context || {};
    }
    else
    {
      context = context || Silica.getContext(element);
    }
    Silica.cacheTemplates(element[0]);
    Silica.interpolate(element, context, flush);
    for (let key in Silica.compilers)
    {
      if (!(onlySafe & key[0] === '_'))
      {
        if (key == "Controller") {
          Silica.compilers[key].apply(element, [context, false, storeWatchers]);
        } else {
          Silica.compilers[key].apply(element, [context]);
        }
      }
    }
    if (flush) {
      Silica.flush(element, true);
    }

    Silica._capture_links(element);

    if (element === Silica._appRoot) {
      Silica._isReady = true;
    }
    return element;
  },

  cacheTemplates(element)
  {
    var nodes = element.querySelectorAll('[data-repeat]');
    var node;
    var hash;
    var context;
    for (let i = nodes.length - 1; i >= 0; --i)
    {
      node = nodes[i];
      if (!node.dataset._rt_repeat_template)
      {
        hash                              =  SparkMD5.hash(node.innerHTML);
        if (node.children.length === 1) {
          Silica._repeat_templates[hash]   =  node.firstElementChild;
        } else {
          let wrap = document.createElement('div');
          wrap.innerHTML = node.innerHTML;
          Silica._repeat_templates[hash]   =  wrap;
        }
        node.dataset._rt_repeat_template  =  hash;
        context                           =  {};
        context.$ctrl                     =  Silica.getContext(node);
        Silica._repeat_templates[hash]    =  Silica.compile($(Silica._repeat_templates[hash]), false, context, true, false)[0];
        node.innerHTML                    =  "";
      }
    }
  },

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  flush(element = document.body.parentElement, onlySafe = false, changed = null, skipSchedule = false)
  {
    if (Silica.isInFlush && !skipSchedule) {
      if (Silica._scheduledFlush) {
        return;
      } else {
        Silica._scheduledFlush = true;
      }
    }
    if (element == document) {
      element = document.body.parentElement;
    }
    Silica.isInFlush = !skipSchedule;
    if (changed === null && Silica._isReady) {
      let funcs;
      let func;
      for (let key in Silica._watch) {
        if (Silica._watch.hasOwnProperty(key)) {
          funcs = Silica._watch[key];
          for (let i = funcs.length - 1; i >= 0; --i) {
            func = funcs[i];
            func[1].apply(func[0]);
          }
        }
      }
    } else {
      let obj, k, funcs, func;
      for (k in changed) {
        funcs = changed[k];
        if (funcs !== true) {
          for (var i = funcs.length - 1; i >= 0; --i) {
            func = funcs[i];
            func[1].apply(func[0]);
          }
        } else {
          funcs = Silica._watch[k];
          for (var i = funcs.length - 1; i >= 0; --i) {
            func = funcs[i];
            func[1].apply(func[0]);
          }
        }
      }
    }
    let watchers = Silica.watchers;
    let func;
    for (let k in watchers) {
      if (onlySafe && k[0] === '_') {
        continue;
      }
      func = watchers[k];
      func.apply(element);
    }
    Silica.isInFlush = skipSchedule;
    if (Silica._scheduledFlush === true && !skipSchedule) {
      Silica._scheduledFlush = false;
      window.setTimeout(function(){ Silica.flush(document, false, {}); }, 20);
    }
    return Silica;
  },

  apply(func, element = document) {
    var args, assoc, changed, changes, finalChanges, funcs, k, oldVal, old_values, v, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (Silica.isInApply) {
      return func.call();
    }
    old_values = {};
    var association;
    for (let property in Silica._watch)
    {
      funcs = Silica._watch[property];
      old_values[property] = [];
      //Check if we are looking at an object property (starts with a lowercase)
      //or global property (starts with an uppercase).
      //Lowercase has charCode 97-122 inclusive
      if (property.charCodeAt(0) >= 97)
      {
        // association is an array of length 2 where first element is the object
        // and the second is the function on the object to execute when value
        // changes
        for (association of funcs)
        {
          //Get the current value
          val = Silica.getPropByString(association[0], property);
          //Shallow copy the value if it is an array
          if (Array.isArray(val))
          {
            val = val.slice();
          }
          //Store the value as an array of [object, value] where value is the
          //value of watched property of object
          old_values[property].push([association[0], val]);
        }
      }
      else
      {
        val = Silica.getPropByString(window, property);
        if (Array.isArray(val))
        {
          val = val.slice();
        }
        old_values[property] = val;
      }
    }

    // Mark we are about to execute the function
    // If the function to execute triggers another apply, the flag is checked
    // and the additional applies can be executed with out the need to diff the
    // properties since no flush has executed.
    Silica.isInApply = true;
    // Execute the function
    func.call();
    // Clear mark
    Silica.isInApply = false;

    // Compute the differences
    // TODO: Store the new values as the old values for the next round
    changes = {};
    _ref1 = Silica._watch;
    for (k in _ref1) {
      funcs = _ref1[k];
      // Check if we are looking at Global or object property key
      if (k.charCodeAt(0) >= 97) {
        changes[k] = [];
        for (_j = 0, _len1 = funcs.length; _j < _len1; _j++) {
          func = funcs[_j];
          if (k.match(/\.\*$/)) {
            changes[k].push(func);
          } else {
            val = Silica.getPropByString(func[0], k);
            _ref2 = old_values[k];
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              args = _ref2[_k];
              if (args[0] === func[0]) {
                oldVal = args[1];
              }
            }
            changed = val !== oldVal;
            if (Array.isArray(val) && Array.isArray(oldVal)) {
              changed = oldVal && val ? oldVal.length !== val.length : true;
              if (!changed) {
                changed = oldVal.some(function(e, idx) {
                  return val[idx] !== e;
                });
              }
            }
            if (changed) {
              changes[k].push(func);
            }
          }
        }
      } else {
        val = Silica.getPropByString(window, k);
        oldVal = old_values[k];
        changed = val !== oldVal;
        if (Array.isArray(val) && Array.isArray(oldVal)) {
          changed = oldVal && val ? oldVal.length !== val.length : true;
          if (!changed) {
            changed = oldVal.some(function(e, idx) {
              return val[idx] !== e;
            });
          }
        }
        changes[k] = changed;
      }
    }
    finalChanges = {};
    for (k in changes) {
      v = changes[k];
      if ((Array.isArray(v) && v.length) || v === true) {
        finalChanges[k] = v;
      }
    }
    return Silica.flush(element, false, finalChanges);
  },

  // Walk through an object to get the specified property.
  // Nested properties are specified using '.' syntax
  // Function properties will be called and the result will be walked as well
  getPropByString(obj, propString, params)
  {
    if (!propString)
    {
      return obj;
    }

    let comps = propString.split('.');
    while (obj[comps[0]] == null || obj[comps[0]] == undefined)
    {
      if (obj.$ctrl)
      {
        obj = obj.$ctrl;
      }
      else
      {
        return null;
      }
    }

    let context;
    let property_path = propString.split('.');
    let path_length = property_path.length;
    let property;
    for (let i = 0; i < path_length; ++i)
    {
      property = property_path[i];
      context = obj;
      obj = obj[property];
      if (typeof obj === 'function')
      {
        obj = obj.apply(context, params);
      }
      if (obj === null || obj === void 0)
      {
        return null;
      }
    }
    return obj;
  },

  getValue(raw, propString, context = null, params = null) {
    var ctx;
    ctx = context ? context : propString.charCodeAt(0) <= 90 ? window : Silica.getContext(raw);
    //TODO: This breaks when in the following case:
    // div.data-controller=childcontroller > div.data-class=rootController >
    // div.data-repeat=childContailer.model => the model is looked up on the
    // rootController as that is the next found context
    //raw._rt_ctx = ctx;
    return Silica.getPropByString(ctx, propString, params);
  },

  isInDOM(element) {
    while (element.parentElement != null && !element._deleted) {
      if (element.parentElement == document.body) {
        return true;
      } else {
        element = element.parentElement;
      }
    }
    return false;
  },

  setPropByString(obj, propString, value) {
    var key, paths, prop, _i, _len, _ref, _ref1, ctx;
    if (!propString) {
      return obj;
    }

    paths = propString.split('.');
    key = paths[paths.length - 1];

    if (propString.charCodeAt(0) <= 90)
    {
      ctx = window;
    }
    else
    {
      if (!obj.hasOwnProperty(paths[0]) && obj.hasOwnProperty('$ctrl'))
      {
        ctx = obj.$ctrl;
      } else {
        ctx = obj;
      }
    }

    for (_i = 0, _len = paths.length; _i < _len; _i++) {
      prop = paths[_i];
      if (prop !== key) {
        if (typeof ctx[prop] === 'function')
        {
          ctx = ctx[prop].call(ctx);
        } else {
          ctx = ctx[prop];
        }
      }
    }

    let old_value = ctx[prop];
    ctx[prop] = value;

    let hook = ctx[prop + "_changed"];
    if (hook)
    {
      hook.call(ctx, old_value, value);
    }
  },
  evaluateExpression(expr, $elm, ctx = {}) {
    var filter, filterKey, filterOptions, value;
    if (!expr) {
      return;
    }
    filter = null;
    if (expr.match('|')) {
      expr = expr.split('|');
      filter = $.trim(expr[1]);
      expr = $.trim(expr[0]);
    }
    if (!ctx.$ctrl)
    {
      ctx.$ctrl = Silica.getContext($elm);
    }

    //Expr refers to a global property so it must be in window context
    if (expr.charCodeAt(0) <= 90) {
      ctx = window;
    }

    value = Silica.getPropByString(ctx, expr);

    if (filter) {
      filter = filter.split(/:(.+)/);
      filterKey = filter ? filter[0] : null;
      filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
      filter = filterKey ? Silica.filters[filterKey] : null;
      value = filter ? filter(value, filterOptions, ctx) : value;
    }
    return value;
  },

  // Convert  mustache expressions into model bindings
  interpolate($elm, context = null, flush = true) {
    var element = ($elm instanceof jQuery ? $elm[0] : $elm); //TODO: Remove jQuery
    var elements = [];
    var children = element.childNodes;
    var text, match, expr, comps, property, fmt, filter, evald;
    var nodeIterator = document.createNodeIterator(
      // Node to use as root
      element,

      // Only consider nodes that are text nodes (nodeType 3)
      NodeFilter.SHOW_TEXT,

      // Object containing the function to use for the acceptNode method
      // of the NodeFilter
      { acceptNode: function(node) {
          // Logic to determine whether to accept, reject or skip node
          // In this case, only accept nodes that have content
          // matching the interpolation pattern
          if (Silica.interpolationPattern.test(node.data)) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      },
      false
    );

    var node;
    // Walk through each node that contains the interpolation pattern
    while ((node = nodeIterator.nextNode()))
    {
      // Get the raw text
      text = node.data;
      // While the raw text contains the interpolation pattern
      // loop and replace the pattern with the compiled elemenent
      while((match = text.match(Silica.interpolationPattern)) !== null)
      {
        // The expression to evaluate
        expr = match[1];
        // Split on the pipe operator
        comps = expr.split('|');
        // The property to bind to
        property = comps[0].trim();
        // Check for a filter (pipe)
        if (comps.length === 1)
        {
          fmt = "<span data-model='" + property + "'>{{val}}</span>";
        }
        else
        {
          filter = comps[1].trim();
          fmt = "<span data-model='" + property + "' data-filter='" + filter + "'>{{val}}</span>";
        }
        // Evaluate and replace the expression
        evald = fmt.replace('{{val}}', Silica.evaluateExpression(expr, node, context));
        text = text.replace("{{" + expr + "}}", evald);
      }
      // Create a new element containing the interpolated text
      var span = document.createElement('span');
      span.innerHTML = text;

      // Replace the original node with the created ones
      // This must be done in a loop to preserve original whitespace
      var parentNode = node.parentNode;
      while (span.childNodes.length > 0)
      {
        parentNode.insertBefore(span.firstChild, node);
      }
      parentNode.removeChild(node);

      // Compile the interpolated result
      Silica.compile(span, flush, context);
    }
  },

  addFilter(key, func) {
    Silica.filters[key] = func;
  },
  addDirective(key, obj) {
    Silica.directives[key] = obj;
  },
  getContext(element) {
    var $elm, constructor, ctrl, k, v, _ref, raw, ctx, model, needsModel;
    raw = element instanceof jQuery ? element[0] : element; //TODO: remove jQuery
    while (true)
    {
      if (raw._rt_ctx) {
        return raw._rt_ctx;
      } else if (raw._rt_ctrl) {
        return raw._rt_ctrl;
      } else if (raw.nodeName === 'BODY') {
        return Silica.context;
      } else if (raw.nodeType !== 9 && raw.nodeType !== 3 && raw.nodeType !== 8 && raw.dataset && raw.dataset.controller) {
        constructor = raw.dataset.controller;
        if (typeof (_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
        {
          needsModel = true;
          model = Silica.getValue(raw.parentNode,  _ref[2]);
        }
        constructor = _ref[1];
        constructor = eval(constructor);
        if (!constructor) {
          return console.error("Unknown Controller: " + raw.dataset.controller);
        }
        if (typeof model !== "undefined") {
          ctrl = new constructor(raw, model);
        } else {
          ctrl = new constructor(raw);
        }

        if (!needsModel ^ (model != null)) {
          // Remove old wathcers if rebuilding a controller for a node
          let watchers = constructor.watchers;
          if (raw._rt_ctrl && watchers && Object.keys(watchers).length > 0) {
            for (k in watchers) {
              v = watchers[k];
              let stored = Silica._watch[k]
                if (!stored) {
                  continue
                }
              for (let pairIdx = stored.length - 1; pairIdx >= 0; --pairIdx)
              {
                let pair = stored[pairIdx];
                if (raw._rt_ctrl == pair[0])
                {
                  stored.splice(pairIdx, 1);
                  break;
                }
              }
            }
          }

          raw._rt_live = true;
          raw._rt_ctrl = ctrl;

          _ref = constructor.watchers;
          for (k in _ref) {
            v = _ref[k];
            if (!Silica._watch[k]) {
              Silica._watch[k] = [];
            }
            Silica._watch[k].push([ctrl, v]);
          }
          if (typeof ctrl.onLoad === "function") {
            ctrl.onLoad();
          }
        }
        return ctrl;
      } else if (raw.parentElement) {
        raw = raw.parentElement;
      } else {
        return Silica.context;
      }
    }
  },
  _handle_href(evt){
    var path = this.getAttribute("href")
    if (path === "#" || path === "" || path.indexOf("tel://") == 0)
    {
      return;
    }
    evt.preventDefault();
    Silica.goTo(path);
    return false;
  },
  _capture_links(element) {
    //Capture lnks for pushState
    let nodes = Silica.queryOfType(element, 'a', '[href]', '[data-href]');
    let node;
    let externalRegexp = /:\/\//
    for (let i = nodes.length - 1; i >= 0; --i)
    {
      node = nodes[i];
      if (node.hostname === location.hostname && node.target !== "_blank")
      {
        node.removeEventListener("click", Silica._handle_href, true);
        node.addEventListener("click", Silica._handle_href, true);
      }
    }
  },
  _show(element, expr, negate) {
    var $elm, ctx, isVisible;
    isVisible = true;
    if (expr.indexOf(Silica.contextName) === 0) {
      isVisible = Silica.getPropByString(Silica.context, expr.substr(Silica.contextName.length + 1));
    } else {
      if (element.nodeType !== 8 && (typeof (ctx = element._rt_ctx)) !== "undefined") {
        isVisible = Silica.getPropByString(ctx, expr);
      } else {
        ctx = Silica.getContext(element);
        isVisible = Silica.getPropByString(ctx, expr);
      }
    }
    if (negate) {
      isVisible = !isVisible;
    }
    return isVisible;
  },
  _call(element, evnt, act)
  {
    if (!Silica.isInDOM(element))
    {
      return;
    }
    if (!element.dataset["noPreventDefault"])
    {
      evnt.preventDefault();
    }
    if (!element.dataset["noStopPropagation"])
    {
      evnt.stopPropagation();
    }
    var scope = document, trap_to, trapped_scope;
    if ((trap_to = element.dataset.trap) != null) {
      if (trap_to.toLowerCase() === "true") {
        scope = element;
      } else {
        trapped_scope = element;
        while ((trapped_scope = trapped_scope.parentElement)) {
          if (trapped_scope.classList.contains(trap_to)) {
            scope = trapped_scope;
            break;
          }
        }
      }
    }
    Silica.apply(function()
    {
      var $elm, action, ctx, objects, parameter, actionName, models = [];
      $elm = $(element);
      ctx = Silica.getContext($elm);
      action = $elm.data(act);
      var idx = action.indexOf("(");
      if (idx > 0) {
        actionName = action.substr(0, idx)
        models = action.substr(actionName.length).match(/(\w+)(?:\(?(\w+)\))?/g);
        if (models)
        {
          for (let i = 0; i < models.length; i++) {
            models[i] = Silica.getPropByString(ctx, models[i])
          }
        } else {
          models = [];
        }
      } else {
        actionName = action;
      }
      while (!ctx.hasOwnProperty(actionName) && ctx.hasOwnProperty('$ctrl'))
      {
        ctx = ctx.$ctrl;
      }
      if (element.dataset.parameter) {
        parameter = element.dataset.parameter;
      }

      if (ctx.hasOwnProperty(actionName) || typeof ctx[actionName] !== 'undefined') {
        return ctx[actionName].apply(ctx, [$elm, ...models, parameter, evnt]);
      } else if (Silica.context[actionName] != null) {
        return Silica.context[actionName].apply(Silica.ctx, [$elm, ...models, parameter, evnt]);
      } else {
        return console.error("Unknown action '" + actionName + "' for " + $elm[0].outerHTML + " in " + ctx.constructor.name);
      }
    }, scope);
  },
  _model_get_val(raw)
  {
    var filter, filterKey, filterOptions, value;
    filter = raw.attributes["data-filter"];
    filter = filter ? filter.value.split(/:(.+)/) : null;
    filterKey = (filter ? filter[0] : null);
    if (filterKey && !Silica.filters[filterKey]) {
      throw new Error("Unknown filter: '" + filterKey + "' for element: " + raw.outerHTML);
    }
    filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
    filter = filterKey ? Silica.filters[filterKey] : null;
    value = Silica.getValue(raw, raw.dataset.model);
    if (filter && value != null) {
      return filter(value, filterOptions);
    } else {
      return value;
    }
  },
  findComments(root)
  {
    var arr = [];
    var raw = root instanceof jQuery ? root[0] : root;
    for (var i = raw.childNodes.length - 1; i >= 0; --i)
    {
      var node = raw.childNodes[i];
      if (node.nodeType === 8)
      {
        arr.push(node);
      }
      else
      {
        arr.push.apply(arr, Silica.findComments(node));
      }
    }
    return arr;
  },
  isInRepeat(root, node) {
    while(node.parentElement && node.parentElement !== root)
    {
      if (node.parentElement.hasAttribute("data-repeat"))
      {
        return true;
      }
      else
      {
        node = node.parentElement;
      }
    }
    return false;
  },
  isDescendent(ancestor, child) {
    while((child=child.parentNode)&&child!==ancestor);
    return !!child;
  },
  query(root, ...attributes) {
    var raw = (root instanceof jQuery ? root[0] : root);
    if (raw == document) {
      raw = document.firstElementChild;
    }
    var isSingle = attributes.length == 1;
    var nodes = raw.querySelectorAll(attributes.join(','));
    var filtered = [];
    for (let i = nodes.length - 1; i >=0; --i)
    {
      let node = nodes.item(i);
      //TODO: This prevents multiple data-* for the same element, need to
      //return all elements and have the complex compilers not reattach to the
      //element (data-controller, data-repeat)
      /*
      if (!node._rt_live)
      {
      */
        if (!Silica.isInRepeat(root, node))
        {
          filtered.push(node);
        }
      /*
      }
      */
    }
    if (!raw.rt_live)
    {
      let attribute;
      for (let i = attributes.length - 1; i >=0; --i)
      {
        attribute = attributes[i];
        if (raw.hasAttribute(attribute.substring(1, attribute.length-1)))
        {
          filtered.push(raw);
          break;
        }
      }
    }
    return filtered;
  },

  queryWithComments(root, ...attributes)
  {
    var filtered = Silica.query(root, ...attributes);
    var comments = Silica.findComments(root);

    var temp = document.createElement("div");
    for (var i = comments.length - 1; i >= 0; --i)
    {
      var node = comments[i];
      // Check node is a commented out tag, not just text
      if (node.nodeValue.charAt(0) === "<")
      {
        // Convert the comment back to live version to check attributes
        temp.innerHTML = node.nodeValue;
        if (temp.firstElementChild.hasAttributes(attributes.join(",")))
        {
          filtered.push(node);
        }
      }
    }

    return filtered;
  },

  querySorted(root, ...attributes) {
    var filtered = Silica.query(root, ...attributes);

    for (var i = 0, list_length = filtered.length; i < list_length; i++) {
      var node = filtered[i];
      for (var j = i+1; j < list_length; j++) {
        var other = filtered[j];
        if (other.contains(node)) {
          filtered[i] = other;
          filtered[j] = node;
        }
      }
    }

    return filtered;
  },

  queryOfType(root, type, ...attributes)
  {
    var raw = (root instanceof jQuery ? root[0] : root);
    if (raw == document) {
      raw = document.firstElementChild;
    }
    var isSingle = attributes.length == 1;
    var nodes = raw.getElementsByTagName(type);
    var filtered = [];
    for (let i = nodes.length - 1; i >=0; --i)
    {
      let node = nodes.item(i);
      if (!node._rt_live)
      {
        for (let j = attributes.length - 1; j >=0; --j)
        {
          if (node.hasAttribute(attributes[j].replace(/\[|\]/g, "")))
          {
            filtered.push(node);
            break;
          }
        }
      }
    }
    if (raw.tagName === type && !raw.rt_live)
    {
      let attribute;
      for (let i = attributes.length - 1; i >=0; --i)
      {
        attribute = attributes[i];
        if (raw.hasAttribute(attribute.substring(1, attribute.length-1)))
        {
          filtered.push(root);
          break;
        }
      }
    }
    return filtered;
  },
  removeFromDOM(e) {
    var removeWatchers = function(nodes) {
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        let node = nodes[i];
        if (node._rt_ctrl) {
          ctrl = node._rt_ctrl;
          for (k in ctrl.constructor.watchers)
          {
            list = Silica._watch[k];
            Silica._watch[k] = (list != null ? list.filter(function(obj) {
              return obj[0] !== ctrl;
            }) : []);
          }
        }
      }
    };

    for (var i = e.childNodes.length - 1; i >= 0; --i) {
      var child = e.childNodes[i];
      if (typeof child.onremove == 'function') {
        child.onremove();
      }
    }

    if (e.nodeType !== 3 && e.nodeType !== 8) {
      var nodesWithControllers = e.querySelectorAll('[data-controller]');
      removeWatchers(nodesWithControllers);
      removeWatchers([e]);
    }

    e._deleted = true;
    e.remove();
  },

  compilers: Compilers,
  watchers: Watchers
};

Silica.Controllers = Controllers;
window.Silica = Silica;
