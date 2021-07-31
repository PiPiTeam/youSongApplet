// pages/events/events.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: app.globalData.storeId,
    page: 1,
    pages: 0,
    eventsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初次加载，请求第一页数据
    this.getPageList(1, true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.loading && this.data.page < this.data.pages) {
      this.getInfoListData(this.data.page + 1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goEventDetail(e) {
    const id = e.currentTarget.dataset.id || ''
    const url = '/pages/event-detail/event-detail?id='+id
    wx.navigateTo({ url: url})
  },
  getPageList(pageNo, over) {
    const _this = this
    wx.request({
      url: 'http://118.195.176.248:8002/activity/page-list',
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: pageNo,
        size: 8
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          eventsList: over ? resp.data.records : this.data.eventsList.concat(resp.data.records)
        })
      }
    })
  }
})