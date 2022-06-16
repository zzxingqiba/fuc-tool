
import { isPlainObject, _toString } from './check';

/**
 * 转换
 **/

// 输出输入字符串形式
export function toString(val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

// 输入任何值 NAN则原值返回 否则转为Number类型
// parseFloat针对undefined null 布尔等返回都是NaN
export function toNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

// 类数组转为真实数组 start为选择索引开始位置
export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}



