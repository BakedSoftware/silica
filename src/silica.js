goog.module('silica')
// Import the PubSub Module
var PubSub = goog.require('silica.pubsub')
// Import the controllers
var Controllers = goog.require('controllers')
// Import the compilers
var Compilers = goog.require('compilers')
// Import the watchers
var Watchers = goog.require('watchers')
// Import browser hax
var Hax = goog.require('hax')

const ValueObserver = goog.require('watchers.observer')

// Install polyfills
Hax.init()

window['Silica'] = {
  context: window,
  contextName: '',
  directives: {},
  components: {},
  filters: {},
  'router': null,
  _ifs: {}, // Stores the registered ifs
  _shws: {}, // Stores the registered shows
  _watch: {}, // Stores the registered watchers
  _repeat_templates: {}, // Stores a map between repeats and their templates
  _template_id: 1,
  _isReady: false, // Keeps track if app is ready
  _appRoot: null,
  _defers: [],
  _includeCache: {},
  _clickOutElements: new Set(),
  _queue: [],
  usePushState: true,
  observer: new ValueObserver(),
  ignoredAttributes: new Set(['filter', 'class', 'show', 'if', 'model', 'include',
    'controller', 'parameter', 'repeat', 'trap', 'repeatNotNested',
    'onClickOutside', 'onScrollFinished',
    'siO2IncludedUrl', 'src', 'siO2HardClass', 'noStopPropagation', 'noPreventDefault',
    'siO2TemplateId', 'siO2Directive'
  ]),
  version: '0.60.0-beta8',

  // Set the root context
  setContext (contextName) {
    this.contextName = contextName
    this.context = window[contextName]
  },

  ignore (keys) {
    Silica.ignoredAttributes = new Set([...Silica.ignoredAttributes].concat(keys))
  },

  setRouter (router) {
    Silica['router'] = router
    window.onhashchange = () => {
      this.apply(() => Silica['router']['route'](window.location.hash))
    }
    if (Silica['usePushState']) {
      window.onpopstate = () => {
        this.apply(() => Silica['router']['route'](Silica['usePushState'] ? window.location.pathname : window.location.hash))
      }
    }
  },

  goTo (pathname) {
    var route
    if (Silica['usePushState']) {
      history.pushState(null, '', pathname)
      route = pathname
    } else {
      window.window.location.hash = '#' + pathname
      route = window.window.location.hash
    }
    if (Silica['router']) {
      Silica.apply(function () {
        Silica['router']['route'](route)
      })
    }
  },

  // Link all Silica directives within an element
  compile (element, flush = true, context = null, onlySafe = false, storeWatchers = true) {
    if (Silica._appRoot === null) {
      Silica._appRoot = element
    }

    // Check if it is a comment
    if (element.nodeType === 8) {
      return
    }

    if (element === document) {
      element = document.documentElement
      context = context || {}
    } else {
      context = context || Silica.getContext(element)
    }
    Silica.cacheTemplates(element)
    for (let key in Silica.compilers) {
      if (!(onlySafe & key[0] === '_')) {
        if (key === 'Controller') {
          Silica.compilers[key].apply(element, [context, false, storeWatchers])
        } else {
          Silica.compilers[key].apply(element, [context])
        }
      }
    }
    if (flush) {
      Silica.flush(element, true)
    }

    Silica._capture_links(element)

    if (element === Silica._appRoot) {
      Silica._isReady = true
    }
    return element
  },
  cacheTemplates (element) {
    var nodes = element.querySelectorAll('[data-repeat]')
    var node
    var context
    for (let i = nodes.length - 1; i >= 0; --i) {
      node = nodes[i]
      if (!node.dataset['siO2TemplateId']) {
        let nextTemplateId = Silica._template_id++
        if (node.children.length === 1) {
          Silica._repeat_templates[nextTemplateId] = node.removeChild(node.firstElementChild)
        } else {
          console.warn('Repeat has multiple children, wrapping with div', node)
          let wrap = document.createElement('div')
          wrap.innerHTML = node.innerHTML
          Silica._repeat_templates[nextTemplateId] = wrap
        }
        node.dataset['siO2TemplateId'] = nextTemplateId
        context = {}
        context.$ctrl = Silica.getContext(node)
        Silica._repeat_templates[nextTemplateId] = Silica.compile(Silica._repeat_templates[nextTemplateId], false, context, true, false)
        node.innerHTML = ''
      }
    }
  },

  debounce (func, wait, immediate) {
    var timeout
    return function () {
      var context = this, args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  },

  /**
   * Defer takes a function which will be executed once after the next apply
   * @param {function()} func
   */
  defer (func) {
    Silica._defers.push(func)
  },

  processQueue () {
    Silica.apply(function () {
      for (let item of Silica._queue) {
        item[0]()
      }
      // TODO figure out what to do with specified scope: item[1]
      // Silica.apply(function () {
      // }, item[1])
      Silica._queue = []
    })
  },

  enqueue (func, scope) {
    Silica._queue.push([func, scope])
    Silica.processQueue()
  },

  updateDOM (element, onlySafe) {
    let watchers = Silica.watchers
    let func
    for (let k in watchers) {
      if ((onlySafe && k[0] === '_')) {
        continue
      }
      func = watchers[k]
      func.apply(element || document)
    }
    Silica.observer.applyChanges(element)
  },

  flush (element = document.documentElement, onlySafe = false, changed = null, skipSchedule = false) {
    if (Silica.isInFlush && !skipSchedule) {
      if (Silica._scheduledFlush) {
        return
      } else {
        Silica._scheduledFlush = true
      }
    }
    if (element === document) {
      element = document.documentElement
    }
    Silica.isInFlush = !skipSchedule
    if (changed === null && Silica._isReady) {
      let funcs
      let func
      for (let key in Silica._watch) {
        funcs = Silica._watch[key]
        for (let i = funcs.length - 1; i >= 0; --i) {
          func = funcs[i]
          func[1].apply(func[0], [func[2], func[3]])
        }
      }
    } else {
      let obj, k, funcs, func
      for (k in changed) {
        funcs = changed[k]
        if (funcs !== true) {
          for (var i = funcs.length - 1; i >= 0; --i) {
            func = funcs[i]
            func[1].apply(func[0], [func[2], func[3]])
          }
        } else {
          funcs = Silica._watch[k]
          for (var i = funcs.length - 1; i >= 0; --i) {
            func = funcs[i]
            func[1].apply(func[0], [func[2], func[3]])
          }
        }
      }
    }

    Silica.updateDOM(element, onlySafe)

    Silica.isInFlush = skipSchedule
    if (Silica._scheduledFlush === true && !skipSchedule) {
      Silica._scheduledFlush = false
      window.setTimeout(function () { Silica.flush(document, false, {}) }, 20)
    }
    return Silica
  },

  apply (func, element = document) {
    if (Silica.isInApply) {
      func.call()
      return Silica
    }

    window.requestAnimationFrame(() => {
      var changed, changes, finalChanges, k, oldVal, v, val, _j, _len, _len1
      // Mark we are about to execute the function
      // If the function to execute triggers another apply, the flag is checked
      // and the additional applies can be executed with out the need to diff the
      // properties since no flush has executed.
      Silica.isInApply = true
      // Execute the function
      try {
        func.call()
      } catch (err) {
        // Clear mark
        Silica.isInApply = false
        console.error(err)
        return Silica
      }

      // Compute the differences
      changes = {}
      for (let k in Silica._watch) {
        let watchers = Silica._watch[k]
        changes[k] = []
        // Check if we are looking at Global or object property key
        if (k.charCodeAt(0) >= 97) {
          for (_j = 0, _len1 = watchers.length; _j < _len1; _j++) {
            let watcher = watchers[_j]
            if (k.match(/\.\*$/)) {
              changes[k].push(watcher)
            } else {
              watcher[3] = oldVal = watcher[2]
              watcher[2] = val = Silica.getPropByString(watcher[0], k)
              changed = oldVal !== val
              if (!changed && Array.isArray(val) && Array.isArray(oldVal)) {
                changed = oldVal && val ? oldVal.length !== val.length : true
                if (!changed) {
                  changed = oldVal.some(function (e, idx) {
                    return val[idx] !== e
                  })
                }
              }
              if (changed) {
                changes[k].push(watcher)
              }
            }
          }
        } else {
          let watcher = watchers[0]
          watcher[3] = oldVal = watcher[2]
          watcher[2] = val = Silica.getPropByString(window, k)
          changed = val !== oldVal
          if (!changed && Array.isArray(val) && Array.isArray(oldVal)) {
            changed = oldVal && val ? oldVal.length !== val.length : true
            if (!changed) {
              changed = oldVal.some(function (e, idx) {
                return val[idx] !== e
              })
            }
          }
          if (changed) {
            changes[k].push(watcher)
            for (_j = 1, _len = watchers.length; _j < _len; _j++) {
              let additional = watchers[_j]
              additional[2] = watcher[2]
              additional[3] = watcher[3]
              changes[k].push(additional)
            }
          }
        }
      }
      finalChanges = {}
      for (k in changes) {
        v = changes[k]
        if (Array.isArray(v) && v.length) {
          finalChanges[k] = v
        }
      }
      Silica.flush(element, false, finalChanges)
      Silica.isInApply = false
      let defers = Silica._defers
      Silica._defers = []

      if (defers.length) {
        Silica.apply(() => {
          for (let i = defers.length - 1; i >= 0; i--) {
            defers[i].call()
          }
        })
      }
    })
    return Silica
  },

  // Walk through an object to get the specified property.
  // Nested properties are specified using '.' syntax
  // Function properties will be called and the result will be walked as well
  getPropByString (obj, propString, params) {
    if (!propString || propString.length === 0) {
      return obj
    }

    if (obj.__property_map === undefined) {
      obj.__property_map = {}
    }

    let negate = propString[0] === '!'
    if (negate) {
      propString = propString.substr(1)
    }

    let /** @type {?Array<string>} */ propertyPath
    if (obj.__property_map.hasOwnProperty(propString)) {
      propertyPath = obj.__property_map[propString]
    } else {
      propertyPath = propString.split('.')
      obj.__property_map[propString] = propertyPath
    }
    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyPath[0])
    if (!(descriptor && descriptor.get)) {
      while (typeof obj[propertyPath[0]] === 'undefined') {
        if (obj.$ctrl) {
          obj = obj.$ctrl
        } else {
          return negate ? true : null
        }
      }
    }

    let context
    let pathLength = propertyPath.length
    for (let i = 0; i < pathLength; ++i) {
      context = obj
      obj = obj[propertyPath[i]]
      if (typeof obj === 'function') {
        obj = obj.apply(context, params)
      }
      if (obj === null || obj === void 0) {
        return negate ? true : null
      }
    }
    return negate ? !obj : obj
  },

  getValue (raw, propString, context = null, params = []) {
    var ctx
    let idx = propString[0] === '!' ? 1 : 0
    ctx = context || (propString.charCodeAt(idx) <= 90 ? window : Silica.getContext(raw))
    let param
    if (raw.nodeType !== 8) {
      param = raw.dataset['parameter']
    } else {
      let temp = document.createElement('div')
      temp.innerHTML = raw.data
      param = (temp.firstElementChild || temp).dataset['parameter']
    }
    if (param) {
      params.push(param)
    }
    // TODO: This breaks when in the following case:
    // div.data-controller=childcontroller > div.data-class=rootController >
    // div.data-repeat=childContailer.model => the model is looked up on the
    // rootController as that is the next found context
    // raw._rt_ctx = ctx;
    return Silica.getPropByString(ctx, propString, params)
  },

  isChildOf (child, parent) {
    while (child) {
      if (child.parentElement === parent) {
        return true
      }
      child = child.parentElement
    }
    return false
  },

  isInDOM (element) {
    while (element.parentElement != null && !element._deleted) {
      if (element.parentElement == document.documentElement) {
        return true
      } else {
        element = element.parentElement
      }
    }
    return false
  },

  setPropByString (obj, propString, value) {
    var key, paths, prop, _i, _len, _ref, _ref1, ctx
    if (!propString) {
      return obj
    }

    paths = propString.split('.')
    key = paths[paths.length - 1]

    if (propString.charCodeAt(0) <= 90) {
      ctx = window
    } else {
      if (!obj.hasOwnProperty(paths[0]) && typeof (obj[paths[0]]) !== 'function' && obj.$ctrl) {
        ctx = obj.$ctrl
      } else {
        ctx = obj
      }
    }

    for (_i = 0, _len = paths.length; _i < _len; _i++) {
      prop = paths[_i]
      if (prop !== key) {
        if (typeof ctx[prop] === 'function') {
          ctx = ctx[prop].call(ctx)
        } else {
          ctx = ctx[prop]
        }
      }
    }

    let old_value = ctx[prop]
    ctx[prop] = value

    let hook = ctx[prop + '_changed']
    if (hook) {
      hook.call(ctx, old_value, value)
    }
  },

  addFilter (key, func) {
    Silica.filters[key] = func
  },
  addDirective (key, obj) {
    Silica.directives[key] = obj
  },
  /**
   * @param {Element} raw
   */
  getContext (raw) {
    var ctrl, k, v, _ref, ctx, model, needsModel
    /** @type {string} */
    var constructorName
    /** @type {function(new:Object, !Element, ?Object=)} */
    var constructor
    while (true) {
      if (raw._rt_ctx) {
        return raw._rt_ctx
      } else if (raw._rt_ctrl) {
        return raw._rt_ctrl
      } else if (raw.nodeType !== 9 && raw.nodeType !== 3 && raw.nodeType !== 8 && raw.dataset['controller']) {
        constructorName = raw.dataset['controller']
        if (typeof (_ref = constructorName.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] !== 'undefined') {
          needsModel = true
          model = Silica.getValue(raw.parentNode, _ref[2])
        }
        constructorName = _ref[1]
        constructor = /** @type {function(new:Object, !Element, ?Object=)} */ (eval(constructorName))
        if (!constructor) {
          return console.error('Unknown Controller: ' + raw.dataset['controller'])
        }
        if (typeof model !== 'undefined') {
          ctrl = new constructor(raw, model)
        } else {
          ctrl = new constructor(raw)
        }

        if (!needsModel ^ (model != null)) {
          // Remove old wathcers if rebuilding a controller for a node
          let watchers = constructor['watchers']
          if (raw._rt_ctrl && watchers && Object.keys(watchers).length > 0) {
            for (k in watchers) {
              v = watchers[k]
              let stored = Silica._watch[k]
              if (!stored) {
                continue
              }
              for (let pairIdx = stored.length - 1; pairIdx >= 0; --pairIdx) {
                let pair = stored[pairIdx]
                if (raw._rt_ctrl == pair[0]) {
                  stored.splice(pairIdx, 1)
                  break
                }
              }
            }
          }

          raw._rt_live = true
          raw._rt_ctrl = ctrl

          _ref = constructor['watchers']
          for (k in _ref) {
            v = _ref[k]
            if (!Silica._watch[k]) {
              Silica._watch[k] = []
            }
            Silica._watch[k].push([ctrl, v, null])
          }
          if (typeof ctrl['onLoad'] === 'function') {
            ctrl['onLoad']()
          }
        }
        return ctrl
      } else if (raw.parentElement) {
        raw = raw.parentElement
      } else {
        return Silica.context
      }
    }
  },
  _handle_href (evt) {
    var path = this.getAttribute('href')
    const protocolCheckRegex = /[a-zA-Z]+\:+/g
    if (protocolCheckRegex.exec(path) != null || path === '#' || path === '') {
      return
    }
    let defaultPrevented = false
    if (!this.dataset['noPreventDefault']) {
      defaultPrevented = true
      evt.preventDefault()
    }
    if (!this.dataset['noStopPropagation']) {
      evt.stopPropagation()
    }
    PubSub.Pub('SiO2-HREF', evt)
    Silica.goTo(path)
    return !defaultPrevented
  },
  _capture_links (element) {
    // Capture lnks for pushState
    let nodes = Silica.queryOfType(element, 'a', '[href]', '[data-href]')
    let node
    for (let i = nodes.length - 1; i >= 0; --i) {
      node = nodes[i]
      if (node.hostname === window.location.hostname && node.target !== '_blank') {
        node.removeEventListener('click', Silica._handle_href, true)
        node.addEventListener('click', Silica._handle_href, true)
      }
    }
  },
  _show (element, expr, negate) {
    let isVisible = Silica.getValue(element, expr, null, [element])
    if (negate) {
      isVisible = !isVisible
    }
    return isVisible
  },
  _call (element, evnt, act) {
    if (!Silica.isInDOM(element)) {
      return
    }
    if (element !== evnt.target && act === 'click' && (evnt.target.nodeName === 'SELECT' || evnt.target.nodeName === 'INPUT')) {
      return
    }
    if (!element.dataset['noPreventDefault']) {
      evnt.preventDefault()
    }
    if (!element.dataset['noStopPropagation']) {
      evnt.stopPropagation()
    }
    var scope = null, trap_to, trapped_scope
    if ((trap_to = element.dataset['trap']) != null) {
      if (trap_to.toLowerCase() === 'true') {
        scope = element
      } else {
        trapped_scope = element
        while ((trapped_scope = trapped_scope.parentElement)) {
          if (trapped_scope.classList.contains(trap_to)) {
            scope = trapped_scope
            break
          }
        }
      }
    }
    //Silica.enqueue(function () {
    Silica.apply(function () {
      var action, ctx, objects, parameter, actionName, models = []
      ctx = Silica.getContext(element)
      action = element.dataset[act]
      var idx = action.indexOf('(')
      if (idx > 0) {
        actionName = action.substr(0, idx)
        models = action.substr(actionName.length).match(/((?:\w|\.)+)(?:\(?([\w\.]+)\))?/g)
        if (models) {
          for (let i = 0; i < models.length; i++) {
            models[i] = Silica.getPropByString(ctx, models[i])
          }
        } else {
          models = []
        }
      } else {
        actionName = action
      }
      while (!ctx[actionName] && ctx.$ctrl) {
        ctx = ctx.$ctrl
      }
      if (element.dataset['parameter']) {
        parameter = element.dataset['parameter']
      }

      if (typeof ctx[actionName] !== 'undefined') {
        return ctx[actionName].apply(ctx, [element, ...models, parameter, evnt])
      } else if (Silica.context[actionName] != null) {
        return Silica.context[actionName].apply(Silica.ctx, [element, ...models, parameter, evnt])
      } else {
        return console.error("Unknown action '" + actionName + "' for " + element.outerHTML + ' in ' + ctx.constructor.name)
      }
    }, scope)
  },
  getFilteredValue (raw, propString, elideFilterIf, paramsKeys = null) {
    var filter, filterKey, filterOptions, value
    paramsKeys = paramsKeys || propString.match('\\((.*)\\)')

    let params = []
    if (paramsKeys !== null) {
      paramsKeys.shift()
      for (let j = 0, length = paramsKeys.length; j < length; j++) {
        params.push(Silica.getValue(raw, paramsKeys[j]))
      }
      propString = propString.substr(0, propString.indexOf('('))
    }

    value = Silica.getValue(raw, propString, null, params)
    if (elideFilterIf && value === elideFilterIf) {
      return null
    }

    filter = raw.attributes['data-filter']
    filter = filter ? filter.value.split(/:(.+)/) : null
    filterKey = (filter ? filter[0] : null)
    if (filterKey && !Silica.filters[filterKey]) {
      throw new Error("Unknown filter: '" + filterKey + "' for element: " + raw.outerHTML)
    }
    filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null
    filter = filterKey ? Silica.filters[filterKey] : null
    if (filter && value != null) {
      return [filter(value, filterOptions), value, paramsKeys]
    } else {
      return [value, value, paramsKeys]
    }
  },
  findComments (raw) {
    var arr = []
    for (var i = raw.childNodes.length - 1; i >= 0; --i) {
      var node = raw.childNodes[i]
      if (node.nodeType === 8) {
        arr.push(node)
      } else {
        arr.push.apply(arr, Silica.findComments(node))
      }
    }
    return arr
  },
  isInRepeat (root, node) {
    while (node.parentElement && node.parentElement !== root) {
      if (node.parentElement.hasAttribute('data-repeat')) {
        return true
      } else {
        node = node.parentElement
      }
    }
    return false
  },
  isDescendent (ancestor, child) {
    while ((child = child.parentNode) && child !== ancestor) {}
    return !!child
  },
  query (raw, ...attributes) {
    if (raw == document) {
      raw = document.documentElement
    }
    var isSingle = attributes.length == 1
    var nodes = raw.querySelectorAll(attributes.join(','))
    var filtered = []
    for (let i = nodes.length - 1; i >= 0; --i) {
      let node = nodes.item(i)
      // TODO: This prevents multiple data-* for the same element, need to
      // return all elements and have the complex compilers not reattach to the
      // element (data-controller, data-repeat)
      /*
      if (!node._rt_live)
      {
      */
      if (!Silica.isInRepeat(raw, node)) {
        filtered.push(node)
      }
      /*
      }
      */
    }
    let attribute
    for (let i = attributes.length - 1; i >= 0; --i) {
      attribute = attributes[i]
      if (raw.hasAttribute(attribute.substring(1, attribute.length - 1))) {
        filtered.push(raw)
        break
      }
    }
    return filtered
  },

  queryWithComments (root, ...attributes) {
    var filtered = Silica.query(root, ...attributes)
    var comments = Silica.findComments(root)

    var temp = document.createElement('div')
    for (var i = comments.length - 1; i >= 0; --i) {
      var node = comments[i]
      // Check node is a commented out tag, not just text
      if (node.nodeValue.charAt(0) === '<') {
        // Convert the comment back to live version to check attributes
        temp.innerHTML = node.nodeValue
        for (var j = attributes.length - 1, attr = attributes[j]; j >= 0; attr = attributes[--j]) {
          if (temp.firstElementChild.hasAttribute(attr)) {
            filtered.push(node)
            break
          }
        }
      }
    }

    return filtered
  },

  querySorted (root, ...attributes) {
    var filtered = Silica.query(root, ...attributes)

    for (var i = 0, list_length = filtered.length; i < list_length; i++) {
      var node = filtered[i]
      for (var j = i + 1; j < list_length; j++) {
        var other = filtered[j]
        if (other.contains(node)) {
          filtered[i] = other
          filtered[j] = node
        }
      }
    }

    return filtered
  },

  queryOfType (raw, type, ...attributes) {
    if (raw == document) {
      raw = document.documentElement
    }
    var isSingle = attributes.length == 1
    var nodes = raw.getElementsByTagName(type)
    var filtered = []
    if (attributes.length > 0) {
      for (let i = nodes.length - 1; i >= 0; --i) {
        let node = nodes.item(i)
        for (let j = attributes.length - 1; j >= 0; --j) {
          if (node.hasAttribute(attributes[j].replace(/\[|\]/g, ''))) {
            filtered.push(node)
            break
          }
        }
      }
      if (raw.nodeName === type.toUpperCase()) {
        let attribute
        for (let i = attributes.length - 1; i >= 0; --i) {
          attribute = attributes[i]
          if (raw.hasAttribute(attribute.substring(1, attribute.length - 1))) {
            filtered.push(raw)
            break
          }
        }
      }
    } else {
      filtered = nodes
      if (raw.tagName === type) {
        filtered.push(raw)
      }
    }
    return filtered
  },
  removeFromDOM (e) {
    var removeWatchers = function (nodes) {
      for (let i = nodes.length - 1; i >= 0; --i) {
        let node = nodes[i]
        if (node._rt_ctrl) {
          let ctrl = node._rt_ctrl
          for (let k in ctrl.constructor['watchers']) {
            let list = Silica._watch[k]
            Silica._watch[k] = (list != null ? list.filter(function (obj) {
              return obj[0] !== ctrl
            }) : [])
            if (Silica._watch[k].length === 0) {
              delete Silica._watch[k]
            }
          }
          if (typeof ctrl.onDestroy === 'function') {
            ctrl.onDestroy()
          }
        }
      }
    }

    for (var i = e.childNodes.length - 1; i >= 0; --i) {
      var child = e.childNodes[i]
      if (typeof child.onremove === 'function') {
        child.onremove()
      }
    }

    if (e.nodeType !== 3 && e.nodeType !== 8) {
      removeWatchers(e.querySelectorAll('[data-controller]'))
      removeWatchers(e.querySelectorAll('[data-sio2-directive]'))
      removeWatchers([e])
    }

    e._deleted = true
    Silica.observer.removeSubTree(e)
    e.remove()
  },

  compilers: Compilers,
  watchers: Watchers
}

