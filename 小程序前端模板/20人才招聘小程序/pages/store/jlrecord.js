var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    type: 0,
    more: 0,
    page: 1,
    datas: [],

    phone: '',
    status: '',
    apply_id: '',

    showbg: true,
    show_select: true,
  },

  onShow: function(){
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
    }

   
  },

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      datas: [],
      page: 1
    });
    this.getJobResume(type);
  },

  /**
  * 加载更多
  */
  more: function (e) {
    this.getJobResume();
  },

  /**
   * 底部选择器
   */
  select_tab: function (e) {
    console.log(e);
    var type = e.target.dataset.id;
    if (type == 0) {//对她有意思2
      wxb.that.setData({
        status: 2,
      });
      this.handleSetStyatus();
    } else if (type == 1) {//暂不合适3
      wxb.that.setData({
        status: 3,
      });
      this.handleSetStyatus();
    } else if (type == 2) {//立即沟通
      this.tel();
    }
    wxb.that.setData({
      showbg: true,
      show_select: true,
    });
  },

  /**
   * 网络处理
   */
  handleSetStyatus: function () {
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/job.manage/SetStyatus', {
      openid: wxb.getOpenId(),
      status: wxb.that.data.status,
      apply_id: wxb.that.data.apply_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        page: 1,
        datas: [],
      });
      wxb.that.getJobResume();
    });
  },


  /**
   * 拨打电话
   */
  tel: function (e) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.phone,
    })
  },

  /**
   * 删除记录
   */
  deleteApply: function (e) {
    wx.showLoading({
      title: '提交中..',
    });
    wxb.Post('/api/job.manage/deleteApply', {
      openid: wxb.getOpenId(),
      apply_id: e.target.dataset.applyid
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        page: 1,
        datas: [],
      });
      this.getJobResume();
    });
  },

  /**
   * 立即处理
   */
  handleJob: function (e) {
    wxb.that.setData({
      showbg: false,
      show_select: false,
      phone: e.target.dataset.phone,
      apply_id: e.target.dataset.applyid,
    });

    console.log('haoma:' + wxb.that.data.phone);


  },

  /**
   * 获取收到的简历
   */
  getJobResume: function (e) {
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/job.manage/getResume', {
      openid: wxb.getOpenId(),
      type: e,
    }, function (data) {
      wx.hideLoading();

      var datas = wxb.that.data.datas;

      for ( var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1
      })
    });
  }
})