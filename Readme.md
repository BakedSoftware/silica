## Contexts

Each directive is bound to a specific context which specifies the object the values and actions are bound to. There are 3 types of contexts.

1. Global - Referred to by starting with a capital letter.
2. Model
3. Controller

### Global Context

A Global context must start with a capital letter and be accessible from the window scope. A single global context must be specified as Silica's context by name - `Silica.setContext("GC")` where `GC` is accessible through `window.GC` or `window["GC"]`. All instances of Controllers used in a `data-controller` expression must be a member of a **Global** context; the value set as the Silica context is recommended.

### Model Context

A Model context can be seen as the most fine grained. Silica expressions will attempt to bind to the inner most model context first before walking up context tree to the nearest Controller Context if the property cannot be found on the model. Model contexts are created using the `data-repeat="model in list"` expression where model will be the reference and list is an array.

Example:

```
<ul data-repeat="category in category_list">
  <li>{{category.name}}</li>
</ul>
```

### Controller Context

A Controller context is a medium grained context. Model contexts have higher priority than Controllers so any overlapping properties will go to the model. Unlike model contexts Controller contexts don't continue to walk up the Context tree if a property does not exist. Controller's should be used for all actionable expressions.


## Expressions

Expressions are `data-*` attributes known to Silica. The value of the attribute is a semi-evald value. Values can be chained and can consist of functions and regular properties. A function will halt the execution of a chain.

Example:

Here we have a div that will be visible if `is_editable` evaluates to true. `is_editable` can be a function or just a property set to true or false.

```
<div data-show="category.is_editable">Change</div>
```

Similar to the previous, notice the `!` which acts as expected.
The `. (dot)` operator takes precedence over the `!`.

```
<div data-show="!category.has_children">I am empty</div>
```

### Actionable

These are expressions which bind to a user's actions.
Actionable expressions will call the value specified which **must** be a function, **always** passing the element as the **first** argument to the function.
If a model is specified it will be passed as the **second** argument.

* `data-click`
* `data-dblclick`
* `data-blur`
* `data-submit`

### Output

These are your binding expressions that output a value.
The properties specified can be functions, primitives, or objects.
**DO NOT** include parenthesis of a function. Function properties are called with out any arguments and should be viewed as computable properties. A function will get called with its `this` context set to the object.

* `data-class` - Set a css class to the returned value
* `data-show` - Toggles the css class _hidden_ based on truthiness
* `data-if` - Removes the element from the DOM based on truthiness, `data-show`
  is preferable
* `data-style` - Sets the css style attribute to the returned value
* `data-repeat` - Iterate through an array with its first child element as the template
* `data-include` - Replace any children with the html specified by URL. The
  value specified will be `eval`d, so if it is a string, surround it in `''`
(single quotes). The compiler will **NOT** `eval`, but expects the same
syntax.
* `data-model` - Bind the innerHTML, value, checked attributes to the value specified. If the element is editable, these are 2-way bindings
* `data-filter` - Used in conjunction with `data-model` **only**; allows a filter to be applied to the value returned by model before outputing the value.
* `data-silica="attribute=value"`- Bind the _value_ to the specified _attribute_


This will pipe the value of `category.amount` through the `currency` filter before setting the `span.innerHTML`

```
<span data-model="category.amount" data-filter="currency"></span>
```

The `data-model` and `data-filter` expressions are so common that there is a shortcut; specified using mustache style with optional pipes.

Same as above

```
{{category.amount|currency}}
```

No filter:

```
{{category.name}}
```
