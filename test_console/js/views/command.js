define(['jquery','backbone'], function(){
    
    var Command = require("mCommand");
    
    return Backbone.View.extend({
        model: Command,
        tagName: "li",
        template: _.template("<div class='btn'>.tubeplayer(\"<%=command%>\")</div>"),
        initialize: function(opts){
            _.bindAll(this, 'render', 'invoke');
        },
        events: { 
            "click": "invoke"
        },
        invoke: function(evt){
            var fn = this.model.get("func");
            if( fn ) {
                fn(window.PLAYER.tubeplayer(this.model.get('command')));
            }
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
});