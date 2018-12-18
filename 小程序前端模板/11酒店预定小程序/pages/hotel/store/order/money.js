//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../../../utils/wxb.js');
Page({
  data: {
    end_date: '0000-00',
    date: '0000-00',
    datas: [],
    sumMoeny:"0.00",
  },
  onLoad: function () {
    this.getDatas(0,1);
  },
  selectdate: function (e) {
    wxb.that.setData({
      date: e.detail.value,
      datas: [],
      page:1,
    });
    this.getDatas(e.detail.value,1);
  },
  more:function(){
     var date = this.data.date;
      this.getDatas(date);
  },
  getDatas: function (date,num=0) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotel.manage/count', {
      code: wxb.getStoreCode(),
      openid: wxb.getOpenId(),
      date: date,
      page: wxb.that.data.page,
      getNum:num,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      var val = '';
      for (val in data.list) {
        datas.push(data.list[val]);
      }
      if (data.sum != ''){
        wxb.that.setData({
          sumMoeny: data.sum,
        });
      }
      console.log(data.end_date);
      wxb.that.setData({
        datas: datas,
        end_date: data.end_date,
        date: data.date,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });
  }
})
