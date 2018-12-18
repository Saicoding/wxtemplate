//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    length: 0,
    pindex: 0,

    datas: [],
  },

  onShow: function (e) {
    wxb.that = this;
    wxb.style();
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getIndex();
  },

  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/yiliao.index/getIndex', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      if (data.category) {
        var num = Math.ceil(data.category.length / 8);
        wxb.that.setData({
          length: num,
        });
      }

      // var num = Math.ceil(data.category.length / 8);
      wxb.that.setData({
        datas: data,
        // length: num,
      });
    });
  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '宝兔兔 医疗预约',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})
