// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setting:[],
    photos:[],
    coupon:[],
  },
  receive: function (e) {
    var activity_id = e.target.dataset.id;
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/user/Receive/', {
      activity_id: activity_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.showToast({
        title: '领取成功！！！',
        duration: 5000,
      })
    });
  },
  tel:function(e){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.tel,
    })
  },

  showpic:function(e){
    var that = this;
    var index = e.target.dataset.id;
    var imageList = wxb.that.data.photos;

    wx.previewImage({
      current: imageList[index],
      urls: wxb.that.data.photos,
    });
  },
  map: function () {
    wx.openLocation({
      latitude: wxb.that.data.setting.lat,
      longitude: wxb.that.data.setting.lng,
      scale: 28,
    });
  },
  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '收银',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  initData:function(){
      wxb.Post('/api/mendian.index/index',{
        openid:wxb.getOpenId()
      },function(data){
          wxb.that.setData({
            setting:data.setting,
            photos:data.photos,
            coupon:data.coupon
          });

      });
  },
  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式

  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
   
    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function(){
        wxb.that.initData();
      });
    }else{
      wxb.that.initData();
    }
   
  }


})