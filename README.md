# xhr-shaper
Shapes your XHR requests to a max emulated bandwidth and latency, randomizes frequency of progress events

### Install:

`npm install xhr-shaper`

### How to use:

```
require('xhr-shaper');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(e) {
  console.log('readyState: ' + xhr.readyState);
};
xhr.onprogress = function(e) {
  console.log('Progress: ' + e.loaded + ' of ' + e.total);
};

xhr.withCredentials = false;
xhr.open('GET', "http://www.streambox.fr/playlists/test_001/stream_110k_48k_416x234_000.ts", true);
xhr.responseType = 'arraybuffer';

// Set your minimum desired latency !
xhr.shaper.minLatency = 1000;

// Set your maximum desired bandwidth
xhr.shaper.maxBandwidth = 512;

xhr.send();

```

### Test/dev:

Just open `index.html` (eventually via a local server)

### TODOs:

* randomizing feature
* proper automated tests
