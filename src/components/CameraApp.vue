<template>
  <div class="root">
    <div id="canvasFrame" :style="{ maxWidth: `${length}px` }">
      <div>
        <canvas ref="canvas"/>
      </div>
    </div>
    <video ref="video" playsinline @canplaythrough="startRendering"/>

    <div class="controls">
      <div class="backBtn" @click="closeApp">Back</div>
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

export default {
  props: ['onClose', 'threshold', 'radius', 'onSet'],
  components: { CheckImage },
  data() {
    return {
      reqID: null,
      vw: null,
      vh: null,
      length: null,
      ctx: null,
      imageData: null,
      checking: false,
    };
  },
  mounted() {
    getCam(this.$refs.video, { video: { facingMode: 'environment' }, audio: false }, () => {
      this.onClose();
    });
  },
  methods: {
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
      this.$refs.video.pause();
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

        const length = this.length;
        const ctx = this.ctx;

        ctx.drawImage(this.$refs.video, (this.vw - length) / 2, (this.vh - length) / 2,
          length, length, 0, 0, length, length);
        this.imageData = ctx.getImageData(0, 0, length, length);
        this.checking = true;
      }, 500);
    },
    onDecide(imageData) {
      this.checking = false;
      this.onSet(imageData);
    },
    onCancel() {
      this.checking = false;
      this.$refs.video.play();
      this.render();
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
</style>
