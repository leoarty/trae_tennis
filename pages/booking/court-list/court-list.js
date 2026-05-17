Page({
  data: {
    courts: [
      {
        id: 1,
        name: '国家网球中心',
        address: '北京市朝阳区林萃路2号',
        price: 130,
        image: 'https://picsum.photos/400/200?random=1',
        tags: ['室内', '硬地', '灯光'],
        rating: 4.8,
        bookingUrl: 'https://mp.weixin.qq.com/s?__biz=MzA5NjEyMDUyMA==&mid=2651012345&idx=1&sn=abc123',
        openTime: '07:00-22:00'
      },
      {
        id: 2,
        name: '奥体中心网球场',
        address: '北京市朝阳区安定路1号',
        price: 140,
        image: 'https://picsum.photos/400/200?random=2',
        tags: ['室外', '硬地'],
        rating: 4.6,
        bookingUrl: 'http://www.noscapp.cn/noscwechat/',
        openTime: '08:00-22:00'
      },
      {
        id: 3,
        name: '朝阳公园网球馆',
        address: '北京市朝阳区朝阳公园南路1号',
        price: 120,
        image: 'https://picsum.photos/400/200?random=3',
        tags: ['室外', '硬地'],
        rating: 4.5,
        bookingUrl: 'https://www.sun-park.com/?theme=dark#/booking/site#btns',
        openTime: '07:00-23:00'
      },
      {
        id: 4,
        name: '海淀体育中心',
        address: '北京市海淀区颐和园路12号',
        price: 110,
        image: 'https://picsum.photos/400/200?random=4',
        tags: ['室内', '硬地'],
        rating: 4.3,
        bookingUrl: 'https://www.bjsports.gov.cn/',
        openTime: '08:00-22:00'
      },
      {
        id: 5,
        name: '天坛体育中心',
        address: '北京市东城区体育馆路4号',
        price: 80,
        image: 'https://picsum.photos/400/200?random=5',
        tags: ['室外', '硬地'],
        rating: 4.2,
        bookingUrl: 'https://www.bjdch.gov.cn/zwgk/sjgk/sjxz/whty/',
        openTime: '08:00-22:00'
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
    wx.navigateTo({
      url: `/pages/booking/time-select/time-select?courtId=${courtId}&courtName=${court.name}&price=${court.price}&bookingUrl=${encodeURIComponent(court.bookingUrl)}&openTime=${court.openTime}`
    })
  }
})
