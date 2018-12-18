//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    group_id: 0,

    status: 0, //0 等待开团 2未成团 也没过期 但库存不足 8已成团   

    datas: [],

    total_micro_second: 0,//剩余时间

    hour: '00',
    minus: '00',
    second: '00',

    interval: 0,
  },

  goback: function () {
    wx.navigateBack({
      delta: 100
    })
  },

  onShow: function (e) {
    wxb.that = this;
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.group_id) {
      wxb.that.setData({
        group_id: e.group_id,
      });

      this.getGroupDetail();

      this.countdown();
    }

  },

  /**
   * 倒计时
   */
  countdown: function (e) {
    // 渲染倒计时时钟
    var timer = setInterval(function () {
      var total_micro_second = wxb.that.data.total_micro_second;
      if (total_micro_second > 0) {
        total_micro_second--;
        wxb.that.setData({
          total_micro_second: total_micro_second,
          interval: timer,
        });
        wxb.that.timeFormat();
      }
    }, 1000);

    wxb.that.setData({
      interval: timer,//接收定时器返回信息
    });
  },

  /**
   * 格式化倒计时
   */
  timeFormat: function (e) {
    var seconds = Math.floor(wxb.that.data.total_micro_second);
    var hour = Math.floor(seconds / 3600);
    var minus = Math.floor((seconds - hour * 3600) / 60);
    var second = Math.floor(seconds - hour * 3600 - minus * 60);

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minus < 10) {
      minus = "0" + minus;
    }

    if (second < 10) {
      second = "0" + second;
    }

    wxb.that.setData({
      hour: hour,
      minus: minus,
      second: second,
      // show_clock: hour + ":" + minus + ":" + second,
      // show_clock: day + "天" + hour + ":" + minus + ":" + second,
    });
  },

  /**
   * 页面隐藏的时候清理下
   */
  onHide: function (e) {
    clearInterval(wxb.that.data.interval);
  },

  /**
   * 页面卸载清除定时器
   */
  onUnload: function () {
    clearInterval(wxb.that.data.interval);
  },

  /**
   * 获取团详情
   */
  getGroupDetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/group.order/groupDetail', {
      openid: wxb.getOpenId(),
      group_id: wxb.that.data.group_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        status: data.status,
        total_micro_second: data.surplus_time,
      });
    });
  },

  /**
   * 一键参团
   */
  joinGroupBy: function (e) {
    wx.showLoading({
      title: '提交中...',
    })
    wxb.Post('/api/group.order/groupBy', {

    }, function (data) {
      wx.hideLoading();
    });
  },

  /**
   * 转发
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: wxb.that.data.datas.goods_name,
      path: '/pages/tuan/join?group_id=' + wxb.that.data.group_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
