const API_HOST = "http://xxx.com/xxx";
const DEBUG = true; //切换数据入口
var Mock = require('mock.js')

let ajax = (method, url, data, callBack, mockData) => {
  if (!DEBUG) {
    wx.request({
      url: API_HOST + url,
      method: method ? method : 'get',
      data: data ? data : {},
      success: function(res) {
        callBack(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': mockData
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    setTimeout(() => {
      callBack(res);
    }, 500)

  }
}
module.exports = {
  ajax: ajax
}