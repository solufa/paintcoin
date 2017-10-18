<template>
  <div id="app">
    <CameraApp v-if="mode === 1" :onClose="closeCamApp" :onChangeThreshold="changeThreshold" :onSet="setImageData" :threshold="threshold" :radius="radius"/>
    <Viewer v-if="mode === 3" :imageData="imageData" :radius="radius"/>
    <div class="openCamBtn" @click="openCamApp">Camera</div>
    <router-view/>
  </div>
</template>

<script>
import CameraApp from '@/components/CameraApp';
import Viewer from '@/components/Viewer';

export default {
  components: {
    CameraApp,
    Viewer,
  },
  data() {
    return {
      mode: 0, // 1: camera app, 2: localimage app, 3: three.js
      threshold: 120,
      radius: 0.9,
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
    changeThreshold(threshold) {
      this.threshold = threshold;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.openCamBtn {
  width: 300px;
  border: 1px solid #444;
  padding: 10px 0;
  margin: 10px auto;
  cursor: pointer;
}
</style>
