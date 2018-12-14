//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    page: 1,
    more: 0,
    datas: [],
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getStudentList();
  },

  /**
   * 课程更多
   */
  loadMore: function (e) {
    this.getCourseList();
  },

  /**
   * 获取学员风采
   */
  getStudentList: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/school.index/getStudent', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;

      for (var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  }
})
