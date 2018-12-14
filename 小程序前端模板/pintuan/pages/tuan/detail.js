//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    tab: 1,
    goods_id: 0,

    datas: [],

    clock: '00:00:00',
    // show_clock: '',
    total_micro_second: 0,

    interval: 0,

    more: 0,
    page: 1,

    comments: [],

    status: 0,//0:未参团 1:已参团，等待开团 2:已参团，待发货 3: 未参团/已参团，已结束

    showbg: true,
    show_service: true,
  },

  lookPhoto: function (e) {
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    var imgList = wxb.that.data.comments;

    console.log(e);
    wx.previewImage({
      current: imgList[index].photos[id],
      urls: imgList[index].photos,
    })
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
   * 格式化倒计时
   */
  timeFormat: function (e) {
    var seconds = Math.floor(wxb.that.data.total_micro_second);
    var day = Math.floor(seconds / 3600 / 24);
    var hour = Math.floor((seconds - day * 24 * 3600) / 3600);
    var minus = Math.floor((seconds - day * 24 * 3600 - hour * 3600) / 60);
    var second = Math.floor(seconds - day * 24 * 3600 - hour * 3600 - minus * 60);

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
      clock: day + "天" + hour + ":" + minus + ":" + second,
      // show_clock: day + "天" + hour + ":" + minus + ":" + second,
    });

  },


  /**
   * 查看服务
   */
  look_service: function (e) {
    wxb.that.setData({
      showbg: false,
      show_service: false,
    });
  },

  close_service: function (e) {
    wxb.that.setData({
      showbg: true,
      show_service: true,
    });
  },

  tuwen: function (e) {
    wxb.that.setData({
      tab: 1,
    });
  },
  guige: function (e) {
    wxb.that.setData({
      tab: 2,
    });
  },
  baozhuang: function (e) {
    wxb.that.setData({
      tab: 3,
    });
  },
  pingjia: function (e) {
    wxb.that.setData({
      tab: 4,
    });
  },
  buy: function () {
    wx.redirectTo({
      url: '/pages/mall/buy',
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

    wxb.that.setData({
      goods_id: e.goods_id,
    });

    this.getDetail();

    this.countdown();
  },

  loadMore: function (e) {
    this.getDetail();
  },

  /**
   * 获取详情
   */
  getDetail: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/group.order/goodsDetail', {
      openid: wxb.getOpenId(),
      goods_id: wxb.that.data.goods_id,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();

      var comment = wxb.that.data.comments;

      for (var val in data.comment) {
        comment.push(data.comment[val]);
      }

      if (data.goods != "") {
        var data2 = data;
      }

      wxb.that.setData({
        status: data.status,
        datas: data2,
        comments: comment,
        total_micro_second: data.goods.surplus_time,//剩余秒数
        page: wxb.that.data.page + 1,
      });
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
      title: '大家一起来拼团吧',
      path: '/pages/tuan/detail?goods_id=' + wxb.that.data.goods_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
