/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.4.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2016
 * @license MIT
 */
!function(t){"use strict";function r(t){if(t)c[0]=c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0,this.blocks=c,this.buffer8=i;else if(n){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof process&&process.versions&&process.versions.node;e&&(t=global);var i,h=!t.JS_MD5_TEST&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!t.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],c=[];if(n){var p=new ArrayBuffer(68);i=new Uint8Array(p),c=new Uint32Array(p)}var y=function(t){return function(e){return new r(!0).update(e)[t]()}},d=function(){var t=y("hex");e&&(t=l(t)),t.create=function(){return new r},t.update=function(r){return t.create().update(r)};for(var i=0;i<u.length;++i){var h=u[i];t[h]=y(h)}return t},l=function(r){var e,i;try{if(t.JS_MD5_TEST)throw"JS_MD5_TEST";e=require("crypto"),i=require("buffer").Buffer}catch(h){return console.log(h),r}var s=function(t){if("string"==typeof t)return e.createHash("md5").update(t,"utf8").digest("hex");if(t.constructor==ArrayBuffer)t=new Uint8Array(t);else if(void 0===t.length)return r(t);return e.createHash("md5").update(new i(t)).digest("hex")};return s};r.prototype.update=function(r){if(!this.finalized){var e="string"!=typeof r;e&&r.constructor==t.ArrayBuffer&&(r=new Uint8Array(r));for(var i,h,s=0,f=r.length||0,a=this.blocks,u=this.buffer8;f>s;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)if(n)for(h=this.start;f>s&&64>h;++s)u[h++]=r[s];else for(h=this.start;f>s&&64>h;++s)a[h>>2]|=r[s]<<o[3&h++];else if(n)for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?u[h++]=i:2048>i?(u[h++]=192|i>>6,u[h++]=128|63&i):55296>i||i>=57344?(u[h++]=224|i>>12,u[h++]=128|i>>6&63,u[h++]=128|63&i):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),u[h++]=240|i>>18,u[h++]=128|i>>12&63,u[h++]=128|i>>6&63,u[h++]=128|63&i);else for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?a[h>>2]|=i<<o[3&h++]:2048>i?(a[h>>2]|=(192|i>>6)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):55296>i||i>=57344?(a[h>>2]|=(224|i>>12)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),a[h>>2]|=(240|i>>18)<<o[3&h++],a[h>>2]|=(128|i>>12&63)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]);this.lastByteIndex=h,this.bytes+=h-this.start,h>=64?(this.start=h-64,this.hash(),this.hashed=!0):this.start=h}return this}},r.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>2]|=a[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},r.prototype.hash=function(){var t,r,e,i,h,s,n=this.blocks;this.first?(t=n[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,i=(-1732584194^2004318071&t)+n[1]-117830708,i=(i<<12|i>>>20)+t<<0,e=(-271733879^i&(-271733879^t))+n[2]-1126478375,e=(e<<17|e>>>15)+i<<0,r=(t^e&(i^t))+n[3]-1316259209,r=(r<<22|r>>>10)+e<<0):(t=this.h0,r=this.h1,e=this.h2,i=this.h3,t+=(i^r&(e^i))+n[0]-680876936,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[1]-389564586,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[2]+606105819,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[3]-1044525330,r=(r<<22|r>>>10)+e<<0),t+=(i^r&(e^i))+n[4]-176418897,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[5]+1200080426,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[6]-1473231341,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[7]-45705983,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[8]+1770035416,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[9]-1958414417,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[10]-42063,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[11]-1990404162,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[12]+1804603682,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[13]-40341101,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[14]-1502002290,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[15]+1236535329,r=(r<<22|r>>>10)+e<<0,t+=(e^i&(r^e))+n[1]-165796510,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[6]-1069501632,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[11]+643717713,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[0]-373897302,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[5]-701558691,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[10]+38016083,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[15]-660478335,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[4]-405537848,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[9]+568446438,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[14]-1019803690,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[3]-187363961,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[8]+1163531501,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[13]-1444681467,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[2]-51403784,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[7]+1735328473,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[12]-1926607734,r=(r<<20|r>>>12)+e<<0,h=r^e,t+=(h^i)+n[5]-378558,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[8]-2022574463,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[11]+1839030562,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[14]-35309556,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[1]-1530992060,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[4]+1272893353,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[7]-155497632,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[10]-1094730640,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[13]+681279174,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[0]-358537222,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[3]-722521979,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[6]+76029189,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[9]-640364487,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[12]-421815835,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[15]+530742520,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[2]-995338651,r=(r<<23|r>>>9)+e<<0,t+=(e^(r|~i))+n[0]-198630844,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[7]+1126891415,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[14]-1416354905,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[5]-57434055,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[12]+1700485571,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[3]-1894986606,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[10]-1051523,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[1]-2054922799,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[8]+1873313359,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[15]-30611744,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[6]-1560198380,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[13]+1309151649,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[4]-145523070,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[11]-1120210379,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[2]+718787259,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[9]-343485551,r=(r<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+i<<0)},r.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]},r.prototype.toString=r.prototype.hex,r.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},r.prototype.array=r.prototype.digest,r.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},r.prototype.buffer=r.prototype.arrayBuffer;var v=d();(t.md5=v,s&&define(function(){return v}))}(this);
!function(){
"use strict";
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
$jscomp.makeIterator = function $$jscomp$makeIterator$($iterable$$) {
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $iteratorFunction$$ = $iterable$$[Symbol.iterator];
  return $iteratorFunction$$ ? $iteratorFunction$$.call($iterable$$) : $jscomp.arrayIterator($iterable$$);
};
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function($prototype$$) {
  var $ctor$$ = function $$ctor$$$() {
  };
  $ctor$$.prototype = $prototype$$;
  return new $ctor$$;
};
$jscomp.underscoreProtoCanBeSet = function $$jscomp$underscoreProtoCanBeSet$() {
  var $x$$ = {a:!0}, $y$$ = {};
  try {
    return $y$$.__proto__ = $x$$, $y$$.a;
  } catch ($e$$) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function($target$$, $proto$$) {
  $target$$.__proto__ = $proto$$;
  if ($target$$.__proto__ !== $proto$$) {
    throw new TypeError($target$$ + " is not extensible");
  }
  return $target$$;
} : null;
$jscomp.inherits = function $$jscomp$inherits$($childCtor$$, $parentCtor$$) {
  $childCtor$$.prototype = $jscomp.objectCreate($parentCtor$$.prototype);
  $childCtor$$.prototype.constructor = $childCtor$$;
  if ($jscomp.setPrototypeOf) {
    var $p_setPrototypeOf$$ = $jscomp.setPrototypeOf;
    $p_setPrototypeOf$$($childCtor$$, $parentCtor$$);
  } else {
    for ($p_setPrototypeOf$$ in $parentCtor$$) {
      if ("prototype" != $p_setPrototypeOf$$) {
        if (Object.defineProperties) {
          var $descriptor$$ = Object.getOwnPropertyDescriptor($parentCtor$$, $p_setPrototypeOf$$);
          $descriptor$$ && Object.defineProperty($childCtor$$, $p_setPrototypeOf$$, $descriptor$$);
        } else {
          $childCtor$$[$p_setPrototypeOf$$] = $parentCtor$$[$p_setPrototypeOf$$];
        }
      }
    }
  }
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
};
$jscomp.arrayFromIterator = function $$jscomp$arrayFromIterator$($iterator$$) {
  for (var $i$$, $arr$$ = []; !($i$$ = $iterator$$.next()).done;) {
    $arr$$.push($i$$.value);
  }
  return $arr$$;
};
$jscomp.arrayFromIterable = function $$jscomp$arrayFromIterable$($iterable$$) {
  return $iterable$$ instanceof Array ? $iterable$$ : $jscomp.arrayFromIterator($jscomp.makeIterator($iterable$$));
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
$jscomp.polyfill("Array.prototype.keys", function($orig$$) {
  return $orig$$ ? $orig$$ : function() {
    return $jscomp.iteratorFromArray(this, function($i$$) {
      return $i$$;
    });
  };
}, "es6", "es3");
$jscomp.polyfill("Reflect.getOwnPropertyDescriptor", function($orig$$) {
  return $orig$$ || Object.getOwnPropertyDescriptor;
}, "es6", "es5");
$jscomp.polyfill("Reflect.getPrototypeOf", function($orig$$) {
  return $orig$$ || Object.getPrototypeOf;
}, "es6", "es5");
$jscomp.findDescriptor = function $$jscomp$findDescriptor$($obj$jscomp$26_target$$, $propertyKey$$) {
  for (; $obj$jscomp$26_target$$;) {
    var $property$$ = Reflect.getOwnPropertyDescriptor($obj$jscomp$26_target$$, $propertyKey$$);
    if ($property$$) {
      return $property$$;
    }
    $obj$jscomp$26_target$$ = Reflect.getPrototypeOf($obj$jscomp$26_target$$);
  }
};
$jscomp.polyfill("Reflect.get", function($orig$$) {
  return $orig$$ ? $orig$$ : function($target$$, $propertyKey$$, $opt_receiver$$) {
    if (2 >= arguments.length) {
      return $target$$[$propertyKey$$];
    }
    var $property$$ = $jscomp.findDescriptor($target$$, $propertyKey$$);
    if ($property$$) {
      return $property$$.get ? $property$$.get.call($opt_receiver$$) : $property$$.value;
    }
  };
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function $$jscomp$checkEs6ConformanceViaProxy$() {
  try {
    var $proxied$$ = {}, $proxy$$ = Object.create(new $jscomp.global.Proxy($proxied$$, {get:function($target$$, $key$$, $receiver$$) {
      return $target$$ == $proxied$$ && "q" == $key$$ && $receiver$$ == $proxy$$;
    }}));
    return !0 === $proxy$$.q;
  } catch ($err$$) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function $$jscomp$owns$($obj$$, $prop$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $prop$$);
};
$jscomp.polyfill("WeakMap", function($NativeWeakMap$$) {
  function $isConformant$$() {
    if (!$NativeWeakMap$$ || !Object.seal) {
      return !1;
    }
    try {
      var $x$$ = Object.seal({}), $y$$ = Object.seal({}), $map$$ = new $NativeWeakMap$$([[$x$$, 2], [$y$$, 3]]);
      if (2 != $map$$.get($x$$) || 3 != $map$$.get($y$$)) {
        return !1;
      }
      $map$$.delete($x$$);
      $map$$.set($y$$, 4);
      return !$map$$.has($x$$) && 4 == $map$$.get($y$$);
    } catch ($err$$) {
      return !1;
    }
  }
  function $insert$$($target$$) {
    $jscomp.owns($target$$, $prop$$) || $jscomp.defineProperty($target$$, $prop$$, {value:{}});
  }
  function $patch$$($name$$) {
    var $prev$$ = Object[$name$$];
    $prev$$ && (Object[$name$$] = function $Object$$name$$$($target$$) {
      $insert$$($target$$);
      return $prev$$($target$$);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeWeakMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeWeakMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeWeakMap$$;
    }
  }
  var $prop$$ = "$jscomp_hidden_" + Math.random();
  $patch$$("freeze");
  $patch$$("preventExtensions");
  $patch$$("seal");
  var $index$$ = 0, $PolyfillWeakMap$$ = function $$PolyfillWeakMap$$$($iter$jscomp$1_opt_iterable$$) {
    this.id_ = ($index$$ += Math.random() + 1).toString();
    if ($iter$jscomp$1_opt_iterable$$) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      $iter$jscomp$1_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$1_opt_iterable$$);
      for (var $entry_item$$; !($entry_item$$ = $iter$jscomp$1_opt_iterable$$.next()).done;) {
        $entry_item$$ = $entry_item$$.value, this.set($entry_item$$[0], $entry_item$$[1]);
      }
    }
  };
  $PolyfillWeakMap$$.prototype.set = function $$PolyfillWeakMap$$$$set$($key$$, $value$$) {
    $insert$$($key$$);
    if (!$jscomp.owns($key$$, $prop$$)) {
      throw Error("WeakMap key fail: " + $key$$);
    }
    $key$$[$prop$$][this.id_] = $value$$;
    return this;
  };
  $PolyfillWeakMap$$.prototype.get = function $$PolyfillWeakMap$$$$get$($key$$) {
    return $jscomp.owns($key$$, $prop$$) ? $key$$[$prop$$][this.id_] : void 0;
  };
  $PolyfillWeakMap$$.prototype.has = function $$PolyfillWeakMap$$$$has$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_);
  };
  $PolyfillWeakMap$$.prototype.delete = function $$PolyfillWeakMap$$$$delete$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_) ? delete $key$$[$prop$$][this.id_] : !1;
  };
  return $PolyfillWeakMap$$;
}, "es6", "es3");
$jscomp.MapEntry = function $$jscomp$MapEntry$() {
};
$jscomp.polyfill("Map", function($NativeMap$$) {
  function $isConformant$$() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !$NativeMap$$ || "function" != typeof $NativeMap$$ || !$NativeMap$$.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var $key$$ = Object.seal({x:4}), $map$$ = new $NativeMap$$($jscomp.makeIterator([[$key$$, "s"]]));
      if ("s" != $map$$.get($key$$) || 1 != $map$$.size || $map$$.get({x:4}) || $map$$.set({x:4}, "t") != $map$$ || 2 != $map$$.size) {
        return !1;
      }
      var $iter$$ = $map$$.entries(), $item$$ = $iter$$.next();
      if ($item$$.done || $item$$.value[0] != $key$$ || "s" != $item$$.value[1]) {
        return !1;
      }
      $item$$ = $iter$$.next();
      return $item$$.done || 4 != $item$$.value[0].x || "t" != $item$$.value[1] || !$iter$$.next().done ? !1 : !0;
    } catch ($err$$) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeMap$$;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $idMap$$ = new WeakMap, $PolyfillMap$$ = function $$PolyfillMap$$$($iter$jscomp$3_opt_iterable$$) {
    this.data_ = {};
    this.head_ = $createHead$$();
    this.size = 0;
    if ($iter$jscomp$3_opt_iterable$$) {
      $iter$jscomp$3_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$3_opt_iterable$$);
      for (var $entry$jscomp$1_item$$; !($entry$jscomp$1_item$$ = $iter$jscomp$3_opt_iterable$$.next()).done;) {
        $entry$jscomp$1_item$$ = $entry$jscomp$1_item$$.value, this.set($entry$jscomp$1_item$$[0], $entry$jscomp$1_item$$[1]);
      }
    }
  };
  $PolyfillMap$$.prototype.set = function $$PolyfillMap$$$$set$($key$$, $value$$) {
    var $r$$ = $maybeGetEntry$$(this, $key$$);
    $r$$.list || ($r$$.list = this.data_[$r$$.id] = []);
    $r$$.entry ? $r$$.entry.value = $value$$ : ($r$$.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:$key$$, value:$value$$}, $r$$.list.push($r$$.entry), this.head_.previous.next = $r$$.entry, this.head_.previous = $r$$.entry, this.size++);
    return this;
  };
  $PolyfillMap$$.prototype.delete = function $$PolyfillMap$$$$delete$($key$jscomp$43_r$$) {
    $key$jscomp$43_r$$ = $maybeGetEntry$$(this, $key$jscomp$43_r$$);
    return $key$jscomp$43_r$$.entry && $key$jscomp$43_r$$.list ? ($key$jscomp$43_r$$.list.splice($key$jscomp$43_r$$.index, 1), $key$jscomp$43_r$$.list.length || delete this.data_[$key$jscomp$43_r$$.id], $key$jscomp$43_r$$.entry.previous.next = $key$jscomp$43_r$$.entry.next, $key$jscomp$43_r$$.entry.next.previous = $key$jscomp$43_r$$.entry.previous, $key$jscomp$43_r$$.entry.head = null, this.size--, !0) : !1;
  };
  $PolyfillMap$$.prototype.clear = function $$PolyfillMap$$$$clear$() {
    this.data_ = {};
    this.head_ = this.head_.previous = $createHead$$();
    this.size = 0;
  };
  $PolyfillMap$$.prototype.has = function $$PolyfillMap$$$$has$($key$$) {
    return !!$maybeGetEntry$$(this, $key$$).entry;
  };
  $PolyfillMap$$.prototype.get = function $$PolyfillMap$$$$get$($entry$jscomp$2_key$$) {
    return ($entry$jscomp$2_key$$ = $maybeGetEntry$$(this, $entry$jscomp$2_key$$).entry) && $entry$jscomp$2_key$$.value;
  };
  $PolyfillMap$$.prototype.entries = function $$PolyfillMap$$$$entries$() {
    return $makeIterator$$(this, function($entry$$) {
      return [$entry$$.key, $entry$$.value];
    });
  };
  $PolyfillMap$$.prototype.keys = function $$PolyfillMap$$$$keys$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.key;
    });
  };
  $PolyfillMap$$.prototype.values = function $$PolyfillMap$$$$values$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.value;
    });
  };
  $PolyfillMap$$.prototype.forEach = function $$PolyfillMap$$$$forEach$($callback$$, $opt_thisArg$$) {
    for (var $iter$$ = this.entries(), $entry$jscomp$6_item$$; !($entry$jscomp$6_item$$ = $iter$$.next()).done;) {
      $entry$jscomp$6_item$$ = $entry$jscomp$6_item$$.value, $callback$$.call($opt_thisArg$$, $entry$jscomp$6_item$$[1], $entry$jscomp$6_item$$[0], this);
    }
  };
  $PolyfillMap$$.prototype[Symbol.iterator] = $PolyfillMap$$.prototype.entries;
  var $maybeGetEntry$$ = function $$maybeGetEntry$$$($index$jscomp$57_map$$, $key$$) {
    var $id$jscomp$5_id$jscomp$inline_39_type$$ = $key$$ && typeof $key$$;
    "object" == $id$jscomp$5_id$jscomp$inline_39_type$$ || "function" == $id$jscomp$5_id$jscomp$inline_39_type$$ ? $idMap$$.has($key$$) ? $id$jscomp$5_id$jscomp$inline_39_type$$ = $idMap$$.get($key$$) : ($id$jscomp$5_id$jscomp$inline_39_type$$ = "" + ++$mapIndex$$, $idMap$$.set($key$$, $id$jscomp$5_id$jscomp$inline_39_type$$)) : $id$jscomp$5_id$jscomp$inline_39_type$$ = "p_" + $key$$;
    var $list$$ = $index$jscomp$57_map$$.data_[$id$jscomp$5_id$jscomp$inline_39_type$$];
    if ($list$$ && $jscomp.owns($index$jscomp$57_map$$.data_, $id$jscomp$5_id$jscomp$inline_39_type$$)) {
      for ($index$jscomp$57_map$$ = 0; $index$jscomp$57_map$$ < $list$$.length; $index$jscomp$57_map$$++) {
        var $entry$$ = $list$$[$index$jscomp$57_map$$];
        if ($key$$ !== $key$$ && $entry$$.key !== $entry$$.key || $key$$ === $entry$$.key) {
          return {id:$id$jscomp$5_id$jscomp$inline_39_type$$, list:$list$$, index:$index$jscomp$57_map$$, entry:$entry$$};
        }
      }
    }
    return {id:$id$jscomp$5_id$jscomp$inline_39_type$$, list:$list$$, index:-1, entry:void 0};
  }, $makeIterator$$ = function $$makeIterator$$$($map$$, $func$$) {
    var $entry$$ = $map$$.head_;
    return $jscomp.iteratorPrototype(function() {
      if ($entry$$) {
        for (; $entry$$.head != $map$$.head_;) {
          $entry$$ = $entry$$.previous;
        }
        for (; $entry$$.next != $entry$$.head;) {
          return $entry$$ = $entry$$.next, {done:!1, value:$func$$($entry$$)};
        }
        $entry$$ = null;
      }
      return {done:!0, value:void 0};
    });
  }, $createHead$$ = function $$createHead$$$() {
    var $head$$ = {};
    return $head$$.previous = $head$$.next = $head$$.head = $head$$;
  }, $mapIndex$$ = 0;
  return $PolyfillMap$$;
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function($orig$$) {
  return $orig$$ ? $orig$$ : function() {
    return $jscomp.iteratorFromArray(this, function($k$$, $v$$) {
      return $v$$;
    });
  };
}, "es8", "es3");
$jscomp.polyfill("Object.is", function($orig$$) {
  return $orig$$ ? $orig$$ : function($left$$, $right$$) {
    return $left$$ === $right$$ ? 0 !== $left$$ || 1 / $left$$ === 1 / $right$$ : $left$$ !== $left$$ && $right$$ !== $right$$;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchElement$$, $i$jscomp$7_opt_fromIndex$$) {
    var $array$$ = this;
    $array$$ instanceof String && ($array$$ = String($array$$));
    var $len$$ = $array$$.length;
    $i$jscomp$7_opt_fromIndex$$ = $i$jscomp$7_opt_fromIndex$$ || 0;
    for (0 > $i$jscomp$7_opt_fromIndex$$ && ($i$jscomp$7_opt_fromIndex$$ = Math.max($i$jscomp$7_opt_fromIndex$$ + $len$$, 0)); $i$jscomp$7_opt_fromIndex$$ < $len$$; $i$jscomp$7_opt_fromIndex$$++) {
      var $element$$ = $array$$[$i$jscomp$7_opt_fromIndex$$];
      if ($element$$ === $searchElement$$ || Object.is($element$$, $searchElement$$)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function $$jscomp$checkStringArgs$($thisArg$$, $arg$$, $func$$) {
  if (null == $thisArg$$) {
    throw new TypeError("The 'this' value for String.prototype." + $func$$ + " must not be null or undefined");
  }
  if ($arg$$ instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + $func$$ + " must not be a regular expression");
  }
  return $thisArg$$ + "";
};
$jscomp.polyfill("String.prototype.includes", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchString$$, $opt_position$$) {
    return -1 !== $jscomp.checkStringArgs(this, $searchString$$, "includes").indexOf($searchString$$, $opt_position$$ || 0);
  };
}, "es6", "es3");
$jscomp.polyfill("Set", function($NativeSet$$) {
  function $isConformant$$() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !$NativeSet$$ || "function" != typeof $NativeSet$$ || !$NativeSet$$.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var $value$$ = Object.seal({x:4}), $set$$ = new $NativeSet$$($jscomp.makeIterator([$value$$]));
      if (!$set$$.has($value$$) || 1 != $set$$.size || $set$$.add($value$$) != $set$$ || 1 != $set$$.size || $set$$.add({x:4}) != $set$$ || 2 != $set$$.size) {
        return !1;
      }
      var $iter$$ = $set$$.entries(), $item$$ = $iter$$.next();
      if ($item$$.done || $item$$.value[0] != $value$$ || $item$$.value[1] != $value$$) {
        return !1;
      }
      $item$$ = $iter$$.next();
      return $item$$.done || $item$$.value[0] == $value$$ || 4 != $item$$.value[0].x || $item$$.value[1] != $item$$.value[0] ? !1 : $iter$$.next().done;
    } catch ($err$$) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeSet$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeSet$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeSet$$;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $PolyfillSet$$ = function $$PolyfillSet$$$($iter$jscomp$6_opt_iterable$$) {
    this.map_ = new Map;
    if ($iter$jscomp$6_opt_iterable$$) {
      $iter$jscomp$6_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$6_opt_iterable$$);
      for (var $entry$$; !($entry$$ = $iter$jscomp$6_opt_iterable$$.next()).done;) {
        this.add($entry$$.value);
      }
    }
    this.size = this.map_.size;
  };
  $PolyfillSet$$.prototype.add = function $$PolyfillSet$$$$add$($value$$) {
    this.map_.set($value$$, $value$$);
    this.size = this.map_.size;
    return this;
  };
  $PolyfillSet$$.prototype.delete = function $$PolyfillSet$$$$delete$($result_value$$) {
    $result_value$$ = this.map_.delete($result_value$$);
    this.size = this.map_.size;
    return $result_value$$;
  };
  $PolyfillSet$$.prototype.clear = function $$PolyfillSet$$$$clear$() {
    this.map_.clear();
    this.size = 0;
  };
  $PolyfillSet$$.prototype.has = function $$PolyfillSet$$$$has$($value$$) {
    return this.map_.has($value$$);
  };
  $PolyfillSet$$.prototype.entries = function $$PolyfillSet$$$$entries$() {
    return this.map_.entries();
  };
  $PolyfillSet$$.prototype.values = function $$PolyfillSet$$$$values$() {
    return this.map_.values();
  };
  $PolyfillSet$$.prototype.keys = $PolyfillSet$$.prototype.values;
  $PolyfillSet$$.prototype[Symbol.iterator] = $PolyfillSet$$.prototype.values;
  $PolyfillSet$$.prototype.forEach = function $$PolyfillSet$$$$forEach$($callback$$, $opt_thisArg$$) {
    var $set$$ = this;
    this.map_.forEach(function($value$$) {
      return $callback$$.call($opt_thisArg$$, $value$$, $value$$, $set$$);
    });
  };
  return $PolyfillSet$$;
}, "es6", "es3");
function module$exports$compilers$blur() {
  for (var $nodes$$ = Silica.query(this, "[data-blur]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onblur = function $$node$$$onblur$($evt$$) {
      Silica._call(this, $evt$$, "blur");
    };
  }
}
;function module$exports$compilers$class() {
  var $nodes$$ = Silica.query(this, "[data-class]"), $klass$$;
  9 !== this.nodeType && this.dataset["class"] && (null == this.dataset._rt_hard_klass && (this.dataset._rt_hard_klass = this.className), ($klass$$ = Silica.getValue(this, this.dataset["class"], null, null)) && this.classList.add($klass$$));
  for (var $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $nodes$$[$i$$];
    null == $node$$.dataset._rt_hard_klass && ($node$$.dataset._rt_hard_klass = $node$$.className.split("hidden").join(" ").trim());
    ($klass$$ = Silica.getValue($node$$, $node$$.dataset["class"], null, [$node$$, $node$$.dataset.parameter])) && $node$$.classList.add($klass$$);
  }
}
;function module$exports$compilers$click() {
  for (var $nodes$$ = Silica.query(this, "[data-click]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onclick = function $$node$$$onclick$($evt$$) {
      ($node$$ === $evt$$.target || "SELECT" !== $evt$$.target.nodeName && "INPUT" !== $evt$$.target.nodeName) && Silica._call(this, $evt$$, "click");
    };
  }
}
;function module$contents$compilers$clickoutside_handleClick($evt$$) {
  for (var $$jscomp$iter$0$$ = $jscomp.makeIterator(Silica._clickOutElements), $$jscomp$key$node_node$$ = $$jscomp$iter$0$$.next(); !$$jscomp$key$node_node$$.done; $$jscomp$key$node_node$$ = $$jscomp$iter$0$$.next()) {
    if ($$jscomp$key$node_node$$ = $$jscomp$key$node_node$$.value, 0 < $$jscomp$key$node_node$$.offsetWidth || 0 < $$jscomp$key$node_node$$.offsetHeight) {
      $evt$$.target === $$jscomp$key$node_node$$ || Silica.isDescendent($$jscomp$key$node_node$$, $evt$$.target) || Silica._call($$jscomp$key$node_node$$, $evt$$, "clickOutside");
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
  for (var $k$$ in Silica.directives) {
    for (var $obj$$ = Silica.directives[$k$$], $nodes$$ = Silica.queryOfType(this, $k$$), $wrapper$$ = document.createElement("div"), $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
      $wrapper$$.innerHTML = $obj$$.template;
      var $newChild$$ = $wrapper$$.firstChild, $node$$ = $nodes$$[$i$$];
      if ($node$$.hasAttributes()) {
        for (var $attrs_v$$ = $node$$.attributes, $j$$ = $attrs_v$$.length - 1; 0 <= $j$$; $j$$--) {
          $newChild$$.setAttribute($attrs_v$$[$j$$].name, $attrs_v$$[$j$$].value);
        }
      }
      for (var $j$8$$ in $node$$.dataset) {
        $newChild$$.dataset[$j$8$$] = $node$$.dataset[$j$8$$];
      }
      $newChild$$._rt_ctrl = new $obj$$.controller($newChild$$);
      $newChild$$._rt_ctrl.$ctrl = Silica.getContext($node$$.parentElement);
      $newChild$$.dataset.sio2Directive = !0;
      Silica.cacheTemplates($newChild$$);
      Silica.interpolate($newChild$$, $newChild$$._rt_ctrl, !1);
      $node$$.parentNode.replaceChild($newChild$$, $node$$);
      $node$$ = $obj$$.controller.watchers;
      for (var $w$$ in $node$$) {
        $attrs_v$$ = $node$$[$w$$], Silica._watch[$w$$] || (Silica._watch[$w$$] = []), Silica._watch[$w$$].push([$newChild$$._rt_ctrl, $attrs_v$$]);
      }
      if ("function" === typeof $newChild$$._rt_ctrl.onLoad) {
        $newChild$$._rt_ctrl.onLoad();
      }
    }
  }
}
;function module$exports$compilers$if() {
  for (var $nodes$$ = Silica.queryWithComments(this, "[data-if]"), $comment_isVisible_live_negate_subNodes$$, $raw$$, $list$$, $node$$, $_ref$$, $temp$$ = document.createElement("div"), $$jscomp$loop$30$$ = {}, $i$$ = $nodes$$.length - 1; 0 <= $i$$; $$jscomp$loop$30$$ = {subNode:$$jscomp$loop$30$$.subNode}, --$i$$) {
    if ($node$$ = $nodes$$[$i$$], 8 === $node$$.nodeType ? ($temp$$.innerHTML = $node$$.nodeValue, $raw$$ = $list$$ = $temp$$.firstElementChild.dataset["if"]) : $raw$$ = $list$$ = $node$$.dataset["if"], ($comment_isVisible_live_negate_subNodes$$ = "!" === $list$$[0]) && ($list$$ = $list$$.substr(1)), Silica._ifs[$raw$$] || (Silica._ifs[$raw$$] = []), $comment_isVisible_live_negate_subNodes$$ = Silica._show($node$$, $list$$, $comment_isVisible_live_negate_subNodes$$)) {
      if (8 !== $node$$.nodeType ? Silica._ifs[$raw$$].push($node$$) : ($comment_isVisible_live_negate_subNodes$$ = $temp$$.firstElementChild, Silica._ifs[$raw$$].push($comment_isVisible_live_negate_subNodes$$), $node$$.parentElement.insertBefore($comment_isVisible_live_negate_subNodes$$, $node$$), $node$$.remove(), $node$$ = $comment_isVisible_live_negate_subNodes$$), null != ($_ref$$ = Silica.getContext($node$$)) && "function" === typeof $_ref$$.onLoad && $_ref$$.el === $node$$) {
        $_ref$$.onLoad();
      }
    } else {
      if (8 !== $node$$.nodeType) {
        $comment_isVisible_live_negate_subNodes$$ = Silica.queryWithComments($node$$, "[data-if]");
        $$jscomp$loop$30$$.subNode = void 0;
        for (var $$jscomp$loop$31_prop$$, $j$9_j$$ = $comment_isVisible_live_negate_subNodes$$.length - 1; 0 <= $j$9_j$$; --$j$9_j$$) {
          $$jscomp$loop$30$$.subNode = $comment_isVisible_live_negate_subNodes$$[$j$9_j$$], $$jscomp$loop$31_prop$$ = $$jscomp$loop$30$$.subNode.dataset["if"], $list$$ = Silica._shws[$$jscomp$loop$31_prop$$], Silica._shws[$$jscomp$loop$31_prop$$] = null != $list$$ ? $list$$.filter(function($$jscomp$loop$30$$) {
            return function($obj$$) {
              return $obj$$ !== $$jscomp$loop$30$$.subNode;
            };
          }($$jscomp$loop$30$$)) : [];
        }
        $comment_isVisible_live_negate_subNodes$$ = Silica.query(this, "[data-controller]");
        $$jscomp$loop$31_prop$$ = {};
        for ($j$9_j$$ = $comment_isVisible_live_negate_subNodes$$.length - 1; 0 <= $j$9_j$$; $$jscomp$loop$31_prop$$ = {ctrl:$$jscomp$loop$31_prop$$.ctrl}, --$j$9_j$$) {
          $$jscomp$loop$30$$.subNode = $comment_isVisible_live_negate_subNodes$$[$j$9_j$$];
          $$jscomp$loop$31_prop$$.ctrl = this._rt_ctrl;
          var $k$$ = void 0;
          for ($k$$ in null != $$jscomp$loop$31_prop$$.ctrl ? $$jscomp$loop$31_prop$$.ctrl.watchers : void 0) {
            $list$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$$ ? $list$$.filter(function($$jscomp$loop$31$$) {
              return function($obj$$) {
                return $obj$$[0] !== $$jscomp$loop$31$$.ctrl;
              };
            }($$jscomp$loop$31_prop$$)) : [];
          }
        }
        $comment_isVisible_live_negate_subNodes$$ = document.createComment($node$$.outerHTML);
        Silica._ifs[$raw$$].push($comment_isVisible_live_negate_subNodes$$);
        $node$$.parentNode.replaceChild($comment_isVisible_live_negate_subNodes$$, $node$$);
      }
    }
  }
}
;function module$exports$compilers$show() {
  for (var $nodes$$ = Silica.query(this, "[data-show]"), $node$$, $isVisible$jscomp$1_negate$$, $raw$$, $val$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $raw$$ = $val$$ = $node$$.dataset.show, ($isVisible$jscomp$1_negate$$ = "!" === $val$$[0]) && ($val$$ = $val$$.substr(1)), Silica._shws[$raw$$] || (Silica._shws[$raw$$] = []), Silica._shws[$raw$$].some(function($obj$$) {
      return $obj$$ === $node$$;
    }) || ($node$$.onremove = function $$node$$$onremove$() {
      var $list$$ = Silica._shws[$raw$$];
      Silica._shws[$raw$$] = void 0 !== $list$$ && null !== $list$$ ? $list$$.filter(function($obj$$) {
        return $obj$$ !== $node$$;
      }) : [];
    }, $isVisible$jscomp$1_negate$$ = Silica._show($node$$, $val$$, $isVisible$jscomp$1_negate$$), Silica._shws[$raw$$].push($node$$), $isVisible$jscomp$1_negate$$ ? $node$$.classList.remove("hidden") : $node$$.classList.add("hidden"));
  }
}
;function module$exports$compilers$disabled() {
  for (var $nodes$$ = Silica.query(this, "[data-disabled]"), $node$$, $property$$, $negate$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $property$$ = $node$$.dataset.disabled, ($negate$$ = "!" === $property$$[0]) && ($property$$ = $property$$.substr(1)), Silica._show($node$$, $property$$, $negate$$) ? $node$$.setAttribute("disabled", !0) : $node$$.removeAttribute("disabled");
  }
}
;function module$exports$compilers$href() {
  for (var $nodes$$ = Silica.query(this, "[data-href]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.setAttribute("href", Silica.getValue($node$$, $node$$.dataset.href));
  }
  Silica._capture_links(this);
}
;function module$exports$compilers$style() {
  for (var $nodes$$ = Silica.query(this, "[data-style]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.setAttribute("style", Silica.getValue($node$$, $node$$.dataset.style));
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
  var $fragment$$ = document.createElement("div");
  $fragment$$.innerHTML = $html$$;
  for (module$contents$compilers$include_clearContent($element$$); $fragment$$.children.length;) {
    $element$$.appendChild($fragment$$.children[0]);
  }
  Silica.compile($element$$);
  Silica.apply(function() {
    module$contents$compilers$include_loadCallback($element$$);
  }, Silica.getContext($element$$).el);
}
function module$contents$compilers$include_loadPartial($url$$, $element$$) {
  if ($element$$.dataset.sio2IncludedUrl !== $url$$) {
    $element$$.dataset.sio2IncludedUrl = $url$$;
    module$contents$compilers$include_clearContent($element$$);
    var $cached$$ = Silica._includeCache[$url$$];
    if ($cached$$) {
      module$contents$compilers$include_processInclude($element$$, $cached$$);
    } else {
      var $xhr$$ = new XMLHttpRequest;
      $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
        4 === $xhr$$.readyState && (Silica._includeCache[$url$$] = $xhr$$.responseText, $element$$.dataset.sio2IncludedUrl === $url$$ && module$contents$compilers$include_processInclude($element$$, $xhr$$.responseText));
      };
      $xhr$$.open("GET", $url$$, !0);
      $xhr$$.send(null);
    }
  }
}
function module$exports$compilers$include() {
  for (var $nodes$$ = Silica.query(this, "[data-include]"), $node$$, $url$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], ($url$$ = Silica.getValue($node$$, $node$$.dataset.include)) && "" !== $url$$ ? module$contents$compilers$include_loadPartial($url$$, $node$$) : ($node$$.removeAttribute("data-sio2-included-url"), module$contents$compilers$include_clearContent($node$$));
  }
}
;function module$exports$compilers$controller($ctx$jscomp$1_nodes$$, $force$$, $storeWatchers$$) {
  $force$$ = void 0 === $force$$ ? !1 : $force$$;
  $storeWatchers$$ = void 0 === $storeWatchers$$ ? !0 : $storeWatchers$$;
  var $k$$;
  $ctx$jscomp$1_nodes$$ = Silica.query(this, "[data-controller]");
  for (var $i$$ = $ctx$jscomp$1_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $ctx$jscomp$1_nodes$$[$i$$];
    if ($force$$ || void 0 === $node$$._rt_ctrl) {
      var $lastCtrl_v$$ = $node$$._rt_ctrl;
      delete $node$$._rt_ctrl;
      var $_ref$$ = $node$$.dataset.controller;
      if ("undefined" !== typeof($_ref$$ = $_ref$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2]) {
        var $model_parent$$ = ($model_parent$$ = $node$$.parentNode) ? Silica.getValue($model_parent$$, $_ref$$[2]) : Silica.getValue($node$$, $_ref$$[2], $node$$._rt_ctx);
        null == $model_parent$$ && ($storeWatchers$$ = !1);
      }
      $_ref$$ = $_ref$$[1];
      var $constructor_watchers$$ = eval($_ref$$);
      if (!$constructor_watchers$$) {
        return console.error("Unknown Controller: " + $node$$.dataset.controller);
      }
      $_ref$$ = "undefined" !== typeof $model_parent$$ ? new $constructor_watchers$$($node$$, $model_parent$$) : new $constructor_watchers$$($node$$);
      $constructor_watchers$$ = $constructor_watchers$$.watchers;
      if ($lastCtrl_v$$ && $constructor_watchers$$ && 0 < Object.keys($constructor_watchers$$).length) {
        for ($k$$ in $constructor_watchers$$) {
          var $stored$$ = Silica._watch[$k$$];
          if ($stored$$) {
            for (var $pairIdx$$ = $stored$$.length - 1; 0 <= $pairIdx$$; --$pairIdx$$) {
              $lastCtrl_v$$ === $stored$$[$pairIdx$$][0] && $stored$$.splice($pairIdx$$, 1);
            }
          }
        }
      }
      $node$$._rt_live = !0;
      $node$$._rt_ctrl = $_ref$$;
      if ($storeWatchers$$) {
        for ($k$$ in $constructor_watchers$$) {
          $lastCtrl_v$$ = $constructor_watchers$$[$k$$], Silica._watch[$k$$] || (Silica._watch[$k$$] = []), Silica._watch[$k$$].push([$_ref$$, $lastCtrl_v$$]);
        }
      }
      if ("function" === typeof $_ref$$.onLoad) {
        $_ref$$.onLoad();
      }
    }
  }
}
;function module$exports$compilers$double_click() {
  for (var $nodes$$ = Silica.query(this, "[data-dblclick]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ondblclick = function $$node$$$ondblclick$($evt$$) {
      Silica._call(this, $evt$$, "dblclick");
    };
  }
}
;function module$exports$compilers$focus() {
  for (var $nodes$$ = Silica.query(this, "[data-focus]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onfocus = function $$node$$$onfocus$($evt$$) {
      Silica._call(this, $evt$$, "focus");
    };
  }
}
;var module$contents$compilers$model_inputTypes = "text file number email password tel search url range date month week time datetime datetime-local color textarea select select-one".split(" ");
function module$exports$compilers$model($context_elm$$) {
  for (var $change_ctx$$, $model$jscomp$0$$, $type$jscomp$118_val$$, $elements$$ = Silica.query(this, "input[data-model]", "select[data-model]", "textarea[data-model]", "option[data-model]"), $i$$ = $elements$$.length - 1; 0 <= $i$$; $i$$--) {
    $context_elm$$ = $elements$$[$i$$], $change_ctx$$ = Silica.getContext($context_elm$$), $model$jscomp$0$$ = $context_elm$$.dataset.model, $type$jscomp$118_val$$ = $context_elm$$.type, -1 !== module$contents$compilers$model_inputTypes.indexOf($type$jscomp$118_val$$) ? $context_elm$$.value = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) : "radio" === $type$jscomp$118_val$$ ? ($type$jscomp$118_val$$ = $context_elm$$.value, $type$jscomp$118_val$$.match(/[0-9]/) && ($type$jscomp$118_val$$ = 
    parseInt($type$jscomp$118_val$$, 10)), $context_elm$$.checked = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) === $type$jscomp$118_val$$) : "checkbox" === $type$jscomp$118_val$$ ? $context_elm$$.checked = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) : "OPTION" === $context_elm$$.nodeName && ($context_elm$$.value = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$)), $change_ctx$$ = function $$change_ctx$$$() {
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
    }, $context_elm$$.onchange = $change_ctx$$, $context_elm$$.onkeyup = $change_ctx$$, $context_elm$$.onsearch = $change_ctx$$, $context_elm$$.hasAttribute("x-webkit-speech") && ($context_elm$$.onwebkitspeechchange = $change_ctx$$), $context_elm$$.addEventListener("focus", function() {
      Silica.__activeElement = this;
    }), $context_elm$$.addEventListener("blur", function() {
      Silica.__activeElement === this && (Silica.__activeElement = null);
    });
  }
}
;function module$exports$compilers$submit() {
  for (var $nodes$$ = Silica.query(this, "[data-submit]"), $node$$, $handler$$ = function $$handler$$$($evt$$) {
    Silica._call(this, $evt$$, "submit");
    return !1;
  }, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.onsubmit = $handler$$, $node$$._rt_live = !0;
  }
}
;function module$exports$compilers$src() {
  for (var $nodes$$ = Silica.queryOfType(this, "img", "[data-src]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$];
    var $target$$ = Silica.getValue($node$$, $node$$.dataset.src) || "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    $node$$.src !== $target$$ && ($node$$.src = $target$$);
  }
}
;function module$exports$compilers$scroll() {
  for (var $nodes$$ = Silica.query(this, "[data-scroll]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onscroll = function $$node$$$onscroll$($evt$$) {
      Silica._call(this, $evt$$, "scroll");
    };
  }
}
;function module$exports$compilers$scroll_finished() {
  for (var $nodes$$ = Silica.query(this, "[data-scroll-finished]"), $node$$, $$jscomp$loop$32$$ = {}, $i$$ = $nodes$$.length - 1; 0 <= $i$$; $$jscomp$loop$32$$ = {element:$$jscomp$loop$32$$.element}, --$i$$) {
    $node$$ = $nodes$$[$i$$];
    $node$$._rt_live = !0;
    $$jscomp$loop$32$$.element = this;
    var $onscrollfinished$$ = Silica.debounce(function($element$$, $evt$$) {
      Silica._call($element$$, $evt$$, "scroll-finished");
    }, 50);
    $node$$.onscroll = function($$jscomp$loop$32$$) {
      return function($evt$$) {
        this.dataset.scroll && Silica._call(this, $evt$$, "scroll");
        $onscrollfinished$$($$jscomp$loop$32$$.element, $evt$$);
      };
    }($$jscomp$loop$32$$);
  }
}
;function module$exports$compilers$value() {
  for (var $nodes$$ = Silica.query(this, "[data-value]"), $node$$, $property$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $property$$ = $node$$.dataset.value, $node$$.setAttribute("value", Silica.getValue($node$$, $property$$));
  }
}
;function module$exports$compilers$generic() {
  for (var $nodeList$$ = Silica.query(this, "[data-silica]"), $node$$, $entries$$, $comps_valueKey$$, $attribute$$, $params$$, $paramsKeys$$, $i$$ = $nodeList$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodeList$$[$i$$];
    $node$$._silica_generic ? $entries$$ = $node$$._silica_generic : ($entries$$ = $node$$.dataset.silica, $entries$$ = "[" === $entries$$.charAt(0) ? JSON.parse($entries$$) : [$entries$$], $node$$._silica_generic = $entries$$);
    for (var $j$$ = $entries$$.length - 1; 0 <= $j$$; --$j$$) {
      $comps_valueKey$$ = $entries$$[$j$$].split("=");
      if (2 !== $comps_valueKey$$.length) {
        console.error("Invalid generic binding", $node$$.dataset.silica, "for node", $node$$);
        return;
      }
      $attribute$$ = $comps_valueKey$$[0];
      $comps_valueKey$$ = $comps_valueKey$$[1];
      $paramsKeys$$ = $comps_valueKey$$.match("\\((.*)\\)");
      if (null !== $paramsKeys$$) {
        $paramsKeys$$.shift();
        $params$$ = [];
        for (var $j$10$$ = 0, $length$$ = $paramsKeys$$.length; $j$10$$ < $length$$; $j$10$$++) {
          $params$$.push(Silica.getValue($node$$, $paramsKeys$$[$j$10$$]));
        }
        $comps_valueKey$$ = $comps_valueKey$$.substr(0, $comps_valueKey$$.indexOf("("));
      }
      "innerHTML" !== $attribute$$ ? $node$$.setAttribute($attribute$$, Silica.getValue($node$$, $comps_valueKey$$, null, $params$$)) : $node$$.innerHTML = Silica.getValue($node$$, $comps_valueKey$$, null, $params$$);
    }
  }
  Silica._capture_links(this);
}
;function module$exports$compilers$load() {
  for (var $nodes$$ = Silica.query(this, "[data-load]"), $node$$ = null, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onload = function $$node$$$onload$($evt$$) {
      Silica._call(this, $evt$$, "load");
    };
  }
}
;function module$exports$compilers$mousedown() {
  for (var $nodes$$ = Silica.query(this, "[data-mousedown]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousedown = function $$node$$$onmousedown$($evt$$) {
      Silica._call(this, $evt$$, "mousedown");
    };
  }
}
;function module$exports$compilers$mouseenter() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseenter]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseenter = function $$node$$$onmouseenter$($evt$$) {
      Silica._call(this, $evt$$, "mouseenter");
    };
  }
}
;function module$exports$compilers$mouseleave() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseleave]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseleave = function $$node$$$onmouseleave$($evt$$) {
      Silica._call(this, $evt$$, "mouseleave");
    };
  }
}
;function module$exports$compilers$mousemove() {
  for (var $nodes$$ = Silica.query(this, "[data-mousemove]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousemove = function $$node$$$onmousemove$($evt$$) {
      Silica._call(this, $evt$$, "mousemove");
    };
  }
}
;function module$exports$compilers$mouseout() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseout]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseout = function $$node$$$onmouseout$($evt$$) {
      Silica._call(this, $evt$$, "mouseout");
    };
  }
}
;function module$exports$compilers$mouseover() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseover]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseover = function $$node$$$onmouseover$($evt$$) {
      Silica._call(this, $evt$$, "mouseover");
    };
  }
}
;function module$exports$compilers$mouseup() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseup]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseup = function $$node$$$onmouseup$($evt$$) {
      Silica._call(this, $evt$$, "mouseup");
    };
  }
}
;function module$exports$compilers$mousewheel() {
  for (var $nodes$$ = Silica.query(this, "[data-mousewheel]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousewheel = function $$node$$$onmousewheel$($evt$$) {
      Silica._call(this, $evt$$, "mousewheel");
    };
  }
}
;function module$exports$compilers$keydown($context$jscomp$1_elements$$) {
  $context$jscomp$1_elements$$ = Silica.query(this, "[data-keydown]");
  for (var $i$$ = $context$jscomp$1_elements$$.length - 1; 0 <= $i$$; $i$$--) {
    $context$jscomp$1_elements$$[$i$$].addEventListener("keydown", function($evt$$) {
      Silica._call(this, $evt$$, "keydown");
    });
  }
}
;function module$exports$compilers$keyup($context$jscomp$2_elements$$) {
  $context$jscomp$2_elements$$ = Silica.query(this, "[data-keyup]");
  for (var $i$$ = $context$jscomp$2_elements$$.length - 1; 0 <= $i$$; $i$$--) {
    $context$jscomp$2_elements$$[$i$$].addEventListener("keyup", function($evt$$) {
      Silica._call(this, $evt$$, "keyup");
    });
  }
}
;function module$exports$compilers$touch$start() {
  for (var $nodes$$ = Silica.query(this, "[data-touchstart]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchstart = function $$node$$$ontouchstart$($evt$$) {
      Silica._call(this, $evt$$, "touchstart");
    };
  }
}
;function module$exports$compilers$touch$cancel() {
  for (var $nodes$$ = Silica.query(this, "[data-touchcancel]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchcancel = function $$node$$$ontouchcancel$($evt$$) {
      Silica._call(this, $evt$$, "touchcancel");
    };
  }
}
;function module$exports$compilers$touch$end() {
  for (var $nodes$$ = Silica.query(this, "[data-touchend]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchend = function $$node$$$ontouchend$($evt$$) {
      Silica._call(this, $evt$$, "touchend");
    };
  }
}
;function module$exports$compilers$touch$move() {
  for (var $nodes$$ = Silica.query(this, "[data-touchmove]"), $node$$, $i$$ = $nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchmove = function $$node$$$ontouchmove$($evt$$) {
      Silica._call(this, $evt$$, "touchmove");
    };
  }
}
;var module$exports$compilers = {"1_Directive":module$exports$compilers$directives, _if:module$exports$compilers$if, "2_Value":module$exports$compilers$value, Show:module$exports$compilers$show, Class:module$exports$compilers$class, Disabled:module$exports$compilers$disabled, Href:module$exports$compilers$href, Style:module$exports$compilers$style, Include:module$exports$compilers$include, Controller:module$exports$compilers$controller, Click:module$exports$compilers$click, ClickOutside:module$exports$compilers$clickoutside, 
DoubleClick:module$exports$compilers$double_click, Blur:module$exports$compilers$blur, Focus:module$exports$compilers$focus, Submit:module$exports$compilers$submit, Src:module$exports$compilers$src, Scroll:module$exports$compilers$scroll, ScrollFinished:module$exports$compilers$scroll_finished, Generic:module$exports$compilers$generic, Model:module$exports$compilers$model, Load:module$exports$compilers$load, MouseDown:module$exports$compilers$mousedown, MouseUp:module$exports$compilers$mouseup, MouseOut:module$exports$compilers$mouseout, 
MouseMove:module$exports$compilers$mousemove, MouseWheel:module$exports$compilers$mousewheel, MouseLeave:module$exports$compilers$mouseleave, MouseEnter:module$exports$compilers$mouseenter, MouseOver:module$exports$compilers$mouseover, KeyDown:module$exports$compilers$keydown, KeyUp:module$exports$compilers$keyup, TouchStart:module$exports$compilers$touch$start, TouchCancel:module$exports$compilers$touch$cancel, TouchEnd:module$exports$compilers$touch$end, TouchMove:module$exports$compilers$touch$move};
var module$exports$controllers$Base = function $module$exports$controllers$Base$($el$$) {
  this.el = $el$$;
  $el$$.parentElement && (this.$ctrl = Silica.getContext($el$$.parentElement));
};
module$exports$controllers$Base.prototype.$ = function $module$exports$controllers$Base$$$$($selector$$) {
  return this.el.querySelectorAll($selector$$);
};
module$exports$controllers$Base.watchers = {};
module$exports$controllers$Base.prototype.$ = module$exports$controllers$Base.prototype.$;
var module$exports$controllers$FSM = {}, module$contents$controllers$FSM_State = function $module$contents$controllers$FSM_State$() {
};
module$contents$controllers$FSM_State.prototype.onEnter = function $module$contents$controllers$FSM_State$$onEnter$($ctrl$$) {
};
module$contents$controllers$FSM_State.prototype.onExit = function $module$contents$controllers$FSM_State$$onExit$($ctrl$$) {
};
module$contents$controllers$FSM_State.prototype.onEnter = module$contents$controllers$FSM_State.prototype.onEnter;
module$contents$controllers$FSM_State.prototype.onExit = module$contents$controllers$FSM_State.prototype.onExit;
var module$contents$controllers$FSM_Controller = function $module$contents$controllers$FSM_Controller$($el$$) {
  module$exports$controllers$Base.call(this, $el$$);
  var $$jscomp$this$$ = this;
  $el$$ = this.constructor.states;
  this._states = {};
  for (var $stateName$$ in $el$$) {
    this._states[$stateName$$] = new $el$$[$stateName$$];
  }
  this.handle = this.handle;
  this.transition = this.transition;
  this._currentState = new module$contents$controllers$FSM_State;
  this._previousStateName = "";
  this.initialState && (this._currentStateName = this.initialState(), this._currentState = this._getStateWithName(this._currentStateName), Silica.defer(function() {
    $$jscomp$this$$._currentState.onEnter($$jscomp$this$$);
  }));
};
$jscomp.inherits(module$contents$controllers$FSM_Controller, module$exports$controllers$Base);
module$contents$controllers$FSM_Controller.prototype._getStateWithName = function $module$contents$controllers$FSM_Controller$$_getStateWithName$($stateName$$) {
  var $target$$ = this._states[$stateName$$];
  if (!$target$$) {
    throw Error("Unknown state " + $stateName$$ + " in " + this.constructor.name);
  }
  return $target$$;
};
module$contents$controllers$FSM_Controller.prototype.transition = function $module$contents$controllers$FSM_Controller$$transition$($stateName$$, $args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 1; $$jscomp$restIndex$$ < arguments.length; ++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 1] = arguments[$$jscomp$restIndex$$];
  }
  var $$jscomp$this$$ = this, $target$$ = this._getStateWithName($stateName$$);
  $target$$ !== this._currentState && Silica.defer(function() {
    $$jscomp$this$$._previousStateName = $$jscomp$this$$._currentStateName;
    $$jscomp$this$$._currentState.onExit($$jscomp$this$$);
    $$jscomp$this$$._currentState = $target$$;
    $$jscomp$this$$._currentStateName = $stateName$$;
    Silica.defer(function() {
      $$jscomp$this$$._currentState.onEnter.apply(null, [$$jscomp$this$$].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
    });
  });
};
module$contents$controllers$FSM_Controller.prototype.handle = function $module$contents$controllers$FSM_Controller$$handle$($functionName$$, $args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$jscomp$1_func$$ = 1; $$jscomp$restIndex$jscomp$1_func$$ < arguments.length; ++$$jscomp$restIndex$jscomp$1_func$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$jscomp$1_func$$ - 1] = arguments[$$jscomp$restIndex$jscomp$1_func$$];
  }
  if (this._currentState && ($$jscomp$restIndex$jscomp$1_func$$ = this._currentState[$functionName$$])) {
    return "function" === typeof $$jscomp$restIndex$jscomp$1_func$$ ? $$jscomp$restIndex$jscomp$1_func$$.apply(this._currentState, [this].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))) : $$jscomp$restIndex$jscomp$1_func$$;
  }
};
$jscomp.global.Object.defineProperties(module$contents$controllers$FSM_Controller, {states:{configurable:!0, enumerable:!0, get:function() {
  return {base:module$contents$controllers$FSM_State};
}}});
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
module$exports$hax.getDatasetProperty = module$exports$hax$safari.getDatasetProperty;
module$exports$hax.hasDatasetProperty = module$exports$hax$safari.hasDatasetProperty;
var module$exports$silica$pubsub = {}, module$contents$silica$pubsub_subscriptions = new Map, module$contents$silica$pubsub_subscriptionID = 1, module$contents$silica$pubsub_subscriptionSeparator = "[--+--]";
function module$contents$silica$pubsub_nextSubscriptionID() {
  return module$contents$silica$pubsub_subscriptionID++;
}
module$exports$silica$pubsub.Sub = function $module$exports$silica$pubsub$Sub$($channel$$, $handler$$, $context$$) {
  $context$$ = void 0 === $context$$ ? document : $context$$;
  var $subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$);
  $subs$$ || ($subs$$ = new Map, module$contents$silica$pubsub_subscriptions.set($channel$$, $subs$$));
  var $id$$ = module$contents$silica$pubsub_nextSubscriptionID();
  $subs$$.set($id$$, [$handler$$, $context$$]);
  return "" + $channel$$ + module$contents$silica$pubsub_subscriptionSeparator + $id$$;
};
module$exports$silica$pubsub.Pub = function $module$exports$silica$pubsub$Pub$($channel$$, $args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 1; $$jscomp$restIndex$$ < arguments.length; ++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 1] = arguments[$$jscomp$restIndex$$];
  }
  var $subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$);
  $subs$$ && setTimeout(function() {
    for (var $$jscomp$loop$33$$ = {}, $$jscomp$iter$1$$ = $jscomp.makeIterator($subs$$), $$jscomp$destructuring$var1_$jscomp$key$$$ = $$jscomp$iter$1$$.next(); !$$jscomp$destructuring$var1_$jscomp$key$$$.done; $$jscomp$loop$33$$ = {value:$$jscomp$loop$33$$.value}, $$jscomp$destructuring$var1_$jscomp$key$$$ = $$jscomp$iter$1$$.next()) {
      $$jscomp$destructuring$var1_$jscomp$key$$$ = $jscomp.makeIterator($$jscomp$destructuring$var1_$jscomp$key$$$.value), $$jscomp$destructuring$var1_$jscomp$key$$$.next(), $$jscomp$loop$33$$.value = $$jscomp$destructuring$var1_$jscomp$key$$$.next().value, Silica.enqueue(function($$jscomp$loop$33$$) {
        return function() {
          $$jscomp$loop$33$$.value[0].apply(null, $jscomp.arrayFromIterable($$jscomp$restParams$$));
        };
      }($$jscomp$loop$33$$), $$jscomp$loop$33$$.value[1]);
    }
  }, 0);
};
module$exports$silica$pubsub.Unsub = function $module$exports$silica$pubsub$Unsub$($channel$$) {
  var $$jscomp$destructuring$var2_id$$ = $jscomp.makeIterator($channel$$.split(module$contents$silica$pubsub_subscriptionSeparator));
  $channel$$ = $$jscomp$destructuring$var2_id$$.next().value;
  $$jscomp$destructuring$var2_id$$ = $$jscomp$destructuring$var2_id$$.next().value;
  var $subs$$ = module$contents$silica$pubsub_subscriptions.get($channel$$);
  $subs$$ && ($subs$$.delete(parseInt($$jscomp$destructuring$var2_id$$, 10)), 0 === $subs$$.size && module$contents$silica$pubsub_subscriptions.delete($channel$$));
};
function module$exports$watchers$if() {
  var $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$, $k$$, $negate$$, $_len$$, $wrapper$$ = document.createElement("div");
  var $_ref$$ = Silica._ifs;
  for ($k$$ in $_ref$$) {
    var $elements$$ = $_ref$$[$k$$];
    var $raw$$ = $k$$;
    ($negate$$ = "!" === $k$$[0]) && ($k$$ = $k$$.substr(1));
    var $$jscomp$loop$34$$ = {};
    var $i$$ = 0;
    for ($_len$$ = $elements$$.length; $i$$ < $_len$$; $$jscomp$loop$34$$ = {subNode:$$jscomp$loop$34$$.subNode}, ++$i$$) {
      var $_ref$14_element$$ = $elements$$[$i$$];
      if ($_ref$14_element$$ === this || Silica.isDescendent(this, $_ref$14_element$$)) {
        if ($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = Silica._show($_ref$14_element$$, $k$$, $negate$$)) {
          if (8 === $_ref$14_element$$.nodeType && ($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = document.createElement("div"), $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$.innerHTML = $_ref$14_element$$.nodeValue, $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = Silica.compile($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$.firstElementChild, !1, Silica.getContext($_ref$14_element$$.parentElement)), 
          $_ref$14_element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$, $_ref$14_element$$), Silica._ifs[$raw$$][$i$$] = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$, $_ref$14_element$$ = void 0, null != ($_ref$14_element$$ = Silica.getContext($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$)) && "function" === typeof $_ref$14_element$$.onLoad && $_ref$14_element$$.el === $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$)) {
            $_ref$14_element$$.onLoad();
          }
        } else {
          if (8 !== $_ref$14_element$$.nodeType) {
            $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = Silica.queryWithComments($_ref$14_element$$, "[data-if]");
            $$jscomp$loop$34$$.subNode = void 0;
            for (var $$jscomp$loop$35_j$$ = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$.length - 1; 0 <= $$jscomp$loop$35_j$$; --$$jscomp$loop$35_j$$) {
              var $list$$ = void 0, $_ref1$$;
              $$jscomp$loop$34$$.subNode = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$[$$jscomp$loop$35_j$$];
              if (8 !== $$jscomp$loop$34$$.subNode.nodeType || $$jscomp$loop$34$$.subNode.dataset) {
                var $j$15_prop$$ = $$jscomp$loop$34$$.subNode.dataset["if"];
              } else {
                $wrapper$$.innerHTML = $$jscomp$loop$34$$.subNode.data, $j$15_prop$$ = $wrapper$$.firstChild.dataset["if"];
              }
              $list$$ = Silica._shws[$j$15_prop$$];
              Silica._shws[$j$15_prop$$] = null != ($_ref1$$ = null != $list$$ ? $list$$.filter(function($$jscomp$loop$34$$) {
                return function($obj$$) {
                  return !$obj$$ === $$jscomp$loop$34$$.subNode;
                };
              }($$jscomp$loop$34$$)) : void 0) ? $_ref1$$ : [];
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = Silica.query($_ref$14_element$$, "[data-controller]");
            $$jscomp$loop$35_j$$ = {};
            for ($j$15_prop$$ = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$.length - 1; 0 <= $j$15_prop$$; $$jscomp$loop$35_j$$ = {ctrl:$$jscomp$loop$35_j$$.ctrl}, --$j$15_prop$$) {
              for ($k$$ in $$jscomp$loop$35_j$$.ctrl = void 0, $$jscomp$loop$34$$.subNode = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$[$j$15_prop$$], $$jscomp$loop$35_j$$.ctrl = $$jscomp$loop$34$$.subNode._rt_ctrl, null != $$jscomp$loop$35_j$$.ctrl ? $$jscomp$loop$35_j$$.ctrl.constructor.watchers : void 0) {
                $list$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$$ ? $list$$.filter(function($$jscomp$loop$35$$) {
                  return function($obj$$) {
                    return $obj$$[0] !== $$jscomp$loop$35$$.ctrl;
                  };
                }($$jscomp$loop$35_j$$)) : [];
              }
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$ = document.createComment($_ref$14_element$$.outerHTML);
            $_ref$14_element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$, $_ref$14_element$$);
            Silica._ifs[$raw$$][$i$$] = $comment$jscomp$1_compiled_isVisible$jscomp$2_subNodes$jscomp$1_temp$$;
          }
        }
      }
    }
  }
}
;function module$exports$watchers$repeat() {
  for (var $changed_obj$jscomp$38_oldList_template$$, $child_node$$, $context$$, $ctx$$, $list$jscomp$4_newList_param$$, $model$$, $_i_countDiff_j$$, $_len$jscomp$1_fragment$jscomp$1_len$$, $_ref$$, $raw$$, $elements$$ = Silica.querySorted(this, "[data-repeat]"), $i$$ = 0, $length$$ = $elements$$.length; $i$$ < $length$$; ++$i$$) {
    if ($raw$$ = $elements$$[$i$$], $ctx$$ = $raw$$.dataset.repeat.split(/\s+in\s+/), $list$jscomp$4_newList_param$$ = $ctx$$[1], $model$$ = $ctx$$[0], $ctx$$ = Silica.getContext($raw$$), "undefined" !== typeof($_ref$$ = $list$jscomp$4_newList_param$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] ? ($list$jscomp$4_newList_param$$ = $_ref$$[2], $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$.parentNode, $list$jscomp$4_newList_param$$), $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$, 
    $_ref$$[1], null, $list$jscomp$4_newList_param$$)) : $list$jscomp$4_newList_param$$ = Silica.getValue($raw$$, $list$jscomp$4_newList_param$$), $context$$ = Silica.hasher(JSON.stringify($list$jscomp$4_newList_param$$, function($key$$, $value$$) {
      if ($key$$.constructor !== String || "__elm" !== $key$$ && "$ctrl" !== $key$$ && 95 !== $key$$.charCodeAt(0)) {
        return $value$$;
      }
    })), $_ref$$ = $raw$$.childNodes, $changed_obj$jscomp$38_oldList_template$$ = ($changed_obj$jscomp$38_oldList_template$$ = $raw$$._rt_repeat_list) && $list$jscomp$4_newList_param$$ ? $changed_obj$jscomp$38_oldList_template$$ !== $context$$ : !0) {
      if ($raw$$._rt_repeat_list = $list$jscomp$4_newList_param$$ ? $context$$ : null, $list$jscomp$4_newList_param$$) {
        $list$jscomp$4_newList_param$$.constructor === Number && ($list$jscomp$4_newList_param$$ = Array($list$jscomp$4_newList_param$$));
        $changed_obj$jscomp$38_oldList_template$$ = Silica._repeat_templates[module$exports$hax$safari.getDatasetProperty($raw$$, "_rt_repeat_template")];
        if ($list$jscomp$4_newList_param$$.constructor === Object) {
          $context$$ = Object.keys($list$jscomp$4_newList_param$$);
          $child_node$$ = $list$jscomp$4_newList_param$$;
          $list$jscomp$4_newList_param$$ = [];
          $_i_countDiff_j$$ = 0;
          $_len$jscomp$1_fragment$jscomp$1_len$$ = $context$$.length;
          for (var $key$jscomp$0$$ = $context$$[$_i_countDiff_j$$]; $_i_countDiff_j$$ < $_len$jscomp$1_fragment$jscomp$1_len$$; $_i_countDiff_j$$++) {
            $key$jscomp$0$$ = $context$$[$_i_countDiff_j$$], $list$jscomp$4_newList_param$$[$_i_countDiff_j$$] = {key:$key$jscomp$0$$, value:$child_node$$[$key$jscomp$0$$]};
          }
        }
        $_i_countDiff_j$$ = $raw$$.childElementCount - $list$jscomp$4_newList_param$$.length;
        for ($child_node$$ = void 0; 0 < $_i_countDiff_j$$;) {
          Silica.removeFromDOM($_ref$$[$_i_countDiff_j$$ - 1]), --$_i_countDiff_j$$;
        }
        for ($_len$jscomp$1_fragment$jscomp$1_len$$ = document.createDocumentFragment(); 0 > $_i_countDiff_j$$;) {
          $context$$ = {};
          $context$$[$model$$] = $list$jscomp$4_newList_param$$[$list$jscomp$4_newList_param$$.length + $_i_countDiff_j$$];
          $context$$.$ctrl = $ctx$$;
          $child_node$$ = $changed_obj$jscomp$38_oldList_template$$.cloneNode(!0);
          $child_node$$._rt_ctx = $context$$;
          for ($key$jscomp$0$$ in Silica.compilers) {
            Silica.compilers[$key$jscomp$0$$].call($child_node$$);
          }
          $_len$jscomp$1_fragment$jscomp$1_len$$.appendChild($child_node$$);
          ++$_i_countDiff_j$$;
        }
        $_len$jscomp$1_fragment$jscomp$1_len$$.hasChildNodes() && $raw$$.appendChild($_len$jscomp$1_fragment$jscomp$1_len$$);
        $_i_countDiff_j$$ = 0;
        for ($_len$jscomp$1_fragment$jscomp$1_len$$ = $list$jscomp$4_newList_param$$.length; $_i_countDiff_j$$ < $_len$jscomp$1_fragment$jscomp$1_len$$; $_i_countDiff_j$$++) {
          $changed_obj$jscomp$38_oldList_template$$ = $list$jscomp$4_newList_param$$[$_i_countDiff_j$$];
          $child_node$$ = $_ref$$[$_i_countDiff_j$$];
          var $modelChanged$$ = $model$$ !== $changed_obj$jscomp$38_oldList_template$$;
          $child_node$$._rt_ctx ? $child_node$$._rt_ctx[$model$$] = $changed_obj$jscomp$38_oldList_template$$ : ($context$$ = {}, $context$$[$model$$] = $changed_obj$jscomp$38_oldList_template$$, $context$$.$ctrl = $ctx$$, $child_node$$._rt_ctx = $context$$);
          $modelChanged$$ && module$exports$compilers$controller.call($child_node$$, $child_node$$._rt_ctx, !0);
          $child_node$$._rt_ctx.index = $_i_countDiff_j$$;
          Silica.flush($child_node$$, !1, {}, !0);
        }
        $ctx$$.renderedRepeat ? $ctx$$.renderedRepeat($raw$$) : $ctx$$.$ctrl && $ctx$$.$ctrl.renderedRepeat && $ctx$$.$ctrl.renderedRepeat($raw$$);
      } else {
        for (; 0 < $raw$$.childNodes.length;) {
          Silica.removeFromDOM($raw$$.childNodes[0]);
        }
      }
    }
  }
}
;function module$exports$watchers$show() {
  var $i$$, $negate$$;
  var $elements$$ = Silica.query(this, "[data-show]");
  if (this.dataset.show) {
    if (0 === $elements$$.length) {
      $elements$$ = [this];
    } else {
      var $a_element$$ = [];
      for ($i$$ = $elements$$.length - 1; 0 <= $i$$; $i$$--) {
        $a_element$$[$i$$] = $elements$$[$i$$];
      }
      $elements$$ = $a_element$$;
    }
  }
  for ($i$$ = $elements$$.length - 1; 0 <= $i$$; $i$$--) {
    if ($a_element$$ = $elements$$[$i$$], Silica.isInDOM($a_element$$)) {
      var $isVisible$jscomp$3_k$$ = $a_element$$.dataset.show;
      ($negate$$ = "!" === $isVisible$jscomp$3_k$$[0]) && ($isVisible$jscomp$3_k$$ = $isVisible$jscomp$3_k$$.substr(1));
      ($isVisible$jscomp$3_k$$ = Silica._show($a_element$$, $isVisible$jscomp$3_k$$, $negate$$)) && $a_element$$.classList.contains("hidden") ? $a_element$$.classList.remove("hidden") : $isVisible$jscomp$3_k$$ || $a_element$$.classList.contains("hidden") || $a_element$$.classList.add("hidden");
    }
  }
}
;function module$contents$watchers$class_updater($element$$) {
  var $hardClass_isVisible$jscomp$4_key$$ = $element$$.dataset._rt_hard_klass || "", $klass$$ = Silica.getValue($element$$, $element$$.dataset["class"], null, [$element$$, $element$$.dataset.parameter]) || "";
  if ("" === $klass$$) {
    if ($element$$.className === $hardClass_isVisible$jscomp$4_key$$) {
      return;
    }
    $element$$.className = $hardClass_isVisible$jscomp$4_key$$;
  } else {
    if ($klass$$ instanceof Array || ($klass$$ = [$klass$$]), $element$$.classList.length !== $klass$$.length) {
      $element$$.className = $hardClass_isVisible$jscomp$4_key$$, $element$$.classList.add.apply($element$$.classList, $klass$$);
    } else {
      for (var $$jscomp$iter$3_applied$$ = !1, $$jscomp$iter$2$$ = $jscomp.makeIterator($klass$$), $$jscomp$key$k$$ = $$jscomp$iter$2$$.next(); !$$jscomp$key$k$$.done; $$jscomp$key$k$$ = $$jscomp$iter$2$$.next()) {
        if (!$element$$.classList.contains($$jscomp$key$k$$.value)) {
          $element$$.className = $hardClass_isVisible$jscomp$4_key$$;
          $element$$.classList.add.apply($element$$.classList, $klass$$);
          $$jscomp$iter$3_applied$$ = !0;
          break;
        }
      }
      if (!$$jscomp$iter$3_applied$$) {
        for ($$jscomp$iter$3_applied$$ = $jscomp.makeIterator($element$$.classList.values()), $$jscomp$key$k$$ = $$jscomp$iter$3_applied$$.next(); !$$jscomp$key$k$$.done; $$jscomp$key$k$$ = $$jscomp$iter$3_applied$$.next()) {
          if (!$klass$$.includes($$jscomp$key$k$$.value)) {
            $element$$.className = $hardClass_isVisible$jscomp$4_key$$;
            $element$$.classList.add.apply($element$$.classList, $klass$$);
            break;
          }
        }
      }
    }
  }
  null != $element$$.dataset.show && ($hardClass_isVisible$jscomp$4_key$$ = $element$$.dataset.show, ($hardClass_isVisible$jscomp$4_key$$ = Silica._show($element$$, $hardClass_isVisible$jscomp$4_key$$, "!" === $hardClass_isVisible$jscomp$4_key$$[0])) && $element$$.classList.contains("hidden") ? $element$$.classList.remove("hidden") : $hardClass_isVisible$jscomp$4_key$$ || $element$$.classList.contains("hidden") || $element$$.classList.add("hidden"));
}
function module$exports$watchers$class() {
  var $elements$$ = Silica.query(this, "[data-class]");
  this.dataset["class"] && module$contents$watchers$class_updater(this);
  for (var $i$$ = $elements$$.length - 1; 0 <= $i$$; --$i$$) {
    module$contents$watchers$class_updater($elements$$[$i$$]);
  }
}
;var module$contents$watchers$model_inputTypes = "text file number email password tel search url range date month week time datetime datetime-local color textarea select select-one".split(" ");
function module$exports$watchers$model() {
  var $elements$$ = Silica.query(this, "[data-model]"), $i$$, $activeElement$$ = document.activeElement || Silica.__activeElement;
  for ($i$$ = $elements$$.length - 1; 0 <= $i$$; --$i$$) {
    var $element$$ = $elements$$[$i$$];
    if ($element$$ !== $activeElement$$ || "radio" === $element$$.type || "checkbox" === $element$$.type) {
      var $type$jscomp$119_val$$ = $element$$.type;
      -1 !== module$contents$watchers$model_inputTypes.indexOf($type$jscomp$119_val$$) ? $element$$.value = Silica._model_get_val($element$$) : "radio" === $type$jscomp$119_val$$ ? ($type$jscomp$119_val$$ = $element$$.value, -1 !== $type$jscomp$119_val$$.search(/[0-9]/) && ($type$jscomp$119_val$$ = parseInt($type$jscomp$119_val$$, 10)), $element$$.checked = Silica.getValue($element$$, $element$$.dataset.model) === $type$jscomp$119_val$$) : "checkbox" === $type$jscomp$119_val$$ ? $element$$.checked = 
      Silica.getValue($element$$, $element$$.dataset.model) : "SPAN" === $element$$.nodeName || "PRE" === $element$$.nodeName || "DIV" === $element$$.nodeName || "P" === $element$$.nodeName ? ($type$jscomp$119_val$$ = Silica._model_get_val($element$$)) && $type$jscomp$119_val$$.nodeName ? ($element$$.innerHTML = "", $element$$.appendChild($type$jscomp$119_val$$)) : $element$$.innerHTML = $type$jscomp$119_val$$ : "OPTION" === $element$$.nodeName && ($element$$.value = Silica._model_get_val($element$$));
    }
  }
}
;var module$exports$watchers = {};
module$exports$watchers._If = module$exports$watchers$if;
module$exports$watchers.Repeat = module$exports$watchers$repeat;
module$exports$watchers.Show = module$exports$watchers$show;
module$exports$watchers.Class = module$exports$watchers$class;
module$exports$watchers.Model = module$exports$watchers$model;
module$exports$watchers.Disabled = module$exports$compilers$disabled;
module$exports$watchers.Href = module$exports$compilers$href;
module$exports$watchers.Style = module$exports$compilers$style;
module$exports$watchers.Src = module$exports$compilers$src;
module$exports$watchers.Generic = module$exports$compilers$generic;
module$exports$watchers.Include = module$exports$compilers$include;
module$exports$watchers.Value = module$exports$compilers$value;
var module$exports$silica = {};
window.Silica = {context:window, contextName:"", directives:{}, components:{}, filters:{}, hasher:md5, router:null, _ifs:{}, _shws:{}, _klass:{}, _watch:{}, _repeat_templates:{}, _isReady:!1, _appRoot:null, _defers:[], _includeCache:{}, _clickOutElements:new Set, _queue:[], interpolationPattern:/\{\{(.*?)\}\}/, usePushState:!0, version:"0.40.0", setContext:function $window$Silica$setContext$($contextName$$) {
  this.contextName = $contextName$$;
  this.context = window[$contextName$$];
}, setRouter:function $window$Silica$setRouter$($router$$) {
  var $$jscomp$this$$ = this;
  Silica.router = $router$$;
  window.onhashchange = function $window$onhashchange$() {
    $$jscomp$this$$.apply(function() {
      return Silica.router.route(window.location.hash);
    });
  };
  Silica.usePushState && (window.onpopstate = function $window$onpopstate$() {
    $$jscomp$this$$.apply(function() {
      return Silica.router.route(Silica.usePushState ? window.location.pathname : window.location.hash);
    });
  });
}, goTo:function $window$Silica$goTo$($pathname$$) {
  if (Silica.usePushState) {
    history.pushState(null, "", $pathname$$);
    var $route$$ = $pathname$$;
  } else {
    window.window.location.hash = "#" + $pathname$$, $route$$ = window.window.location.hash;
  }
  Silica.router && Silica.apply(function() {
    Silica.router.route($route$$);
  });
}, compile:function $window$Silica$compile$($element$$, $flush$$, $context$$, $onlySafe$$, $storeWatchers$$) {
  $flush$$ = void 0 === $flush$$ ? !0 : $flush$$;
  $context$$ = void 0 === $context$$ ? null : $context$$;
  $onlySafe$$ = void 0 === $onlySafe$$ ? !1 : $onlySafe$$;
  $storeWatchers$$ = void 0 === $storeWatchers$$ ? !0 : $storeWatchers$$;
  null === Silica._appRoot && (Silica._appRoot = $element$$);
  if (8 != $element$$.nodeType) {
    $element$$ == document ? ($element$$ = document.documentElement, $context$$ = $context$$ || {}) : $context$$ = $context$$ || Silica.getContext($element$$);
    Silica.cacheTemplates($element$$);
    Silica.interpolate($element$$, $context$$, $flush$$);
    for (var $key$$ in Silica.compilers) {
      $onlySafe$$ & "_" === $key$$[0] || ("Controller" == $key$$ ? Silica.compilers[$key$$].apply($element$$, [$context$$, !1, $storeWatchers$$]) : Silica.compilers[$key$$].apply($element$$, [$context$$]));
    }
    $flush$$ && Silica.flush($element$$, !0);
    Silica._capture_links($element$$);
    $element$$ === Silica._appRoot && (Silica._isReady = !0);
    return $element$$;
  }
}, cacheTemplates:function $window$Silica$cacheTemplates$($element$jscomp$20_nodes$$) {
  $element$jscomp$20_nodes$$ = $element$jscomp$20_nodes$$.querySelectorAll("[data-repeat]");
  for (var $node$$, $hash$$, $context$$, $i$$ = $element$jscomp$20_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $element$jscomp$20_nodes$$[$i$$], module$exports$hax$safari.hasDatasetProperty($node$$, "_rt_repeat_template") || ($hash$$ = Silica.hasher($node$$.innerHTML), 1 === $node$$.children.length ? Silica._repeat_templates[$hash$$] = $node$$.removeChild($node$$.firstElementChild) : (console.warn("Repeat has multiple children, wrapping with div", $node$$), $context$$ = document.createElement("div"), $context$$.innerHTML = $node$$.innerHTML, Silica._repeat_templates[$hash$$] = $context$$), $node$$.dataset._rt_repeat_template = 
    $hash$$, $context$$ = {}, $context$$.$ctrl = Silica.getContext($node$$), Silica._repeat_templates[$hash$$] = Silica.compile(Silica._repeat_templates[$hash$$], !1, $context$$, !0, !1), $node$$.innerHTML = "");
  }
}, debounce:function $window$Silica$debounce$($func$$, $wait$$, $immediate$$) {
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
}, defer:function $window$Silica$defer$($func$$) {
  Silica._defers.push($func$$);
}, findCommonAncestor:function $window$Silica$findCommonAncestor$($$jscomp$key$a_a$$, $$jscomp$key$b_b$$) {
  if (Silica.isChildOf($$jscomp$key$a_a$$, $$jscomp$key$b_b$$)) {
    return $$jscomp$key$b_b$$;
  }
  if (Silica.isChildOf($$jscomp$key$b_b$$, $$jscomp$key$a_a$$)) {
    return $$jscomp$key$a_a$$;
  }
  var $$jscomp$iter$5_a_parents$$ = [];
  for ($$jscomp$key$a_a$$ = $$jscomp$key$a_a$$.parentElement; $$jscomp$key$a_a$$;) {
    $$jscomp$iter$5_a_parents$$.push($$jscomp$key$a_a$$), $$jscomp$key$a_a$$ = $$jscomp$key$a_a$$.parentElement;
  }
  var $b_parents$$ = [];
  for ($$jscomp$key$b_b$$ = $$jscomp$key$b_b$$.parentElement; $$jscomp$key$b_b$$;) {
    $b_parents$$.push($$jscomp$key$b_b$$), $$jscomp$key$b_b$$ = $$jscomp$key$b_b$$.parentElement;
  }
  $$jscomp$iter$5_a_parents$$ = $jscomp.makeIterator($$jscomp$iter$5_a_parents$$);
  for ($$jscomp$key$a_a$$ = $$jscomp$iter$5_a_parents$$.next(); !$$jscomp$key$a_a$$.done; $$jscomp$key$a_a$$ = $$jscomp$iter$5_a_parents$$.next()) {
    $$jscomp$key$a_a$$ = $$jscomp$key$a_a$$.value;
    var $$jscomp$iter$4$$ = $jscomp.makeIterator($b_parents$$);
    for ($$jscomp$key$b_b$$ = $$jscomp$iter$4$$.next(); !$$jscomp$key$b_b$$.done; $$jscomp$key$b_b$$ = $$jscomp$iter$4$$.next()) {
      if ($$jscomp$key$b_b$$ = $$jscomp$key$b_b$$.value, $$jscomp$key$a_a$$ === $$jscomp$key$b_b$$) {
        return $$jscomp$key$a_a$$;
      }
    }
  }
  return document;
}, processQueue:function $window$Silica$processQueue$() {
  for (var $outer_most_scope$$, $$jscomp$iter$6$$ = $jscomp.makeIterator(Silica._queue), $$jscomp$key$item_item$$ = $$jscomp$iter$6$$.next(); !$$jscomp$key$item_item$$.done && ($$jscomp$key$item_item$$ = $$jscomp$key$item_item$$.value, $outer_most_scope$$ = $outer_most_scope$$ ? Silica.findCommonAncestor($$jscomp$key$item_item$$[1], $outer_most_scope$$) : $$jscomp$key$item_item$$[1], $outer_most_scope$$ !== document); $$jscomp$key$item_item$$ = $$jscomp$iter$6$$.next()) {
  }
  Silica.apply(function() {
    for (var $$jscomp$iter$7$$ = $jscomp.makeIterator(Silica._queue), $$jscomp$key$item$$ = $$jscomp$iter$7$$.next(); !$$jscomp$key$item$$.done; $$jscomp$key$item$$ = $$jscomp$iter$7$$.next()) {
      $$jscomp$key$item$$.value[0]();
    }
  }, $outer_most_scope$$);
  Silica._queue = [];
}, enqueue:function $window$Silica$enqueue$($func$$, $scope$$) {
  Silica._queue.push([$func$$, $scope$$]);
  Silica.processQueue();
}, flush:function $window$Silica$flush$($element$$, $onlySafe$$, $changed$$, $skipSchedule$$) {
  $element$$ = void 0 === $element$$ ? document.documentElement : $element$$;
  $onlySafe$$ = void 0 === $onlySafe$$ ? !1 : $onlySafe$$;
  $changed$$ = void 0 === $changed$$ ? null : $changed$$;
  $skipSchedule$$ = void 0 === $skipSchedule$$ ? !1 : $skipSchedule$$;
  if (Silica.isInFlush && !$skipSchedule$$) {
    if (Silica._scheduledFlush) {
      return;
    }
    Silica._scheduledFlush = !0;
  }
  $element$$ == document && ($element$$ = document.documentElement);
  Silica.isInFlush = !$skipSchedule$$;
  if (null === $changed$$ && Silica._isReady) {
    for ($func$jscomp$10_key$$ in Silica._watch) {
      var $funcs_watchers$$ = Silica._watch[$func$jscomp$10_key$$];
      for (var $i$20_i$$ = $funcs_watchers$$.length - 1; 0 <= $i$20_i$$; --$i$20_i$$) {
        $changed$$ = $funcs_watchers$$[$i$20_i$$], $changed$$[1].apply($changed$$[0], [$changed$$[2], $changed$$[3]]);
      }
    }
  } else {
    for (var $k$$ in $changed$$) {
      for ($funcs_watchers$$ = $changed$$[$k$$], !0 !== $funcs_watchers$$ ? $i$20_i$$ = $funcs_watchers$$.length - 1 : ($funcs_watchers$$ = Silica._watch[$k$$], $i$20_i$$ = $funcs_watchers$$.length - 1); 0 <= $i$20_i$$; --$i$20_i$$) {
        var $func$jscomp$10_key$$ = $funcs_watchers$$[$i$20_i$$];
        $func$jscomp$10_key$$[1].apply($func$jscomp$10_key$$[0], [$func$jscomp$10_key$$[2], $func$jscomp$10_key$$[3]]);
      }
    }
  }
  $funcs_watchers$$ = Silica.watchers;
  for ($k$$ in $funcs_watchers$$) {
    $onlySafe$$ && "_" === $k$$[0] || ($func$jscomp$10_key$$ = $funcs_watchers$$[$k$$], $func$jscomp$10_key$$.apply($element$$));
  }
  Silica.isInFlush = $skipSchedule$$;
  !0 !== Silica._scheduledFlush || $skipSchedule$$ || (Silica._scheduledFlush = !1, window.setTimeout(function() {
    Silica.flush(document, !1, {});
  }, 20));
  return Silica;
}, apply:function $window$Silica$apply$($changes_func$$, $element$$) {
  $element$$ = void 0 === $element$$ ? document : $element$$;
  var $k$$, $additional_oldVal$$, $val$$, $_len1_watcher$22$$;
  if (Silica.isInApply) {
    return $changes_func$$.call();
  }
  Silica.isInApply = !0;
  try {
    $changes_func$$.call();
  } catch ($err$$) {
    return Silica.isInApply = !1, console.error($err$$), Silica;
  }
  $changes_func$$ = {};
  for ($finalChanges_k$21$$ in Silica._watch) {
    var $watchers$$ = Silica._watch[$finalChanges_k$21$$];
    $changes_func$$[$finalChanges_k$21$$] = [];
    if (97 <= $finalChanges_k$21$$.charCodeAt(0)) {
      var $_j_v$$ = 0;
      for ($_len1_watcher$22$$ = $watchers$$.length; $_j_v$$ < $_len1_watcher$22$$; $_j_v$$++) {
        var $watcher$$ = $watchers$$[$_j_v$$];
        if ($finalChanges_k$21$$.match(/\.\*$/)) {
          $changes_func$$[$finalChanges_k$21$$].push($watcher$$);
        } else {
          $watcher$$[3] = $additional_oldVal$$ = $watcher$$[2];
          $watcher$$[2] = $val$$ = Silica.getPropByString($watcher$$[0], $finalChanges_k$21$$);
          var $_len$jscomp$2_changed$$ = $additional_oldVal$$ !== $val$$;
          !$_len$jscomp$2_changed$$ && Array.isArray($val$$) && Array.isArray($additional_oldVal$$) && (($_len$jscomp$2_changed$$ = $additional_oldVal$$ && $val$$ ? $additional_oldVal$$.length !== $val$$.length : !0) || ($_len$jscomp$2_changed$$ = $additional_oldVal$$.some(function($e$$, $idx$$) {
            return $val$$[$idx$$] !== $e$$;
          })));
          $_len$jscomp$2_changed$$ && $changes_func$$[$finalChanges_k$21$$].push($watcher$$);
        }
      }
    } else {
      if ($_len1_watcher$22$$ = $watchers$$[0], $_len1_watcher$22$$[3] = $additional_oldVal$$ = $_len1_watcher$22$$[2], $_len1_watcher$22$$[2] = $val$$ = Silica.getPropByString(window, $finalChanges_k$21$$), $_len$jscomp$2_changed$$ = $val$$ !== $additional_oldVal$$, !$_len$jscomp$2_changed$$ && Array.isArray($val$$) && Array.isArray($additional_oldVal$$) && (($_len$jscomp$2_changed$$ = $additional_oldVal$$ && $val$$ ? $additional_oldVal$$.length !== $val$$.length : !0) || ($_len$jscomp$2_changed$$ = 
      $additional_oldVal$$.some(function($e$$, $idx$$) {
        return $val$$[$idx$$] !== $e$$;
      }))), $_len$jscomp$2_changed$$) {
        for ($changes_func$$[$finalChanges_k$21$$].push($_len1_watcher$22$$), $_j_v$$ = 1, $_len$jscomp$2_changed$$ = $watchers$$.length; $_j_v$$ < $_len$jscomp$2_changed$$; $_j_v$$++) {
          $additional_oldVal$$ = $watchers$$[$_j_v$$], $additional_oldVal$$[2] = $_len1_watcher$22$$[2], $additional_oldVal$$[3] = $_len1_watcher$22$$[3], $changes_func$$[$finalChanges_k$21$$].push($additional_oldVal$$);
        }
      }
    }
  }
  var $finalChanges_k$21$$ = {};
  for ($k$$ in $changes_func$$) {
    $_j_v$$ = $changes_func$$[$k$$], Array.isArray($_j_v$$) && $_j_v$$.length && ($finalChanges_k$21$$[$k$$] = $_j_v$$);
  }
  Silica.flush($element$$, !1, $finalChanges_k$21$$);
  Silica.isInApply = !1;
  var $defers$$ = Silica._defers;
  Silica._defers = [];
  $defers$$.length && Silica.apply(function() {
    for (var $i$$ = $defers$$.length - 1; 0 <= $i$$; $i$$--) {
      $defers$$[$i$$].call();
    }
  });
  return Silica;
}, getPropByString:function $window$Silica$getPropByString$($obj$$, $context$$, $params$$) {
  if (!$context$$) {
    return $obj$$;
  }
  void 0 === $obj$$.__property_map && ($obj$$.__property_map = {});
  if ($obj$$.__property_map.hasOwnProperty($context$$)) {
    var $property_path$$ = $obj$$.__property_map[$context$$];
  } else {
    $property_path$$ = $context$$.split("."), $obj$$.__property_map[$context$$] = $property_path$$;
  }
  for (; null == $obj$$[$property_path$$[0]] || void 0 == $obj$$[$property_path$$[0]];) {
    if ($obj$$.$ctrl) {
      $obj$$ = $obj$$.$ctrl;
    } else {
      return null;
    }
  }
  for (var $path_length$$ = $property_path$$.length, $property$$, $i$$ = 0; $i$$ < $path_length$$; ++$i$$) {
    if ($property$$ = $property_path$$[$i$$], $context$$ = $obj$$, $obj$$ = $obj$$[$property$$], "function" === typeof $obj$$ && ($obj$$ = $obj$$.apply($context$$, $params$$)), null === $obj$$ || void 0 === $obj$$) {
      return null;
    }
  }
  return $obj$$;
}, getValue:function $window$Silica$getValue$($ctx$jscomp$5_raw$$, $propString$$, $context$$, $params$$) {
  $params$$ = void 0 === $params$$ ? null : $params$$;
  $ctx$jscomp$5_raw$$ = (void 0 === $context$$ ? null : $context$$) || (90 >= $propString$$.charCodeAt(0) ? window : Silica.getContext($ctx$jscomp$5_raw$$));
  return Silica.getPropByString($ctx$jscomp$5_raw$$, $propString$$, $params$$);
}, isChildOf:function $window$Silica$isChildOf$($child$$, $parent$$) {
  for (; $child$$;) {
    if ($child$$.parentElement === $parent$$) {
      return !0;
    }
    $child$$ = $child$$.parentElement;
  }
  return !1;
}, isInDOM:function $window$Silica$isInDOM$($element$$) {
  for (; null != $element$$.parentElement && !$element$$._deleted;) {
    if ($element$$.parentElement == document.documentElement) {
      return !0;
    }
    $element$$ = $element$$.parentElement;
  }
  return !1;
}, setPropByString:function $window$Silica$setPropByString$($ctx$jscomp$6_obj$$, $_i$jscomp$2_propString$$, $value$$) {
  var $_len$$;
  if (!$_i$jscomp$2_propString$$) {
    return $ctx$jscomp$6_obj$$;
  }
  var $paths$$ = $_i$jscomp$2_propString$$.split(".");
  var $key$$ = $paths$$[$paths$$.length - 1];
  $ctx$jscomp$6_obj$$ = 90 >= $_i$jscomp$2_propString$$.charCodeAt(0) ? window : !$ctx$jscomp$6_obj$$.hasOwnProperty($paths$$[0]) && "function" !== typeof $ctx$jscomp$6_obj$$[$paths$$[0]] && $ctx$jscomp$6_obj$$.$ctrl ? $ctx$jscomp$6_obj$$.$ctrl : $ctx$jscomp$6_obj$$;
  $_i$jscomp$2_propString$$ = 0;
  for ($_len$$ = $paths$$.length; $_i$jscomp$2_propString$$ < $_len$$; $_i$jscomp$2_propString$$++) {
    var $hook_prop$$ = $paths$$[$_i$jscomp$2_propString$$];
    $hook_prop$$ !== $key$$ && ($ctx$jscomp$6_obj$$ = "function" === typeof $ctx$jscomp$6_obj$$[$hook_prop$$] ? $ctx$jscomp$6_obj$$[$hook_prop$$].call($ctx$jscomp$6_obj$$) : $ctx$jscomp$6_obj$$[$hook_prop$$]);
  }
  $key$$ = $ctx$jscomp$6_obj$$[$hook_prop$$];
  $ctx$jscomp$6_obj$$[$hook_prop$$] = $value$$;
  ($hook_prop$$ = $ctx$jscomp$6_obj$$[$hook_prop$$ + "_changed"]) && $hook_prop$$.call($ctx$jscomp$6_obj$$, $key$$, $value$$);
}, evaluateExpression:function $window$Silica$evaluateExpression$($expr$$, $elm$$, $ctx$$) {
  $ctx$$ = void 0 === $ctx$$ ? {} : $ctx$$;
  if ($expr$$) {
    var $filter$$ = null;
    -1 !== $expr$$.indexOf("|") && ($expr$$ = $expr$$.split("|"), $filter$$ = $expr$$[1].trim(), $expr$$ = $expr$$[0].trim());
    $ctx$$.$ctrl || $elm$$ === document.documentElement || $ctx$$ === Silica.context || (($elm$$ = Silica.getContext($elm$$), $elm$$ != $ctx$$ && $elm$$.el) ? $elm$$.el && Silica.isChildOf($ctx$$.el, $elm$$.el) && ($ctx$$.$ctrl = $elm$$) : $ctx$$.$ctrl = Silica.context);
    90 >= $expr$$.charCodeAt(0) && ($ctx$$ = window);
    var $value$$ = Silica.getPropByString($ctx$$, $expr$$);
    $filter$$ && ($expr$$ = ($filter$$ = $filter$$.split(/:(.+)/)) ? $filter$$[0] : null, $elm$$ = $filter$$ && 1 < $filter$$.length ? eval($filter$$[1]) : null, $value$$ = ($filter$$ = $expr$$ ? Silica.filters[$expr$$] : null) ? $filter$$($value$$, $elm$$, $ctx$$) : $value$$);
    return $value$$;
  }
}, interpolate:function $window$Silica$interpolate$($element$$, $context$$, $flush$$) {
  $context$$ = void 0 === $context$$ ? null : $context$$;
  $flush$$ = void 0 === $flush$$ ? !0 : $flush$$;
  var $parentNode$jscomp$1_text$$, $expr$$;
  $element$$ = document.createNodeIterator($element$$, NodeFilter.SHOW_TEXT, function($node$$) {
    if (Silica.interpolationPattern.test($node$$.data)) {
      return NodeFilter.FILTER_ACCEPT;
    }
  }, !1);
  for (var $node$jscomp$0$$; $node$jscomp$0$$ = $element$$.nextNode();) {
    for ($parentNode$jscomp$1_text$$ = $node$jscomp$0$$.data; null !== ($expr$$ = $parentNode$jscomp$1_text$$.match(Silica.interpolationPattern));) {
      $expr$$ = $expr$$[1];
      var $comps$jscomp$1_filter$$ = $expr$$.split("|");
      var $evald_fmt_property$$ = $comps$jscomp$1_filter$$[0].trim();
      1 === $comps$jscomp$1_filter$$.length ? $evald_fmt_property$$ = "<span data-model='" + $evald_fmt_property$$ + "'>{{val}}</span>" : ($comps$jscomp$1_filter$$ = $comps$jscomp$1_filter$$[1].trim(), $evald_fmt_property$$ = "<span data-model='" + $evald_fmt_property$$ + "' data-filter='" + $comps$jscomp$1_filter$$ + "'>{{val}}</span>");
      $evald_fmt_property$$ = $evald_fmt_property$$.replace("{{val}}", Silica.evaluateExpression($expr$$, $node$jscomp$0$$, $context$$));
      $parentNode$jscomp$1_text$$ = $parentNode$jscomp$1_text$$.replace("{{" + $expr$$ + "}}", $evald_fmt_property$$);
    }
    $expr$$ = document.createElement("span");
    $expr$$.innerHTML = $parentNode$jscomp$1_text$$;
    for ($parentNode$jscomp$1_text$$ = $node$jscomp$0$$.parentNode; 0 < $expr$$.childNodes.length;) {
      $parentNode$jscomp$1_text$$.insertBefore($expr$$.firstChild, $node$jscomp$0$$);
    }
    $parentNode$jscomp$1_text$$.removeChild($node$jscomp$0$$);
    Silica.compile($expr$$, $flush$$, $context$$);
  }
}, addFilter:function $window$Silica$addFilter$($key$$, $func$$) {
  Silica.filters[$key$$] = $func$$;
}, addDirective:function $window$Silica$addDirective$($key$$, $obj$$) {
  Silica.directives[$key$$] = $obj$$;
}, getContext:function $window$Silica$getContext$($raw$jscomp$5_v$$) {
  for (var $constructorName$jscomp$1_ctrl$$, $k$$, $_ref$jscomp$8_constructor$$, $model$jscomp$4_stored$jscomp$1_watchers$$, $needsModel_pairIdx$$;;) {
    if ($raw$jscomp$5_v$$._rt_ctx) {
      return $raw$jscomp$5_v$$._rt_ctx;
    }
    if ($raw$jscomp$5_v$$._rt_ctrl) {
      return $raw$jscomp$5_v$$._rt_ctrl;
    }
    if (9 !== $raw$jscomp$5_v$$.nodeType && 3 !== $raw$jscomp$5_v$$.nodeType && 8 !== $raw$jscomp$5_v$$.nodeType && module$exports$hax$safari.hasDatasetProperty($raw$jscomp$5_v$$, "controller")) {
      $constructorName$jscomp$1_ctrl$$ = module$exports$hax$safari.getDatasetProperty($raw$jscomp$5_v$$, "controller");
      "undefined" !== typeof($_ref$jscomp$8_constructor$$ = $constructorName$jscomp$1_ctrl$$.match(/((?:\w|\.)+)(?:\(([\w\.]+)\))*/))[2] && ($needsModel_pairIdx$$ = !0, $model$jscomp$4_stored$jscomp$1_watchers$$ = Silica.getValue($raw$jscomp$5_v$$.parentNode, $_ref$jscomp$8_constructor$$[2]));
      $constructorName$jscomp$1_ctrl$$ = $_ref$jscomp$8_constructor$$[1];
      $_ref$jscomp$8_constructor$$ = eval($constructorName$jscomp$1_ctrl$$);
      if (!$_ref$jscomp$8_constructor$$) {
        return console.error("Unknown Controller: " + $raw$jscomp$5_v$$.dataset.controller);
      }
      $constructorName$jscomp$1_ctrl$$ = "undefined" !== typeof $model$jscomp$4_stored$jscomp$1_watchers$$ ? new $_ref$jscomp$8_constructor$$($raw$jscomp$5_v$$, $model$jscomp$4_stored$jscomp$1_watchers$$) : new $_ref$jscomp$8_constructor$$($raw$jscomp$5_v$$);
      if (!$needsModel_pairIdx$$ ^ null != $model$jscomp$4_stored$jscomp$1_watchers$$) {
        $model$jscomp$4_stored$jscomp$1_watchers$$ = $_ref$jscomp$8_constructor$$.watchers;
        if ($raw$jscomp$5_v$$._rt_ctrl && $model$jscomp$4_stored$jscomp$1_watchers$$ && 0 < Object.keys($model$jscomp$4_stored$jscomp$1_watchers$$).length) {
          for ($k$$ in $model$jscomp$4_stored$jscomp$1_watchers$$) {
            if ($model$jscomp$4_stored$jscomp$1_watchers$$ = Silica._watch[$k$$]) {
              for ($needsModel_pairIdx$$ = $model$jscomp$4_stored$jscomp$1_watchers$$.length - 1; 0 <= $needsModel_pairIdx$$; --$needsModel_pairIdx$$) {
                if ($raw$jscomp$5_v$$._rt_ctrl == $model$jscomp$4_stored$jscomp$1_watchers$$[$needsModel_pairIdx$$][0]) {
                  $model$jscomp$4_stored$jscomp$1_watchers$$.splice($needsModel_pairIdx$$, 1);
                  break;
                }
              }
            }
          }
        }
        $raw$jscomp$5_v$$._rt_live = !0;
        $raw$jscomp$5_v$$._rt_ctrl = $constructorName$jscomp$1_ctrl$$;
        $_ref$jscomp$8_constructor$$ = $_ref$jscomp$8_constructor$$.watchers;
        for ($k$$ in $_ref$jscomp$8_constructor$$) {
          $raw$jscomp$5_v$$ = $_ref$jscomp$8_constructor$$[$k$$], Silica._watch[$k$$] || (Silica._watch[$k$$] = []), Silica._watch[$k$$].push([$constructorName$jscomp$1_ctrl$$, $raw$jscomp$5_v$$, null]);
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
}, _handle_href:function $window$Silica$_handle_href$($evt$$) {
  var $path$$ = this.getAttribute("href");
  if (null == /[a-zA-Z]+:+/g.exec($path$$) && "#" !== $path$$ && "" !== $path$$) {
    return $evt$$.preventDefault(), $evt$$.stopPropagation(), Silica.pub("SiO2-HREF", $evt$$), Silica.goTo($path$$), !1;
  }
}, _capture_links:function $window$Silica$_capture_links$($element$jscomp$25_nodes$$) {
  $element$jscomp$25_nodes$$ = Silica.queryOfType($element$jscomp$25_nodes$$, "a", "[href]", "[data-href]");
  for (var $node$$, $i$$ = $element$jscomp$25_nodes$$.length - 1; 0 <= $i$$; --$i$$) {
    $node$$ = $element$jscomp$25_nodes$$[$i$$], $node$$.hostname === window.location.hostname && "_blank" !== $node$$.target && ($node$$.removeEventListener("click", Silica._handle_href, !0), $node$$.addEventListener("click", Silica._handle_href, !0));
  }
}, _show:function $window$Silica$_show$($element$jscomp$26_isVisible$$, $expr$$, $negate$$) {
  if (8 !== $element$jscomp$26_isVisible$$.nodeType) {
    var $param$jscomp$4_temp$$ = $element$jscomp$26_isVisible$$.dataset.parameter;
  } else {
    $param$jscomp$4_temp$$ = document.createElement("div"), $param$jscomp$4_temp$$.innerHTML = $element$jscomp$26_isVisible$$.data, $param$jscomp$4_temp$$ = module$exports$hax$safari.getDatasetProperty($param$jscomp$4_temp$$.firstElementChild || $param$jscomp$4_temp$$, "parameter");
  }
  $element$jscomp$26_isVisible$$ = Silica.getValue($element$jscomp$26_isVisible$$, $expr$$, null, [$element$jscomp$26_isVisible$$, $param$jscomp$4_temp$$]);
  $negate$$ && ($element$jscomp$26_isVisible$$ = !$element$jscomp$26_isVisible$$);
  return $element$jscomp$26_isVisible$$;
}, _call:function $window$Silica$_call$($element$$, $evnt$$, $act$$) {
  if (Silica.isInDOM($element$$)) {
    $element$$.dataset.nopreventdefault || $evnt$$.preventDefault();
    $element$$.dataset.nostoppropagation || $evnt$$.stopPropagation();
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
      return "undefined" !== typeof $ctx$$[$actionName_idx$$] ? $ctx$$[$actionName_idx$$].apply($ctx$$, [$element$$].concat($jscomp.arrayFromIterable($models$$), [$parameter$$, $evnt$$])) : null != Silica.context[$actionName_idx$$] ? Silica.context[$actionName_idx$$].apply(Silica.ctx, [$element$$].concat($jscomp.arrayFromIterable($models$$), [$parameter$$, $evnt$$])) : console.error("Unknown action '" + $actionName_idx$$ + "' for " + $element$$.outerHTML + " in " + $ctx$$.constructor.name);
    }, $scope$$);
  }
}, _model_get_val:function $window$Silica$_model_get_val$($raw$jscomp$6_value$$) {
  var $filter$$, $filterKey$$;
  if (($filterKey$$ = ($filter$$ = ($filter$$ = $raw$jscomp$6_value$$.attributes["data-filter"]) ? $filter$$.value.split(/:(.+)/) : null) ? $filter$$[0] : null) && !Silica.filters[$filterKey$$]) {
    throw Error("Unknown filter: '" + $filterKey$$ + "' for element: " + $raw$jscomp$6_value$$.outerHTML);
  }
  var $filterOptions$$ = $filter$$ && 1 < $filter$$.length ? eval($filter$$[1]) : null;
  $filter$$ = $filterKey$$ ? Silica.filters[$filterKey$$] : null;
  $raw$jscomp$6_value$$ = Silica.getValue($raw$jscomp$6_value$$, $raw$jscomp$6_value$$.dataset.model);
  return $filter$$ && null != $raw$jscomp$6_value$$ ? $filter$$($raw$jscomp$6_value$$, $filterOptions$$) : $raw$jscomp$6_value$$;
}, findComments:function $window$Silica$findComments$($raw$$) {
  for (var $arr$$ = [], $i$$ = $raw$$.childNodes.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $raw$$.childNodes[$i$$];
    8 === $node$$.nodeType ? $arr$$.push($node$$) : $arr$$.push.apply($arr$$, Silica.findComments($node$$));
  }
  return $arr$$;
}, isInRepeat:function $window$Silica$isInRepeat$($root$$, $node$$) {
  for (; $node$$.parentElement && $node$$.parentElement !== $root$$;) {
    if ($node$$.parentElement.hasAttribute("data-repeat")) {
      return !0;
    }
    $node$$ = $node$$.parentElement;
  }
  return !1;
}, isDescendent:function $window$Silica$isDescendent$($ancestor$$, $child$$) {
  for (; ($child$$ = $child$$.parentNode) && $child$$ !== $ancestor$$;) {
  }
  return !!$child$$;
}, query:function $window$Silica$query$($raw$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 1; $$jscomp$restIndex$$ < arguments.length; ++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 1] = arguments[$$jscomp$restIndex$$];
  }
  $raw$$ == document && ($raw$$ = document.documentElement);
  var $attribute$jscomp$1_nodes$$ = $raw$$.querySelectorAll($$jscomp$restParams$$.join(","));
  $$jscomp$restIndex$$ = [];
  for (var $i$24_i$$ = $attribute$jscomp$1_nodes$$.length - 1; 0 <= $i$24_i$$; --$i$24_i$$) {
    var $node$$ = $attribute$jscomp$1_nodes$$.item($i$24_i$$);
    Silica.isInRepeat($raw$$, $node$$) || $$jscomp$restIndex$$.push($node$$);
  }
  for ($i$24_i$$ = $$jscomp$restParams$$.length - 1; 0 <= $i$24_i$$; --$i$24_i$$) {
    if ($attribute$jscomp$1_nodes$$ = $$jscomp$restParams$$[$i$24_i$$], $raw$$.hasAttribute($attribute$jscomp$1_nodes$$.substring(1, $attribute$jscomp$1_nodes$$.length - 1))) {
      $$jscomp$restIndex$$.push($raw$$);
      break;
    }
  }
  return $$jscomp$restIndex$$;
}, queryWithComments:function $window$Silica$queryWithComments$($root$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$jscomp$4_filtered$$ = 1; $$jscomp$restIndex$jscomp$4_filtered$$ < arguments.length; ++$$jscomp$restIndex$jscomp$4_filtered$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$jscomp$4_filtered$$ - 1] = arguments[$$jscomp$restIndex$jscomp$4_filtered$$];
  }
  $$jscomp$restIndex$jscomp$4_filtered$$ = Silica.query.apply(Silica, [$root$$].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
  for (var $comments$$ = Silica.findComments($root$$), $temp$$ = document.createElement("div"), $i$$ = $comments$$.length - 1; 0 <= $i$$; --$i$$) {
    var $node$$ = $comments$$[$i$$];
    if ("<" === $node$$.nodeValue.charAt(0)) {
      $temp$$.innerHTML = $node$$.nodeValue;
      for (var $j$$ = $$jscomp$restParams$$.length - 1, $attr$$ = $$jscomp$restParams$$[$j$$]; 0 <= $j$$; $attr$$ = $$jscomp$restParams$$[--$j$$]) {
        if ($temp$$.firstElementChild.hasAttribute($attr$$)) {
          $$jscomp$restIndex$jscomp$4_filtered$$.push($node$$);
          break;
        }
      }
    }
  }
  return $$jscomp$restIndex$jscomp$4_filtered$$;
}, querySorted:function $window$Silica$querySorted$($root$$, $attributes$$) {
  for (var $$jscomp$restParams$jscomp$5_filtered$$ = [], $$jscomp$restIndex$jscomp$5_i$$ = 1; $$jscomp$restIndex$jscomp$5_i$$ < arguments.length; ++$$jscomp$restIndex$jscomp$5_i$$) {
    $$jscomp$restParams$jscomp$5_filtered$$[$$jscomp$restIndex$jscomp$5_i$$ - 1] = arguments[$$jscomp$restIndex$jscomp$5_i$$];
  }
  $$jscomp$restParams$jscomp$5_filtered$$ = Silica.query.apply(Silica, [$root$$].concat($jscomp.arrayFromIterable($$jscomp$restParams$jscomp$5_filtered$$)));
  $$jscomp$restIndex$jscomp$5_i$$ = 0;
  for (var $list_length$$ = $$jscomp$restParams$jscomp$5_filtered$$.length; $$jscomp$restIndex$jscomp$5_i$$ < $list_length$$; $$jscomp$restIndex$jscomp$5_i$$++) {
    for (var $node$$ = $$jscomp$restParams$jscomp$5_filtered$$[$$jscomp$restIndex$jscomp$5_i$$], $j$$ = $$jscomp$restIndex$jscomp$5_i$$ + 1; $j$$ < $list_length$$; $j$$++) {
      var $other$$ = $$jscomp$restParams$jscomp$5_filtered$$[$j$$];
      $other$$.contains($node$$) && ($$jscomp$restParams$jscomp$5_filtered$$[$$jscomp$restIndex$jscomp$5_i$$] = $other$$, $$jscomp$restParams$jscomp$5_filtered$$[$j$$] = $node$$);
    }
  }
  return $$jscomp$restParams$jscomp$5_filtered$$;
}, queryOfType:function $window$Silica$queryOfType$($raw$$, $type$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$jscomp$6_filtered$$ = 2; $$jscomp$restIndex$jscomp$6_filtered$$ < arguments.length; ++$$jscomp$restIndex$jscomp$6_filtered$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$jscomp$6_filtered$$ - 2] = arguments[$$jscomp$restIndex$jscomp$6_filtered$$];
  }
  $raw$$ == document && ($raw$$ = document.documentElement);
  var $attribute$jscomp$2_nodes$$ = $raw$$.getElementsByTagName($type$$);
  $$jscomp$restIndex$jscomp$6_filtered$$ = [];
  if (0 < $$jscomp$restParams$$.length) {
    for (var $i$28_i$$ = $attribute$jscomp$2_nodes$$.length - 1; 0 <= $i$28_i$$; --$i$28_i$$) {
      for (var $node$$ = $attribute$jscomp$2_nodes$$.item($i$28_i$$), $j$$ = $$jscomp$restParams$$.length - 1; 0 <= $j$$; --$j$$) {
        if ($node$$.hasAttribute($$jscomp$restParams$$[$j$$].replace(/\[|\]/g, ""))) {
          $$jscomp$restIndex$jscomp$6_filtered$$.push($node$$);
          break;
        }
      }
    }
    if ($raw$$.nodeName === $type$$.toUpperCase()) {
      for ($i$28_i$$ = $$jscomp$restParams$$.length - 1; 0 <= $i$28_i$$; --$i$28_i$$) {
        if ($attribute$jscomp$2_nodes$$ = $$jscomp$restParams$$[$i$28_i$$], $raw$$.hasAttribute($attribute$jscomp$2_nodes$$.substring(1, $attribute$jscomp$2_nodes$$.length - 1))) {
          $$jscomp$restIndex$jscomp$6_filtered$$.push($raw$$);
          break;
        }
      }
    }
  } else {
    $$jscomp$restIndex$jscomp$6_filtered$$ = $attribute$jscomp$2_nodes$$, $raw$$.tagName === $type$$ && $$jscomp$restIndex$jscomp$6_filtered$$.push($raw$$);
  }
  return $$jscomp$restIndex$jscomp$6_filtered$$;
}, removeFromDOM:function $window$Silica$removeFromDOM$($e$$) {
  for (var $removeWatchers$$ = function $$removeWatchers$$$($nodes$$) {
    for (var $$jscomp$loop$36$$ = {}, $i$29$$ = $nodes$$.length - 1; 0 <= $i$29$$; $$jscomp$loop$36$$ = {ctrl:$$jscomp$loop$36$$.ctrl}, --$i$29$$) {
      var $list$jscomp$5_node$$ = $nodes$$[$i$29$$];
      if ($list$jscomp$5_node$$._rt_ctrl) {
        $$jscomp$loop$36$$.ctrl = $list$jscomp$5_node$$._rt_ctrl;
        for (var $k$$ in $$jscomp$loop$36$$.ctrl.constructor.watchers) {
          $list$jscomp$5_node$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$jscomp$5_node$$ ? $list$jscomp$5_node$$.filter(function($$jscomp$loop$36$$) {
            return function($obj$$) {
              return $obj$$[0] !== $$jscomp$loop$36$$.ctrl;
            };
          }($$jscomp$loop$36$$)) : [], 0 === Silica._watch[$k$$].length && delete Silica._watch[$k$$];
        }
      }
    }
  }, $i$$ = $e$$.childNodes.length - 1; 0 <= $i$$; --$i$$) {
    var $child$$ = $e$$.childNodes[$i$$];
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
window.Silica.findCommonAncestor = Silica.findCommonAncestor;
window.Silica.getPropByString = Silica.getPropByString;
window.Silica.getValue = Silica.getValue;
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
window.Silica.hasher = Silica.hasher;

}.call(window);