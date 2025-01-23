// WATERMARK
console.log("%c %c %c %c %c %c %c %c %cMade by SHUTTLE SOFTWARE 🚀","padding: 10px 5px; background: #FF2A75; border-radius: 9999px;","padding: 10px 1px; font-size: 2px;","padding: 10px 4px; background: #FF2A75; border-radius: 9999px;","padding: 10px 1px; font-size: 2px;","padding: 10px 3px; background: #FF2A75; border-radius: 9999px;","padding: 10px 1px; font-size: 2px;","padding: 10px 2px; background: #FF2A75; border-radius: 9999px;","padding: 10px 1px; font-size: 2px;","padding: 10px 20px; color: #fff; border-radius: 5px 18px 18px 5px; vertical-align: middle; background: radial-gradient(100% 185.49% at 100% 49.95%, #22033E 0%, #FF2A75 100%); margin-bottom: 20px; margin-top: 20px;");

import Vue from 'vue'
import App from './App.vue'
import UI from '@/components/ui';
import VueClickOutside from 'v-click-outside'

import '@/styles/main.scss';
import '@/config/prefs';

import router from '@/router';

Vue.config.productionTip = false
Vue.prototype.$is_mobile = (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);

if(Vue.prototype.$is_mobile) {
  document.documentElement.classList.add('cursor-pointer')
}

Vue.use(UI)
Vue.use(VueClickOutside)

new Vue({
  data: {
    show_menu: false,
    modal_contact_opened: false,
    modal_portfolio_opened: false,
    modal_portfolio_proj: null,
  },
  computed: {
    isAnyOverlayOpened() {
      return this.modal_contact_opened || this.modal_portfolio_opened || this.show_menu;
    }
  },
  router,
  render: h => h(App),
}).$mount('#app')
