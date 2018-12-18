//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],
    photos: [],
  },

  onShow: function(e){
    wxb.that = this;
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getSchoolIntroduce();
  },

  /**
   * 获取学校介绍信息
   */
  getSchoolIntroduce: function(e){
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/school.index/getIntroduce', {
      openid: wxb.getOpenId(),
    }, function(data){
      wx.hideLoading();
      var array = wxb.that.data.photos;
      for (var index in data.photos){
        array.push(data.photos[index].photo);
      }

      wxb.that.setData({
        datas: data,
        photos: array,
      });
    });
  },

  /**
   * 查看照片
   */
  lookPhoto: function(e){
    wx.previewImage({
      urls: wxb.that.data.photos,
    })
  }

})
