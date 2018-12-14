//index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    type: 0,
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
  },
})
