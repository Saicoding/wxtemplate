var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',

    language_id: 0,
    language: '',
    level: '',

    english: [],
    eArray: [],

    languages: [],
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
      language_id: e.language_id,
    });

    this.getConfigInfo();

    if (e.language_id > 0)
      this.getLanguageDetail();
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {

      var index = 0;
      var array = wxb.that.data.eArray;
      for (index in data.english) {
        array.push(data.english[index].scale_name);
      }


      wxb.that.setData({
        eArray: array,

        english: data.english,
        languages: data.language,
      });
    });
  },

  /**
   * 语种
   */
  bindYZPickerChange: function (e) {
    wxb.that.setData({
      index: e.detail.value,
      language: wxb.that.data.languages[e.detail.value],
    });
  },

  /**
   * 熟练程度
   */
  bindSLPickerChange: function (e) {
    wxb.that.setData({
      eIndex: e.detail.value,
      level: wxb.that.data.english[e.detail.value].scale_id,
    });
  },

  /**
   * 添加语言能力
   */
  addYuyanItem: function (e) {
    var param = e.detail.value;

    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/setLanguage', {
      openid: wxb.getOpenId(),
      language_id: wxb.that.data.language_id,
      language: wxb.that.data.language,
      level: wxb.that.data.level,
    }, function (data) {
      wx.hideLoading();
      wx.redirectTo({
        url: '/pages/resume/skill/ylist',
      })
    });
  },

  /**
   * 获取语言能力详情
   */
  getLanguageDetail: function (e) {
    wx.showLoading({
      title: '提交中',
    })

    wxb.Post('/api/job.member/languageDetail', {
      openid: wxb.getOpenId(),
      language_id: wxb.that.data.language_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        language_id: data.language_id,
        language: data.language,
        level: data.level,
      });

      for (var index in wxb.that.data.english) {
        if (wxb.that.data.english[index].scale_id == data.level) {
          wxb.that.setData({
            eIndex: index,
          });
        }
      }

    });
  }
})