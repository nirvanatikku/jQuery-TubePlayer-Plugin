require(['jquery','tubeplayer','mCommand','mTubeplayerInfo','vCommand','vTubeplayerInfo','moment'],
 function(jQuery,undefined,Command,TubeplayerInfo,CommandView,TubeplayerInfoView){
    
    //
    // TUBEPLAYER OVERRIDES
    //
    var playerInfo, playerInfoView;
    var updateDataInterval;
    
    var _pkg = $.tubeplayer.TubePlayer.getPkg;
    
    $.tubeplayer.TubePlayer.getPkg = function(evt){
        var ret = _pkg(evt);
        if(!playerInfo) playerInfo = new TubeplayerInfo(ret.opts);
        else playerInfo.set(ret.opts);
        if(!playerInfoView) {
            playerInfoView = new TubeplayerInfoView({model:playerInfo});
            $("#js-tubeplayer-info").html(playerInfoView.render().el);
        }
        return ret;
    };
    
    $.tubeplayer.defaults.afterReady = function($player){
                console.log($player);
        printCallback("player init'd - afterReady triggered","info");
        $player.tubeplayer('mute');
    };
    
    //
    // CONSOLE RELATED
    //
    
    function printLI(type,text){
        return "<li><span class='label label-" +type +"'>"
                +text +"</span> <div class='pull-right'>"
                +moment().format('h:mm:ss a')+"</div></li>";
    }
    
    function printCallback(cb,type){
         $("#js-tubeplayer-callbacks").prepend($(printLI(type||"success",cb))[0]);
    }
    
    function printPlayerUpdate(status, type){
        $("#js-youtube-player-activity").prepend($(printLI(type||"info",status))[0]);
    }
    
    function textVal(input){
        return $("[name='"+input+"']").val();
    }
    
    function booleanVal(input){
        return $("[name='"+input+"']").is(":checked");
    }
    
    function selectVal(input){
        var $select = $("[name='"+input+"']");
        var $selected = $select.find("option:selected");
        return $selected.text();
    }
    
    window.createTubeplayer = function(){
        window.PLAYER = $("#youtube-video-player").tubeplayer({
            width: 350, // the width of the player
        	height: 275, // the height of the player
        	iframed: booleanVal("js-iframed"),
        	allowFullScreen: booleanVal("js-allow-full-screen"), // true by default, allow user to go full screen
        	initialVideo: textVal("js-initial-video-id"), // the video that is loaded into the player
        	preferredQuality: selectVal("js-pref-qual"),// preferred quality: default, small, medium, large, hd720
        	showControls: booleanVal("js-show-controls"),
    		showRelated: booleanVal("js-show-related"),
    		annotations: booleanVal("js-annotations"),
    		autoPlay: booleanVal("js-auto-play"),
    		autoHide: booleanVal("js-auto-hide"),
    		theme: selectVal("js-theme"), // 'dark' or 'light'
    		color: selectVal("js-color"), // 'red' or 'white'
    		showinfo: booleanVal("js-show-info"),
    		modestbranding: booleanVal("js-modest-branding"),
    		protocol: selectVal("js-protocol"),
    		loadSWFObject: booleanVal("js-load-swfobject"),
        	onPlay: function(id){
    	        printCallback("play");
        	},
        	onPause: function(){
        	    printCallback("pause");
        	},
        	onStop: function(){
        	    printCallback("stop");
        	}, 
        	onSeek: function(time){
        	    printCallback("seek");
        	}, 
        	onMute: function(){
        	    printCallback("mute");
        	}, 
        	onUnMute: function(){
        	    printCallback("unmute");
        	},
        	onPlayerUnstarted: function(){
        	    printPlayerUpdate("unstarted");
        	},
    		onPlayerEnded: function(){
        	    printPlayerUpdate("ended");
            },
    		onPlayerPlaying: function(){
        	    printPlayerUpdate("playing");
            },
    		onPlayerPaused: function(){
        	    printPlayerUpdate("paused");
            },
    		onPlayerBuffering: function(){
        	    printPlayerUpdate("buffering");
            },
    		onPlayerCued: function(){
        	    printPlayerUpdate("cued");
            },
    		onQualityChange: function(qual){
        	    printPlayerUpdate("quality changed to: " + qual);
            },
    		onErrorNotFound: function(){
        	    printPlayerUpdate("not found", "important");
            },
    		onErrorNotEmbeddable: function(){
        	    printPlayerUpdate("not embeddable", "important");
            },
    		onErrorInvalidParameter: function(){
        	    printPlayerUpdate("invalid param", "important");
            }
        });
        consoleView();
        var tmpl = _.template( $("#view-tubeplayer-data").html() );
        var updateData = function(){
            $("#js-tubeplayer-data").html( tmpl(window.PLAYER.tubeplayer("data")) );
        };
        updateDataInterval = setInterval(updateData, 500);
    };
    
    // 
    // View Layers
    //
    function formView(){
         $('.js-tubeplayer-inits-form').show(); 
         $("h3,.ui-remote").hide(); 
         window.clearInterval(updateDataInterval);  
         $("#js-tubeplayer-callbacks,#js-youtube-player-activity,#js-tubeplayer-info,#js-tubeplayer-data").html(""); 
         playerInfoView = undefined;
    };
    
    function consoleView(){
        $('h3,.ui-remote').show();
        $('.js-tubeplayer-inits-form').hide();
    };
    
    //
    // CONTROLS
    //
    var $remoteContainer = $(".js-remote-container");
    
    var _commands = [
        { command: "cue", arguments:[] },
        { command: "play", arguments:[] },
        { command: "pause", arguments:[] },
        { command: "stop", arguments:[] },
        // { command: "seek", arguments:[] },
        { command: "mute", arguments:[] },
        { command: "unmute", arguments:[] },
        { command: "isMuted", arguments:[], func: function(is){ printCallback("isMuted ? " + is,"inverse"); } },
        { command: "volume", arguments:[], func: function(v){ printCallback("volume = " + v,"inverse"); } },
        // { command: "data", arguments:[] },
        { command: "player", arguments:[] },
        { command: "size", arguments:[] },
        { command: "quality", arguments:[], func: function(q){ printCallback("quality = " + q,"inverse"); } },
        { command: "videoId", arguments:[], func: function(vid){ printCallback("videoId = " + vid,"inverse"); } },
        { command: "destroy", arguments:[], func: function(){ printCallback("destroyed","important"); formView(); } }
    ];
    var tmpCmd;
    for(var cmd in _commands){
        tmpCmd = new Command(_commands[cmd]);
        tmpCmdView = new CommandView({ model: tmpCmd });
        $remoteContainer.append(tmpCmdView.render().el);
    }
    
    //
    // EXTRA
    //
    var $time = $("#js-current-time");
    setInterval(function(){
        $time.text(moment().format("hh:mm:ss a"));
    },1000);
    
    
});

