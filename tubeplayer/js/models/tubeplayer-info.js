define(['jquery','backbone'], function(){
    
    return Backbone.Model.extend({
        defaults: {
            "width":600,
            "height":450,
            "allowFullScreen":"true",
            "initialVideo":"DkoeNLuMbcI",
            "start":0,
            "preferredQuality":"default",
            "showControls":true,
            "showRelated":false,
            "annotations":true,
            "autoPlay":false,
            "autoHide":true,
            "theme":"dark",
            "color":"red",
            "showinfo":false,
            "modestbranding":true,
            "protocol":"http",
            "wmode":"transparent",
            "swfobjectURL":"ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
            "loadSWFObject":true,
            "allowScriptAccess":"always",
            "playerID":"?",
            "iframed":true
        }
    });
    
});