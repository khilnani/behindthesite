define('logger',['jquery'], function($) {
  "use strict";
  
    var Logger = {
    //--------------------------------------------------  
    // 0, 1, 2, 3, 4, 5, 6
      log_types: ["system", "error", "warn", "event", "info", "debug", "trace"],
      log_level: 4,

      setLogLevel: function (level) {
        if(level != undefined && level != null && level >= 0 &&  level < this.log_types.length) {
          this.log_level = Number(level);
          console.log("[SYSTEM]: " + (new Date()).toString() + ": logger.setLogLevel() " + this.log_types[this.log_level].toUpperCase());
        } else {
          console.log("[SYSTEM]: " + (new Date()).toString() + ": logger.setLogLevel() Invalid level: " + level + ". Using: " + this.log_types[this.log_level].toUpperCase());
        }
      },

      getLogLevel: function () {
        this.system('Logger.getLogLevel(): ' + this.log_level);
        return this.log_level;
      },

    //--------------------------------------------------
      system: function (msg, args) {
        if(0 <= this.log_level) 
          console.log(  '[SYSTEM]: ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
      
      error: function (msg, args) {
        if(1 <= this.log_level) 
          console.error('[ERROR] : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
      
      warn: function (msg, args) {
        if(2 <= this.log_level) 
          console.log(  '[WARN]  : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
      
      event: function (msg, args) {
        if(3 <= this.log_level) 
          console.log(  '[EVENT] : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
  
      info: function (msg, args) {
        if(4 <= this.log_level) 
          console.log(  '[INFO]  : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
  
      debug: function (msg, args) {
        if(5 <= this.log_level) 
          console.log(  '[DEBUG] : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
      
      debugObj: function (obj) {
      	if(5 <= this.log_level) 
      	  console.log(obj);
      },
      
      trace: function (msg, args) {
        if(6 <= this.log_level) 
          console.log(  '[TRACE] : ' + (new Date()).toString() + ': ' + msg + ", " + $.makeArray(args));
      },
      
      traceObj: function (obj) {
      	if(6 <= this.log_level) 
      	  console.log(obj);
      },
      
    //--------------------------------------------------
    };
    
    return Logger;
});
