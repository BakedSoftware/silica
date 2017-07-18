goog.module('controllers.FSM');

const Base  = goog.require('controllers.Base');

/**
 * @dict
 */
class State {
  onEnter(ctrl)
  {
  }

  onExit(ctrl)
  {
  }
}

State.prototype['onEnter'] = State.prototype.onEnter;
State.prototype['onExit'] = State.prototype.onExit;

// ##Silica.Controllers.FSM
// This is a Finite state machine based controller
/** @unrestricted */
class Controller extends Base
{
  // The constructor binds the element to the controller and sets its scope
  // When subclassing remember to **call super**
  constructor(el)
  {
    super(el)
    let stateDefinitions = this.constructor['states'];
    this._states = {};
    for (const stateName in stateDefinitions) {
      this._states[stateName] = new stateDefinitions[stateName];
    }
    this['handle'] = this.handle;
    this['transition'] = this.transition;

    /**
     * @private {State}
     */
    this._currentState = new State();

    if (this["initialState"]) {
      this._currentStateName = this["initialState"]();
      this._currentState = this._getStateWithName(this._currentStateName);
      Silica.defer(() => {
        this._currentState['onEnter'](this);
      });
    }
  }

  static get states()
  {
    return {
      "base": State
    }
  }

  _getStateWithName(stateName) {
    let target = this._states[stateName];
    if (!target)
    {
      throw "Unknown state " + stateName +" in " + this.constructor.name;
    }
    return target;
  }


  transition(stateName)
  {
    let target = this._getStateWithName(stateName);

    if (target == this._currentState)
    {
      return;
    }

    Silica.defer(() => {
      this._currentState['onExit'](this);
      this._currentState = target;
      this._currentStateName = stateName;
      Silica.defer(() => {
        this._currentState['onEnter'](this);
      });
    });
  }

  /**
   * handle will ask the current state to execute a function if it exists
   * @param {string} functionName - The name of the function to execute
   */
  handle(functionName)
  {
    if (!this._currentState)
    {
      return;
    }

    let func = this._currentState[functionName]
    if (func)
    {
      if (typeof func === "function")
      {
        return func.call(this._currentState, this);
      }
      return func;
    }
  }

}

Object.defineProperties(Controller.prototype, {
  'currentState': {
    configurable: 0,
    enumerable: 0,
    /** @suppress {globalThis} */
    get: function() {
      return this._currentStateName;
    }
  }
});

exports['Controller']  =  Controller;
exports['State']       =  State;
