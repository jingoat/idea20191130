// pages/musicRecommend/musicRecommend.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
backgroundAudioManager.title = '劲音乐';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMusicList:[]
  },

  navigateToSearch:function(){
    console.info("navigate");
    wx.redirectTo({
      url:'pages/music/music',
      success: function (res) {
        console.info("navigate-success");
      }
    })
  },

  searchTopMusics:function(){
    const _this=this;
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'dataType': 'jsonp'
      },
      success(res) {
        // console.info(res.data.songlist);
        _this.setData({ topMusicList: res.data.songlist})
      }
    })
  },
  getMusicToken: function (songmid) {
    const _this = this;
    const searchUrl = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&guid=126548448';
    wx.request({
      url: searchUrl,
      data: {
        songmid: songmid,
        filename: 'C400' + songmid + '.m4a'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(`getMusicToken-----${JSON.stringify(res.data)}`);
        const myVkey = res.data.data.items[0].vkey || res.data.vkey || undefined;
        console.log(`myVkey---${myVkey}`);
        if (myVkey === undefined) {
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
  playMusic: function (musicUrl) {
    console.info(`backgroundAudioManager.paused--${backgroundAudioManager.paused}`);
    backgroundAudioManager.src = musicUrl;
    backgroundAudioManager.title = '劲音乐';
    if (!backgroundAudioManager.paused) {
      backgroundAudioManager.pause();
    } else {
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
  clickToPlay: function (e) {
    console.info('正在加载...');
    const musicInfo = e.currentTarget.dataset.id;
    console.info(musicInfo);
    var songmid = musicInfo.split('@')[0];
    backgroundAudioManager.epname = musicInfo.split('@')[1];
    backgroundAudioManager.singer = musicInfo.split('@')[2];
    console.info(`songmid---${songmid}`);
    const _this = this;
    _this.getMusicToken(songmid);
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
    this.searchTopMusics();
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