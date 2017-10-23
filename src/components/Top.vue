<template>
  <div>
    <div class="main" :style="{ backgroundImage: 'url(./image/back.jpg)' }">
      <div class="container" ref="container"/>
      <div class="btnFrame">
        <div class="btnDesc">Let's Paint !</div>
        <div class="btn" @click="onStart">Camera</div>
        <div class="btn">Image<input type="file" class="file" accept="image/*" @change="onSelectFile"/></div>
      </div>
      <div class="iconFrame">
        <a class="icon" href="https://github.com/amatelus/paintcoin"><img src="../assets/github.png"/></a>
        <div class="icon" @click="openForm"><img src="../assets/mail.svg"/></div>
      </div>
    </div>
    <ContactUs v-if="openedForm" :onClose="closeForm"/>
  </div>
</template>

<script>
import loadImage from 'blueimp-load-image';
import ThreeCtrl from '@/threejs/ThreeCtrl';
import ContactUs from './ContactUs';

export default {
  props: ['onStart', 'onInput'],
  components: { ContactUs },
  data() {
    return {
      threeCtrl: null,
      openedForm: false,
    };
  },
  methods: {
    openForm() {
      this.openedForm = true;
      this.threeCtrl.pause();
    },
    closeForm() {
      this.openedForm = false;
      this.threeCtrl.play();
    },
    onSelectFile(e) {
      const file = e.target.files[0];
      loadImage.parseMetaData(file, (data) => {
        loadImage(file, (image) => {
          const imageLength = Math.min(image.width, image.height);
          const length = Math.min(500, imageLength);
          const canvas = document.createElement('canvas');
          canvas.width = length;
          canvas.height = length;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, (image.width - imageLength) / 2, (image.height - imageLength) / 2,
            imageLength, imageLength, 0, 0, length, length);
          this.onInput(ctx.getImageData(0, 0, length, length));
        }, { canvas: true, cover: true, aspectRatio: 1, orientation: data.exif ? data.exif.get('Orientation') : 0 });
      });
    },
  },
  mounted() {
    const image = new Image();
    image.src = './image/theme.png';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const length = image.width * 1.1;
      canvas.width = length;
      canvas.height = length;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, length, length);
      ctx.drawImage(image, (length - image.width) / 2, (length - image.height) / 2);
      this.threeCtrl = new ThreeCtrl(this.$refs.container, ctx.getImageData(0, 0, length, length));
    };
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
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
}

.btnDesc {
  padding: 12px 45px;
  color: #222;
  font-size: 32px;
  font-weight: bold;
  border-bottom: 1px solid #999;
}

.btnDesc + div {
  border-right: 1px solid #999;
}

.btn {
  cursor: pointer;
  transition: 0.25s;
  font-size: 24px;
  color: #06f;
  float: left;
  width: 50%;
  padding: 10px 0;
  box-sizing: border-box;
  position: relative;
}

.btn:hover {
  background: rgba(60, 60, 60, 0.9);
  color: #fff;
}

.file {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.iconFrame {
  position: absolute;
  right: 5px;
  bottom: 15px;
}

.icon {
  display: inline-block;
  margin-right: 15px;
  transition: 0.25s;
  cursor: pointer;
}

.icon:hover {
  opacity: 0.7;
}

.icon > img {
  width: 48px;
}

@media screen and (max-width: 500px) {
  .btnFrame {
    bottom: 70px;
  }

  .btnDesc {
    padding: 8px 45px;
    font-size: 20px;
  }

  .btn {
    font-size: 16px;
    padding: 8px 0;
  }

  .icon {
    margin-right: 10px;
  }

  .icon > img {
    width: 36px;
  }
}
</style>
