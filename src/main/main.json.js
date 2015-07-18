//var j = ['/data/taxonomy.json', '/data/stacks.json', '/data/products.json', '/data/used.json']

var _0xa913=["\x2F\x64\x61\x74\x61\x2F\x74\x61\x78\x6F\x6E\x6F\x6D\x79\x2E\x6A\x73\x6F\x6E","\x2F\x64\x61\x74\x61\x2F\x73\x74\x61\x63\x6B\x73\x2E\x6A\x73\x6F\x6E","\x2F\x64\x61\x74\x61\x2F\x70\x72\x6F\x64\x75\x63\x74\x73\x2E\x6A\x73\x6F\x6E","\x2F\x64\x61\x74\x61\x2F\x75\x73\x65\x64\x2E\x6A\x73\x6F\x6E"];var j=[_0xa913[0],_0xa913[1],_0xa913[2],_0xa913[3]];

var j1 = {
  get: function(cb, $http) {
  
    function zq(data) {
      return w.__(w.__(y.__(data), 5), 9);
    }
  
    $http.get(_0xa913[0])
    .success(function(data, status, headers, config){
      cb(JSON.parse(zq(data.data)));
    });
  }
};

var h5 = {
  get: function(params, cb, $http) {
  
    function zq(data) {
      return w.__(w.__(y.__(data), 5), 9);
    }
    
    if(params.start == 0) {
      $http.get(_0xa913[1])
      .success(function(data, status, headers, config){
        cb(JSON.parse(zq(data.data)));
      });
    } else {
      cb();
    }
  }
};

var p13 = {
  get: function(cb, $http) {
  
    function zq(data) {
      return w.__(w.__(y.__(data), 5), 9);
    }
    
    $http.get(_0xa913[2])
    .success(function(data, status, headers, config){
      cb(JSON.parse(zq(data.data)));
    });
  }
};

var q3 = {
  get: function(cb, $http) {
  
    function zq(data) {
      return w.__(w.__(y.__(data), 5), 9);
    }
    
    $http.get(_0xa913[3])
    .success(function(data, status, headers, config){
      cb(JSON.parse(zq(data.data)));
    });
  }
};