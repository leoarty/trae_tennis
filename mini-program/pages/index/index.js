Page({
  data: {
    motto: '欢迎使用微信小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    count: 0
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  increment() {
    this.setData({
      count: this.data.count + 1
    })
  },

  decrement() {
    this.setData({
      count: this.data.count - 1
    })
  },

  navigateToLogs() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  }
})
