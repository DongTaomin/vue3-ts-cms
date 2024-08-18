class LocalCache {
  setCache(key: string, value: any) {
    // object -> json
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      // json -> object
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}
export default new LocalCache();
