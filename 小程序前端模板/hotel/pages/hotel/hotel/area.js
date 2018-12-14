//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../utils/wxb.js');

Page({
  data: {
    keyword:'',
    datas:[],
    keyword: '',
  },
  input:function(e){
    wxb.that.setData({
      keyword:e.detail.value,
    });
  },
  yesbtn:function(e){
      if(!wxb.that.data.keyword){
        wx.showToast({
          image:'/img/kulian.png',
          title: '请填写关键字',
        })
      }else{
        wx.setStorageSync('search', JSON.stringify({
          id:0,
          type:9,
          name: wxb.that.data.keyword
        }));
        var page = getCurrentPages();
        wx.navigateBack({ delta: page.length - 2 });
      }
  },

  click:function(e){
    wx.setStorageSync('search', JSON.stringify({
      id: e.target.dataset.id,
      type: e.target.dataset.type,
      name: e.target.dataset.name
    })); 
    var page = getCurrentPages();
    wx.navigateBack({ delta: page.length - 2 });
  },

  ///api/hotel.data/getSearch
  onShow: function () {
     wxb.that = this;   //正确打开巅峰互联的方式
     wxb.globalData = app.globalData; //正确打开巅峰互联的方式
     var city = wxb.getCity();
     wxb.Post('/api/hotel.data/getSearch',{
       city_id: city.city_id,
     },function(data){
        wxb.that.setData({
          datas:data
        });
     });
  }
})
