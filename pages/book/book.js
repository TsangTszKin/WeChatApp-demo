//index.js

var util = require('../../utils/util.js')
var http = require('../../utils/http.js');
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    imgUrls: [
      '../../images/yuantiao.jpg',
      '../../images/muwu.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 300,
    screenWidth: 0,
    screenHeight: 0,
    coverImgwidth: 0,
    coverImgheight: 0,

    activeIndex: 3,
    homeList: [],
    projectList: [],
    culinarianList: [],
    bookList: []
  },
  init() {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          coverImgwidth: res.windowHeight,
          coverImgheight: res.windowWidth,
        });
      }
    });
  },
  coverImageLoad: function(e) {
    var _this = this;
    var $width = e.detail.width, //获取图片真实宽度  
      $height = e.detail.height,
      ratio = $width //图片的真实宽高比例  
    var viewWidth = _this.data.screenWidth, //设置图片显示宽度，  
      viewHeight = viewWidth //计算的高度值     
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  tabChange(e) {
    console.log('e', e);
    if (Number(e.detail) != this.data.activeIndex) {
      this.setData({
        activeIndex: e.detail
      })
      this.refresh();
    }

  },
  onLoad: function() {
    this.init();
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  lower: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
    console.log("lower")
  },
  refresh: function() {
    console.log("Number(this.data.activeIndex)", Number(this.data.activeIndex));
    let self = this;
    wx.showToast({
      title: '刷新中',
      icon: 'loading'
    });


    switch (Number(this.data.activeIndex)) {
      case 0:
        {
          let mockData = {
            "homeList|5": [{
              'id|+1': 1,
              'imgPath': "",
              "title|20-50": 'x',
              "address|5-10": 'x',
              "time": '02-05'
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            console.log(res);
            self.setData({
              homeList: res.data.homeList
            });
            wx.hideToast()
          }, mockData)
          break;
        }

      case 1:
        {
          let mockData = {
            "projectList|5": [{
              'id|+1': 1,
              'imgPath': "",
              "title|3-10": 'x',
              "intro|5-10": 'x',
              "functions|1-2": ["湿热", "上火", "头晕"]
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            console.log("projectList", res);
            self.setData({
              projectList: res.data.projectList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
      case 2:
        {
          let mockData = {
            "culinarianList|5": [{
              'id|+1': 1,
              "name|3-5": 'x'
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            console.log("culinarianList", res);
            self.setData({
              culinarianList: res.data.culinarianList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
      case 3:
        {
          let mockData = {
            "bookList|5": [{
              'id|+1': 1,
              "shopName|4-8": 'x',
              "man|3": 'x',
              "bookTime": '08:00~09:00',
              "projectName|3-10": "x",
              "serviceTime": '2019年3月9日 08:00',
              "status|1": [0, 1, 2] //已服务，待签到，待服务
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            console.log("bookList", res);
            self.setData({
              bookList: res.data.bookList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
    }



  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function() {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    })

    switch (Number(this.data.activeIndex)) {
      case 0:
        {
          let mockData = {
            "homeList|5": [{
              'id|+1': 1,
              'imgPath': "",
              "title|20-50": 'x',
              "address|5-10": 'x',
              "time": '02-05'
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            // console.log(res);
            let homeList = self.data.homeList;
            res.data.homeList.forEach(element => {
              homeList.push(element);
            })
            self.setData({
              homeList: homeList
            });
            wx.hideToast()
          }, mockData)
          break;
        }

      case 1:
        {
          let mockData = {
            "projectList|5": [{
              'id|+1': 1,
              'imgPath': "",
              "title|20-50": 'x',
              "intro|5-10": 'x',
              "functions|1-5": ["湿热", "上火", "头晕"]
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            let projectList = self.data.projectList;
            res.data.projectList.forEach(element => {
              projectList.push(element);
            })
            self.setData({
              projectList: projectList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
      case 2:
        {
          let mockData = {
            "culinarianList|5": [{
              'id|+1': 1,
              "name|3-5": 'x'
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            let culinarianList = self.data.culinarianList;
            res.data.culinarianList.forEach(element => {
              culinarianList.push(element);
            })
            self.setData({
              culinarianList: culinarianList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
      case 3:
        {
          let mockData = {
            "bookList|5": [{
              'id|+1': 1,
              "shopName|4-8": 'x',
              "man|3": 'x',
              "bookTime": '08:00~09:00',
              "projectName|3-10": "x",
              "serviceTime": '2019年3月9日 08:00',
              "status|1": [0, 1, 2] //已服务，待签到，待服务
            }]
          }
          http.ajax('get', '/api/test', {}, (res) => {
            let bookList = self.data.bookList;
            res.data.bookList.forEach(element => {
              bookList.push(element);
            })
            self.setData({
              bookList: bookList
            });
            wx.hideToast()
          }, mockData)
          break;

        }
    }



  }


})