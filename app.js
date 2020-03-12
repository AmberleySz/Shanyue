App({
  globalData: {
    dataDict: {
      'weiboAppId': '',
      'weiboShanyuePath': '',  // weibo miniprogram path: pages/profile/profile?nickname=[encodeURIComponent($CONFIG.onick)];objectUid=[$CONFIG.oid]
      'resumeFile': '',
      'resumePasswd': '',
      'artMuseumFile': '',
      'arlesFile': ''
    }
  },

  onLaunch () {
    wx.cloud.init()
    const db = wx.cloud.database()
    for (const key of Object.keys(this.globalData.dataDict)) {
      db.collection('data').where({
        'name': key
      }).get({
        success: res => {
          const val = res.data[0].val
          this.globalData.dataDict[key] = val
        }
      })
    }
  }
})