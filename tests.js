///////////////////////////////////

var timeout = 10000;

var bigChunkUrl = "http://www.streambox.fr/playlists/test_001/stream_110k_48k_416x234_000.ts";
var fooUrl = '/data/foo.txt';
var barUrl = '/data/barbar.txt';

////////////////////////////////

describe('xhr-shim', function() {

  this.timeout(timeout);

  before(function() {
    XHRShaper.useGlobal();
  });

  it('should have a shaper instance', function() {
    var xhr = new XMLHttpRequest();
    (typeof xhr.shaper).should.equal('object');
  });

  it('should have a global Shaper object', function() {
    (typeof XMLHttpRequest.Shaper).should.equal('function');
  });

  it('should make a large throttled request', function(done) {
    var xhr = makeRequest(bigChunkUrl, done, 1000, 512);
  });

  it('should make two consequent requests', function(done) {
    var xhr = makeRequest(fooUrl, function() {

      xhr.response.byteLength.should.equal(3);

      xhr = makeRequest(barUrl, function() {
        xhr.response.byteLength.should.equal(6);
        done();
      });
    });
  });

  it('should make two concurrent requests', function(done) {
    var doneCount = 0;
    function incrDone() {
      doneCount++;
      if (doneCount == 2) {
        done();
      }
    }

    var fooXhr = makeRequest(fooUrl, function() {

      console.log('foo done');

      fooXhr.response.byteLength.should.equal(3);

      incrDone();
    });

    var barbarXhr = makeRequest(barUrl, function() {

      console.log('barbar done');

      barbarXhr.response.byteLength.should.equal(6);

      incrDone();
    });

  });

  it('should make one request', function(done) {
    var doneCount = 0;
    function incrDone() {
      doneCount++;
      if (doneCount == 1) {
        done();
      }
    }

    var barbarXhr = makeRequest(barUrl, function() {

      barbarXhr.response.byteLength.should.equal(6);

      incrDone();
    });

  });
});
