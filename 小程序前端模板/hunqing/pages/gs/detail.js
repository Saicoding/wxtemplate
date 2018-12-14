//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({
  data: {
    id: 0,
    detail: [],
    zannum: 0,

    app_screen: true,
    qrcode_dialog: 1,
    company_id: '',
    qrcode_url: '',
    photos: [],
  },

  map: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.openLocation({
      latitude: wxb.that.data.detail.lat,
      longitude: wxb.that.data.detail.lng,
      scale: 28,
    });
  },

  zan: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.Post('/api/company.index/zan', {
      openid: wxb.getOpenId(),
      compay_id: wxb.that.data.detail.company_id,
    }, function (data) {
      wxb.that.setData({
        zannum: wxb.that.data.detail.zan_num - 0 + 1,
      })
    });
  },
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/company.data/detail', {
      openid: wxb.getOpenId(),
      company_id: options.company_id,
      lat: wx.getStorageSync('wxb_lat'),
      lng: wx.getStorageSync('wxb_lng')

    }, function (data) {
      console.log(data);
      wx.hideLoading();
      wxb.that.setData({
        detail: data,
        photos: data.photos,
        company_id: data.company_id,
        zannum: data.zan_num,
      })

    });
  },
  share: function () {

  },

  onShareAppMessage: function (res) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (res.from === 'button') {
    }
    return {
      title: wxb.that.data.detail.title,
      path: res.target,
      success: function (res) {
        wxb.Post('/api/company.index/share', {
          openid: wxb.getOpenId(),
          company_id: wxb.that.data.detail.company_id,
        }, function (data) {

        });

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  toTel: function (e) {

    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.tel, //仅为示例，并非真实的电话号码
      success: function () {
        wxb.Post('/api/company.index/call', {
          openid: wxb.getOpenId(),
          company_id: e.target.dataset.id,
        }, function (data) {
        });
      }
    })
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

    this.setData({
      qrcode_dialog: this.data.qrcode_dialog == 1 ? 0 : 1,
      app_screen: false,
    });
  },


  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.detail.tel,
    })
  },

  app_screen: function (e) {
    this.setData({
      qrcode_dialog: 1,
      app_screen: true,
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

  clickImage: function (e) {
    var current = e.target.dataset.src
    console.log(e);
    wx.previewImage({
      current: current,
      urls: wxb.that.data.photos,
      fail: function () {
        console.log('Fail')
      },
      complete: function () {
        console.info("Success");
      },
    })
  },

})
