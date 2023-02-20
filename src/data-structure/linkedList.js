// ===============================================================》单链表
class HeroNode{
  constructor(no){
    this.no = no;
    this.next = null
  }
  toString(){
    return `当前节点为${this.no}`
  }
}
class SingleLinkedList{
  constructor(){
    this.head = new HeroNode(0)
  }
  getHead(){
    return this.head
  }
  // 添加节点
  add(heroNode){
    let temp = this.head
    while(true){
      if(!temp.next){
        break
      }
      temp = temp.next
    }
    temp.next = heroNode
  }
  // 有序插入
  addByNo(heroNode){
    let temp = this.head
    while(temp.next){
      if(temp.next.no < heroNode.no){
        temp = temp.next
      }else if(temp.next.no > heroNode.no){
        heroNode.next = temp.next
        temp.next = heroNode
        return
      }else{
        console.log('已存在，不可添加')
        return
      }
    }
    temp.next = heroNode
  }
  // 显示
  show(){
    if(!this.head.next) return console.log('该单链表为空')
    let temp = this.head
    while(temp.next){
      console.log(temp.next.toString())
      temp = temp.next
    }
  }
}

// 链表反转
SingleLinkedList.reserve = (head) => {
  if(!head.next) return console.log('空链表')
  let reverseHead = new HeroNode(0)
  let next = null
  let cur = head.next
  while(cur){
    next = cur.next
    cur.next = reverseHead.next
    reverseHead.next = cur
    cur = next
  }
  head.next = reverseHead.next
}

// 逆序打印(栈方式)
SingleLinkedList.reverseByStock = (head) => {
  if(!head.next) return console.log('空链表')
  let stock = []
  let cur = head.next
  while(cur){
    stock.push(cur)
    cur = cur.next
  }
  while(stock.length){
    console.log(stock.pop().toString())
  }
}

const singleLinkedList = new SingleLinkedList()
singleLinkedList.addByNo(new HeroNode(1))
singleLinkedList.addByNo(new HeroNode(4))
singleLinkedList.addByNo(new HeroNode(2))
SingleLinkedList.reverseByStock(singleLinkedList.getHead())
// singleLinkedList.show()

// ===============================================================》双链表
class HeroNode2{
  constructor(no){
    this.no = no;
    this.next = null
    this.pre = null
  }
  toString(){
    return `当前节点为${this.no}`
  }
}
class DoubleLinkedList{
  constructor(){
    this.head = new HeroNode2(0)
  }
  getHead(){
    return this.head
  }
  // 添加节点
  add(heroNode){
    let temp = this.head
    while(true){
      if(!temp.next){
        break
      }
      temp = temp.next
    }
    temp.next = heroNode
    heroNode.pre = temp
  }
  // 有序插入
  addByNo(heroNode){
    let temp = this.head
    while(temp.next){
      if(temp.next.no < heroNode.no){
        temp = temp.next
      }else if(temp.next.no > heroNode.no){
        // 有点小坑 注意赋值顺序问题 方式较多
        heroNode.next = temp.next
        heroNode.pre = temp
        temp.next.pre = heroNode
        temp.next = heroNode
        return
      }else{
        console.log('已存在，不可添加')
        return
      }
    }
    temp.next = heroNode
    heroNode.pre = temp
  }
  // 显示
  show(){
    if(!this.head.next) return console.log('该单链表为空')
    let temp = this.head
    while(temp.next){
      console.log(temp.next.toString())
      temp = temp.next
    }
  }
}
const doubleLinkedList = new DoubleLinkedList()
doubleLinkedList.addByNo(new HeroNode2(1))
doubleLinkedList.addByNo(new HeroNode2(4))
doubleLinkedList.addByNo(new HeroNode2(2))
doubleLinkedList.show()
console.log(doubleLinkedList.getHead())

// ===============================================================》约瑟夫问题(环形单链表)
class Boy{
  constructor(no, next){
    this.no = no
    this.next = next
  }
  getNo(){
    return this.no
  }
}

class CrilcleSingleLinkedList{
  constructor(){
    this.first = null
  }
  add(nums){
    if(nums < 1) return console.log('至少添加1人')
    let curBoy = null
    for(let i = 1; i <= nums; i++){
      let boyNode = new Boy(i)
      if(i == 1){
        this.first = boyNode
        curBoy = boyNode
        boyNode.next = this.first
      }else{
        curBoy.next = boyNode
        boyNode.next = this.first
        curBoy = boyNode
      }
    }
  }
  count(startNo, countNum, nums){
    if(!this.first || startNo < 1 || startNo > nums ||  countNum < 1 || countNum > nums) return console.log('输入错误')
    // 找到first后一个
    let helper = this.first
    while(true){
      if(helper.next == this.first) break
      helper = helper.next
    }
    // 更改轮盘指针位置
    for(let i = 1; i < startNo; i++){
      this.first = this.first.next
      helper = helper.next
    }
    while(helper != this.first){
      for(let i = 0; i < countNum - 1; i++){
        this.first = this.first.next
        helper = helper.next
      }
      console.log("此次出圈的为=>" + this.first.getNo())
      this.first = this.first.next
      helper.next = this.first
    }
    console.log("留在圈里最后的小孩编号是=>" + this.first.getNo())
  }
  show(){
    if(!this.first) return console.log('为空')
    let cur = this.first
    while(true){
      console.log(`第${cur.getNo()}个孩子`)
      if(cur.next == this.first){
        break
      }
      cur = cur.next
    }
  }
}
const list = new CrilcleSingleLinkedList()
list.add(10)
list.show()
list.count(1, 2, 10)