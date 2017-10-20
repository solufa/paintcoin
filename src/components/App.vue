<template>
  <div id="app">
    <div v-if="mode === 0" class="openCamBtn" @click="openCamApp">Camera</div>
    <CameraApp v-if="mode === 1" :onClose="closeCamApp" :onSet="setImageData"/>
    <Viewer v-if="mode === 3" :imageData="imageData" :onRetake="openCamApp"/>
  </div>
</template>

<script>
import CameraApp from '@/components/CameraApp';
import Viewer from '@/threejs/Viewer';

export default {
  components: {
    CameraApp,
    Viewer,
  },
  data() {
    return {
      mode: 0, // 1: camera app, 2: localimage app, 3: three.js
      imageData: null,
    };
  },
  methods: {
    openCamApp() {
      this.mode = 1;
    },
    closeCamApp() {
      this.mode = 0;
    },
    setImageData(imageData) {
      this.mode = 3;
      this.imageData = imageData;
    },
  },
};
</script>

<style>
* {
 margin: 0;
 padding: 0;
 user-select: none;
}
</style>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.openCamBtn {
  width: 300px;
  border: 1px solid #444;
  padding: 10px 0;
  font-size: 24px;
  margin: 200px auto 0;
  cursor: pointer;
}
</style>
