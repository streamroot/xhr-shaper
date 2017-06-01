function makeRequest(url, done) {
  var loaded, total;

  console.log('url:', url);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(e) {
    console.log('readyState: ' + xhr.readyState);

    if (xhr.readyState === 4) {
      doneTime = Date.now();
      var duration = doneTime - reqTime;
      var bitrate = Math.round(8 * total / duration);
      console.log('Loaded ' + total + ' bytes in ' + duration + ' ms, computed bitrate: ' + bitrate + ' kbps');
    }
  };
  xhr.onprogress = function(e) {
    loaded = e.loaded;
    total = e.total;

    console.log('Progress: ' + e.loaded + ' of ' + e.total);
  };

  xhr.onload = function(e) {

    if (xhr.readyState < 4) {
      console.warn('onload called with readyState:', xhr.readyState, ' id:', xhr.id);
      return;
    }

    console.log('Loading done');
    //console.log(e);

    console.log('readyState:', xhr.readyState);

    if (xhr.response.byteLength < 1024) {
      console.log(new TextDecoder("utf-8").decode(xhr.response));
    }

    done();
  }

  xhr.onloadend = function(e) {
    console.log('Loading ended');
    //console.log(e);
  }

  xhr.withCredentials = false;
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';

  //xhr.shaper.minLatency = 1000;
  //xhr.shaper.maxBandwidth = 512;

  console.debug('Max bandwidth: ' + xhr.shaper.maxBandwidth);
  console.debug('Min latency: ' + xhr.shaper.minLatency);

  var reqTime = Date.now(), doneTime;

  xhr.send();

  return xhr;
}

var bigChunkUrl = "http://www.streambox.fr/playlists/test_001/stream_110k_48k_416x234_000.ts";
var fooUrl = '/data/foo.txt';
var barUrl = '/data/barbar.txt';

describe('xhr-shim', function() {
  it('should make a request', function(done) {
    var xhr = makeRequest(bigChunkUrl, done);
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

  it.only('should make two concurrent requests', function(done) {
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
