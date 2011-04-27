var delayedGetScript = {
    fn: Popcorn.getScript,
    url: "",
    count: 0,
    execute: function() {
               this.fn(this.url);
             }
  };

Popcorn.getScript = function(scriptURL){
  delayedGetScript.url = scriptURL;
  delayedGetScript.count++;
}

