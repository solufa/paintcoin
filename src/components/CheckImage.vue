<template>
  <div class="root">
    <div id="canvasFrame" :style="{ maxWidth: `${imageData.width / radius}px` }">
      <div>
        <div class="frameBorder" :style="{ width: `${(radius + 0.02) * 100}%`, height: `${(radius + 0.02) * 100}%` }"/>
        <canvas ref="canvas" :style="{ width: 100 * radius + '%', height: 100 * radius + '%' }"/>
      </div>
    </div>
    <div class="controls">
      <div @click="onSelect">これでOK</div>
      <div @click="onCancel">やり直し</div>
    </div>
  </div>
</template>

<script>
import detectCanvas from '@/utils/detectCanvas';

export default {
  props: ['onCancel', 'onDecide', 'threshold', 'imageData', 'radius'],
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = this.imageData.width;
    canvas.height = this.imageData.width;
    this.data = detectCanvas(this.imageData, this.threshold, 1, 1);
    canvas.getContext('2d').putImageData(this.data, 0, 0);
  },
  methods: {
    onSelect() {
      this.onDecide(this.data);
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

.controls > div {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 20px;
  border: 1px solid #222;
  color: #222;
  cursor: pointer;
}
</style>
