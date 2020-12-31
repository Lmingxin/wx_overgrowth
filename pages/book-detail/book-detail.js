// pages/book-detail/book-detail.js
import { BookModel } from "../../models/book.js"
import { LikeModels } from '../../models/like.js'
let bookModel = new BookModel();
let likeModel = new LikeModels();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const id = options.bid;
    wx.showLoading()
    Promise.all([bookModel.getDetail(id),bookModel.getComments(id),bookModel.getLikeStatus(id)]).then(res=>{
      console.log(res);
      wx.hideLoading()
      let status = res[2].like_status === 0 ? false : true;
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: status,
        likeCount: res[2].fav_nums
      })
    }) 
    
  },
  onLike(event) {
    const behavior = event.detail.behavior;
    likeModel.likeReq(behavior, this.data.book.id, 400)
  },
  onFakePost(){
    this.setData({
      posting:true
    })
  },
  onCancel(){
    this.setData({
      posting:false
    })
  },
  onPost(event){
    console.log(event);
    const comment = event.detail.text || event.detail.value;
    if(!comment){
      return
    }
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }
    bookModel.postComments(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: '+1',
        icon:'none'
      })
      console.log(comment);
      this.data.comments.unshift({
        content:comment,
        nums:1
      })
      this.setData({
        comments:this.data.comments,
        posting:false
      })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})