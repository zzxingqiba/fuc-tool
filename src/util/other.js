/**
 * 未分类
 **/


/**
 * 缓存函数
 * const strFuc = cached(str=> str)
 * strFuc(1) // 执行函数 存入缓存
 * strFuc(1) // 取缓存
 */
export function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

/**
 * 合并对象
 * 第一个参数target对象 第二个参数需要被合并的对象
 */
export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * 合并对象数组为一个对象(会覆盖同名属性)
 */
export function toObject (arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

// 实现简易绑定事件
class EventEmiter {
  constructor(){
    this.events = {}
  }
  emit(event,...args){
    this.events[event].map(fn => {
      console.log(this)
      fn.apply(this, args)
    })
  }
  on(event, fn){
    if(this.events[event]){
      this.events[event].push(fn)
    }else{
      this.events[event] = [fn]
    }
  }
  remove(event){
    delete this.events[event] 
  }
}
// const event = new EventEmiter()
// event.on('handle', (a, b) => {
//   console.log(a, b)
// })
// setTimeout(()=>{
//   event.emit('handle', 2, 4)
// },2000)
