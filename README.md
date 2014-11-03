debug-browserify-require
========================

I ran into a funky issue where running the same browserify command via the API would return seemingly inconsistent results. I've been able to reproduce it here. I'm running node `v0.10.33` on Mac Yosemite with `browserify@6.2.0`.

To see it for yourself, clone this repo and `npm test`. This is what happens for me:

```
 λ npm test

> debug-browserify-require@1.0.0 test /Users/nick.heiner/opower/NickHeiner/debug-browserify-require
> node test.js

Kicking off browserify runs: (100%) [========================================================================================================================================================================================================================================================================================]
Finished browserify runs: (100%) [===========================================================================================================================================================================================================================================================================================]


==============================

The following code appeared 992 times

require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function zalgo() {
    console.log('================================ zalgo ================================================');
};

},{}]},{},[1]);


==============================




==============================

The following code appeared 8 times

require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/sample.js":[function(require,module,exports){
'use strict';

module.exports = function zalgo() {
    console.log('================================ zalgo ================================================');
};

},{}]},{},[]);


==============================
```

As you can see, running the same browserify code many times results in different output bundles. This is problematic, although it's not outside the realm of possiblity that I'm screwing something up here haha.
