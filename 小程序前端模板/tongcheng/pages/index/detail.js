//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,
    info_id: 0,
    datas: [],

    // "tel": "17756024303",
    tel: '',
    reply: 0,
  },

  onLoad: function (e) {
    console.log(e);
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.reply) {
      wxb.that.setData({
        reply: e.reply,
      });
    }

    if (e.info_id) {
      wxb.that.setData({
        info_id: e.info_id,
      });
      this.getInfoDetail();
    }


  },
  onShareAppMessage: function (res) {
    return {
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },

  onShow: function (e) {
    wxb.that = this;

    this.getInfoDetail();
  },

  zan: function (e) {
    var id = e.target.dataset.id;
    var cache = wx.getStorageSync('wxb_zan') ? wx.getStorageSync('wxb_zan') : '{}';
    var datas = JSON.parse(cache);
    var newArr = [];
    var is_zan = false;
    if (datas.info_id == id) {
      is_zan = true;
    }
    wx.setStorageSync('wxb_zan', JSON.stringify(newArr));

    if (!is_zan) {
      wxb.Post("/api/tongcheng.index/zan", {
        info_id: wxb.that.data.info_id,
        openid: wxb.getOpenId(),
      }, function (data) {
        var datas = wxb.that.data.datas;
        datas.zan_num = datas.zan_num + 1;
        wxb.that.setData({
          datas: datas,
        });
      });
    } else {
      wx.showToast({
        title: '已经赞过了',
      })
    }
  },

  /**
   * 获取详情
   */
  getInfoDetail: function (e) {
    wx.showLoading({
      title: '加载中..',
    });

    wxb.Post('/api/tongcheng.index/infoDetail', {
      openid: wxb.getOpenId(),
      info_id: wxb.that.data.info_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        tel: data.tel,
      });

      wx.setStorageSync('wxb_zan', JSON.stringify(data));
    });
  },

  telPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.tel,
    })
  }

})
