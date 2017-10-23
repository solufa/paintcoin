<template>
  <div>
    <div class="main" :style="{ backgroundImage: 'url(./image/back.jpg)' }">
      <div class="container" ref="container"/>
      <div class="btnFrame">
        <div class="btn" @click="onSavePng">Save PNG</div>
        <div class="btn" @click="onSaveGif">Save GIF</div>
        <div class="btn" @click="onClose">TOP</div>
      </div>
    </div>
    <div class="saveArea" ref="saveArea" v-show="url">
      <div>
        <div v-if="isSafari" class="safariText">Press and hold to save image</div>
        <img :src="url"/>
      </div>
      <div class="social">
        <div class="fb-share-button" data-layout="button_count" data-size="large"/>
        <a class="twitter-share-button" href="https://twitter.com/share" data-dnt="true" data-size="large"/>
      </div>
      <div class="linkText">Other works</div>
      <a href="https://swipe.video/" target="_brank"><img :src="'./image/swipevideo.jpg'"/></a>
      <div class="closeBtn" @click="closeSaveArea">Close</div>
    </div>
  </div>
</template>

<script>
import ThreeCtrl from './ThreeCtrl';

const { saveAs } = require('file-saver');
const platform = require('platform');

export default {
  props: ['imageData', 'onClose'],
  data() {
    return {
      threeCtrl: null,
      url: null,
      snsInit: false,
      isSafari: platform.name === 'Safari',
    };
  },
  methods: {
    onSavePng() {
      this.threeCtrl.getPngBlob(blob => this.saveImage(blob, 'png'));
    },
    onSaveGif() {
      this.threeCtrl.getGifBlob(blob => this.saveImage(blob, 'gif'));
    },
    saveImage(blob, type) {
      const name = `paintcoin.${type}`;
      if (!this.isSafari) saveAs(blob, name);

      this.url = URL.createObjectURL(new File([blob], name, { type: `image/${type}` }));
      setTimeout(() => this.threeCtrl.pause());

      if (!this.snsInit) {
        /* global FB, twttr */
        FB.XFBML.parse(this.$refs.saveArea);
        twttr.widgets.load(this.$refs.saveArea);
        this.snsInit = true;
      }
    },
    closeSaveArea() {
      this.threeCtrl.play();
      URL.revokeObjectURL(this.url);
      this.url = null;
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

<style scoped>
.main {
  background: center/cover no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.container {
  height: 100%;
  width: 100%;
}

.btnFrame {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.btn {
  float: left;
  width: 33.33%;
  background: rgba(255, 255, 255, 0.8);
  padding: 12px 0;
  font-size: 24px;
  cursor: pointer;
  color: #222;
  transition: 0.25s;
}

.btn:hover {
  background: rgba(120, 120, 120, 0.8);
  color: #fff;
}

.saveArea {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 0 50px;
  box-sizing: border-box;
  color: #222;
}

.safariText {
  font-size: 20px;
  padding-top: 10px;
}

.saveArea img {
  width: 500px;
  max-width: 80%;
  margin: 10px auto 0;
}

.social {
  margin: 20px 0 50px;
}

.linkText {
  font-size: 30px;
}

.closeBtn {
  border-radius: 5px;
  background: #666;
  margin: 30px auto 0;
  color: #fff;
  cursor: pointer;
  width: 100px;
  padding: 12px 0;
  font-size: 20px;
  font-weight: bold;
  transition: 0.25s;
}

.closeBtn:hover {
  background: #ddd;
  color: #222;
}

@media screen and (max-width: 500px) {
  .btn {
    font-size: 18px;
  }
}
</style>

<style>
.social > iframe {
  vertical-align: bottom;
  margin-left: 10px;
}
</style>