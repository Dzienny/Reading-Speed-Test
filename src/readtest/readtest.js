import {htmlToElement, isElementInViewport, formatTime} from "./utils.js";
import {computeWpm, countWords} from "./textanalysis.js";
import Stopwatch from "./stopwatch.js";

var HEADER_ID = "readtest-44-header";
var FOOTER_ID = "readtest-44-footer";

/** Removes the text boundary view. */
function removeInjectedView() {
  var header = document.getElementById(HEADER_ID);
  if (header) {
    header.parentNode.removeChild(header);
  }
  var footer = document.getElementById(FOOTER_ID);
  if (footer) {
    footer.parentNode.removeChild(footer);
  }
}

function setTextContent(id, html) {
  document.getElementById(id).textContent = html;
}

function clearTextContent(id) {
  setTextContent(id, "");
}

/** Wraps the selected text with the boundary view. It also clears the selection. */
function injectView(extensionApi) {

  var STYLE_PREFIX_HEADER = "readtest-44-header-";
  var RESTART_BUTTON_ID = STYLE_PREFIX_HEADER + "restart";
  var HEADER_NOTIFICATION_ID = STYLE_PREFIX_HEADER + "notification";
  var HEADER_CLOSE_ID = STYLE_PREFIX_HEADER + "close";
  
  var STYLE_PREFIX_FOOTER = "readtest-44-footer-";  
  var FOOTER_DONE_BUTTON_ID = STYLE_PREFIX_FOOTER + "done";
  var FOOTER_WORDS_COUNT_ID = STYLE_PREFIX_FOOTER + "wc";
  var FOOTER_TIMESPAN_ID = STYLE_PREFIX_FOOTER + "time";
  var FOOTER_WMP_ID = STYLE_PREFIX_FOOTER + "wpm";
  var FOOTER_CLOSE_ID = STYLE_PREFIX_FOOTER + "close";

  var CLOSE_ICON_URL = "close_16.png";

  var closeImgAbsoluteUrl = extensionApi.getURL(CLOSE_ICON_URL);
  var lang = chrome.i18n.getMessage;
  var start = htmlToElement('<div id="' + HEADER_ID + '" onClick="return false;">' + 
    '<button id="' + RESTART_BUTTON_ID + '" type="button">' + lang("restart") + '</button>' + 
    '<span id="' + HEADER_NOTIFICATION_ID + '">' + lang("timeStarted") + '</span>' + 
    '<img id="' + HEADER_CLOSE_ID + '" alt="close" src="' + closeImgAbsoluteUrl + '"/>' + 
    '</div>');
  var selection = window.getSelection();
  var wordsCount = countWords(selection.toString());
  var range = selection.getRangeAt(0);
  range.insertNode(start);

  // Collapse the range to a point that is at the end of the current range.
  range.collapse();
  var end = htmlToElement('<div id="' + FOOTER_ID + '" onClick="return false;">' + 
    '<button id="' + FOOTER_DONE_BUTTON_ID + '" type="button">' + lang("done") + '</button>' + 
    '<span id="' + FOOTER_WORDS_COUNT_ID + '">' + lang("words") + wordsCount + '</span>' + 
    '<span id="' + FOOTER_TIMESPAN_ID + '"></span>' +
    '<span id="' + FOOTER_WMP_ID + '"></span>' +
    '<img id="' + FOOTER_CLOSE_ID + '" alt="close" src="' + closeImgAbsoluteUrl + '"/>' +
    '</div>');
  range.insertNode(end);

  // Clear selection.
  selection.removeAllRanges();

  // Scroll to the start, if needed.
  if (!isElementInViewport(start)) {
    start.scrollIntoView();
    window.scrollBy(0, -70);
  }

  var stopwatch = new Stopwatch();
  stopwatch.restart();
  var doneButton = document.getElementById(FOOTER_DONE_BUTTON_ID);
  doneButton.onclick = function() {
    stopwatch.stop();
    var delta = stopwatch.timespan; // Date.now() - startTime;
    setTextContent(FOOTER_TIMESPAN_ID, lang("time") + formatTime(delta));
    
    var wpm = computeWpm(wordsCount, delta);
    setTextContent(FOOTER_WMP_ID, lang("wordsPerMinute") + wpm);
    clearTextContent(HEADER_NOTIFICATION_ID);
  };

  var restartButton = document.getElementById(RESTART_BUTTON_ID);
  restartButton.onclick = function() {
    var note = document.getElementById(HEADER_NOTIFICATION_ID);
    note.style.animation = 'none';
    setTimeout(function() {
        note.style.animation = '';
        note.textContent = lang("timeStarted");
    }, 0);
    stopwatch.restart();
    clearTextContent(FOOTER_TIMESPAN_ID);
    clearTextContent(FOOTER_WMP_ID);
  };

  var closeButtonHeader = document.getElementById(HEADER_CLOSE_ID);
  closeButtonHeader.onclick = removeInjectedView;
  var closeButtonFooter = document.getElementById(FOOTER_CLOSE_ID);
  closeButtonFooter.onclick = removeInjectedView;
}

// Remove the previous view, if exists.
removeInjectedView();

if (typeof chrome !== "undefined" && chrome.extension) {
  injectView(chrome.extension);
}