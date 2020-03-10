var app = getApp();

Page({
  data: {
    downloading: false,
    progress: 0,
    downloadTask: null,
  },

  weibo: function() {
    wx.navigateToMiniProgram({
      appId: app.globalData.dataDict['weiboAppId'],
      path: app.globalData.dataDict['weiboShanyuePath'],
    })
  },

  artMuseum: function() {
    openFile(this, app.globalData.dataDict['artMuseumFile'])
  },

  arles: function() {
    openFile(this, app.globalData.dataDict['arlesFile'])
  },

  resume: function() {
    openFile(this, app.globalData.dataDict['resumeFile'])
  },

  cancelDownload: function() {
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
