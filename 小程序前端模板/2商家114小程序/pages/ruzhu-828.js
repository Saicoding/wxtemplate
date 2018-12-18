// ruzhu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cate: null,
      array: ['美国', '中国', '巴西', '日本'],
  },
  submit:function(){
    wx.navigateTo({
      url: '/pages/store/index',
    })
  },
  map:function(){
    wx.chooseLocation({success:function(data){
  

    }});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }


})