// pages/detail/detail.js

const common = require('../../utils/util')

Page({
  data: {
    pageInfo: {}
  },
  onLoad: function (options) {
    //初始化页面并获取新闻详情
    this.getPageDetail(options.id)
  },
  getPageDetail(newId){
    //获取新闻详情
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newId
      },
      success: res => {
        let result = res.data.result
        result['dateStr'] = common.getTime(result['date'])
        this.setData({
          pageInfo: result
        })
        console.log(result)
      }
    })
  }
})