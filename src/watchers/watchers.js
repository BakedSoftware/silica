import _If from './if.js';
import Repeat from './repeat.js';
import Show from './show.js';
import Class from './class.js';
import Model from './model.js';
// The following just need to call their compiler
import Disabled from '../compilers/disabled.js';
import Href from '../compilers/href.js';
import Style from '../compilers/style.js';
import Src from '../compilers/src.js';
import Generic from '../compilers/generic-attribute.js';
import Include from '../compilers/include.js';

export default {
  _If: _If,
  Repeat: Repeat,
  Show: Show,
  Class: Class,
  Model: Model,
  Disabled: Disabled,
  Href: Href,
  Style: Style,
  Src: Src,
  Generic: Generic,
  Include: Include
};
