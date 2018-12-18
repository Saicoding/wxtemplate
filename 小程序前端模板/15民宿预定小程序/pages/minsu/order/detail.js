var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    detail:[],
    setting:[],
  },
  telminsu:function(){
      wx.makePhoneCall({
        phoneNumber: wxb.that.data.detail.tel
      })
  },
  telkefu:function(){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel
    })
  },
  openminsu:function(){
    wx.redirectTo({
      url: '/pages/minsu/minsu/detail?id=' + wxb.that.data.detail.minsu_id,
    })
  },
  openmap:function(){
    wx.openLocation({
      latitude: wxb.that.data.detail.lat,
      longitude: wxb.that.data.detail.lng,
      scale: 28
    });
      

  },
  getPayment:function(){
    wxb.Post('/api/minsu.order/getPayment', {
      order_id: wxb.that.data.id,
      openid: wxb.getOpenId()
    }, function (data) {
      wx.requestPayment({
        timeStamp: data.order.timeStamp,
        nonceStr: data.order.nonceStr,
        package: data.order.package,
        signType: data.order.signType,
        paySign: data.order.paySign,
        success: function (res){
            wx.showToast({
              title: '支付成功',
            })
            wxb.Post('/api/minsu.order/orderDetail', {
              order_id: wxb.that.data.id,
              openid: wxb.getOpenId()
            }, function (data) {
              wxb.that.setData({
                detail: data
              });
            });

        },
      });

    });
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that.setData({
      id:options.id
    });
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post('/api/minsu.order/orderDetail',{
      order_id:wxb.that.data.id,
      openid:wxb.getOpenId()
    },function(data){
      wxb.that.setData({
        detail: data
      });
    });

    wxb.Post('/api/data/getSetting',{},function(data){
      wxb.that.setData({
        setting: data
      });
    });

  }
})