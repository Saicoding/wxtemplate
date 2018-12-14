//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    datas:[],
    setting:[],
  },
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getIndex();
  },
  getIndex:function(){
    wxb.Post('/api/zhuangxiugw.index/getIndex', {
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas:data,
      });
    })
  },
  toTel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '巅峰互联装修官网',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
