export default function Show(){
  var nodes = Silica.query(this, "[data-show]");
  var node;
  var $elm, isVisible, negate, raw, val;
  for (var i = nodes.length - 1; i >= 0; --i)
  {
    node = nodes[i];
    $elm = $(node);
    raw = val = $elm.data('show');
    negate = val[0] === '!';
    if (negate) {
      val = val.substr(1);
    }
    if (!Silica._shws[raw]) {
      Silica._shws[raw] = [];
    }
    if (Silica._shws[raw].some(function(obj) { return $(obj).is($elm);}))
    {
      continue;
    }
    $elm[0].onremove = function() {
      var list, _ref = $elm[0];
      list = Silica._shws[raw];
      if (list !== undefined && list !== null)
      {
        Silica._shws[raw] =  list.filter(function(obj)
            {
              return $elm[0] !== _ref;
            });
      }
      else
      {
        Silica._shws[raw] = [];
      }
    };
    isVisible = Silica._show($elm, val, negate);
    Silica._shws[raw].push(node);
    if (isVisible) {
      $elm.removeClass('hidden');
    } else {
      $elm.addClass('hidden');
    }
  }
}
