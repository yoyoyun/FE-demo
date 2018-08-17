//深拷贝
//拷贝之后的对象进行修改时不会修改掉之前的object的值
function deepCopy(des, src){
  if (!src || typeof src !== 'object') {
    return des;
  }
  for(var key in src){
    // console.log('key:'+key);
    let obj = src[key];
    // console.log('obj:'+obj);
    if(obj && typeof obj === 'object'){
      // console.log('des[key]1:'+des[key]);
      des[key] = des[key] || {};
      // console.log('des[key]2:'+des[key]);
      deepCopy(des[key],obj);
    }else{
      des[key] = src[key];
      // console.log('des[key]3:'+des[key]);
    }
  }
  return des;
}
let conf = {
  adapter: 'sqlite',
  db: {
    sqlite: {
      name: 'xxx.sqlite'
    },
    mysql: {
      name: 'xxx',
      username: 'work',
      passwd: 'xxxx'
    }
  }
}
let deepCopied = deepCopy({}, conf);
deepCopied.db.sqlite.name = 'zzz.sqlite';
// console.log([deepCopied.db.sqlite.name, conf.db.sqlite.name]);//[ 'zzz.sqlite', 'xxx.sqlite' ]
// let conf2;
// let conf3 = deepCopy({}, conf2);
// console.log([conf2,conf3]);//[ undefined, {} ]

//一 函数声明提升
//console.log([typeof add, typeof sub]);//[ 'function', 'undefined' ]
function add(x, y){
  return x + y;
}
var sub = function(x, y){
  return x - y;
}
//console.log([add(1, 2), sub(1, 2)]);//[ 3, -1 ]

//二 箭头函数表达式 ES6
let double = x => x * 2;

let add2 = (x, y) => {
  return x + y;
}

//console.log([double(21), add2(1,2)]);//[ 42, 3 ]

//三 匿名函数：在函数表达式和回调函数中
//匿名函数与arguments.callee(当前执行的函数) ES5支持 但不推荐写匿名函数
function countDown(count, interval, callback){
  if(count <= 0) return;

  callback(count);

  setTimeout(function(){
    if(--count > 0){
      setTimeout(arguments.callee, interval);
    }
    callback(count);
  }, interval);
}
//countDown(10, 1000, t => console.log(t));//倒计时10,9,8,7,6,5,4,3,2,1,0

//推荐写具名函数，比用arguments.callee要好
function countDown1(count, interval, callback){
  if(count <= 0) return;

  callback(count);

  setTimeout(function update(){
    if(--count > 0){
      setTimeout(update, interval);
    }
    callback(count);
  }, interval);
}
// countDown1(10, 1000, t => console.log(t));//倒计时10,9,8,7,6,5,4,3,2,1,0

//四 函数参数
//1 具名的参数个数， function.length
//2 ES5:可变参数与arguments，当前实际调用时传递过来的参数，类数组
//3 ES6:rest参数，后续更多的函数给数组名？
//4 ES6:参数默认值

//1 具名的参数个数， function.length
//定义一个高阶函数检查参数个数是否匹配
function __matchArgs__(fn){
  return function(...args){
    if(args.length !== fn.length){
      throw RangeError('Arguments not match!');
    }
    return fn.apply(this, args);
  }
}
var add = __matchArgs__((a, b, c) => a + b + c );
//console.log(add(1,2,3));//6
// console.log(add(4,5)); //报错

//2 可变参数与arguments应用，jQuery框架中常见
function add3(){
  //let args = Array.prototype.slice.call(arguments,1);//旧方法1,好处是可以再传参，从第二个参数开始转换为数组
  //let args = [].slice.call(arguments);//旧方法2
  let args = Array.from(arguments);//新ES5的规范中array.from可以把一个类似数组的对象转换成数组
  // console.log(args);

  return args.reduce((a, b) => a + b );//数组的reduce方法可以累加
}
// console.log(add3(1, 2, 3, 4));//10

//JavaScript函数设计中经常会让参数允许有不同的类型,把最基础的参数列表作为函数声明(操作DOM,暂时注释)
// function setStyle(el, property, value){
//   if(typeof el === "string"){//严谨，等object再进来的时候就不必查找选择器了
//     el = document.querySelector(el);
//   }
//   if(typeof property === "object"){
//     for(var key in property){
//       setStyle(el, key, property[key]);
//     }
//   }else{
//     el.style[property] = value;
//   }
// }
// setStyle('div','font-size','19px');
// setStyle('div',{
//   'font-size':'19px',
//   'font-style':'italic'
// });

//3 rest参数，ES6，...args，本身就是一个数组，但是不计算在function.length中
let add4 = (...args) => args.reduce((a, b) => a + b );
// console.log(add4(1, 2, 3, 4));//10
// console.log(add4.length);//0

function deepCopy(des, src){
  if (!src || typeof src !== 'object') {
    return des;
  }
  for(var key in src){
    let obj = src[key];
    if(obj && typeof obj === 'object'){
      des[key] = des[key] || {};
      deepCopy(des[key],obj);
    }else{
      des[key] = src[key];
    }
  }
  return des;
}
function merge(des, ...objs){
  return [des, ...objs].reduce((a, b) => deepCopy(a, b));
}
// console.log(merge({x:1},{y:2},{z:3}));//{ x: 1, y: 2, z: 3 }

// ES5模拟rest参数
function __rest__(fn){
  var len = fn.length;
  return function(){
    var args = [].slice.call(arguments, 0, len-1);
    var rest = [].slice.call(arguments, len-1);
    return fn.apply(this, args.concat([rest]));
  }
}
var add = __rest__(function(args){
  return args.reduce(function(a, b){
    return a + b;
  });
});
// console.log(add(1, 2, 3, 4));//10

//4 参数默认值 ES6
// ES5借助||的短路特性实现
function addMessage(message){
  message = message || 'default message';
  return message;
}
// console.log(addMessage());//default message
// console.log(addMessage('hello world'));//hello world

//ES6
function addMessage2(message = 'default message'){
  return message;
}
// console.log(addMessage2());//default message
// console.log(addMessage2('hello world'));//hello world

function add5(x, y = 0){
  // 新的规范中不允许带有参数默认值的函数内部使用严格模式
  return x + y;
}
// console.log(add(1));//1


var arr = new Array(5);
arr[1] = 1;
arr[5] = 2;
// console.log(arr.length); //6

var a={};
var b={key:'b'};
var c={key:'c'};
console.log(a);  //{}
console.log("b:"+b);  //b:[object Object]
console.log("c:"+c);  //c:[object Object]
a[b] = 123;
console.log(a);  //{ '[object Object]': 123 }
a[c] = 456;
console.log(a);  //{ '[object Object]': 456 }
console.log(a[b]);  //456

(function(x){
  return (function(y){
    console.log(x);
  })(2);
})(1);  //1

function log(...args){
    console.log('(app)'+ args.reduce((a, b) => a + ' ' + b ));
}
log("hello,world");  //(app)hello,world
log('hello','world')  //(app)hello world
