//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    class_id: '',

    datas: [],
    setting: [],
  },


  /**
   * 拨打电话
   */
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.that.setData({
      class_id: e.class_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getClassDetail();
  },

  /**
   * 获取课程详情
   */
  getClassDetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/classDetail', {
      class_id: wxb.that.data.class_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  onShareAppMessage: function (res){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: wxb.that.data.datas.title,
      path: '/pages/kecheng/detail?class_id=' + wxb.that.data.class_id,
    }
  }
})
