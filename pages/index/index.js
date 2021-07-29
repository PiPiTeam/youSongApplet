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
    imgBaseUrl: '//118.195.176.248:8001/static/',
    storeId: '7',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    background: [],
    studentList: [],
    productList: [],
    storeInfo: {
      content: '',
      imgFileList: []
    },
    events:['activity1@2x.png', 'activity2@2x.png', 'activity3@2x.png'],
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
      url: 'http://118.195.176.248:8002/store/7/banner/list',
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

    // 课程
    wx.request({
      url: 'http://118.195.176.248:8002/course/page-list',
      method: 'GET',
      data: {
        storeId: _this.data.storeId,
        current: 1,
        size: 100
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        const resp = res.data
        console.log(resp)
        // _this.setData({
        //   background: resp.data
        // })
      }
    })

    // 活动
    wx.request({
      url: 'http://118.195.176.248:8002/activity/page-list',
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
        console.log(resp)
        // _this.setData({
        //   background: resp.data
        // })
      }
    })

    // 本店介绍
    wx.request({
      url: `http://118.195.176.248:8002/store/${_this.data.storeId}/intro`,
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

    // 学员
    wx.request({
      url: 'http://118.195.176.248:8002/style/student/page-list',
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
      url: 'http://118.195.176.248:8002/product/page-list',
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
    const url = '/pages/student/student?id='+id
    wx.navigateTo({ url: url})
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
