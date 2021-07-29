Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList:['activity1@2x.png', 'activity2@2x.png', 'activity3@2x.png','activity1@2x.png', 'activity2@2x.png', 'activity3@2x.png'],
    coursesName: ['吉他课程', '钢琴课程', '萨克斯课程', '小提琴课程', '架子鼓课程', '古筝课程', '非洲鼓课程', '流行声乐课程', '尤克里里课程' ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  viewCourses(e){
    const id = e.currentTarget.dataset.id || ''
    const url = '/pages/courses/courses?id='+id
    wx.navigateTo({ url: url})
  },
})