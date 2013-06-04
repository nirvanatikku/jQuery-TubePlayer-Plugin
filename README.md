# jQuery TubePlayer Plugin

A jQuery wrapper around the YouTube Player API.

The TubePlayer plugin allows developers to focus on functionality as opposed to infrastructure around the YouTube player. The plugin exposes meaningful methods that are triggered based on state changes from the player API. The plugin also provides events that can be triggered on it allowing developers to create a customized player remote, programatically control videos, gain access for analytics purposes and much more. 

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/nirvanatikku/jQuery-TubePlayer-Plugin/master/dist/tubeplayer.min.js
[max]: https://raw.github.com/nirvanatikku/jQuery-TubePlayer-Plugin/master/dist/tubeplayer.js

In your web page:
	
	<script src="jquery.js"></script>
	<script src="jQuery.tubeplayer.min.js"></script>
	<div id='player'></div>
	<script>
	jQuery("#player").tubeplayer({
		width: 600, // the width of the player
		height: 450, // the height of the player
		allowFullScreen: "true", // true by default, allow user to go full screen
		initialVideo: "[some video id]", // the video that is loaded into the player
		preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
		onPlay: function(id){}, // after the play method is called
		onPause: function(){}, // after the pause method is called
		onStop: function(){}, // after the player is stopped
		onSeek: function(time){}, // after the video has been seeked to a defined point
		onMute: function(){}, // after the player is muted
		onUnMute: function(){} // after the player is unmuted
	});
	</script>

## Documentation

### TubePlayer Plugin Defaults

	var defaults = {
		
		// Plugin init params
		width: 425, 					// the width of the player
		height: 355, 					// the height of the player
		allowFullScreen: "true", 		// true by default, allow user to go full screen
		initialVideo: "DkoeNLuMbcI", 	// the video that is loaded into the player
		start: 0, 
		preferredQuality: "auto",	// preferred quality: auto, small, medium, large, hd720
		showControls: true, 				// whether the player should have the controls visible, 0 or 1
		showRelated: false, 				// show the related videos when the player ends, 0 or 1 
		playsinline: false,				// setting for ipad
		autoPlay: false, 				// whether the player should autoplay the video, 0 or 1
		autoHide: true, 
		theme: "dark", 					// possible options: "dark" or "light"
		color: "red", 					// possible options: "red" or "white"
		showinfo: false, 				// if you want the player to include details about the video
		modestbranding: true, 			// specify to include/exclude the YouTube watermark
		annotations: true, 				// show annotations?
		loop: 0, 						// whether or not the player will loop
		protocol: 'http', 
		
		// the location to the swfobject import for the flash player, default to Google's CDN
		wmode: "transparent", 			// note: transparent maintains z-index, but disables GPU acceleration
		swfobjectURL: "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
		loadSWFObject: true, 			// if you include swfobject, set to false

		// HTML5 specific attrs
		iframed: true, 					// iframed can be: true, false; iframed: HTML5 compliant player

		// Player Trigger Specific Functionality
		onPlay: function(id){}, 		// after the play method is called
		onPause: function(){}, 			// after the pause method is called
		onStop: function(){}, 			// after the player is stopped
		onSeek: function(time){}, 		// after the video has been seeked to a defined point
		onMute: function(){}, 			// after the player is muted
		onUnMute: function(){}, 		// after the player is unmuted
		
		// Player State Change Specific Functionality
		onPlayerUnstarted: function(){}, // when the player returns a state of unstarted
		onPlayerEnded: function(){}, 	// when the player returns a state of ended
		onPlayerPlaying: function(){}, //when the player returns a state of playing
		onPlayerPaused: function(){}, 	// when the player returns a state of paused
		onPlayerBuffering: function(){}, // when the player returns a state of buffering
		onPlayerCued: function(){}, 	// when the player returns a state of cued
		onQualityChange: function(quality){}, // a function callback for when the quality of a video is determined
		
		// Error State Specific Functionality
		onErrorNotFound: function(){}, // if a video cant be found
		onErrorNotEmbeddable: function(){}, // if a video isnt embeddable
		onErrorInvalidParameter: function(){} // if we've got an invalid param
		
	});


### Player API Events (tubeplayer options)

```
onPlay,
onPause,
onStop,
onSeek,
onMute,
onUnMute

onPlayerUnstarted,
onPlayerEnded,
onPlayerPlaying,
onPlayerPaused,
onPlayerBuffering,
onPlayerCued,
onQualityChange

onErrorNotFound,
onErrorNotEmbeddable,
onErrorInvalidParameter
```
	
### TubePlayer Methods

```
jQuery("#player").tubeplayer("cue", playerId);

jQuery("#player").tubeplayer("play");
jQuery("#player").tubeplayer("play", videoId);
jQuery("#player").tubeplayer("play", {id: videoId, time: 0});

jQuery("#player").tubeplayer("pause");

jQuery("#player").tubeplayer("stop");

jQuery("#player").tubeplayer("seek","0:32");
jQuery("#player").tubeplayer("seek",100); // or use seconds

jQuery("#player").tubeplayer("mute");
jQuery("#player").tubeplayer("unmute");
jQuery("#player").tubeplayer("isMuted");

jQuery("#player").tubeplayer("volume");
jQuery("#player").tubeplayer("volume",50);

jQuery("#player").tubeplayer("quality");
jQuery("#player").tubeplayer("quality", "hd720");

jQuery("#player").tubeplayer("playbackRate"); 
jQuery("#player").tubeplayer("playbackRate", 1.5); // video must support this

jQuery("#player").tubeplayer("data");
jQuery("#player").tubeplayer("opts");
jQuery("#player").tubeplayer("videoId");

jQuery("#player").tubeplayer("size",{width:400,height:300});

jQuery("#player").tubeplayer("destroy");

jQuery("#player").tubeplayer("player");
```

