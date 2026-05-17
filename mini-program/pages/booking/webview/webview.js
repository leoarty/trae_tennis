Page({
  data: {
    url: '',
    title: ''
  },

  onLoad(options) {
    const { url, title } = options
    this.setData({
      url: decodeURIComponent(url),
      title: decodeURIComponent(title)
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  }
})
