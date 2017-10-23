import Vue from 'vue';
import Router from 'vue-router';
import App from '@/components/App';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      component: App,
    },
  ],
});
