//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  data: {
   mobile:'',
    code:'',
    mobileerr:'',
    time: 180,
    hidde: 0,
  },
  mobile:function(e){
    var myreg = /^1[34578]\d{9}$/;
    if(!myreg.test(e.detail.value)){
        this.setData({
          mobileerr:'手机号码格式不正确',
        });
    }else{
        this.setData({
          mobileerr: '',
          mobile: e.detail.value,
        });
    }
  },
  code:function(e){
    this.setData({
      code: e.detail.value,
    });
  },

  submit:function(){
    if (!wxb.that.data.mobile || !wxb.that.data.code) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请输入手机号码和验证码!',
      })
    }else{
      wxb.Post('/api/user/bindMobile/', {
        mobile: wxb.that.data.mobile,
        code: wxb.that.data.code,
        openid: wxb.getOpenId(),
      }, function (data) {
          if(data.user_id){
            var userinfo = JSON.stringify(data);
            wx.setStorageSync('userinfo', userinfo);
            wx.showToast({
              title: '绑定成功',
            })
            setTimeout(function(){
              var page = getCurrentPages();
              wx.navigateBack({ delta: page.length - 2 });
            },2000);
          }
      });  

    }
  },
  huoqu:function(){
    if (!wxb.that.data.mobile) {
      wx.showToast({
        image:'/img/kulian.png',
        title: '请输入手机号码!',
      })
    } else {
      wxb.that.setData({ hidde: 1});
        var settime = setInterval(function () {
          if (wxb.that.data.time == 0) {
            clearInterval(settime);
            wxb.that.setData({ hidde: 0, time: 180 });
          } else {
            wxb.that.data.time--;
            wxb.that.setData({ time: wxb.that.data.time });
          }
        }, 1000);
        wxb.Post('/api/login/sendSms',{
          mobile: wxb.that.data.mobile,
        },function(data){
                
        });
    }
  },
  onLoad: function (options) {
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      wxb.that = this;   //正确打开巅峰互联的方式


  }
})