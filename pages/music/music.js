// pages/music/music.js
const InnerAudioContext = wx.createInnerAudioContext();
Page({
  getMusicInfo:function(){
    const searchUrl ='https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0';
    wx.request({
      url: searchUrl, 
      data: {
        p: 1,
        n: 1,
        w:'桥边姑娘'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
      }
    })
  },
  getMusicToken: function (songmid) {
    const searchUrl = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&guid=126548448';
    wx.request({
      url: searchUrl,
      data: {
        songmid: songmid,
        filename: 'C400' + songmid+'.m4a' 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        const musicUrl = 'http://ws.stream.qqmusic.qq.com/' + filename + '?fromtag=0&guid=126548448&vkey=' + res.data.vkey
      }
    })
  },
  playMusic:function(){
    InnerAudioContext.src = 'http://music.163.com/song/media/outer/url?id=1346496466.mp3';
    InnerAudioContext.play();
    InnerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    InnerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  pauseMusic: function () {
    InnerAudioContext.pause();
    InnerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

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

  }
})