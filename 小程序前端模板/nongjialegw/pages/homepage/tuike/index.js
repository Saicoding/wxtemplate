// pages/homepage/tuike/index.js
Page({

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  goranking: function (e) {
    wx.navigateTo({
      url: '/pages/homepage/tuike/ranking',
    })
  },


  save_mp: function(e){
    wx.canvasToTempFilePath({
      canvasId: 'user_mp',
      success: function success(res) {
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function success(res) {
            console.log('saved::' + res.savedFilePath);
          },
          complete: function fail(e) {
            console.log(e.errMsg);
          }
        });
      },
      complete: function complete(e) {
        console.log(e.errMsg);
      }
    })    
  },



  onReady: function () {
    // 页面渲染完成
    //第一步创建个上下文容器
    var context = wx.createCanvasContext("user_mp");

    //第二步绘制这里我们绘制个矩形 
    //绘制的样式进行描边绘制，fill为填充位置
    context.setFillStyle('#1ba8b9')
    context.fillRect(10, 10, 730, 700);
    context.stroke();

    context.setFillStyle('#ffffff')
    context.arc(190, 75, 40, 0, 2 * Math.PI)
    context.fill();

  
    // context.beginPath()
    // context.arc(15, 15, 5, 0, 0.5 * Math.PI)
    // context.setFillStyle('#1ba8b9')
    // context.fill()


    context.setFillStyle('#ffffff');
    context.setFontSize(16)
    context.fillText('请叫我码农哥请叫我码农哥111', 40, 140)
    context.setTextAlign('center');

    context.drawImage();

    context.setFillStyle('#ffffff')
    context.fillRect(105, 160, 180, 160);
    context.stroke();

    context.draw();

    
    
  },
})