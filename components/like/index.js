// pages/components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count:{
      type:Number
    },
    disabled:{
      type:Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // count: 9,
    // like: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      console.log(event);
      if(this.properties.disabled){
        return
      }
      let like = this.properties.like;
      let count = like?this.properties.count-1:this.properties.count+1;
      this.setData({ 
        like: !like,
        count:count
      })
      // this.data.like = !this.data.like;
      // console.log(this.data.like);
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior
      })

    }
  }
})
