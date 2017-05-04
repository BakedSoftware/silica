let AppCntrlStates = {
  "base": class extends Silica.Controllers.FSM.State {
    onEnter(ctrl)
    {
      console.log(ctrl, "Entered base state");
    }
  },
  "list": class extends Silica.Controllers.FSM.State {
    onEnter(ctrl)
    {
      console.log("Set up list stuff here")
    }
  },
  "details": class extends Silica.Controllers.FSM.State {
    onEnter(ctrl)
    {
      console.log("set up map stuff here")
    }
  }
};
// FSMExample
// AppCntrl is the root controller of FSMExample
//
class AppCntrl extends Silica.Controllers.FSM.Controller {
  // Constructor receives the element which specified this controller
  constructor(element) {
    super(element)
    this.name = "FSMExample";
    this.version = "1.0.0";
    this.addresses = ["102 NE 1st Ave, Delray Beach, FL 33444"];
  }

  /**
   * @override
   */
  static get states()
  {
    return AppCntrlStates;
  }

  transitionTo(el, state)
  {
    this.transition(state);
  }

  mainNavClass(el, parameter)
  {
    return parameter == this.currentState ? 'active' : '';
  }

  mainContent(el, parameter)
  {
    return parameter == this.currentState
  }

  showDetails(el, address)
  {
    this.currentAddress = address;
    this.transition("details");
  }
}

export default AppCntrl;
