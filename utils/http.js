import { config } from "../config.js"
const error = {
  1: '网络错误',
  400: '请求包含不支持的参数',
  401: '未授权',
  403: '被禁止访问',
  404: '请求的资源不存在',
  413: '上传的File体积太大',
  500: '内部错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在',
}
export class HTTP {
  request(data = {}) {
    console.log(data);
    
    if (!data.method) data.method = 'GET'

    wx.request({
      url: config.api_base_url + data.url,
      params: data.params,
      data: data.data,
      method: data.method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        console.log(code);

        if (code.startsWith('2')) { //成功
         data.success && data.success(res.data);
        } else {  //失败
          this._error_success(res.data.error_code)
        }
      },
      fail: (err) => {
        this._error_success()
      }
    })
  }
  _error_success(err) {
    if (!err) {
      err = 1
    }
    wx.showToast({
      title: error[err],
      icon: 'none',
      duration: 2000
    })
  }
}