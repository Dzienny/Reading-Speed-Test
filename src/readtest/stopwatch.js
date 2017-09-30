/**
 * Represents a stopwatch.
 * @constructor
 */
export default function Stopwatch() {
  this.startTime = null;
  this.stopTime = null;

  /** The measured time span in milliseconds. */
  this.timespan = null;

  /** Starts or restarts the stopwatch. */
  this.restart = function() {
    this.startTime = Date.now();
    this.stopTime = null;
    this.timespan = null;
  }

  /** Stops the stopwatch. */
  this.stop = function() {
    if (this.startTime === null || this.stopTime !== null) {
      return null;
    }
    this.stopTime = Date.now();
    this.timespan = this.stopTime - this.startTime;
    this.startTime = null;
    return this.timespan;
  }
}