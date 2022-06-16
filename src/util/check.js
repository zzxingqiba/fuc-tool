/**
 * 判断
 **/

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isTrue(v) {
  return v === true
}

export function isFalse(v) {
  return v === false
}

// 快速对象检查
export function isQuickObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export const _toString = Object.prototype.toString

// 可以截取出正确变量类型  Utils.bol.toRawType(undefined) ==》 [object Undefined]
export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

// 对象检查
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

// 判断是否为Promise
export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

// 查询逗号分割字符串中是否有某一个key
// const hasKey = makeMap('1,2,3,4,5');  
// hasKey(1)
export function makeMap(
  str,
  expectsLowerCase
) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

// 判断对象是否有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * 判断a b是否大致相等
 */
export function looseEqual(a, b) {
  if (a == b) return true
  const isObjectA = isQuickObject(a)
  const isObjectB = isQuickObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length == b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length == keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * once函数
 */
export function once (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}



