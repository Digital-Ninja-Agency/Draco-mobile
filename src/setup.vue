<template>
  <nb-container>
    <app-loading v-if="!isAppReady">Loading</app-loading>
    <screens v-if="isAppReady"></screens>
  </nb-container>
</template>

<script>
import Vue from "vue-native-core";
import { AppState, Platform } from "react-native";
import { AppLoading } from "expo";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Font from "expo-font";
import Screens from "screens.vue";

import { VueNativeBase } from "native-base";
Vue.use(VueNativeBase);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import storePlugin from "store/storePlugin";
Vue.use(storePlugin);

// Axios
global.axios = require("axios");

// Env
import env from "../env";
global.env = env;

// Moment JS
import moment from "moment";
import "moment/locale/ro";
global.moment = moment;

// Mixins
import globalEchoMixin from "mixins/global/Echo";
import globalVueHandlers from "mixins/global/VueHandlers";
import requestPermissions from "mixins/RequestPermissions";

Vue.mixin(globalEchoMixin);
Vue.mixin(globalVueHandlers);

// Top Level scope Task
const LocationTask = TaskManager.defineTask(
  "LocationTask",
  ({ data: { locations }, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    let store = storePlugin.store;
    axios
      .post(`${env.BACKEND_URL}/api/set_location`, {
        alert_id: storePlugin.store.state.alert_id,
        location: {
          longitude: locations[0].coords.longitude,
          latitude: locations[0].coords.latitude,
          altitude: locations[0].coords.altitude,
        },
      })
      .then(function (response) {
        let data = response.data;
        if (!("status" in data)) return;
        if (data.status == "cancelled" || data.status == "completed") {
          Location.hasStartedLocationUpdatesAsync("LocationTask").then(
            async (isActive) => {
              isActive &&
                (await Location.stopLocationUpdatesAsync("LocationTask"));
              store.dispatch("TOGGLE_CLIENT_BUTTON_STATE");
            }
          );
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status == "401") {
          storePlugin.store.dispatch("LOGOUT", () =>
            storePlugin.navigation.dispatch(resetAction)
          );
          storePlugin.navigation.navigate("Login");
        }
      });
  }
);

export default {
  components: { Screens, AppLoading },
  mixins: [requestPermissions],

  data() {
    return {
      isAppReady: true,
    };
  },

  beforeCreate() {
    moment.locale("ro");

    axios.interceptors.request.use(
      (config) => {
        let userToken = this.store.state.userObj.token ?? "";
        if (userToken) config.headers["Authorization"] = `Bearer ${userToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        sound: true,
        importance: Notifications.AndroidImportance.MAX,
        vibrate: [0, 250, 250],
      });

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          priority: "max",
        }),
      });
    }
  },

  created() {
    this.loadFonts();
    AppState.addEventListener("change", this.requestAllPermissions);
    this.requestAllPermissions();
  },

  methods: {
    async loadFonts() {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
        });
        this.isAppReady = true;
      } catch (error) {
        this.isAppReady = true;
      }
    },
  },
};
</script>