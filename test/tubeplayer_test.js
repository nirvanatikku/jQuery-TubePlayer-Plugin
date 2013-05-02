(function($) {

	window.PlayerVolume = 0;

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
			
			if(!window.PlayerVolume){
				window.PlayerVolume = $player.tubeplayer('volume');
			}
			
			var data = $player.tubeplayer('data');
			equal(data.state, -1, 'is uninitialized upon creation');
			equal(data.videoURL, "http://www.youtube.com/watch?feature=player_embedded&v=" + data.videoID, 'url and videoID appropriately separated');
			
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
			equal($player.tubeplayer('data').state, -1, 'is uninitialized upon creation');
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
	
	/**
	 * C U E   V I D E O
	 * / / /   / / / / /
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
				equal(self.$player.tubeplayer('data').state, -1, 'play was triggered, currently unstarted');
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
				equal(self.$player.tubeplayer('data').state, -1, 'play was triggered, currently unstarted');
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
				equal(self.$player.tubeplayer('data').state, -1, 'play was triggered, currently unstarted');
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
	asyncTest("tubeplayer('seek') -> onSeek, onPlayerBuffering", function(){
		
		expect(4);

		$.tubeplayer.defaults.afterReady = function($player) {
			equal($player.tubeplayer('data').currentTime, 0, 'current time = 0');
			$player.tubeplayer("play");
		};
		
		var hasSeeked = false;

		ok(this.$player.tubeplayer({
			iframed:true, 
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
			},
			onPlayerBuffering: function(){
				ok(true);
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

		ok(this.$player.tubeplayer({
			initialVideo:'7iEDYB7pY7U',
			onPlayerPlaying: function(){
				this.tubeplayer('seek', this.tubeplayer('data').duration - 1);
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
	 */
	asyncTest("tubeplayer('quality') -> onQualityChange", function(){
		
		expect(4);

		$.tubeplayer.defaults.afterReady = function($player) {
			equal($player.tubeplayer('quality'), "small", 'default quality is small');
			$player.tubeplayer("play");
		};

		ok(this.$player.tubeplayer({
			iframed:true, 
			width:300,
			height:200,
			onPlayerPlaying: function(){
				// var availableQualityLevels = this.tubeplayer("data").availableQualityLevels; // 
				this.tubeplayer('quality', 'large');
				equal(this.tubeplayer('quality'), 'medium', 'high quality set');
				start();
			},
			onQualityChange: function(){
				ok(true);
			}
		}), 'created');

	});
	
	/**
	 * B A D  I N I T  S I Z E
	 * / / /  / / / /  / / / / 
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
		
		var i = 0;
		
		$.tubeplayer.defaults.afterReady = function(){
			equal(Object.keys($.tubeplayer.getPlayers()).length, ++i, i + " < # player(s) exist");
			if(i === 2) 
				start();
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
