function Promise() {
  var self = this;
  this.pending = [];

  this.resolve = function(result) {
    self.complete('resolve', result);
  },

  this.reject = function(result) {
    self.complete('reject', result);
  }

  this.then = function(success, failure) {
    self.pending.push({ resolve: success, reject: failure });
    return self;
  }

  this.complete = function(type, result) {
    while (self.pending[0]) {
      callback = self.pending.shift()[type];
      if (callback) { callback(result) } 
      else { self }
    }
  }
}

function delay(ms) {
  var promise = new Promise();
  setTimeout( function() {
    n = Math.random() * 1000
    if ( n < 667 ){
      promise.resolve(n);
    } else {
      promise.reject('over the limit');
    }
  }, ms);
  return promise;
}

delay(1000)
.then(
  function(number) {
    console.log(number);
    number += 100;
  }
)
.then(
  function(number) {console.log(number)},  // success handler
  function(errorMessage) {console.log(errorMessage)} // error handler
);