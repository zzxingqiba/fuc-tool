export function Promise(executor) {
  this.promiseState = 'pending'
  this.promiseResult;
  this.callBackList = []
  const resolve = data => {
    if (this.promiseState != 'pending') return
    this.promiseState = 'fullfilled'
    this.promiseResult = data
    if (!this.callBackList.length) return
    this.callBackList.map(i => i.onResolved())
  }
  const reject = data => {
    if (this.promiseState != 'pending') return
    this.promiseState = 'rejected'
    this.promiseResult = data
    if (!this.callBackList.length) return
    this.callBackList.map(i => i.onRejected())
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  //判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason;
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  return new Promise((resolve, reject) => {
    const callback = cb => {
      setTimeout(() => {
        try {
          const returnResult = cb(this.promiseResult)
          if (returnResult instanceof Promise) {
            returnResult.then(v => {
              resolve(v)
            }, e => {
              reject(e)
            })
            return
          }
          resolve(returnResult)
        } catch (e) {
          reject(e)
        }
      })
    }
    if (this.promiseState == 'fullfilled') {
      callback(onResolved)
    }
    if (this.promiseState == 'rejected') {
      callback(onRejected)
    }
    if (this.promiseState == 'pending') {
      this.callBackList.push(
        {
          onResolved: () => {
            callback(onResolved)
          },
          onRejected: () => {
            callback(onRejected)
          }
        }
      )
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, e => {
        reject(e)
      })
      return
    } else {
      resolve(value)
    }
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}

Promise.all = function (promises = []) {
  return new Promise((resolve, reject) => {
    const resultList = []
    let successCount = 0
    const promisesLength = promises ? promises.length : 0
    promises.map((p, i) => {
      if (p instanceof Promise) {
        return p.then(v => {
          resultList[i] = v
          successCount++
          if (promisesLength == successCount) resolve(resultList)
        }, e => {
          reject(e)
        })
      }
      resultList[i] = p
      successCount++
      if (promisesLength == successCount) resolve(resultList)
    })
  })
}

Promise.race = function (promises = []) {
  return new Promise((resolve, reject) => {
    promises.map((p, i) => {
      if(p instanceof Promise){
        p.then(v=>{
          resolve(v)
        },e=>{
          reject(e)
        })
        return
      }
      resolve(p)
    })
  })
}


// =================>Test
