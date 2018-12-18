var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    coupons:[],
  },
 
 onLoad: function () {
   wxb.globalData = app.globalData; //正确打开巅峰互联的方式
   wxb.that = this;   //正确打开巅峰互联的方式

   wxb.Post('/api/activity/geTactivity', {
   }, function (data) {
     wxb.that.setData({
       coupons: data
     });
   });
  },

  onShow: function () {
    
  },
  //  api/user/Receive/；
  receive:function(e){
    var activity_id = e.target.dataset.activity_id;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/user/Receive/', {
      activity_id :  activity_id,  
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.showToast({
        title: '领取成功！！！',
        duration: 5000,
      })
    });
  },
   onShareAppMessage: function (res) {

    return {
      title: '快来抢红包',
      path: '/pages/hotel/coupon',
      success: function (res) {
       console.log(res);
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
