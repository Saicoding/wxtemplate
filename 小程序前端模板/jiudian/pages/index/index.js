//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,
    show: 1,
    app_screen: true,
    detail: 1,
    datas: [],
    page: 1,
    more: 0,
    date: [],
    lists: [],
    currItem: [],
    comments: [],
    show_comment_num: 0,
  },


  lookphoto: function (e) {
    // console.log(e);
    var photo = e.target.dataset.url;
    var photos = e.target.dataset.urls;
    wx.previewImage({
      current: photo,
      urls: photos,
    })

  },

  close_screen: function (e) {
    this.setData({
      detail: 1,
      app_screen: true,
    });
  },

  yuyue: function (e) {
    wx.navigateTo({
      url: '/pages/index/yuding?id=' + wxb.that.data.currItem.id,
    })
    this.close_screen();
  },
  map: function () {
    console.log(wxb.that.data.datas);
    wx.openLocation({
      latitude: parseFloat(wxb.that.data.datas.lat),
      longitude: parseFloat(wxb.that.data.datas.lng),
      name:wxb.that.data.datas.hotel_name,
      scale: 28,
    });
  },
  show_detail: function (e) {
    console.log(e);
    var index = e.target.dataset.id;
    var mdatas = wxb.that.data.lists;
    console.log('index' + index);
    wxb.that.setData({
      detail: this.data.detail == 1 ? 0 : 1,
      app_screen: false,
      currItem: wxb.that.data.lists[index],
    });
  },
  open_view: function (e) {
    var id = e.target.dataset.id;
    var mdatas = wxb.that.data.lists;
    for (var a in mdatas) {
      if (mdatas[a]['id'] == id) {
        mdatas[a]['is_show'] = mdatas[a]['is_show'] ? 0 : 1;

      }
    }
    wxb.that.setData({
      lists: mdatas,
    });
  },

  onShow: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式

    var bgend = wxb.getBgEndDate();
    if (bgend) {
      wxb.that.setData({
        date: bgend
      });
    }

    this.setData({
      lists: [],
      page: 1,
      more: 0,
    });

    this.getHomeList();
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    this.getHome();
  },

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    console.log('type' + type);
    this.setData({
      type: type,
    });

    if (type == 1) {
      wxb.that.setData({
        page: 1,
        comments: [],
      });
      this.getCommentList();
    }
  },

  /**
   * 加载更多
   */
  loadMore: function(e){
    this.getCommentList();
  },

  getHome: function (e) {
    wxb.Post('/api/hotelgw.data/getHotel', {}, function (data) {
      console.log(data);
      wxb.that.setData({
        datas: data,
      })
    })
  },

  more: function (e) {
    this.getHomeList();
  },

  getHomeList: function (e) {
    wx.showLoading({
      title: '加载数据中',
    })
    wxb.Post('/api/hotelgw.data/getRooms', {
      page: wxb.that.data.page,
      bg_date: wxb.that.data.date.bg_date,
      end_date: wxb.that.data.date.end_date,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.lists;
      for (var a in data.list) {
        datas.push(data.list[a]);
      }
      console.log(data);
      wxb.that.setData({
        lists: datas,
        page: wxb.that.data.page + 1,
        more: data.more,
      })
    })
  },

  getCommentList: function (e) {
    wx.showLoading({
      title: '加载数据中',
    })

    wxb.Post('/api/hotelgw.data/getComment', {
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      
      var comment = wxb.that.data.comments;

      for (var val in data.list) {
        comment.push(data.list[val]);
      }

      wxb.that.setData({
        show_comment_num: data.totalNum,
        comments: comment,
        more: data.more,
        page: wxb.that.data.page + 1,
      });
    });

  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '酒店小程序',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '已转发',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  }
})
