// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('logincode', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getStoreId() {

  },
  globalData: {
    storeId: '7',
    userInfo: null,
    appid: 'afdfdsfdsfd',//appid需自己提供，此处的appid我随机编写  
    secret: 'adfdsfdsghhafdhadfhfdhfheegccxda23zf',//secret需自己提供，此处的secret我随机编写 
    openid:'',
    baseUrl: 'http://118.195.176.248:8002',
    imgBaseUrl: 'http://118.195.176.248:8001/static/'
  }
})
