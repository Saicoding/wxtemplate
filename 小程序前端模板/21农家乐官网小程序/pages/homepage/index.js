// 商家官网 index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex: 1,
    index:[],
    photoshow: true,
    xiangmu_page:1,
    xiangmu_data:[],
    xiangmu_more:1,

    taocan_page: 1,
    taocan_data: [],
    taocan_more: 1,

    room_page: 1,
    room_data: [],
    room_more: 1,
    date:[],
    news_page: 1,
    news_data: [],
    news_more: 1,
    is_room_on :0,
    markers: [{
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    }],
  },
  photoclick: function (e) {
    this.setData({
      photoshow: false
    });
  },
  photobgclick: function (e) {
    this.setData({
      photoshow: true
    });
  },
  
  gohome: function (e) {
    wx.navigateTo({
      url: '/pages/homepage/home/index',
    })
  },
  lookdetails: function(e){
    wx.navigateTo({
      url: '/pages/homepage/home/dongtai/details',
    })
  },

  /** 更多农庄动态 */
  
  nongjiale_more: function (e) {
    if (e.target.dataset.id == 1) {
    } else if (e.target.dataset.id == 2) {
      this.setData({
        news_page: 1,
        news_data: [],
        news_more: 1,
      })
      this.getNews();
    } else if (e.target.dataset.id == 3) {

    } else if (e.target.dataset.id == 4) {
      this.setData({
        taocan_page: 1,
        taocan_data: [],
        taocan_more: 1,
      })
      this.getTaocan();

    } else if (e.target.dataset.id == 5) {
      this.setData({
        xiangmu_page: 1,
        xiangmu_data: [],
        xiangmu_more: 1,
      })
      this.getXiangmu();
    } else if (e.target.dataset.id == 6) {

    }

    this.setData(
      {
        tabindex: e.target.dataset.id
      }
    );
  },
  tabindex: function (e) {
 
    if (e.target.dataset.id == 1 ){
    } else if (e.target.dataset.id == 2){
      this.setData({
        news_page: 1,
        news_data: [],
        news_more: 1,
      })
      this.getNews();
    } else if (e.target.dataset.id == 3){
      this.setData({
        room_page: 1,
        room_data: [],
        room_more: 1,
        is_room_on: 1,
      })
      this.getRooms();
    } else if (e.target.dataset.id == 4) {
      this.setData({
        taocan_page: 1,
        taocan_data: [],
        taocan_more: 1,
      })
      this.getTaocan();
   
    } else if (e.target.dataset.id == 5) {
          this.setData({
            xiangmu_page: 1,
            xiangmu_data: [],
            xiangmu_more: 1,
          })
          this.getXiangmu();
    } else if (e.target.dataset.id == 6) {
     
    }


    this.setData(
      {
        tabindex: e.target.dataset.id
      }
    );
  },
  xiangmu_more_to: function (e) {
    this.getXiangmu();
  },
  taocan_more_to: function (e) {
    this.getTaocan();
  },
  news_more_to: function (e) {
    this.getXiangmu();
  },
  getXiangmu:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/nongjialegw.index/getXiangmu', {
      page: wxb.that.data.xiangmu_page,
    }, function (data) {
      wx.hideLoading();
      var xiangmu_data = wxb.that.data.xiangmu_data;
      var val = '';
      for (val in data.list) {
        xiangmu_data.push(data.list[val]);
      }
      console.log(xiangmu_data);
      wxb.that.setData({
        xiangmu_data: xiangmu_data,
        xiangmu_more: data.more,
        xiangmu_page: wxb.that.data.xiangmu_page + 1,
      });
    });

  },
  getNews: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/nongjialegw.index/getNews', {
      page: wxb.that.data.news_page,
    }, function (data) {
      wx.hideLoading();
      var news_data = wxb.that.data.news_data;
      var val = '';
      for (val in data.list) {
        news_data.push(data.list[val]);
      }
      wxb.that.setData({
        news_data: news_data,
        news_more: data.more,
        news_page: wxb.that.data.news_page + 1,
      });
    });

  },
  getRooms: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/nongjialegw.index/getRooms', {
         bg_date:wxb.that.data.date.bg_date,
         end_date: wxb.that.data.date.end_date,
         page: wxb.that.data.room_page,
    }, function (data) {
      wx.hideLoading();
      var room_data = wxb.that.data.room_data;
      var val = '';
      for (val in data.list) {
        room_data.push(data.list[val]);
      }
      wxb.that.setData({
        room_data: room_data,
        room_more: data.more,
        room_page: wxb.that.data.room_page + 1,
      });
    });

  },
   getIndex:function(url){
     wxb.globalData = app.globalData; //正确打开巅峰互联的方式
     wxb.that = this;   //正确打开巅峰互联的方式
     wx.showLoading({
       title: '正在加载中..',
     });
     wxb.Post('/api/nongjialegw.index/index', {
     }, function (data) {
       var  markers =  [{
         id: 0,
         latitude: data.lat,
         longitude: data.lng,
         width: 50,
         height: 50
       }];
       wx.hideLoading();
       wxb.that.setData({
         index: data,
         markers: markers,
       });
     });
   },
   getTaocan: function (url) {
     wxb.globalData = app.globalData; //正确打开巅峰互联的方式
     wxb.that = this;   //正确打开巅峰互联的方式
     wx.showLoading({
       title: '正在加载中..',
     });
     wxb.Post('/api/nongjialegw.index/getTaocan', {
       
     }, function (data) {
       wx.hideLoading();
       var taocan_data = wxb.that.data.taocan_data;
       var val = '';
       for (val in data.list) {
         taocan_data.push(data.list[val]);
       }
       wxb.that.setData({
         taocan_data: taocan_data,
         taocan_more: data.more,
         taocan_page: wxb.that.data.taocan_page + 1,
       });
     });
   },
  onLoad: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },
  onShow:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    var bgend = wxb.getBgEndDate();
    if (bgend) {
      wxb.that.setData({
        date: bgend
      });
    }

    if(this.data.is_room_on == 0){
        this.getIndex();
    }else{
      this.setData({
        room_page: 1,
        room_data: [],
        room_more: 1,
      })
      this.getRooms();
    }
  },

  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    return {
      title: '农家乐商家主页',
      path: '/pages/homepage/index',
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