//index.js

var util = require('../../utils/util.js')
var http = require('../../utils/http.js');
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    imgUrls: [
      '../../images/muwu.jpg',
      '../../images/yuantiao.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 300,
    screenWidth: 0,
    screenHeight: 0,
    coverImgwidth: 0,
    coverImgheight: 0,


    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    hotList: []
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
  onLoad: function() {
    console.log('onLoad');
    this.init();

    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  upper: function() {
    // wx.showNavigationBarLoading()
    // this.refresh();
    // console.log("upper");
    // setTimeout(function() {
    //   wx.hideNavigationBarLoading();
    //   wx.stopPullDownRefresh();
    // }, 2000);
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
    let self = this;
    wx.showToast({
      title: '刷新中',
      icon: 'loading'
    });

    let mockData = {
      "hot|5": [{
        'id|+1': 1,
        'imgPath': "",
        "title|5-20": 'x',
        "intro|30-100": 'x',
      }]
    }
    http.ajax('get', '/api/test', {}, (res) => {
      // console.log(res);
      self.setData({
        hotList: res.data.hot
      });
      wx.hideToast()
    }, mockData)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function() {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    })
    let mockData = {
      "hot|5": [{
        'id|+1': 1,
        'imgPath': "",
        "title|5-20": 'x',
        "intro|30-100": 'x',
      }]
    }
    http.ajax('get', '/api/test', {}, (res) => {
      // console.log(res);
      let hotList = self.data.hotList;
      res.data.hot.forEach(element => {
        hotList.push(element);
      })
      self.setData({
        hotList: hotList
      });
      wx.hideToast()
    }, mockData)
    
  }


})