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

	'use strict';

	// Handle the start of the reading speed test.

	var onMenuClick_startReadTest = function onMenuClick_startReadTest(info, tab) {
	  chrome.tabs.insertCSS(tab.id, { file: "readtest.css" }, function () {
	    chrome.tabs.executeScript(tab.id, {
	      file: "readtest.js"
	    }, function (selection) {});
	  });
	};

	if (typeof window.NativeWindow !== "undefined") {
	  var label = "Reading speed test";
	  var selector = window.NativeWindow.contextmenus.SelectorContext("*");
	  menuID = window.NativeWindow.contextmenus.add(label, selector, onMenuClick_startReadTest);
	  console.log("Android");
	} else {
	  // Add plugin to the right click context menu.
	  chrome.contextMenus.create({
	    title: "Reading speed test",
	    contexts: ["selection"], // ContextType
	    onclick: onMenuClick_startReadTest // A callback function
	  });
	  console.log("Desktop");
	}

/***/ }
/******/ ]);