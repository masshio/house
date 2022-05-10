export function debounce(func,delay=100){ //防抖函数
    let timer = null;
    return function(...args){
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this,args)
      }, delay);
    }
  }

//节流函数
export function throttle(func,delay=100){
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