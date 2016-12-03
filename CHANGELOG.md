# Changelog

__v2.1.0 - Dec 2, 2016__

* Exposed default settings `$.tubeplayer.defaults.settings`
* New player event: "onPlayerLoaded", _complementing_ $.tubeplayer.defaults.afterReady

__v2.0.0 - Dec 2, 2016__

* Removed code to handle flash player (due to deprecation); instead - uses iframe player exclusively
* Added playlist support for "playPlaylist", "cuePlaylist", "next", "previous", "playVideoAt"
* Added support for rate change events "onRateChange"
* Improved support for multiple tubeplayer instances
* Support providing a list of Video IDs in the `playlist` property
* Property `showControls` is no longer a boolean - the property is `controls` now: 0=none, 1=immediate, 2=lazy
* Property `autoHide` has been deprecated and is no longer used
* Property `theme` has been deprecated; players always use the dark theme
* Improved security by adding `origin` (window.location.origin)
* Revamped the test console + Updated tests to ensure successful execution 

__v1.1.7 - Sept 24, 2013__

* Use object syntax instead of argument syntax for *loadVideoById* method call

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
