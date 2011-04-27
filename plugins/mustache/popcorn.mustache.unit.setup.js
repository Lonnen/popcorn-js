var delayedGetScript = {
    fn: Popcorn.getScript,
    url: "",
    execute: function() {
               this.fn(this.url);
             }
  };

Popcorn.getScript = function(scriptURL){
  delayedGetScript.url = scriptURL;
}

