const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


function validataMobile(mobile) {
    if (mobile == '') {
        return "手机号码不能为空！";
    }
    var trueMobile = /^\+?\d{11}$/;
    if (!trueMobile.test(mobile)) {
        return "手机号码格式不正确！";
    }
    return;
}


function validateEmail(email) {
    if (email == '') {
        return "电子邮件不能为空！";
    }
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
        return "电子邮件格式不正确！";
    }
    return;
}

function cancel() {
    wx.navigateBack({})
}

function indexOf(list, value) {
    if (!list || !value) {
        return -1;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i] == value) {
            return i;
        }
    }
    return -1;
}

function showSuccess(msg) {
    wx.showToast({
        title: msg,
        mask: true,
        icon: 'success',
        duration: 2000
    });
}

function showError(errMsg) {
    wx.showToast({
        title: errMsg,
        mask: true,
        icon: 'none',
        duration: 2000
    });

}

function showLoading(msg) {
    var title = msg;
    if (!title) {
        title = "加载中...";
    }
    wx.showLoading({
        title: title,
        mask: true
    })
}

function hideLoading() {
    wx.hideLoading();
}

function showAlert(message, successCallback) {
    if (!successCallback) {
        successCallback = function () {
        }
    }
    wx.showModal({
        title: '提示',
        content: message,
        showCancel: false,
        success: successCallback
    })
}

function isEmpty(str) {
    if (str === undefined || str === null || str === "" ||  ((Array.isArray(str)) && (str.length <= 0))) {
        return true;
    } else {
        return false;
    }
}

function pageDeal(data, that) {
    if (!isEmpty(data.list)) {
        let list = that.data.videos.concat(data.list)
        that.setData(
            {videos: list, total: data.pagination.total}
        )
        if (data.list.length < that.data.pageSize) {
            that.setData({isAll: true})
        } else {
            that.setData({current: that.data.current + 1})
        }
    } else {
        that.setData({isAll: true})
    }
    wx.stopPullDownRefresh();
}

function clearPage(that) {
    that.setData({isAll: false, current: 1, pageSize: 18, videos: []})
}

function showConfirm(message, successCallback) {
    if (!successCallback) {
        successCallback = function () {
        }
    }
    wx.showModal({
        title: '确认',
        content: message,
        success: successCallback
    })
}

module.exports = {
    formatTime: formatTime,
    pageDeal: pageDeal,
    isEmpty: isEmpty,
    validataMobile: validataMobile,
    clearPage: clearPage,
    validateEmail:
    validateEmail,
    indexOf:
    indexOf,
    showAlert:
    showAlert,
    showConfirm:
    showConfirm,
    hideLoading:
    hideLoading,
    showLoading:
    showLoading,
    showSuccess:
    showSuccess,
    cancel: cancel,
    showError:
    showError
}
