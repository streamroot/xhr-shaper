function setupCachedXhr(xhr, xhrProxy, cacheInstance) {
    xhrProxy._cacheInstance = cacheInstance;
}

export default setupCachedXhr;