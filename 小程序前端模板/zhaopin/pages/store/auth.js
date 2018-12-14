var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    logo: '',//公司logo

    
    photos: [],
    photos_url: [],
    date: '',

    hy_datas: [],//所属行业
    xz_datas: [],//性质
    gm_datas: [], //规模
    area_datas:[],//所在区域

    tArray: [],
    gArray: [],
    hArray: [],
    aArray: [],

    ces: '',
    ces_url: '',

    scale: '',//公司规模Id
    type: '',//公司性质Id
    industry_id: '',//所属行业Id
    area_id: '',//区域Id
    addr: '', //企业地址

    lat: 0,
    lng: 0,
  },

  onShow: function () {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
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

    this.getConfigInfo();
    this.getIndustry();
    this.getHomeScreen();
  },

  /**
   * 获取基础配置信息
   */
  getConfigInfo: function (e) {
    wxb.Post('/api/job.data/getdatas', {

    }, function (data) {

      var index = 0;
      var array = wxb.that.data.tArray;
      for (index in data.type) {
        array.push(data.type[index].scale_name);
      }

      var index1 = 0;
      var array1 = wxb.that.data.gArray;
      for (index1 in data.scale) {
        array1.push(data.scale[index1].scale_name);
      }

      wxb.that.setData({
        tArray: array,
        gArray: array1,

        xz_datas: data.type,
        gm_datas: data.scale,
      });
    });
  },


  /**
  * 获取筛选条件
  */
  getHomeScreen: function () {
    wxb.Post('/api/job.data/getSearch', {}, function (data) {
      var index = 0;
      var array = wxb.that.data.aArray;
      for (index in data.area) {
        array.push(data.area[index].area_name);
      }

      wxb.that.setData({
        aArray: array,
        area_datas: data.area,
      });
    });
  },

  /**
   * 获取行业要求列表
   */
  getIndustry: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    wxb.Post('/api/job.data/getIndustry', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      console.log(data);
      var index = 0;
      var array = wxb.that.data.hArray;
      var arr_data = wxb.that.data.hy_datas;
      for (index in data) {
        array.push(data[index].industry_name);
        arr_data.push(data[index]);
      }

      wxb.that.setData({
        hArray: array,
        hy_datas: arr_data,
      });

    });
  },


  /**
   * 地图选择
   */
  map: function () {
    wxb.that = this;
    wx.chooseLocation({
      success: function (data) {
        wxb.that.setData({
          lat: data.latitude,
          lng: data.longitude,
          addr: data.address,
        })
      }
    });
  },

  bindDatePickerChange: function (e) {
    wxb.that.setData({
      date: e.detail.value,
    });
  },

  /**
   * 上传公司Logo
   */
  uploadlogo: function (e) {
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        photo_url: data.img_url,
        logo: data.img
      });
    });
  },

  photos: function (e) {
    wxb.fileupload('', function (data) {
      var photos = wxb.that.data.photos;
      var photos_url = wxb.that.data.photos_url;
      console.log(data);
      photos.push(data.img);
      photos_url.push(data.img_url);
      wx.hideLoading();
      wxb.that.setData({
        photos: photos,
        photos_url: photos_url,
      })
    });
  },

  uploadces: function (e) {
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.fileupload('', function (data) {
      wxb.that.setData({
        ces_url: data.img_url,
        ces: data.img
      });
    });
  },

  /**
   * 公司性质
   */
  bindTypePickerChange: function (e) {
    wxb.that.setData({
      tIndex: e.detail.value,
      type: wxb.that.data.xz_datas[e.detail.value].scale_id,
    });
  },

  /**
   * 公司规模
   */
  bindGmPickerChange: function (e) {
    wxb.that.setData({
      gIndex: e.detail.value,
      scale: wxb.that.data.gm_datas[e.detail.value].scale_id,
    });
  },

  /**
   * 所属行业
   */
  bindHyPickerChange: function (e) {
    wxb.that.setData({
      hIndex: e.detail.value,
      industry_id: wxb.that.data.hy_datas[e.detail.value].industry_id,
    });
  },

  /**
   * 所在区域
   */
  bindAreaPickerChange: function (e) {
    wxb.that.setData({
      aIndex: e.detail.value,
      area_id: wxb.that.data.area_datas[e.detail.value].area_id,
    });
  },

  /**
   * 企业认证
   */
  setUserAuth: function(e){
    var params = e.detail.value;
    wx.showLoading({
      title: '认证中..',
    });

    wxb.Post('/api/job.me/setCompany', {
      openid: wxb.getOpenId(),
      title: params.title,
      company_name: params.company_name,
      sort_name: params.sort_name,
      logo: wxb.that.data.logo,
      address: wxb.that.data.addr,
      lat: wxb.that.data.lat,
      lng: wxb.that.data.lng,
      region: wxb.that.data.area_id,//所在区域
      main_business: params.business,//主营业务
      type: wxb.that.data.type,//公司性质
      scale: wxb.that.data.scale,//公司规模
      industry_id: wxb.that.data.industry_id,//所属行业
      bg_year: wxb.that.data.date,//创建时间
      name: params.name,//公司负责人
      tel: params.tel,//负责人联系方式
      zhiwu: params.zhiwu,//负责人职位
      detail: params.detail,//商家介绍
      audit_photo: wxb.that.data.ces,
      photos: wxb.that.data.photos,
    }, function(e){
      wx.hideLoading();
      wx.showToast({
        title: '认证成功',
      });
      wx.redirectTo({
        url: '/pages/store/index',
      })
    });
  },


})