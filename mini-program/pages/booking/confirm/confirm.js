Page({
  data: {
    courtName: '',
    date: '',
    timeSlots: [],
    totalPrice: 0,
    contactName: '',
    contactPhone: '',
    remark: ''
  },

  onLoad(options) {
    const bookingData = JSON.parse(decodeURIComponent(options.data))
    this.setData({
      courtName: bookingData.courtName,
      date: bookingData.date,
      timeSlots: bookingData.timeSlots,
      totalPrice: bookingData.totalPrice
    })
    wx.setNavigationBarTitle({
      title: '确认预约'
    })
  },

  onNameInput(e) {
    this.setData({
      contactName: e.detail.value
    })
  },

  onPhoneInput(e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  submitOrder() {
    if (!this.data.contactName.trim()) {
      wx.showToast({
        title: '请输入联系人姓名',
        icon: 'none'
      })
      return
    }

    if (!this.data.contactPhone.trim()) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return
    }

    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(this.data.contactPhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '提交中...'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000)
        }
      })
    }, 1500)
  }
})
