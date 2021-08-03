// pages/event-detail/event-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBaseUrl: app.globalData.imgBaseUrl,
    storeId: '7',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    id: '',
    htmlSnip: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    this.setData({id: options.id})
    // 活动详情
    wx.request({
      url: `${app.globalData.baseUrl}/activity/${_this.data.id}`,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        wx.setNavigationBarTitle({
          title: resp.data.title
        })
        _this.setData({htmlSnip: resp.data.content})
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})