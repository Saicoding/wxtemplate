//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    id: 0,
    num: 1,
    lijian: 0,
    showtotal: 0,
    totalprice: 0,
    needpay: 0,
    maxnum: 0,
    numArr: [],
    hongbao: 0,
    canuseHongbao: 0,
    hongbaoId: 0,
    nousehongbao: 0,
    youhui: 0,
    apphiden: true,
    usecoupon: 0,
    name: '',
    mobile: '',
    idcard: '',
    day: '',
    color: '',
  },
  submit: function (e) {
    console.log(e);
    var myreg = /^1[34578]\d{9}$/;
    if (!myreg.test(wxb.that.data.mobile)) {
      wx.showToast({
        image: '/images/kulian.png',
        title: '手机号不正确',
      })
    } else {
      if (!wxb.that.data.name || !wxb.that.data.idcard) {
        wx.showToast({
          image: '/images/kulian.png',
          title: '入住人姓名和证件号不能为空',
        })
      } else {
        wxb.Post('/api/taocan.order/create', {
          id: wxb.that.data.id,
          num: wxb.that.data.num,
          day: wxb.that.data.day,
          hongbaoId: wxb.that.data.hongbaoId,
          name: wxb.that.data.name,
          mobile: wxb.that.data.mobile,
          idcard: wxb.that.data.idcard,
          openid: wxb.getOpenId(),
          formId: e.detail.formId
        }, function (data) {
          wx.reLaunch({
            url: '/pages/order/detail?id=' + data.id,
          })
        });
      }
    }
  },
  idcard: function (e) {
    wxb.that.setData({
      idcard: e.detail.value,
    });
  },
  name: function (e) {
    wxb.that.setData({
      name: e.detail.value,
    });
  },
  mobile: function (e) {
    wxb.that.setData({
      mobile: e.detail.value,
    });
  },
  personnums: function (e) {
    var personnums = wxb.that.data.personnums;
    wxb.that.setData({
      person_num: personnums[e.detail.value]
    });
  },
  selectnum: function (e) {
    var numArr = wxb.that.data.numArr;
    wxb.that.setData({
      num: numArr[e.detail.value]
    });
    wxb.that.jisuan();
  },
  selecttime: function (e) {
    wxb.that.setData({
      baoliu: e.detail.value
    });
  },
  jisuan: function () {
    var lijian = parseFloat(wxb.that.data.lijian);
    var hongbao = parseFloat(wxb.that.data.hongbao);
    var totalprice = parseFloat(wxb.that.data.totalprice);
    var num = wxb.that.data.num;
    var showtotal = parseFloat(totalprice * num);
    var youhui = (hongbao + lijian);
    var needpay = parseFloat(showtotal - youhui);
    needpay = needpay.toFixed(2);
    showtotal = showtotal.toFixed(2);
    wxb.that.setData({
      showtotal: showtotal,
      youhui: youhui,
      needpay: needpay,
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

  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.style();
    wxb.that.setData({
      id: options.id,
      day: options.day,
    });
  },
  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.style();
    if (!wxb.checkAuthLogin()) {
      wxb.login();
    } else {
      var bgend = wxb.getBgEndDate();
      if (bgend) {
        wxb.that.setData({
          date: bgend
        });
      } else {
        wx.redirectTo({
          url: '/pages/public/date2?type=buy&id=' + wxb.that.data.id,
        })
      }
      wx.showLoading({
        title: '正在加载中',
      })
      console.log(wxb.that.data.date);
      wxb.Post('/api/taocan.order/checkOrder', {
        openid: wxb.getOpenId(),
        id: wxb.that.data.id,
        day: wxb.that.data.day,
      }, function (data) {
        var arr = [];
        for (var i = 1; i < data.maxnum; i++) {
          arr.push(i);
        }
        var num = wxb.that.data.num > data.maxnum ? 1 : wxb.that.data.num;
        wxb.that.setData({
          room: data.room,
          lijian: data.lijian,
          totalprice: data.totalprice,
          showtotal: data.totalprice * num,
          maxnum: data.maxnum,
          num: num,
          numArr: arr,
        });
        wxb.that.jisuan();
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
    }
  }
})
