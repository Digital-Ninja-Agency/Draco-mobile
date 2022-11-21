import store from './index.js';

export default {
  store,
  install(Vue, options) {
    Vue.prototype.store = store
  }
}