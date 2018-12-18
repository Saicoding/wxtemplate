//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    detail:[],
  },


  formBindsubmit:function(e){
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    var pagams = e.detail.value;
    wxb.Post('/api/hotel.manage/setHotelDetail', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      is_wifi: pagams.is_wifi,
      is_water: pagams.is_water,
      is_hairdrier: pagams.is_hairdrier,
      is_airconditioner: pagams.is_airconditioner,
      is_elevator: pagams.is_elevator,
      is_fitnessroom: pagams.is_fitnessroom,
      is_swimmingpool: pagams.is_swimmingpool,
      is_sauna: pagams.is_sauna,
      is_westernfood: pagams.is_westernfood,
      is_chinesefood: pagams.is_chinesefood,
      is_disability: pagams.is_disability,
      is_smokeless: pagams.is_smokeless,
      is_stop: pagams.is_stop,
      is_cereal: pagams.is_cereal,
      is_airportpickup: pagams.is_airportpickup,
      is_station: pagams.is_station,
      is_cabs: pagams.is_cabs,
      is_luggage: pagams.is_luggage,
      is_carrental: pagams.is_carrental,
      is_disabled: pagams.is_disabled,
      is_conference: pagams.is_conference,
      is_express: pagams.is_express,
      is_washclothes: pagams.is_washclothes,
      is_merchant: pagams.is_merchant,
      is_awaken: pagams.is_awaken,
      is_deposit: pagams.is_deposit,
      is_creditcard: pagams.is_creditcard,
      is_reception: pagams.is_reception,
      is_foreignguests: pagams.is_foreignguests,
      is_spa: pagams.is_spa,
      is_chess: pagams.is_chess,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
    })
  },

  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/getHotelDetail', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
         detail:data,
      });
    });
  }
})
