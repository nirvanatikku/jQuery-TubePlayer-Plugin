define(['jquery','backbone'], function(){
    
    var TubeplayerInfo = require("mTubeplayerInfo");
    
    return Backbone.View.extend({
        model: TubeplayerInfo,
        template: _.template($("#view-tubeplayer-info").html()),
        initialize: function(opts){
            _.bindAll(this, 'render');
            var that = this;
            this.model.on('change',function(evt){
                that.render();
            });
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
});