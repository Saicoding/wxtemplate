//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    cat: 0,
    more:0,
    data:[],
    page:1,
    
  },
  onclick_menu: function (e) {
    wxb.that.setData({
      cat: e.target.dataset.id,
      page:1,
    });
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post('/api/waimai.order/orderList', {
      openid: wxb.getOpenId(),
      page:wxb.that.data.page,
      type:wxb.that.data.cat
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        data: data.list,
        more: data.more
      });

    });

  },
  more:function(){
      var page = wxb.that.data.page+1;
      wxb.that.setData({
        page:page
      });
      wxb.Post('/api/waimai.order/orderList', {
        openid: wxb.getOpenId(),
        page: wxb.that.data.page,
        type: wxb.that.data.cat
      }, function (data) {
        var list = wxb.that.data.data;
        for(var  as in data.list){
          list.push(data.list[a]);
        }
        wxb.that.setData({
          data: list,
          more: data.more
        });

      });
  },
  initDat:function(){
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post('/api/waimai.order/orderList', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        data: data.list,
        more: data.more
      });

    });
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function(){
          wxb.that.initData();
      });
    }else{
       wxb.that.initData();
    }
 

  }
})
