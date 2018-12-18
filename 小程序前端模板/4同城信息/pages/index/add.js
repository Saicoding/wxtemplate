//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,
    top: false,
    category_id: 0,

    photos: [],
    photos_url: [],

    lat: 0,
    lng: 0,
    addr: '',

    days: [],
    index: 0,
    price_id: 0,

    price: 0,
    datas: [],
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    if (e.category_id) {
      wxb.that.setData({
        category_id: e.category_id,
      });
    }

    this.getPriceList();

  },

  bindDaysPickerChange: function (e) {
    wxb.that.setData({
      index: e.detail.value,
      price: wxb.that.data.datas[e.detail.value].price,
      price_id: wxb.that.data.datas[e.detail.value].price_id,
    });
  },

  getPriceList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/tongcheng.index/getPrice', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      var array = [];
      for (var index in data) {
        array.push(data[index].day_num);
      }
      wxb.that.setData({
        days: array,
        datas: data,
      });
    });
  },

  map: function () {
    wx.chooseLocation({
      success: function (data) {
        wxb.that.setData({
          lat: data.latitude,
          lng: data.longitude,
          addr: data.address,
        })
      }
    });
  },

  switchTopChange: function (e) {
    this.setData({
      top: e.detail.value,
      price: wxb.that.data.datas[wxb.that.data.index].price,
      price_id: wxb.that.data.datas[wxb.that.data.index].price_id,
    });
    console.log("change: " + wxb.that.data.top);
  },

  photos: function (e) {
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

  formBindAddInfo: function (e) {
    var params = e.detail.value;
    wx.showLoading({
      title: '提交中..',
    });

    wxb.Post('/api/tongcheng.member/addInfo', {
      openid: wxb.getOpenId(),
      price_id: wxb.that.data.price_id,
      category_id: wxb.that.data.category_id,
      info: params.content,
      tel: params.phone,
      lat: wxb.that.data.lat,
      lng: wxb.that.data.lng,
      address: wxb.that.data.addr,
      photo: wxb.that.data.photos,
    }, function (data) {
      wx.hideLoading();
      if (data != '') {
        wx.requestPayment({
          timeStamp: data.order.timeStamp,
          nonceStr: data.order.nonceStr,
          package: data.order.package,
          signType: data.order.signType,
          paySign: data.order.paySign,
          success: function (res) {
            wx.showToast({
              title: '支付成功',
            })
          },
        });
      }
      wx.redirectTo({
        url: '/pages/index/index',
      })
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
})
