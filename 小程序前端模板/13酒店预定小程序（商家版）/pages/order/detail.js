var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    id:0,
    detail:[],
    setting:[],
  },
  telhotel:function(){
      wx.makePhoneCall({
        phoneNumber: wxb.that.data.detail.tel
      })
  },
  telkefu:function(){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel
    })
  },
  openhotel:function(){
    wx.redirectTo({
      url: '/pages/hotel/hotel/detail?id=' + wxb.that.data.detail.hotel_id,
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
    wx.showLoading({
      title: '正在支付',
    })
    wxb.Post('/api/hotelgw.member/getPayment', {
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
            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
            })
            wxb.Post('/api/hotelgw.member/orderDetail', {
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
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that.setData({
      id:options.id
    });
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post('/api/hotelgw.member/orderDetail',{
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