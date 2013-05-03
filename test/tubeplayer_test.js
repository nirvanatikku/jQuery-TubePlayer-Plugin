(function($) {
	
	//
	// Toggle this flag if testing functions that are in HTML5 trial mode. --> http://www.youtube.com/html5
	//
	var HTML5TrialMode = false; 

	//
	// Note: Be sure to read any special notes on tests. 
	// If supported by the HTML5 trial, be sure to sign up at http://www.youtube.com/html5
	//

	var PlayerVolume = 0;

	/**
	 * T E S T
	 * / / / /
	 * I N F R A S T R U C T U R E
	 * / / / / / / / / / / / / / /
	 */
	module('Basic', {
		setup: function() {
			this.$player = $('.youtube-player');
		},
		teardown: function(){
			this.$player.tubeplayer('destroy');
		}
	});

	test('General Checkup', function() {

		expect(5);

		ok($.fn.tubeplayer, 'exists in jQuery namespace');
		ok($.tubeplayer.defaults, 'plugin defaults exists');
		ok($.tubeplayer.TubePlayer, "the tubeplayer object");
		equal(Object.keys($.tubeplayer.TubePlayer.ytplayers).length, 0, "no players yet");
		ok(this.$player, 'player node exists');

	});

	asyncTest('Creation and Ensure data and state is intact', function() {

		expect(19);

		$.tubeplayer.defaults.afterReady = function($player) {
			
			if(!PlayerVolume){
				PlayerVolume = $player.tubeplayer('volume');
			}
			
			var data = $player.tubeplayer('data');
			equal(data.state === $.tubeplayer.TubePlayer.State.UNSTARTED || data.state === $.tubeplayer.TubePlayer.State.CUED, true, 'is uninitialized/cued upon creation');
			equal(data.videoURL.indexOf(data.videoID) > -1, true, 'videoID exists in videoURL');
			
			var opts = $player.tubeplayer('opts');
			equal(opts.annotations, true, "annotations");
			equal(opts.autoHide, true, "autoHide");
			equal(opts.autoPlay, false, "autoPlay");
			equal(opts.color, "red", "color");
			equal(opts.height, "400px", "height");
			equal(opts.iframed, true, "iframed");
			equal(opts.loadSWFObject, false, "loadSWFObject");
			equal(opts.loop, false, "loop");
			equal(opts.modestbranding, true, "modestbranding");
			equal(opts.preferredQuality, "default", "preferredQuality");
			equal(opts.protocol, "http", "protocol");
			equal(opts.showControls, true, "showControls");
			equal(opts.showRelated, false, "showRelated");
			equal(opts.showinfo, false, "showinfo");
			equal(opts.theme, "dark", "theme");
			equal(opts.start, 0, "start");
			
			$player.tubeplayer('destroy');
			start();
			
		};

		ok(this.$player.tubeplayer({
			iframed: true,
			width: '300px',
			height: '400px'
		}), 'recreated w/ (300,400)');

	});
	
	asyncTest('Player creation and control', function() {

		expect(5);

		$.tubeplayer.defaults.afterReady = function($player) {
			var data = $player.tubeplayer('data');
			// note: html5 trial shows CUED initially, otherwise UNSTARTED
			equal(data.state === $.tubeplayer.TubePlayer.State.UNSTARTED || data.state === $.tubeplayer.TubePlayer.State.CUED, true, 'is uninitialized upon creation');
			equal($player.tubeplayer('volume'), PlayerVolume, 'volume is at default when starting');
			equal($player.tubeplayer('isMuted'), false, 'player should not be muted');
			start();
		};

		strictEqual(this.$player.tubeplayer()[0], this.$player[0], 'same node at the end of the initialization');
		ok(this.$player.tubeplayer('destroy'), 'destroyed the player');

	});
	
	/**
	 * T E S T
	 * / / / /
	 * E V E N T S     &
	 * / / / / / /     /
	 * C A L L B A C K S
	 * / / / / / / / / /
	 */
	module('Events', {
		setup: function() {
			$(".youtube-player").remove();
			this.$player = $('<div class="youtube-player"></div>');
			$("body").append(this.$player);
		},
		teardown: function() {
			$(".youtube-player").tubeplayer('destroy');
			this.$player.remove();
		}
	});
	
	if(!HTML5TrialMode){
		
		/**
		 * C U E   V I D E O
		 * / / /   / / / / /
		 * 
		 * Notes: If client is participating in HTML5 trial, onPlayerCued does not seem to get called.
		 */
		asyncTest('tubeplayer(\'cue\') -> onPlayerCued', function(){
			
			expect(3);

			$.tubeplayer.defaults.afterReady = function($player) {
				$player.tubeplayer('cue', '7iEDYB7pY7U');
			};

			ok(this.$player.tubeplayer({
				onPlayerCued: function() {
					equal(this.tubeplayer('data').videoID, '7iEDYB7pY7U', 'video id is the cueued id');
					equal(this.tubeplayer('data').state, 5, 'is currently cued');
					start();
				}
			}), 'created, now play');

		});
		
	}
	
	/**
	 * P L A Y
	 * / / / /
	 */
	asyncTest('tubeplayer(\'play\') -> onPlay, onPlayerPlaying', function() {

		expect(3);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('play');
		};

		var self = this;

		ok(this.$player.tubeplayer({
			onPlay: function() {
				var data = self.$player.tubeplayer('data');
				equal(data.state === $.tubeplayer.TubePlayer.State.UNSTARTED || data.state === $.tubeplayer.TubePlayer.State.CUED, true, 'play was triggered, currently unstarted');
			},
			onPlayerPlaying: function() {
				equal(this.tubeplayer('data').state, 1, 'is currently playing');
				start();
			}
		}), 'created, now play');

	});
	
	/**
	 * P L A Y  O P T I O N S
	 * / / / /  / / / / / / / 
	 */
	asyncTest("tubeplayer('play','VqPo5vueSSA') -> onPlayerPlaying", function(){
		
		expect(4);

		var originalVideoID = "2Jvju2ceNSE";
		var newVideoID = "VqPo5vueSSA";
		
		$.tubeplayer.defaults.afterReady = function($player) {
			equal($player.tubeplayer('data').videoID, originalVideoID, "ensure videoID is set to initial video");
			$player.tubeplayer('play',newVideoID);
			// equal($player.tubeplayer("data").)
		};

		ok(this.$player.tubeplayer({
			iframed:true, 
			initialVideo: originalVideoID,
			onPlayerPlaying: function(){
				ok(true);
				equal(this.tubeplayer("data").videoID, newVideoID, "ensure videoID is the new videoID");
				start();
			}
		}), 'created');

	});

	/**
	 * P A U S E
	 * / / / / /
	 */
	asyncTest('tubeplayer(\'pause\') -> onPause, onPlayerPaused', function() {

		expect(4);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('play');
		};

		var self = this;

		ok(this.$player.tubeplayer({
			onPlay: function() {
				var data = self.$player.tubeplayer('data');
				equal(data.state === $.tubeplayer.TubePlayer.State.UNSTARTED || data.state === $.tubeplayer.TubePlayer.State.CUED, true, 'play was triggered, currently unstarted');
			},
			onPlayerPlaying: function() {
				this.tubeplayer('pause');
			},
			onPause: function() {
				equal(self.$player.tubeplayer('data').state, 1, 'pause was triggered, currently playing');
			},
			onPlayerPaused: function() {
				equal(this.tubeplayer('data').state, 2, 'is currently paused');
				start();
			}
		}), 'created, now play then pause');

	});

	/**
	 * V O L U M E
	 * / / / / / /
	 */
	asyncTest('tubeplayer(\'mute\'), tubeplayer(\'unmute\') -> onStop', function() {

		expect(9);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('play');
		};

		var self = this;

		ok(this.$player.tubeplayer({
			onPlay: function() {
				var data = self.$player.tubeplayer('data');
				equal(data.state === $.tubeplayer.TubePlayer.State.UNSTARTED || data.state === $.tubeplayer.TubePlayer.State.CUED, true, 'play was triggered, currently unstarted');
			},
			onPlayerPlaying: function() {

				var vol = self.$player.tubeplayer('volume');

				equal(vol, PlayerVolume, "base volume is default");
				equal(self.$player.tubeplayer('isMuted'), false, "isn't muted yet");

				self.$player.tubeplayer('mute');

				setTimeout(function() {

					equal(self.$player.tubeplayer('isMuted'), true, "should be muted now");
					equal(self.$player.tubeplayer('volume'), 0, "volume should be 0");

					self.$player.tubeplayer('unmute');

					setTimeout(function() {

						equal(self.$player.tubeplayer('isMuted'), false, 'should be unmuted');
						equal(self.$player.tubeplayer('volume'), vol, 'volume back to what it was before');

						self.$player.tubeplayer('stop');

					}, 50);

				}, 50);

			},
			onStop: function() {
				equal(self.$player.tubeplayer('data').state, 1, 'stop was triggered while playing');
				start();
			}
		}), 'created, now play then pause');

	});
	
	/**
	 * S E E K
	 * / / / / 
	 */
	asyncTest("tubeplayer('seek') -> onSeek", function(){
		
		expect(4);

		$.tubeplayer.defaults.afterReady = function($player) {
			equal($player.tubeplayer('data').currentTime, 0, 'current time = 0');
			$player.tubeplayer("play");
		};
		
		var hasSeeked = false;

		ok(this.$player.tubeplayer({
			width:500,
			height:300,
			onSeek:function(){
				ok(true);
			},
			onPlayerPlaying: function(){
				if(!hasSeeked){
					hasSeeked = true;
					this.tubeplayer('seek',100);
				} else {
					equal(Math.abs(this.tubeplayer('data').currentTime - 100) < 1, true, "seeked to ~100s in");
					start();
				}
			}
		}), 'created');

	});
	
	/**
	 * P L A Y E R  E N D E D
	 * / / / / / /  / / / / / 
	 */
	asyncTest('tubeplayer(\'seek\',[end]) -> onPlayerEnded', function(){
		
		expect(2);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('play');
		};

		var hasSeeked = false;
		
		ok(this.$player.tubeplayer({
			initialVideo:'7iEDYB7pY7U',
			onPlayerPlaying: function(){
				if(hasSeeked) return;
				hasSeeked = true;
				this.tubeplayer('seek', this.tubeplayer('data').duration - 2);
			},
			onPlayerEnded: function() {
				equal(this.tubeplayer('data').state, 0, 'is currently ended');
				start();
			}
		}), 'created, now play and skip to end of video');

	});
	
	/**
	 * S I Z E
	 * / / / /
	 */
	asyncTest("tubeplayer('size',{width:400,height:300})", function(){
		
		expect(3);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('size',{ width: 400, height: 300 });
			equal($player.find("iframe").css('width'), "400px", 'same width as just assigned');
			equal($player.find("iframe").css('height'), "300px", 'same height as just assigned');
			start();
		};

		ok(this.$player.tubeplayer({iframed:true, width:800,height:600}), 'created');

	});
	
	/**
	 * Q U A L I T Y
	 * / / / / / / / 
	 * 
	 * Notes: Seems as though if the user is participating in the HTML5 trial, 'quality' returns null.
	 */
	asyncTest("tubeplayer('quality') -> onQualityChange", function(){
		
		expect(HTML5TrialMode ? 2 : 3); // onQualityChange isnt triggered in case of HTML5 trial.
		
		var qualitySet = "medium";

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer("play");
		};
		
		ok(this.$player.tubeplayer({
			iframed:true, 
			width:300,
			height:200,
			preferredQuality: qualitySet,
			onPlayerPlaying: function(){
				equal(this.tubeplayer('quality'), qualitySet, 'default quality is set');
				qualitySet = "large";
				this.tubeplayer('quality', qualitySet);
				start();
			},
			onQualityChange: function(){
				equal(this.tubeplayer('quality'), qualitySet, 'validate that the quality was set appropriately');
			}
		}), 'created');

	});
	
	if(HTML5TrialMode){
		/**
		 * P L A Y B A C K   R A T E
		 * / / / / / / / /   / / / / 
		 * 
		 * Note: requires that the user is participating in HTML trial.
		 */
		asyncTest("tubeplayer('playbackRate'), tubeplayer('data').availablePlaybackRates",function(){
		
			expect(5);
		
			$.tubeplayer.defaults.afterReady = function($player){
				equal($player.tubeplayer('videoId'), "JtbDDqU3dVI", "variable playback rate video set properly");
				$player.tubeplayer('play');  // video has to enable variable playback rate
			};
		
			ok(this.$player.tubeplayer({
				width: 300,
				height: 200,
				initialVideo: "JtbDDqU3dVI",
				onPlayerPlaying: function(){
				
					deepEqual(this.tubeplayer('data').availablePlaybackRates, [ 0.25, 0.5, 1, 1.5, 2 ], "available playback rates are consistent");
				
					var currentRate = this.tubeplayer('playbackRate');
					equal(currentRate, 1, "player should be at 1x normally");
				
					this.tubeplayer('playbackRate', 2);
				
					var me = this;
					setTimeout(function(){
						equal(me.tubeplayer('playbackRate'), 2, "rate was updated to 2x appropriately");
						start();
					},50);
				
				}
			}), 'created');
		
		});
	}
	
	/**
	 * D A T A   I N T A C T
	 * / / / /   / / / / / /
	 */
	asyncTest("tubeplayer('data') -> returns defined keys", function(){
		
		var expectedKeys = [
			"availablePlaybackRates",
			"videoLoadedFraction",
			"bytesLoaded",
			"bytesTotal",
			"startBytes",
			"state",
			"currentTime",
			"duration",
			"videoURL",
			"videoEmbedCode",
			"videoID",
			"availableQualityLevels",
			"availablePlaybackRates"
		];
		
		expect(expectedKeys.length);
		
		$.tubeplayer.defaults.afterReady = function($player){
			var data = $player.tubeplayer('data');
			for(var key in data){
				equal(expectedKeys.indexOf(key) > -1, true, key + " exists");
			}
			start();
		};
		
		ok(this.$player.tubeplayer(),"created");
		
	});
	
	if(!HTML5TrialMode){
		
		/**
		 * B A D  I N I T  S I Z E
		 * / / /  / / / /  / / / / 
		 * 
		 * Note: If user is participating in HTML5 trial, this error does not get thrown.
		 */
		asyncTest("bad init w/ {100,100} (onErrorNotEmbeddable)", function(){
		
			expect(2);

			$.tubeplayer.defaults.afterReady = function($player) {
				$player.tubeplayer('play');
			};

			ok(this.$player.tubeplayer({
				iframed:true, 
				autoplay: true,
				width:100,
				height:100,
				onErrorNotEmbeddable: function(){
					ok(true);
					start();
				}
			}), 'created');

		});
		
	}
	
	/**
	 * B A D  I N I T  V I D E O I D
	 * / / /  / / / /  / / / / / / / 
	 */
	asyncTest("bad init w/ no videoID (onErrorInvalidParameter)", function(){
		
		expect(2);

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('play', 'bogus id');
		};

		ok(this.$player.tubeplayer({
			iframed:true, 
			autoplay: true,
			width:200,
			height:200,
			onErrorInvalidParameter: function(){
				ok(true, "error invalid param has been triggered");
				start();
			}
		}), 'created');

	});
	
	/**
	 * G E T   P L A Y E R S 
	 * / / /   / / / / / / / 
	 */
	asyncTest("create one, $.tubeplayer.getPlayers() === 1", function(){
		
		var players = $.tubeplayer.getPlayers();
		equal(Object.keys(players).length, 0, "no players yet");
		
		$.tubeplayer.defaults.afterReady = function(){
			equal(Object.keys($.tubeplayer.getPlayers()).length,1,"one player exists");
			start();
		};
		
		ok(this.$player.tubeplayer(), "created");
		
	});
	
	/**
	 * M U L T I P L E 
	 * / / / / / / / / 
	 * P L A Y E R S
	 * / / / / / / /
	 */
	module('Multiple', {
		setup: function() {
			$(".youtube-player").remove();
			this.$players = $('<div class="youtube-player"></div><div class="youtube-player"></div><div class="youtube-player"></div>');
			$("body").append(this.$players);
		},
		teardown: function() {
			this.$players.each(function(){
				$(this).tubeplayer('destroy');
			});
			this.$players.remove();
		}
	});
	
	/**
	 * C R E A T E
	 * / / / / / / 
	 */
	asyncTest("create three, $.tubeplayer.getPlayers() === 3", function(){
		
		expect(5);
		
		var players = $.tubeplayer.getPlayers();
		equal(Object.keys(players).length, 0, "no players yet");
		
		var i = 1;
		
		$.tubeplayer.defaults.afterReady = function(){
			equal(Object.keys($.tubeplayer.getPlayers()).length, i, i + " < # player(s) exist");
			if(i === 3) { // one-based
				start();
			} else {
				i++;
			}
		};
		
		ok(this.$players.tubeplayer(), "created");
		
	});
	
	/**
	 * P L A Y   3   V I D E O S
	 * / / / /   /   / / / / / / 
	 */
	asyncTest("create three players, tubeplayer('play') 3 unique IDs", function(){
		
		expect(8);
		
		var players = $.tubeplayer.getPlayers();
		equal(Object.keys(players).length, 0, "no players yet");
		
		var self = this;
		function continueTesting(){
			
			var $p1 = $(self.$players[0]);
			equal($p1.tubeplayer('data').state, $.tubeplayer.TubePlayer.State.PLAYING, 'is playing');
			$p1.tubeplayer('pause');
			
			var $p2 = $(self.$players[1]);
			equal($p2.tubeplayer('data').state, $.tubeplayer.TubePlayer.State.CUED, 'is cued');
			// $p2.tubeplayer('pause');
			// equal($p2.tubeplayer('data').state, $.tubeplayer.TubePlayer.State.PAUSED, 'is paused');
			
			var $p3 = $(self.$players[2]);
			equal($p3.tubeplayer('data').state, $.tubeplayer.TubePlayer.State.CUED, 'is cued');
			// $p3.tubeplayer('pause');
			// equal($p3.tubeplayer('data').state, $.tubeplayer.TubePlayer.State.PAUSED, 'is paused');
			
			start();
			
		}
		
		var i = 0, k = 0; // counters used during callback to denote diff. players	
		
		var videoids = ["2Jvju2ceNSE", "VqPo5vueSSA", "yv_iE1pV8gM", "6JM22R_sYs8"];
		
		$.tubeplayer.defaults.afterReady = function($player){
			if(i === 0 ){
				$player.tubeplayer("play", videoids[i]);			
			} else { 
				$player.tubeplayer("cue", videoids[i]);
			}
			if(i === 2) {
				equal(Object.keys($.tubeplayer.getPlayers()).length, 3, "3 players");
			}
			i++;
		};
		
		ok(this.$players.tubeplayer({
			onPlayerPlaying:function(){
				ok(true, "player started playing");
				continueTesting();
			},
			onPlayerPaused: function(){
				ok(true, "player was paused");
				if(k === 2){
					// start();
				}
				k++;
			}
		}), "created");
		
	});
	
	QUnit.start();
	
}(jQuery));
