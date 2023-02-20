// ===============================================================》简易迷宫回溯
class Maze{
  constructor(){
    console.log('《==start==》')
  }
  // 地图上的1表示墙，2表示可以走通，3表示此路不通
  // 规则右下左上
  start(map, startX, startY, endX, endY){
    if(map[endX][endY] == 2){
      console.log(map)
      console.log('《==end==》')
      return true
    }else{
      if(map[startX][startY] == 0){
        map[startX][startY] = 2
        if(this.start(map, startX, startY + 1, endX, endY)){
          return true
        }else if(this.start(map, startX  + 1, startY , endX, endY)){
          return true
        }else if(this.start(map, startX, startY - 1, endX, endY)){
          return true
        }else if(this.start(map, startX - 1, startY, endX, endY)){
          return true
        }else{
          map[startX][startY] = 3;
        }
      }else{
        return false
      }
    }
  }
}

// 创建二维数组
let map = new Array(8).fill().map(i => new Array(8).fill(0))
// 设置围墙
map.map((item,index) => {
  if((index == 0) || (index == map.length - 1)){
    item.fill(1)
  }
  item[0] = 1
  item[map.length - 1] = 1
  return item
})
map[3][1] = 1
map[3][2] = 1
map[3][3] = 1
map[3][4] = 1
// 设置终点未(6, 2)  规则右下左上
const maze = new Maze()
maze.start(map, 1, 1, 6, 2)
// console.log(map)

// ===============================================================》全排列
let permute = function(nums) {
  const result = [];
  const book = {};
  const res = [];
  function dfs(step, targetArr) {
    const total = targetArr.length
    if(step == total){
      result.push(res.slice())
      return
    }
    for(let i = 0; i < total; i++){
      let target = targetArr[i]
      if(!book[target]){
        book[target] = 1
        res[step] = target
        dfs(step + 1, targetArr)
        book[target] = 0
      }
    }
  }
  dfs(0, nums);
  return result;
};

class Permute{
  constructor(){
    this.result = []
    this.book = {}
    this.block = []
  }
  dfs(n, array){
    const length = array.length
    if(n == length){
      this.result.push(this.block.slice())
      return
    }
    for(let i = 0; i < length; i++){
      const target = array[i]
      if(!this.book[i]){
        this.book[i] = 1
        this.block[n] = target
        this.dfs(n + 1, array)
        this.book[i] = 0
      }
    }
  }
  print(){
    console.log(this.result)
  }
}
// const permute = new Permute()
// permute.dfs(0, [1, 2, 3, 4])
// permute.print()

// console.log(permute([1,2,3]))

// ===============================================================》八皇后
class Queen8{
  constructor(){
    this.size = 8
    this.list = []
    this.count = 0
  }
  check(n){
    if(n == 8){
      console.log(this.list)
      this.count++
      console.log(this.count)
      return 
    }
    for(let i = 0; i < this.size; i++){
      this.list[n] = i
      if(this.judge(n)){
        this.check(n + 1)
      }
    }
  }
  judge(n){
    const { list } = this
    for(let i = 0; i < n; i++){
      if((list[i] == list[n]) || (Math.abs(n - i) == Math.abs(list[n] - list[i]))){
        return false
      }
    }
    return true
  }
}
// const queen = new Queen8()
// queen.check(0)