// index.js
// 获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    baseUrl: app.globalData.baseUrl,
    imgBaseUrl: app.globalData.imgBaseUrl,
    storeId: '7',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    background: [],
    studentList: [],
    teacherList: [],
    productList: [],
    coursesList: [],
    storeInfo: {
      content: '',
      imgFileList: []
    },
    events:[],
    coursesBanner: ['guitar@2x.png','piano@2x.png','sachs@2x.png', 'violin@2x.png','drum_kit@2x.png', 'guzheng@2x.png', 'africandrum@2x.png', 'pop_vocal@2x.png', 'ukulele@2x.png',],
    coursesName: ['吉他课程', '钢琴课程', '萨克斯课程', '小提琴课程', '架子鼓课程', '古筝课程', '非洲鼓课程', '流行声乐课程', '尤克里里课程' ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../events/events'
    })
  },
  onLoad() {
    const _this = this
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 请求banner
    wx.request({
      url: `${_this.data.baseUrl}/store/${_this.data.storeId}/banner/list`,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          background: resp.data
        })
      }
    })

    // 课程分类
    wx.request({
      url: `${_this.data.baseUrl}/course-sort/list`,
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        console.log(resp.data)
        _this.setData({
          coursesBanner: resp.data
        })
      }
    })

    // 活动
    wx.request({
      url: `${_this.data.baseUrl}/activity/page-list`,
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: 1,
        size: 3
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          events: resp.data.records
        })
      }
    })

    // 本店介绍
    wx.request({
      url: `${_this.data.baseUrl}/store/${_this.data.storeId}/intro`,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          storeInfo: resp.data
        })
      }
    })
    // 名师
    wx.request({
      url: `${_this.data.baseUrl}/style/teacher/page-list`,
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: 1,
        size: 4
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          teacherList: resp.data.records
        })
      }
    })
    // 学员
    wx.request({
      url: `${_this.data.baseUrl}/style/student/page-list`,
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: 1,
        size: 4
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          studentList: resp.data.records
        })
      }
    })

    // 产品
    wx.request({
      url: `${_this.data.baseUrl}/product/page-list`,
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: 1,
        size: 4
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        _this.setData({
          productList: resp.data.records
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  goStudent(e) {
    const id = e.currentTarget.dataset.id || ''
    const title = e.currentTarget.dataset.title || ''
    const url = '/pages/student/student?id='+id+'&title='+title
    wx.navigateTo({ url: url})
  },
  goTeacher(e) {
    const id = e.currentTarget.dataset.id || ''
    const title = e.currentTarget.dataset.title || ''
    const url = '/pages/teacher/teacher?id='+id+'&title='+title
    wx.navigateTo({ url: url})
  },
  viewCourses(e){
    const id = e.currentTarget.dataset.id || ''
    const num = e.currentTarget.dataset.num
    const name = e.currentTarget.dataset.name
    if(+num) {
      const url = '/pages/courses-list/courses-list?id='+id+'&name='+name
      wx.navigateTo({ url: url})
    } else {
      wx.showToast({
        title: '分类下暂无课程',
        icon: 'none'
      })
    }
  },
  goAvtiveList() {
    wx.navigateTo({ url: '/pages/events/events' })
  },
  goProductList() {
    wx.navigateTo({ url: '/pages/products-list/products-list' })
  },
  goStudentList() {
    wx.navigateTo({ url: '/pages/student-list/student-list' })
  },
  goTeacherList() {
    wx.navigateTo({ url: '/pages/teacher-list/teacher-list' })
  },
  goEventDetail(e) {
    const id = e.currentTarget.dataset.id || ''
    const url = '/pages/event-detail/event-detail?id='+id
    wx.navigateTo({ url: url})
  },
  goProductDetail(e) {
    const id = e.currentTarget.dataset.id || ''
    const url = '/pages/products/products?id='+id
    wx.navigateTo({ url: url})
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
