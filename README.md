jQuery YouTube TubePlayer Plugin
===

Latest version: v1.1.3 (_17th Jan 2013_)

http://www.tikku.com/jquery-youtube-tubeplayer-plugin

Author: Nirvana Tikku (ntikku@gmail.com, @ntikku)

Dual licensed under the MIT or GPL Version 2 licenses.

----

The TubePlayer plugin simplifies the process for developers to control and work with the YouTube player. The plugin exposes methods enabling control for three cases: upon triggering events, when the players state changes are triggered and when errors are fired from the player.

----

**Player API Events (tubeplayer options)**

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

**TubePlayer Methods**
	
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
    jQuery("#player").tubeplayer("data");
    jQuery("#player").tubeplayer("videoId");
    jQuery("#player").tubeplayer("size");
    jQuery("#player").tubeplayer("size",{width:400,height:300});
    jQuery("#player").tubeplayer("destroy");
    jQuery("#player").tubeplayer("player");

**Minification of Plugin**

	java -jar compiler.jar --js=jQuery.tubeplayer.js > jQuery.tubeplayer.min.js

**TubePlayer Debug Console**

The **/tubeplayer** folder within this repository, contains a fully functional debug console for the tubeplayer project.  

The console enables quick creation and destruction of a youtube player with various specified inputs.  The console also provides buttons that invoke getters along with insight into when particular events are called (i.e. onPlayerPlaying, onPlay), player data available and links to the various relevant resources for the plugin. 

To get a server up and running you can use python's SimpleHTTPServer. Here is an example to host on port 8000:

	python -m SimpleHTTPServer 8000 /via 2004
	
	
