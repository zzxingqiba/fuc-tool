/**
 * 实现
 **/

export function newFuc(fn, ...arg) {
  const obj = Object.create(fn.prototype)
  // obj.call()
  const res = fn.apply(obj, arg)
  return res instanceof Object ? res : obj
}


