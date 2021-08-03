// pages/products/products.js
const app = getApp();
let myutil = require('../../utils/myutil.js')
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
    activeInfo: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    this.setData({
      id: options.id
    })
    // 产品详情
    let parms = {
      method: 'get',
      data: {},
      url: `/product/${_this.data.id}`,
      success: function (resp) {
        const indicatorDots = resp.data.imgFileList.length > 1 ? true : false
        _this.setData({
          activeInfo: resp.data,
          indicatorDots: indicatorDots
        })
      }
    };
    app.sendRequest(parms)

    // 用户信息
    if (app.globalData.userInfo) {
      if (myutil.isEmpty(app.globalData.userInfo.avatarUrl)) {
        this.setData({
          isHasName: true
        })
      } else {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

  },
  getUserInfo: function (e) {
    console.log(e)
  },
  getPhoneNumber: function (e) {
    console.log(e)
  },
})