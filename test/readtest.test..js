"use strict"

describe("countWords(str)", function() {

  it("should correctly count words", function() {
    expect(countWords("")).toEqual(0);
    expect(countWords("     ")).toEqual(0);
    expect(countWords(".,:;?!\"'-+=/<{[()]}>`@#$%^&*|\\~")).toEqual(0);
    expect(countWords("Zażółć gęsią jaźń.")).toEqual(3);    
  });
});

describe("Stopwatch", function() {
  var sw;

  beforeEach(function() {
    sw = new Stopwatch();
  });

  it("should return null if `stop` is called before first `restart`", function() {        
    expect(sw.stop()).toBeNull();
    expect(sw.timespan).toBeNull();
  });

  it("should return 0 or a positive number when `stop` is called after first `restart`", function() {
    sw.restart();
    expect(sw.stop()).toBeGreaterThanOrEqual(0);
    expect(sw.timespan).toBeGreaterThanOrEqual(0);
  });

  it("should return null the second and subsequent times the `stop` is called in a row", function() {
    sw.restart();
    sw.stop();
    expect(sw.stop()).toBeNull();
    expect(sw.timespan).toBeGreaterThanOrEqual(0);
    expect(sw.stop()).toBeNull();
    expect(sw.timespan).toBeGreaterThanOrEqual(0);
  });

  it("should return 60_000 on `stop` after 60 seconds of running", function() {
    jasmine.clock().install();    
    jasmine.clock().mockDate(new Date());
    sw.restart();    
    jasmine.clock().tick(60000);
    expect(sw.stop()).toEqual(60000);
    expect(sw.timespan).toEqual(60000);
    jasmine.clock().uninstall();
  });
});