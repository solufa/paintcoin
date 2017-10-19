<template>
  <div class="root">
    <div><div class="container" ref="container"/></div>
  </div>
</template>

<script>
import ThreeCtrl from './ThreeCtrl';

export default {
  props: ['imageData'],
  data() {
    return {
      threeCtrl: null,
    };
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

.root > div {
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
</style>
