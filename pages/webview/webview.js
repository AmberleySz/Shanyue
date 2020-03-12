var app = getApp()

Page({
  data: {
    webviewUrl: ""
  },

  onLoad: function() {
    console.log(app.globalData.dataDict['webviewUrl'])
    this.setData({ webviewUrl: app.globalData.dataDict['webviewUrl']})
  }
})
