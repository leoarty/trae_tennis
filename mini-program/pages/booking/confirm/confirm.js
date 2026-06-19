Page({
  data: {
    courtId: null,
    courtName: '',
    date: '',
    timeSlots: [],
    totalPrice: 0,
    bookingUrl: '',
    contactName: '',
    contactPhone: '',
    remark: '',
    courtAddress: '',
    courtImage: '',
    courtRating: 0,
    courtTags: []
  },

  onLoad(options) {
    const bookingData = JSON.parse(decodeURIComponent(options.data))
    this.setData({
      courtId: bookingData.courtId,
      courtName: bookingData.courtName,
      date: bookingData.date,
      timeSlots: bookingData.timeSlots,
      totalPrice: bookingData.totalPrice,
      bookingUrl: bookingData.bookingUrl || '',
      courtAddress: bookingData.courtAddress || '',
      courtImage: bookingData.courtImage || '',
      courtRating: bookingData.courtRating || 0,
      courtTags: bookingData.courtTags || []
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

  addVisitedCourt() {
    try {
      let visitedCourts = wx.getStorageSync('visitedCourts') || []
      const courtExists = visitedCourts.some(court => court.courtId === this.data.courtId)

      if (!courtExists) {
        const newCourt = {
          courtId: this.data.courtId,
          name: this.data.courtName,
          address: this.data.courtAddress,
          image: this.data.courtImage,
          rating: this.data.courtRating,
          tags: this.data.courtTags,
          visitDate: this.data.date,
          visitTime: this.data.timeSlots,
          totalPrice: this.data.totalPrice,
          addedAt: Date.now()
        }

        visitedCourts.unshift(newCourt)
        wx.setStorageSync('visitedCourts', visitedCourts)
        wx.showToast({
          title: '已添加到我的球场',
          icon: 'success',
          duration: 1500
        })
      }
    } catch (e) {
      console.error('添加球场记录失败', e)
    }
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

    wx.showModal({
      title: '即将跳转',
      content: `将跳转至「${this.data.courtName}」官方平台进行付费预约，是否继续？`,
      confirmText: '去预约',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.addVisitedCourt()
          wx.setClipboardData({
            data: this.data.bookingUrl,
            success: () => {
              wx.showModal({
                title: '链接已复制',
                content: '官方预约链接已复制到剪贴板，请粘贴到浏览器中打开',
                showCancel: false,
                confirmText: '我知道了'
              })
            }
          })
        }
      }
    })
  }
})
