// pages/book/index.js
import {BookModel} from "../../models/book.js"
let bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res=>{
      console.log(res);
     this.setData({
      books: res
     })
    })
  },
  onSearch(){
    console.log("ss");
    this.setData({
      searching:true
    })
  },
  onCancel(){
    this.setData({
      searching:false
    })
  },

  //页面向下滑动，触底事件
  onReachBottom(){
    console.log(11111111111);
    this.setData({
      more:!this.data.more
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})