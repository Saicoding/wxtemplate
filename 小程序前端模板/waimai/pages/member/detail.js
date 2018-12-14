//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    data:[],
  },

  payment:function(){
    wxb.Post('/api/waimai.order/getPayment', {
      id: wxb.that.data.data.id,
      openid: wxb.getOpenId()
    }, function (res) {
      

      wx.requestPayment({
        timeStamp: res.order.timeStamp,
        nonceStr: res.order.nonceStr,
        package: res.order.package,
        signType: res.order.signType,
        paySign: res.order.paySign,
        complete: function () {
          wxb.that.initData(wxb.that.data.data.id);

        },
      })

    });
  },

  initData:function(id){
    wxb.Post('/api/waimai.order/getOrderDetail',{
      id:id,
      openid:wxb.getOpenId()
    },function(data){
        wxb.that.setData({
          data:data
        });
    });
  },

  onLoad: function (option) {
    var id = option.id;
    if(!id){
      wx.showToast({
        image:'/img/kulian.png',
        title: '参数错误',
      })
    }else{
      wxb.that = this;
      wxb.style();
      if (!wxb.checkAuthLogin(true)) {
        wxb.login(function(){
          wxb.that.initData(id);
        });
      }else{
        wxb.that.initData(id);
      }
    }
    
  }
})
