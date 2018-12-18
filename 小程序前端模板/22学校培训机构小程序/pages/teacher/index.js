//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getTeacherList();
  },

  /**
   * 加载师资力量
   */
  getTeacherList: function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/getTeacher', {
      openid: wxb.getOpenId(),
    }, function(data){
      wx.hideLoading();
      wxb.that.setData({
        datas: data.list,
      });
    });
  }
})
