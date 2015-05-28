Runtime =
  context: window
  contextName: ''
  _ifs: {}
  _shws: {}
  filters: {}
  _watch: {}
  _repeat: {}
  directives: {}
  router: null

  # Set the root context
  setContext: (contextName) ->
    Runtime.context = window[contextName]
    Runtime.contextName = contextName

  setRouter: (router) ->
    Runtime.router = router
    window.onhashchange = ->
      Runtime.apply ->
        Runtime.router.route(location.hash)

  # Interpolate and link all Runtime directives within an element
  compile: (element, flush = true, context = null) ->
    Runtime.cacheTemplates element
    Runtime.interpolate element
    for k, func of Runtime.compilers
      if k[0] != '_'
        func.apply element, [context]

    Runtime.flush element, true if flush

    element

  cacheTemplates: (element) ->
    $("*[data-repeat]", element).each ->
      $elm = $(this)
      unless $elm.data('template')
        $elm.data('template', $elm.html())
        $elm.html("")

  # Force Runtime to update the element and subelements
  flush: (element = document, onlySafe = false, changed = {}) ->
    if Runtime.isInFlush
      if Runtime._scheduledFlush
        return
      else
        Runtime._scheduledFlush = true
    Runtime.isInFlush = true
    unless changed
      for k, funcs of Runtime._watch
        func[1].apply func[0] for func in funcs
        null
    else
      for k, obj of changed
        unless obj == true
          func[1].apply func[0] for func in changed[k]
        else
          func[1].apply func[0] for func in Runtime._watch[k]

    for k, func of Runtime.watchers
      if onlySafe && k[0] == '_'
        continue
      func.apply element

    Runtime.isInFlush = false
    # TODO Figure out how to schedule just one flush if it was needed
    if Runtime._scheduledFlush == true
       window.setTimeout(Runtime.flush, 20)

    Runtime


  # Execute code and ensure updates are called. Similar to calling
  # `Runtime.flush` afterwords but determines which **watchers** need to be
  # called by **flush** instead of applying all of them
  # @param {Function} func Code to execute
  # @param {DOMElement|jQueryRef} [element] Element to scope the flush to
  apply: (func, element = document) ->
    # If an apply is already in progress we can just execute the code
    return func.call() if Runtime.isInApply

    # Keep all the old values
    old_values = {}
    for k, funcs of Runtime._watch
      old_values[k] = []
      if k[0].match /^[^A-Z]/
        for assoc in funcs
          val = Runtime.getPropByString(assoc[0], k)
          val = val.slice(0) if Array.isArray(val)
          old_values[k].push [assoc[0], val]
      else
        val = Runtime.getPropByString(window, k)
        val = val.slice(0) if Array.isArray(val)
        old_values[k] = val

    # Execute the code
    Runtime.isInApply = true
    func.call()
    Runtime.isInApply = false

    # Detemine what has changed
    changes = {}
    for k, funcs of Runtime._watch
      if k[0].match /^[^A-Z]/
        changes[k] = []
        for func in funcs
          if k.match /\.\*$/
            changes[k].push func
          else
            val = Runtime.getPropByString(func[0], k)
            oldVal = args[1] for args in old_values[k] when args[0] == func[0]

            changed = val != oldVal
            if Array.isArray(val) && Array.isArray(oldVal)
              changed = if oldVal && val then oldVal.length != val.length else true
              unless changed
                changed = oldVal.some (e, idx) -> return val[idx] != e

            changes[k].push func if changed
      else
        val = Runtime.getPropByString(window, k)
        oldVal = old_values[k]
        changed = val != oldVal
        if Array.isArray(val) && Array.isArray(oldVal)
          changed = if oldVal && val then oldVal.length != val.length else true
          unless changed
            changed = oldVal.some (e, idx) -> return val[idx] != e
        changes[k] = changed
    finalChanges = {}
    for k, v of changes
      finalChanges[k] = v if (Array.isArray(v) && v.length) || v == true
    # Flush the changes
    Runtime.flush element, false, finalChanges

  getPropByString: (obj, propString) ->
    return obj unless propString
    for prop in propString.split '.'
      if typeof obj[prop] == 'function'
        obj = obj[prop]()
      else
        obj = obj[prop]
      return null if obj == null or obj == undefined
    obj

  getValue: ($elm, propString, context = null) ->
    ctx = context ? if propString.match /^[A-Z]/ then window else Runtime.getContext $elm
    Runtime.getPropByString ctx, propString

  setPropByString: (obj, propString, value) ->
    return obj unless propString
    paths = propString.split '.'
    key = paths[paths.length - 1]
    for prop in paths when prop != key
      obj = obj?[prop]?() ? obj?[prop] ? ''
    obj?[key] = value

  evaluateExpression: (expr, $elm, obj, ref) ->
    return unless expr

    # expr = expr.match(/\{\{(.*?)\}\}/)[1]
    filter = null
    if expr.match('|')
      expr = expr.split('|')
      filter = $.trim expr[1]
      expr = $.trim expr[0]
    ctx = {}
    if obj && ref
      if expr.indexOf(ref) == 0
        ctx[ref] = obj
        ctx.$ctrl = Runtime.getContext($elm)
    else if expr[0].match /^[A-Z]/
      ctx = window
    else
      ctx = Runtime.getContext($elm)

    value = Runtime.getPropByString(ctx, expr)

    if filter
      filter = filter.split(/:(.+)/)
      filterKey = filter?[0] || null
      filterOptions = if filter?.length > 1 then eval(filter[1]) else null
      filter = if filterKey then Runtime.filters[filterKey] else null
      value = if filter then filter(value, filterOptions, ctx) else value

    value


  # Interpolates {{}} expressions in an element
  # If the obj is present it will match all refs to that object.
  # Otherwise it will use the $elm context
  interpolate: ($elm) ->
    $(':containsRegex("/\{\{.*?\}\}/")', $elm).not('script').contents().filter( ->
      this.nodeType==3 && (h = $(this).text()) && h.match(/\{\{.*?\}\}/)
    ).each ->
      $el = $(this)
      return if $el.attr('type') == "text/x-rt-template"
      text = $el.text()
      while expr = text.match(/\{\{(.*?)\}\}/)?[1]
        comps = expr.split '|'
        property = $.trim comps[0]
        fmt = if comps.length == 1
          "<span data-model='#{property}'>{{val}}</span>"
        else
          filter = $.trim(comps[1])
          "<span data-model='#{property}' data-filter='#{filter}'>{{val}}</span>"

        evald = fmt.replace '{{val}}', Runtime.evaluateExpression(expr, $el)
        text = text.replace "{{#{expr}}}", evald
      span = "<span>#{text}</span>"
      node = $(span)
      $el.replaceWith node
      Runtime.compile(node)
      node.children().unwrap()


  addFilter: (key, func) ->
    Runtime.filters[key] = func

  addDirective: (key, obj) ->
    Runtime.directives[key] = obj

  getContext: (element) ->
    $elm = if element.constructor.name == "" then element else $(element)
    if $elm.data('$ctrl')
      $elm.data '$ctrl'
    else if $elm.is($('body'))
      Runtime.context
    else if $elm.data 'controller'
      constructor = eval $elm.data('controller')
      return console.error "Unknown Controller: #{$elm.data('controller')}" unless constructor

      ctrl = new constructor $elm
      $elm.data 'rt-live', true
      $elm.data '$ctrl', ctrl
      for k, v of constructor.watchers
        Runtime._watch[k] = [] unless Runtime._watch[k]
        Runtime._watch[k].push [ctrl, v]
      ctrl.onLoad?()
      ctrl
    else if $elm.parent().length > 0
      Runtime.getContext($elm.parent())
    else
      Runtime.context

  _show: (element, expr, negate) ->
    isVisible = true
    if expr.indexOf(Runtime.contextName) == 0
      isVisible = Runtime.getPropByString Runtime.context, expr.substr(Runtime.contextName.length+1)
    else
      $elm = if element.constructor.name == "" then element else $(element)
      if ctx = $elm.data('$ctx')
        isVisible = Runtime.getPropByString ctx, expr
      else
        ctx = Runtime.getContext $elm
        $elm.data('$ctx', ctx)
        isVisible = Runtime.getPropByString ctx, expr

    isVisible = !isVisible if negate

    return isVisible

  compilers:
    directives: ->
      for k, obj of Runtime.directives
        if Runtime.directives.hasOwnProperty k
          $(k, this).each ->
            $(this).replaceWith obj.template

    if: ->
      $('*[data-if]', this).each ->
        isVisible = false
        $elm = $(this)
        raw = val = $elm.data 'if'
        negate = val[0] == '!'
        if negate
          val = val.substr(1)
        Runtime._ifs[raw] = [] unless Runtime._ifs[raw]
        isVisible = Runtime._show $elm, val, negate
        if isVisible
          Runtime._ifs[raw].push this
        else
          $('*[data-show]', $elm).each ->
            $e = $(this)
            prop = $e.data('show')
            list = Runtime._shws[prop]
            Runtime._shws[prop] = (list?.filter (obj) -> not $(obj).is($e)) ? []
          $('*[data-controller]', $elm).each ->
            $e = $(this)
            ctrl = $e.data('$ctrl')
            for k of ctrl?.watchers
              list = Runtime._watch[k]
              Runtime._watch[k] = (list?.filter (obj) -> obj[0] != ctrl) ? []
          comment = document.createComment this.outerHTML
          Runtime._ifs[raw].push comment
          $elm.replaceWith comment
          Runtime.getContext($elm)?.onLoad?()
        null

    show: ->
      $('*[data-show]', this).each ->
        $elm = $(this)
        raw = val = $elm.data 'show'

        negate = val[0] == '!'
        if negate
          val = val.substr(1)
        Runtime._shws[raw] = [] unless Runtime._shws[raw]
        return if Runtime._shws[raw].some (obj) -> $(obj).is($elm)

        # Register an on remove handler to remove the element from the list
        $elm.on 'remove', ->
          list = Runtime._shws[raw]
          Runtime._shws[raw] = (list?.filter (obj) -> not $(obj).is($elm)) ? []

        isVisible = Runtime._show $elm, val, negate
        Runtime._shws[raw].push this
        if isVisible
          $elm.removeClass 'hidden'
        else
          $elm.addClass 'hidden'
        null

    # ##include
    # Async load partials by eval
    include: ->
      $('*[data-include]', this).each ->
        $elm = $(this)
        partial = eval $elm.data('include')
        $elm.removeData 'include'
        $elm.load partial, ->
          Runtime.compile($elm)
          Runtime.getContext($elm)?.onLoad?()

    # ##controller
    # Specify a controller to attach to the element
    controller: ->
      $('*[data-controller]', this).filter(-> !$(this).data 'rt-live').each ->
        $elm = $(this)
        constructor = eval $elm.data('controller')
        return console.error "Unknown Controller: #{$elm.data('controller')}" unless constructor
        ctrl = new constructor $elm
        $elm.data 'rt-live', true
        for k, v of constructor.watchers
          Runtime._watch[k] = [] unless Runtime._watch[k]
          Runtime._watch[k].push [ctrl, v]
        ctrl.onLoad?()
        null



    # ##click
    # Execute the expression within an apply cycle
    click: ->
      $('*[data-click]', this).filter(-> !$(this).data 'rt-live').each ->
        $elm = $(this)
        $elm.data 'rt-live', true
        $elm.on 'click', (evt) ->
          evt.preventDefault()
          Runtime.apply ->
            ctx = Runtime.getContext($elm)
            action = $elm.data('click')
            if ctx.hasOwnProperty action
              ctx[action].apply ctx, [$elm]
            else if Runtime.context[action]?
              Runtime.context[action].apply Runtime.ctx, [$elm]
            else
              console.error "Unknown action '#{action}' for #{$elm[0].outerHTML} in #{ctx.constructor.name}"

    # ##double click
    # Execute the expression within an apply cycle
    dblclick: ->
      $('*[data-dblclick]', this).filter(-> !$(this).data 'rt-live').each ->
        $elm = $(this)
        $elm.data 'rt-live', true
        $elm.on 'dblclick', (evt) ->
          evt.preventDefault()
          Runtime.apply ->
            ctx = Runtime.getContext($elm)
            action = $elm.data('dblclick')
            if ctx.hasOwnProperty action
              ctx[action].apply ctx, [$elm]
            else if Runtime.context[action]?
              Runtime.context[action].apply Runtime.ctx, [$elm]
            else
              console.error "Unknown action '#{action}' for #{$elm[0].outerHTML} in #{ctx.constructor.name}"

    # ##blur
    # Execute the expression within an apply cycle
    blur: ->
      $('*[data-blur]', this).filter(-> !$(this).data 'rt-live').each ->
        $elm = $(this)
        $elm.data 'rt-live', true
        $elm.on 'blur', (evt) ->
          evt.preventDefault()
          Runtime.apply ->
            ctx = Runtime.getContext($elm)
            action = $elm.data('blur')
            if ctx.hasOwnProperty action
              ctx[action].apply ctx, [$elm]
            else if Runtime.context[action]?
              Runtime.context[action].apply Runtime.ctx, [$elm]
            else
              console.error "Unknown action '#{action}' for #{$elm[0].outerHTML} in #{ctx.constructor.name}"

    # ##Tabs
    tabs: ->
      li = '<li><a href="#" data-click="open"></a></li>'
      pane = '<div class="tab-pane"></div>'
      template = '<div class="tabbable"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>'

      $('*[data-tabs]', this).each ->
        $elm = $(this)
        $target = $(template)
        $target.addClass $elm.attr('class')
        tabCtrl =
          open: (el) ->
            $('.active', $target).removeClass 'active'
            $(el).parent().addClass 'active'
            $(".tab-pane[title='#{$(el).parent().attr('title')}']", $target).addClass 'active'
        $target.data '$ctrl', tabCtrl
        $('*[data-pane]', $elm).each ->
          $pane = $(this)
          $link = $(li)
          title = $pane.attr('title')
          $link.attr 'title', title
          $('a', $link).html title
          $('ul.nav', $target).append $link
          newPane = $(pane).append $pane.children()
          newPane.attr 'title', title
          $('.tab-content', $target).append newPane
        tabCtrl.open $('li:first-child > a', $target)

        $elm.replaceWith Runtime.compile($target)

    #
    # ### Special case of text fields used in a data-repeat
    #
    # In this situation, the
    # field will lose focus after each keypress as the field is being removed
    # and created when the list updates. When repeats can update in place this
    # will no longer be an issue.
    model: (context = null) ->
      $('input[data-model], select[data-model], textarea[data-model]', this).each ->
        $elm = $(this)
        ctx = context ? Runtime.getContext $elm
        model = $elm.data 'model'
        if $elm.attr('type') == 'text' || $elm.attr('type') == 'file'
          $elm.val Runtime.getValue($elm, model, ctx)
        else if $elm.attr('type') == 'radio'
          val = $elm.val()
          val = parseInt(val) if val[0].match /[0-9]/
          $elm.prop 'checked', Runtime.getValue($elm, modelm, ctx) == val
        else if $elm.attr('type') == 'checkbox'
          $elm.prop 'checked', Runtime.getValue($elm, model, ctx)

        change = ->
          val = $elm.val()
          if $elm.attr('type') == 'radio'
            val = parseInt(val) if val[0].match /[0-9]/
          else if $elm.attr('type') == 'checkbox'
            val = $elm.prop 'checked'
          if Runtime.isInApply
            obj = $elm.data('rt-model') ? ctx
            Runtime.setPropByString obj, model, val
          else if $elm.data('trap')
            obj = $elm.data('rt-model') ? ctx
            Runtime.apply ->
              Runtime.setPropByString obj, model, val
            , ctx.$el

          else
            obj = $elm.data('rt-model') ? ctx
            Runtime.apply ->
              Runtime.setPropByString obj, model, val
          null

        $elm.on 'change', change
        $elm.on 'keyup', change
        $elm.on 'search', change
        $elm.on 'webkitspeechchange', change if $elm.attr 'x-webkit-speech'

    submit: ->
      $('*[data-submit]', this).each ->
        $elm = $(this)
        $elm.on 'submit', (evt) ->
          evt.stopPropagation()
          evt.preventDefault()
          Runtime.apply ->
            ctx = Runtime.getContext($elm)
            ctx[$elm.data('submit')].apply ctx, [$elm]

    repeat: ->
      $('*[data-repeat]', this).each ->
        $elm = $(this)
        repeat = $elm.data 'repeat'
        repeat = repeat.split(' in ')
        list = repeat[1]
        model = repeat[0]
        ctx = Runtime.getContext($elm)
        list = Runtime.getPropByString ctx, list
        $elm.data 'rt-repeat-list', JSON.parse(JSON.stringify(list))
        template = $elm.data('template')
        if list
          children = for obj in list
            html = template
            obj.$ctrl = ctx
            while expr = html.match(/\{\{(.*?)\}\}/)?[1]
              html = html.replace "{{#{expr}}}", Runtime.evaluateExpression(expr, $elm, obj, model)
            obj.$ctrl = null
            child = Runtime.compile($(html))
            child.data('rt-model', obj)
            child
          $elm.append children

    src: ->
      $('img[data-src]', this).each ->
        $elm = $(this)
        $elm.attr 'src', Runtime.getValue($elm, $elm.data('src'))



  # #Watchers
  # Functions which manipulate the DOM based on data attributes
  watchers:

    # Not a data attribute. Used to restore or remove ifs
    _updateIf: ->
      for k, elements of Runtime._ifs
        if Runtime._ifs.hasOwnProperty k
          raw = k
          negate = k[0] == '!'
          if negate
            k = k.substr(1)
          for element, i in elements
            isVisible = Runtime._show $(element), k, negate
            #turn on element if it is a comment
            if isVisible
              if element.nodeType == 8 #is a comment node
                compiled = Runtime.compile $(element.nodeValue), false
                $(element).replaceWith compiled
                Runtime._ifs[raw][i] = compiled
            else
              #disable if not a comment
              if element.nodeType != 8 ##not a comment node
                $('*[data-show]', element).each ->
                  $e = $(this)
                  prop = $e.data('show')
                  list = Runtime._shws[prop]
                  #Remove the elements bound to a show
                  Runtime._shws[prop] = (list?.filter (obj) -> not $(obj).is($e)) ? []
                $('*[data-controller]', element).each ->
                  $e = $(this)
                  ctrl = $e.data('$ctrl')
                  for k of ctrl?.watchers
                    list = Runtime._watch[k]
                    Runtime._watch[k] = (list?.filter (obj) -> obj[0] != ctrl) ? []
                comment = document.createComment ($(element)[0]).outerHTML
                Runtime._ifs[raw][i] = comment
                $(element).replaceWith comment
              null
      null

    updateShow: ->
      for k, elements of Runtime._shws
        if Runtime._shws.hasOwnProperty k
          raw = k
          negate = k[0] == '!'
          if negate
            k = k.substr(1)
          for element, i in elements
            isVisible = Runtime._show $(element), k, negate
            if isVisible && element.classList.contains('hidden')
              element.classList.remove 'hidden'
            else if !isVisible && !element.classList.contains('hidden')
              element.classList.add 'hidden'
            null
      null

    updateModel: ->
      getVal = ($elm) ->
        filter = $elm.data('filter')?.split(/:(.+)/)
        filterKey = filter?[0] || null
        if filterKey && !Runtime.filters[filterKey]
          throw new Error("Unknown filter: '#{filterKey}' for element: #{$elm[0].outerHTML}")
        filterOptions = if filter?.length > 1 then eval(filter[1]) else null
        filter = if filterKey then Runtime.filters[filterKey] else null
        value = Runtime.getValue $elm, $elm.data('model')
        if filter && value != null then filter(value, filterOptions) else value

      $(':text[data-model]', $(this)).not(":focus").each ->
        $elm = $(this)
        newVal = getVal $elm
        $elm.val newVal if $elm.val() != newVal

      $(':radio[data-model]', $(this)).each ->
        $elm = $(this)
        val = $elm.val()
        val = parseInt(val) if val[0].match /[0-9]/
        $elm.prop 'checked', Runtime.getValue($elm, $elm.data('model')) == val

      $(':checkbox[data-model]', $(this)).each ->
        $elm = $(this)
        $elm.prop 'checked', Runtime.getValue($elm, $elm.data('model'))

      $('span[data-model]', $(this)).each ->
        $elm = $(this)
        $elm.html getVal($elm)
      null

    updateSrc: ->
      $('img[data-src]', $(this)).each ->
        $elm = $(this)
        newSrc = Runtime.getValue($elm, $elm.data('src'))
        $elm.attr('src', newSrc) if $elm.attr('src') != newSrc

    updateRepeat: ->
      $('*[data-repeat]', this).each ->
        $elm = $(this)
        repeat = $elm.data 'repeat'
        repeat = repeat.split(' in ')
        list = repeat[1]
        model = repeat[0]
        ctx = Runtime.getContext($elm)
        newList = Runtime.getPropByString ctx, list
        oldList = $elm.data 'rt-repeat-list'
        changed = if oldList && newList then oldList.length != newList.length else true
        unless changed
          changed = oldList.some (e, idx) ->
            newObj = newList[idx]
            if typeof e == 'object'
              for k, v of newObj when newObj.hasOwnProperty k
                return true if v != e[k]
            else
              newObj != e

        return if !changed

        if newList
          $elm.data 'rt-repeat-list', JSON.parse(JSON.stringify(newList))
        else
          $elm.removeData 'rt-repeat-list'
        $elm.empty()
        return unless newList
        template = $elm.data('template')
        container = $(document.createElement('div'))
        if newList
          for obj in newList
            html = template
            obj.$ctrl = ctx
            while expr = html.match(/\{\{(.*?)\}\}/)?[1]
              html = html.replace "{{#{expr}}}", Runtime.evaluateExpression(expr, $elm, obj, model)
            context = {}
            context[model] = obj
            child = Runtime.compile($(html), false, context)
            obj.$ctrl = null
            rt_model = {}
            rt_model[model] = obj
            child.data('rt-model', rt_model)
            container.append child
          $elm.append container.children()
          $elm.trigger 'contentchanged'
