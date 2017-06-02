XHRShaper.useGlobal();

var DEFAULT_URL = "http://www.streambox.fr/playlists/test_001/stream_110k_48k_416x234_000.ts";

var stats;
var requestActive = false;

function resetStats() {
	stats = {
		timestamps: [],
		bytes: [],
		t0: null,
		totalDuration: null,
		throughput: null
	};
}

function pushStats(bytes, total) {

	document.querySelector('#progress').value = bytes;
	document.querySelector('#progress').max = total;

	if (stats.t0 === null) {
		stats.t0 = Date.now();
	}

    stats.timestamps.push(Date.now() - stats.t0);
    stats.bytes.push(bytes);
}

function onRequestDone(xhr) {

	requestActive = false;

	var el = document.querySelector('#graph');

	Plotly.plot(el, [{
	    	x: stats.timestamps,
	    	y: stats.bytes 
		}], 
		{ 
    		margin: { t: 0 } 
    	} 
   	);

   	document.querySelector('#throughput').innerHTML = stats.throughput;
   	document.querySelector('#duration').innerHTML = stats.totalDuration;

   	document.querySelector('#status').innerHTML = 'Ready';
}

function onClickLoad() {

	if (requestActive) {
		console.warn('Request currently happening, please wait until done');
		return;
	}

	var minLatency = parseInt(document.querySelector('#latency').value);
	var maxBandwidth = parseInt(document.querySelector('#bandwidth').value);

	if (isNaN(minLatency) || minLatency < 0) {
		minLatency = 0;
		document.querySelector('#latency').value = minLatency;
	}

	if (isNaN(maxBandwidth) || maxBandwidth <= 0) {
		maxBandwidth = Infinity;
		document.querySelector('#bandwidth').value = maxBandwidth;
	}

	document.querySelector('#status').innerHTML = 'Loading';

	makeRequest(DEFAULT_URL, onRequestDone, minLatency, maxBandwidth);
}

function makeRequest(url, done, minLatency, maxBandwidth) {
  var loaded, total;

  console.log('url:', url);

  requestActive = true;

  var xhr = new XMLHttpRequest();

  xhr.shaper.minLatency = minLatency;
  xhr.shaper.maxBandwidth = maxBandwidth;

  xhr.onreadystatechange = function(e) {
    console.log('readyState: ' + xhr.readyState);

    if (xhr.readyState === 4) {
      doneTime = Date.now();
      var duration = doneTime - reqTime;
      var bitrate = Math.round(8 * total / duration);

      stats.totalDuration = duration;
      stats.throughput = bitrate;

      console.log('Loaded ' + total + ' bytes in ' + duration + ' ms, computed bitrate: ' + bitrate + ' kbps');
    }
  };
  xhr.onprogress = function(e) {
    loaded = e.loaded;
    total = e.total;

    pushStats(e.loaded, e.total);

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

    done(xhr);
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

  resetStats();
  pushStats(0, 0);

  return xhr;
}