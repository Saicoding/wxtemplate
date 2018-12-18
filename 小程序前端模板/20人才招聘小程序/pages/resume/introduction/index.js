var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    introduction: '',
  },

  onShow: function () {
    wxb.that = this;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getIntroduction();
  },

  /**
   * 获取自我评价
   */
  getIntroduction: function(e){
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.member/getIntroduction', {
      openid: wxb.getOpenId(),
      honor_id: wxb.that.data.honor_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        introduction: data.introduction,
      });
    });
  },

  /**
   * 新增自我评价
   */
  setIntroduction: function(e){
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setIntroduction', {
      openid: wxb.getOpenId(),
      introduction: param.introduction,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({title: '提交成功',});
      wx.navigateBack({});
    });
  }
})