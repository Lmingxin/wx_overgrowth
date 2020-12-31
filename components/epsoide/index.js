// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type:String,
      observer:function (newVal, oldVal) {
        let val = newVal<10?'0'+newVal:newVal;
        console.log(this);
        console.log(val);
        
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    mounth: "",
    _index:"",
    mounths:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  },
attached:function(){
  console.log(this.data);
  let date = new Date();
  let year = date.getFullYear();
  let mounth = date.getMonth();
  console.log(year);
  
  this.setData({
    year:year,
    mounth:this.data.mounths[mounth]
  })
},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
