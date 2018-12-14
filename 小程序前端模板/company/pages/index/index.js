//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    datas: [],
    // service_tel: "0551-12345678", 服务电话
    // complaint_tel: "0551-12345678" 投诉电话
    setting: [],
  },

  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    console.log(wxb.that.data.setting);
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    this.getHome();
  },

  getHome: function (e) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/companygw.index/index', {

    }, function (data) {
      wx.hideLoading();
      console.log(data.banner);
      wxb.that.setData({
        datas: data,
      })
    });
  },

  calling: function () {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  jjfa: function(){
    wx.navigateTo({
      url: '/pages/case/index',
    })
  },
  
  cpzx: function(){
    wx.navigateTo({
      url: '/pages/product/index',
    })
  },

  qydt:function(){
    wx.navigateTo({
      url: '/pages/news/index',
    })
  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '企业官网',
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
