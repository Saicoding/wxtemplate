var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_screen:true,
    kefu_dialog:1,
    setting:[],
  },
  godingzhi:function(e){
    wx.navigateTo({
      url: '/pages/dingzhi/customized',
    })
  },

  call_kefu:function(e){
    this.setData({
      kefu_dialog: this.data.kefu_dialog == 1 ? 0 : 1,
      app_screen: false,
    });
  },

  app_screen: function(e) {
    this.setData({
      kefu_dialog: 1,
      app_screen: true,
    });
  },
  onShow:function(e){
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
  },
  calling: function () {
    console.log(wxb.that.data.setting.service_tel);
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    });
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    console.log(wxb.globalData)
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
      wx.showToast({
        title: '开始登陆',
        duration:3000
      })
    }
    wxb.Post('/api/data/getSetting',{},function(data){

        wxb.that.setData({
          setting:data
        });

    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      path: '/page/dingzhi/index',
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
  },


 

})