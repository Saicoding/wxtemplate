// detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    app_screen: true,
    qrcode_dialog: 1,
    company_id: '',
    qrcode_url: '',
    photos: [],
  },

  onShow:function(){
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    wx.showLoading({
      title: '正在加载中..',
    });

    wxb.Post('/api/company.store/getDetail', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading(),
        wxb.that.setData({
          detail: data,
          photos: data.photos,
          company_id: data.company_id,
        })

    });
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
    console.log(wxb.that.data.qrcode_url);
    wx.downloadFile({
      url: wxb.that.data.qrcode_url,  //图片的下载地址
      success: function (res) { //图片下载成功
        wx.saveFile({
          tempFilePath: res.tempFilePath, //下载后的图片临时地址
          success: function (res) {
            console.log("保存图片成功")
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
        console.log("图片下载失败")
        wx.showToast({
          title: '图片下载失败',
        })
      }
    })
  },

  clickImage: function (e) {
    var current = e.target.dataset.src
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