//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    gps_addr:'',
    lng:'',
    lat:''
  },

  map:function(){
    wx.chooseLocation({
      success:function(data){
         wxb.that.setData({
            gps_addr:data.address,
            lng:data.longitude,
            lat:data.latitude
         });
      }
    });
  },  
  fromSubmit:function(data){
      var data = data.detail.value;
      if(!data.name){
        wx.showToast({
          image:'/img/kulian.png',
          title: '联系人不能为空',
        })
      }else if(!data.mobile){
        wx.showToast({
          image: '/img/kulian.png',
          title: '手机号码不能为空',
        })
      }else if(!data.idcard){
        wx.showToast({
          image: '/img/kulian.png',
          title: '身份证号码不能为空',
        })
      }else if(!data.gps_addr){
        wx.showToast({
          image: '/img/kulian.png',
          title: '请选择GPS定位',
        })
      }else if(!data.lng || !data.lat){
        wx.showToast({
          image: '/img/kulian.png',
          title: '请选择GPS定位',
        })
      } else if (!data.address) {
        wx.showToast({
          image: '/img/kulian.png',
          title: '请选择GPS定位',
        })
      }else{
        data.openid = wxb.getOpenId();
        wxb.Post('/api/user/setAddress',data,function(addr){
            if(addr.address_id){
              var json = JSON.stringify(addr);
              wx.setStorageSync('wxbaddr', json);
              wx.showToast({
                title: '添加地址成功',
                success:function(){
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '/pages/mall/buy',
                    })
                  },2000);
                }
              })
              

            }else{
              wx.showToast({
                image: '/img/kulian.png',
                title: '添加地址失败',
              })
            }
        });
      }
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  }
})
