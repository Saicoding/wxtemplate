// pages/gs/free.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  data: {
    type: 1,
    woshi: ['0室','1室', '2室', '3室', '4室','5室'],
    ting: ['0厅','1厅','2厅','3厅','4厅','5厅'],
    chu:['0厨','1厨','2厨','3厨','4厨','5厨'],
    wei:['0卫','1卫','2卫','3卫','4卫','5卫'],
    yangtai:['0阳台','1阳台','2阳台','3阳台','4阳台','5阳台'],
    woshi_num: 0,
    ting_num: 0,
    chu_num: 0,
    wei_num: 0,
    yangtai_num: 0,
    offer:[],
    zongjia:0,
    rengongfei:0,
    cailiaofei:0,
    shejifei:0,
    zhijian:0,
  },

  woshi:function(e){
    this.setData({
      woshi_num: e.detail.value,
    })
    this.jisuan();
  },
  ting: function (e) {
    this.setData({
      ting_num: e.detail.value,
    })
    this.jisuan();
  },
  chu: function (e) {
    this.setData({
      chu_num: e.detail.value,
    })
    this.jisuan();
  },
  wei: function (e) {
    this.setData({
      wei_num: e.detail.value,
    })
    this.jisuan();
  },
  yangtai: function (e) {
    this.setData({
      yangtai_num: e.detail.value,
    })
    this.jisuan();
  },
  tab:function(e){
    this.setData({
      type: e.target.dataset.type,
    });
  },
  jisuan:function(){
    var woshi_num = this.data.woshi_num;
    var ting_num = this.data.ting_num;
    var chu_num = this.data.chu_num;
    var wei_num = this.data.wei_num;
    var yangtai_num = this.data.yangtai_num;
    var offer = this.data.offer;
    var zongjia =((woshi_num * offer.bedroom) + (ting_num * offer.livingroom) + (chu_num * offer.kitchen) + 
      (wei_num * offer.toilet) + (yangtai_num * offer.balcony))/100;
      zongjia =  zongjia.toFixed(2)   
      var rengongfei = zongjia * (offer.artificial / 100).toFixed(2);
      var cailiaofei = zongjia * (offer.material / 100).toFixed(2);
      var shejifei = zongjia * (offer.design / 100).toFixed(2);
      var zhijian = zongjia * (offer.inspect / 100).toFixed(2);

      this.setData({
        zongjia: zongjia,
        rengongfei: rengongfei,
        cailiaofei: cailiaofei,
        shejifei: shejifei,
        zhijian: zhijian,
      })
  },
  formBindsubmit:function(e){
    var param = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/zhuangxiu.index/tender', {
      openid: wxb.getOpenId(),
      bedroom: param.bedroom,
      livingroom: param.livingroom,
      kitchen: param.kitchen,
      toilet: param.toilet,
      balcony: param.balcony,
      area: param.area,
      name: param.name,
      mobile: param.mobile,
      content: param.content,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功请耐心等待服务商的电话',
        icon: 'success',
        duration: 2000,
        
      })
      wx.redirectTo({
        url: '/pages/gs/index'
      })
    });
  },
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type,
      });
    }
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
    wxb.that = this;   //正确打开巅峰互联的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    };
    wxb.Post('/api/zhuangxiu.data/getOffer', {
    }, function (data) {
      wxb.that.setData({
        offer: data,
      })
    });
  },

})