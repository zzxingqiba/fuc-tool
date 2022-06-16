/**
 * 查找/操作
 **/


// 数组中移除某项 改变原数组
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

