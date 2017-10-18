<template>
  <div id="app">
    <CameraApp v-if="mode === 1" :onClose="closeCamApp" :onSet="setImageData" :threshold="threshold" :radius="radius"/>
    <div class="openCamBtn" @click="openCamApp">Camera</div>
    <router-view/>
  </div>
</template>

<script>
import CameraApp from '@/components/CameraApp';

export default {
  components: {
    CameraApp,
  },
  data() {
    return {
      mode: 0, // 1: camera app
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
    setImageData(imageData) {
      this.mode = 0;
      console.log(imageData);
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
