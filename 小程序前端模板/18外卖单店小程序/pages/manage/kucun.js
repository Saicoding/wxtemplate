//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    data:[],
    ids:[],
  },
  checkboxChange:function(e){
     wxb.that.setData({
       ids: e.detail.value
     });
  },
  online:function(){
      var ids = wxb.that.data.ids;
      var  idsjson = JSON.stringify(ids);
      wx.showLoading({
        title: '正在请求',
      })  
      wxb.Post('/api/waimai.manage/status',{
        openid:wxb.getOpenId(),
        ids:idsjson,
        is_online:1
      },function(data){
          wx.hideLoading();
          wxb.that.initData();
      });

  },
  unline:function(){
    var ids = wxb.that.data.ids;
    var idsjson = JSON.stringify(ids);
    wx.showLoading({
      title: '正在请求',
    })
    wxb.Post('/api/waimai.manage/status', {
      openid: wxb.getOpenId(),
      ids: idsjson,
      is_online: 0
    }, function (data) {
      wx.hideLoading();
      wxb.that.initData();
    });
  },
  initData:function(){
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
    } else {
        wxb.Post('/api/waimai.manage/getGoods',{
          openid:wxb.getOpenId(),
        },function(data){
            wxb.that.setData({
                data:data
            });
        });
    }
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function () {
          wxb.that.initData();
      })
    } else {
      wxb.that.initData();
    }
  }
})
