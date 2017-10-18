<template>
  <div class="root">
    <div><div class="container" ref="container"/></div>
  </div>
</template>

<script>
const THREE = require('three');

export default {
  props: ['imageData', 'radius'],
  data() {
    return {
      renderer: null,
      reqID: null,
      scene: null,
      camera: null,
    };
  },
  mounted() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    this.$refs.container.appendChild(renderer.domElement);
    this.renderer = renderer;
    window.addEventListener('resize', this.resize, false);
    this.resize();

    this.reqID = requestAnimationFrame(this.render.bind(this));
  },
  destroyed() {
    window.removeEventListener('resize', this.resize, false);
    cancelAnimationFrame(this.reqID);
  },
  methods: {
    resize() {
      const container = this.$refs.container;
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
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
