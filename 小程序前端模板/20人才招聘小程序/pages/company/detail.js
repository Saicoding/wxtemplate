// pages/index/detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    company_id: '',

    //公司基本信息
    compInfo: [],
    //职务列表
    postList: [],

    page: 1,
    more: 0,

    qrcode_dialog: 1,
    app_screen: true,

    zan_num: 0,
    news_zan_num: 0,

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

    /**
     * 公司Id传递
     */
    wxb.that.setData({
      company_id: e.company_id,
    });

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };

    this.getCompanyDetail();
  },

  show_qrcode: function (e) {
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/company.data/qrcord', {
      openid: wxb.getOpenId(),
      id: wxb.that.data.company_id,
      path: 'pages/store/detail?company_id=' + wxb.that.data.company_id,
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
          qrcode_url: data,

        })
    })
  },

  show_qrcode: function (e) {
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/job.data/qrcord', {
      openid: wxb.getOpenId(),
      id: wxb.that.data.company_id,
      path: 'pages/store/detail?company_id=' + wxb.that.data.company_id,
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
          qrcode_url: data,

        })
    })

    this.setData({
      qrcode_dialog: this.data.qrcode_dialog == 1 ? 0 : 1,
      app_screen: false,
    });
  },

  btn_save: function (e) {
    wx.downloadFile({
      url: wxb.that.data.qrcode_url,  //图片的下载地址
      success: function (res) { //图片下载成功
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath, //下载后的图片临时地址
          success: function (path) {
            console.log(path);
            wx.showToast({
              title: '保存图片成功',
            })
          },
          fail: function () {
            console.log("保存图片失败")
            wx.showToast({
              title: '保存图片失败',
            })
          }
        })
      }, fail: function (res) {

        wx.showToast({
          title: '图片下载失败',
        })
      }
    })
  },

  app_screen: function (e) {
    this.setData({
      qrcode_dialog: 1,
      app_screen: true,
    });
  },



  zan: function (e) {
    var id = e.target.dataset.id;
    var cache = wx.getStorageSync('wxb_zan') ? wx.getStorageSync('wxb_zan') : '{}';
    var cachearr = JSON.parse(cache);
    var newArr = [];
    var is_zan = false;
    for (var a in cachearr) {
      if (cachearr[a] == id) {
        is_zan = true;
      }
      newArr.push(cachearr[a]);
    }
    if (newArr.length > 100) {
      newArr = [];
    }
    newArr.push(id);
    wx.setStorageSync('wxb_zan', JSON.stringify(newArr));

    if (!is_zan) {
      wxb.Post("/api/job.me/zan", {
        company_id: id,
        openid: wxb.getOpenId(),
      }, function (data) {
        var comments = wxb.that.data.compInfo;
        if (comments.id == id) {
          comments.zan_num = comments.zan_num + 1;
        }
        wxb.that.setData({
          compInfo: comments,
        });
      });
    } else {
      wx.showToast({
        title: '已经赞过了',
      })
    }
  },

  /**
   * 拨打电话
   */
  makePhone: function(e){
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.compInfo.tel,
      success: function(e){
        wxb.Post("/api/job.me/call", {
          company_id: wxb.that.data.company_id,
          openid: wxb.getOpenId(),
        }, function (data) {
        
        });
      }
    });
  },


  /**
   * 获取公司详情
   */
  getCompanyDetail: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wxb.Post('/api/job.data/companyDetail', {
      company_id: wxb.that.data.company_id,
      page: wxb.that.data.page,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        zan_num: data.company.zan_num,
        news_zan_num: data.company.zan_num,
        compInfo: data.company,
        postList: data.list,
        more: data.more,
      });
    });
  },

  seePic: function (e) {
    wx.previewImage({
      urls: wxb.that.data.compInfo.photos,
    })
  },

  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
    }
    return {
      title: wxb.that.data.compInfo.company_name,
      path: '/pages/company/detail?company_id=' + wxb.that.data.company_id,
      success: function (res) {
        wxb.Post('/api/job.me/share', {
          openid: wxb.getOpenId(),
          company_id: wxb.that.data.company_id,
        }, function (data) {

        });

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})