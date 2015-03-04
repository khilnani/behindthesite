define('localstore',['jquery', 'logger'], function($, log) {
  "use strict";
  
    var localstore = {
    //--------------------------------------------------
  
      get: function (key, subkey) {
        log.debug('Localstore.get(): ', arguments );
        
        var data = undefined;
        try {
          data = JSON.parse(localStorage[key]);
        } catch(e) { }
        if(data && typeof(subkey) != 'undefined') {
          data =  data[subkey];
        }
        //log.traceObj(data);
        return data;
      },
      
      set: function (key, subkeyOrVal, val) {
        log.debug('Localstore.set(): ', arguments );
        
        if(arguments.length == 2) {
          if(subkeyOrVal)
            subkeyOrVal._updated = Date.now();
          localStorage[key] = JSON.stringify(subkeyOrVal);
        } else if(arguments.length == 3) {
          var data = this.get(key);
          if(!data) 
            data = {};
          data._updated = Date.now();
          if(val)
            val._updated = Date.now();
          data[subkeyOrVal] = val
          localStorage[key] = JSON.stringify(data);
        }
        
        return this.get(key, subkeyOrVal);
      }

    //--------------------------------------------------
    };
    
    return localstore;
});
