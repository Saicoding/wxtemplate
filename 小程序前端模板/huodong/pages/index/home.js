// pages/arond/fragment/home.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],

    length: 0,

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentTab: 0,
    swiperList: 0,
    grids:[0,1,2],
    searchList0: ["1", "2", "3", "4", "5"],
    cityinfo:[],
    navs:[],
    destination:[],
    package:[],
    page:1,
    more:0,

    color: '',
  },
  /** 
   * 滑动切换tab 
   **/
  bindChange: function (e) {
    console.log(e.detail.current)
    this.setData({ currentTab: e.detail.current });
  },
  more: function (e) {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.getCityList(function (cityList) {
      wxb.dingWei(cityList, function (cityinfo) {
     
        wxb.that.setData({
          cityinfo: cityinfo
        });
        wxb.that.getDatas();
      });
    });
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    
    var cityinfo = wxb.getCity();
    if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
      wxb.that.setData({
        cityinfo: cityinfo
      });
      this.getDatas();
    }

  },
  getDatas: function (type = 0) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/taocan.data/getIndex', {
      type: type,
      city_id : wxb.that.data.cityinfo.city_id,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();

      var num = Math.ceil(data.nav.length / 8);

      wxb.that.setData({
        imgUrls:data.banner,
        navs:data.nav,
        length: num,
        destination: data.destination,
        swiperList: data.destination_num,
        package: data.package,
      })
    });
  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '周边游',
      path: '/pages/index/home',
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