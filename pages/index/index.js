var app = getApp();

Page({
  data: {
    downloading: false,
    progress: 0,
    downloadTask: null,
    resumeOpenPending: false
  },

  onShow: function() {
    if (this.data.resumeOpenPending) {
      openFile(this, app.globalData.dataDict['resumeFile'])
      this.setData({
        resumeOpenPending: false
      })
    }
  },

  onWeibo: function() {
    wx.navigateToMiniProgram({
      appId: app.globalData.dataDict['weiboAppId'],
      path: app.globalData.dataDict['weiboShanyuePath'],
    })
  },

  onArtMuseum: function() {
    openFile(this, app.globalData.dataDict['artMuseumFile'])
  },

  onArles: function() {
    openFile(this, app.globalData.dataDict['arlesFile'])
  },

  onResume: function() {
    wx.navigateTo({
      url: '/pages/passwd/passwd',
    })
  },

  onCancelDownload: function() {
    this.data.downloadTask.abort()
    this.setData({
      downloading: false
    })
  }
})

function openFile(page, cloudFileID) {
  page.setData({
    progress: 0,
    downloading: true,
  })

  const downloadTask = wx.cloud.downloadFile({
    fileID: cloudFileID,
    success: res => {
      wx.openDocument({
        filePath: res.tempFilePath,
      })
    },
  })

  page.setData({
    downloadTask: downloadTask
  })

  downloadTask.onProgressUpdate( res=> {
    if (res.progress < 100) {
      page.setData({
        progress: res.progress,
      })
    } else {
      page.setData({
        downloading: false,
      })
    }
  })
}
