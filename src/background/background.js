'use strict';

// Handle the start of the reading speed test.
var onMenuClick_startReadTest = function(info, tab) {
  chrome.tabs.insertCSS(tab.id, { file: "readtest.css" }, function() {
    chrome.tabs.executeScript(tab.id, {
      file: "readtest.js"
    }, function(selection) {
    });
  });
};

if (typeof window.NativeWindow !== "undefined") {
  let label = "Reading speed test";
  let selector =  window.NativeWindow.contextmenus.SelectorContext("*");
  menuID = window.NativeWindow.contextmenus.add(label, selector, onMenuClick_startReadTest);
  console.log("Android");
} else {
  // Add plugin to the right click context menu.
  chrome.contextMenus.create({
    title: "Reading speed test",
    contexts: ["selection"],  // ContextType
    onclick: onMenuClick_startReadTest // A callback function
  });
  console.log("Desktop");
}