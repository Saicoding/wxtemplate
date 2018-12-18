//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    bg_date:'0000-00-00',
    date: '0000-00-00',
    datas : [],
  },
  onLoad: function () {
    this.getDatas();
  },
  formBindsubmit: function (e) {
    var mobile = e.detail.value.mobile;
    if (mobile.length != 0) {
      this.setData({
        order: [],
        page: 1
      });
      this.getOrder(this.data.type, mobile);
    }

  },
  selectdate: function (e) {
    wxb.that.setData({
      date: e.detail.value,
      datas : [],
    });
    this.getDatas(e.detail.value);
  },
  online:function(e){
  //  var online = e.currentTarget.dataset.online;
    var room_id = e.currentTarget.dataset.room_id;
    var online =  e.detail.value ? 1 : 0;
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在设置',
    });
    console.log(wxb.that.data.date);
    wxb.Post('/api/minsu.manage/setOnline', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      date: wxb.that.data.date,
      room_id: room_id,
      is_online: online,
    }, function (data) {
      wx.hideLoading();
  
    });
  },

  // type
  getDatas: function (date) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/minsu.manage/getRooms', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      date:date,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      wxb.that.setData({
        datas: datas,
        bg_date:data.bg_date,
        date : data.date,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }
})
   