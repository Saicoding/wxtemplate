var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    photoshow: true,
    showinfo: true,
    taocan_id: 0,
    detail: [],
    date_on: '',
    dates: [],
    package: [],
    day: '',
    is_on: 0,
  },

  photoclick: function (e) {
    this.setData({
      photoshow: false
    });
  },
  photobgclick: function (e) {
    this.setData({
      photoshow: true
    });
  },

  showinfo: function (e) {
    this.setData({
      showinfo: false
    });
  },

  showinfobg: function (e) {
    this.setData({
      showinfo: true
    });
  },
  map: function () {
    wx.openLocation({
      latitude: wxb.that.data.detail.detail.lat,
      longitude: wxb.that.data.detail.detail.lng,
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
    wxb.Post('/api/nongjialegw.data/price', {
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
  },
  onLoad: function (e) {
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式

    wx.showLoading({
      title: '正在加载中。。。',
    })
    wxb.Post('/api/nongjialegw.data/detail', {
      taocan_id: e.taocan_id,
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

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '农家乐商家主页',
      path: '/pages/homepage/home/taocan/detail?taocan_id=' + wxb.that.taocan_id,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }

})
