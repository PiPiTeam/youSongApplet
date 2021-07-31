Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBaseUrl: 'http://118.195.176.248:8001/static/',
    coursesList:[],
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
    this.setData({
      height:wx.getSystemInfoSync().windowHeight
    })
    this.getList()
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
  getList() {
    const _this = this
    // 获取课程分类下的课程 (关联店铺)
    wx.request({
      url: 'http://118.195.176.248:8002/course/list',
      method: 'GET',
      data: {
        courseSortId: _this.data.id,
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        console.log(resp.data)
        _this.setData({
          coursesList: resp.data
        })
      }
    })
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