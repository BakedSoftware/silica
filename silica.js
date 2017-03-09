/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.4.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2016
 * @license MIT
 */
!function(t){"use strict";function r(t){if(t)c[0]=c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0,this.blocks=c,this.buffer8=i;else if(n){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof process&&process.versions&&process.versions.node;e&&(t=global);var i,h=!t.JS_MD5_TEST&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!t.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],c=[];if(n){var p=new ArrayBuffer(68);i=new Uint8Array(p),c=new Uint32Array(p)}var y=function(t){return function(e){return new r(!0).update(e)[t]()}},d=function(){var t=y("hex");e&&(t=l(t)),t.create=function(){return new r},t.update=function(r){return t.create().update(r)};for(var i=0;i<u.length;++i){var h=u[i];t[h]=y(h)}return t},l=function(r){var e,i;try{if(t.JS_MD5_TEST)throw"JS_MD5_TEST";e=require("crypto"),i=require("buffer").Buffer}catch(h){return console.log(h),r}var s=function(t){if("string"==typeof t)return e.createHash("md5").update(t,"utf8").digest("hex");if(t.constructor==ArrayBuffer)t=new Uint8Array(t);else if(void 0===t.length)return r(t);return e.createHash("md5").update(new i(t)).digest("hex")};return s};r.prototype.update=function(r){if(!this.finalized){var e="string"!=typeof r;e&&r.constructor==t.ArrayBuffer&&(r=new Uint8Array(r));for(var i,h,s=0,f=r.length||0,a=this.blocks,u=this.buffer8;f>s;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)if(n)for(h=this.start;f>s&&64>h;++s)u[h++]=r[s];else for(h=this.start;f>s&&64>h;++s)a[h>>2]|=r[s]<<o[3&h++];else if(n)for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?u[h++]=i:2048>i?(u[h++]=192|i>>6,u[h++]=128|63&i):55296>i||i>=57344?(u[h++]=224|i>>12,u[h++]=128|i>>6&63,u[h++]=128|63&i):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),u[h++]=240|i>>18,u[h++]=128|i>>12&63,u[h++]=128|i>>6&63,u[h++]=128|63&i);else for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?a[h>>2]|=i<<o[3&h++]:2048>i?(a[h>>2]|=(192|i>>6)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):55296>i||i>=57344?(a[h>>2]|=(224|i>>12)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),a[h>>2]|=(240|i>>18)<<o[3&h++],a[h>>2]|=(128|i>>12&63)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]);this.lastByteIndex=h,this.bytes+=h-this.start,h>=64?(this.start=h-64,this.hash(),this.hashed=!0):this.start=h}return this}},r.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>2]|=a[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},r.prototype.hash=function(){var t,r,e,i,h,s,n=this.blocks;this.first?(t=n[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,i=(-1732584194^2004318071&t)+n[1]-117830708,i=(i<<12|i>>>20)+t<<0,e=(-271733879^i&(-271733879^t))+n[2]-1126478375,e=(e<<17|e>>>15)+i<<0,r=(t^e&(i^t))+n[3]-1316259209,r=(r<<22|r>>>10)+e<<0):(t=this.h0,r=this.h1,e=this.h2,i=this.h3,t+=(i^r&(e^i))+n[0]-680876936,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[1]-389564586,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[2]+606105819,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[3]-1044525330,r=(r<<22|r>>>10)+e<<0),t+=(i^r&(e^i))+n[4]-176418897,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[5]+1200080426,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[6]-1473231341,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[7]-45705983,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[8]+1770035416,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[9]-1958414417,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[10]-42063,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[11]-1990404162,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[12]+1804603682,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[13]-40341101,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[14]-1502002290,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[15]+1236535329,r=(r<<22|r>>>10)+e<<0,t+=(e^i&(r^e))+n[1]-165796510,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[6]-1069501632,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[11]+643717713,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[0]-373897302,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[5]-701558691,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[10]+38016083,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[15]-660478335,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[4]-405537848,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[9]+568446438,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[14]-1019803690,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[3]-187363961,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[8]+1163531501,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[13]-1444681467,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[2]-51403784,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[7]+1735328473,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[12]-1926607734,r=(r<<20|r>>>12)+e<<0,h=r^e,t+=(h^i)+n[5]-378558,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[8]-2022574463,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[11]+1839030562,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[14]-35309556,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[1]-1530992060,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[4]+1272893353,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[7]-155497632,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[10]-1094730640,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[13]+681279174,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[0]-358537222,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[3]-722521979,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[6]+76029189,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[9]-640364487,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[12]-421815835,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[15]+530742520,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[2]-995338651,r=(r<<23|r>>>9)+e<<0,t+=(e^(r|~i))+n[0]-198630844,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[7]+1126891415,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[14]-1416354905,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[5]-57434055,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[12]+1700485571,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[3]-1894986606,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[10]-1051523,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[1]-2054922799,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[8]+1873313359,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[15]-30611744,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[6]-1560198380,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[13]+1309151649,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[4]-145523070,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[11]-1120210379,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[2]+718787259,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[9]-343485551,r=(r<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+i<<0)},r.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]},r.prototype.toString=r.prototype.hex,r.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},r.prototype.array=r.prototype.digest,r.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},r.prototype.buffer=r.prototype.arrayBuffer;var v=d();h?module.exports=v:(t.md5=v,s&&define(function(){return v}))}(this);
!function(){
"use strict";
var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  if ($descriptor$$.get || $descriptor$$.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
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
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function $$jscomp$Symbol$($opt_description$$) {
  return $jscomp.SYMBOL_PREFIX + ($opt_description$$ || "") + $jscomp.symbolCounter_++;
};
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
  var $iteratorFunction$$ = $iterable$$[Symbol.iterator];
  return $iteratorFunction$$ ? $iteratorFunction$$.call($iterable$$) : $jscomp.arrayIterator($iterable$$);
};
$jscomp.arrayFromIterator = function $$jscomp$arrayFromIterator$($iterator$$) {
  for (var $i$$, $arr$$ = [];!($i$$ = $iterator$$.next()).done;) {
    $arr$$.push($i$$.value);
  }
  return $arr$$;
};
$jscomp.arrayFromIterable = function $$jscomp$arrayFromIterable$($iterable$$) {
  return $iterable$$ instanceof Array ? $iterable$$ : $jscomp.arrayFromIterator($jscomp.makeIterator($iterable$$));
};
$jscomp.array = $jscomp.array || {};
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
    for ($i$$ = 0;$i$$ < $property$jscomp$5_split_target$$.length - 1;$i$$++) {
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
}, "es6-impl", "es3");
$jscomp.owns = function $$jscomp$owns$($obj$$, $prop$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $prop$$);
};
$jscomp.polyfill("WeakMap", function($NativeWeakMap$$) {
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
  if (function isConformant() {
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
  }()) {
    return $NativeWeakMap$$;
  }
  var $prop$$ = "$jscomp_hidden_" + Math.random().toString().substring(2);
  $patch$$("freeze");
  $patch$$("preventExtensions");
  $patch$$("seal");
  var $index$$ = 0, $PolyfillWeakMap$$ = function $$PolyfillWeakMap$$$($iter$jscomp$1_opt_iterable$$) {
    this.id_ = ($index$$ += Math.random() + 1).toString();
    if ($iter$jscomp$1_opt_iterable$$) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      $iter$jscomp$1_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$1_opt_iterable$$);
      for (var $entry_item$$;!($entry_item$$ = $iter$jscomp$1_opt_iterable$$.next()).done;) {
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
}, "es6-impl", "es3");
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.polyfill("Map", function($NativeMap$$) {
  if (!$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!$NativeMap$$ || !$NativeMap$$.prototype.entries || "function" != typeof Object.seal) {
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
  }()) {
    return $NativeMap$$;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $idMap$$ = new WeakMap, $PolyfillMap$$ = function $$PolyfillMap$$$($iter$jscomp$3_opt_iterable$$) {
    this.data_ = {};
    this.head_ = $createHead$$();
    this.size = 0;
    if ($iter$jscomp$3_opt_iterable$$) {
      $iter$jscomp$3_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$3_opt_iterable$$);
      for (var $entry$jscomp$1_item$$;!($entry$jscomp$1_item$$ = $iter$jscomp$3_opt_iterable$$.next()).done;) {
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
  $PolyfillMap$$.prototype.delete = function $$PolyfillMap$$$$delete$($key$jscomp$31_r$$) {
    $key$jscomp$31_r$$ = $maybeGetEntry$$(this, $key$jscomp$31_r$$);
    return $key$jscomp$31_r$$.entry && $key$jscomp$31_r$$.list ? ($key$jscomp$31_r$$.list.splice($key$jscomp$31_r$$.index, 1), $key$jscomp$31_r$$.list.length || delete this.data_[$key$jscomp$31_r$$.id], $key$jscomp$31_r$$.entry.previous.next = $key$jscomp$31_r$$.entry.next, $key$jscomp$31_r$$.entry.next.previous = $key$jscomp$31_r$$.entry.previous, $key$jscomp$31_r$$.entry.head = null, this.size--, !0) : !1;
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
    for (var $iter$$ = this.entries(), $entry$jscomp$6_item$$;!($entry$jscomp$6_item$$ = $iter$$.next()).done;) {
      $entry$jscomp$6_item$$ = $entry$jscomp$6_item$$.value, $callback$$.call($opt_thisArg$$, $entry$jscomp$6_item$$[1], $entry$jscomp$6_item$$[0], this);
    }
  };
  $PolyfillMap$$.prototype[Symbol.iterator] = $PolyfillMap$$.prototype.entries;
  var $maybeGetEntry$$ = function $$maybeGetEntry$$$($index$jscomp$46_map$$, $key$$) {
    var $id$jscomp$4_id$jscomp$inline_33_type$$;
    $id$jscomp$4_id$jscomp$inline_33_type$$ = $key$$ && typeof $key$$;
    "object" == $id$jscomp$4_id$jscomp$inline_33_type$$ || "function" == $id$jscomp$4_id$jscomp$inline_33_type$$ ? $idMap$$.has($key$$) ? $id$jscomp$4_id$jscomp$inline_33_type$$ = $idMap$$.get($key$$) : ($id$jscomp$4_id$jscomp$inline_33_type$$ = "" + ++$mapIndex$$, $idMap$$.set($key$$, $id$jscomp$4_id$jscomp$inline_33_type$$)) : $id$jscomp$4_id$jscomp$inline_33_type$$ = "p_" + $key$$;
    var $list$$ = $index$jscomp$46_map$$.data_[$id$jscomp$4_id$jscomp$inline_33_type$$];
    if ($list$$ && $jscomp.owns($index$jscomp$46_map$$.data_, $id$jscomp$4_id$jscomp$inline_33_type$$)) {
      for ($index$jscomp$46_map$$ = 0;$index$jscomp$46_map$$ < $list$$.length;$index$jscomp$46_map$$++) {
        var $entry$$ = $list$$[$index$jscomp$46_map$$];
        if ($key$$ !== $key$$ && $entry$$.key !== $entry$$.key || $key$$ === $entry$$.key) {
          return {id:$id$jscomp$4_id$jscomp$inline_33_type$$, list:$list$$, index:$index$jscomp$46_map$$, entry:$entry$$};
        }
      }
    }
    return {id:$id$jscomp$4_id$jscomp$inline_33_type$$, list:$list$$, index:-1, entry:void 0};
  }, $makeIterator$$ = function $$makeIterator$$$($map$$, $func$$) {
    var $entry$$ = $map$$.head_;
    return $jscomp.iteratorPrototype(function() {
      if ($entry$$) {
        for (;$entry$$.head != $map$$.head_;) {
          $entry$$ = $entry$$.previous;
        }
        for (;$entry$$.next != $entry$$.head;) {
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
}, "es6-impl", "es3");
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.polyfill("Set", function($NativeSet$$) {
  if (!$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!$NativeSet$$ || !$NativeSet$$.prototype.entries || "function" != typeof Object.seal) {
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
  }()) {
    return $NativeSet$$;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $PolyfillSet$$ = function $$PolyfillSet$$$($iter$jscomp$6_opt_iterable$$) {
    this.map_ = new Map;
    if ($iter$jscomp$6_opt_iterable$$) {
      $iter$jscomp$6_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$6_opt_iterable$$);
      for (var $entry$$;!($entry$$ = $iter$jscomp$6_opt_iterable$$.next()).done;) {
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
  $PolyfillSet$$.prototype[Symbol.iterator] = $PolyfillSet$$.prototype.values;
  $PolyfillSet$$.prototype.forEach = function $$PolyfillSet$$$$forEach$($callback$$, $opt_thisArg$$) {
    var $set$$ = this;
    this.map_.forEach(function($value$$) {
      return $callback$$.call($opt_thisArg$$, $value$$, $value$$, $set$$);
    });
  };
  return $PolyfillSet$$;
}, "es6-impl", "es3");
var module$build_cache$src$compilers$blur = {};
function Blur$$module$build_cache$src$compilers$blur() {
  for (var $nodes$$ = Silica.query(this, "[data-blur]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onblur = function $$node$$$onblur$($evt$$) {
      Silica._call(this, $evt$$, "blur");
    };
  }
}
module$build_cache$src$compilers$blur.default = Blur$$module$build_cache$src$compilers$blur;
var module$build_cache$src$compilers$class = {};
function Class$$module$build_cache$src$compilers$class() {
  var $nodes$$ = Silica.query(this, "[data-class]"), $node$$, $klass$$;
  9 != this.nodeType && this.dataset["class"] && (null == this.dataset._rt_hard_klass && (this.dataset._rt_hard_klass = this.className), ($klass$$ = Silica.getValue(this, this.dataset["class"], null, null)) && this.classList.add($klass$$));
  for (var $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], null == $node$$.dataset._rt_hard_klass && ($node$$.dataset._rt_hard_klass = $node$$.className.split("hidden").join(" ").trim()), ($klass$$ = Silica.getValue($node$$, $node$$.dataset["class"], null, [$node$$, $node$$.dataset.parameter])) && $node$$.classList.add($klass$$);
  }
}
module$build_cache$src$compilers$class.default = Class$$module$build_cache$src$compilers$class;
var module$build_cache$src$compilers$click = {};
function Click$$module$build_cache$src$compilers$click() {
  for (var $nodes$$ = Silica.query(this, "[data-click]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onclick = function $$node$$$onclick$($evt$$) {
      Silica._call(this, $evt$$, "click");
    };
  }
}
module$build_cache$src$compilers$click.default = Click$$module$build_cache$src$compilers$click;
var module$build_cache$src$compilers$clickoutside = {};
function handleClick$$module$build_cache$src$compilers$clickoutside($evt$$) {
  for (var $$jscomp$iter$0$$ = $jscomp.makeIterator(Silica._clickOutElements), $$jscomp$key$node_node$$ = $$jscomp$iter$0$$.next();!$$jscomp$key$node_node$$.done;$$jscomp$key$node_node$$ = $$jscomp$iter$0$$.next()) {
    $$jscomp$key$node_node$$ = $$jscomp$key$node_node$$.value, $evt$$.target == $$jscomp$key$node_node$$ || Silica.isDescendent($$jscomp$key$node_node$$, $evt$$.target) || Silica._call($$jscomp$key$node_node$$, $evt$$, "clickOutside");
  }
}
function ClickOutside$$module$build_cache$src$compilers$clickoutside() {
  for (var $nodes$$ = Silica.query(this, "[data-click-outside]"), $i$$ = $nodes$$.length - 1;0 <= $i$$;$i$$--) {
    Silica._clickOutElements.add($nodes$$[$i$$]);
  }
  0 < Silica._clickOutElements.size ? window.addEventListener("click", handleClick$$module$build_cache$src$compilers$clickoutside) : window.removeEventListener("click", handleClick$$module$build_cache$src$compilers$clickoutside);
}
module$build_cache$src$compilers$clickoutside.default = ClickOutside$$module$build_cache$src$compilers$clickoutside;
var module$build_cache$src$compilers$directives = {};
function directives$$module$build_cache$src$compilers$directives() {
  for (var $k$1$$ in Silica.directives) {
    for (var $obj$2$$ = Silica.directives[$k$1$$], $nodes$$ = Silica.queryOfType(this, $k$1$$), $wrapper$$ = document.createElement("div"), $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
      $wrapper$$.innerHTML = $obj$2$$.template;
      var $newChild$$ = $wrapper$$.firstChild, $node$$ = $nodes$$[$i$$];
      if ($node$$.hasAttributes()) {
        for (var $attrs_v$$ = $node$$.attributes, $j$$ = $attrs_v$$.length - 1;0 <= $j$$;$j$$--) {
          $newChild$$.setAttribute($attrs_v$$[$j$$].name, $attrs_v$$[$j$$].value);
        }
      }
      for (var $j$3$$ in $node$$.dataset) {
        $newChild$$.dataset[$j$3$$] = $node$$.dataset[$j$3$$];
      }
      $newChild$$._rt_ctrl = new $obj$2$$.controller($newChild$$);
      $newChild$$._rt_ctrl.$ctrl = Silica.getContext($node$$.parentNode);
      Silica.cacheTemplates($newChild$$);
      Silica.interpolate($newChild$$, $newChild$$._rt_ctrl, !1);
      $node$$.parentNode.replaceChild($newChild$$, $node$$);
      var $node$$ = $obj$2$$.controller.watchers, $w$4$$;
      for ($w$4$$ in $node$$) {
        $attrs_v$$ = $node$$[$w$4$$], Silica._watch[$w$4$$] || (Silica._watch[$w$4$$] = []), Silica._watch[$w$4$$].push([$newChild$$._rt_ctrl, $attrs_v$$]);
      }
      if ("function" === typeof $newChild$$._rt_ctrl.onLoad) {
        $newChild$$._rt_ctrl.onLoad();
      }
    }
  }
}
module$build_cache$src$compilers$directives.default = directives$$module$build_cache$src$compilers$directives;
var module$build_cache$src$compilers$if = {};
function _if$$module$build_cache$src$compilers$if() {
  for (var $nodes$$ = Silica.queryWithComments(this, "[data-if]"), $comment_isVisible$$, $raw$$, $list$$, $node$$, $temp$$ = document.createElement("div"), $$jscomp$loop$27$$ = {}, $i$$ = $nodes$$.length - 1;0 <= $i$$;$$jscomp$loop$27$$ = {subNode:$$jscomp$loop$27$$.subNode}, --$i$$) {
    if ($node$$ = $nodes$$[$i$$], 8 === $node$$.nodeType ? ($temp$$.innerHTML = $node$$.nodeValue, $raw$$ = $list$$ = $temp$$.firstElementChild.dataset["if"]) : $raw$$ = $list$$ = $node$$.dataset["if"], ($comment_isVisible$$ = "!" === $list$$[0]) && ($list$$ = $list$$.substr(1)), Silica._ifs[$raw$$] || (Silica._ifs[$raw$$] = []), $comment_isVisible$$ = Silica._show($node$$, $list$$, $comment_isVisible$$)) {
      if (8 !== $node$$.nodeType ? Silica._ifs[$raw$$].push($node$$) : ($comment_isVisible$$ = $temp$$.firstElementChild, Silica._ifs[$raw$$].push($comment_isVisible$$), $node$$.parentElement.insertBefore($comment_isVisible$$, $node$$), $node$$.remove(), $node$$ = $comment_isVisible$$), null != ($_ref$$ = Silica.getContext($node$$)) && "function" === typeof $_ref$$.onLoad && $_ref$$.el === $node$$) {
        $_ref$$.onLoad();
      }
    } else {
      if (8 !== $node$$.nodeType) {
        $comment_isVisible$$ = Silica.queryWithComments($node$$, "[data-if]");
        $$jscomp$loop$27$$.subNode = void 0;
        for (var $$jscomp$loop$28_prop$$, $_ref$$, $j$5_j$$ = $comment_isVisible$$.length - 1;0 <= $j$5_j$$;--$j$5_j$$) {
          $$jscomp$loop$27$$.subNode = $comment_isVisible$$[$j$5_j$$], $$jscomp$loop$28_prop$$ = $$jscomp$loop$27$$.subNode.dataset["if"], $list$$ = Silica._shws[$$jscomp$loop$28_prop$$], Silica._shws[$$jscomp$loop$28_prop$$] = null != $list$$ ? $list$$.filter(function($$jscomp$loop$27$$) {
            return function($obj$$) {
              return $obj$$ != $$jscomp$loop$27$$.subNode;
            };
          }($$jscomp$loop$27$$)) : [];
        }
        $comment_isVisible$$ = Silica.query(this, "[data-controller]");
        $$jscomp$loop$28_prop$$ = {};
        for ($j$5_j$$ = $comment_isVisible$$.length - 1;0 <= $j$5_j$$;$$jscomp$loop$28_prop$$ = {ctrl$6:$$jscomp$loop$28_prop$$.ctrl$6}, --$j$5_j$$) {
          $$jscomp$loop$27$$.subNode = $comment_isVisible$$[$j$5_j$$];
          $$jscomp$loop$28_prop$$.ctrl$6 = this._rt_ctrl;
          var $k$7$$ = void 0;
          for ($k$7$$ in null != $$jscomp$loop$28_prop$$.ctrl$6 ? $$jscomp$loop$28_prop$$.ctrl$6.watchers : void 0) {
            $list$$ = Silica._watch[$k$7$$], Silica._watch[$k$7$$] = null != $list$$ ? $list$$.filter(function($$jscomp$loop$28$$) {
              return function($obj$$) {
                return $obj$$[0] !== $$jscomp$loop$28$$.ctrl$6;
              };
            }($$jscomp$loop$28_prop$$)) : [];
          }
        }
        $comment_isVisible$$ = document.createComment($node$$.outerHTML);
        Silica._ifs[$raw$$].push($comment_isVisible$$);
        $node$$.parentNode.replaceChild($comment_isVisible$$, $node$$);
      }
    }
  }
}
module$build_cache$src$compilers$if.default = _if$$module$build_cache$src$compilers$if;
var module$build_cache$src$compilers$show = {};
function Show$$module$build_cache$src$compilers$show() {
  for (var $nodes$$ = Silica.query(this, "[data-show]"), $node$$, $isVisible$jscomp$2_negate$$, $raw$$, $val$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $raw$$ = $val$$ = $node$$.dataset.show, ($isVisible$jscomp$2_negate$$ = "!" === $val$$[0]) && ($val$$ = $val$$.substr(1)), Silica._shws[$raw$$] || (Silica._shws[$raw$$] = []), Silica._shws[$raw$$].some(function($obj$$) {
      return $obj$$ == $node$$;
    }) || ($node$$.onremove = function $$node$$$onremove$() {
      var $list$$ = Silica._shws[$raw$$];
      Silica._shws[$raw$$] = void 0 !== $list$$ && null !== $list$$ ? $list$$.filter(function($obj$$) {
        return $obj$$ !== $node$$;
      }) : [];
    }, $isVisible$jscomp$2_negate$$ = Silica._show($node$$, $val$$, $isVisible$jscomp$2_negate$$), Silica._shws[$raw$$].push($node$$), $isVisible$jscomp$2_negate$$ ? $node$$.classList.remove("hidden") : $node$$.classList.add("hidden"));
  }
}
module$build_cache$src$compilers$show.default = Show$$module$build_cache$src$compilers$show;
var module$build_cache$src$compilers$disabled = {};
function Disabled$$module$build_cache$src$compilers$disabled() {
  for (var $nodes$$ = Silica.query(this, "[data-disabled]"), $node$$, $property$$, $negate$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $property$$ = $node$$.dataset.disabled, ($negate$$ = "!" === $property$$[0]) && ($property$$ = $property$$.substr(1)), Silica._show($node$$, $property$$, $negate$$) ? $node$$.setAttribute("disabled", !0) : $node$$.removeAttribute("disabled");
  }
}
module$build_cache$src$compilers$disabled.default = Disabled$$module$build_cache$src$compilers$disabled;
var module$build_cache$src$compilers$href = {};
function Href$$module$build_cache$src$compilers$href() {
  for (var $nodes$$ = Silica.query(this, "[data-href]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.setAttribute("href", Silica.getValue($node$$, $node$$.dataset.href));
  }
  Silica._capture_links(this);
}
module$build_cache$src$compilers$href.default = Href$$module$build_cache$src$compilers$href;
var module$build_cache$src$compilers$style = {};
function Style$$module$build_cache$src$compilers$style() {
  for (var $nodes$$ = Silica.query(this, "[data-style]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.setAttribute("style", Silica.getValue($node$$, $node$$.dataset.style));
  }
}
module$build_cache$src$compilers$style.default = Style$$module$build_cache$src$compilers$style;
var module$build_cache$src$compilers$include = {};
function loadCallback$$module$build_cache$src$compilers$include($element$$) {
  var $ctx$$ = Silica.getContext($element$$);
  if ($ctx$$.onLoad && "function" === typeof $ctx$$.onLoad) {
    $ctx$$.onLoad($element$$);
  }
}
function clearContent$$module$build_cache$src$compilers$include($element$$) {
  for (;$element$$.hasChildNodes();) {
    $element$$.removeChild($element$$.lastChild);
  }
}
function loadPartial$$module$build_cache$src$compilers$include($url$$, $element$$) {
  if ($element$$.dataset.sio2IncludedUrl != $url$$) {
    $element$$.dataset.sio2IncludedUrl = $url$$;
    clearContent$$module$build_cache$src$compilers$include($element$$);
    var $cached$$ = Silica._includeCache[$url$$];
    if ($cached$$) {
      $element$$.appendChild($cached$$), Silica.flush($element$$), loadCallback$$module$build_cache$src$compilers$include($element$$);
    } else {
      var $xhr$$ = new XMLHttpRequest;
      $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
        if (4 == $xhr$$.readyState) {
          var $fragment$$ = document.createElement("div");
          $fragment$$.innerHTML = $xhr$$.responseText;
          $element$$.appendChild($fragment$$);
          Silica.compile($element$$);
          Silica._includeCache[$url$$] = $fragment$$;
          loadCallback$$module$build_cache$src$compilers$include($element$$);
        }
      };
      $xhr$$.open("GET", $url$$, !0);
      $xhr$$.send(null);
    }
  }
}
function Include$$module$build_cache$src$compilers$include() {
  for (var $nodes$$ = Silica.query(this, "[data-include]"), $node$$, $url$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], ($url$$ = Silica.getValue($node$$, $node$$.dataset.include)) && "" !== $url$$ ? loadPartial$$module$build_cache$src$compilers$include($url$$, $node$$) : (delete $node$$.dataset.sio2IncludedUrl, clearContent$$module$build_cache$src$compilers$include($node$$));
  }
}
module$build_cache$src$compilers$include.default = Include$$module$build_cache$src$compilers$include;
var module$build_cache$src$compilers$controller = {};
function Controller$$module$build_cache$src$compilers$controller($ctx$jscomp$1_nodes$$, $force$$, $storeWatchers$$) {
  $force$$ = void 0 === $force$$ ? !1 : $force$$;
  $storeWatchers$$ = void 0 === $storeWatchers$$ ? !0 : $storeWatchers$$;
  var $_ref$jscomp$1_constructorName_ctrl$$, $k$$, $lastCtrl_v$$, $model_parent$$, $node$$, $constructor_watchers$$;
  $ctx$jscomp$1_nodes$$ = Silica.query(this, "[data-controller]");
  for (var $i$$ = $ctx$jscomp$1_nodes$$.length - 1;0 <= $i$$;--$i$$) {
    if ($node$$ = $ctx$jscomp$1_nodes$$[$i$$], $force$$ || void 0 === $node$$._rt_ctrl) {
      $lastCtrl_v$$ = $node$$._rt_ctrl;
      delete $node$$._rt_ctrl;
      $_ref$jscomp$1_constructorName_ctrl$$ = $node$$.dataset.controller;
      "undefined" !== typeof($_ref$jscomp$1_constructorName_ctrl$$ = $_ref$jscomp$1_constructorName_ctrl$$.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] && ($model_parent$$ = ($model_parent$$ = $node$$.parentNode) ? Silica.getValue($model_parent$$, $_ref$jscomp$1_constructorName_ctrl$$[2]) : Silica.getValue($node$$, $_ref$jscomp$1_constructorName_ctrl$$[2], $node$$._rt_ctx), null == $model_parent$$ && ($storeWatchers$$ = !1));
      $_ref$jscomp$1_constructorName_ctrl$$ = $_ref$jscomp$1_constructorName_ctrl$$[1];
      $constructor_watchers$$ = eval($_ref$jscomp$1_constructorName_ctrl$$);
      if (!$constructor_watchers$$) {
        return console.error("Unknown Controller: " + $node$$.dataset.controller);
      }
      $_ref$jscomp$1_constructorName_ctrl$$ = "undefined" !== typeof $model_parent$$ ? new $constructor_watchers$$($node$$, $model_parent$$) : new $constructor_watchers$$($node$$);
      $constructor_watchers$$ = $constructor_watchers$$.watchers;
      if ($lastCtrl_v$$ && $constructor_watchers$$ && 0 < Object.keys($constructor_watchers$$).length) {
        for ($k$$ in $constructor_watchers$$) {
          var $stored$$ = Silica._watch[$k$$];
          if ($stored$$) {
            for (var $pairIdx$$ = $stored$$.length - 1;0 <= $pairIdx$$;--$pairIdx$$) {
              $lastCtrl_v$$ == $stored$$[$pairIdx$$][0] && $stored$$.splice($pairIdx$$, 1);
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
module$build_cache$src$compilers$controller.default = Controller$$module$build_cache$src$compilers$controller;
var module$build_cache$src$compilers$double_click = {};
function DoubleClick$$module$build_cache$src$compilers$double_click() {
  for (var $nodes$$ = Silica.query(this, "[data-dblclick]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ondblclick = function $$node$$$ondblclick$($evt$$) {
      Silica._call(this, $evt$$, "dblclick");
    };
  }
}
module$build_cache$src$compilers$double_click.default = DoubleClick$$module$build_cache$src$compilers$double_click;
var module$build_cache$src$compilers$focus = {};
function Focus$$module$build_cache$src$compilers$focus() {
  for (var $nodes$$ = Silica.query(this, "[data-focus]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onfocus = function $$node$$$onfocus$($evt$$) {
      Silica._call(this, $evt$$, "focus");
    };
  }
}
module$build_cache$src$compilers$focus.default = Focus$$module$build_cache$src$compilers$focus;
var module$build_cache$src$compilers$model = {}, inputTimeRegexp$$module$build_cache$src$compilers$model = /date|time/i, inputTypes$$module$build_cache$src$compilers$model = "text file number email password tel search url range date month week time datetime datetime-local color textarea select select-one".split(" ");
function Model$$module$build_cache$src$compilers$model($context_elm$$) {
  for (var $change_ctx$$, $model$jscomp$0$$, $type$jscomp$93_val$$, $elements$$ = Silica.query(this, "input[data-model]", "select[data-model]", "textarea[data-model]", "option[data-model]"), $i$$ = $elements$$.length - 1;0 <= $i$$;$i$$--) {
    $context_elm$$ = $elements$$[$i$$], $change_ctx$$ = Silica.getContext($context_elm$$), $model$jscomp$0$$ = $context_elm$$.dataset.model, $type$jscomp$93_val$$ = $context_elm$$.type, -1 !== inputTypes$$module$build_cache$src$compilers$model.indexOf($type$jscomp$93_val$$) ? $context_elm$$.value = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) : "radio" === $type$jscomp$93_val$$ ? ($type$jscomp$93_val$$ = $context_elm$$.value, $type$jscomp$93_val$$.match(/[0-9]/) && ($type$jscomp$93_val$$ = 
    parseInt($type$jscomp$93_val$$, 10)), $context_elm$$.checked = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) === $type$jscomp$93_val$$) : "checkbox" === $type$jscomp$93_val$$ ? $context_elm$$.checked = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$) : "OPTION" === $context_elm$$.nodeName && ($context_elm$$.value = Silica.getValue($context_elm$$, $model$jscomp$0$$, $change_ctx$$)), $change_ctx$$ = function $$change_ctx$$$() {
      var $obj$$, $_ref$$, $_ref1$$, $_ref2_scope$$, $val$$ = this.value, $ctx$$ = Silica.getContext(this), $model$$ = this.dataset.model;
      "radio" === this.type ? $val$$.match(/[0-9]/) && ($val$$ = parseInt($val$$, 10)) : "checkbox" === this.type && ($val$$ = this.checked);
      if (Silica.isInApply) {
        $obj$$ = null != ($_ref$$ = this._rt_ctx) ? $_ref$$ : $ctx$$, Silica.setPropByString($obj$$, $model$$, $val$$);
      } else {
        if (null != ($_ref$$ = this.dataset.trap)) {
          $obj$$ = null != ($_ref1$$ = this._rt_ctx) ? $_ref1$$ : $ctx$$;
          if ("true" === $_ref$$.toLowerCase()) {
            $_ref2_scope$$ = this;
          } else {
            for ($_ref2_scope$$ = document, $_ref1$$ = this;$_ref1$$ = $_ref1$$.parentElement;) {
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
module$build_cache$src$compilers$model.default = Model$$module$build_cache$src$compilers$model;
var module$build_cache$src$compilers$submit = {};
function Submit$$module$build_cache$src$compilers$submit() {
  for (var $nodes$$ = Silica.query(this, "[data-submit]"), $node$$, $handler$$ = function $$handler$$$($evt$$) {
    Silica._call(this, $evt$$, "submit");
    return !1;
  }, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.onsubmit = $handler$$, $node$$._rt_live = !0;
  }
}
module$build_cache$src$compilers$submit.default = Submit$$module$build_cache$src$compilers$submit;
var module$build_cache$src$compilers$src = {};
function Src$$module$build_cache$src$compilers$src() {
  for (var $nodes$$ = Silica.queryOfType(this, "img", "[data-src]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$.src = Silica.getValue($node$$, $node$$.dataset.src) || "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
  }
}
module$build_cache$src$compilers$src.default = Src$$module$build_cache$src$compilers$src;
var module$build_cache$src$compilers$scroll = {};
function Scroll$$module$build_cache$src$compilers$scroll() {
  for (var $nodes$$ = Silica.query(this, "[data-scroll]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onscroll = function $$node$$$onscroll$($evt$$) {
      Silica._call(this, $evt$$, "scroll");
    };
  }
}
module$build_cache$src$compilers$scroll.default = Scroll$$module$build_cache$src$compilers$scroll;
var module$build_cache$src$compilers$scroll_finished = {};
function ScrollFinished$$module$build_cache$src$compilers$scroll_finished() {
  for (var $nodes$$ = Silica.query(this, "[data-scroll-finished]"), $node$$, $$jscomp$loop$29$$ = {}, $i$$ = $nodes$$.length - 1;0 <= $i$$;$$jscomp$loop$29$$ = {element:$$jscomp$loop$29$$.element}, --$i$$) {
    $node$$ = $nodes$$[$i$$];
    $node$$._rt_live = !0;
    $$jscomp$loop$29$$.element = this;
    var $onscrollfinished$$ = Silica.debounce(function($element$$, $evt$$) {
      Silica._call($element$$, $evt$$, "scroll-finished");
    }, 50);
    $node$$.onscroll = function($$jscomp$loop$29$$) {
      return function($evt$$) {
        this.dataset.scroll && Silica._call(this, $evt$$, "scroll");
        $onscrollfinished$$($$jscomp$loop$29$$.element, $evt$$);
      };
    }($$jscomp$loop$29$$);
  }
}
module$build_cache$src$compilers$scroll_finished.default = ScrollFinished$$module$build_cache$src$compilers$scroll_finished;
var module$build_cache$src$compilers$generic_attribute = {};
function Href$$module$build_cache$src$compilers$generic_attribute() {
  for (var $nodes$$ = Silica.query(this, "[data-silica]"), $node$$, $comps_valueKey$$, $attribute$$, $params$$, $paramsKeys$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$];
    $comps_valueKey$$ = $node$$.dataset.silica.split("=");
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
      for (var $j$$ = 0, $length$$ = $paramsKeys$$.length;$j$$ < $length$$;$j$$++) {
        $params$$.push(Silica.getValue($node$$, $paramsKeys$$[$j$$]));
      }
      $comps_valueKey$$ = $comps_valueKey$$.substr(0, $comps_valueKey$$.indexOf("("));
    }
    "innerHTML" !== $attribute$$ ? $node$$.setAttribute($attribute$$, Silica.getValue($node$$, $comps_valueKey$$, null, $params$$)) : $node$$.innerHTML = Silica.getValue($node$$, $comps_valueKey$$, null, $params$$);
  }
  Silica._capture_links(this);
}
module$build_cache$src$compilers$generic_attribute.default = Href$$module$build_cache$src$compilers$generic_attribute;
var module$build_cache$src$compilers$mousedown = {};
function MouseDown$$module$build_cache$src$compilers$mousedown() {
  for (var $nodes$$ = Silica.query(this, "[data-mousedown]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousedown = function $$node$$$onmousedown$($evt$$) {
      Silica._call(this, $evt$$, "mousedown");
    };
  }
}
module$build_cache$src$compilers$mousedown.default = MouseDown$$module$build_cache$src$compilers$mousedown;
var module$build_cache$src$compilers$mouseenter = {};
function MouseEnter$$module$build_cache$src$compilers$mouseenter() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseenter]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseenter = function $$node$$$onmouseenter$($evt$$) {
      Silica._call(this, $evt$$, "mouseenter");
    };
  }
}
module$build_cache$src$compilers$mouseenter.default = MouseEnter$$module$build_cache$src$compilers$mouseenter;
var module$build_cache$src$compilers$mouseleave = {};
function MouseLeave$$module$build_cache$src$compilers$mouseleave() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseleave]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseleave = function $$node$$$onmouseleave$($evt$$) {
      Silica._call(this, $evt$$, "mouseleave");
    };
  }
}
module$build_cache$src$compilers$mouseleave.default = MouseLeave$$module$build_cache$src$compilers$mouseleave;
var module$build_cache$src$compilers$mousemove = {};
function MouseMove$$module$build_cache$src$compilers$mousemove() {
  for (var $nodes$$ = Silica.query(this, "[data-mousemove]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousemove = function $$node$$$onmousemove$($evt$$) {
      Silica._call(this, $evt$$, "mousemove");
    };
  }
}
module$build_cache$src$compilers$mousemove.default = MouseMove$$module$build_cache$src$compilers$mousemove;
var module$build_cache$src$compilers$mouseout = {};
function MouseOut$$module$build_cache$src$compilers$mouseout() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseout]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseout = function $$node$$$onmouseout$($evt$$) {
      Silica._call(this, $evt$$, "mouseout");
    };
  }
}
module$build_cache$src$compilers$mouseout.default = MouseOut$$module$build_cache$src$compilers$mouseout;
var module$build_cache$src$compilers$mouseover = {};
function MouseOver$$module$build_cache$src$compilers$mouseover() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseover]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseover = function $$node$$$onmouseover$($evt$$) {
      Silica._call(this, $evt$$, "mouseover");
    };
  }
}
module$build_cache$src$compilers$mouseover.default = MouseOver$$module$build_cache$src$compilers$mouseover;
var module$build_cache$src$compilers$mouseup = {};
function MouseUp$$module$build_cache$src$compilers$mouseup() {
  for (var $nodes$$ = Silica.query(this, "[data-mouseup]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmouseup = function $$node$$$onmouseup$($evt$$) {
      Silica._call(this, $evt$$, "mouseup");
    };
  }
}
module$build_cache$src$compilers$mouseup.default = MouseUp$$module$build_cache$src$compilers$mouseup;
var module$build_cache$src$compilers$mousewheel = {};
function MouseWheel$$module$build_cache$src$compilers$mousewheel() {
  for (var $nodes$$ = Silica.query(this, "[data-mousewheel]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.onmousewheel = function $$node$$$onmousewheel$($evt$$) {
      Silica._call(this, $evt$$, "mousewheel");
    };
  }
}
module$build_cache$src$compilers$mousewheel.default = MouseWheel$$module$build_cache$src$compilers$mousewheel;
var module$build_cache$src$compilers$keydown = {};
function KeyDown$$module$build_cache$src$compilers$keydown($context$jscomp$1_elements$$) {
  $context$jscomp$1_elements$$ = Silica.query(this, "[data-keydown]");
  for (var $i$$ = $context$jscomp$1_elements$$.length - 1;0 <= $i$$;$i$$--) {
    $context$jscomp$1_elements$$[$i$$].addEventListener("keydown", function($evt$$) {
      Silica._call(this, $evt$$, "keydown");
    });
  }
}
module$build_cache$src$compilers$keydown.default = KeyDown$$module$build_cache$src$compilers$keydown;
var module$build_cache$src$compilers$keyup = {};
function KeyUp$$module$build_cache$src$compilers$keyup($context$jscomp$2_elements$$) {
  $context$jscomp$2_elements$$ = Silica.query(this, "[data-keyup]");
  for (var $i$$ = $context$jscomp$2_elements$$.length - 1;0 <= $i$$;$i$$--) {
    $context$jscomp$2_elements$$[$i$$].addEventListener("keyup", function($evt$$) {
      Silica._call(this, $evt$$, "keyup");
    });
  }
}
module$build_cache$src$compilers$keyup.default = KeyUp$$module$build_cache$src$compilers$keyup;
var module$build_cache$src$compilers$touch$touchstart = {};
function TouchStart$$module$build_cache$src$compilers$touch$touchstart() {
  for (var $nodes$$ = Silica.query(this, "[data-touchstart]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchstart = function $$node$$$ontouchstart$($evt$$) {
      Silica._call(this, $evt$$, "touchstart");
    };
  }
}
module$build_cache$src$compilers$touch$touchstart.default = TouchStart$$module$build_cache$src$compilers$touch$touchstart;
var module$build_cache$src$compilers$touch$touchcancel = {};
function TouchCancel$$module$build_cache$src$compilers$touch$touchcancel() {
  for (var $nodes$$ = Silica.query(this, "[data-touchcancel]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchcancel = function $$node$$$ontouchcancel$($evt$$) {
      Silica._call(this, $evt$$, "touchcancel");
    };
  }
}
module$build_cache$src$compilers$touch$touchcancel.default = TouchCancel$$module$build_cache$src$compilers$touch$touchcancel;
var module$build_cache$src$compilers$touch$touchend = {};
function TouchEnd$$module$build_cache$src$compilers$touch$touchend() {
  for (var $nodes$$ = Silica.query(this, "[data-touchend]"), $node$$, $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $nodes$$[$i$$], $node$$._rt_live = !0, $node$$.ontouchend = function $$node$$$ontouchend$($evt$$) {
      Silica._call(this, $evt$$, "touchend");
    };
  }
}
module$build_cache$src$compilers$touch$touchend.default = TouchEnd$$module$build_cache$src$compilers$touch$touchend;
var module$build_cache$src$compilers$compilers = {}, $jscompDefaultExport$$module$build_cache$src$compilers$compilers = {Directive:module$build_cache$src$compilers$directives.default, _if:module$build_cache$src$compilers$if.default, Show:module$build_cache$src$compilers$show.default, Class:module$build_cache$src$compilers$class.default, Disabled:module$build_cache$src$compilers$disabled.default, Href:module$build_cache$src$compilers$href.default, Style:module$build_cache$src$compilers$style.default, 
Include:module$build_cache$src$compilers$include.default, Controller:module$build_cache$src$compilers$controller.default, Click:module$build_cache$src$compilers$click.default, ClickOutside:module$build_cache$src$compilers$clickoutside.default, DoubleClick:module$build_cache$src$compilers$double_click.default, Blur:module$build_cache$src$compilers$blur.default, Focus:module$build_cache$src$compilers$focus.default, Model:module$build_cache$src$compilers$model.default, Submit:module$build_cache$src$compilers$submit.default, 
Src:module$build_cache$src$compilers$src.default, Scroll:module$build_cache$src$compilers$scroll.default, ScrollFinished:module$build_cache$src$compilers$scroll_finished.default, Generic:module$build_cache$src$compilers$generic_attribute.default, MouseDown:module$build_cache$src$compilers$mousedown.default, MouseUp:module$build_cache$src$compilers$mouseup.default, MouseOut:module$build_cache$src$compilers$mouseout.default, MouseMove:module$build_cache$src$compilers$mousemove.default, MouseWheel:module$build_cache$src$compilers$mousewheel.default, 
MouseLeave:module$build_cache$src$compilers$mouseleave.default, MouseEnter:module$build_cache$src$compilers$mouseenter.default, MouseOver:module$build_cache$src$compilers$mouseover.default, KeyDown:module$build_cache$src$compilers$keydown.default, KeyUp:module$build_cache$src$compilers$keyup.default, TouchStart:module$build_cache$src$compilers$touch$touchstart.default, TouchCancel:module$build_cache$src$compilers$touch$touchcancel.default, TouchEnd:module$build_cache$src$compilers$touch$touchend.default};
module$build_cache$src$compilers$compilers.default = $jscompDefaultExport$$module$build_cache$src$compilers$compilers;
var module$build_cache$src$compilers$components = {};
function components$$module$build_cache$src$compilers$components() {
  for (var $k$8$$ in Silica.components) {
    for (var $nodes$$ = Silica.queryOfType(this, $k$8$$), $wrapper$$ = document.createElement("div"), $i$$ = $nodes$$.length - 1;0 <= $i$$;--$i$$) {
      $wrapper$$.innerHTML = obj.template;
      var $newChild$$ = $wrapper$$.firstChild, $node$jscomp$32_watchers$$ = $nodes$$[$i$$];
      if ($node$jscomp$32_watchers$$.hasAttributes()) {
        for (var $attrs$jscomp$1_v$$ = $node$jscomp$32_watchers$$.attributes, $j$$ = $attrs$jscomp$1_v$$.length - 1;0 <= $j$$;$j$$--) {
          $newChild$$.setAttribute($attrs$jscomp$1_v$$[$j$$].name, $attrs$jscomp$1_v$$[$j$$].value);
        }
      }
      for (var $j$9$$ in $node$jscomp$32_watchers$$.dataset) {
        $newChild$$.dataset[$j$9$$] = $node$jscomp$32_watchers$$.dataset[$j$9$$];
      }
      $newChild$$._rt_ctrl = new obj.controller($newChild$$);
      $newChild$$._rt_ctrl.$ctrl = Silica.getContext($node$jscomp$32_watchers$$.parentNode);
      Silica.cacheTemplates($newChild$$);
      Silica.interpolate($newChild$$, $newChild$$._rt_ctrl, !1);
      $node$jscomp$32_watchers$$.parentNode.replaceChild($newChild$$, $node$jscomp$32_watchers$$);
      $node$jscomp$32_watchers$$ = obj.controller.watchers;
      for (w in $node$jscomp$32_watchers$$) {
        $attrs$jscomp$1_v$$ = $node$jscomp$32_watchers$$[w], Silica._watch[w] || (Silica._watch[w] = []), Silica._watch[w].push([$newChild$$._rt_ctrl, $attrs$jscomp$1_v$$]);
      }
      if ("function" === typeof $newChild$$._rt_ctrl.onLoad) {
        $newChild$$._rt_ctrl.onLoad();
      }
    }
  }
}
module$build_cache$src$compilers$components.default = components$$module$build_cache$src$compilers$components;
var module$build_cache$src$controllers$base = {}, Base$$module$build_cache$src$controllers$base = function $Base$$module$build_cache$src$controllers$base$($el$$) {
  this.el = $el$$;
  $el$$.parentElement && (this.$ctrl = Silica.getContext($el$$.parentElement));
};
Base$$module$build_cache$src$controllers$base.prototype.$ = function $Base$$module$build_cache$src$controllers$base$$$$($selector$$) {
  return this.el.querySelectorAll($selector$$);
};
Base$$module$build_cache$src$controllers$base.watchers = {};
Base$$module$build_cache$src$controllers$base.prototype.$ = Base$$module$build_cache$src$controllers$base.prototype.$;
var $jscompDefaultExport$$module$build_cache$src$controllers$base = Base$$module$build_cache$src$controllers$base;
module$build_cache$src$controllers$base.default = $jscompDefaultExport$$module$build_cache$src$controllers$base;
var module$build_cache$src$controllers$controllers = {}, Controllers$$module$build_cache$src$controllers$controllers = {Base:module$build_cache$src$controllers$base.default}, $jscompDefaultExport$$module$build_cache$src$controllers$controllers = Controllers$$module$build_cache$src$controllers$controllers;
module$build_cache$src$controllers$controllers.default = $jscompDefaultExport$$module$build_cache$src$controllers$controllers;
var module$build_cache$src$watchers$if = {};
function _If$$module$build_cache$src$watchers$if() {
  var $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$, $elements$$, $i$$, $k$$, $negate$$, $raw$$, $_len$$, $_ref$$, $wrapper$$ = document.createElement("div");
  $_ref$$ = Silica._ifs;
  console.log("Entering If watcher");
  for ($k$$ in $_ref$$) {
    $elements$$ = $_ref$$[$k$$];
    $raw$$ = $k$$;
    ($negate$$ = "!" === $k$$[0]) && ($k$$ = $k$$.substr(1));
    var $$jscomp$loop$30$$ = {};
    $i$$ = 0;
    for ($_len$$ = $elements$$.length;$i$$ < $_len$$;$$jscomp$loop$30$$ = {subNode:$$jscomp$loop$30$$.subNode}, ++$i$$) {
      var $_ref$10_element$$ = $elements$$[$i$$];
      if ($_ref$10_element$$ == this || Silica.isDescendent(this, $_ref$10_element$$)) {
        if ($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = Silica._show($_ref$10_element$$, $k$$, $negate$$)) {
          if ($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = $_ref$10_element$$.parentNode, 8 === $_ref$10_element$$.nodeType && null != $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ && (console.log("parent is", $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$), $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = document.createElement("div"), $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$.innerHTML = 
          $_ref$10_element$$.nodeValue, $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = Silica.compile($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$.firstElementChild, !1, Silica.getContext($_ref$10_element$$.parentElement)), console.log("parent is now", $_ref$10_element$$.parentNode), $_ref$10_element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$, $_ref$10_element$$), Silica._ifs[$raw$$][$i$$] = 
          $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$, $_ref$10_element$$ = void 0, null != ($_ref$10_element$$ = Silica.getContext($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$)) && "function" === typeof $_ref$10_element$$.onLoad && $_ref$10_element$$.el == $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$)) {
            $_ref$10_element$$.onLoad();
          }
        } else {
          if (8 !== $_ref$10_element$$.nodeType) {
            $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = Silica.queryWithComments($_ref$10_element$$, "[data-if]");
            $$jscomp$loop$30$$.subNode = void 0;
            for (var $j$11_j$$ = $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$.length - 1;0 <= $j$11_j$$;--$j$11_j$$) {
              var $list$$, $prop$$, $_ref1$$;
              $$jscomp$loop$30$$.subNode = $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$[$j$11_j$$];
              8 !== $$jscomp$loop$30$$.subNode.nodeType || $$jscomp$loop$30$$.subNode.dataset ? $prop$$ = $$jscomp$loop$30$$.subNode.dataset["if"] : ($wrapper$$.innerHTML = $$jscomp$loop$30$$.subNode.data, $prop$$ = $wrapper$$.firstChild.dataset["if"]);
              $list$$ = Silica._shws[$prop$$];
              Silica._shws[$prop$$] = null != ($_ref1$$ = null != $list$$ ? $list$$.filter(function($$jscomp$loop$30$$) {
                return function($obj$$) {
                  return !$obj$$ == $$jscomp$loop$30$$.subNode;
                };
              }($$jscomp$loop$30$$)) : void 0) ? $_ref1$$ : [];
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = Silica.query($_ref$10_element$$, "[data-controller]");
            for ($j$11_j$$ = $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$.length - 1;0 <= $j$11_j$$;--$j$11_j$$) {
              var $ctrl$$;
              $$jscomp$loop$30$$.subNode = $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$[$j$11_j$$];
              $ctrl$$ = $$jscomp$loop$30$$.subNode._rt_ctrl;
              for ($k$$ in null != $ctrl$$ ? $ctrl$$.constructor.watchers : void 0) {
                $list$$ = Silica._watch[$k$$], Silica._watch[$k$$] = null != $list$$ ? $list$$.filter(function($obj$$) {
                  return $obj$$[0] !== $ctrl$$;
                }) : [];
              }
            }
            $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$ = document.createComment($_ref$10_element$$.outerHTML);
            $_ref$10_element$$.parentNode.replaceChild($comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$, $_ref$10_element$$);
            Silica._ifs[$raw$$][$i$$] = $comment$jscomp$1_compiled_isVisible$jscomp$3_p_subNodes$jscomp$1_temp$$;
          }
        }
      }
    }
  }
  console.log("Exiting if watcher");
}
module$build_cache$src$watchers$if.default = _If$$module$build_cache$src$watchers$if;
var module$build_cache$src$watchers$repeat = {};
function Repeat$$module$build_cache$src$watchers$repeat() {
  for (var $changed_context$$, $child_node$$, $ctx$$, $list$jscomp$5_newList_param$$, $model$$, $newListHash_obj$jscomp$37_template$$, $_i_count_diff_key$$, $_len$jscomp$1_fragment$jscomp$1_j$$, $_ref$$, $elements$$ = Silica.querySorted(this, "[data-repeat]"), $raw$$, $i$$ = 0, $length$$ = $elements$$.length;$i$$ < $length$$;++$i$$) {
    if ($raw$$ = $elements$$[$i$$], $ctx$$ = $raw$$.dataset.repeat.split(/\s+in\s+/), $list$jscomp$5_newList_param$$ = $ctx$$[1], $model$$ = $ctx$$[0], $ctx$$ = Silica.getContext($raw$$), "undefined" !== typeof($_ref$$ = $list$jscomp$5_newList_param$$.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] ? ($list$jscomp$5_newList_param$$ = $_ref$$[2], $list$jscomp$5_newList_param$$ = Silica.getValue($raw$$.parentNode, $list$jscomp$5_newList_param$$), $list$jscomp$5_newList_param$$ = Silica.getValue($raw$$, $_ref$$[1], 
    null, $list$jscomp$5_newList_param$$)) : $list$jscomp$5_newList_param$$ = Silica.getValue($raw$$, $list$jscomp$5_newList_param$$), $newListHash_obj$jscomp$37_template$$ = md5(JSON.stringify($list$jscomp$5_newList_param$$, function($key$$, $value$$) {
      if ($key$$.constructor != String || "__elm" != $key$$ && "$ctrl" != $key$$ && 95 !== $key$$.charCodeAt(0)) {
        return $value$$;
      }
    })), $_ref$$ = $raw$$.childNodes, $changed_context$$ = ($changed_context$$ = $raw$$._rt_repeat_list) && $list$jscomp$5_newList_param$$ ? $changed_context$$ !== $newListHash_obj$jscomp$37_template$$ : !0) {
      if ($raw$$._rt_repeat_list = $list$jscomp$5_newList_param$$ ? $newListHash_obj$jscomp$37_template$$ : null, $list$jscomp$5_newList_param$$) {
        $list$jscomp$5_newList_param$$.constructor === Number && ($list$jscomp$5_newList_param$$ = Array($list$jscomp$5_newList_param$$));
        $newListHash_obj$jscomp$37_template$$ = Silica._repeat_templates[$raw$$.dataset._rt_repeat_template];
        if ($list$jscomp$5_newList_param$$.constructor == Object) {
          $changed_context$$ = Object.keys($list$jscomp$5_newList_param$$);
          $child_node$$ = $list$jscomp$5_newList_param$$;
          $list$jscomp$5_newList_param$$ = [];
          $_i_count_diff_key$$ = void 0;
          $_len$jscomp$1_fragment$jscomp$1_j$$ = 0;
          var $len_modelChanged$$ = $changed_context$$.length;
          for ($_i_count_diff_key$$ = $changed_context$$[$_len$jscomp$1_fragment$jscomp$1_j$$];$_len$jscomp$1_fragment$jscomp$1_j$$ < $len_modelChanged$$;$_len$jscomp$1_fragment$jscomp$1_j$$++) {
            $_i_count_diff_key$$ = $changed_context$$[$_len$jscomp$1_fragment$jscomp$1_j$$], $list$jscomp$5_newList_param$$[$_len$jscomp$1_fragment$jscomp$1_j$$] = {key:$_i_count_diff_key$$, value:$child_node$$[$_i_count_diff_key$$]};
          }
        }
        $_i_count_diff_key$$ = $raw$$.childElementCount - $list$jscomp$5_newList_param$$.length;
        for ($child_node$$ = void 0;0 < $_i_count_diff_key$$;) {
          Silica.removeFromDOM($_ref$$[$_i_count_diff_key$$ - 1]), --$_i_count_diff_key$$;
        }
        for ($_len$jscomp$1_fragment$jscomp$1_j$$ = document.createDocumentFragment();0 > $_i_count_diff_key$$;) {
          $changed_context$$ = {};
          $changed_context$$[$model$$] = $list$jscomp$5_newList_param$$[0 - $_i_count_diff_key$$ - 1];
          $changed_context$$.$ctrl = $ctx$$;
          $child_node$$ = $newListHash_obj$jscomp$37_template$$.cloneNode(!0);
          $child_node$$._rt_ctx = $changed_context$$;
          for (var $key$13$$ in Silica.compilers) {
            Silica.compilers[$key$13$$].call($child_node$$);
          }
          $_len$jscomp$1_fragment$jscomp$1_j$$.appendChild($child_node$$);
          ++$_i_count_diff_key$$;
        }
        $_len$jscomp$1_fragment$jscomp$1_j$$.hasChildNodes() && $raw$$.appendChild($_len$jscomp$1_fragment$jscomp$1_j$$);
        $_i_count_diff_key$$ = 0;
        for ($_len$jscomp$1_fragment$jscomp$1_j$$ = $list$jscomp$5_newList_param$$.length;$_i_count_diff_key$$ < $_len$jscomp$1_fragment$jscomp$1_j$$;$_i_count_diff_key$$++) {
          $newListHash_obj$jscomp$37_template$$ = $list$jscomp$5_newList_param$$[$_i_count_diff_key$$], $child_node$$ = $_ref$$[$_i_count_diff_key$$], $len_modelChanged$$ = $model$$ != $newListHash_obj$jscomp$37_template$$, $child_node$$._rt_ctx ? $child_node$$._rt_ctx[$model$$] = $newListHash_obj$jscomp$37_template$$ : ($changed_context$$ = {}, $changed_context$$[$model$$] = $newListHash_obj$jscomp$37_template$$, $changed_context$$.$ctrl = $ctx$$, $child_node$$._rt_ctx = $changed_context$$), $len_modelChanged$$ && 
          module$build_cache$src$compilers$controller.default.call($child_node$$, $child_node$$._rt_ctx, !0), $child_node$$._rt_ctx.index = $_i_count_diff_key$$, Silica.flush($child_node$$, !1, {}, !0);
        }
        $ctx$$.renderedRepeat ? $ctx$$.renderedRepeat($raw$$) : $ctx$$.$ctrl && $ctx$$.$ctrl.renderedRepeat && $ctx$$.$ctrl.renderedRepeat($raw$$);
      } else {
        for (;0 < $raw$$.childNodes.length;) {
          Silica.removeFromDOM($raw$$.childNodes[0]);
        }
      }
    }
  }
}
module$build_cache$src$watchers$repeat.default = Repeat$$module$build_cache$src$watchers$repeat;
var module$build_cache$src$watchers$show = {};
function Show$$module$build_cache$src$watchers$show() {
  var $a_element$$, $elements$$, $i$14_i$$, $isVisible$jscomp$4_k$$, $negate$$;
  $elements$$ = this.querySelectorAll("[data-show]");
  if (this.dataset.show) {
    if (0 == $elements$$.length) {
      $elements$$ = [this];
    } else {
      $a_element$$ = [];
      for ($i$14_i$$ = $elements$$.length - 1;0 <= $i$14_i$$;$i$14_i$$--) {
        $a_element$$[$i$14_i$$] = $elements$$[$i$14_i$$];
      }
      $elements$$ = $a_element$$;
    }
  }
  for ($i$14_i$$ = $elements$$.length - 1;0 <= $i$14_i$$;$i$14_i$$--) {
    $a_element$$ = $elements$$[$i$14_i$$], Silica.isInDOM($a_element$$) && ($isVisible$jscomp$4_k$$ = $a_element$$.dataset.show, ($negate$$ = "!" === $isVisible$jscomp$4_k$$[0]) && ($isVisible$jscomp$4_k$$ = $isVisible$jscomp$4_k$$.substr(1)), ($isVisible$jscomp$4_k$$ = Silica._show($a_element$$, $isVisible$jscomp$4_k$$, $negate$$)) && $a_element$$.classList.contains("hidden") ? $a_element$$.classList.remove("hidden") : $isVisible$jscomp$4_k$$ || $a_element$$.classList.contains("hidden") || $a_element$$.classList.add("hidden"));
  }
}
module$build_cache$src$watchers$show.default = Show$$module$build_cache$src$watchers$show;
var module$build_cache$src$watchers$class = {};
function updater$$module$build_cache$src$watchers$class($element$$) {
  var $hardClass_key$jscomp$37_klass$$ = $element$$.dataset._rt_hard_klass;
  $hardClass_key$jscomp$37_klass$$ && 0 < $hardClass_key$jscomp$37_klass$$.length ? $element$$.className = $hardClass_key$jscomp$37_klass$$ : "" == $hardClass_key$jscomp$37_klass$$ ? $element$$.className = "" : $element$$.dataset._rt_hard_klass = $element$$.className;
  ($hardClass_key$jscomp$37_klass$$ = Silica.getValue($element$$, $element$$.dataset["class"], null, [$element$$, $element$$.dataset.parameter])) && ($hardClass_key$jscomp$37_klass$$ instanceof Array ? $element$$.classList.add.apply($element$$.classList, $hardClass_key$jscomp$37_klass$$) : $element$$.classList.add($hardClass_key$jscomp$37_klass$$));
  null != $element$$.dataset.show && ($hardClass_key$jscomp$37_klass$$ = $element$$.dataset.show, (isVisible = Silica._show($element$$, $hardClass_key$jscomp$37_klass$$, "!" == $hardClass_key$jscomp$37_klass$$[0])) && $element$$.classList.contains("hidden") ? $element$$.classList.remove("hidden") : isVisible || $element$$.classList.contains("hidden") || $element$$.classList.add("hidden"));
}
function Class$$module$build_cache$src$watchers$class() {
  var $elements$$ = this.querySelectorAll("[data-class]");
  this.dataset["class"] && updater$$module$build_cache$src$watchers$class(this);
  for (var $i$$ = $elements$$.length - 1;0 <= $i$$;--$i$$) {
    updater$$module$build_cache$src$watchers$class($elements$$[$i$$]);
  }
}
module$build_cache$src$watchers$class.default = Class$$module$build_cache$src$watchers$class;
var module$build_cache$src$watchers$model = {}, inputTimeRegexp$$module$build_cache$src$watchers$model = /date|time/i, inputTypes$$module$build_cache$src$watchers$model = "text file number email password tel search url range date month week time datetime datetime-local color textarea select select-one".split(" ");
function Model$$module$build_cache$src$watchers$model() {
  var $elements$$ = this.querySelectorAll("[data-model]"), $element$$, $i$$, $type$jscomp$94_val$$, $activeElement$$ = document.activeElement || Silica.__activeElement;
  for ($i$$ = $elements$$.length - 1;0 <= $i$$;--$i$$) {
    $element$$ = $elements$$[$i$$], $element$$ !== $activeElement$$ && ($type$jscomp$94_val$$ = $element$$.type, -1 !== inputTypes$$module$build_cache$src$watchers$model.indexOf($type$jscomp$94_val$$) ? $element$$.value = Silica._model_get_val($element$$) : "radio" === $type$jscomp$94_val$$ ? ($type$jscomp$94_val$$ = $element$$.value, -1 != $type$jscomp$94_val$$.search(/[0-9]/) && ($type$jscomp$94_val$$ = parseInt($type$jscomp$94_val$$, 10)), $element$$.checked = Silica.getValue($element$$, $element$$.dataset.model) === 
    $type$jscomp$94_val$$) : "checkbox" === $type$jscomp$94_val$$ ? $element$$.checked = Silica.getValue($element$$, $element$$.dataset.model) : "SPAN" === $element$$.nodeName || "PRE" === $element$$.nodeName || "DIV" === $element$$.nodeName || "P" === $element$$.nodeName ? ($type$jscomp$94_val$$ = Silica._model_get_val($element$$)) && $type$jscomp$94_val$$.nodeName ? ($element$$.innerHTML = "", $element$$.appendChild($type$jscomp$94_val$$)) : $element$$.innerHTML = $type$jscomp$94_val$$ : "OPTION" === 
    $element$$.nodeName && ($element$$.value = Silica._model_get_val($element$$)));
  }
}
module$build_cache$src$watchers$model.default = Model$$module$build_cache$src$watchers$model;
var module$build_cache$src$watchers$watchers = {}, $jscompDefaultExport$$module$build_cache$src$watchers$watchers = {_If:module$build_cache$src$watchers$if.default, Repeat:module$build_cache$src$watchers$repeat.default, Show:module$build_cache$src$watchers$show.default, Class:module$build_cache$src$watchers$class.default, Model:module$build_cache$src$watchers$model.default, Disabled:module$build_cache$src$compilers$disabled.default, Href:module$build_cache$src$compilers$href.default, Style:module$build_cache$src$compilers$style.default, 
Src:module$build_cache$src$compilers$src.default, Generic:module$build_cache$src$compilers$generic_attribute.default, Include:module$build_cache$src$compilers$include.default};
module$build_cache$src$watchers$watchers.default = $jscompDefaultExport$$module$build_cache$src$watchers$watchers;
window.Silica = {context:window, contextName:"", directives:{}, components:{}, filters:{}, router:null, _ifs:{}, _shws:{}, _klass:{}, _watch:{}, _repeat_templates:{}, _isReady:!1, _appRoot:null, _defers:[], _includeCache:{}, _clickOutElements:new Set, interpolationPattern:/\{\{(.*?)\}\}/, usePushState:!0, version:"0.15.2", setContext:function $window$Silica$setContext$($contextName$$) {
  this.contextName = $contextName$$;
  this.context = window[$contextName$$];
}, setRouter:function $window$Silica$setRouter$($router$$) {
  var $$jscomp$this$$ = this;
  Silica.router = $router$$;
  window.onhashchange = function $window$onhashchange$() {
    $$jscomp$this$$.apply(function() {
      return Silica.router.route(location.hash);
    });
  };
  Silica.usePushState && (window.onpopstate = function $window$onpopstate$() {
    $$jscomp$this$$.apply(function() {
      return Silica.router.route(Silica.usePushState ? location.pathname : location.hash);
    });
  });
}, goTo:function $window$Silica$goTo$($pathname$$) {
  var $route$$;
  Silica.usePushState ? (history.pushState(null, "", $pathname$$), $route$$ = $pathname$$) : (window.location.hash = "#" + $pathname$$, $route$$ = window.location.hash);
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
    $element$$ == document ? ($element$$ = document.body.parentElement, $context$$ = $context$$ || {}) : $context$$ = $context$$ || Silica.getContext($element$$);
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
}, cacheTemplates:function $window$Silica$cacheTemplates$($element$jscomp$13_nodes$$) {
  $element$jscomp$13_nodes$$ = $element$jscomp$13_nodes$$.querySelectorAll("[data-repeat]");
  for (var $node$$, $hash$$, $context$$, $i$$ = $element$jscomp$13_nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $element$jscomp$13_nodes$$[$i$$], $node$$.dataset._rt_repeat_template || ($hash$$ = md5($node$$.innerHTML), 1 === $node$$.children.length ? Silica._repeat_templates[$hash$$] = $node$$.firstElementChild : ($context$$ = document.createElement("div"), $context$$.innerHTML = $node$$.innerHTML, Silica._repeat_templates[$hash$$] = $context$$), $node$$.dataset._rt_repeat_template = $hash$$, $context$$ = {}, $context$$.$ctrl = Silica.getContext($node$$), Silica._repeat_templates[$hash$$] = 
    Silica.compile(Silica._repeat_templates[$hash$$], !1, $context$$, !0, !1), $node$$.innerHTML = "");
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
}, flush:function $window$Silica$flush$($element$$, $onlySafe$$, $changed$$, $skipSchedule$$) {
  $element$$ = void 0 === $element$$ ? document.body.parentElement : $element$$;
  $onlySafe$$ = void 0 === $onlySafe$$ ? !1 : $onlySafe$$;
  $changed$$ = void 0 === $changed$$ ? null : $changed$$;
  $skipSchedule$$ = void 0 === $skipSchedule$$ ? !1 : $skipSchedule$$;
  if (Silica.isInFlush && !$skipSchedule$$) {
    if (Silica._scheduledFlush) {
      return;
    }
    Silica._scheduledFlush = !0;
  }
  $element$$ == document && ($element$$ = document.body.parentElement);
  Silica.isInFlush = !$skipSchedule$$;
  if (null === $changed$$ && Silica._isReady) {
    var $funcs_watchers$$, $func$jscomp$7_key$$;
    for ($func$jscomp$7_key$$ in Silica._watch) {
      $funcs_watchers$$ = Silica._watch[$func$jscomp$7_key$$];
      for (var $i$16_k$$ = $funcs_watchers$$.length - 1;0 <= $i$16_k$$;--$i$16_k$$) {
        $changed$$ = $funcs_watchers$$[$i$16_k$$], $changed$$[1].apply($changed$$[0]);
      }
    }
  } else {
    for ($i$16_k$$ in $changed$$) {
      $funcs_watchers$$ = $changed$$[$i$16_k$$];
      if (!0 !== $funcs_watchers$$) {
        var $i$$ = $funcs_watchers$$.length - 1;
      } else {
        $funcs_watchers$$ = Silica._watch[$i$16_k$$], $i$$ = $funcs_watchers$$.length - 1;
      }
      for (;0 <= $i$$;--$i$$) {
        $func$jscomp$7_key$$ = $funcs_watchers$$[$i$$], $func$jscomp$7_key$$[1].apply($func$jscomp$7_key$$[0]);
      }
    }
  }
  $funcs_watchers$$ = Silica.watchers;
  for (var $k$18$$ in $funcs_watchers$$) {
    $onlySafe$$ && "_" === $k$18$$[0] || ($func$jscomp$7_key$$ = $funcs_watchers$$[$k$18$$], $func$jscomp$7_key$$.apply($element$$));
  }
  Silica.isInFlush = $skipSchedule$$;
  !0 !== Silica._scheduledFlush || $skipSchedule$$ || (Silica._scheduledFlush = !1, window.setTimeout(function() {
    Silica.flush(document, !1, {});
  }, 20));
  return Silica;
}, apply:function $window$Silica$apply$($finalChanges_func$$, $element$$) {
  $element$$ = void 0 === $element$$ ? document : $element$$;
  var $args$jscomp$1_changed$$, $association_changes$$, $funcs$jscomp$1_v$$, $k$$, $oldVal$$, $old_values$$, $val$$, $_j_property$$, $_k$$, $_len1_i$$, $_len2$$, $_ref1$$, $_ref2$$;
  if (Silica.isInApply) {
    return $finalChanges_func$$.call();
  }
  $old_values$$ = {};
  for ($_j_property$$ in Silica._watch) {
    if ($funcs$jscomp$1_v$$ = Silica._watch[$_j_property$$], $old_values$$[$_j_property$$] = [], 97 <= $_j_property$$.charCodeAt(0)) {
      for ($_len1_i$$ = $funcs$jscomp$1_v$$.length - 1, $association_changes$$ = $funcs$jscomp$1_v$$[$_len1_i$$];0 <= $_len1_i$$;$association_changes$$ = $funcs$jscomp$1_v$$[--$_len1_i$$]) {
        $val$$ = Silica.getPropByString($association_changes$$[0], $_j_property$$), Array.isArray($val$$) && ($val$$ = $val$$.slice()), $old_values$$[$_j_property$$].push([$association_changes$$[0], $val$$]);
      }
    } else {
      $val$$ = Silica.getPropByString(window, $_j_property$$), Array.isArray($val$$) && ($val$$ = $val$$.slice()), $old_values$$[$_j_property$$] = $val$$;
    }
  }
  Silica.isInApply = !0;
  try {
    $finalChanges_func$$.call();
  } catch ($err$$) {
    console.error($err$$);
  } finally {
    Silica.isInApply = !1;
  }
  $association_changes$$ = {};
  $_ref1$$ = Silica._watch;
  for ($k$$ in $_ref1$$) {
    if ($funcs$jscomp$1_v$$ = $_ref1$$[$k$$], 97 <= $k$$.charCodeAt(0)) {
      for ($association_changes$$[$k$$] = [], $_j_property$$ = 0, $_len1_i$$ = $funcs$jscomp$1_v$$.length;$_j_property$$ < $_len1_i$$;$_j_property$$++) {
        if ($finalChanges_func$$ = $funcs$jscomp$1_v$$[$_j_property$$], $k$$.match(/\.\*$/)) {
          $association_changes$$[$k$$].push($finalChanges_func$$);
        } else {
          $val$$ = Silica.getPropByString($finalChanges_func$$[0], $k$$);
          $_ref2$$ = $old_values$$[$k$$];
          $_k$$ = 0;
          for ($_len2$$ = $_ref2$$.length;$_k$$ < $_len2$$;$_k$$++) {
            $args$jscomp$1_changed$$ = $_ref2$$[$_k$$], $args$jscomp$1_changed$$[0] === $finalChanges_func$$[0] && ($oldVal$$ = $args$jscomp$1_changed$$[1]);
          }
          $args$jscomp$1_changed$$ = $val$$ !== $oldVal$$;
          Array.isArray($val$$) && Array.isArray($oldVal$$) && (($args$jscomp$1_changed$$ = $oldVal$$ && $val$$ ? $oldVal$$.length !== $val$$.length : !0) || ($args$jscomp$1_changed$$ = $oldVal$$.some(function($e$$, $idx$$) {
            return $val$$[$idx$$] !== $e$$;
          })));
          $args$jscomp$1_changed$$ && $association_changes$$[$k$$].push($finalChanges_func$$);
        }
      }
    } else {
      $val$$ = Silica.getPropByString(window, $k$$), $oldVal$$ = $old_values$$[$k$$], $args$jscomp$1_changed$$ = $val$$ !== $oldVal$$, Array.isArray($val$$) && Array.isArray($oldVal$$) && (($args$jscomp$1_changed$$ = $oldVal$$ && $val$$ ? $oldVal$$.length !== $val$$.length : !0) || ($args$jscomp$1_changed$$ = $oldVal$$.some(function($e$$, $idx$$) {
        return $val$$[$idx$$] !== $e$$;
      }))), $association_changes$$[$k$$] = $args$jscomp$1_changed$$;
    }
  }
  $finalChanges_func$$ = {};
  for ($k$$ in $association_changes$$) {
    if ($funcs$jscomp$1_v$$ = $association_changes$$[$k$$], Array.isArray($funcs$jscomp$1_v$$) && $funcs$jscomp$1_v$$.length || !0 === $funcs$jscomp$1_v$$) {
      $finalChanges_func$$[$k$$] = $funcs$jscomp$1_v$$;
    }
  }
  Silica.flush($element$$, !1, $finalChanges_func$$);
  for ($element$$ = Silica._defers.length - 1;0 <= $element$$;$element$$--) {
    Silica._defers[$element$$].call();
  }
  Silica._defers = [];
  return Silica;
}, getPropByString:function $window$Silica$getPropByString$($obj$$, $context$$, $params$$) {
  if (!$context$$) {
    return $obj$$;
  }
  for (var $comps$$ = $context$$.split(".");null == $obj$$[$comps$$[0]] || void 0 == $obj$$[$comps$$[0]];) {
    if ($obj$$.$ctrl) {
      $obj$$ = $obj$$.$ctrl;
    } else {
      return null;
    }
  }
  for (var $comps$$ = $context$$.split("."), $path_length$$ = $comps$$.length, $property$$, $i$$ = 0;$i$$ < $path_length$$;++$i$$) {
    if ($property$$ = $comps$$[$i$$], $context$$ = $obj$$, $obj$$ = $obj$$[$property$$], "function" === typeof $obj$$ && ($obj$$ = $obj$$.apply($context$$, $params$$)), null === $obj$$ || void 0 === $obj$$) {
      return null;
    }
  }
  return $obj$$;
}, getValue:function $window$Silica$getValue$($ctx$jscomp$5_raw$$, $propString$$, $context$$, $params$$) {
  $context$$ = void 0 === $context$$ ? null : $context$$;
  $params$$ = void 0 === $params$$ ? null : $params$$;
  $ctx$jscomp$5_raw$$ = $context$$ ? $context$$ : 90 >= $propString$$.charCodeAt(0) ? window : Silica.getContext($ctx$jscomp$5_raw$$);
  return Silica.getPropByString($ctx$jscomp$5_raw$$, $propString$$, $params$$);
}, isInDOM:function $window$Silica$isInDOM$($element$$) {
  for (;null != $element$$.parentElement && !$element$$._deleted;) {
    if ($element$$.parentElement == document.body) {
      return !0;
    }
    $element$$ = $element$$.parentElement;
  }
  return !1;
}, setPropByString:function $window$Silica$setPropByString$($ctx$jscomp$6_obj$$, $_i$jscomp$2_propString$$, $value$$) {
  var $key$$, $paths$$, $hook_prop$$, $_len$$;
  if (!$_i$jscomp$2_propString$$) {
    return $ctx$jscomp$6_obj$$;
  }
  $paths$$ = $_i$jscomp$2_propString$$.split(".");
  $key$$ = $paths$$[$paths$$.length - 1];
  $ctx$jscomp$6_obj$$ = 90 >= $_i$jscomp$2_propString$$.charCodeAt(0) ? window : !$ctx$jscomp$6_obj$$.hasOwnProperty($paths$$[0]) && $ctx$jscomp$6_obj$$.$ctrl ? $ctx$jscomp$6_obj$$.$ctrl : $ctx$jscomp$6_obj$$;
  $_i$jscomp$2_propString$$ = 0;
  for ($_len$$ = $paths$$.length;$_i$jscomp$2_propString$$ < $_len$$;$_i$jscomp$2_propString$$++) {
    $hook_prop$$ = $paths$$[$_i$jscomp$2_propString$$], $hook_prop$$ !== $key$$ && ($ctx$jscomp$6_obj$$ = "function" === typeof $ctx$jscomp$6_obj$$[$hook_prop$$] ? $ctx$jscomp$6_obj$$[$hook_prop$$].call($ctx$jscomp$6_obj$$) : $ctx$jscomp$6_obj$$[$hook_prop$$]);
  }
  $key$$ = $ctx$jscomp$6_obj$$[$hook_prop$$];
  $ctx$jscomp$6_obj$$[$hook_prop$$] = $value$$;
  ($hook_prop$$ = $ctx$jscomp$6_obj$$[$hook_prop$$ + "_changed"]) && $hook_prop$$.call($ctx$jscomp$6_obj$$, $key$$, $value$$);
}, evaluateExpression:function $window$Silica$evaluateExpression$($expr$$, $elm$$, $ctx$$) {
  $ctx$$ = void 0 === $ctx$$ ? {} : $ctx$$;
  var $filter$$, $value$$;
  if ($expr$$) {
    return $filter$$ = null, -1 !== $expr$$.indexOf("|") && ($expr$$ = $expr$$.split("|"), $filter$$ = $expr$$[1].trim(), $expr$$ = $expr$$[0].trim()), $ctx$$.$ctrl || ($ctx$$.$ctrl = Silica.getContext($elm$$)), 90 >= $expr$$.charCodeAt(0) && ($ctx$$ = window), $value$$ = Silica.getPropByString($ctx$$, $expr$$), $filter$$ && ($expr$$ = ($filter$$ = $filter$$.split(/:(.+)/)) ? $filter$$[0] : null, $elm$$ = $filter$$ && 1 < $filter$$.length ? eval($filter$$[1]) : null, $value$$ = ($filter$$ = $expr$$ ? 
    Silica.filters[$expr$$] : null) ? $filter$$($value$$, $elm$$, $ctx$$) : $value$$), $value$$;
  }
}, interpolate:function $window$Silica$interpolate$($element$$, $context$$, $flush$$) {
  $context$$ = void 0 === $context$$ ? null : $context$$;
  $flush$$ = void 0 === $flush$$ ? !0 : $flush$$;
  var $parentNode$jscomp$1_text$$, $expr$$, $comps$jscomp$2_filter$$, $evald_fmt_property$$;
  $element$$ = document.createNodeIterator($element$$, NodeFilter.SHOW_TEXT, function($node$$) {
    if (Silica.interpolationPattern.test($node$$.data)) {
      return NodeFilter.FILTER_ACCEPT;
    }
  }, !1);
  for (var $node$jscomp$0$$;$node$jscomp$0$$ = $element$$.nextNode();) {
    for ($parentNode$jscomp$1_text$$ = $node$jscomp$0$$.data;null !== ($expr$$ = $parentNode$jscomp$1_text$$.match(Silica.interpolationPattern));) {
      $expr$$ = $expr$$[1], $comps$jscomp$2_filter$$ = $expr$$.split("|"), $evald_fmt_property$$ = $comps$jscomp$2_filter$$[0].trim(), 1 === $comps$jscomp$2_filter$$.length ? $evald_fmt_property$$ = "<span data-model='" + $evald_fmt_property$$ + "'>{{val}}</span>" : ($comps$jscomp$2_filter$$ = $comps$jscomp$2_filter$$[1].trim(), $evald_fmt_property$$ = "<span data-model='" + $evald_fmt_property$$ + "' data-filter='" + $comps$jscomp$2_filter$$ + "'>{{val}}</span>"), $evald_fmt_property$$ = $evald_fmt_property$$.replace("{{val}}", 
      Silica.evaluateExpression($expr$$, $node$jscomp$0$$, $context$$)), $parentNode$jscomp$1_text$$ = $parentNode$jscomp$1_text$$.replace("{{" + $expr$$ + "}}", $evald_fmt_property$$);
    }
    $expr$$ = document.createElement("span");
    $expr$$.innerHTML = $parentNode$jscomp$1_text$$;
    for ($parentNode$jscomp$1_text$$ = $node$jscomp$0$$.parentNode;0 < $expr$$.childNodes.length;) {
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
    if ("BODY" === $raw$jscomp$5_v$$.nodeName) {
      return Silica.context;
    }
    if (9 !== $raw$jscomp$5_v$$.nodeType && 3 !== $raw$jscomp$5_v$$.nodeType && 8 !== $raw$jscomp$5_v$$.nodeType && $raw$jscomp$5_v$$.dataset && $raw$jscomp$5_v$$.dataset.controller) {
      $constructorName$jscomp$1_ctrl$$ = $raw$jscomp$5_v$$.dataset.controller;
      "undefined" !== typeof($_ref$jscomp$8_constructor$$ = $constructorName$jscomp$1_ctrl$$.match(/((?:\w|\.)+)(?:\((\w+)\))*/))[2] && ($needsModel_pairIdx$$ = !0, $model$jscomp$4_stored$jscomp$1_watchers$$ = Silica.getValue($raw$jscomp$5_v$$.parentNode, $_ref$jscomp$8_constructor$$[2]));
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
              for ($needsModel_pairIdx$$ = $model$jscomp$4_stored$jscomp$1_watchers$$.length - 1;0 <= $needsModel_pairIdx$$;--$needsModel_pairIdx$$) {
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
          $raw$jscomp$5_v$$ = $_ref$jscomp$8_constructor$$[$k$$], Silica._watch[$k$$] || (Silica._watch[$k$$] = []), Silica._watch[$k$$].push([$constructorName$jscomp$1_ctrl$$, $raw$jscomp$5_v$$]);
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
  if (null == /[a-zA-Z]+\:+/g.exec($path$$) && "#" !== $path$$ && "" !== $path$$) {
    return $evt$$.preventDefault(), Silica.goTo($path$$), !1;
  }
}, _capture_links:function $window$Silica$_capture_links$($element$jscomp$18_nodes$$) {
  $element$jscomp$18_nodes$$ = Silica.queryOfType($element$jscomp$18_nodes$$, "a", "[href]", "[data-href]");
  for (var $node$$, $i$$ = $element$jscomp$18_nodes$$.length - 1;0 <= $i$$;--$i$$) {
    $node$$ = $element$jscomp$18_nodes$$[$i$$], $node$$.hostname === location.hostname && "_blank" !== $node$$.target && ($node$$.removeEventListener("click", Silica._handle_href, !0), $node$$.addEventListener("click", Silica._handle_href, !0));
  }
}, _show:function $window$Silica$_show$($element$jscomp$19_isVisible$$, $expr$$, $negate$$) {
  var $ctx$$;
  if (0 === $expr$$.indexOf(Silica.contextName)) {
    $element$jscomp$19_isVisible$$ = Silica.getPropByString(Silica.context, $expr$$.substr(Silica.contextName.length + 1));
  } else {
    if (8 === $element$jscomp$19_isVisible$$.nodeType || "undefined" === typeof($ctx$$ = $element$jscomp$19_isVisible$$._rt_ctx)) {
      $ctx$$ = Silica.getContext($element$jscomp$19_isVisible$$);
    }
    $element$jscomp$19_isVisible$$ = Silica.getPropByString($ctx$$, $expr$$);
  }
  $negate$$ && ($element$jscomp$19_isVisible$$ = !$element$jscomp$19_isVisible$$);
  return $element$jscomp$19_isVisible$$;
}, _call:function $window$Silica$_call$($element$$, $evnt$$, $act$$) {
  if (Silica.isInDOM($element$$)) {
    $element$$.dataset.nopreventdefault || $evnt$$.preventDefault();
    $element$$.dataset.nostoppropagation || $evnt$$.stopPropagation();
    var $scope$$ = document, $trap_to$$, $trapped_scope$$;
    if (null != ($trap_to$$ = $element$$.dataset.trap)) {
      if ("true" === $trap_to$$.toLowerCase()) {
        $scope$$ = $element$$;
      } else {
        for ($trapped_scope$$ = $element$$;$trapped_scope$$ = $trapped_scope$$.parentElement;) {
          if ($trapped_scope$$.classList.contains($trap_to$$)) {
            $scope$$ = $trapped_scope$$;
            break;
          }
        }
      }
    }
    Silica.apply(function() {
      var $action_i$$, $ctx$$, $parameter$$, $actionName_idx$$, $models$$ = [];
      $ctx$$ = Silica.getContext($element$$);
      $action_i$$ = $element$$.dataset[$act$$];
      $actionName_idx$$ = $action_i$$.indexOf("(");
      if (0 < $actionName_idx$$) {
        if ($actionName_idx$$ = $action_i$$.substr(0, $actionName_idx$$), $models$$ = $action_i$$.substr($actionName_idx$$.length).match(/((?:\w|\.)+)(?:\(?(\w+)\))?/g)) {
          for ($action_i$$ = 0;$action_i$$ < $models$$.length;$action_i$$++) {
            $models$$[$action_i$$] = Silica.getPropByString($ctx$$, $models$$[$action_i$$]);
          }
        } else {
          $models$$ = [];
        }
      } else {
        $actionName_idx$$ = $action_i$$;
      }
      for (;!$ctx$$[$actionName_idx$$] && $ctx$$.$ctrl;) {
        $ctx$$ = $ctx$$.$ctrl;
      }
      $element$$.dataset.parameter && ($parameter$$ = $element$$.dataset.parameter);
      return "undefined" !== typeof $ctx$$[$actionName_idx$$] ? $ctx$$[$actionName_idx$$].apply($ctx$$, [].concat([$element$$], $jscomp.arrayFromIterable($models$$), [$parameter$$, $evnt$$])) : null != Silica.context[$actionName_idx$$] ? Silica.context[$actionName_idx$$].apply(Silica.ctx, [].concat([$element$$], $jscomp.arrayFromIterable($models$$), [$parameter$$, $evnt$$])) : console.error("Unknown action '" + $actionName_idx$$ + "' for " + $element$$.outerHTML + " in " + $ctx$$.constructor.name);
    }, $scope$$);
  }
}, _model_get_val:function $window$Silica$_model_get_val$($raw$jscomp$6_value$$) {
  var $filter$$, $filterKey$$, $filterOptions$$;
  if (($filterKey$$ = ($filter$$ = ($filter$$ = $raw$jscomp$6_value$$.attributes["data-filter"]) ? $filter$$.value.split(/:(.+)/) : null) ? $filter$$[0] : null) && !Silica.filters[$filterKey$$]) {
    throw Error("Unknown filter: '" + $filterKey$$ + "' for element: " + $raw$jscomp$6_value$$.outerHTML);
  }
  $filterOptions$$ = $filter$$ && 1 < $filter$$.length ? eval($filter$$[1]) : null;
  $filter$$ = $filterKey$$ ? Silica.filters[$filterKey$$] : null;
  $raw$jscomp$6_value$$ = Silica.getValue($raw$jscomp$6_value$$, $raw$jscomp$6_value$$.dataset.model);
  return $filter$$ && null != $raw$jscomp$6_value$$ ? $filter$$($raw$jscomp$6_value$$, $filterOptions$$) : $raw$jscomp$6_value$$;
}, findComments:function $window$Silica$findComments$($raw$$) {
  for (var $arr$$ = [], $i$$ = $raw$$.childNodes.length - 1;0 <= $i$$;--$i$$) {
    var $node$$ = $raw$$.childNodes[$i$$];
    8 === $node$$.nodeType ? $arr$$.push($node$$) : $arr$$.push.apply($arr$$, Silica.findComments($node$$));
  }
  return $arr$$;
}, isInRepeat:function $window$Silica$isInRepeat$($root$$, $node$$) {
  for (;$node$$.parentElement && $node$$.parentElement !== $root$$;) {
    if ($node$$.parentElement.hasAttribute("data-repeat")) {
      return !0;
    }
    $node$$ = $node$$.parentElement;
  }
  return !1;
}, isDescendent:function $window$Silica$isDescendent$($ancestor$$, $child$$) {
  for (;($child$$ = $child$$.parentNode) && $child$$ !== $ancestor$$;) {
  }
  return !!$child$$;
}, query:function $window$Silica$query$($raw$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex_filtered$$ = 1;$$jscomp$restIndex_filtered$$ < arguments.length;++$$jscomp$restIndex_filtered$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex_filtered$$ - 1] = arguments[$$jscomp$restIndex_filtered$$];
  }
  $raw$$ == document && ($raw$$ = document.firstElementChild);
  for (var $attribute$jscomp$1_nodes$$ = $raw$$.querySelectorAll($$jscomp$restParams$$.join(",")), $$jscomp$restIndex_filtered$$ = [], $i$21_i$$ = $attribute$jscomp$1_nodes$$.length - 1;0 <= $i$21_i$$;--$i$21_i$$) {
    var $node$$ = $attribute$jscomp$1_nodes$$.item($i$21_i$$);
    Silica.isInRepeat($raw$$, $node$$) || $$jscomp$restIndex_filtered$$.push($node$$);
  }
  for ($i$21_i$$ = $$jscomp$restParams$$.length - 1;0 <= $i$21_i$$;--$i$21_i$$) {
    if ($attribute$jscomp$1_nodes$$ = $$jscomp$restParams$$[$i$21_i$$], $raw$$.hasAttribute($attribute$jscomp$1_nodes$$.substring(1, $attribute$jscomp$1_nodes$$.length - 1))) {
      $$jscomp$restIndex_filtered$$.push($raw$$);
      break;
    }
  }
  return $$jscomp$restIndex_filtered$$;
}, queryWithComments:function $window$Silica$queryWithComments$($root$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$jscomp$1_filtered$$ = 1;$$jscomp$restIndex$jscomp$1_filtered$$ < arguments.length;++$$jscomp$restIndex$jscomp$1_filtered$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$jscomp$1_filtered$$ - 1] = arguments[$$jscomp$restIndex$jscomp$1_filtered$$];
  }
  for (var $$jscomp$restIndex$jscomp$1_filtered$$ = Silica.query.apply(Silica, [].concat([$root$$], $jscomp.arrayFromIterable($$jscomp$restParams$$))), $comments$$ = Silica.findComments($root$$), $temp$$ = document.createElement("div"), $i$$ = $comments$$.length - 1;0 <= $i$$;--$i$$) {
    var $node$$ = $comments$$[$i$$];
    if ("<" === $node$$.nodeValue.charAt(0)) {
      $temp$$.innerHTML = $node$$.nodeValue;
      for (var $j$$ = $$jscomp$restParams$$.length - 1, $attr$$ = $$jscomp$restParams$$[$j$$];0 <= $j$$;$attr$$ = $$jscomp$restParams$$[--$j$$]) {
        if ($temp$$.firstElementChild.hasAttribute($attr$$)) {
          $$jscomp$restIndex$jscomp$1_filtered$$.push($node$$);
          break;
        }
      }
    }
  }
  return $$jscomp$restIndex$jscomp$1_filtered$$;
}, querySorted:function $window$Silica$querySorted$($root$$, $attributes$$) {
  for (var $$jscomp$restParams$jscomp$2_filtered$$ = [], $$jscomp$restIndex$jscomp$2_i$$ = 1;$$jscomp$restIndex$jscomp$2_i$$ < arguments.length;++$$jscomp$restIndex$jscomp$2_i$$) {
    $$jscomp$restParams$jscomp$2_filtered$$[$$jscomp$restIndex$jscomp$2_i$$ - 1] = arguments[$$jscomp$restIndex$jscomp$2_i$$];
  }
  for (var $$jscomp$restParams$jscomp$2_filtered$$ = Silica.query.apply(Silica, [].concat([$root$$], $jscomp.arrayFromIterable($$jscomp$restParams$jscomp$2_filtered$$))), $$jscomp$restIndex$jscomp$2_i$$ = 0, $list_length$$ = $$jscomp$restParams$jscomp$2_filtered$$.length;$$jscomp$restIndex$jscomp$2_i$$ < $list_length$$;$$jscomp$restIndex$jscomp$2_i$$++) {
    for (var $node$$ = $$jscomp$restParams$jscomp$2_filtered$$[$$jscomp$restIndex$jscomp$2_i$$], $j$$ = $$jscomp$restIndex$jscomp$2_i$$ + 1;$j$$ < $list_length$$;$j$$++) {
      var $other$$ = $$jscomp$restParams$jscomp$2_filtered$$[$j$$];
      $other$$.contains($node$$) && ($$jscomp$restParams$jscomp$2_filtered$$[$$jscomp$restIndex$jscomp$2_i$$] = $other$$, $$jscomp$restParams$jscomp$2_filtered$$[$j$$] = $node$$);
    }
  }
  return $$jscomp$restParams$jscomp$2_filtered$$;
}, queryOfType:function $window$Silica$queryOfType$($raw$$, $type$$, $attributes$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$jscomp$3_filtered$$ = 2;$$jscomp$restIndex$jscomp$3_filtered$$ < arguments.length;++$$jscomp$restIndex$jscomp$3_filtered$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$jscomp$3_filtered$$ - 2] = arguments[$$jscomp$restIndex$jscomp$3_filtered$$];
  }
  $raw$$ == document && ($raw$$ = document.firstElementChild);
  var $attribute$jscomp$2_nodes$$ = $raw$$.getElementsByTagName($type$$), $$jscomp$restIndex$jscomp$3_filtered$$ = [];
  if (0 < $$jscomp$restParams$$.length) {
    for (var $i$25_i$$ = $attribute$jscomp$2_nodes$$.length - 1;0 <= $i$25_i$$;--$i$25_i$$) {
      for (var $node$$ = $attribute$jscomp$2_nodes$$.item($i$25_i$$), $j$$ = $$jscomp$restParams$$.length - 1;0 <= $j$$;--$j$$) {
        if ($node$$.hasAttribute($$jscomp$restParams$$[$j$$].replace(/\[|\]/g, ""))) {
          $$jscomp$restIndex$jscomp$3_filtered$$.push($node$$);
          break;
        }
      }
    }
    if ($raw$$.nodeName === $type$$.toUpperCase()) {
      for ($i$25_i$$ = $$jscomp$restParams$$.length - 1;0 <= $i$25_i$$;--$i$25_i$$) {
        if ($attribute$jscomp$2_nodes$$ = $$jscomp$restParams$$[$i$25_i$$], $raw$$.hasAttribute($attribute$jscomp$2_nodes$$.substring(1, $attribute$jscomp$2_nodes$$.length - 1))) {
          $$jscomp$restIndex$jscomp$3_filtered$$.push($raw$$);
          break;
        }
      }
    }
  } else {
    $$jscomp$restIndex$jscomp$3_filtered$$ = $attribute$jscomp$2_nodes$$, $raw$$.tagName === $type$$ && $$jscomp$restIndex$jscomp$3_filtered$$.push($raw$$);
  }
  return $$jscomp$restIndex$jscomp$3_filtered$$;
}, removeFromDOM:function $window$Silica$removeFromDOM$($e$$) {
  for (var $removeWatchers$$ = function $$removeWatchers$$$($nodes$$) {
    for (var $i$26$$ = $nodes$$.length - 1;0 <= $i$26$$;--$i$26$$) {
      var $node$$ = $nodes$$[$i$26$$];
      if ($node$$._rt_ctrl) {
        for (k in ctrl = $node$$._rt_ctrl, ctrl.constructor.watchers) {
          list = Silica._watch[k], Silica._watch[k] = null != list ? list.filter(function($obj$$) {
            return $obj$$[0] !== ctrl;
          }) : [];
        }
      }
    }
  }, $i$$ = $e$$.childNodes.length - 1;0 <= $i$$;--$i$$) {
    var $child$$ = $e$$.childNodes[$i$$];
    if ("function" == typeof $child$$.onremove) {
      $child$$.onremove();
    }
  }
  3 !== $e$$.nodeType && 8 !== $e$$.nodeType && ($i$$ = $e$$.querySelectorAll("[data-controller]"), $removeWatchers$$($i$$), $removeWatchers$$([$e$$]));
  $e$$._deleted = !0;
  $e$$.remove();
}, compilers:module$build_cache$src$compilers$compilers.default, watchers:module$build_cache$src$watchers$watchers.default};
window.Silica.Controllers = module$build_cache$src$controllers$controllers.default;
window.Silica.addDirective = Silica.addDirective;
window.Silica.addFilter = Silica.addFilter;
window.Silica.apply = Silica.apply;
window.Silica.compile = Silica.compile;
window.Silica.debounce = Silica.debounce;
window.Silica.defer = Silica.defer;
window.Silica.flush = Silica.flush;
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

}.call(window);