// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:"images/shangyige2.png",
    leftSrc:"images/shangyige1.png",
    disRightSrc:"images/xiayige2.png",
    rightSrc:"images/xiayige1.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听左侧上一页点击事件
    onLeft:function(event){
      //只有不是第一页才可以点击
      if(!this.properties.latest){  
        this.triggerEvent('left',{},{})
      }
     
    },
    //监听右侧下一页点击事件
    onRight:function(event){
      //只有不是最后一页才可以点击
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
