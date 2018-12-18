//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:[],
    city:[],
  },

  changecity:function(e){
      var page = getCurrentPages();
      wxb.setCity(e.target.dataset.id,e.target.dataset.name);
      var page = getCurrentPages();
      wx.navigateBack({ delta: page.length-2});
  },

  onShow:function(){
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    wxb.getCityList(function (cityList) {
      console.log(cityList);
      var cityPinyin = [];
      var a;
      for (a in cityList) {
        if (cityPinyin.indexOf(cityList[a].initial) == -1) {
          cityPinyin.push(cityList[a].initial);
        }
      }
      cityPinyin.sort();
      wxb.that.setData({
        cityList: cityList,
        cityPinyin: cityPinyin,
        city: wxb.getCity(),
      });

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    
  }
})