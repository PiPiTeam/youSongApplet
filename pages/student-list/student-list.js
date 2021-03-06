// pages/student-list/student-list.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeId: app.globalData.storeId,
    imgBaseUrl: app.globalData.imgBaseUrl,
    storeId: app.globalData.storeId,
    studentList:[],
    page: 1,
    pages: 0,
    size: 16,
    noMore: false
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
    console.log('触发了')
    if (this.data.page < this.data.pages) {
      this.getPageList(this.data.page + 1)
    } else {
      this.setData({
        noMore: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goStudent(e) {
    const id = e.currentTarget.dataset.id || ''
    const title = e.currentTarget.dataset.title || ''
    const url = '/pages/student/student?id='+id+'&title='+title
    wx.navigateTo({ url: url})
  },
  getPageList(pageNo, over) {
    const _this = this
    let parms = {
      method: 'get',
      data: {
        current: pageNo,
        size: this.data.size,
        storeId: app.globalData.storeId,
      },
      url: `/style/student/page-list`,
      success: function(resp) {
        resp.data.records.map(function(item) {
          if(item.videoContent) {
            item.video = JSON.parse(item.videoContent)[0]
            item.videoIsPlay = false
          }
        })
        _this.setData({
          noMore: resp.data.total <= resp.data.size,
          page: resp.data.current,
          pages: resp.data.pages,
          studentList: over ? resp.data.records : _this.data.studentList.concat(resp.data.records)
        })
        console.log(_this.data.studentList)
      }
    };
    app.sendRequest(parms)
  },
  videoPlay: function(e) {
    const index = e.currentTarget.dataset.index
    const setPlay = `studentList[${index}].videoIsPlay`
    console.log(setPlay)
    this.setData({
      [setPlay]: true
    })
  },
  videoPause: function(e) {
    const index = e.currentTarget.dataset.index
    const setPlay = `studentList[${index}].videoIsPlay`
    this.setData({
      [setPlay]: false
    })
  },
})