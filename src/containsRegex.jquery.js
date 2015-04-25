/* jQuery selector to match exact text inside an element
 *  http://wowmotty.blogspot.com/2010/05/jquery-selectors-adding-contains-exact.html
 *  :containsExact()     - case insensitive
 *  :containsExactCase() - case sensitive
 *  :containsRegex()     - set by user ( use:
 *  $(el).find(':containsRegex("/(red|blue|yellow)/gi")') )
 */
$.extend( $.expr[":"], {
  containsExact: $.expr.createPseudo ?
    $.expr.createPseudo(function(text) {
      return function(elem) {
        return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
      };
    }) :
    // support: jQuery <1.8
    function(elem, i, match) {
      return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
    },

  containsExactCase: $.expr.createPseudo ?
    $.expr.createPseudo(function(text) {
      return function(elem) {
        return $.trim(elem.innerHTML) === text;
      };
    }) :
    // support: jQuery <1.8
    function(elem, i, match) {
      return $.trim(elem.innerHTML) === match[3];
    },

  containsRegex: $.expr.createPseudo ?
    $.expr.createPseudo(function(text) {
      var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(text);
      return function(elem) {
        return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.textContent)) :
false;
      };
    }) :
    // support: jQuery <1.8
    function(elem, i, match) {
      var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(match[3]);
      return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML)) : false;
    }

});
