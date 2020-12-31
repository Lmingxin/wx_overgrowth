// pages/classic/classic.js
import { ClassicModels } from '../../models/classic.js'
import { LikeModels } from '../../models/like.js'
let classic = new ClassicModels();
let likeModel = new LikeModels();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  //喜欢点击事件
  onLike: function (event) {
    console.log(event);
    console.log(this.data);
    let behavior = event.detail.behavior;
    //发送请求
    likeModel.likeReq(behavior, this.data.classic.id, this.data.classic.type)
  },
  //新一期点击事件
  onNext: function () {
    this._updateClassic('next')
  },
  //上一期点击事件
  onPervious: function () {
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPervious) {
    let index = this.data.classic.index;
    classic.getClassic(index, nextOrPervious, (res => {
      console.log(res);
      this._getLikeStatus(res.id,res.type);
      this.setData({
        classic: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    }))
  },
  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送请求
    classic.getLatest((res) => {
      console.log(res);
      let data = res;
      data.like_status = data.like_status === 0 ? false : true;
      // this._getLikeStatus(res.id,res.type);
      this.setData({
        classic: data,
        likeCount:data.fav_nums,
        likeStatus:res.like_status
      })
    })
    // wx.request({
    //   url: 'http://bl.talelin.com/v1/classic/latest',
    //   header: {
    //     appkey: "nRyc4WeyGlfWuozx"
    //   },
    //   success: (res) => {
    //     console.log(res);

    //   }
    // })
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