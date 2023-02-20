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

// ===========> Test
let permute = function(nums) {
  let length = nums.length
  let result = []
  let temp = []
  let books = {}
  nums = nums.sort((a, b) => a-b)
  function dfs(list, start){
    if(start == length){
      return result.push(temp.slice())
    }
    for(let i = 0; i < length; i++){
      if(books[i] || ((nums[i] - nums[i - 1]) && !books[i -1])) continue
      books[i] = true
      temp[start] = nums[i]
      dfs(list, start + 1)
      books[i] = false
    }
  }
  dfs(nums, 0)
  return result
};

console.log(permute([3,3,0,3]))

