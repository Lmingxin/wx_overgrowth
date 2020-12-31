// components/tag/index.js
Component({
  //启用slot
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },
  //外部样式
  externalClasses:['tag-class'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})