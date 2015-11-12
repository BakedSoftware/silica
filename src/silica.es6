import Controllers from './controllers/controllers';

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
  interpolationPattern  :  /\{\{(.*?)\}\}/,

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
  },

  // Interpolate and link all Silica directives within an element
  compile(element, flush = true, context = null)
  {
    var func, k, _ref;
    if (!(element instanceof jQuery))
    {
      element = $(element);
    }
    if (element[0] == document)
    {
      element[0] = document.firstElementChild;
      context = context || {};
    }
    else
    {
      context = context || Silica.getContext(element);
      element[0]._rt_ctx = context;
    }
    Silica.cacheTemplates(element[0]);
    Silica.interpolate(element, context, flush);
    for (let key in Silica.compilers)
    {
      if (key[0] !== '_')
      {
        Silica.compilers[key].apply(element, [context]);
      }
    }
    if (flush) {
      Silica.flush(element, true);
    }
    return element;
  },

  cacheTemplates(element)
  {
    let nodes = element.querySelectorAll('[data-repeat]');
    let node;
    let hash;
    for (let i = nodes.length - 1; i >= 0; --i)
    {
      node = nodes[i];
      if (!node.dataset._rt_repeat_template)
      {
        hash                              =  SparkMD5.hash(node.innerHTML);
        Silica._repeat_templates[hash]   =  node.firstElementChild;
        node.dataset._rt_repeat_template  =  hash;
        node.innerHTML                    =  "";
      }
    }
  },
  flush(element = document, onlySafe = false, changed = null)
  {
    if (Silica.isInFlush) {
      if (Silica._scheduledFlush) {
        return;
      } else {
        Silica._scheduledFlush = true;
      }
    }
    Silica.isInFlush = true;
    if (changed === null) {
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
      let obj, k;
      for (k in changed) {
        obj = changed[k];
        if (obj !== true) {
          for (let func of obj){
            func[1].apply(func[0]);
          }
        } else {
          obj = Silica._watch[k];
          for (let func of obj) {
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
    Silica.isInFlush = false;
    if (Silica._scheduledFlush === true) {
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
    if (!obj[comps[0]])
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
        obj = obj.call(context, params);
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
    raw._rt_ctx = ctx;
    return Silica.getPropByString(ctx, propString, params);
  },

  isInDOM(element) {
    while (element.parentElement !== null) {
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
    if (!obj.hasOwnProperty(paths[0]) && obj.hasOwnProperty('$ctrl'))
    {
      ctx = obj.$ctrl;
    } else {
      ctx = obj;
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
    var $elm, constructor, ctrl, k, v, _ref, raw, ctx;
    raw = element instanceof jQuery ? element[0] : element; //TODO: remove jQuery
    while (true)
    {
      if (raw._rt_ctx) {
        return raw._rt_ctx;
      } else if (raw._rt_ctrl) {
        return raw._rt_ctrl;
      } else if (raw.nodeName === 'BODY') {
        return Silica.context;
      } else if (raw.nodeType !== 9 && raw.nodeType !== 3 && raw.dataset.controller) {
        constructor = raw.dataset.controller;
        if (typeof (_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
        {
          model = Silica.getValue(raw.parentNode,  _ref[2]);
        }
        constructor = _ref[1];
        constructor = eval(constructor);
        if (!constructor) {
          return console.error("Unknown Controller: " + raw.dataset.controller);
        }
        if (typeof model !== 'undefined')
        {
          ctrl = new constructor(raw, model);
        }
        else
        {
          ctrl = new constructor(raw);
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
        return ctrl;
      } else if (raw.parentElement) {
        raw = raw.parentElement;
      } else {
        return Silica.context;
      }
    }
  },
  _show(element, expr, negate) {
    var $elm, ctx, isVisible;
    isVisible = true;
    if (expr.indexOf(Silica.contextName) === 0) {
      isVisible = Silica.getPropByString(Silica.context, expr.substr(Silica.contextName.length + 1));
    } else {
      $elm = element.constructor.name === "" ? element : $(element);
      if ((typeof (ctx = $elm[0]._rt_ctx)) !== "undefined") {
        isVisible = Silica.getPropByString(ctx, expr);
      } else {
        ctx = Silica.getContext($elm);
        $elm[0]._rt_ctx = ctx;
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
    evnt.preventDefault();
    Silica.apply(function()
    {
      var $elm, action, ctx, model, obj, parameter;
      $elm = $(element);
      ctx = Silica.getContext($elm);
      action = $elm.data(act);
      action = action.match(/(\w+)(?:\((\w+)\))*/);
      if (typeof action[2] !== 'undefined')
      {
        model = action[2];
      }
      action = action[1];
      if (model) {
        obj = ctx[model];
      }
      while (!ctx.hasOwnProperty(action) && ctx.hasOwnProperty('$ctrl'))
      {
        ctx = ctx.$ctrl;
      }
      if (element.dataset.parameter) {
        parameter = element.dataset.parameter;
      }

      if (ctx.hasOwnProperty(action) || typeof ctx[action] !== 'undefined') {
        return ctx[action].apply(ctx, [$elm, obj, parameter]);
      } else if (Silica.context[action] != null) {
        return Silica.context[action].apply(Silica.ctx, [$elm, obj, parameter]);
      } else {
        return console.error("Unknown action '" + action + "' for " + $elm[0].outerHTML + " in " + ctx.constructor.name);
      }
    });
  },
  _model_get_val(raw)
  {
    var filter, filterKey, filterOptions, value, _ref;
    filter = (typeof (_ref = raw.dataset.filter)) !== "undefined" ? _ref.split(/:(.+)/) : void 0;
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
      if (!node._rt_live)
      {
        filtered.push(node);
      }
    }
    if (!raw.rt_live)
    {
      for (let i = attributes.length - 1; i >=0; --i)
      {
        if (raw.hasAttribute(attributes[i]))
        {
          filtered.push(raw);
          break;
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
          if (node.hasAttribute(attributes[j]))
          {
            filtered.push(node);
            break;
          }
        }
      }
    }
    if (raw.tagName === type && !raw.rt_live)
    {
      for (let i = attributes.length - 1; i >=0; --i)
      {
        if (raw.hasAttribute(attributes[i]))
        {
          filtered.push(root);
          break;
        }
      }
    }
    return filtered;
  },
  removeFromDOM(e) {
    for (var i = 0; i < e.childNodes.length; ++i) {
          var child = e.childNodes[i];
          Silica.removeFromDOM(child);
          if (typeof child.onremove == 'function') {
              child.onremove();
          }
      }
      e.remove();
  },
  compilers: {
    directives() {
      var k, obj, _ref, _results;
      _ref = Silica.directives;
      _results = [];
      for (k in _ref) {
        obj = _ref[k];
        if (Silica.directives.hasOwnProperty(k)) {
          _results.push($(k, this).each(function() {
            return $(this).replaceWith(obj.template);
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    "if": function() {
      return $('*[data-if]', this).each(function() {
        var $elm, comment, isVisible, negate, raw, val, _ref;
        isVisible = false;
        $elm = $(this);
        raw = val = $elm.data('if');
        negate = val[0] === '!';
        if (negate) {
          val = val.substr(1);
        }
        if (!Silica._ifs[raw]) {
          Silica._ifs[raw] = [];
        }
        isVisible = Silica._show($elm, val, negate);
        if (isVisible) {
          Silica._ifs[raw].push(this);
        } else {
          $('*[data-show]', $elm).each(function() {
            var $e, list, prop, _ref;
            $e = $(this);
            prop = $e.data('show');
            list = Silica._shws[prop];
            Silica._shws[prop] = (_ref = list != null ? list.filter(function(obj) {
              return !$(obj).is($e);
            }) : void 0) != null ? _ref : [];
          });
          $('*[data-controller]', $elm).each(function() {
            var $e, ctrl, k, list, _ref, _results;
            $e = $(this);
            ctrl = this._rt_ctrl;;
            _results = [];
            for (k in ctrl != null ? ctrl.watchers : void 0) {
              list = Silica._watch[k];
              _results.push(Silica._watch[k] = (_ref = list != null ? list.filter(function(obj) {
                return obj[0] !== ctrl;
              }) : void 0) != null ? _ref : []);
            }
            return _results;
          });
          comment = document.createComment(this.outerHTML);
          Silica._ifs[raw].push(comment);
          $elm.replaceWith(comment);
          if ((_ref = Silica.getContext($elm)) != null) {
            if (typeof _ref.onLoad === "function") {
              _ref.onLoad();
            }
          }
        }
        return null;
      });
    },
    show() {
      var nodes = Silica.query(this, "[data-show]");
      var node;
      var $elm, isVisible, negate, raw, val;
      for (var i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        $elm = $(node);
        raw = val = $elm.data('show');
        negate = val[0] === '!';
        if (negate) {
          val = val.substr(1);
        }
        if (!Silica._shws[raw]) {
          Silica._shws[raw] = [];
        }
        if (Silica._shws[raw].some(function(obj) { return $(obj).is($elm);}))
        {
          continue;
        }
        $elm[0].onremove = function() {
          var list, _ref = $elm[0];
          list = Silica._shws[raw];
          if (list !== undefined && list !== null)
          {
            Silica._shws[raw] =  list.filter(function(obj)
            {
              return $elm[0] !== _ref;
            });
          }
          else
          {
            Silica._shws[raw] = [];
          }
        };
        isVisible = Silica._show($elm, val, negate);
        Silica._shws[raw].push(this);
        if (isVisible) {
          $elm.removeClass('hidden');
        } else {
          $elm.addClass('hidden');
        }
      }
    },
    "class": function() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, "[data-class]");
      var node;
      var klass;

      if (raw.nodeType != 9 && raw.dataset.class)
      {
        raw.dataset._rt_hard_klass = raw.className;
        klass = Silica.getValue(raw, raw.dataset.class);
        if (klass)
        {
          raw.classList.add(klass);
        }
      }

      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node.dataset._rt_hard_klass = node.className.split('hidden').join(" ").trim();
        klass = Silica.getValue(node, node.dataset.class);
        if (klass)
        {
          node.classList.add(klass);
        }
      }
    },

    disabled()
    {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, '[data-disabled]');
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        if (Silica.getValue(node, node.dataset.disabled))
        {
          node.setAttribute("disabled", true);
        }
        else
        {
          node.removeAttribute("disabled");
        }
      }
    },

    href()
    {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, '[data-href]');
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node.setAttribute("href", Silica.getValue(node, node.dataset.href));
      }
    },

    style()
    {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, '[data-style]');
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node.setAttribute("style", Silica.getValue(node, node.dataset.style));
      }
    },

    include() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, '[data-style]');
      var node, partial;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        partial = eval(node.dataset.include);
        delete node.dataset.include;
        $(node).load(partial, function() {
          Silica.compile(this);
          var ctx = Silica.getContext(this);
          if (ctx.onLoad && typeof ctx.onLoad === "function")
          {
            ctx.onLoad(this);
          }
        });
      }
    },
    controller() {
      var nodes = Silica.query(this, "[data-controller]")
      var node, $elm, constructor, ctrl, k, v, _ref, model;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        $elm = $(node);
        constructor = $elm.data('controller');
        if (typeof (_ref = constructor.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
        {
          model = Silica.getValue($elm.parent()[0],  _ref[2]);
        }
        constructor = _ref[1];
        constructor = eval(constructor);
        if (!constructor) {
          return console.error("Unknown Controller: " + ($elm.data('controller')));
        }
        if (typeof model !== 'undefined')
        {
          ctrl = new constructor($elm, model);
        }
        else
        {
          ctrl = new constructor($elm);
        }
        node._rt_live = true;
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
    },
    click() {
      var nodes = Silica.query(this, "[data-click]");
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node._rt_live = true;
        node.onclick = function(evt) {
          Silica._call(this, evt, 'click');
        };
      }
    },
    dblclick() {
      var nodes = Silica.query(this, "[data-dblclick]");
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node._rt_live = true;
        node.ondblclick = function(evt) {
          Silica._call(this, evt, 'dblclick');
        };
      }
    },
    blur() {
      var nodes = Silica.query(this, "[data-blur]");
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node._rt_live = true;
        node.onblur = function(evt) {
          Silica._call(this, evt, 'blur');
        };
      }
    },
    tabs() {
      var li, pane, template;
      li = '<li><a href="#" data-click="open"></a></li>';
      pane = '<div class="tab-pane"></div>';
      template = '<div class="tabbable"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>';
      return $('*[data-tabs]', this).each(function() {
        var $elm, $target, tabCtrl;
        $elm = $(this);
        $target = $(template);
        $target.addClass($elm.attr('class'));
        tabCtrl = {
          open: function(el) {
            $('.active', $target).removeClass('active');
            $(el).parent().addClass('active');
            return $(".tab-pane[title='" + ($(el).parent().attr('title')) + "']", $target).addClass('active');
          }
        };
        $target[0]._rt_ctrl = tabctrl;
        $('*[data-pane]', $elm).each(function() {
          var $link, $pane, newPane, title;
          $pane = $(this);
          $link = $(li);
          title = $pane.attr('title');
          $link.attr('title', title);
          $('a', $link).html(title);
          $('ul.nav', $target).append($link);
          newPane = $(pane).append($pane.children());
          newPane.attr('title', title);
          return $('.tab-content', $target).append(newPane);
        });
        tabCtrl.open($('li:first-child > a', $target));
        return $elm.replaceWith(Silica.compile($target));
      });
    },
    model(context = null) {
      $('input[data-model], select[data-model], textarea[data-model] option[data-model]', this).each(function() {
        var $elm, change, ctx, model, val;
        $elm = $(this);
        //ctx = context != null ? context : Silica.getContext($elm);
        ctx = Silica.getContext($elm);
        model = $elm.data('model');
        let type = $elm.attr('type');
        if (type === 'text' || type === 'file' || type === 'number' ||
            type === 'email' || type === 'password' || type === 'time') {
          $elm.val(Silica.getValue($elm[0], model, ctx));
        } else if ($elm.attr('type') === 'radio') {
          val = $elm.val();
          if (val[0].match(/[0-9]/)) {
            val = parseInt(val);
          }
          $elm.prop('checked', Silica.getValue($elm[0], model, ctx) === val);
        } else if ($elm.attr('type') === 'checkbox') {
          $elm.prop('checked', Silica.getValue($elm[0], model, ctx));
        } else if ($elm[0].nodeName === 'OPTION') {
          $elm.prop('value', Silica.getValue($elm[0], model, ctx));
        }
        change = function() {
          var obj, _ref, _ref1, _ref2;
          val = $elm.val();
          if ($elm.attr('type') === 'radio') {
            if (val[0].match(/[0-9]/)) {
              val = parseInt(val);
            }
          } else if ($elm.attr('type') === 'checkbox') {
            val = $elm.prop('checked');
          }
          if (Silica.isInApply) {
            obj = (_ref = $elm[0]._rt_ctx) != null ? _ref : ctx;
            Silica.setPropByString(obj, model, val);
          } else if ((_ref = $elm.data('trap')) != null) {
            obj = (_ref1 = $elm[0]._rt_ctx) != null ? _ref1 : ctx;
            let scope;
            if (_ref.toLowerCase() === "true")
            {
              scope = $elm;
            }
            else
            {
              scope = $(document);
              _ref1 = $elm;
              while ((_ref1 = _ref1.parent()) && _ref1.length)
              {
                if (_ref1.hasClass(_ref))
                {
                  scope = _ref1;
                  break;
                }
              }
            }
            Silica.apply(function() {
              return Silica.setPropByString(obj, model, val);
            }, scope);
          } else {
            obj = (_ref2 = $elm[0]._rt_ctx) != null ? _ref2 : ctx;
            Silica.apply(function() {
              return Silica.setPropByString(obj, model, val);
            });
          }
        };
        $elm[0].onchange = change;
        $elm[0].onkeyup = change;
        $elm[0].onsearch = change;
        if ($elm.attr('x-webkit-speech')) {
          $elm[0].onwebkitspeechchange = change;
        }
      });
    },
    submit() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.query(raw, '[data-submit]');
      var node;
      var handler = function(evt)
      {
        Silica._call(this, evt, 'submit');
        return false;
      };
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node.onsubmit = handler;
        node._rt_live = true;
      }
    },
    repeat(context = null) {
      var elements = (this instanceof jQuery ? this[0] : this).querySelectorAll('[data-repeat]');
      let element;
      var $elm, child, children, ctx, expr, html, list, model, obj, repeat, template, raw, _ref;
      let fragment;
      for (var i = elements.length - 1; i >= 0; i--)
      {
        raw = elements[i];
        repeat = raw.dataset.repeat.split(/\s+in\s+/);
        list = repeat[1];
        model = repeat[0];
        ctx = Silica.getContext(raw);

        //Check if we are calling a function with a param
        if (typeof (_ref = list.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
        {
          let funcName = _ref[1];
          let param = _ref[2];
          param = Silica.getValue(raw.parentNode, param);

          list = Silica.getValue(raw,  _ref[1], null, param);
        }
        else
        {
          list = Silica.getPropByString(ctx, list);
        }

        listHash = SparkMD5.hash(JSON.stringify(list, function(key, value){
          if (key.constructor == String && (key == '__elm' || key == '$ctrl'))
          {
            return undefined;
          }
          return value;
        }));
        raw._rt_ctrl = ctx;
        raw._rt_repeat_list = listHash;

        // Get the template
        template = Silica._repeat_templates[raw.dataset._rt_repeat_template];
        // Compile it
        context = {};
        context.$ctrl = ctx;
        template = Silica.compile($(template), false, context)[0];
        // Store the compiled template
        Silica._repeat_templates[raw.dataset._rt_repeat_template] = template;

        raw.innerHTML = "";

        if (list)
        {
          fragment = document.createDocumentFragment();
          let _i, _len, context, node;
          for (_i = 0, _len = list.length; _i < _len; _i++)
          {
            obj = list[_i];
            context = {};
            context[model] = obj;
            context.$ctrl = ctx;
            node = template.cloneNode(true);
            node._rt_ctx = context;
            Silica.compilers.repeat.call(node);
            Silica.compilers.click.call(node);
            Silica.compilers.dblclick.call(node);
            Silica.compilers.blur.call(node);
            Silica.compilers.model.call(node);
            Silica.compilers.show.call(node);
            Silica.compilers.disabled.call(node);
            Silica.compilers.href.call(node);
            obj.__elm = node;
            fragment.appendChild(node);
          }
          raw.appendChild(fragment);
        }

        if (ctx.renderedRepeat) {
          ctx.renderedRepeat(raw);
        } else if (ctx.$ctrl && ctx.$ctrl.renderedRepeat) {
          ctx.$ctrl.renderedRepeat(raw);
        }
      }
    },

    src() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var nodes = Silica.queryOfType(raw, 'img', '[data-src]');
      var node;
      for (let i = nodes.length - 1; i >= 0; --i)
      {
        node = nodes[i];
        node.src = Silica.getValue(node, node.dataset.src);
      }
    }
  },
  watchers: {
    _updateIf() {
      var comment, compiled, element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
      _ref = Silica._ifs;
      for (k in _ref) {
        elements = _ref[k];
        if (Silica._ifs.hasOwnProperty(k)) {
          raw = k;
          negate = k[0] === '!';
          if (negate) {
            k = k.substr(1);
          }
          for (i = _i = 0, _len = elements.length; _i < _len; i = ++_i) {
            element = elements[i];
            isVisible = Silica._show($(element), k, negate);
            if (isVisible) {
              if (element.nodeType === 8) {
                compiled = Silica.compile($(element.nodeValue), false);
                $(element).replaceWith(compiled);
                Silica._ifs[raw][i] = compiled;
              }
            } else {
              if (element.nodeType !== 8) {
                $('*[data-show]', element).each(function() {
                  var $e, list, prop, _ref1;
                  $e = $(this);
                  prop = $e.data('show');
                  list = Silica._shws[prop];
                  return Silica._shws[prop] = (_ref1 = list != null ? list.filter(function(obj) {
                    return !$(obj).is($e);
                  }) : void 0) != null ? _ref1 : [];
                });
                $('*[data-controller]', element).each(function() {
                  var $e, ctrl, list, _ref1, _results;
                  $e = $(this);
                  ctrl = this._rt_ctrl;
                  _results = [];
                  for (k in ctrl != null ? ctrl.watchers : void 0) {
                    list = Silica._watch[k];
                    _results.push(Silica._watch[k] = (_ref1 = list != null ? list.filter(function(obj) {
                      return obj[0] !== ctrl;
                    }) : void 0) != null ? _ref1 : []);
                  }
                  return _results;
                });
                comment = document.createComment(($(element)[0]).outerHTML);
                Silica._ifs[raw][i] = comment;
                $(element).replaceWith(comment);
              }
            }
          }
        }
      }
    },

    updateRepeat() {
      var $elm, changed, child, container, context, ctx, expr, html, list, model, newList, newListHash, obj, oldList, repeat, rt_model, template, _i, _len, _ref;
      var elements = (this instanceof jQuery ? this[0] : this).querySelectorAll('[data-repeat]');
      let raw, cache_display;
      let decache = function(node, skip) {
        if (!skip) {
          delete node._rt_ctx;
          delete node._rt_ctrl;
        }
        let children = node.children;
        for (let i = children.length - 1; i >= 0; --i)
        {
          decache(children[i]);
        }
      };
      for (let i = elements.length - 1; i >= 0; --i)
      {
        raw = elements[i];
        repeat = raw.dataset.repeat.split(/\s+in\s+/);
        list = repeat[1];
        model = repeat[0];
        ctx = Silica.getContext(raw);

        //Check if we are calling a function with a param
        if (typeof (_ref = list.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] !== 'undefined')
        {
          let funcName = _ref[1];
          let param = _ref[2];
          param = Silica.getValue(raw.parentNode, param);

          newList = Silica.getValue(raw,  _ref[1], null, param);
        }
        else
        {
          newList = Silica.getValue(raw, list);
        }

        newListHash = SparkMD5.hash(JSON.stringify(newList, function(key, value){
          //Keys starting with an underscore (char code 95) will be ignored
          if (key.constructor == String && (key == '__elm' || key == '$ctrl' || key.charCodeAt(0) === 95))
          {
            return undefined;
          }
          return value;
        }));
        oldList = raw._rt_repeat_list;
        changed = oldList && newList ? oldList !== newListHash : true;

        if (!changed) {
          continue;
        }

        if (newList) {
          raw._rt_repeat_list = newListHash;
        } else {
          raw._rt_repeat_list = null;
        }

        if (!newList) {
          raw.innerHTML = "";
          continue;
        }

        // Get the template
        template = Silica._repeat_templates[raw.dataset._rt_repeat_template];

        let count_diff = raw.childElementCount - newList.length;
        let existing = raw.childNodes;
        let node;

        while (count_diff > 0)
        {
          Silica.removeFromDOM(existing[count_diff-1]);
          --count_diff;
        }

        let fragment = document.createDocumentFragment();

        while (count_diff < 0)
        {
          context = {};
          context[model] = newList[0 - count_diff - 1];
          context.$ctrl = ctx;
          child = template.cloneNode(true);
          child._rt_ctx = context;
          Silica.compilers.repeat.call(child);
          Silica.compilers.click.call(child);
          Silica.compilers.dblclick.call(child);
          Silica.compilers.blur.call(child);
          Silica.compilers.model.call(child);
          Silica.compilers.show.call(child);
          Silica.compilers.disabled.call(child);
          Silica.compilers.href.call(child);
          fragment.appendChild(child);
          ++count_diff;
        }
        raw.appendChild(fragment);

        for (_i = 0, _len = newList.length; _i < _len; _i++)
        {
          obj = newList[_i];
          node = existing[_i];
          decache(node, true);
          node._rt_ctx[model] = obj;
          Silica.flush(node, false, {});
        }

        if (ctx.renderedRepeat) {
          ctx.renderedRepeat(raw);
        } else if (ctx.$ctrl && ctx.$ctrl.renderedRepeat) {
          ctx.$ctrl.renderedRepeat(raw);
        }
      }
    },

    updateShow() {
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
    },
    updateClass() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var elements = raw.querySelectorAll('[data-class]');
      var element;
      var klass;
      for (let i = elements.length - 1; i >= 0; --i)
      {
        element = elements[i];
        element.className = element.dataset._rt_hard_klass;
        klass = Silica.getValue(element, element.dataset.class);
        if (klass)
        {
          element.classList.add(klass);
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

    },

    updateDisabled()
    {
      Silica.compilers.disabled.call(this);
    },

    updateHref()
    {
      Silica.compilers.href.call(this);
    },

    updateStyle()
    {
      Silica.compilers.style.call(this);
    },

    updateSrc() {
      return $('img[data-src]', $(this)).each(function() {
        var $elm, newSrc;
        $elm = $(this);
        newSrc = Silica.getValue($elm[0], $elm.data('src'));
        if ($elm.attr('src') !== newSrc) {
          return $elm.attr('src', newSrc);
        }
      });
    },

    updateModel() {
      var raw = (this instanceof jQuery ? this[0] : this);
      var elements = raw.querySelectorAll('[data-model]');
      var element, i, type;
      for (i = elements.length - 1; i >= 0; --i)
      {
        element = elements[i];
        type = element.type;
        if (element !== document.activeElement && (type === 'text' || type === 'file' || type === 'number' ||
            type === 'email' || type === 'password' || type === 'time'))
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
    },
  }
};

Silica.Controllers = Controllers;
window.Silica = Silica;
