function Promise() {
  var self = this;
  this.pending = [];

  this.resolve = function(result) {
    self.complete('resolve', result);
  },

  this.reject = function(result) {
    self.complete('reject', result);
  }
}

Promise.prototype = {
  then: function(success, failure) {
    this.pending.push({ resolve: success, reject: failure });
    return this;
  },

  complete: function(type, result) {
    while (this.pending[0]) {
      fn = this.pending.shift()[type];
      if (fn) {
        fn(result)
      } else {
        // when error handler not specified in a then statement, skip through to error handler
        this
      }
    }
  }
};

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