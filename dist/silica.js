!function(){
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  $target$$ != Array.prototype && $target$$ != Object.prototype && ($target$$[$property$$] = $descriptor$$.value);
};
$jscomp.getGlobal = function $$jscomp$getGlobal$($maybeGlobal$$) {
  return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global && null != global ? global : $maybeGlobal$$;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function $$jscomp$polyfill$($property$jscomp$5_split_target$$, $impl_polyfill$$, $fromLang_obj$$, $i$$) {
  if ($impl_polyfill$$) {
    $fromLang_obj$$ = $jscomp.global;
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$.split(".");
    for ($i$$ = 0; $i$$ < $property$jscomp$5_split_target$$.length - 1; $i$$++) {
      var $key$$ = $property$jscomp$5_split_target$$[$i$$];
      $key$$ in $fromLang_obj$$ || ($fromLang_obj$$[$key$$] = {});
      $fromLang_obj$$ = $fromLang_obj$$[$key$$];
    }
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$[$property$jscomp$5_split_target$$.length - 1];
    $i$$ = $fromLang_obj$$[$property$jscomp$5_split_target$$];
    $impl_polyfill$$ = $impl_polyfill$$($i$$);
    $impl_polyfill$$ != $i$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($fromLang_obj$$, $property$jscomp$5_split_target$$, {configurable:!0, writable:!0, value:$impl_polyfill$$});
  }
};
$jscomp.polyfill("Array.prototype.includes", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchElement$$, $i$jscomp$4_opt_fromIndex$$) {
    var $array$$ = this;
    $array$$ instanceof String && ($array$$ = String($array$$));
    var $len$$ = $array$$.length;
    $i$jscomp$4_opt_fromIndex$$ = $i$jscomp$4_opt_fromIndex$$ || 0;
    for (0 > $i$jscomp$4_opt_fromIndex$$ && ($i$jscomp$4_opt_fromIndex$$ = Math.max($i$jscomp$4_opt_fromIndex$$ + $len$$, 0)); $i$jscomp$4_opt_fromIndex$$ < $len$$; $i$jscomp$4_opt_fromIndex$$++) {
      var $element$$ = $array$$[$i$jscomp$4_opt_fromIndex$$];
      if ($element$$ === $searchElement$$ || Object.is($element$$, $searchElement$$)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function $$jscomp$initSymbol$() {
  $jscomp.initSymbol = function $$jscomp$initSymbol$() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var $counter$$ = 0;
  return function Symbol($opt_description$$) {
    return $jscomp.SYMBOL_PREFIX + ($opt_description$$ || "") + $counter$$++;
  };
}();
$jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  $jscomp.initSymbol();
  var $symbolIterator$$ = $jscomp.global.Symbol.iterator;
  $symbolIterator$$ || ($symbolIterator$$ = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[$symbolIterator$$] && $jscomp.defineProperty(Array.prototype, $symbolIterator$$, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  };
};
$jscomp.arrayIterator = function $$jscomp$arrayIterator$($array$$) {
  var $index$$ = 0;
  return $jscomp.iteratorPrototype(function() {
    return $index$$ < $array$$.length ? {done:!1, value:$array$$[$index$$++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function $$jscomp$iteratorPrototype$($iterator$$) {
  $jscomp.initSymbolIterator();
  $iterator$$ = {next:$iterator$$};
  $iterator$$[$jscomp.global.Symbol.iterator] = function $$iterator$$$$jscomp$global$Symbol$iterator$() {
    return this;
  };
  return $iterator$$;
};
$jscomp.iteratorFromArray = function $$jscomp$iteratorFromArray$($array$$, $transform$$) {
  $jscomp.initSymbolIterator();
  $array$$ instanceof String && ($array$$ += "");
  var $i$$ = 0, $iter$$ = {next:function() {
    if ($i$$ < $array$$.length) {
      var $index$$ = $i$$++;
      return {value:$transform$$($index$$, $array$$[$index$$]), done:!1};
    }
    $iter$$.next = function $$iter$$$next$() {
      return {done:!0, value:void 0};
    };
    return $iter$$.next();
  }};
  $iter$$[Symbol.iterator] = function $$iter$$$Symbol$iterator$() {
    return $iter$$;
  };
  return $iter$$;
};
$jscomp.polyfill("Array.prototype.values", function($orig$$) {
  return $orig$$ ? $orig$$ : function() {
    return $jscomp.iteratorFromArray(this, function($k$$, $v$$) {
      return $v$$;
    });
  };
}, "es8", "es3");
var module$contents$compilers$class_getClassList = null;
module$contents$compilers$class_getClassList = DOMTokenList && DOMTokenList.prototype.values ? function($e$$) {
  return $e$$.classList.values();
} : function($e$$) {
  return $e$$.className.split(" ");
};
function module$contents$compilers$class_updater($element$$, $klass$jscomp$1_value$$) {
  var $hardClass$$ = $element$$.dataset.siO2HardClass || "";
  $klass$jscomp$1_value$$ instanceof Array || ($klass$jscomp$1_value$$ = "" === $klass$jscomp$1_value$$ ? [] : [$klass$jscomp$1_value$$]);
  null != $element$$.dataset.show && $element$$.classList.contains("hidden") && $klass$jscomp$1_value$$.push("hidden");
  if ($element$$.classList.length !== $klass$jscomp$1_value$$.length) {
    $element$$.className = $hardClass$$, $element$$.classList.add.apply($element$$.classList, $klass$jscomp$1_value$$);
  } else {
    let $applied$$ = !1;
    for (let $k$$ of $klass$jscomp$1_value$$) {
      if (!$element$$.classList.contains($k$$)) {
        $element$$.className = $hardClass$$;
        $element$$.classList.add.apply($element$$.classList, $klass$jscomp$1_value$$);
        $applied$$ = !0;
        break;
      }
    }
    if (!$applied$$) {
      for (let $k$$ of module$contents$compilers$class_getClassList($element$$)) {
        if (!$klass$jscomp$1_value$$.includes($k$$)) {
          $element$$.className = $hardClass$$;
          $element$$.classList.add.apply($element$$.classList, $klass$jscomp$1_value$$);
          break;
        }
      }
    }
  }
}
function module$exports$compilers$class($ctx_nodes$$, $node$jscomp$2_value$$) {
  if (void 0 !== $node$jscomp$2_value$$) {
    module$contents$compilers$class_updater(this, $node$jscomp$2_value$$);
  } else {
    $ctx_nodes$$ = Silica.query(this, "[data-class]");
    if (9 !== this.nodeType && this.dataset["class"]) {
      null == this.dataset.siO2HardClass && (this.dataset.siO2HardClass = this.className.split("hidden").join(" ").trim());
      let $property$$ = this.dataset["class"];
      Silica.observer.register(this, $property$$, module$exports$compilers$class);
      this.onremove = function $this$onremove$() {
        Silica.observer.deregister(this, $property$$, module$exports$compilers$class);
      };
    }
    for (let $i$$ = $ctx_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
      $node$jscomp$2_value$$ = $ctx_nodes$$[$i$$];
      null == $node$jscomp$2_value$$.dataset.siO2HardClass && ($node$jscomp$2_value$$.dataset.siO2HardClass = $node$jscomp$2_value$$.className.split("hidden").join(" ").trim());
      let $property$$ = $node$jscomp$2_value$$.dataset["class"];
      Silica.observer.register($node$jscomp$2_value$$, $property$$, module$exports$compilers$class);
      $node$jscomp$2_value$$.onremove = function $$node$jscomp$2_value$$$onremove$() {
        Silica.observer.deregister(this, $property$$, module$exports$compilers$class);
      };
    }
  }
}
;function module$contents$compilers$clickoutside_handleClick($evt$$) {
  for (let $node$$ of Silica._clickOutElements) {
    if (0 < $node$$.offsetWidth || 0 < $node$$.offsetHeight) {
      $evt$$.target === $node$$ || Silica.isDescendent($node$$, $evt$$.target) || Silica._call($node$$, $evt$$, "clickOutside");
    }
  }
}
function module$exports$compilers$clickoutside() {
  for (var $nodes$$ = Silica.query(this, "[data-click-outside]"), $i$$ = $nodes$$.length - 1; 0 <= $i$$; $i$$--) {
    Silica._clickOutElements.add($nodes$$[$i$$]);
  }
  0 < Silica._clickOutElements.size ? window.addEventListener("click", module$contents$compilers$clickoutside_handleClick) : window.removeEventListener("click", module$contents$compilers$clickoutside_handleClick);
}
;function module$exports$compilers$directives() {
  for (let $k$$ in Silica.directives) {
    let $obj$$ = Silica.directives[$k$$], $nodes$$ = Silica.queryOfType(this, $k$$), $wrapper$$ = document.createElement("div");
    for (let $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
      $wrapper$$.innerHTML = $obj$$.template;
      let $newChild$$ = $wrapper$$.firstChild;
      var $node$$ = $nodes$$[$i$$];
      if ($node$$.hasAttributes()) {
        var $attrs_v$$ = $node$$.attributes;
        for (let $j$$ = $attrs_v$$.length - 1; 0 <= $j$$; $j$$--) {
          $newChild$$.setAttribute($attrs_v$$[$j$$].name, $attrs_v$$[$j$$].value);
        }
      }
      for (let $j$$ in $node$$.dataset) {
        $newChild$$.dataset[$j$$] = $node$$.dataset[$j$$];
      }
      $newChild$$._rt_ctrl = new $obj$$.controller($newChild$$);
      $newChild$$._rt_ctrl.$ctrl = Silica.getContext($node$$.parentElement);
      $newChild$$.dataset.sio2Directive = !0;
      Silica.cacheTemplates($newChild$$);
      $node$$.parentNode.replaceChild($newChild$$, $node$$);
      $node$$ = $obj$$.controller.watchers;
      for (let $w$$ in $node$$) {
        $attrs_v$$ = $node$$[$w$$], Silica._watch[$w$$] || (Silica._watch[$w$$] = []), Silica._watch[$w$$].push([$newChild$$._rt_ctrl, $attrs_v$$]);
      }
      if ("function" === typeof $newChild$$._rt_ctrl.onLoad) {
        $newChild$$._rt_ctrl.onLoad();
      }
    }
  }
}
;function module$exports$compilers$if() {
  var $nodes$$ = Silica.queryWithComments(this, "[data-if]"), $comment_isVisible_live_negate_subNodes$$, $j$jscomp$0$$, $_ref$$, $temp$$ = document.createElement("div");
  for (let $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $nodes$$[$i$$];
    if (8 === $node$$.nodeType) {
      $temp$$.innerHTML = $node$$.nodeValue;
      var $raw$$ = $j$jscomp$0$$ = $temp$$.firstElementChild.dataset["if"];
    } else {
      $raw$$ = $j$jscomp$0$$ = $node$$.dataset["if"];
    }
    ($comment_isVisible_live_negate_subNodes$$ = "!" === $j$jscomp$0$$[0]) && ($j$jscomp$0$$ = $j$jscomp$0$$.substr(1));
    Silica._ifs[$raw$$] || (Silica._ifs[$raw$$] = []);
    if ($comment_isVisible_live_negate_subNodes$$ = Silica._show($node$$, $j$jscomp$0$$, $comment_isVisible_live_negate_subNodes$$)) {
      if (8 !== $node$$.nodeType ? Silica._ifs[$raw$$].push($node$$) : ($comment_isVisible_live_negate_subNodes$$ = $temp$$.firstElementChild, Silica._ifs[$raw$$].push($comment_isVisible_live_negate_subNodes$$), $node$$.parentElement.insertBefore($comment_isVisible_live_negate_subNodes$$, $node$$), $node$$.remove(), $node$$ = $comment_isVisible_live_negate_subNodes$$), null != ($_ref$$ = Silica.getContext($node$$)) && "function" === typeof $_ref$$.onLoad && $_ref$$.el === $node$$) {
        $_ref$$.onLoad();
      }
    } else {
      if (8 !== $node$$.nodeType) {
        $comment_isVisible_live_negate_subNodes$$ = Silica.queryWithComments($node$$, "[data-if]");
        let $subNode$$;
        for (let $j$$ = $comment_isVisible_live_negate_subNodes$$.length - 1; 0 <= $j$$; --$j$$) {
          $subNode$$ = $comment_isVisible_live_negate_subNodes$$[$j$$];
          var $list$jscomp$1_prop$$ = $subNode$$.dataset["if"];
          $j$jscomp$0$$ = Silica._shws[$list$jscomp$1_prop$$];
          Silica._shws[$list$jscomp$1_prop$$] = null != $j$jscomp$0$$ ? $j$jscomp$0$$.filter(function($obj$$) {
            return $obj$$ !== $subNode$$;
          }) : [];
        }
        $comment_isVisible_live_negate_subNodes$$ = Silica.query(this, "[data-controller]");
        for ($j$jscomp$0$$ = $comment_isVisible_live_negate_subNodes$$.length - 1; 0 <= $j$jscomp$0$$; --$j$jscomp$0$$) {
          $subNode$$ = $comment_isVisible_live_negate_subNodes$$[$j$jscomp$0$$];
          let $ctrl$$ = this._rt_ctrl, $k$$;
          for ($k$$ in null != $ctrl$$ ? $ctrl$$.watchers : void 0) {
            $list$jscomp$1_prop$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$jscomp$1_prop$$ ? $list$jscomp$1_prop$$.filter(function($obj$$) {
              return $obj$$[0] !== $ctrl$$;
            }) : [];
          }
        }
        $comment_isVisible_live_negate_subNodes$$ = document.createComment($node$$.outerHTML);
        Silica._ifs[$raw$$].push($comment_isVisible_live_negate_subNodes$$);
        $node$$.parentNode.replaceChild($comment_isVisible_live_negate_subNodes$$, $node$$);
      }
    }
  }
}
;function module$exports$compilers$show($ctx$jscomp$1_nodes$$, $i$jscomp$10_value$$) {
  if (void 0 !== $i$jscomp$10_value$$) {
    $i$jscomp$10_value$$ ? this.classList.remove("hidden") : this.classList.add("hidden");
  } else {
    for ($ctx$jscomp$1_nodes$$ = Silica.query(this, "[data-show]"), $i$jscomp$10_value$$ = $ctx$jscomp$1_nodes$$.length - 1; 0 <= $i$jscomp$10_value$$; --$i$jscomp$10_value$$) {
      let $node$$ = $ctx$jscomp$1_nodes$$[$i$jscomp$10_value$$], $property$$ = $node$$.dataset.show;
      $node$$.onremove = function $$node$$$onremove$() {
        Silica.observer.deregister($node$$, $property$$, module$exports$compilers$show);
      };
      Silica.observer.register($node$$, $property$$, module$exports$compilers$show);
    }
  }
}
;function module$contents$compilers$include_loadCallback($element$$) {
  var $ctx$$ = Silica.getContext($element$$);
  if ($ctx$$.onLoad && "function" === typeof $ctx$$.onLoad) {
    $ctx$$.onLoad($element$$);
  }
}
function module$contents$compilers$include_clearContent($element$$) {
  for (; $element$$.hasChildNodes();) {
    Silica.removeFromDOM($element$$.lastChild);
  }
}
function module$contents$compilers$include_processInclude($element$$, $html$$) {
  let $fragment$$ = document.createElement("div");
  $fragment$$.innerHTML = $html$$;
  for (module$contents$compilers$include_clearContent($element$$); $fragment$$.children.length;) {
    $element$$.appendChild($fragment$$.children[0]);
  }
  Silica.compile($element$$, !1);
  Silica.apply(function() {
    module$contents$compilers$include_loadCallback($element$$);
  }, Silica.getContext($element$$).el);
}
function module$contents$compilers$include_loadPartial($url$$, $element$$) {
  if ($element$$.dataset.siO2IncludedUrl !== $url$$) {
    $element$$.dataset.siO2IncludedUrl = $url$$;
    module$contents$compilers$include_clearContent($element$$);
    var $cached$$ = Silica._includeCache[$url$$];
    if ($cached$$) {
      module$contents$compilers$include_processInclude($element$$, $cached$$);
    } else {
      var $xhr$$ = new XMLHttpRequest;
      $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
        4 === $xhr$$.readyState && (Silica._includeCache[$url$$] = $xhr$$.responseText, $element$$.dataset.siO2IncludedUrl === $url$$ && module$contents$compilers$include_processInclude($element$$, $xhr$$.responseText));
      };
      $xhr$$.open("GET", $url$$, !0);
      $xhr$$.send(null);
    }
  }
}
function module$contents$compilers$include_IncludeUpdater($_$$, $url$$) {
  $url$$ && "" !== $url$$ ? module$contents$compilers$include_loadPartial($url$$, this) : (this.removeAttribute("data-sio2-included-url"), module$contents$compilers$include_clearContent(this));
}
function module$exports$compilers$include($ctx$jscomp$3_nodes$$, $node$jscomp$7_value$$) {
  $ctx$jscomp$3_nodes$$ = Silica.query(this, "[data-include]");
  for (let $i$$ = $ctx$jscomp$3_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$jscomp$7_value$$ = $ctx$jscomp$3_nodes$$[$i$$], Silica.observer.register($node$jscomp$7_value$$, $node$jscomp$7_value$$.dataset.include, module$contents$compilers$include_IncludeUpdater);
  }
}
;function module$exports$compilers$controller($ctx$jscomp$4_nodes$$, $force$$ = !1, $storeWatchers$$ = !0) {
  var $k$$;
  $ctx$jscomp$4_nodes$$ = Silica.query(this, "[data-controller]");
  for (let $i$$ = $ctx$jscomp$4_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $ctx$jscomp$4_nodes$$[$i$$];
    if ($force$$ || void 0 === $node$$._rt_ctrl) {
      var $lastCtrl_v$$ = $node$$._rt_ctrl;
      delete $node$$._rt_ctrl;
      var $_ref$jscomp$1_constructorName_ctrl$$ = $node$$.dataset.controller;
      if ("undefined" !== typeof($_ref$jscomp$1_constructorName_ctrl$$ = $_ref$jscomp$1_constructorName_ctrl$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2]) {
        var $model_parent$$ = ($model_parent$$ = $node$$.parentNode) ? Silica.getValue($model_parent$$, $_ref$jscomp$1_constructorName_ctrl$$[2]) : Silica.getValue($node$$, $_ref$jscomp$1_constructorName_ctrl$$[2], $node$$._rt_ctx);
        null == $model_parent$$ && ($storeWatchers$$ = !1);
      }
      $_ref$jscomp$1_constructorName_ctrl$$ = $_ref$jscomp$1_constructorName_ctrl$$[1];
      var $constructor_watchers$$ = eval($_ref$jscomp$1_constructorName_ctrl$$);
      if (!$constructor_watchers$$) {
        return console.error("Unknown Controller: " + $node$$.dataset.controller);
      }
      $_ref$jscomp$1_constructorName_ctrl$$ = "undefined" !== typeof $model_parent$$ ? new $constructor_watchers$$($node$$, $model_parent$$) : new $constructor_watchers$$($node$$);
      $constructor_watchers$$ = $constructor_watchers$$.watchers;
      if ($lastCtrl_v$$ && $constructor_watchers$$ && 0 < Object.keys($constructor_watchers$$).length) {
        for ($k$$ in $constructor_watchers$$) {
          let $stored$$ = Silica._watch[$k$$];
          if ($stored$$) {
            for (let $pairIdx$$ = $stored$$.length - 1; 0 <= $pairIdx$$; --$pairIdx$$) {
              $lastCtrl_v$$ === $stored$$[$pairIdx$$][0] && $stored$$.splice($pairIdx$$, 1);
            }
          }
        }
      }
      $node$$._rt_live = !0;
      $node$$._rt_ctrl = $_ref$jscomp$1_constructorName_ctrl$$;
      if ($storeWatchers$$) {
        for ($k$$ in $constructor_watchers$$) {
          $lastCtrl_v$$ = $constructor_watchers$$[$k$$], Silica._watch[$k$$] || (Silica._watch[$k$$] = []), Silica._watch[$k$$].push([$_ref$jscomp$1_constructorName_ctrl$$, $lastCtrl_v$$]);
        }
      }
      if ("function" === typeof $_ref$jscomp$1_constructorName_ctrl$$.onLoad) {
        $_ref$jscomp$1_constructorName_ctrl$$.onLoad();
      }
    }
  }
}
;var module$exports$compilers$model = {};
function module$contents$compilers$model_setValue($activeElement_type$$, $element$$, $value$$) {
  if ($element$$ !== $activeElement_type$$ || "radio" === $element$$.type || "checkbox" === $element$$.type) {
    if ($activeElement_type$$ = $element$$.type, "radio" === $activeElement_type$$) {
      var $option_val$$ = $element$$.value;
      -1 !== $option_val$$.search(/[0-9]/) && ($option_val$$ = parseInt($option_val$$, 10));
      $element$$.checked = $value$$ === $option_val$$;
    } else {
      if ("checkbox" === $activeElement_type$$) {
        $element$$.checked = Silica.getValue($element$$, $element$$.dataset.model);
      } else {
        if ("OPTION" === $element$$.nodeName) {
          $element$$.value = $value$$;
        } else {
          if ("INPUT" === $element$$.nodeName) {
            $element$$.value = $value$$;
          } else {
            if ("SELECT" === $element$$.nodeName) {
              for ($option_val$$ of $element$$.querySelectorAll("option")) {
                $option_val$$.selected = $option_val$$.value == $value$$;
              }
            } else {
              null !== $value$$ ? $value$$.nodeName ? ($element$$.innerHTML = "", $element$$.appendChild($value$$)) : $element$$.innerHTML !== $value$$ && ($element$$.innerHTML = $value$$) : "" !== $element$$.innerHTML && ($element$$.innerHTML = "");
            }
          }
        }
      }
    }
  }
}
module$exports$compilers$model.Updater = function $module$exports$compilers$model$Updater$($activeElement$$, $value$$) {
  $activeElement$$ = document.activeElement || Silica.__activeElement;
  this === $activeElement$$ && "radio" !== this.type && "checkbox" !== this.type || module$contents$compilers$model_setValue($activeElement$$, this, $value$$);
};
module$exports$compilers$model.Compiler = function $module$exports$compilers$model$Compiler$($context$$) {
  $context$$ = Silica.query(this, "[data-model]");
  for (var $elm_i$$ of $context$$) {
    Silica.observer.register($elm_i$$, $elm_i$$.dataset.model, module$exports$compilers$model.Updater);
  }
  for ($elm_i$$ = $context$$.length - 1; 0 <= $elm_i$$; $elm_i$$--) {
    let $elm$$ = $context$$[$elm_i$$], $change$$ = function $$change$$$() {
      var $_ref$$, $_ref1$$, $val$$ = this.value, $ctx$$ = Silica.getContext(this), $model$$ = this.dataset.model;
      "radio" === this.type ? $val$$.match(/[0-9]/) && ($val$$ = parseInt($val$$, 10)) : "checkbox" === this.type && ($val$$ = this.checked);
      if (Silica.isInApply) {
        var $obj$$ = null != ($_ref$$ = this._rt_ctx) ? $_ref$$ : $ctx$$;
        Silica.setPropByString($obj$$, $model$$, $val$$);
      } else {
        if (null != ($_ref$$ = this.dataset.trap)) {
          $obj$$ = null != ($_ref1$$ = this._rt_ctx) ? $_ref1$$ : $ctx$$;
          if ("true" === $_ref$$.toLowerCase()) {
            var $_ref2_scope$$ = this;
          } else {
            for ($_ref2_scope$$ = document, $_ref1$$ = this; $_ref1$$ = $_ref1$$.parentElement;) {
              if ($_ref1$$.classList.contains($_ref$$)) {
                $_ref2_scope$$ = $_ref1$$;
                break;
              }
            }
          }
          Silica.apply(function() {
            return Silica.setPropByString($obj$$, $model$$, $val$$);
          }, $_ref2_scope$$);
        } else {
          $obj$$ = null != ($_ref2_scope$$ = this._rt_ctx) ? $_ref2_scope$$ : $ctx$$, Silica.apply(function() {
            return Silica.setPropByString($obj$$, $model$$, $val$$);
          });
        }
      }
    };
    $elm$$.onchange = $change$$;
    $elm$$.onkeyup = $change$$;
    $elm$$.onsearch = $change$$;
    $elm$$.hasAttribute("x-webkit-speech") && ($elm$$.onwebkitspeechchange = $change$$);
    $elm$$.addEventListener("focus", function() {
      Silica.__activeElement = this;
    });
    $elm$$.addEventListener("blur", function() {
      Silica.__activeElement === this && (Silica.__activeElement = null);
    });
  }
};
function module$contents$compilers$src_defaultSrcForNode($node$$) {
  switch($node$$.nodeName) {
    case "IMG":
      return "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    default:
      return "";
  }
}
function module$contents$compilers$src_SrcUpdater($_$$, $value$$) {
  $value$$ !== this.src && this.setAttribute("src", $value$$ || module$contents$compilers$src_defaultSrcForNode(this));
}
function module$exports$compilers$src($ctx$jscomp$6_nodes$$, $node$jscomp$10_value$$) {
  $ctx$jscomp$6_nodes$$ = Silica.query(this, "[data-src]");
  for (let $i$$ = $ctx$jscomp$6_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$jscomp$10_value$$ = $ctx$jscomp$6_nodes$$[$i$$], Silica.observer.register($node$jscomp$10_value$$, $node$jscomp$10_value$$.dataset.src, module$contents$compilers$src_SrcUpdater);
  }
}
;function module$contents$compilers$generic_AttributeFilter() {
}
module$contents$compilers$generic_AttributeFilter.prototype.acceptNode = function filter($node$$) {
  return Object.keys($node$$.dataset).some(function($key$$) {
    return !$key$$.startsWith("on");
  }) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
};
function module$contents$compilers$generic_createUpdater($attribute$$) {
  return function($_$$, $value$$) {
    "innerHTML" === $attribute$$ || "disabled" === $attribute$$ ? this[$attribute$$] = $value$$ : this.setAttribute($attribute$$, $value$$);
  };
}
function module$exports$compilers$generic() {
  for (var $nodes$$ = document.createNodeIterator(this, NodeFilter.SHOW_ELEMENT, new module$contents$compilers$generic_AttributeFilter), $node$$; $node$$ = $nodes$$.nextNode();) {
    for (let $key$$ of Object.keys($node$$.dataset)) {
      Silica.ignoredAttributes.has($key$$) || (!$key$$.startsWith("on") || 2 < $key$$.length && (90 < $key$$.charCodeAt(2) || 65 > $key$$.charCodeAt(2))) && Silica.observer.register($node$$, $node$$.dataset[$key$$], module$contents$compilers$generic_createUpdater($key$$));
    }
  }
}
function module$contents$compilers$generic_GenericDeprecated() {
  var $nodeList$$ = Silica.query(this, "[data-silica]");
  for (let $i$$ = $nodeList$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $nodeList$$[$i$$];
    if ($node$$._silica_generic) {
      var $entries$$ = $node$$._silica_generic;
    } else {
      $entries$$ = $node$$.dataset.silica, $entries$$ = "[" === $entries$$.charAt(0) ? JSON.parse($entries$$) : [$entries$$], $node$$._silica_generic = $entries$$;
    }
    for (let $j$$ = $entries$$.length - 1; 0 <= $j$$; --$j$$) {
      var $comps_valueKey$$ = $entries$$[$j$$].split("=");
      if (2 !== $comps_valueKey$$.length) {
        console.error("Invalid generic binding", $node$$.dataset.silica, "for node", $node$$);
        return;
      }
      var $attribute$$ = $comps_valueKey$$[0];
      $comps_valueKey$$ = $comps_valueKey$$[1];
      let $value$$ = Silica.getValue($node$$, $comps_valueKey$$);
      "innerHTML" === $attribute$$ || "disabled" === $attribute$$ ? $node$$[$attribute$$] = $value$$ : $node$$.setAttribute($attribute$$, $value$$);
      Silica.observer.register($node$$, $comps_valueKey$$, module$contents$compilers$generic_createUpdater($attribute$$));
    }
  }
  Silica._capture_links(this);
}
;function module$exports$compilers$scroll_finished() {
  var $nodes$$ = Silica.query(this, "[data-on-scroll-finished]");
  for (let $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $nodes$$[$i$$];
    $node$$._rt_live = !0;
    let $element$jscomp$0$$ = this;
    var $onscrollfinished$$ = Silica.debounce(function($element$$, $evt$$) {
      Silica._call($element$$, $evt$$, "scroll-finished");
    }, 50);
    $node$$.onscroll = function $$node$$$onscroll$($evt$$) {
      this.dataset.scroll && Silica._call(this, $evt$$, "scroll");
      $onscrollfinished$$($element$jscomp$0$$, $evt$$);
    };
  }
}
;function module$contents$compilers$event_EventFilter() {
}
module$contents$compilers$event_EventFilter.prototype.acceptNode = function filter($node$$) {
  return Object.keys($node$$.dataset).some(function($key$$) {
    return 3 <= $key$$.length && $key$$.startsWith("on") && 90 >= $key$$.charCodeAt(2) && 65 <= $key$$.charCodeAt(2);
  }) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
};
function module$exports$compilers$event() {
  for (var $nodes$$ = document.createNodeIterator(this, NodeFilter.SHOW_ELEMENT, new module$contents$compilers$event_EventFilter), $node$$; $node$$ = $nodes$$.nextNode();) {
    $node$$._rt_live = !0;
    for (let $key$$ of Object.keys($node$$.dataset)) {
      if (3 <= $key$$.length && $key$$.startsWith("on") && 90 >= $key$$.charCodeAt(2) && 65 <= $key$$.charCodeAt(2)) {
        let $eventName$$ = $key$$.substr(2).toLowerCase();
        $node$$.addEventListener($eventName$$, function($evt$$) {
          Silica._call(this, $evt$$, $key$$);
        });
      }
    }
  }
}
;var module$exports$compilers = {"1_Directive":module$exports$compilers$directives, _if:module$exports$compilers$if, Show:module$exports$compilers$show, Class:module$exports$compilers$class, Include:module$exports$compilers$include, Controller:module$exports$compilers$controller, ClickOutside:module$exports$compilers$clickoutside, Src:module$exports$compilers$src, ScrollFinished:module$exports$compilers$scroll_finished, Generic:module$exports$compilers$generic, Model:module$exports$compilers$model.Compiler, 
Event:module$exports$compilers$event};
class module$exports$controllers$Base {
  constructor($el$$) {
    this.el = $el$$;
    $el$$.parentElement && (this.$ctrl = Silica.getContext($el$$.parentElement));
  }
  $($selector$$) {
    return this.el.querySelectorAll($selector$$);
  }
}
module$exports$controllers$Base.watchers = {};
module$exports$controllers$Base.prototype.$ = module$exports$controllers$Base.prototype.$;
var module$exports$controllers$FSM = {};
class module$contents$controllers$FSM_State {
  onEnter($ctrl$$) {
  }
  onExit($ctrl$$) {
  }
}
module$contents$controllers$FSM_State.prototype.onEnter = module$contents$controllers$FSM_State.prototype.onEnter;
module$contents$controllers$FSM_State.prototype.onExit = module$contents$controllers$FSM_State.prototype.onExit;
class module$contents$controllers$FSM_Controller extends module$exports$controllers$Base {
  constructor($el$$) {
    super($el$$);
    $el$$ = this.constructor.states;
    this._states = {};
    for (const $stateName$$ in $el$$) {
      this._states[$stateName$$] = new $el$$[$stateName$$];
    }
    this.handle = this.handle;
    this.transition = this.transition;
    this._currentState = new module$contents$controllers$FSM_State;
    this._previousStateName = "";
    this.initialState && (this._currentStateName = this.initialState(), this._currentState = this._getStateWithName(this._currentStateName), Silica.defer(() => {
      this._currentState.onEnter(this);
    }));
  }
  static get states() {
    return {base:module$contents$controllers$FSM_State};
  }
  _getStateWithName($stateName$$) {
    let $target$$ = this._states[$stateName$$];
    if (!$target$$) {
      throw Error(`Unknown state ${$stateName$$} in ${this.constructor.name}`);
    }
    return $target$$;
  }
  transition($stateName$$, ...$args$$) {
    let $target$$ = this._getStateWithName($stateName$$);
    $target$$ !== this._currentState && Silica.defer(() => {
      this._previousStateName = this._currentStateName;
      this._currentState.onExit(this);
      this._currentState = $target$$;
      this._currentStateName = $stateName$$;
      Silica.defer(() => {
        this._currentState.onEnter(this, ...$args$$);
      });
    });
  }
  handle($func$$, ...$args$$) {
    if (this._currentState && ($func$$ = this._currentState[$func$$])) {
      return "function" === typeof $func$$ ? $func$$.apply(this._currentState, [this, ...$args$$]) : $func$$;
    }
  }
}
Object.defineProperties(module$contents$controllers$FSM_Controller.prototype, {currentState:{configurable:0, enumerable:0, get:function() {
  return this._currentStateName;
}}, previousState:{configurable:0, enumerable:0, get:function() {
  return this._previousStateName;
}}});
module$exports$controllers$FSM.Controller = module$contents$controllers$FSM_Controller;
module$exports$controllers$FSM.State = module$contents$controllers$FSM_State;
var module$exports$controllers = {Base:module$exports$controllers$Base, FSM:module$exports$controllers$FSM};
var module$exports$hax$safari = {getDatasetProperty:function($element$$, $propName$$) {
  if ($element$$.dataset && "undefined" !== typeof $element$$.dataset && $element$$.dataset[$propName$$]) {
    return $element$$.dataset[$propName$$];
  }
  if ("undefined" !== typeof Reflect) {
    var $dataset_value$$ = Reflect.get($element$$, "dataset");
    if ($dataset_value$$ && ($dataset_value$$ = Reflect.get(Object($dataset_value$$), $propName$$))) {
      return $dataset_value$$;
    }
  }
  return $element$$.getAttribute("data-" + $propName$$);
}, hasDatasetProperty:function($element$$, $propName$$) {
  return !!(0,module$exports$hax$safari.getDatasetProperty)($element$$, $propName$$);
}};
var module$exports$hax = {};
const module$contents$hax_reduce = Function.bind.call(Function.call, Array.prototype.reduce), module$contents$hax_isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable), module$contents$hax_concat = Function.bind.call(Function.call, Array.prototype.concat), module$contents$hax_keys = Reflect.ownKeys;
module$exports$hax.init = function $module$exports$hax$init$() {
  Object.values || (Object.values = function values($O$$) {
    return module$contents$hax_reduce(module$contents$hax_keys($O$$), ($v$$, $k$$) => module$contents$hax_concat($v$$, "string" === typeof $k$$ && module$contents$hax_isEnumerable($O$$, $k$$) ? [$O$$[$k$$]] : []), []);
  });
  Object.entries || (Object.entries = function entries($O$$) {
    return module$contents$hax_reduce(module$contents$hax_keys($O$$), ($e$$, $k$$) => module$contents$hax_concat($e$$, "string" === typeof $k$$ && module$contents$hax_isEnumerable($O$$, $k$$) ? [[$k$$, $O$$[$k$$]]] : []), []);
  });
  Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {value:function($searchElement$$, $fromIndex_k$jscomp$8_n$$) {
    if (null == this) {
      throw new TypeError('"this" is null or not defined');
    }
    var $o$$ = Object(this), $len$$ = $o$$.length >>> 0;
    if (0 === $len$$) {
      return !1;
    }
    $fromIndex_k$jscomp$8_n$$ |= 0;
    for ($fromIndex_k$jscomp$8_n$$ = Math.max(0 <= $fromIndex_k$jscomp$8_n$$ ? $fromIndex_k$jscomp$8_n$$ : $len$$ - Math.abs($fromIndex_k$jscomp$8_n$$), 0); $fromIndex_k$jscomp$8_n$$ < $len$$;) {
      var $x$$ = $o$$[$fromIndex_k$jscomp$8_n$$], $y$$ = $searchElement$$;
      if ($x$$ === $y$$ || "number" === typeof $x$$ && "number" === typeof $y$$ && isNaN($x$$) && isNaN($y$$)) {
        return !0;
      }
      $fromIndex_k$jscomp$8_n$$++;
    }
    return !1;
  }});
};
module$exports$hax.getDatasetProperty = module$exports$hax$safari.getDatasetProperty;
module$exports$hax.hasDatasetProperty = module$exports$hax$safari.hasDatasetProperty;
var module$exports$silica$pubsub = {}, module$contents$silica$pubsub_subscriptions = new Map, module$contents$silica$pubsub_subscriptionID = 1, module$contents$silica$pubsub_subscriptionSeparator = "[--+--]";
function module$contents$silica$pubsub_nextSubscriptionID() {
  return module$contents$silica$pubsub_subscriptionID++;
}
module$exports$silica$pubsub.Sub = function $module$exports$silica$pubsub$Sub$($channel$$, $handler$$, $context$$ = document) {
  let $subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$);
  $subs$$ || ($subs$$ = new Map, module$contents$silica$pubsub_subscriptions.set($channel$$, $subs$$));
  let $id$$ = module$contents$silica$pubsub_nextSubscriptionID();
  $subs$$.set($id$$, [$handler$$, $context$$]);
  return `${$channel$$}${module$contents$silica$pubsub_subscriptionSeparator}${$id$$}`;
};
module$exports$silica$pubsub.Pub = function $module$exports$silica$pubsub$Pub$($channel$$, ...$args$$) {
  let $subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$);
  $subs$$ && setTimeout(function() {
    for (let [, $value$$] of $subs$$) {
      Silica.enqueue(function() {
        $value$$[0](...$args$$);
      }, $value$$[1]);
    }
  }, 0);
};
module$exports$silica$pubsub.Unsub = function $module$exports$silica$pubsub$Unsub$($subs$$) {
  let [$channel$$, $id$$] = $subs$$.split(module$contents$silica$pubsub_subscriptionSeparator);
  if ($subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$)) {
    $subs$$.delete(parseInt($id$$, 10)), 0 === $subs$$.size && module$contents$silica$pubsub_subscriptions.delete($channel$$);
  }
};
function module$exports$watchers$if() {
  var $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$, $k$$, $negate$$, $_len$$, $wrapper$$ = document.createElement("div");
  var $_ref$jscomp$0$$ = Silica._ifs;
  for ($k$$ in $_ref$jscomp$0$$) {
    var $elements$$ = $_ref$jscomp$0$$[$k$$];
    var $raw$$ = $k$$;
    ($negate$$ = "!" === $k$$[0]) && ($k$$ = $k$$.substr(1));
    var $i$$ = 0;
    for ($_len$$ = $elements$$.length; $i$$ < $_len$$; ++$i$$) {
      let $element$$ = $elements$$[$i$$];
      if ($element$$ === this || Silica.isDescendent(this, $element$$)) {
        if ($comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = Silica._show($element$$, $k$$, $negate$$)) {
          if (8 === $element$$.nodeType) {
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = document.createElement("div");
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$.innerHTML = $element$$.nodeValue;
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = Silica.compile($comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$.firstElementChild, !1, Silica.getContext($element$$.parentElement));
            $element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$, $element$$);
            Silica._ifs[$raw$$][$i$$] = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$;
            let $_ref$$;
            if (null != ($_ref$$ = Silica.getContext($comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$)) && "function" === typeof $_ref$$.onLoad && $_ref$$.el === $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$) {
              $_ref$$.onLoad();
            }
          }
        } else {
          if (8 !== $element$$.nodeType) {
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = Silica.queryWithComments($element$$, "[data-if]");
            let $subNode$$;
            for (var $j$jscomp$5_j$$ = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$.length - 1; 0 <= $j$jscomp$5_j$$; --$j$jscomp$5_j$$) {
              let $prop$$, $_ref1$$;
              $subNode$$ = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$[$j$jscomp$5_j$$];
              8 !== $subNode$$.nodeType || $subNode$$.dataset ? $prop$$ = $subNode$$.dataset["if"] : ($wrapper$$.innerHTML = $subNode$$.data, $prop$$ = $wrapper$$.firstChild.dataset["if"]);
              var $list$jscomp$2_list$$ = Silica._shws[$prop$$];
              Silica._shws[$prop$$] = null != ($_ref1$$ = null != $list$jscomp$2_list$$ ? $list$jscomp$2_list$$.filter(function($obj$$) {
                return !$obj$$ === $subNode$$;
              }) : void 0) ? $_ref1$$ : [];
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = Silica.query($element$$, "[data-controller]");
            for ($j$jscomp$5_j$$ = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$.length - 1; 0 <= $j$jscomp$5_j$$; --$j$jscomp$5_j$$) {
              let $ctrl$$;
              $subNode$$ = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$[$j$jscomp$5_j$$];
              $ctrl$$ = $subNode$$._rt_ctrl;
              for ($k$$ in null != $ctrl$$ ? $ctrl$$.constructor.watchers : void 0) {
                $list$jscomp$2_list$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$jscomp$2_list$$ ? $list$jscomp$2_list$$.filter(function($obj$$) {
                  return $obj$$[0] !== $ctrl$$;
                }) : [];
              }
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$ = document.createComment($element$$.outerHTML);
            $element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$, $element$$);
            Silica._ifs[$raw$$][$i$$] = $comment$jscomp$1_compiled_isVisible$jscomp$1_subNodes$jscomp$1_temp$$;
          }
        }
      }
    }
  }
}
;function module$exports$watchers$repeat() {
  var $_ref$$, $elements$$ = Silica.querySorted(this, "[data-repeat]");
  for (let $i$$ = 0, $length$$ = $elements$$.length; $i$$ < $length$$; ++$i$$) {
    var $raw$$ = $elements$$[$i$$];
    var $ctx$$ = $raw$$.dataset.repeat.split(/\s+in\s+/);
    var $list$jscomp$4_newList_param$$ = $ctx$$[1];
    var $model$$ = $ctx$$[0];
    $ctx$$ = Silica.getContext($raw$$);
    let $possiblyNested$$ = !$raw$$.dataset.repeatNotNested;
    "undefined" !== typeof($_ref$$ = $list$jscomp$4_newList_param$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] ? ($list$jscomp$4_newList_param$$ = $_ref$$[2], $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$.parentNode, $list$jscomp$4_newList_param$$), $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$, $_ref$$[1], null, $list$jscomp$4_newList_param$$)) : $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$, $list$jscomp$4_newList_param$$);
    $_ref$$ = $raw$$.childNodes;
    if ($list$jscomp$4_newList_param$$) {
      $list$jscomp$4_newList_param$$.constructor === Number && ($list$jscomp$4_newList_param$$ = Array($list$jscomp$4_newList_param$$));
      var $obj$jscomp$32_template$$ = Silica._repeat_templates[module$exports$hax$safari.getDatasetProperty($raw$$, "siO2TemplateId")];
      if ($list$jscomp$4_newList_param$$.constructor === Object) {
        var $context$jscomp$3_keys$$ = Object.keys($list$jscomp$4_newList_param$$);
        var $_i_child_obj$$ = $list$jscomp$4_newList_param$$;
        $list$jscomp$4_newList_param$$ = [];
        for (let $j$$ = 0, $len$$ = $context$jscomp$3_keys$$.length, $key$$ = $context$jscomp$3_keys$$[$j$$]; $j$$ < $len$$; $j$$++) {
          $key$$ = $context$jscomp$3_keys$$[$j$$], $list$jscomp$4_newList_param$$[$j$$] = {key:$key$$, value:$_i_child_obj$$[$key$$]};
        }
      }
      var $_len$$ = $raw$$.childElementCount - $list$jscomp$4_newList_param$$.length;
      for (var $fragment$jscomp$1_node$$; 0 < $_len$$;) {
        Silica.removeFromDOM($_ref$$[$_len$$ - 1]), --$_len$$;
      }
      for ($fragment$jscomp$1_node$$ = document.createDocumentFragment(); 0 > $_len$$;) {
        $context$jscomp$3_keys$$ = {};
        $context$jscomp$3_keys$$[$model$$] = $list$jscomp$4_newList_param$$[$list$jscomp$4_newList_param$$.length + $_len$$];
        $context$jscomp$3_keys$$.$ctrl = $ctx$$;
        $_i_child_obj$$ = $obj$jscomp$32_template$$.cloneNode(!0);
        $_i_child_obj$$._rt_ctx = $context$jscomp$3_keys$$;
        for (let $key$$ in Silica.compilers) {
          Silica.compilers[$key$$].call($_i_child_obj$$);
        }
        $fragment$jscomp$1_node$$.appendChild($_i_child_obj$$);
        ++$_len$$;
      }
      $fragment$jscomp$1_node$$.hasChildNodes() && $raw$$.appendChild($fragment$jscomp$1_node$$);
      $_i_child_obj$$ = 0;
      for ($_len$$ = $list$jscomp$4_newList_param$$.length; $_i_child_obj$$ < $_len$$; $_i_child_obj$$++) {
        $obj$jscomp$32_template$$ = $list$jscomp$4_newList_param$$[$_i_child_obj$$];
        $fragment$jscomp$1_node$$ = $_ref$$[$_i_child_obj$$];
        let $modelChanged$$ = $model$$ !== $obj$jscomp$32_template$$;
        $fragment$jscomp$1_node$$._rt_ctx ? $fragment$jscomp$1_node$$._rt_ctx[$model$$] = $obj$jscomp$32_template$$ : ($context$jscomp$3_keys$$ = {}, $context$jscomp$3_keys$$[$model$$] = $obj$jscomp$32_template$$, $context$jscomp$3_keys$$.$ctrl = $ctx$$, $fragment$jscomp$1_node$$._rt_ctx = $context$jscomp$3_keys$$);
        $modelChanged$$ && module$exports$compilers$controller.call($fragment$jscomp$1_node$$, $fragment$jscomp$1_node$$._rt_ctx, !0);
        $fragment$jscomp$1_node$$._rt_ctx.index = $_i_child_obj$$;
        $possiblyNested$$ && module$exports$watchers$repeat.call($fragment$jscomp$1_node$$);
      }
      "SELECT" === $raw$$.nodeName && $raw$$.dataset.model && module$exports$compilers$model.Updater.call($raw$$, $ctx$$, Silica.getValue($raw$$, $raw$$.dataset.model));
      $ctx$$.renderedRepeat ? $ctx$$.renderedRepeat($raw$$) : $ctx$$.$ctrl && $ctx$$.$ctrl.renderedRepeat && $ctx$$.$ctrl.renderedRepeat($raw$$);
    } else {
      for (; 0 < $raw$$.childNodes.length;) {
        Silica.removeFromDOM($raw$$.childNodes[0]);
      }
    }
  }
}
;var module$exports$watchers = {};
module$exports$watchers._If = module$exports$watchers$if;
module$exports$watchers.Repeat = module$exports$watchers$repeat;
let module$contents$watchers$observer_IO = null;
module$contents$watchers$observer_IO = "undefined" === typeof window.IntersectionObserver ? class {
  constructor($callback$$) {
    this.callback = $callback$$;
  }
  observe($node$$) {
    this.callback({target:$node$$, isIntersecting:!0});
  }
} : window.IntersectionObserver;
class module$exports$watchers$observer {
  constructor() {
    this.mapping = new Map;
    this.liveNodes = new Set;
    this.hiddenNodes = new Set;
    this.visibilityObserver = new module$contents$watchers$observer_IO(($entries$$) => {
      $entries$$.forEach(($entry$$) => {
        $entry$$.isIntersecting ? (this.liveNodes.add($entry$$.target), this.hiddenNodes.delete($entry$$.target)) : (this.liveNodes.delete($entry$$.target), $entry$$.target.classList.contains("hidden") && this.hiddenNodes.add($entry$$.target));
      });
      this.applyChanges();
    });
  }
  clone($obj$$) {
    if (null === $obj$$ || void 0 === $obj$$) {
      return null;
    }
    if ("object" !== typeof $obj$$ || $obj$$ instanceof Date) {
      return $obj$$;
    }
    var $clone$$ = new $obj$$.constructor, $i$$;
    for ($i$$ in $obj$$) {
      $clone$$[$i$$] = null != $obj$$[$i$$] && "object" === typeof $obj$$[$i$$] ? this.clone($obj$$[$i$$]) : $obj$$[$i$$];
    }
    return $clone$$;
  }
  deregister($map_node$$, $packet_property$$, $actor$$) {
    ($map_node$$ = this.mapping.get($map_node$$)) && ($packet_property$$ = $map_node$$.get($packet_property$$)) && $packet_property$$.actors.delete($actor$$);
  }
  register($node$$, $property$$, $actor$$) {
    let [$filtered$$, $raw$$, $paramKeys$$] = Silica.getFilteredValue($node$$, $property$$), $value$$ = this.clone($raw$$), $map$$ = this.mapping.get($node$$);
    $map$$ || ($map$$ = new Map, this.mapping.set($node$$, $map$$), this.visibilityObserver.observe($node$$));
    let $packet$$ = $map$$.get($property$$);
    $packet$$ ? $packet$$.actors.add($actor$$) : ($packet$$ = {value:$value$$, actors:new Set([$actor$$]), params:$paramKeys$$}, $map$$.set($property$$, $packet$$));
    $actor$$.call($node$$, null, $filtered$$);
    return $filtered$$;
  }
  applyChanges() {
    this.hiddenNodes.forEach(($node$$) => {
      this.mapping.get($node$$).forEach(($packet$$, $property$$) => {
        $packet$$.actors.has(module$exports$compilers$show) && ($property$$ = Silica.getFilteredValue($node$$, $property$$, $packet$$.value, $packet$$.params)) && !Object.is($packet$$.value, $property$$[1]) && ($packet$$.value = this.clone($property$$[1]), module$exports$compilers$show.call($node$$, null, $property$$[0]), this.liveNodes.add($node$$));
      });
    });
    this.liveNodes.forEach(($node$$) => {
      this.mapping.get($node$$).forEach(($packet$$, $property$jscomp$15_result$$) => {
        if (($property$jscomp$15_result$$ = Silica.getFilteredValue($node$$, $property$jscomp$15_result$$, $packet$$.value, $packet$$.params)) && !Object.is($packet$$.value, $property$jscomp$15_result$$[1])) {
          $packet$$.value = this.clone($property$jscomp$15_result$$[1]);
          for (let $actor$$ of $packet$$.actors.values()) {
            $actor$$.call($node$$, null, $property$jscomp$15_result$$[0]);
          }
        }
      });
    });
  }
}
;var module$exports$silica = {};
module$exports$hax.init();
window.Silica = {context:window, contextName:"", directives:{}, components:{}, filters:{}, router:null, _ifs:{}, _shws:{}, _watch:{}, _repeat_templates:{}, _template_id:1, _isReady:!1, _appRoot:null, _defers:[], _includeCache:{}, _clickOutElements:new Set, _queue:[], usePushState:!0, observer:new module$exports$watchers$observer, ignoredAttributes:new Set("filter class show if model include controller repeat onScrollFinished repeatNotNested siO2IncludedUrl src siO2HardClass noStopPropagation noPreventDefault siO2TemplateId".split(" ")), 
version:"0.60.0-alpha", setContext($contextName$$) {
  this.contextName = $contextName$$;
  this.context = window[$contextName$$];
}, ignore($keys$$) {
  Silica.ignoredAttributes = new Set([...Silica.ignoredAttributes].concat($keys$$));
}, setRouter($router$$) {
  Silica.router = $router$$;
  window.onhashchange = () => {
    this.apply(() => Silica.router.route(window.location.hash));
  };
  Silica.usePushState && (window.onpopstate = () => {
    this.apply(() => Silica.router.route(Silica.usePushState ? window.location.pathname : window.location.hash));
  });
}, goTo($pathname$$) {
  if (Silica.usePushState) {
    history.pushState(null, "", $pathname$$);
    var $route$$ = $pathname$$;
  } else {
    window.window.location.hash = "#" + $pathname$$, $route$$ = window.window.location.hash;
  }
  Silica.router && Silica.apply(function() {
    Silica.router.route($route$$);
  });
}, compile($element$$, $flush$$ = !0, $context$$ = null, $onlySafe$$ = !1, $storeWatchers$$ = !0) {
  null === Silica._appRoot && (Silica._appRoot = $element$$);
  if (8 !== $element$$.nodeType) {
    $element$$ === document ? ($element$$ = document.documentElement, $context$$ = $context$$ || {}) : $context$$ = $context$$ || Silica.getContext($element$$);
    Silica.cacheTemplates($element$$);
    for (let $key$$ in Silica.compilers) {
      $onlySafe$$ & "_" === $key$$[0] || ("Controller" === $key$$ ? Silica.compilers[$key$$].apply($element$$, [$context$$, !1, $storeWatchers$$]) : Silica.compilers[$key$$].apply($element$$, [$context$$]));
    }
    $flush$$ && Silica.flush($element$$, !0);
    Silica._capture_links($element$$);
    $element$$ === Silica._appRoot && (Silica._isReady = !0);
    return $element$$;
  }
}, cacheTemplates($element$jscomp$20_nodes$$) {
  $element$jscomp$20_nodes$$ = $element$jscomp$20_nodes$$.querySelectorAll("[data-repeat]");
  for (let $i$$ = $element$jscomp$20_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $element$jscomp$20_nodes$$[$i$$];
    if (!module$exports$hax$safari.hasDatasetProperty($node$$, "siO2TemplateId")) {
      let $nextTemplateId$$ = Silica._template_id++;
      if (1 === $node$$.children.length) {
        Silica._repeat_templates[$nextTemplateId$$] = $node$$.removeChild($node$$.firstElementChild);
      } else {
        console.warn("Repeat has multiple children, wrapping with div", $node$$);
        var $context$$ = document.createElement("div");
        $context$$.innerHTML = $node$$.innerHTML;
        Silica._repeat_templates[$nextTemplateId$$] = $context$$;
      }
      $node$$.dataset.siO2TemplateId = $nextTemplateId$$;
      $context$$ = {};
      $context$$.$ctrl = Silica.getContext($node$$);
      Silica._repeat_templates[$nextTemplateId$$] = Silica.compile(Silica._repeat_templates[$nextTemplateId$$], !1, $context$$, !0, !1);
      $node$$.innerHTML = "";
    }
  }
}, debounce($func$$, $wait$$, $immediate$$) {
  var $timeout$$;
  return function() {
    var $context$$ = this, $args$$ = arguments, $callNow$$ = $immediate$$ && !$timeout$$;
    clearTimeout($timeout$$);
    $timeout$$ = setTimeout(function() {
      $timeout$$ = null;
      $immediate$$ || $func$$.apply($context$$, $args$$);
    }, $wait$$);
    $callNow$$ && $func$$.apply($context$$, $args$$);
  };
}, defer($func$$) {
  Silica._defers.push($func$$);
}, processQueue() {
  for (let $i$$ = 0, $len$$ = Silica._queue.length; $i$$ < $len$$; $i$$++) {
    let $item$$ = Silica._queue[$i$$];
    Silica.apply(function() {
      $item$$[0]();
    }, $item$$[1]);
  }
  Silica._queue = [];
}, enqueue($func$$, $scope$$) {
  Silica._queue.push([$func$$, $scope$$]);
  Silica.processQueue();
}, updateDOM($element$$, $onlySafe$$) {
  let $watchers$$ = Silica.watchers, $func$$;
  for (let $k$$ in $watchers$$) {
    $onlySafe$$ && "_" === $k$$[0] || ($func$$ = $watchers$$[$k$$], $func$$.apply($element$$));
  }
  Silica.observer.applyChanges();
}, flush($element$$ = document.documentElement, $onlySafe$$ = !1, $changed$$ = null, $skipSchedule$$ = !1) {
  if (Silica.isInFlush && !$skipSchedule$$) {
    if (Silica._scheduledFlush) {
      return;
    }
    Silica._scheduledFlush = !0;
  }
  $element$$ === document && ($element$$ = document.documentElement);
  Silica.isInFlush = !$skipSchedule$$;
  if (null === $changed$$ && Silica._isReady) {
    for ($i$jscomp$22_key$$ in Silica._watch) {
      $changed$$ = Silica._watch[$i$jscomp$22_key$$];
      for (var $funcs$jscomp$1_i$$ = $changed$$.length - 1; 0 <= $funcs$jscomp$1_i$$; --$funcs$jscomp$1_i$$) {
        var $func$jscomp$8_k$$ = $changed$$[$funcs$jscomp$1_i$$];
        $func$jscomp$8_k$$[1].apply($func$jscomp$8_k$$[0], [$func$jscomp$8_k$$[2], $func$jscomp$8_k$$[3]]);
      }
    }
  } else {
    let $func$$;
    for ($func$jscomp$8_k$$ in $changed$$) {
      $funcs$jscomp$1_i$$ = $changed$$[$func$jscomp$8_k$$];
      if (!0 !== $funcs$jscomp$1_i$$) {
        var $i$jscomp$22_key$$ = $funcs$jscomp$1_i$$.length - 1;
      } else {
        $funcs$jscomp$1_i$$ = Silica._watch[$func$jscomp$8_k$$], $i$jscomp$22_key$$ = $funcs$jscomp$1_i$$.length - 1;
      }
      for (; 0 <= $i$jscomp$22_key$$; --$i$jscomp$22_key$$) {
        $func$$ = $funcs$jscomp$1_i$$[$i$jscomp$22_key$$], $func$$[1].apply($func$$[0], [$func$$[2], $func$$[3]]);
      }
    }
  }
  Silica.updateDOM($element$$, $onlySafe$$);
  Silica.isInFlush = $skipSchedule$$;
  !0 !== Silica._scheduledFlush || $skipSchedule$$ || (Silica._scheduledFlush = !1, window.setTimeout(function() {
    Silica.flush(document, !1, {});
  }, 20));
  return Silica;
}, apply($func$$, $element$$ = document) {
  if (Silica.isInApply) {
    return $func$$.call(), Silica;
  }
  window.requestAnimationFrame(() => {
    var $k$$, $additional_oldVal$$, $val$$, $_len1_watcher$$;
    Silica.isInApply = !0;
    try {
      $func$$.call();
    } catch ($err$$) {
      return Silica.isInApply = !1, console.error($err$$), Silica;
    }
    var $changes$$ = {};
    for ($k$jscomp$13_v$$ in Silica._watch) {
      let $watchers$$ = Silica._watch[$k$jscomp$13_v$$];
      $changes$$[$k$jscomp$13_v$$] = [];
      if (97 <= $k$jscomp$13_v$$.charCodeAt(0)) {
        var $_j_finalChanges$$ = 0;
        for ($_len1_watcher$$ = $watchers$$.length; $_j_finalChanges$$ < $_len1_watcher$$; $_j_finalChanges$$++) {
          let $watcher$$ = $watchers$$[$_j_finalChanges$$];
          if ($k$jscomp$13_v$$.match(/\.\*$/)) {
            $changes$$[$k$jscomp$13_v$$].push($watcher$$);
          } else {
            $watcher$$[3] = $additional_oldVal$$ = $watcher$$[2];
            $watcher$$[2] = $val$$ = Silica.getPropByString($watcher$$[0], $k$jscomp$13_v$$);
            var $_len$jscomp$2_changed$$ = $additional_oldVal$$ !== $val$$;
            !$_len$jscomp$2_changed$$ && Array.isArray($val$$) && Array.isArray($additional_oldVal$$) && (($_len$jscomp$2_changed$$ = $additional_oldVal$$ && $val$$ ? $additional_oldVal$$.length !== $val$$.length : !0) || ($_len$jscomp$2_changed$$ = $additional_oldVal$$.some(function($e$$, $idx$$) {
              return $val$$[$idx$$] !== $e$$;
            })));
            $_len$jscomp$2_changed$$ && $changes$$[$k$jscomp$13_v$$].push($watcher$$);
          }
        }
      } else {
        if ($_len1_watcher$$ = $watchers$$[0], $_len1_watcher$$[3] = $additional_oldVal$$ = $_len1_watcher$$[2], $_len1_watcher$$[2] = $val$$ = Silica.getPropByString(window, $k$jscomp$13_v$$), $_len$jscomp$2_changed$$ = $val$$ !== $additional_oldVal$$, !$_len$jscomp$2_changed$$ && Array.isArray($val$$) && Array.isArray($additional_oldVal$$) && (($_len$jscomp$2_changed$$ = $additional_oldVal$$ && $val$$ ? $additional_oldVal$$.length !== $val$$.length : !0) || ($_len$jscomp$2_changed$$ = $additional_oldVal$$.some(function($e$$, 
        $idx$$) {
          return $val$$[$idx$$] !== $e$$;
        }))), $_len$jscomp$2_changed$$) {
          for ($changes$$[$k$jscomp$13_v$$].push($_len1_watcher$$), $_j_finalChanges$$ = 1, $_len$jscomp$2_changed$$ = $watchers$$.length; $_j_finalChanges$$ < $_len$jscomp$2_changed$$; $_j_finalChanges$$++) {
            $additional_oldVal$$ = $watchers$$[$_j_finalChanges$$], $additional_oldVal$$[2] = $_len1_watcher$$[2], $additional_oldVal$$[3] = $_len1_watcher$$[3], $changes$$[$k$jscomp$13_v$$].push($additional_oldVal$$);
          }
        }
      }
    }
    $_j_finalChanges$$ = {};
    for ($k$$ in $changes$$) {
      var $k$jscomp$13_v$$ = $changes$$[$k$$];
      Array.isArray($k$jscomp$13_v$$) && $k$jscomp$13_v$$.length && ($_j_finalChanges$$[$k$$] = $k$jscomp$13_v$$);
    }
    Silica.flush($element$$, !1, $_j_finalChanges$$);
    Silica.isInApply = !1;
    let $defers$$ = Silica._defers;
    Silica._defers = [];
    $defers$$.length && Silica.apply(() => {
      for (let $i$$ = $defers$$.length - 1; 0 <= $i$$; $i$$--) {
        $defers$$[$i$$].call();
      }
    });
  });
  return Silica;
}, getPropByString($obj$$, $context$jscomp$7_descriptor$$, $params$$) {
  if (!$context$jscomp$7_descriptor$$ || 0 === $context$jscomp$7_descriptor$$.length) {
    return $obj$$;
  }
  void 0 === $obj$$.__property_map && ($obj$$.__property_map = {});
  let $negate$$ = "!" === $context$jscomp$7_descriptor$$[0];
  $negate$$ && ($context$jscomp$7_descriptor$$ = $context$jscomp$7_descriptor$$.substr(1));
  let $propertyPath$$;
  $obj$$.__property_map.hasOwnProperty($context$jscomp$7_descriptor$$) ? $propertyPath$$ = $obj$$.__property_map[$context$jscomp$7_descriptor$$] : ($propertyPath$$ = $context$jscomp$7_descriptor$$.split("."), $obj$$.__property_map[$context$jscomp$7_descriptor$$] = $propertyPath$$);
  $context$jscomp$7_descriptor$$ = Object.getOwnPropertyDescriptor($obj$$, $propertyPath$$[0]);
  if (!$context$jscomp$7_descriptor$$ || !$context$jscomp$7_descriptor$$.get) {
    for (; "undefined" === typeof $obj$$[$propertyPath$$[0]];) {
      if ($obj$$.$ctrl) {
        $obj$$ = $obj$$.$ctrl;
      } else {
        return $negate$$ ? !0 : null;
      }
    }
  }
  let $pathLength$$ = $propertyPath$$.length;
  for (let $i$$ = 0; $i$$ < $pathLength$$; ++$i$$) {
    if ($context$jscomp$7_descriptor$$ = $obj$$, $obj$$ = $obj$$[$propertyPath$$[$i$$]], "function" === typeof $obj$$ && ($obj$$ = $obj$$.apply($context$jscomp$7_descriptor$$, $params$$)), null === $obj$$ || void 0 === $obj$$) {
      return $negate$$ ? !0 : null;
    }
  }
  return $negate$$ ? !$obj$$ : $obj$$;
}, getValue($param$jscomp$4_raw$$, $propString$$, $context$jscomp$8_ctx$$ = null, $params$$ = []) {
  var $idx$jscomp$2_temp$$ = "!" === $propString$$[0] ? 1 : 0;
  $context$jscomp$8_ctx$$ = $context$jscomp$8_ctx$$ || (90 >= $propString$$.charCodeAt($idx$jscomp$2_temp$$) ? window : Silica.getContext($param$jscomp$4_raw$$));
  8 !== $param$jscomp$4_raw$$.nodeType ? $param$jscomp$4_raw$$ = $param$jscomp$4_raw$$.dataset.parameter : ($idx$jscomp$2_temp$$ = document.createElement("div"), $idx$jscomp$2_temp$$.innerHTML = $param$jscomp$4_raw$$.data, $param$jscomp$4_raw$$ = module$exports$hax$safari.getDatasetProperty($idx$jscomp$2_temp$$.firstElementChild || $idx$jscomp$2_temp$$, "parameter"));
  $param$jscomp$4_raw$$ && $params$$.push($param$jscomp$4_raw$$);
  return Silica.getPropByString($context$jscomp$8_ctx$$, $propString$$, $params$$);
}, isChildOf($child$$, $parent$$) {
  for (; $child$$;) {
    if ($child$$.parentElement === $parent$$) {
      return !0;
    }
    $child$$ = $child$$.parentElement;
  }
  return !1;
}, isInDOM($element$$) {
  for (; null != $element$$.parentElement && !$element$$._deleted;) {
    if ($element$$.parentElement == document.documentElement) {
      return !0;
    }
    $element$$ = $element$$.parentElement;
  }
  return !1;
}, setPropByString($ctx$jscomp$9_obj$$, $_i$jscomp$1_propString$$, $value$$) {
  var $_len$$;
  if (!$_i$jscomp$1_propString$$) {
    return $ctx$jscomp$9_obj$$;
  }
  var $paths$$ = $_i$jscomp$1_propString$$.split(".");
  var $key$$ = $paths$$[$paths$$.length - 1];
  $ctx$jscomp$9_obj$$ = 90 >= $_i$jscomp$1_propString$$.charCodeAt(0) ? window : !$ctx$jscomp$9_obj$$.hasOwnProperty($paths$$[0]) && "function" !== typeof $ctx$jscomp$9_obj$$[$paths$$[0]] && $ctx$jscomp$9_obj$$.$ctrl ? $ctx$jscomp$9_obj$$.$ctrl : $ctx$jscomp$9_obj$$;
  $_i$jscomp$1_propString$$ = 0;
  for ($_len$$ = $paths$$.length; $_i$jscomp$1_propString$$ < $_len$$; $_i$jscomp$1_propString$$++) {
    var $hook_prop$$ = $paths$$[$_i$jscomp$1_propString$$];
    $hook_prop$$ !== $key$$ && ($ctx$jscomp$9_obj$$ = "function" === typeof $ctx$jscomp$9_obj$$[$hook_prop$$] ? $ctx$jscomp$9_obj$$[$hook_prop$$].call($ctx$jscomp$9_obj$$) : $ctx$jscomp$9_obj$$[$hook_prop$$]);
  }
  $key$$ = $ctx$jscomp$9_obj$$[$hook_prop$$];
  $ctx$jscomp$9_obj$$[$hook_prop$$] = $value$$;
  ($hook_prop$$ = $ctx$jscomp$9_obj$$[$hook_prop$$ + "_changed"]) && $hook_prop$$.call($ctx$jscomp$9_obj$$, $key$$, $value$$);
}, addFilter($key$$, $func$$) {
  Silica.filters[$key$$] = $func$$;
}, addDirective($key$$, $obj$$) {
  Silica.directives[$key$$] = $obj$$;
}, getContext($raw$jscomp$5_v$$) {
  for (var $constructorName$jscomp$1_ctrl$$, $k$$, $_ref$jscomp$7_constructor$$, $model$jscomp$3_stored$jscomp$1_watchers$$, $needsModel_pairIdx$$;;) {
    if ($raw$jscomp$5_v$$._rt_ctx) {
      return $raw$jscomp$5_v$$._rt_ctx;
    }
    if ($raw$jscomp$5_v$$._rt_ctrl) {
      return $raw$jscomp$5_v$$._rt_ctrl;
    }
    if (9 !== $raw$jscomp$5_v$$.nodeType && 3 !== $raw$jscomp$5_v$$.nodeType && 8 !== $raw$jscomp$5_v$$.nodeType && module$exports$hax$safari.hasDatasetProperty($raw$jscomp$5_v$$, "controller")) {
      $constructorName$jscomp$1_ctrl$$ = module$exports$hax$safari.getDatasetProperty($raw$jscomp$5_v$$, "controller");
      "undefined" !== typeof($_ref$jscomp$7_constructor$$ = $constructorName$jscomp$1_ctrl$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] && ($needsModel_pairIdx$$ = !0, $model$jscomp$3_stored$jscomp$1_watchers$$ = Silica.getValue($raw$jscomp$5_v$$.parentNode, $_ref$jscomp$7_constructor$$[2]));
      $constructorName$jscomp$1_ctrl$$ = $_ref$jscomp$7_constructor$$[1];
      $_ref$jscomp$7_constructor$$ = eval($constructorName$jscomp$1_ctrl$$);
      if (!$_ref$jscomp$7_constructor$$) {
        return console.error("Unknown Controller: " + $raw$jscomp$5_v$$.dataset.controller);
      }
      $constructorName$jscomp$1_ctrl$$ = "undefined" !== typeof $model$jscomp$3_stored$jscomp$1_watchers$$ ? new $_ref$jscomp$7_constructor$$($raw$jscomp$5_v$$, $model$jscomp$3_stored$jscomp$1_watchers$$) : new $_ref$jscomp$7_constructor$$($raw$jscomp$5_v$$);
      if (!$needsModel_pairIdx$$ ^ null != $model$jscomp$3_stored$jscomp$1_watchers$$) {
        $model$jscomp$3_stored$jscomp$1_watchers$$ = $_ref$jscomp$7_constructor$$.watchers;
        if ($raw$jscomp$5_v$$._rt_ctrl && $model$jscomp$3_stored$jscomp$1_watchers$$ && 0 < Object.keys($model$jscomp$3_stored$jscomp$1_watchers$$).length) {
          for ($k$$ in $model$jscomp$3_stored$jscomp$1_watchers$$) {
            if ($model$jscomp$3_stored$jscomp$1_watchers$$ = Silica._watch[$k$$]) {
              for ($needsModel_pairIdx$$ = $model$jscomp$3_stored$jscomp$1_watchers$$.length - 1; 0 <= $needsModel_pairIdx$$; --$needsModel_pairIdx$$) {
                if ($raw$jscomp$5_v$$._rt_ctrl == $model$jscomp$3_stored$jscomp$1_watchers$$[$needsModel_pairIdx$$][0]) {
                  $model$jscomp$3_stored$jscomp$1_watchers$$.splice($needsModel_pairIdx$$, 1);
                  break;
                }
              }
            }
          }
        }
        $raw$jscomp$5_v$$._rt_live = !0;
        $raw$jscomp$5_v$$._rt_ctrl = $constructorName$jscomp$1_ctrl$$;
        $_ref$jscomp$7_constructor$$ = $_ref$jscomp$7_constructor$$.watchers;
        for ($k$$ in $_ref$jscomp$7_constructor$$) {
          $raw$jscomp$5_v$$ = $_ref$jscomp$7_constructor$$[$k$$], Silica._watch[$k$$] || (Silica._watch[$k$$] = []), Silica._watch[$k$$].push([$constructorName$jscomp$1_ctrl$$, $raw$jscomp$5_v$$, null]);
        }
        if ("function" === typeof $constructorName$jscomp$1_ctrl$$.onLoad) {
          $constructorName$jscomp$1_ctrl$$.onLoad();
        }
      }
      return $constructorName$jscomp$1_ctrl$$;
    }
    if ($raw$jscomp$5_v$$.parentElement) {
      $raw$jscomp$5_v$$ = $raw$jscomp$5_v$$.parentElement;
    } else {
      return Silica.context;
    }
  }
}, _handle_href($evt$$) {
  var $path$$ = this.getAttribute("href");
  if (null == /[a-zA-Z]+:+/g.exec($path$$) && "#" !== $path$$ && "" !== $path$$) {
    var $defaultPrevented$$ = !1;
    this.dataset.noPreventDefault || ($defaultPrevented$$ = !0, $evt$$.preventDefault());
    this.dataset.noStopPropagation || $evt$$.stopPropagation();
    module$exports$silica$pubsub.Pub("SiO2-HREF", $evt$$);
    Silica.goTo($path$$);
    return !$defaultPrevented$$;
  }
}, _capture_links($element$jscomp$25_nodes$$) {
  $element$jscomp$25_nodes$$ = Silica.queryOfType($element$jscomp$25_nodes$$, "a", "[href]", "[data-href]");
  let $node$$;
  for (let $i$$ = $element$jscomp$25_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $element$jscomp$25_nodes$$[$i$$], $node$$.hostname === window.location.hostname && "_blank" !== $node$$.target && ($node$$.removeEventListener("click", Silica._handle_href, !0), $node$$.addEventListener("click", Silica._handle_href, !0));
  }
}, _show($element$jscomp$26_isVisible$$, $expr$$, $negate$$) {
  $element$jscomp$26_isVisible$$ = Silica.getValue($element$jscomp$26_isVisible$$, $expr$$, null, [$element$jscomp$26_isVisible$$]);
  $negate$$ && ($element$jscomp$26_isVisible$$ = !$element$jscomp$26_isVisible$$);
  return $element$jscomp$26_isVisible$$;
}, _call($element$$, $evnt$$, $act$$) {
  if (Silica.isInDOM($element$$) && ($element$$ === $evnt$$.target || "click" !== $act$$ || "SELECT" !== $evnt$$.target.nodeName && "INPUT" !== $evnt$$.target.nodeName)) {
    $element$$.dataset.noPreventDefault || $evnt$$.preventDefault();
    $element$$.dataset.noStopPropagation || $evnt$$.stopPropagation();
    var $scope$$ = document, $trap_to$$, $trapped_scope$$;
    if (null != ($trap_to$$ = $element$$.dataset.trap)) {
      if ("true" === $trap_to$$.toLowerCase()) {
        $scope$$ = $element$$;
      } else {
        for ($trapped_scope$$ = $element$$; $trapped_scope$$ = $trapped_scope$$.parentElement;) {
          if ($trapped_scope$$.classList.contains($trap_to$$)) {
            $scope$$ = $trapped_scope$$;
            break;
          }
        }
      }
    }
    Silica.enqueue(function() {
      var $parameter$$, $models$$ = [];
      var $ctx$$ = Silica.getContext($element$$);
      var $action_i$$ = $element$$.dataset[$act$$];
      var $actionName_idx$$ = $action_i$$.indexOf("(");
      if (0 < $actionName_idx$$) {
        if ($actionName_idx$$ = $action_i$$.substr(0, $actionName_idx$$), $models$$ = $action_i$$.substr($actionName_idx$$.length).match(/((?:\w|\.)+)(?:\(?([\w\.]+)\))?/g)) {
          for ($action_i$$ = 0; $action_i$$ < $models$$.length; $action_i$$++) {
            $models$$[$action_i$$] = Silica.getPropByString($ctx$$, $models$$[$action_i$$]);
          }
        } else {
          $models$$ = [];
        }
      } else {
        $actionName_idx$$ = $action_i$$;
      }
      for (; !$ctx$$[$actionName_idx$$] && $ctx$$.$ctrl;) {
        $ctx$$ = $ctx$$.$ctrl;
      }
      $element$$.dataset.parameter && ($parameter$$ = $element$$.dataset.parameter);
      return "undefined" !== typeof $ctx$$[$actionName_idx$$] ? $ctx$$[$actionName_idx$$].apply($ctx$$, [$element$$, ...$models$$, $parameter$$, $evnt$$]) : null != Silica.context[$actionName_idx$$] ? Silica.context[$actionName_idx$$].apply(Silica.ctx, [$element$$, ...$models$$, $parameter$$, $evnt$$]) : console.error("Unknown action '" + $actionName_idx$$ + "' for " + $element$$.outerHTML + " in " + $ctx$$.constructor.name);
    }, $scope$$);
  }
}, getFilteredValue($filterOptions_raw$$, $propString$jscomp$3_value$$, $elideFilterIf_filter$$, $paramsKeys$$ = null) {
  $paramsKeys$$ = $paramsKeys$$ || $propString$jscomp$3_value$$.match("\\((.*)\\)");
  var $filterKey_params$$ = [];
  if (null !== $paramsKeys$$) {
    $paramsKeys$$.shift();
    for (let $j$$ = 0, $length$$ = $paramsKeys$$.length; $j$$ < $length$$; $j$$++) {
      $filterKey_params$$.push(Silica.getValue($filterOptions_raw$$, $paramsKeys$$[$j$$]));
    }
    $propString$jscomp$3_value$$ = $propString$jscomp$3_value$$.substr(0, $propString$jscomp$3_value$$.indexOf("("));
  }
  $propString$jscomp$3_value$$ = Silica.getValue($filterOptions_raw$$, $propString$jscomp$3_value$$, null, $filterKey_params$$);
  if ($elideFilterIf_filter$$ && $propString$jscomp$3_value$$ === $elideFilterIf_filter$$) {
    return null;
  }
  if (($filterKey_params$$ = ($elideFilterIf_filter$$ = ($elideFilterIf_filter$$ = $filterOptions_raw$$.attributes["data-filter"]) ? $elideFilterIf_filter$$.value.split(/:(.+)/) : null) ? $elideFilterIf_filter$$[0] : null) && !Silica.filters[$filterKey_params$$]) {
    throw Error("Unknown filter: '" + $filterKey_params$$ + "' for element: " + $filterOptions_raw$$.outerHTML);
  }
  $filterOptions_raw$$ = $elideFilterIf_filter$$ && 1 < $elideFilterIf_filter$$.length ? eval($elideFilterIf_filter$$[1]) : null;
  return ($elideFilterIf_filter$$ = $filterKey_params$$ ? Silica.filters[$filterKey_params$$] : null) && null != $propString$jscomp$3_value$$ ? [$elideFilterIf_filter$$($propString$jscomp$3_value$$, $filterOptions_raw$$), $propString$jscomp$3_value$$, $paramsKeys$$] : [$propString$jscomp$3_value$$, $propString$jscomp$3_value$$, $paramsKeys$$];
}, findComments($raw$$) {
  for (var $arr$$ = [], $i$$ = $raw$$.childNodes.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $raw$$.childNodes[$i$$];
    8 === $node$$.nodeType ? $arr$$.push($node$$) : $arr$$.push.apply($arr$$, Silica.findComments($node$$));
  }
  return $arr$$;
}, isInRepeat($root$$, $node$$) {
  for (; $node$$.parentElement && $node$$.parentElement !== $root$$;) {
    if ($node$$.parentElement.hasAttribute("data-repeat")) {
      return !0;
    }
    $node$$ = $node$$.parentElement;
  }
  return !1;
}, isDescendent($ancestor$$, $child$$) {
  for (; ($child$$ = $child$$.parentNode) && $child$$ !== $ancestor$$;) {
  }
  return !!$child$$;
}, query($raw$$, ...$attributes$$) {
  $raw$$ == document && ($raw$$ = document.documentElement);
  var $attribute$jscomp$2_nodes$$ = $raw$$.querySelectorAll($attributes$$.join(",")), $filtered$$ = [];
  for (var $i$jscomp$29_i$$ = $attribute$jscomp$2_nodes$$.length - 1; 0 <= $i$jscomp$29_i$$; --$i$jscomp$29_i$$) {
    let $node$$ = $attribute$jscomp$2_nodes$$.item($i$jscomp$29_i$$);
    Silica.isInRepeat($raw$$, $node$$) || $filtered$$.push($node$$);
  }
  for ($i$jscomp$29_i$$ = $attributes$$.length - 1; 0 <= $i$jscomp$29_i$$; --$i$jscomp$29_i$$) {
    if ($attribute$jscomp$2_nodes$$ = $attributes$$[$i$jscomp$29_i$$], $raw$$.hasAttribute($attribute$jscomp$2_nodes$$.substring(1, $attribute$jscomp$2_nodes$$.length - 1))) {
      $filtered$$.push($raw$$);
      break;
    }
  }
  return $filtered$$;
}, queryWithComments($comments_root$$, ...$attributes$$) {
  var $filtered$$ = Silica.query($comments_root$$, ...$attributes$$);
  $comments_root$$ = Silica.findComments($comments_root$$);
  for (var $temp$$ = document.createElement("div"), $i$$ = $comments_root$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $comments_root$$[$i$$];
    if ("<" === $node$$.nodeValue.charAt(0)) {
      $temp$$.innerHTML = $node$$.nodeValue;
      for (var $j$$ = $attributes$$.length - 1, $attr$$ = $attributes$$[$j$$]; 0 <= $j$$; $attr$$ = $attributes$$[--$j$$]) {
        if ($temp$$.firstElementChild.hasAttribute($attr$$)) {
          $filtered$$.push($node$$);
          break;
        }
      }
    }
  }
  return $filtered$$;
}, querySorted($filtered$jscomp$3_root$$, ...$attributes$jscomp$3_i$$) {
  $filtered$jscomp$3_root$$ = Silica.query($filtered$jscomp$3_root$$, ...$attributes$jscomp$3_i$$);
  $attributes$jscomp$3_i$$ = 0;
  for (var $list_length$$ = $filtered$jscomp$3_root$$.length; $attributes$jscomp$3_i$$ < $list_length$$; $attributes$jscomp$3_i$$++) {
    for (var $node$$ = $filtered$jscomp$3_root$$[$attributes$jscomp$3_i$$], $j$$ = $attributes$jscomp$3_i$$ + 1; $j$$ < $list_length$$; $j$$++) {
      var $other$$ = $filtered$jscomp$3_root$$[$j$$];
      $other$$.contains($node$$) && ($filtered$jscomp$3_root$$[$attributes$jscomp$3_i$$] = $other$$, $filtered$jscomp$3_root$$[$j$$] = $node$$);
    }
  }
  return $filtered$jscomp$3_root$$;
}, queryOfType($raw$$, $attribute$jscomp$3_type$$, ...$attributes$$) {
  $raw$$ == document && ($raw$$ = document.documentElement);
  var $i$jscomp$34_nodes$$ = $raw$$.getElementsByTagName($attribute$jscomp$3_type$$), $filtered$$ = [];
  if (0 < $attributes$$.length) {
    for (let $i$$ = $i$jscomp$34_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
      let $node$$ = $i$jscomp$34_nodes$$.item($i$$);
      for (let $j$$ = $attributes$$.length - 1; 0 <= $j$$; --$j$$) {
        if ($node$$.hasAttribute($attributes$$[$j$$].replace(/\[|\]/g, ""))) {
          $filtered$$.push($node$$);
          break;
        }
      }
    }
    if ($raw$$.nodeName === $attribute$jscomp$3_type$$.toUpperCase()) {
      for ($i$jscomp$34_nodes$$ = $attributes$$.length - 1; 0 <= $i$jscomp$34_nodes$$; --$i$jscomp$34_nodes$$) {
        if ($attribute$jscomp$3_type$$ = $attributes$$[$i$jscomp$34_nodes$$], $raw$$.hasAttribute($attribute$jscomp$3_type$$.substring(1, $attribute$jscomp$3_type$$.length - 1))) {
          $filtered$$.push($raw$$);
          break;
        }
      }
    }
  } else {
    $filtered$$ = $i$jscomp$34_nodes$$, $raw$$.tagName === $attribute$jscomp$3_type$$ && $filtered$$.push($raw$$);
  }
  return $filtered$$;
}, removeFromDOM($e$$) {
  for (var $removeWatchers$$ = function $$removeWatchers$$$($nodes$$) {
    for (let $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
      var $list$jscomp$5_node$$ = $nodes$$[$i$$];
      if ($list$jscomp$5_node$$._rt_ctrl) {
        let $ctrl$$ = $list$jscomp$5_node$$._rt_ctrl;
        for (let $k$$ in $ctrl$$.constructor.watchers) {
          $list$jscomp$5_node$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$jscomp$5_node$$ ? $list$jscomp$5_node$$.filter(function($obj$$) {
            return $obj$$[0] !== $ctrl$$;
          }) : [], 0 === Silica._watch[$k$$].length && delete Silica._watch[$k$$];
        }
        if ("function" === typeof $ctrl$$.onDestroy) {
          $ctrl$$.onDestroy();
        }
      }
    }
  }, $i$jscomp$0$$ = $e$$.childNodes.length - 1; 0 <= $i$jscomp$0$$; --$i$jscomp$0$$) {
    var $child$$ = $e$$.childNodes[$i$jscomp$0$$];
    if ("function" === typeof $child$$.onremove) {
      $child$$.onremove();
    }
  }
  3 !== $e$$.nodeType && 8 !== $e$$.nodeType && ($removeWatchers$$($e$$.querySelectorAll("[data-controller]")), $removeWatchers$$($e$$.querySelectorAll("[data-sio2-directive]")), $removeWatchers$$([$e$$]));
  $e$$._deleted = !0;
  $e$$.remove();
}, compilers:module$exports$compilers, watchers:module$exports$watchers};
window.Silica.Controllers = module$exports$controllers;
window.Silica.addDirective = Silica.addDirective;
window.Silica.addFilter = Silica.addFilter;
window.Silica.apply = Silica.apply;
window.Silica.compile = Silica.compile;
window.Silica.debounce = Silica.debounce;
window.Silica.defer = Silica.defer;
window.Silica.flush = Silica.flush;
window.Silica.getPropByString = Silica.getPropByString;
window.Silica.getValue = Silica.getValue;
window.Silica.getFilteredValue = Silica.getFilteredValue;
window.Silica.goTo = Silica.goTo;
window.Silica.query = Silica.query;
window.Silica.queryOfType = Silica.queryOfType;
window.Silica.querySorted = Silica.querySorted;
window.Silica.queryWithComments = Silica.queryWithComments;
window.Silica.router = Silica.router;
window.Silica.setContext = Silica.setContext;
window.Silica.setPropByString = Silica.setPropByString;
window.Silica.setRouter = Silica.setRouter;
window.Silica.usePushState = Silica.usePushState;
window.Silica.processQueue = Silica.debounce(Silica.processQueue, 0);
window.Silica.enqueue = Silica.enqueue;
window.Silica.pub = module$exports$silica$pubsub.Pub;
window.Silica.sub = module$exports$silica$pubsub.Sub;
window.Silica.unsub = module$exports$silica$pubsub.Unsub;
window.Silica.isInDOM = Silica.isInDOM;
window.Silica.ignore = Silica.ignore;

}.call(window);