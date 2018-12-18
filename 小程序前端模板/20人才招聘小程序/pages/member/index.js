// pages/member/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    userinfo: [],
    tel: 0,
    status: '0',
  },

  onShow: function () {
    wxb.that = this;
  },

  tel: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.tel,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    wxb.Post("/api/data/getSetting", {}, function (data) {
      wxb.that.setData({
        tel: data.service_tel
      })
    });

    this.getStatus();
  },

  /**
   * 获取状态
   */
  getStatus: function(){
    wxb.Post('/api/job.me/getStatus', {
      openid: wxb.getOpenId(),
    }, function(data){
      if (data.status==0){
        //申请企业用户
      }else{
        //切换企业端
      }
      wxb.that.setData({
        status: data.status,
      });
    });
  },
})