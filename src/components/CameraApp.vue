<template>
  <div class="root">
    <div id="canvasFrame" :style="{ maxWidth: `${length}px` }">
      <div>
        <canvas ref="canvas"/>
      </div>
    </div>
    <video ref="video" playsinline @canplaythrough="startRendering"/>
    <div class="controls">
      <ThresholdBar class="thresholdBar" :value="threshold" :onChange="changeThreshold"/>
      <div class="backBtn" @click="closeApp">Top</div>
      <div class="facingBtn" @click="changeFacing">カメラ変更</div>
      <div class="shutter" @click="shoot"/>
    </div>

    <div class="blackFilter" ref="blackFilter"/>
    <CheckImage v-if="checking" :onCancel="onCancel" :onDecide="onDecide" :threshold="threshold" :radius="radius" :imageData="imageData"/>
  </div>
</template>

<script>
import getCam from '@/utils/getCam';
import detectCanvas from '@/utils/detectCanvas';
import CheckImage from '@/components/CheckImage';
import ThresholdBar from '@/components/ThresholdBar';
import osType from '@/utils/osType';

let facingMode = 'environment';

export default {
  props: ['onClose', 'onSet'],
  components: { CheckImage, ThresholdBar },
  data() {
    return {
      threshold: 120,
      radius: 0.9,
      reqID: null,
      vw: null,
      vh: null,
      length: null,
      ctx: null,
      imageData: null,
      checking: false,
      isPC: osType.isPC(),
    };
  },
  mounted() {
    this.setVideo();
  },
  methods: {
    setVideo() {
      getCam(this.$refs.video, { video: { facingMode }, audio: false }, () => {
        this.onClose();
      });
    },
    startRendering() {
      const video = this.$refs.video;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const length = Math.min(vw, vh);
      this.vw = vw;
      this.vh = vh;
      this.length = length;

      const canvas = this.$refs.canvas;
      canvas.width = length;
      canvas.height = length;

      if (!this.ctx) this.ctx = canvas.getContext('2d');

      this.reqID = requestAnimationFrame(this.render.bind(this));
    },
    stopRendering() {
      cancelAnimationFrame(this.reqID);
    },
    render() {
      const length = this.length;
      const ctx = this.ctx;

      ctx.drawImage(this.$refs.video, (this.vw - length) / 2, (this.vh - length) / 2,
        length, length, 0, 0, length, length);
      const imageData = ctx.getImageData(0, 0, length, length);
      ctx.putImageData(detectCanvas(imageData, this.threshold, this.radius, 0), 0, 0);
      this.reqID = requestAnimationFrame(this.render.bind(this));
    },
    closeApp() {
      this.stopRendering();
      this.onClose();
    },
    shoot() {
      this.stopRendering();
      this.$refs.blackFilter.style.display = 'block';
      setTimeout(() => {
        this.$refs.blackFilter.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        this.$refs.blackFilter.style.display = 'none';
        this.$refs.blackFilter.style.opacity = 1;

        const length = this.length * this.radius;
        const ctx = this.ctx;

        ctx.drawImage(this.$refs.video, (this.vw - length) / 2, (this.vh - length) / 2,
          length, length, 0, 0, length, length);
        this.imageData = ctx.getImageData(0, 0, length, length);
        this.checking = true;
      }, 500);
    },
    changeFacing() {
      facingMode = facingMode === 'user' ? 'environment' : 'user';
      this.setVideo();
    },
    onDecide(imageData) {
      this.checking = false;
      this.$refs.video.pause();
      this.onSet(imageData);
    },
    onCancel() {
      this.checking = false;
      this.render();
    },
    changeThreshold(threshold) {
      this.threshold = threshold;
    },
  },
};
</script>

<style scoped>
.root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}

#canvasFrame {
  margin: 0 auto;
}

#canvasFrame > div {
  position: relative;
  padding-top: 100%;
  background: #000;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

video {
  max-width: 100%;
  position: -webkit-sticky;
  display: none;
}

.controls {
  position: absolute;
  padding-top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}

.backBtn {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 20px;
  transition: 0.25s;
  padding: 10px;
  cursor: pointer;
  border: 1px solid transparent;
}

.backBtn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: #fff;
}

.facingBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 20px;
  padding: 10px;
}

.shutter {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #666;
  box-shadow: 0 0 0 8px #fff;
  background: #fff;
  cursor: pointer;
  transition: .2s;
  margin: 25px auto;
}

.shutter:hover {
  opacity: .8;
}

.blackFilter {
  background: #000;
  transition: 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
}

.thresholdBar {
  width: 80%;

}
</style>
