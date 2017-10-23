<template>
  <div :class="['root', size]">
    <a href="/"><img src="../assets/logo.png" class="logo"/></a>
    <div class="social">
      <div class="fb-like" data-layout="button_count" :data-size="size"/>
      <a class="twitter-share-button" href="https://twitter.com/share" data-dnt="true" :data-size="size"/>
    </div>
  </div>
</template>

<script>
import osType from '@/utils/osType';

export default {
  data() {
    return {
      size: osType.isPC() ? 'large' : 'small',
    };
  },
  mounted() {
    const fbScript = document.createElement('script');
    fbScript.innerHTML = '(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));';
    document.body.appendChild(fbScript);

    const twScript = document.createElement('script');
    twScript.innerHTML = 'window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));';
    document.body.appendChild(twScript);
  },
};
</script>

<style scoped>
.root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.7);
  height: 60px;
}

.root.small {
  height: 40px;
}

.logo {
  height: 70%;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.social {
  height: 50%;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}

.small > .social {
  margin-top: -2px;
  right: 10px;
}
</style>

<style>
.social > iframe {
  vertical-align: bottom;
  margin-left: 10px;
}

.small > .social > iframe {
  margin-left: 8px;
}
</style>