/*

Controller
===============

Controllers are responsible for managing a view.
All events and properties will bind to the first controller found while
traversing up the DOM tree including the current element

Controllers can be attached to a view using `data-controller`

Example:

    class Ctrl extends Runtime.Controllers.Base
      constructor: (element) ->
        super
      hello: => alert "Hello world!"

    <div data-controller="Ctrl">
      <a href="#" data-click='hello'>Say Hello</a>
    </div>

The value of `data-controller` must be accessible from the window scope

*/


// ##Runtime.Controllers.Base
// This is a basic controller that all controllers must subclass from
class Base
{
  // The constructor binds the element to the controller and sets its scope
  // When subclassing remember to **call super**
  constructor(el)
  {
    this.el = el;
  }

  // A convenience proxy to jQuery with the instance's element as the scope
  $(selector)
  {
    return $(selector, this.el);
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

Base.watchers = {};

export default Base;
