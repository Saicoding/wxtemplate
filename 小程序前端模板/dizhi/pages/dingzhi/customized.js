var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    type: 1,

    city1:[],
    city2:[],
    bgend:[],
    num1:3,
    num2:0,
  },

  submit:function(e){
    var value = e.detail.value;
    value['openid'] = wxb.getOpenId();
    wxb.Post('/api/customized.order/fabu',value,function(data){
        wx.showToast({
          title: '发布订单成功！',
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/dingzhi/order',
          })
        },1000);
        
    });
  },

  type:function(e){
    var type = e.target.dataset.type;
      if(type == 1){
       var  num1 = 3;
      }else{
       var  num1 = 15;
      }
      wxb.that.setData({
        type: type,
        num1: num1
      });
  },

  
  num1_jian:function(){
      var num1  = wxb.that.data.num1;
      if(num1<=0) return;
      num1--;
      wxb.that.setData({
        num1:num1,
      });
  },
  num1_jia:function(){
      var num1 = wxb.that.data.num1;
      if (num1 >= 999) return;
      num1++;
      wxb.that.setData({
        num1: num1,
      });
  },

  num2_jian: function () {
    var num2 = wxb.that.data.num2;
    if (num2 <= 0) return;
    num2--;
    wxb.that.setData({
      num2: num2,
    });
  },
  num2_jia: function () {
    var num2 = wxb.that.data.num2;
    if (num2 >= 999) return;
    num2++;
    wxb.that.setData({
      num2: num2,
    });
  },

  select_city: function (e) {
    wx.navigateTo({
      url: '/pages/public/city',
    })
  },

  select_city2: function (e) {
    wx.navigateTo({
      url: '/pages/public/city2',
    })
  },

  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },



  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    var city1 = wxb.getCity();
    var city2 = wxb.getCity(1);
    var bgend = wxb.getBgEndDate();

    wxb.that.setData({
        city1:city1,
        city2:city2,
        bgend:bgend
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      path: '/pages/dingzhi/customized',
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