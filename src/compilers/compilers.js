import Directives from "./directives.js";
import If from "./if.js";
import Show from "./show.js";
import Class from "./class.js";
import Disabled from "./disabled.js";
import Href from "./href.js";
import Style from "./style.js";
import Include from "./include.js";
import Controller from "./controller.js";
import Click from "./click.js";
import DoubleClick from "./double_click.js";
import Blur from "./blur.js";
import Focus from "./focus.js";
import Tabs from "./tabs.js";
import Model from "./model.js";
import Submit from "./submit.js";
import Src from "./src.js";
import Scroll from "./scroll.js";
import ScrollFinished from "./scroll_finished.js";
import Generic from "./generic-attribute.js";

// Mouse Events
import MouseDown from "./mousedown.js";
import MouseEnter from "./mouseenter.js";
import MouseLeave from "./mouseleave.js";
import MouseMove from "./mousemove.js";
import MouseOut from "./mouseout.js";
import MouseOver from "./mouseover.js";
import MouseUp from "./mouseup.js";
import MouseWheel from "./mousewheel.js";

// Key Events
import KeyDown from "./keydown.js";
import KeyUp from "./keyup.js";
//Touch Events
import TouchStart from "./touch/touchstart.js";
import TouchCancel from "./touch/touchcancel.js";
import TouchEnd from "./touch/touchend.js";

export default {
  Directive: Directives,
  _if: If,
  Show: Show,
  Class: Class,
  Disabled: Disabled,
  Href: Href,
  Style: Style,
  Include: Include,
  Controller: Controller,
  Click: Click,
  DoubleClick: DoubleClick,
  Blur: Blur,
  Focus: Focus,
  Tabs: Tabs,
  Model: Model,
  Submit: Submit,
  Src: Src,
  Scroll: Scroll,
  ScrollFinished: ScrollFinished,
  Generic: Generic,
  // Mouse Events
  MouseDown: MouseDown,
  MouseUp: MouseUp,
  MouseOut: MouseOut,
  MouseMove: MouseMove,
  MouseWheel: MouseWheel,
  MouseLeave: MouseLeave,
  MouseEnter: MouseEnter,
  MouseOver: MouseOver,
  // Key Events
  KeyDown: KeyDown,
  KeyUp: KeyUp,
  //Touch Events
  TouchStart: TouchStart,
  TouchCancel: TouchCancel,
  TouchEnd: TouchEnd
};
