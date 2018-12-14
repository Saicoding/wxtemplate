var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_detail: 1,
    arrow_values: "/image/dingzhi/icon_arrow_bottom.png",
    datas:[],
    more:0,
    page:1,
  },

  open_view: function (e) {
      var id =  e.target.dataset.id;
      var datas = wxb.that.data.datas;
      for(var a in datas){
          if(datas[a].order_id == id){
            datas[a]['show'] = datas[a]['show'] ? 0 : 1;
          }
      }
      wxb.that.setData({
        datas: datas,
      });
  },
  more:function(){
    var  page = wxb.that.data.page;
    page++;

    wxb.Post('/api/customized.order/orderlist', {
      page: page, openid: wxb.getOpenId(),
    }, function (data) {
      var datas = wxb.that.data.datas;
      for(var a in  data.datas){
        datas.push(data.datas[a]);
      }
      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: page,
      });
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wxb.that = this;   //正确打开巅峰互联的方式
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      if (!wxb.checkAuthLogin(true)) {
        wxb.login();
      }

      wxb.Post('/api/customized.order/orderlist',{
        page:1,openid:wxb.getOpenId(),
      },function(data){
          wxb.that.setData({
            datas:data.datas,
            more:data.more
          });
      });
  }
})