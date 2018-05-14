goog.module('controllers.Base')
/*

Controller
===============

Controllers are responsible for managing a view.
All events and properties will bind to the first controller found while
traversing up the DOM tree including the current element

Controllers can be attached to a view using `data-controller`

Example:

    class Ctrl extends Silica.Controllers.Base
      constructor: (element) ->
        super
      hello: => alert "Hello world!"

    <div data-controller="Ctrl">
      <a href="#" data-click='hello'>Say Hello</a>
    </div>

The value of `data-controller` must be accessible from the window scope

*/

// ##Silica.Controllers.Base
// This is a basic controller that all controllers must subclass from
/** @unrestricted */
class Base {
  // The constructor binds the element to the controller and sets its scope
  // When subclassing remember to **call super**
  constructor (el) {
    this['el'] = el
    if (el.parentElement) {
      this.$ctrl = Silica.getContext(el.parentElement)
    }
  }

  // A convenience proxy to querySelectorAll with the instance's element as the scope
  $ (selector) {
    return this['el'].querySelectorAll(selector)
  }

  /*
   Watchers can be added to observe when a property changes through
   `data-model`

   Example:

        @watchers =
          'prop1': -> alert 'prop1' changed

   Watchers are always created on the controller's constructor and will apply
   to all instances of the controller
  */
};

Base['watchers'] = {}

Base.prototype['$'] = Base.prototype.$

exports = Base
