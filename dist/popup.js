/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	function replace_i18n(obj, tag) {
	  var msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
	    return v1 ? chrome.i18n.getMessage(v1) : '';
	  });

	  if (msg != tag) {
	    obj.innerHTML = msg;
	  }
	}

	function localizeHtmlPage() {
	  // Localize using __MSG_***__ data tags
	  var data = document.querySelectorAll('[data-localize]');

	  for (var i in data) {
	    if (data.hasOwnProperty(i)) {
	      var obj = data[i];
	      var tag = obj.getAttribute('data-localize').toString();

	      replace_i18n(obj, tag);
	    }
	  }

	  // Localize everything else by replacing all __MSG_***__ tags
	  var page = document.getElementsByTagName('html');

	  for (var j = 0; j < page.length; j += 1) {
	    var obj = page[j];
	    var tag = obj.innerHTML.toString();

	    replace_i18n(obj, tag);
	  }
	}

	function initView() {
	  localizeHtmlPage();
	}

	document.addEventListener('DOMContentLoaded', function () {
	  initView();
	});

/***/ }
/******/ ]);