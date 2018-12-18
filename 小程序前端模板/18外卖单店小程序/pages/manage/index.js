//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    data:[],
  },
  online:function(e){
    var is_online = e.detail.value ==true ? 1 : 0;
    wxb.Post('/api/waimai.manage/online',{
      is_online:is_online,
      openid:wxb.getOpenId()
    },function(data){
        wx.showToast({
          title: '设置成功',
        })
    });

  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function () {
        if (!wxb.checkManage()) {
          wx.showToast({
            title: '没有权限访问该页面',
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/mall/index',
                })
              }, 1000);
            }
          })
        }
      })
    }else{
      if (!wxb.checkManage()) {
        wx.showToast({
          title: '没有权限访问该页面',
          success: function () {
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/mall/index',
              })
            }, 1000);
          }
        })
      }
    }


    wxb.Post('/api/waimai.index/setting',{},function(data){
        wxb.that.setData({
          data:data
        });
    });
    
  }
})
