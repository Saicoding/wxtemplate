//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({
  data: {
    detail:[],
    date:[],
    order:1,
    paixu:1,
    cityinfo:[],
    page:1,
    datas:[],
    more:1,
    special_id:0,
  },
  orderclick: function (e) {
    console.log(e);
    this.setData({
      paixu: 1,
      order: e.target.dataset.order,
      page:1,
      datas:[],
    });
    this.getData();

  },
  more: function () {
    this.getOrder();
  },
  paixu:function(e){
    this.setData({
      paixu: this.data.paixu == 1? 0 : 1,
    });
  },
  getData:function(){
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.getStorageSync('wxb_lat'),
      wx.getStorageSync('wxb_lng'),
      wxb.Post('/api/minsu.index/specialDetail', {
      special_id: wxb.that.data.special_id,
        lat: wx.getStorageSync('wxb_lat'),
        lng: wx.getStorageSync('wxb_lng'),
        order:wxb.that.data.order,
        city_id:wxb.that.data.cityinfo.city_id,
      }, function (data) {
        wx.hideLoading();
        var datas = wxb.that.data.datas;
        var val = '';
        for (val in data.list) {
          datas.push(data.list[val]);
        }
        wxb.that.setData({
          datas: datas,
          more: data.more,
          page: wxb.that.data.page + 1,
          detail: data.special,
        });
      })    
  },
  onLoad: function (e) {
    this.setData({
      special_id:e.id,
    });
  },
 onShow: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.that.setData({
      datas: [],
       page:1,
    });
    var cityinfo = wxb.getCity();
    if (cityinfo.city_id != wxb.that.data.cityinfo.city_id) {
      wxb.that.setData({
        cityinfo: cityinfo
      });
    }
    var bgend = wxb.getBgEndDate();
    if (bgend) {
      wxb.that.setData({
        date: bgend
      });
    }
    this.getData();
  },
})
