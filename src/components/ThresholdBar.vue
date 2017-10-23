<template>
  <div class="seekBarFrame">
    <div class="seekBar">
      <div class="progress" :style="{width: value / 256 * 100 + '%'}">
        <div class="circle"/>
      </div>
    </div>
    <div class="seekAbleArea"
      :style="{ height: this.seeking ? '500px' : '100%' }"
      @touchstart.prevent="handleSeekStart"
      @mousedown.prevent="handleSeekStart"
      @touchmove="handleSeek"
      @mousemove="handleSeek"
      @touchend="handleSeekEnd"
      @mouseup="handleSeekEnd"
    />
  </div>
</template>

<script>
export default {
  props: ['value', 'onChange'],
  data() {
    return {
      seeking: false,
    };
  },
  methods: {
    handleSeekStart(e) {
      this.seeking = true;
      this.handleSeek(e);
    },
    handleSeek(e) {
      if (!this.seeking) return;

      const x = typeof e.clientX === 'number' ? e.clientX : e.touches[0].pageX;
      const t = ((x - e.target.getBoundingClientRect().left) / e.target.clientWidth) * 256;
      this.onChange(Math.max(0, Math.min(256, t)));
    },
    handleSeekEnd() {
      this.seeking = false;
    },
  },
};
</script>

<style scoped>
.seekBarFrame {
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  width: 80%;
  left: 10%;
  height: 30px;
}

.seekBarFrame:hover > .seekBar {
  height: 20%;
  top: 40%;
}

.seekBar {
  height: 10%;
  top: 45%;
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 2px;
  background: #999;
}

.progress {
  height: 100%;
  position: absolute;
  top: 0;
  background: #e60014;
  border-radius: 2px;
  left: 0;
}

.circle {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(to right, #e83545 0%, #e60014 100%);
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%,-50%);
  box-shadow: 0 1px 10px rgba(0,0,0,.3);
}

.seekAbleArea {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
}
</style>
