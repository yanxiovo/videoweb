<template>
  <div id="app">
    <div id="player">
      <video id="videoPlayer" ref="videoRef" src="../assets/过掉守门员1.mp4"></video>
    </div>
  </div>
</template>

<script>
import 'plyr/dist/plyr.css';
import Barrage from 'barrage-ui';
import Plyr from 'plyr';

export default {
  data() {
    return {
      videoRef: null,
      danmaku: null,
      player: null,
      barrageList: [
        { content: '弹幕1', time: 10, userId: '123456', userName: '用户1' },
        { content: '弹幕2', time: 10, userId: '123457', userName: '用户2' },
      ],
      Element: null,
    };
  },
  // 在 mounted 钩子中添加全屏事件监听
  mounted() {
    const video = this.$refs.videoRef;
    const player = document.getElementById('videoPlayer');
    // 初始化 Plyr
    this.player = new Plyr(video, {
      captions: { active: true, update: true }, // 启用字幕功能
 
    });
     this.Element = document.getElementById('app');
    // 监听视频全屏变化事件
    video.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === video) {
        // 进入全屏
        player.requestFullscreen();
        console.log('进入全屏');
      } else {
        // 退出全屏
        document.exitFullscreen();
        console.log('退出全屏');
      }
    });

    // Load danmaku
    const barrage = new Barrage({
      container: document.getElementById('player'), // 父级容器
      config: {
        // Global configuration
        duration: 20000, // Duration of barrage cycle (in ms)
        defaultColor: '#fff', // Default color of barrage
      },
    });

    // Add a new barrage
    barrage.add({
      key: 'fctc651a9pm2j20bia8j', // Unique identifier for the barrage
      time: 1000, // Time for the barrage to appear (in ms)
      text: '这是新增的一条弹幕', // Barrage text content
      fontSize: 24, // Font size of the barrage (in px), will override global settings
      color: '#0ff', // Color of the barrage, will override global settings
    });

    // Play the barrage
    barrage.play();
  },

  methods: {
  },
};
</script>

<style scoped>
#player {
  position: relative;
  width: 1120px;
  height: 630px;
  overflow: hidden;
}

#player:fullscreen {
  width: 100%;
  height: 100%;
}
 canvas{
  z-index:999;
 }
  
</style>

