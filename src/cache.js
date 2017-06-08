const DEFAULT_ALLOW_UPDATES = false;
const MAX_CACHE_SIZE_BYTES = 1024 * 1e6; // 1024 Mbytes

const cache = new Map();

let bytesRead = 0;
let bytesWritten = 0;
let misses = 0;
let hits = 0;

const instance = {
  allowUpdates: DEFAULT_ALLOW_UPDATES,
  errorOnOverflow: false,
  get: (uri, onlyData = true) => {
    let resource;
    if (!cache.has(uri)) {
      misses++;
      return null;
    }
    hits++;
    resource = cache.get(uri);
    resource.accessedAt = Date.now();
    if (typeof resource.data.byteLength === 'number') {
      bytesRead += resource.data.byteLength;
    }
    if (onlyData) {
      return resource.data;
    } else {
      return resource;
    }
  },
  put: (uri, data, dataText, dataXML, headers, headersAll) => {
    if (!instance.allowUpdates && cache.has(uri)) {
      throw new Error('Cache updates not allowed. Purge first! URI:', uri);
    }
    let createdAt = Date.now();
    let accessedAt = null;
    let resource = {
      uri,
      data,
      dataText,
      dataXML,
      headers,
      headersAll,
      createdAt,
      accessedAt
    }
    cache.set(uri, resource);
    if (typeof resource.data.byteLength === 'number') {
      bytesWritten += resource.data.byteLength;
    }
    let totalSize = instance.countBytes();
    if (totalSize > MAX_CACHE_SIZE_BYTES) {
      if (instance.errorOnOverflow) throw new Error('Cache exceeds max size, has', totalSize, 'bytes');
      instance.purgeOldest();
    }
    return instance
  },
  purgeByUri: (uri) => {
    return cache.delete(uri);
  },
  purgeAll: () => {
    cache.clear();
  },
  purgeNotAccessedSince: (timeMillisSince) => {
    let now = Date.now();
    cache.forEach((resource, uri) => {
      if (!resource.accessedAt // never accessed
        || resource.accessedAt < now - timeMillisSince) 
      cache.delete(uri);
    });
  },
  purgeCreatedBefore: (timestamp) => {
    cache.forEach((resource, uri) => {
      if (createdAt < timestamp) 
      cache.delete(uri);
    });
  },
  purgeOldest: (type = 'accessed', count = 1) => {
    let prop = type + 'At';
    for (let i = 0; i < count; i++) {
      let oldest = null;
      cache.forEach((resource) => {
        if (!oldest || resource[prop] < oldest[prop]) {
          oldest = resource;
        }
      });
      cache.delete(oldest.uri);
    }
  },
  reduce: (reduceFn, accuInit = 0) => {
    let accu = accuInit;
    cache.forEach((resource, uri) => {
      accu = reduceFn.bind(this)(accu, resource);
    });
    return accu;
  },
  sumDataProperty: (field) => {
    return instance.reduce((accu, resource) => {
      return accu + resource.data[field];
    });
  },
  countBytes: () => {
    return instance.sumDataProperty('byteLength');
  }
};

const getInfo = function() {
  return {
    bytesRead,
    bytesWritten,
    hits,
    misses
  }
}

export default {
  getInfo,
  instance
};