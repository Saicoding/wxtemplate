//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    cityinfo: [],
    date: [],
    search: [],
    Special:[],
    appropriate: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人', '10人以上'],
    tip:'选择居住人数', 
    appropriate_num : 0,
    photos:[],
  },
  test: function (e) {

  },
  bindPickerChange:function(e){
     var num = e.detail.value;

     var appropriate = this.data.appropriate;
     this.setData({
       appropriate_num:num *1 +1,
       tip: appropriate[num],
     })
  },
  
  gominsu: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.navigateTo({
      url: '/pages/minsu/minsu/index?appropriate=' + wxb.that.data.appropriate_num ,
    })
  },
  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
   
     wx.getStorageSync('wxb_lat'),
       wx.getStorageSync('wxb_lng')
    wxb.getCityList(function (cityList) {
      wxb.dingWei(cityList, function (cityinfo) {
        wxb.that.setData({
          cityinfo: cityinfo
        });
      });
    });

    wxb.Post('/api/minsu.data/getBanner', {}, function (data) {
      wxb.that.setData({
        photos:data,
      });
    });
    // setTimeout(function(){
      wxb.Post('/api/minsu.index/getSpecial', {}, function (data) {
        wxb.that.setData({
          Special: data
        });
      });
   
    // },1000);  

  },
  onShow: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
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
    var search = wx.getStorageSync('search');
    if (search) {
      wxb.that.setData({
        search: JSON.parse(search)
      });
    }
  },

 getList:function(){

 },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '我发现一款不错的民宿小程序',
      path: res.target,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
