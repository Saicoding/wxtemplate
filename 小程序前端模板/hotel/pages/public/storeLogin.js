//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  data: {
    mobile: '',
    password: '',
    mobileerr: ''
  },
  mobile: function (e) {
    var myreg = /^1[34578]\d{9}$/;
    if (!myreg.test(e.detail.value)) {
      this.setData({
        mobileerr: '手机号码格式不正确',
      });
    } else {
      this.setData({
        mobileerr: '',
        mobile: e.detail.value,
      });
    }
  },
  password: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },

  submit: function () {
    if (!wxb.that.data.mobile || !wxb.that.data.password) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请输入手机号码和验证码!',
      })
    } else {
        wxb.Post('/api/hotel.manage/mangelogin',{
          mobile:wxb.that.data.mobile,
          password:wxb.that.data.password
        },function(data){
            //console.log(data);
             wxb.setStoreCode(data.code);
             wx.showToast({
               title: '登录成功',
             })
             setTimeout(function () {
               var page = getCurrentPages();
               wx.navigateBack({ delta: page.length - 2 });
             }, 1000);
        });
    }
  },

  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  }
})