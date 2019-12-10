// pages/music/music.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
backgroundAudioManager.title = '劲音乐';
let fileName='';
let vKey='';
let musicUrl='';
let inputValue='';
Page({
  bindKeyInput: function (e) {
    inputValue=e.detail.value
  },
  getMusicInfo: function (){
    const searchUrl ='https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0';
    wx.request({
      url: searchUrl, 
      data: {
        p: 1,
        n: 1,
        w: inputValue
      },
      header: {
        'content-type': 'application/json', // 默认值
        'dataType':'jsonp'
      },
      success(res) {
        const jsonRes = JSON.parse(res.data.substr(8).split(')')[0].split('(')[1]);
        console.info(jsonRes.data.song.list[0].songmid);
        fileName = 'C400' + jsonRes.data.song.list[0].songmid + '.m4a'
        wx.request({
          url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&guid=126548448',
          data: {
            songmid: jsonRes.data.song.list[0].songmid,
            filename: fileName
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.showToast({
              title: '成功，点击播放',
              duration: 2000,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            console.log(JSON.stringify(res.data.data.items[0].vkey));
            vKey = res.data.data.items[0].vkey;
            musicUrl = 'http://ws.stream.qqmusic.qq.com/' + fileName + '?fromtag=0&guid=126548448&vkey=' + vKey;
            console.info(musicUrl);
          }
        })
       
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
    backgroundAudioManager.src = musicUrl;
    backgroundAudioManager.play();
    backgroundAudioManager.onPlay(() => {
      console.log('开始播放')
    })
    backgroundAudioManager.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  pauseMusic: function () {
    backgroundAudioManager.pause();
    backgroundAudioManager.onError((res) => {
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