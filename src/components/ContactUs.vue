<template>
  <div class="root" :style="{ backgroundImage: 'url(./image/contact.jpg)' }">
      <div class="text">We offer HTML5 application to company site.</div>
      <div class="title">Contact Us <span>(EN/JP)</span></div>
      <iframe class="form" allowTransparency="true" frameborder="0" scrolling="yes" src="https://amatelus.wufoo.com/embed/zm5p8mb14jofnu/"/>
      <div class="closeBtn" @click="onClose">Close</div>
      <div class="copyright">© AMATELUS Inc.</div>
  </div>
</template>

<script>
export default {
  props: ['onClose'],
};
</script>

<style scoped>
.root {
  position: relative;
  min-height: 100vh;
  background: center/cover;
  color: #fff;
  text-align: center;
}

.text {
  padding-top: 100px;
  font-size: 20px;
}

.title {
  margin-top: 40px;
  font-size: 26px;
  font-weight: bold;
}

.title > span {
  font-size: 16px;
}

.form {
  height: 352px;
  margin: 10px auto;
  display: block;
  width: 600px;
  max-width: 90%;
}

.closeBtn {
  display: inline-block;
  color: #fff;
  font-size: 20px;
  border-bottom: 2px solid #fff;
  padding: 10px 10px 8px;
  cursor: pointer;
  transition: 0.25s;
  margin-bottom: 100px;
}

.closeBtn:hover {
  background: rgba(255,255,255,0.6);
  border-bottom-color: transparent;
}

.copyright {
  background: linear-gradient(0deg,rgba(0,0,40,0.7),transparent);
  padding: 30px 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
