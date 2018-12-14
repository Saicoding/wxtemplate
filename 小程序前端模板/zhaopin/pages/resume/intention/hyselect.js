// pages/member/index.js
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    length: 0,
    datas: [],

    news_str: '',//新字符串
  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getIndustry();
  },

  /**
   * 确定
   */
  toback: function () {
    var str = wxb.that.data.news_str;
    wx.setStorageSync('industryids', str);
    wx.reLaunch({
      url: '/pages/resume/intention/index',
    })
  },

  /**
   * checkBox改变
   */
  checkboxChange: function (e) {
    var array = e.detail.value;
    var datas = wxb.that.data.datas;
    console.log(e);
    console.log(datas);
    if (array.length > 5) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '最多只能选择5个',
      })

      this.setData({
        length: array.length,
      });
    } else {
      this.setData({
        length: array.length,
      });
      var str = array.join(',', array);

      this.setData({
        news_str: str,
      });
    }
  },


  /**
   * 获取行业要求列表
   */
  getIndustry: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.data/getIndustry', {
      openid: wxb.getOpenId(),
    }, function (data) {
      var str = wx.getStorageSync('industryids');
      if (str != '') {
        var array = str.split(',');
        for (var a in array) {
          data[array[a]].check = true;
        }

        wxb.that.setData({
          length: array.length,
        });
      }

      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });

    });
  },
})