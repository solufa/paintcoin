<template>
  <div class="root">
    <div><div class="container" ref="container"/></div>
    <div class="btn" @click="onSavePng">▼透過PNGをDL</div>
    <div class="btn" @click="onSaveGif">▼GIFアニメをDL</div>
    <div class="btn" @click="onRetake">撮り直す</div>
  </div>
</template>

<script>
import ThreeCtrl from './ThreeCtrl';

export default {
  props: ['imageData', 'onRetake'],
  data() {
    return {
      threeCtrl: null,
    };
  },
  methods: {
    onSavePng() {
      this.threeCtrl.savePng();
    },
    onSaveGif() {
      this.threeCtrl.saveGif();
    },
  },
  mounted() {
    this.threeCtrl = new ThreeCtrl(this.$refs.container, this.imageData);
  },
  destroyed() {
    this.threeCtrl.destroy();
  },
};
</script>

<style>
body {
  background: center/cover url('/static/image/back.jpg') no-repeat;
}
</style>

<style scoped>
.root {
  margin: 0 auto;
  max-width: 500px;
}

.root > div:first-child {
  position: relative;
  padding-top: 100%;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.btn {
  width: 300px;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 0;
  font-size: 24px;
  margin: 30px auto;
  cursor: pointer;
  color: #222;
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.3);
}
</style>
