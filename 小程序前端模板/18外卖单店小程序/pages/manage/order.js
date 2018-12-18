//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    cat:1,
    more: 0,
    data: [],
    page: 1,
  },
  search:function(e){
    var mobile = e.detail.value.mobile;
    console.log(mobile);
    wxb.that.setData({
      page: 1,
    });
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post('/api/waimai.manage/orderList', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.cat,
      mobile:mobile
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        data: data.list,
        more: data.more
      });

    });
  },
  status:function(e){
      var id = e.target.dataset.id;
      var status = e.target.dataset.status;
      wx.showLoading({
        title: '正在加载中',
      })
      wxb.Post('/api/waimai.manage/status2', {
        openid: wxb.getOpenId(),
        id: id,
        status: status
      }, function (data2) {
        wx.hideLoading();
        var data = wxb.that.data.data;
        for(var a in  data){
          if(data[a].id == id){
              data[a].status = data2.status;
              data[a].statusmeans = data2.statusmeans;
          }
        }
        wxb.that.setData({
          data:data
        });  

      });
  },
  onclick_menu: function (e) {
    wxb.that.setData({
      cat: e.target.dataset.id,
      page: 1,
    });
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post('/api/waimai.manage/orderList', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.cat
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        data: data.list,
        more: data.more
      });

    });

  },
  more: function () {
    var page = wxb.that.data.page + 1;
    wxb.that.setData({
      page: page
    });
    wxb.Post('/api/waimai.manage/orderList', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      type: wxb.that.data.cat
    }, function (data) {
      var list = wxb.that.data.data;
      for (var as in data.list) {
        list.push(data.list[a]);
      }
      wxb.that.setData({
        data: list,
        more: data.more
      });

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
    }else{
      wxb.Post('/api/waimai.manage/orderList', {
          openid: wxb.getOpenId(),
          page: 1,
          type: wxb.that.data.cat
        }, function (data) {
          var list = wxb.that.data.data;
          for (var as in data.list) {
            list.push(data.list[a]);
          }
          wxb.that.setData({
            data: list,
            more: data.more
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
      if (!wxb.checkManage()) {
        wxb.that.initData();
      }
    }
  }
})
