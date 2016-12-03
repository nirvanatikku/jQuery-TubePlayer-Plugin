# jQuery TubePlayer Plugin

A jQuery wrapper around the YouTube Player API.

The TubePlayer plugin allows developers to focus on functionality as opposed to infrastructure around the YouTube player. The plugin exposes meaningful methods that are triggered based on state changes from the player API. The plugin also provides events that can be triggered on it allowing developers to create a customized player remote, programmatically control videos, gain access for analytics purposes and much more. 

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/nirvanatikku/jQuery-TubePlayer-Plugin/master/jquery.tubeplayer.min.js
[max]: https://raw.github.com/nirvanatikku/jQuery-TubePlayer-Plugin/master/jquery.tubeplayer.js

In your web page:
	
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.tubeplayer.js"></script>
<div id='youtube-video-player'></div>
<script type="text/javascript">
jQuery(document).ready(function(){
	jQuery("#youtube-video-player").tubeplayer({
		initialVideo: "kOkQ4T5WO9E",
		onPlayerLoaded: function(){
			console.log(this.tubeplayer("data"));
		},
	});
});
</script>
```

## Documentation

### TubePlayer Plugin Defaults

```javascript
$.tubeplayer.defaults.settings = {
	
	// Plugin init params
	width: 480, 					      			// the width of the player
	height: 270, 					      			// the height of the player
	allowFullScreen: "true", 		      			// true by default, allow user to go full screen
	initialVideo: "DkoeNLuMbcI", 	      			// the video that is loaded into the player
	start: 0, 
	preferredQuality: "default",	      			// preferred quality: auto, small, medium, large, hd720
	controls: 1, 					      			// whether the player should have the controls visible, 0 or 1 or 2
	showRelated: false, 			      			// show the related videos when the player ends, 0 or 1 
	playsinline: false,				      			// setting for ipad
	autoPlay: false, 				      			// whether the player should autoplay the video, 0 or 1
	color: "red", 					      			// possible options: "red" or "white"
	showinfo: false, 				      			// if you want the player to include details about the video
	modestbranding: true, 			      			// specify to include/exclude the YouTube watermark
	annotations: true, 				      			// show annotations?
	loop: 0, 						      			// whether or not the player will loop
	protocol: 'http', 

	// Player Trigger Specific Functionality
	onPlay: function(id){}, 		      			// after the play method is called
	onPause: function(){}, 			      			// after the pause method is called
	onStop: function(){}, 			      			// after the player is stopped
	onSeek: function(time){}, 		      			// after the video has been seeked to a defined point
	onMute: function(){}, 			      			// after the player is muted
	onUnMute: function(){}, 		      			// after the player is unmuted
	
	// Player State Change Specific Functionality
	onPlayerUnstarted: function(){},      			// player returns a state of unstarted
	onPlayerEnded: function(){}, 	      			// player returns a state of ended
	onPlayerPlaying: function(){},        			// player returns a state of playing
	onPlayerPaused: function(){}, 	      			// player returns a state of paused
	onPlayerBuffering: function(){},      			// player returns a state of buffering
	onPlayerCued: function(){}, 	      			// player returns a state of cued
	onPlayerLoaded: function(){},                   // player is initially loaded and attached to the DOM
	onQualityChange: function(quality){}, 			// player quality changes
	onRateChange: function(rate){},       			// player rate changes
	
	// Error State Specific Functionality
	onErrorNotFound: function(){},        			// if a video cant be found
	onErrorNotEmbeddable: function(){},   			// if a video isnt embeddable
	onErrorInvalidParameter: function(){} 			// if we've got an invalid param and can't play
	
};
```

### Player API Events (tubeplayer options)

#### User invoked callbacks

```
onPlay
onPause
onStop
onSeek
onMute
onUnMute
```

#### Player invoked callbacks

```
onPlayerUnstarted
onPlayerEnded
onPlayerPlaying
onPlayerPaused
onPlayerBuffering
onPlayerCued
onPlayerLoaded
onQualityChange
onRateChange

onErrorNotFound
onErrorNotEmbeddable
onErrorInvalidParameter
```
	
### TubePlayer API Methods

#### Player

```javascript
jQuery("#player").tubeplayer("cue", playerId);

jQuery("#player").tubeplayer("play");
jQuery("#player").tubeplayer("play", videoId);
jQuery("#player").tubeplayer("play", {id: videoId, time: 0});

jQuery("#player").tubeplayer("pause");
jQuery("#player").tubeplayer("stop");

jQuery("#player").tubeplayer("seek", "0:32");
jQuery("#player").tubeplayer("seek", 100); // or use seconds

jQuery("#player").tubeplayer("size", {width:400,height:300});

jQuery("#player").tubeplayer("destroy");

jQuery("#player").tubeplayer("player");
```

#### Sound

```javascript
jQuery("#player").tubeplayer("mute");
jQuery("#player").tubeplayer("unmute");
jQuery("#player").tubeplayer("isMuted");

jQuery("#player").tubeplayer("volume");
jQuery("#player").tubeplayer("volume",50); // 0-100
```

#### Playback

```javascript
jQuery("#player").tubeplayer("quality");
jQuery("#player").tubeplayer("quality", "hd720"); // video must support this and be sized appropriately

jQuery("#player").tubeplayer("playbackRate"); 
jQuery("#player").tubeplayer("playbackRate", 1.5); // video must support this
```

#### Playlist

```javascript
jQuery("#player").tubeplayer("playPlaylist", [videoId1, videoId2]);
jQuery("#player").tubeplayer("playPlaylist", {playlist: [videoId1], index: 1});

jQuery("#player").tubeplayer("next");
jQuery("#player").tubeplayer("previous");
jQuery("#player").tubeplayer("playVideoAt", 1);
```

#### Data/Info

```javascript
jQuery("#player").tubeplayer("data");
jQuery("#player").tubeplayer("opts");
jQuery("#player").tubeplayer("videoId");
```

## Testing

### Unit Tests

The **test/** folder contains the unit test scripts. This is a good place to get an idea for what's going on. You can also get some insight into the things the plugin can do.

### TubePlayer Debug Console

The **test_console/** folder within this repository, contains a fully functional debug console for the tubeplayer project.  

The console enables the quick creation and destruction of a youtube player with UI controls to supplement the various specified inputs.  The console allows the user to invoke operations and observe the effects (e.g. onPlayerPlaying, onPlay), by printing each action being invoked on the TubePlayer plugin while going through them. Additionally, the console has the necessary links to follow up in API docs.

In order to use the console, you will need to run a web server. A simple example would be to use python's SimpleHTTPServer. Here is an example of how to create host one on port 8082, from your command line navigate to the appropriate directory you want to serve up and then:

```bash
python -m SimpleHTTPServer 8082
```

There is a bash script that will run the debug console from the root directory. Assuming $CWD is the root directory:

```bash
./scripts/server.sh
```

To access..

- the debug console, navigate to `http://localhost:8082/test_console/index.html`
- the unit tests, navigate to `http://localhost:8082/test/tubeplayer.html`

## Changelog

A detailed overview of the release notes can be found in the [CHANGELOG](https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin/blob/master/CHANGELOG.md).

## License

Copyright (c) Nirvana Tikku Licensed under the MIT license.
