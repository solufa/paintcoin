<template>
  <div class="root">
    <div><div class="container" ref="container"/></div>
  </div>
</template>

<script>
import ThreeCtrl from './ThreeCtrl';

export default {
  props: ['imageData', 'radius'],
  data() {
    return {
      threeCtrl: null,
    };
  },
  mounted() {
    this.threeCtrl = new ThreeCtrl(this.$refs.container, this.imageData, this.radius);
  },
  destroyed() {
    this.threeCtrl.destroy();
  },
};
</script>

<style scoped>
.root {
  margin: 0 auto;
  max-width: 400px;
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
