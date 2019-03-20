// components/home/content/hot/hot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: Number
    },
    shopName: {
      type: String
    },
    man: {
      type: String
    },
    bookTime: {
      type: String
    },
    projectName: {
      type: String
    },
    serviceTime: {
      type: String
    },
    status: {
      type: Number
    }
  },
  relations: {
    './navbar': {
      type: 'parent', // 关联的目标节点应为父节点
      linked(target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged(target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked(target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToBookTime(e) {
      console.log(e);
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../../../book-time/book-time?id=' + id
      })
    },
    look(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../../../book-details/book-details?id=' + id
      })
    },
    service(e) {
      let id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '提示',
        content: '是否确认服务',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('确认')
          } else {
            console.log('取消')
          }
        }
      });
    }
  },
})