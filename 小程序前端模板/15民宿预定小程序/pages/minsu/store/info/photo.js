//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    photos:[],
    photos_url:[],
  },
  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.manage/getminsuPhoto', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
    }, function (data) {
      var photos = wxb.that.data.photos;
      var photos_url = wxb.that.data.photos_url;
      var a = '';
      for (a in data.list) {
        console.log(data.list[a])
        photos.push(data.list[a].photo);
        photos_url.push(data.list[a].photo_url);
      }
      wx.hideLoading();
      wxb.that.setData({
        photos: photos,
        photos_url: photos_url,
      })
    });
  },
  create:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.manage/setminsuPhoto', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      photos: wxb.that.data.photos, 
    }, function (data) {
      wx.showToast({
        title: '发布成功',
      });
    });
  },
  delele: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var photos = that.data.photos;
    var newphotos = [];
    for (var a in photos) {
      if (a != index) {
        newphotos.push(photos[a]);
      }
    }
    var photos_url = that.data.photos_url;
    var newphotos_url = [];
    for (var a in photos_url) {
      if (a != index) {
        newphotos_url.push(photos_url[a]);
      }
    }
    that.setData({
      photos: newphotos,
      photos_url: newphotos_url,
    });
  },
  upload: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
      wxb.fileupload('', function (data) {
        var photos = wxb.that.data.photos;
        var photos_url = wxb.that.data.photos_url;
        console.log(data);
        photos.push(data.img);
        photos_url.push(data.img_url);
        wx.hideLoading();
        wxb.that.setData({
          photos: photos,
          photos_url: photos_url,
        })
      });

  },
})
