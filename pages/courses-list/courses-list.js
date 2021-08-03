// 获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgBaseUrl: app.globalData.imgBaseUrl,
    coursesList:[],
    page: 1,
    pages: 0,
    size: 8,
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      title: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getList(1, true)
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
      this.getList(this.data.page + 1)
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
  getList(pageNo, over) {
    const _this = this
    // 获取课程分类下的课程 (关联店铺)
    let courseParms = {
      method: 'get',
      data: {
        current: pageNo,
        size: this.data.size,
        courseSortId: this.data.id,
      },
      url: `/course/page-list`,
      success: function(resp) {
        _this.setData({
          noMore: resp.data.total <= resp.data.size,
          page: resp.data.current,
          pages: resp.data.pages,
          coursesList: over ? resp.data.records : _this.data.coursesList.concat(resp.data.records)
        })
      }
    };
    app.sendRequest(courseParms)
  },
  viewCourses(e){
    const id = e.currentTarget.dataset.id || ''
    const url = '/pages/courses/courses?id='+id
    wx.navigateTo({ url: url})
  },
  //预览图片，放大预览
  preview(event) {
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl]
    })
  }
})