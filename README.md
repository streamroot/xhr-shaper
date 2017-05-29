# xhr-shaper
Shapes your XHR requests to a max emulated bandwidth and latency, randomizes frequency of progress events

### Install:

`npm install xhr-shaper`

### How to use:

As global/window shim
```
require('xhr-shaper').useGlobal();

// now XMLHttpRequest object is the shim
```

NOTE: Running `useGlobal` will overload the XHR constructor in the `window` to produce a mirror object which will have the exact same behavior, but it's not an instance of the native `XMLHttpRequest` (in case that matters for some reason to you). The mirror XHR has an additional property called `shaper` ...

Or in a modular way
```
var XHRShaper = require('xhr-shaper');

var xhr = new XHRShaper.XMLHttpRequest(); 
```

NOTE: XHRShaper module exposes some fancy undocumented stuff like `BaseXHR` and `objectMirrors`. These might be moved into their own package in the future.

```
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
```

Create a bare XHR just as always ...

```
// Set your minimum desired latency !
xhr.shaper.minLatency = 1000;

// Set your maximum desired bandwidth
xhr.shaper.maxBandwidth = 512;
```

Or make these things global so they will apply on ALL requests!!!

```
// all requests will be limited to 64kbps and take at least 5000 ms
XMLHttpRequest.Shaper.maxBandwidth = 64;
XMLHttpRequest.Shaper.minLatency = 5000;
```

... wait for things to happen.

```
xhr.send();
```

### Test/dev:

Run `npm run dev`

Now go to http://localhost:8080/webpack-dev-server/

### TODOs:

* randomizing feature
* proper automated tests
* implement all handlers as in https://xhr.spec.whatwg.org/

interface XMLHttpRequestEventTarget : EventTarget {
  // event handlers
  attribute EventHandler onloadstart;
  attribute EventHandler onprogress;
  attribute EventHandler onabort;
  attribute EventHandler onerror;
  attribute EventHandler onload;
  attribute EventHandler ontimeout;
  attribute EventHandler onloadend;
};

