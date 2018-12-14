//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],
    setting: [],//service_tel

    photos: [],
  },

  /**
   * 更多课程介绍
   */
  courseMore: function(e){
    wx.navigateTo({
      url: '/pages/kecheng/index',
    })
  },

  /**
   * 拨打电话
   */
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
    console.log(wxb.that.data.setting);

  },

  onLoad: function () {
    wxb.that = this;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getIndex();
  },

  /**
   * 预览照片
   */
  lookPhoto: function (e) {
    console.log(e);
    var url = e.target.dataset.url;
    wx.previewImage({
      current: url,
      urls: wxb.that.data.photos,
    })
  },

  /**
   * 加载首页数据
   */
  getIndex: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/getIndex', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      var array = wxb.that.data.photos;
      for (var index in data.photos) {
        array.push(data.photos[index].photo);
      }
      wxb.that.setData({
        datas: data,
        photos: array,
      });
    });
  },

  onShareAppMessage: function (res) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: "教育官网",
      path: '/pages/index/index',
    }
  }
})
