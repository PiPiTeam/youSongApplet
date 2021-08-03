// app.js
let myutil = require('./utils/myutil.js')
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    this.getUserInfo()
    // 获取店铺信息
    this.getStoreInfo()
  },
  sendRequest: function (param, customSiteUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;

    if (customSiteUrl) {
      requestUrl = customSiteUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        header = header || {
          'content-type': 'application/json'
        }
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      this.showLoading({
        title: '请求中...'
      });
    }
    wx.request({
      url: requestUrl,
      data: data,
      method: param.method || 'GET',
      header: header || {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status) {
          if (res.data.status === '3000') {
            that.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 3000
            });
            return;
          }
          if (res.data.status !== "10000") {
            that.hideToast();
            that.showModal({
              content: '很抱歉 你当前网络出现卡顿 请稍后重试',
              confirm: function () {}
            });
            return;
          }
        }
        typeof param.success == 'function' && param.success(res.data);
      },
      fail: function (res) {
        console.log('request fail:', requestUrl, res.errMsg);
        that.hideToast();
        if (res.errMsg == 'request:fail url not in domain list') {
          that.showToast({
            title: '请配置正确的请求域名',
            icon: 'none',
            duration: 2000
          });
        }
        typeof param.fail == 'function' && param.fail(res.data);
      },
      complete: function (res) {
        try {
          param.hideLoading || that.hideLoading();
        } catch (e) {
          console.log("错误")
          console.log(e)
        }
        typeof param.complete == 'function' && param.complete(res.data.result);
      }
    });
  },
  showToast: function (param) {
    wx.showToast({
      title: param.title,
      icon: param.icon,
      duration: param.duration || 1500,
      success: function (res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  hideToast: function () {
    wx.hideToast();
  },
  showLoading: function (param) {
    wx.showLoading({
      title: param.title,
      success: function (res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  hideLoading: function () {
    wx.hideLoading();
  },
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  getUserInfo: function () {
    let that = this
    console.log(myutil.isEmpty(that.globalData.userInfo))
    if (myutil.isEmpty(that.globalData.userInfo)) {
      wx.login({
        success: res => {
          console.log(res)
          let parms = {
            method: 'post',
            data: {
              appId: this.globalData.appid,
              code: res.code
            },
            url: '/wx/user/login',
            success: function (data) {
              that.globalData.userInfo = data
            }
          }
          that.sendRequest(parms)
        }
      })
    } else {
      return that.globalData.userInfo
    }
  },
  getStoreInfo: function (callback) {
    const _this = this
    let parms = {
      method: 'get',
      data: {
        serviceid: this.globalData.serviceid
      },
      url: '/store',
      success: function (resp) {
        _this.globalData.storeId = resp.data.id
        _this.globalData.storeInfo = resp.data
        console.log('storeId', _this.globalData.storeId)
        callback && callback()
      }
    }
    this.sendRequest(parms)
  },
  globalData: {
    appid: 'wx3f0c649db3da5e82', //appid  
    serviceid: '71FBD63F332146ADBD7B33372B8C1389', // 服务id
    storeId: '', // 店铺id
    storeInfo: null, // 店铺信息
    userInfo: null,
    openid: '',
    siteBaseUrl: 'http://118.195.176.248:8002', // 172.18.10.5
    imgBaseUrl: 'http://118.195.176.248:8001/static/'
  }
})