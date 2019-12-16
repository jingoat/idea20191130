// pages/music/music.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
backgroundAudioManager.title = '劲音乐';
let inputValue='';
Page({
  bindKeyInput: function (e) {
    inputValue=e.detail.value
  },
  getMusicInfo: function (){
    const _this=this;
    const searchUrl ='https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0';
    wx.request({
      url: searchUrl, 
      data: {
        p: 1,
        n: 10,
        w: inputValue
      },
      header: {
        'content-type': 'application/json', // 默认值
        'dataType':'jsonp'
      },
      success(res) {
        // console.info(res.data);
        const jsonRes = JSON.parse(res.data.substring(9, res.data.length-1));
        // console.info(jsonRes.data.song.list);
        _this.setData({ musicList: jsonRes.data.song.list});  
      }
    })
  },
  getMusicToken: function (songmid) {
    const _this=this;
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
        console.log(`getMusicToken-----${JSON.stringify(res.data)}`);
        const myVkey = res.data.data.items[0].vkey || res.data.vkey|| undefined;
        console.log(`myVkey---${myVkey}`);
        if (myVkey===undefined){
          wx.showToast({
            title: '收费歌曲,暂无权限',
            icon: 'none',
            duration: 1000
          });
          return;
        }
        const musicUrl = 'http://ws.stream.qqmusic.qq.com/' + 'C400' + songmid + '.m4a' + '?fromtag=0&guid=126548448&vkey=' + myVkey;
        console.log(`musicUrl---${musicUrl}`);
        _this.playMusic(musicUrl);

      }
    })
  },
  playMusic: function (musicUrl){
    console.info(`backgroundAudioManager.paused--${backgroundAudioManager.paused}`);
    backgroundAudioManager.title = '劲音乐';
    backgroundAudioManager.src = musicUrl;
    if (!backgroundAudioManager.paused){
      backgroundAudioManager.pause();
    }else{
      backgroundAudioManager.play();
    }
    
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

  clickToPlay: function (e){
    console.info('正在加载...');
    var songmid = e.currentTarget.dataset.id;
    console.info(`songmid---${songmid}`);
    const _this=this;
    _this.getMusicToken(songmid);
  },

  /**
   * 页面的初始数据
   */
  data: {
    musicList:[]
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