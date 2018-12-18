var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    honor_id: 0,
    date: '',
    honor_name: '',

  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    wxb.that.setData({
      honor_id: e.honor_id,
    });

    if (e.honor_id>0){
      this.gethonorDetail();
    }


  },

  /**
   * 荣誉奖励
   */
  setHonor: function(e){
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setHonor', {
      openid: wxb.getOpenId(),
      honor_id: wxb.that.data.honor_id,
      date: wxb.that.data.date,
      honor_name: param.honor_name,
    }, function(data){
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/schoolsat/hlist',
      })
    });
  },

  /**
   * 获取奖励详情
   */
  gethonorDetail: function(e){
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/honorDetail', {
      openid: wxb.getOpenId(),
      honor_id: wxb.that.data.honor_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        date: data.date,
        honor_name: data.honor_name,
      });

      console.log("date:" + wxb.that.data.date);
      console.log("honor_name" + wxb.that.data.honor_name);
    });
  },

  /**
   * 获得时间
   */
  bindDatePickerChange: function (e) {
    wxb.that.setData({
      date: e.detail.value,
    });
  },
})