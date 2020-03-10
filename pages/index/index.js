// weibo miniprogram path: nickname=encodeURIComponent($CONFIG.onick), objectUid=$CONFIG.oid

var app = getApp();

Page({
  data: {
    downloading: false,
    progress: 0,
    downloadTask: null,
  },

  weibo: function() {
    wx.navigateToMiniProgram({
      appId: app.data.weiboAppId,
      path: app.data.weiboShanyuePath,
    })
  },

  artMuseum: function() {
    openFile(this, app.data.artMuseumFile)
  },

  arles: function() {
    openFile(this, app.data.arlesFile)
  },

  resume: function() {
    openFile(this, app.data.resumeFile)
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
    success: function (res) {
      wx.openDocument({
        filePath: res.tempFilePath,
      })
    },
  })

  page.setData({
    downloadTask: downloadTask
  })

  downloadTask.onProgressUpdate(function (res) {
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
