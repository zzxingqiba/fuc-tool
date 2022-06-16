import Utils from './util/index';
window.Utils = Utils
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

