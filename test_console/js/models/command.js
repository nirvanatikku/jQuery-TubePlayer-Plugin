define(['jquery','backbone'], function(){
    
    return Backbone.Model.extend({
        defaults: { 
            command: "",
            arguments: [],
            func: function(){}
        }
    });
    
});