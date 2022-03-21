//节流函数
function throttle(func,delay=100){
    let timer = null;
    return function(...args){
      if(!timer){
        timer = setTimeout(() => {
          func.apply(this,args);
          timer = null;
        },delay)
      }
    }
  }