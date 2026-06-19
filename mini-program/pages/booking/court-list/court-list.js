Page({
  data: {
    courts: [
      {
        id: 1,
        name: '国家网球中心',
        address: '北京市朝阳区林萃路2号',
        price: 130,
        priceRange: '100-300',
        prices: {
          weekdayDay: 120,
          weekdayNight: 200,
          weekendDay: 150,
          weekendNight: 300
        },
        image: 'https://picsum.photos/400/200?random=1',
        tags: ['室内', '硬地', '灯光'],
        rating: 4.8,
        bookingUrl: 'https://mp.weixin.qq.com/s?__biz=MzA5NjEyMDUyMA==&mid=2651012345&idx=1&sn=abc123',
        openTime: '07:00-22:00',
        courtTypes: [
          { type: '室内硬地', count: 12, priceAdjust: 1.2 },
          { type: '室内红土', count: 2, priceAdjust: 1.5 },
          { type: '室外硬地', count: 20, priceAdjust: 1.0 },
          { type: '室外草地', count: 3, priceAdjust: 1.3 }
        ]
      },
      {
        id: 2,
        name: '奥体中心网球场',
        address: '北京市朝阳区安定路1号',
        price: 140,
        priceRange: '120-350',
        prices: {
          weekdayDay: 120,
          weekdayNight: 220,
          weekendDay: 140,
          weekendNight: 350
        },
        image: 'https://picsum.photos/400/200?random=2',
        tags: ['室外', '硬地'],
        rating: 4.6,
        bookingUrl: 'http://www.noscapp.cn/noscwechat/',
        openTime: '08:00-22:00',
        courtTypes: [
          { type: '室内硬地', count: 8, priceAdjust: 1.2 },
          { type: '室外硬地', count: 12, priceAdjust: 1.0 }
        ]
      },
      {
        id: 3,
        name: '朝阳公园网球馆',
        address: '北京市朝阳区朝阳公园南路1号',
        price: 120,
        priceRange: '90-150',
        prices: {
          weekdayDay: 90,
          weekdayNight: 150,
          weekendDay: 120,
          weekendNight: 150
        },
        image: 'https://picsum.photos/400/200?random=3',
        tags: ['室外', '硬地'],
        rating: 4.5,
        bookingUrl: 'https://www.sun-park.com/?theme=dark#/booking/site#btns',
        openTime: '07:00-23:00',
        courtTypes: [
          { type: '室外硬地', count: 10, priceAdjust: 1.0 }
        ]
      },
      {
        id: 4,
        name: '海淀体育中心',
        address: '北京市海淀区颐和园路12号',
        price: 110,
        priceRange: '90-130',
        prices: {
          weekdayDay: 90,
          weekdayNight: 130,
          weekendDay: 110,
          weekendNight: 130
        },
        image: 'https://picsum.photos/400/200?random=4',
        tags: ['室内', '硬地'],
        rating: 4.3,
        bookingUrl: 'https://www.bjsports.gov.cn/',
        openTime: '08:00-22:00',
        courtTypes: [
          { type: '室内硬地', count: 4, priceAdjust: 1.2 },
          { type: '室外硬地', count: 2, priceAdjust: 1.0 }
        ]
      },
      {
        id: 5,
        name: '天坛体育中心',
        address: '北京市东城区体育馆路4号',
        price: 80,
        priceRange: '40-100',
        prices: {
          weekdayDay: 40,
          weekdayNight: 100,
          weekendDay: 80,
          weekendNight: 100
        },
        image: 'https://picsum.photos/400/200?random=5',
        tags: ['室外', '硬地'],
        rating: 4.2,
        bookingUrl: 'https://www.bjdch.gov.cn/zwgk/sjgk/sjxz/whty/',
        openTime: '08:00-22:00',
        courtTypes: [
          { type: '室内硬地', count: 4, priceAdjust: 1.2 },
          { type: '室外硬地', count: 2, priceAdjust: 1.0 }
        ]
      }
    ],
    districtFilter: '全部',
    districts: ['全部', '朝阳区', '海淀区', '东城区', '西城区', '丰台区']
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '选择球场'
    })
  },

  onDistrictChange(e) {
    const index = e.detail.value
    this.setData({
      districtFilter: this.data.districts[index]
    })
  },

  selectCourt(e) {
    const courtId = e.currentTarget.dataset.id
    const court = this.data.courts.find(c => c.id === courtId)
    const pricesStr = encodeURIComponent(JSON.stringify(court.prices))
    const courtTypesStr = encodeURIComponent(JSON.stringify(court.courtTypes))
    const tagsStr = encodeURIComponent(JSON.stringify(court.tags))
    wx.navigateTo({
      url: `/pages/booking/time-select/time-select?courtId=${courtId}&courtName=${court.name}&price=${court.price}&bookingUrl=${encodeURIComponent(court.bookingUrl)}&openTime=${court.openTime}&prices=${pricesStr}&courtTypes=${courtTypesStr}&address=${encodeURIComponent(court.address)}&image=${encodeURIComponent(court.image)}&rating=${court.rating}&tags=${tagsStr}`
    })
  }
})