## Examples

### Unit Tests

The **test/** folder contains the unit test scripts. This is a good place to get an idea for what's going on. You can also get some insight into the things the plugin can do.

### TubePlayer Debug Console

The **test_console/** folder within this repository, contains a fully functional debug console for the tubeplayer project.  

The console enables the quick creation and destruction of a youtube player with UI controls to supplement the various specified inputs.  The console allows the user to invoke operations (i.e. onPlayerPlaying, onPlay), and prints each action being invoked on the TubePlayer plugin while going through them. Additionally, the console has the necessary links to follow up with anything.

In order to use the console, you will need to run a web server. A simple example would be to use python's SimpleHTTPServer. Here is an example of how to create host one on port 8082, from your command line navigate to the appropriate directory you want to serve up and then:

	python -m SimpleHTTPServer 8082
	
I have created a convenient bash script that will run the debug console from the root directory. Navigate to that directory and

	./server.sh
	
To access the debug console, navigate to	`http://localhost:8082/test_console/index.html`

To access the unit tests, navigate to 		`http://localhost:8082/test/tubeplayer.html`

## Release History

__v1.1.6 - May 2, 2013__

* Updates to object returned by 'data' method
	* Added 'videoLoadedFraction' - bytesLoaded, bytesTotal and startBytes are technically deprecated.
	* Added 'availablePlaybackRates' - array of available playback rates 
	* Changed 'getVideoEmbedCode' property -> 'videoEmbedCode'
* Added a new method for iframe player: 'playbackRate'. Getter returns number. Setter applies to current video only. Video must support altering playbackRate in order to work. Check availablePlaybackRates in 'data'.
* Added more unit tests including flag for testing functionality in HTML5 trial mode

__v1.1.5 - Apr 29, 2013__

* Added unit tests - 85 assertions
* Added grunt configuration
* Uses uglify via grunt for minification process now
* Refactored plugin code
* Exposed meaningful states: $.tubeplayer.TubePlayer.State, $.tubeplayer.TubePlayer.Error
* Renamed 'tubeplayer' folder to 'test_console'
* 'this' in onPlayer[X] and onError[X] methods, is the player with the tubeplayer interface
* Exposed an 'opts' function to retrieve the players options
* Added 'playsinline' option which can be used to play video inline on iPad

__v1.1.0 - Oct 1, 2012__

* Enabled ES5 'strict' mode
* Stricter equality checks / improve code
* Multiple player support - appropriate randomization by use of GUIDs
* Fix event handler binding on the player objects (both flash based and html5 enabled) - jQuery.tubeplayer.events
* Perform appropriate cleanup when destroying tubeplayer

__v1.0.4 - Nov 12, 2011__

* Bug fixes for parsing videoID
* Support added for 'loop' parameter and annotations (iv_load_policy)

__v1.0.3 - Aug 14th, 2011__

* Added theme and color support - dark/light with red/white
* Added 'start' attribute - default 0
* Added 'showinfo' attribute - default false
* Added 'modestbranding' attribute - default true
* Updated showControls, showRelated, autoPlay and autoHide to boolean from int

__v1.0.2 - Aug 3rd, 2011__

* Add support for 'autoHide' parameter
* 'loadSWFObject' attribute allows user to specify their swfobject inclusion

__v1.0.1 - May 14th, 2011__

* IE 7 and 8 fixes
* Simplify dependency by utilizing Google CDN for swfobject instead of requiring additional include
* Added videoEmbedURL and videoID to "data" object
* Added "videoId" convenience method
* New onErrorInvalidParameters method to handle final error case
* Added support for 'showControls' and 'showRelated' player attributes
* Enhanced multiple player support for iframe/html5 player
* New public method to get all players jQuery.tubeplayer.getPlayers()
* Fixed unmute - uses volume before muted now

Special thanks to @Branden Smith for the first few fixes

__v1.0.0 - Feb 13th, 2011__

* Note: This update is completely backwards compatible
* Support for HTML5 - IFRAME embedded player
* HTML5 by default now, if not supported will degrade to Flash player
* Added 'autoplay' and 'controls' properties for player init

__v0.9.4 - Sept 5th, 2010__

* New event: 'size'; Now you can modify the player's size
* Add player 'wmode' default as transparent, to prevent z-index issues in IE (thanks @Daniel Brouse)

__v0.9.3 - Aug 20, 2010__

* Fixed onError Handlers

__v0.9.2 - Aug 10, 2010__

* Added 'player' method, to get direct access to the youtube player

__v0.9.1 - July 30, 2010__

* Multiple player support
* Added 'onQualityChange' callback to defaults

__v0.9.0 - July 24, 2010__

* Embed the API driven Flash YouTube Video Player - init/destroy
* Control the player - cue, play, pause, stop, seek, volume control, quality control and data retrieval
* Give developer controls after each event is triggered
* Provide developer with state change friendly events (i.e. instead of state == -1, onPlayerUnstarted)
* Hooks for 'afterReady', 'stateChange', 'onError' and 'qualityChange' for the player
* Convenience methods for errors - onErrorNotFound, onErrorNotEmbeddable
* Browser support tested: Firefox 3.5+, Chrome 5, Opera 10, Safari 5, IE6+
