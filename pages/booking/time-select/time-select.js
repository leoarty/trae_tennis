Page({
  data: {
    courtId: null,
    courtName: '',
    price: 0,
    bookingUrl: '',
    selectedDate: '',
    selectedTimeSlots: [],
    dates: [],
    timeSlots: [
      { time: '06:00-07:00', available: true, selected: false, statusText: '可约' },
      { time: '07:00-08:00', available: true, selected: false, statusText: '可约' },
      { time: '08:00-09:00', available: false, selected: false, statusText: '已满' },
      { time: '09:00-10:00', available: true, selected: false, statusText: '可约' },
      { time: '10:00-11:00', available: true, selected: false, statusText: '可约' },
      { time: '11:00-12:00', available: false, selected: false, statusText: '已满' },
      { time: '12:00-13:00', available: true, selected: false, statusText: '可约' },
      { time: '13:00-14:00', available: true, selected: false, statusText: '可约' },
      { time: '14:00-15:00', available: true, selected: false, statusText: '可约' },
      { time: '15:00-16:00', available: false, selected: false, statusText: '已满' },
      { time: '16:00-17:00', available: true, selected: false, statusText: '可约' },
      { time: '17:00-18:00', available: true, selected: false, statusText: '可约' },
      { time: '18:00-19:00', available: true, selected: false, statusText: '可约' },
      { time: '19:00-20:00', available: false, selected: false, statusText: '已满' },
      { time: '20:00-21:00', available: true, selected: false, statusText: '可约' },
      { time: '21:00-22:00', available: true, selected: false, statusText: '可约' }
    ],
    totalPrice: 0
  },

  onLoad(options) {
    const { courtId, courtName, price, bookingUrl } = options
    this.setData({
      courtId: parseInt(courtId),
      courtName,
      price: parseInt(price),
      bookingUrl: bookingUrl || '',
      dates: this.generateDates(),
      selectedDate: this.generateDates()[0].date
    })
    wx.setNavigationBarTitle({
      title: '选择时段'
    })
  },

  generateDates() {
    const dates = []
    const today = new Date()
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const weekDay = i === 0 ? '今天' : weekDays[date.getDay()]

      dates.push({
        date: `${date.getFullYear()}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        display: `${month}/${day}`,
        weekDay: weekDay
      })
    }
    return dates
  },

  selectDate(e) {
    const date = e.currentTarget.dataset.date
    this.setData({
      selectedDate: date,
      timeSlots: this.data.timeSlots.map(slot => ({
        ...slot,
        selected: false,
        statusText: slot.available ? '可约' : '已满'
      })),
      selectedTimeSlots: [],
      totalPrice: 0
    })
  },

  toggleTimeSlot(e) {
    const index = e.currentTarget.dataset.index
    const slot = this.data.timeSlots[index]

    if (!slot.available) return

    const timeSlots = this.data.timeSlots.map((s, i) => {
      if (i === index) {
        const selected = !s.selected
        return {
          ...s,
          selected: selected,
          statusText: selected ? '已选' : '可约'
        }
      }
      return s
    })

    const selectedTimeSlots = timeSlots
      .filter(s => s.selected)
      .map(s => s.time)

    const totalPrice = selectedTimeSlots.length * this.data.price

    this.setData({
      timeSlots,
      selectedTimeSlots,
      totalPrice
    })
  },

  submitBooking() {
    if (this.data.selectedTimeSlots.length === 0) {
      wx.showToast({
        title: '请选择预约时段',
        icon: 'none'
      })
      return
    }

    const bookingData = {
      courtId: this.data.courtId,
      courtName: this.data.courtName,
      date: this.data.selectedDate,
      timeSlots: this.data.selectedTimeSlots,
      totalPrice: this.data.totalPrice,
      bookingUrl: this.data.bookingUrl
    }

    wx.navigateTo({
      url: `/pages/booking/confirm/confirm?data=${encodeURIComponent(JSON.stringify(bookingData))}`
    })
  }
})
