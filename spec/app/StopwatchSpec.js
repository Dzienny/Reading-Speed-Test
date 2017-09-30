import Stopwatch from "../../src/readtest/stopwatch.js";

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

describe("Player", function() {
  var Player = require('../../lib/jasmine_examples/Player');
  var Song = require('../../lib/jasmine_examples/Song');
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
