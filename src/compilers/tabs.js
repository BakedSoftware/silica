export default function Tabs() {
  var li, pane, template;
  li = '<li><a href="#" data-click="open"></a></li>';
  pane = '<div class="tab-pane"></div>';
  template = '<div class="tabbable"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>';
  return $('*[data-tabs]', this).each(function() {
    var $elm, $target, tabCtrl;
    $elm = $(this);
    $target = $(template);
    $target.addClass($elm.attr('class'));
    tabCtrl = {
      open: function(el) {
        $('.active', $target).removeClass('active');
        $(el).parent().addClass('active');
        return $(".tab-pane[title='" + ($(el).parent().attr('title')) + "']", $target).addClass('active');
      }
    };
    $target[0]._rt_ctrl = tabctrl;
    $('*[data-pane]', $elm).each(function() {
      var $link, $pane, newPane, title;
      $pane = $(this);
      $link = $(li);
      title = $pane.attr('title');
      $link.attr('title', title);
      $('a', $link).html(title);
      $('ul.nav', $target).append($link);
      newPane = $(pane).append($pane.children());
      newPane.attr('title', title);
      return $('.tab-content', $target).append(newPane);
    });
    tabCtrl.open($('li:first-child > a', $target));
    return $elm.replaceWith(Silica.compile($target));
  });
}
