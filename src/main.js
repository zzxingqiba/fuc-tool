import Utils from './util/index';
import { Promise } from './util/promise';
window.Utils = Utils
window.Promise = Promise
const _proxy = {
  enumerable: true,
  configurable: true,
  get: () => { },
  set: () => { },
}

export function proxy(target, sourceKey, key) {
  _proxy.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  _proxy.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, _proxy);
}

Object.keys(Utils).forEach(key => {
  proxy(window, 'Utils', key)
})

// ===========>Test