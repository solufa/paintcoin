<template>
  <div id="app">
    <Top v-if="mode === 0" :onStart="openCamApp" :onInput="inputFile"/>
    <CameraApp v-if="mode === 1" :onClose="closeCamApp" :onSet="setImageData" :onChangeThreshold="changeThreshold" :threshold="threshold" :radius="radius"/>
    <CheckImage v-if="mode === 2" :onCancel="closeCamApp" :onChangeThreshold="changeThreshold" :onDecide="setImageData" :threshold="threshold" :radius="radius" :imageData="imageData"/>
    <Viewer v-if="mode === 3" :imageData="imageData" :onClose="closeCamApp"/>
    <HeaderBar v-show="mode === 0 || mode === 3"/>
  </div>
</template>

<script>
import CameraApp from '@/components/CameraApp';
import Top from '@/components/Top';
import HeaderBar from '@/components/Header';
import Viewer from '@/threejs/Viewer';
import CheckImage from '@/components/CheckImage';

export default {
  components: {
    Top,
    HeaderBar,
    CameraApp,
    CheckImage,
    Viewer,
  },
  data() {
    return {
      mode: 0, // 1: camera app, 2: chacking image, 3: three.js
      imageData: null,
      threshold: 120,
      radius: 0.9,
    };
  },
  methods: {
    openCamApp() {
      this.mode = 1;
    },
    closeCamApp() {
      this.mode = 0;
    },
    inputFile(imageData) {
      this.mode = 2;
      this.imageData = imageData;
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
</style>
