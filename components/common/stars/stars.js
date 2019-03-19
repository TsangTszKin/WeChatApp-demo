// components/common/starts/starts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeColor1() {
      this.setData({
        flag: 1
      });
    },
    changeColor2() {
      this.setData({
        flag: 2
      });
    },
    changeColor3() {
      this.setData({
        flag: 3
      });
    },
    changeColor4() {
      this.setData({
        flag: 4
      });
    },
    changeColor5() {
      this.setData({
        flag: 5
      });
    },
  }
})