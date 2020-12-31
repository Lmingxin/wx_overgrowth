import { HTTP } from '../utils/http-p.js'
export class KeywordModel extends HTTP {
  key = 'q';
  maxLength = 10;
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) { //没有words则返回空数组
      return [];
    } else {
      return words; //有words则返回words
    }
  }
  getHot() { 
    return this.request({
      url:'book/hot_keyword'
    })
  }
  addToHistory(keyword) {
    //获取本地搜索历史
    let words = this.getHistory();
    //判断本地有没传入的数据
    const has = words.includes(keyword)
    //如果没有则存入
    if (!has) {
      const length = words.length;
      //如果数组长度大于等于10，删除末尾的元素
      if (length >= this.maxLength) {
        words.pop();
      }
      //把新的数据添加到数组的首位
      words.unshift(keyword);
      //存入本地
      wx.setStorageSync(this.key, words);
    }

  }
}