let pq = Silica.processQueue
Silica.processQueue = Silica.debounce(pq, 16)

// Tell closure compiler which symbols are exported
window['Silica']['Controllers'] = Controllers
window['Silica']['addDirective'] = Silica.addDirective
window['Silica']['addFilter'] = Silica.addFilter
window['Silica']['apply'] = Silica.apply
window['Silica']['compile'] = Silica.compile
window['Silica']['debounce'] = Silica.debounce
window['Silica']['defer'] = Silica.defer
window['Silica']['flush'] = Silica.flush
window['Silica']['getPropByString'] = Silica.getPropByString
window['Silica']['getValue'] = Silica.getValue
window['Silica']['getFilteredValue'] = Silica.getFilteredValue
window['Silica']['goTo'] = Silica.goTo
window['Silica']['query'] = Silica.query
window['Silica']['queryOfType'] = Silica.queryOfType
window['Silica']['querySorted'] = Silica.querySorted
window['Silica']['queryWithComments'] = Silica.queryWithComments
window['Silica']['router'] = Silica.router
window['Silica']['setContext'] = Silica.setContext
window['Silica']['setPropByString'] = Silica.setPropByString
window['Silica']['setRouter'] = Silica.setRouter
window['Silica']['usePushState'] = Silica.usePushState
window['Silica']['enqueue'] = Silica.enqueue
window['Silica']['processQueue'] = Silica.processQueue
window['Silica']['pub'] = PubSub.Pub
window['Silica']['sub'] = PubSub.Sub
window['Silica']['unsub'] = PubSub.Unsub
window['Silica']['isInDOM'] = Silica.isInDOM
window['Silica']['ignore'] = Silica.ignore
