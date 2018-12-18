//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    date: [],
    data: [],
    array: [],
    max_num: 1,
    index: 0,
    num: 1,
    id: '',
    lijian: 0,
    totalprice: 0,
    showtotal: 0,
    hongbao: 0,
    apphiden: true,
    canuseHongbao: 0,
    hongbaoId: 0,
    nousehongbao: 0,
  },
  onShow: function (e) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
      var bgend = wxb.getBgEndDate();
      if (bgend) {
        wxb.that.setData({
          date: bgend
        });
      }
      console.log(wxb.that.data.date);
      this.checkOrder();
    } else {
      var bgend = wxb.getBgEndDate();
      if (bgend) {
        wxb.that.setData({
          date: bgend
        });
      }
      console.log(wxb.that.data.date);
      this.checkOrder();
    }
  },

  onLoad: function (e) {
    this.setData({
      id: e.id,
    });
    wxb.that = this;
    wxb.style();
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      num: wxb.that.data.array[e.detail.value],
    });
    wxb.that.jisuan();
  },
  nouse: function (e) {
    wxb.that.setData({
      nousehongbao: 0,
      apphiden: true,
      hongbao: 0,
      hongbaoId: 0,
    });
    wxb.that.jisuan();
  },
  yesuse: function (e) {
    console.log(e);
    wxb.that.setData({
      nousehongbao: 1,
      apphiden: true,
      hongbao: e.target.dataset.money,
      hongbaoId: e.target.dataset.id,
    });
    wxb.that.jisuan();
  },
  jisuan: function () {
    var lijian = parseFloat(wxb.that.data.lijian);
    var totalprice = parseFloat(wxb.that.data.totalprice);
    var num = parseFloat(wxb.that.data.num);
    var showtotal = parseFloat(totalprice * num);
    var youhui = parseFloat(lijian * num);
    var hongbao = parseFloat(wxb.that.data.hongbao);
    var needpay = parseFloat(showtotal - youhui - hongbao);
    needpay = needpay.toFixed(2);
    wxb.that.setData({
      lijian: youhui,
      showtotal: needpay > 0 ? needpay : 0,
    });
  },
  usercoupon: function (e) {
    if (wxb.that.data.canuseHongbao > 0) {
      wxb.that.setData({
        apphiden: false
      });
    } else {
      wx.showToast({
        title: '没有可用的红包',
      })
    }
  },

  checkOrder: function (e) {
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post("/api/hotelgw.member/checkOrder", {
      openid: wxb.getOpenId(),
      bg_date: wxb.that.data.date.bg_date,
      end_date: wxb.that.data.date.end_date,
      id: wxb.that.data.id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        data: data,
        max_num: data.maxnum,
        lijian: data.lijian,
        totalprice: data.totalprice,
        showtotal: data.totalprice,

      });
      var datas = wxb.that.data.array;
      for (var i = 1; i <= wxb.that.data.max_num; i++) {
        datas.push(i + " 间");
      }
      wxb.that.setData({
        array: datas,
      });
      wxb.Post('/api/user/getUseCoupon', {
        type: 1,
        openid: wxb.getOpenId(),
        money: wxb.that.data.showtotal,
      }, function (data2) {
        wx.hideLoading();
        wxb.that.setData({
          canuseHongbao: data2.totalNum,
          hongbaolist: data2.list,
        });
      });
    });
  },
  resvRoom: function (e) {
    var params = e.detail.value;
    console.log(e);
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotelgw.member/create', {
      openid: wxb.getOpenId(),
      id: wxb.that.data.id,
      num: wxb.that.data.num,
      name: params.name,
      mobile: params.mobile,
      idcard: params.id_card,
      bg_date: wxb.that.data.date.bg_date,
      end_date: wxb.that.data.date.end_date,
      hongbaoId: wxb.that.data.hongbaoId,
    }, function (data) {
      console.log(data);
      wx.navigateTo({
        url: '/pages/order/detail?id=' + data.id,
      })
    });
  }
})
