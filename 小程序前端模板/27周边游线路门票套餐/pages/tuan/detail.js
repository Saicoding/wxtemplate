var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    taocan_id: 0,
    detail: [],
    date_on: '',
    dates: [],
    package: [],
    day: '',
    is_on: 0,

    color: '',
  },

  telPhone: function(e){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.detail.detail.taocan_tel,
    })
  },

  photoclick: function (e) {
    // console.log(wxb.that.data.detail.photos);
    wx.previewImage({
      urls: wxb.that.data.detail.photos,
    })
  },

  map: function () {
    wx.openLocation({
      latitude: Number.parseFloat(wxb.that.data.detail.detail.lat),
      longitude: Number.parseFloat(wxb.that.data.detail.detail.lng),
      scale: 28
    });
  },
  open_view: function (e) {
    var id = e.target.dataset.id;
    var packages = this.data.package;
    var a = 0;
    for (var a in packages) {
      if (packages[a].package_id == id) {
        packages[a]['is_show'] = packages[a]['is_show'] ? 0 : 1;
      }
    }
    wxb.that.setData({
      package: packages,
    });
  },
  getDateList: function (e) {
    this.setData({
      day: e.target.dataset.day,
      package: [],
    })
    this.getPrice();
  },

  getPrice: function () {
    wx.showLoading({
      title: '正在加载中。。。',
    })
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.Post('/api/taocan.index/price', {
      'taocan_id': wxb.that.data.taocan_id,
      'date': wxb.that.data.day,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        package: data.package,
      });
    });
  },
  onShow: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();
  },
  onLoad: function (e) {
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
    var taocan_id = e.taocan_id;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.style();

    wx.showLoading({
      title: '正在加载中。。。',
    })
    wxb.Post('/api/taocan.index/detail', {
      'taocan_id': taocan_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        coupons: data,
        detail: data,
        taocan_id: e.taocan_id,
        day: data.date.date,
        dates: data.date.day,
        package: data.package,
        is_on: 1,
      });

      var day = wxb.getDay();
      if (day.day1 != wxb.that.data.day) {
        var dates = wxb.that.data.dates;
        var _days = {
          'date': day.day1,
          'day': day.day3,
          'week': weekArray[day.day4],
        }
        dates.push(_days);
        wxb.that.setData({
          day: day.day1,
          dates: dates,
          is_on: 0,
        })
        wxb.that.getPrice();
      }
    });
  },
})
