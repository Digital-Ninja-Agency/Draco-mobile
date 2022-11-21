import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,
  state: {
    alert_id: null,
    userObj: {},
    active_channels: [],
    logging_in: false,
    clientButtonActive: false,
  }
});

export default store;
