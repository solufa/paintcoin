<template>
  <div class="root">
    <div id="canvasFrame" :style="{ maxWidth: `${Math.min(imageData.width / radius, 500)}px` }">
      <div>
        <div class="frameBorder" :style="{ width: `${(radius + 0.02) * 100}%`, height: `${(radius + 0.02) * 100}%` }"/>
        <canvas ref="canvas" :style="{ width: 100 * radius + '%', height: 100 * radius + '%' }"/>
      </div>
    </div>
    <div class="controls">
      <ThresholdBar :value="threshold" :onChange="onChangeThreshold"/>
      <div class="btn" @click="onSelect">Enter</div>
      <div class="btn" @click="onCancel">Cancel</div>
    </div>
  </div>
</template>

<script>
import detectCanvas from '@/utils/detectCanvas';
import ThresholdBar from '@/components/ThresholdBar';

export default {
  components: { ThresholdBar },
  props: ['onCancel', 'onDecide', 'onChangeThreshold', 'threshold', 'imageData', 'radius'],
  data() {
    return {
      ctx: null,
    };
  },
  watch: {
    threshold() {
      this.draw();
    },
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = this.imageData.width;
    canvas.height = this.imageData.width;
    this.ctx = canvas.getContext('2d');
    this.draw();
  },
  methods: {
    onSelect() {
      this.onDecide(this.ctx.getImageData(0, 0, this.imageData.width, this.imageData.height));
    },
    draw() {
      const tmpImageData = this.ctx.getImageData(0, 0, this.imageData.width, this.imageData.height);
      tmpImageData.data.set(detectCanvas(
        {
          data: new Uint8ClampedArray(this.imageData.data),
          width: this.imageData.width,
        },
        this.threshold,
        1,
        1,
      ).data);
      this.ctx.putImageData(tmpImageData, 0, 0);
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
}

.frameBorder {
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding-bottom: 30px;
}

.btn {
  border-radius: 5px;
  background: #666;
  display: inline-block;
  margin: 20px 20px 0;
  color: #fff;
  cursor: pointer;
  width: 100px;
  padding: 12px 0;
  font-size: 20px;
  font-weight: bold;
  transition: 0.25s;
}

.btn:hover {
  background: #ddd;
  color: #222;
}
</style>
