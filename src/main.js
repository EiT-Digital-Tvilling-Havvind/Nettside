import Vue from 'vue'
import App from './App.vue'
import store from './vuex'

import Switch from '@/components/Switch'

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false

Vue.component('EitSwitch', Switch)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
