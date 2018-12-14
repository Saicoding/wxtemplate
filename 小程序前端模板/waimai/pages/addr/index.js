//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    data:[],
  },
  select:function(e){
      var address_id = e.target.dataset.id;
      var data = wxb.that.data.data;
      var addr = [];
      for(var a in data){
          if(data[a].address_id == address_id){
            addr = data[a];
            break;
          }
      }
      if(addr){
         var json = JSON.stringify(addr);
         wx.setStorageSync('wxbaddr', json); 
         wx.redirectTo({
           url: '/pages/mall/buy',
         })
      }else{
        wx.showToast({
          image:'/img/kulian.png',
          title: '请选择正确的地址',
        })
      }
  },
  add:function(){
     wx.redirectTo({
       url: '/pages/addr/add',
     })
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '正在加载数据',
    })
    wxb.Post('/api/user/getAddress',{
      openid:wxb.getOpenId()
    },function(data){
      wx.hideLoading();
        wxb.that.setData({
          data:data
        });
    });

  }
})
