// pages/student/student.js
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
    studentInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    this.setData({
      id: options.id,
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    // 学员详情
    let parms = {
      method: 'get',
      data: {},
      url: `/style/student/${_this.data.id}`,
      success: function(resp) {
        const indicatorDots = resp.data.imgFileList.length > 1 ? true : false
        if(resp.data.videoContent) {
          resp.data.video = JSON.parse(resp.data.videoContent)[0]
        }
        _this.setData({
          studentInfo: resp.data,
          indicatorDots: indicatorDots
        })
      }
    };
    app.sendRequest(parms)
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