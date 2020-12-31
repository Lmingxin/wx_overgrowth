import { HTTP } from '../utils/http.js'
export class ClassicModels extends HTTP {
  getLatest(sCallback) {
    console.log("请求");
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(res);
       
        sCallback(res);
        this._setLatestIndex(res.index);
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }
  getClassic(index, nextOrPervious, sCallback) {
    //根据nextOrPervious判断请求的期刊
    let key = nextOrPervious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    console.log(key);
    
    //获取缓存
    let classic = wx.getStorageSync(key)
    if (!classic) { //当前Key不存在，则发送请求
      this.request({
        url: `classic/${index}/${nextOrPervious}`,
        success: (res) => {
          // console.log(res);
          //把请求的数据写入缓存中
          wx.setStorageSync(key, res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
  }
  getMyFavor(success){
    this.request({
      url:"classic/favor",
      success
    })
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  //生成缓存key
  _getKey(index) {
    return 'classic' + index
  }
}