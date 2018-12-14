// detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    app_screen: true,
    qrcode_dialog: 1,
    company_id: '',
    qrcode_url: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/company.store/getDetail', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
        detail: data,
        company_id: data.company_id,
        })
      
    });
    //this.getQrcodeInfo();
  },

  show_qrcode: function(e){
    wx.showLoading({
      title: '正在加载中..',
    });
    
      wxb.Post('/api/company.data/qrcord', {
        openid: wxb.getOpenId(),
        id: wxb.that.data.company_id,
        path: 'pages/store/detail?company_id=' + wxb.that.data.company_id,
      }, function (data) {
        wx.hideLoading(),
        wxb.that.setData({
          qrcode_url: data,
          
        })
      })

      this.setData({
        qrcode_dialog: this.data.qrcode_dialog == 1 ? 0 : 1,
        app_screen: false,
      });
  },


  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.detail.tel,
    })
  },

  app_screen: function (e) {
    this.setData({
      qrcode_dialog: 1,
      app_screen: true,
    });
  },
})