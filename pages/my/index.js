// pages/my/index.js
import { BookModel } from "../../models/book.js"
import { ClassicModels } from '../../models/classic.js'
let bookModel = new BookModel();
let classicModel = new ClassicModels();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    usetInfo: {},
    bookCount: 0,
    classic: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //不在支持授权
    // wx.getUserInfo({
    //   lang: 'zh_CN',
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
    this.getUserIS();
    this.getMyBookCount();
    this.getMyFavor();
  },
  getUserIS() {
    let _vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo'] == true) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              if (res.userInfo) {
                _vm.setData({
                  userInfo: res.userInfo,
                  authorized: true
                })
              }
            }
          })
        } 
      }
    })
  },
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    console.log(userInfo);
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      console.log(res);
      this.setData({
        classic: res
      })
    })
  },
})