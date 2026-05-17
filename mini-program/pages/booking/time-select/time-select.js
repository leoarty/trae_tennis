Page({
  data: {
    courtId: null,
    courtName: '',
    price: 0,
    bookingUrl: '',
    openTime: '08:00-22:00',
    selectedDate: '',
    selectedTimeSlots: [],
    dates: [],
    timeSlots: [],
    totalPrice: 0
  },

  onLoad(options) {
    const { courtId, courtName, price, bookingUrl, openTime } = options
    this.setData({
      courtId: parseInt(courtId),
      courtName,
      price: parseInt(price),
      bookingUrl: bookingUrl || '',
      openTime: openTime || '08:00-22:00',
      dates: this.generateDates(),
      selectedDate: this.generateDates()[0].date,
      timeSlots: this.generateTimeSlots(openTime || '08:00-22:00')
    })
    wx.setNavigationBarTitle({
      title: '选择时段'
    })
  },

  generateTimeSlots(openTime) {
    const slots = []
    const [start, end] = openTime.split('-')
    const startHour = parseInt(start.split(':')[0])
    const endHour = parseInt(end.split(':')[0])

    for (let hour = startHour; hour < endHour; hour++) {
      const nextHour = hour + 1
      const timeStr = `${String(hour).padStart(2, '0')}:00-${String(nextHour).padStart(2, '0')}:00`
      slots.push({
        time: timeStr,
        available: Math.random() > 0.3,
        selected: false,
        statusText: Math.random() > 0.3 ? '可约' : '已满'
      })
    }
    return slots
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
      timeSlots: this.generateTimeSlots(this.data.openTime),
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
