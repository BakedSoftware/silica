var inputTimeRegexp = new /date|time/i;

export default function Model(context = null) {
  var elm, change, ctx, model, val;
  var elements = Silica.query(this, 'input[data-model]', 'select[data-model]', 'textarea[data-model]', 'option[data-model]');
  for (let i = elements.length - 1; i >= 0; i--)
  {
    //ctx = context != null ? context : Silica.getContext($elm);
    elm = elements[i];
    ctx = Silica.getContext(elm);
    model = elm.dataset.model;
    let type = elm.type;
    if (type === 'text' || type === 'file' || type === 'number' ||
        type === 'email' || type === 'password' || inputTimeRegexp.test(type)) {
      elm.value = Silica.getValue(elm, model, ctx);
    } else if (type === 'radio') {
      val = elm.value;
      if (val.match(/[0-9]/)) {
        val = parseInt(val);
      }
      elm.checked = Silica.getValue(elm, model, ctx) === val;
    } else if (type === 'checkbox') {
      elm.checked = Silica.getValue(elm, model, ctx);
    } else if (elm.nodeName === 'OPTION') {
      elm.value = Silica.getValue(elm, model, ctx);
    }
    change = function() {
      var obj, _ref, _ref1, _ref2;
      var val = this.value, ctx = Silica.getContext(this), model = this.dataset.model;
      if (this.type === 'radio') {
        if (val.match(/[0-9]/)) {
          val = parseInt(val);
        }
      } else if (this.type === 'checkbox') {
        val = this.checked;
      }
      if (Silica.isInApply) {
        obj = (_ref = this._rt_ctx) != null ? _ref : ctx;
        Silica.setPropByString(obj, model, val);
      } else if ((_ref = this.dataset.trap) != null) {
        obj = (_ref1 = this._rt_ctx) != null ? _ref1 : ctx;
        let scope;
        if (_ref.toLowerCase() === "true")
        {
          scope = this;
        }
        else
        {
          scope = document;
          _ref1 = this;
          while ((_ref1 = _ref1.parentElement) && _ref1.length)
          {
            if (_ref1.classList.contains(_ref))
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
        obj = (_ref2 = this._rt_ctx) != null ? _ref2 : ctx;
        Silica.apply(function() {
          return Silica.setPropByString(obj, model, val);
        });
      }
    };
    elm.onchange = change;
    elm.onkeyup = change;
    elm.onsearch = change;
    if (elm.hasAttribute('x-webkit-speech')) {
      elm.onwebkitspeechchange = change;
    }
  }
}
