// components/navbar.js
var util = require('../../../utils/util.js')
var http = require('../../../utils/http.js');
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotList: {
      type: Array,
      value: []
    }
  },

  relations: {
    './hot': {
      type: 'child', // 关联的目标节点应为子节点
      linked(target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged(target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked(target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: ["热 门", "养生学堂", "活动推荐", "精彩分享"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  lifetimes: {
    ready() {
      var that = this;
      this.refresh();
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function(e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    refresh: function() {
      wx.showToast({
        title: '刷新中',
        icon: 'loading'
      });

      let mockData = {
        "hot|5": [{
          'id': '@id',
          'imgPath': Random.image('60x60', '#04a1f7', '#FFF', 'png', ''),
          "title": '@cname', //中文名称
          "intro": Random.cparagraph(2), //生成随机的中文段落,2个句子
        }]
      }
      http.ajax('get', '/api/test', {}, (res) => {
        console.log(res)
      }, mockData)
      wx.hideToast()

    },

    //使用本地 fake 数据实现继续加载效果
    nextLoad: function() {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 4000
      })
      var next = util.getNext();
      console.log("continueload");
      var next_data = next.data;
      this.setData({
        feed: this.data.feed.concat(next_data),
        feed_length: this.data.feed_length + next_data.length
      });
      setTimeout(function() {
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 2000
        })
      }, 3000)
    }
  }
})