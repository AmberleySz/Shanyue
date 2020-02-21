App({
  data: {
    dataDict: {
      weiboAppId: "",
      weiboShanyuePath: "",
      resumeFile: "",
      artMuseumFile: "",
      arlesFile: ""
    }
  },

  onLaunch () {
    wx.cloud.init()
    // 读取文件/参数路径
    const db = wx.cloud.database()
    for (const key of Object.keys(this.data.dataDict)) {
      console.log(key)
      db.collection('data').where({
        
      }).get({
        success: function(res) {
          console.log(res.data)
        }
      })
    }
  }
})