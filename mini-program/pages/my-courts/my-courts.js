Page({
  data: {
    visitedCourts: [],
    loading: true
  },

  onLoad() {
    this.loadVisitedCourts();
  },

  onShow() {
    this.loadVisitedCourts();
  },

  loadVisitedCourts() {
    try {
      const courts = wx.getStorageSync('visitedCourts') || [];
      this.setData({
        visitedCourts: courts,
        loading: false
      });
    } catch (err) {
      console.error('加载去过的球场失败', err);
      this.setData({ loading: false });
    }
  },

  deleteCourt(e) {
    const index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '删除记录',
      content: '确定要删除这个球场记录吗？',
      success: (res) => {
        if (res.confirm) {
          const courts = this.data.visitedCourts;
          courts.splice(index, 1);
          try {
            wx.setStorageSync('visitedCourts', courts);
            this.setData({ visitedCourts: courts });
          } catch (err) {
            console.error('删除记录失败', err);
          }
        }
      }
    });
  },

  clearAll() {
    if (this.data.visitedCourts.length === 0) {
      wx.showToast({
        title: '暂无记录',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '清空记录',
      content: '确定要清空所有球场记录吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.removeStorageSync('visitedCourts');
            this.setData({ visitedCourts: [] });
            wx.showToast({
              title: '已清空',
              icon: 'success'
            });
          } catch (err) {
            console.error('清空记录失败', err);
          }
        }
      }
    });
  },

  goToCourtList() {
    wx.switchTab({
      url: '/pages/booking/court-list/court-list'
    });
  }
});
