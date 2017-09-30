/**
 * Converts milliseconds to a time string of the format mm:ss,
 *   where mm is the minute, from 00 through 59 and ss is the second, from 00 through 59.
 * @param {number} ms - The time span in milliseconds.
 * @return {string} The formatted time span.
 */
export function formatTime(ms) {
  if (typeof ms !== "number") {
    throw new Error("Illegal argument: ms has to be a number.");
  }
  if (ms < 0) {
    throw new Error("Illegal argument: ms has to be greater or equal to 0.");
  }
  var seconds = ms / 1000;
  var minutes = seconds / 60 | 0;
  var seconds = seconds - (minutes  * 60) | 0;
  var secondsStr = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + secondsStr;
}

/** 
 * Converts an html string into an html element.
 * @param {string} html - The html string.
 * @return {HTMLElement} The html element.
 */
export function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Returns true, if an element is in the viewport.
 * @param {Object} el - The element to check.
 * @return {boolean}
 */
export function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}