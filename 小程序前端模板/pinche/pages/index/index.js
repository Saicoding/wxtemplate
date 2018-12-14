//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({
  data: {
    color: '',
    type: 0,
    page: 1,
    more: 1,

    datas: [],

    bannner: [],

    begin: '',
    end: '',
    channel: '',
    bg_time: '',
    vacancy: '',

  },

  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: '110',
    })


    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone, 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })


    // console.log(e);
    // var phone = e.target.dataset.phone;
    // var status = e.target.dataset.status;
    // wx.showToast({
    //   title: e.target.dataset.phone,
    // })
    // if (e.target.dataset.status == 0) {
    //   wx.makePhoneCall({
    //     phoneNumber: e.target.dataset.phone,
    //   })
    // } else {
    //   wx.showToast({
    //     title: '已结束！',
    //   })
    // }
  },


  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      page: 1,
      datas: [],
    });
    this.getIndex();
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();

  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    if (e != null) {
      wxb.that.setData({
        type: e.type,
        begin: e.chufa,
        end: e.mudidi,
        channel: e.tujing,
        bg_time: e.begin + " " + e.time,
        vacancy: e.num,
      });
    }
    // console.log("type: " + wxb.that.data.type);
    this.getIndex();
  },

  loadMore: function (e) {
    this.getIndex();
  },

  getIndex: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/pinche.index/getIndex', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.type,
      begin: wxb.that.data.begin,
      end: wxb.that.data.end,
      channel: wxb.that.data.channel,
      bg_time: wxb.that.data.bg_time,
      vacancy: wxb.that.data.vacancy,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
        banner: data.banner,
      })
    });
  },
})
