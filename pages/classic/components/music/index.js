// pages/classic/components/music/index.js
import {classicBeh} from '../classic-beh'
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  behaviors:[classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    // img:String,
    // content:String
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:"images/stop.png",
    playSrc:"images/start.png",
    playing:false
  },
  attached(){
    this._recoverStatus();
    this._monitorSwitch();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //音乐播放
    onPlay(){
      this.setData({
        playing:!this.data.playing
      })
      if(this.data.playing){
        backgroundAudioManager.title = this.properties.title;
        backgroundAudioManager.src = this.properties.src;
      }else{
        backgroundAudioManager.pause();
      }
    },
    _recoverStatus(){
      if(backgroundAudioManager.paused){
        this.setData({
          playing:false
        })
      }else if(backgroundAudioManager.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    _monitorSwitch(){
      //播放
      backgroundAudioManager.onPlay(()=>{
        this._recoverStatus();
      })
      //暂停
      backgroundAudioManager.onPause(()=>{
        this._recoverStatus();
      })
      //关闭
      backgroundAudioManager.onStop(()=>{
        this._recoverStatus();
      })
      //播放完
      backgroundAudioManager.onEnded(()=>{
        this._recoverStatus();
      })
    }
  }
})
