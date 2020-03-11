var app = getApp() 

Page({
  data: {
    value: '',
    showClearBtn: false,
    wrongInput: false,
  },

  onInput(evt) {
    const { value } = evt.detail;
    this.setData({
      value,
      showClearBtn: !!value.length,
      wrongInput: false,
    });
  },

  onClear() {
    this.setData({
      value: '',
      showClearBtn: false,
      wrongInput: false,
    });
  },

  onConfirm() {
    if (this.data.value == app.globalData.dataDict['resumePasswd']) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        resumeOpenPending: true
      })
      wx.navigateBack({})
    } else {
      this.setData({
        wrongInput: true,
      });
    }
  }
});