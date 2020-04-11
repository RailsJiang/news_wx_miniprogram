var app = getApp()
const common = require('../../utils/util')
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    resultDict: {},
    typeList: [
      {name: '国内', order: 0, type: 'gn'},
      {name: '国际', order: 1, type: 'gj'},
      {name: '财经', order: 2, type: 'cj'},
      {name: '娱乐', order: 3, type: 'yl'},
      {name: '军事', order: 4, type: 'js'},
      {name: '体育', order: 5, type: 'ty'},
      {name: '其他', order: 6, type: 'other'}
    ]
  },
  onLoad(){
    //获取窗口高度和宽度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
    this.setAllNewsData()
  },
  onPullDownRefresh(){
    this.setAllNewsData(()=>{
      wx.stopPullDownRefresh()
    })
  },
  swichNav(e) {
    //点击Tab切换
    if(this.data.currentTab === e.target.dataset.current){
      return false
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange(e) {
    //滑动Tab切换
    this.setData({
      currentTab: e.detail.current
    })
  },
  onTapItem(e){
    let id = e.currentTarget.dataset.nid
    console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  setAllNewsData(callback){
    //加载所有类型新闻列表数据
    let typeList = this.data.typeList
    for(var i=0;i<typeList.length;i++){
      let newsType = typeList[i].type
      this.getNewsList(newsType, callback)
    }
    console.log(this.data.resultDict)
  },
  getNewsList(newsType, callback) {
    //访问新闻列表接口,获取列表数据
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let result = res.data.result
        for (var i=0; i<result.length; i++) {
          result[i]['timeStr'] = common.getTime(result[i]['date'])
        }
        let resultDict = this.data.resultDict
        resultDict[newsType] = result
        this.setData({
          resultDict: resultDict
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
