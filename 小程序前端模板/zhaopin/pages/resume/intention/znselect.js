// 职能意向
var app = getApp();
var wxb = require('../../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    show: 0,

    datas: [],
    length: 0,
    news_str: '',
    
  },

  onShow: function () {
    wxb.that = this;
  },

  open_view: function (e) {
    var id = e.target.dataset.id;
    var mdatas = wxb.that.data.datas;
    for (var a in mdatas) {
      if (mdatas[a]['industry_id'] == id) {
        mdatas[a]['is_show'] = mdatas[a]['is_show'] ? 0 : 1;

      }
    }
    wxb.that.setData({
      datas: mdatas,
    });
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
    };

    this.getProfession();
  },

  toback: function () {
    var str = wxb.that.data.news_str;
    wx.setStorageSync('skillids', str);
    wx.reLaunch({
      url: '/pages/resume/intention/index',
    })
  },

  checkboxChange: function (e) {
    var array = e.detail.value;
    var datas = wxb.that.data.datas;
    if (array.length > 5) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '最多只能选择5个',
      })

      this.setData({
        length: array.length,

      });
    } else {
      var str = array.join(',', array);
      this.setData({
        length: array.length,
        news_str: str,
      });
    }
  },
  /**
   * 获取职能意向
   */
  getProfession: function(e){
    wxb.Post('/api/job.data/getProfession', {
      openid: wxb.getOpenId(),
    }, function(data){
      console.log(data);
      var str = wx.getStorageSync('skillids');
      console.log(str);
      if (str != '') {
        var array = str.split(',');
        console.log(array);
        wxb.that.setData({
          length: array.length,
        });
        for (var i in data){
          for (var j in data[i].children){
            for(var z in array){
              if (array[z] == data[i].children[j].industry_id){
                data[i].children[j].check = true;
              }
            }
          } 
        }       
      }

      wxb.that.setData({
        datas: data,
      });

    });
  },
})