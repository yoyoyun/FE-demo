$(document).ready(function(){
  var i = 0;//i为正在展示的图片索引值，当用户打开网页时首先显示第一张图，即索引值为0
  var timer=null; //定时器返回值，主要用于关闭定时器
  var slideShow = $(".slideshow"), //获取最外层框架的名称
      ul = slideShow.find("ul"),
      arrows = slideShow.find(".arrows span"), //获取箭头
      leftarrow = arrows.eq(0), //获取左箭头
      rightarrow = arrows.eq(1), //获取右箭头
      tags = slideShow.find(".tags span"),//获取页码
      oneWidth = slideShow.find("ul li").eq(0).width(); //获取每个图片的宽度

  // 手动点击箭头进行图片切换代码开始
  leftarrow.on("click", function(){
    i--; //让图片的索引值次序减1，这样就可以实现顺序轮播图片
    if(i < 0){//当到达第一张图的时候，让i赋值为最后一张图的索引值，轮播效果跳转到最后一张图重新开始
      i = tags.length - 1;
    }
    ul.animate({
      "left":-oneWidth*i, //注意此处用到left属性，所以ul的样式里面需要设置position: relative; 让ul左移N个图片大小的宽度，N根据被点击的按钮索引值index确定
    })
    tags.eq(i).addClass("active").siblings().removeClass("active");
  });
  rightarrow.on("click", function(){
    i++; //让图片的索引值次序加1，这样就可以实现顺序轮播图片
    if(i > tags.length - 1){//当到达最后一张图的时候，让i赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
      i = 0;
    }
    ul.animate({
      "left":-oneWidth*i, //注意此处用到left属性，所以ul的样式里面需要设置position: relative; 让ul左移N个图片大小的宽度，N根据被点击的按钮索引值index确定
    })
    tags.eq(i).addClass("active").siblings().removeClass("active");
  });
  // 手动点击箭头进行图片切换代码结束

  // 手动点击页码进行图片轮播代码开始
  tags.on("click",function(){ //为每个页码绑定一个点击事件
    //获得对应的页码，ul设置left对应的距离
    $(this).addClass("active").siblings().removeClass("active"); //按钮被点击时为这个按钮添加高亮状态，并且将其他按钮高亮状态去掉
    var index=$(this).index(); //获取哪个按钮被点击，也就是找到被点击按钮的索引值
    i = index;
    ul.animate({
      "left":-oneWidth*i, //注意此处用到left属性，所以ul的样式里面需要设置position: relative; 让ul左移N个图片大小的宽度，N根据被点击的按钮索引值index确定
    })
  });
  // 手动点击页码进行图片轮播代码结束

  // 定时自动轮播图片代码开始
  function autoSlide(){
    timer = setInterval(function(){
      i++;
      if(i > tags.length-1){
        i = 0;
      }
      tags.eq(i).addClass("active").siblings().removeClass("active");
      tags.eq(i).trigger("click"); //模拟触发数字按钮的click
    },2000); //2000为轮播的时间
  }
  autoSlide();
  // 定时自动轮播图片代码结束

  // 鼠标悬浮图片停止轮播代码开始
  slideShow.hover(function(){
    clearInterval(timer)
  }, autoSlide);
  // 鼠标悬浮图片停止轮播代码结束
})
