var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    sku_id:0,
    order_id: 0,
    detail: [],
    photos: [],
    photos_url: [],
  },

  onShow: function (e) {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that.setData({
      order_id: options.order_id,
      sku_id: options.sku_id,
    });
    console.log(options);
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wxb.Post('/api/shop.order/orderDetail', {
      order_id: wxb.that.data.order_id,
      sku_id: wxb.that.data.sku_id,
      openid: wxb.getOpenId()
    }, function (data) {
      wxb.that.setData({
        detail: data
      });
    });
  },

  formSubmit: function (e) {
    var params = e.detail.value;

    if (params.score == '') {
      wx.showToast({
        title: '请给出评分',
      })
      return;
    }

    if (params.content == '') {
      wx.showToast({
        title: '评论内容不能为空',
      })
      return;
    }

    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/shop.order/comment', {
      order_id: wxb.that.data.order_id,
      sku_id: wxb.that.data.sku_id,
      openid: wxb.getOpenId(),
      score: params.score,
      content: params.content,
      photo: wxb.that.data.photos,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.navigateBack({});
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