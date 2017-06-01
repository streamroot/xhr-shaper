function makeRequest(url, done, minLatency, maxBandwidth) {
  var loaded, total;

  console.log('url:', url);

  var xhr = new XMLHttpRequest();

  xhr.shaper.minLatency = minLatency;
  xhr.shaper.maxBandwidth = maxBandwidth;

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

  console.debug('Max bandwidth: ' + xhr.shaper.maxBandwidth);
  console.debug('Min latency: ' + xhr.shaper.minLatency);

  var reqTime = Date.now(), doneTime;

  xhr.send();

  return xhr;
}