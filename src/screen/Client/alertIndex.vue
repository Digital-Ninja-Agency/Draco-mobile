<template>
  <nb-root>
    <nb-header>
      <nb-left>
        <nb-button transparent v-bind:on-press="openDrawer">
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Istoric alerte</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <NavigationEvents :onDidFocus="focusEvent" />
    <nb-container :style="{backgroundColor: '#fff'}">
      <nb-content :style="{flex: 1}" :contentContainerStyle="{ minHeight: windowHeight-80 }">
        <image
          :source="banner"
          :style="{height: 175, resizeMode: 'contain', alignSelf: 'center', marginTop: 20, marginBottom: 20}"
        />
        <nb-view v-if="!loading">
          <nb-list v-for="(alertGroup, index) in pastAlerts" :key="index">
            <nb-list-item itemDivider>
              <nb-text :style="{textTransform: 'capitalize'}">{{formatMonth(index)}}</nb-text>
            </nb-list-item>
            <nb-content v-for="alert in alertGroup" :key="alert.id">
              <alert-item :alert="alert" />
            </nb-content>
          </nb-list>
        </nb-view>
        <ActivityIndicator v-if="loading" :size="50" color="#d9534f" />
      </nb-content>
    </nb-container>
  </nb-root>
</template>

<script>
import banner from "assets/icon-square-scaled.png";
import { Dimensions } from "react-native";
import { NavigationEvents } from "react-navigation";
import alertItem from "components/alertItem.vue";

export default {
  components: {
    NavigationEvents,
    alertItem,
  },
  computed: {
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  data() {
    return {
      banner,
      pastAlerts: {},
      loading: null,
    };
  },
  mounted() {
    this.fetchPastAlerts();
  },
  methods: {
    formatMonth: function (month) {
      return moment.utc(month, "MM.YYYY").format("MMMM YYYY");
    },
    focusEvent: function () {
      this.fetchPastAlerts();
    },
    fetchPastAlerts: async function () {
      let _this = this;

      _this.loading = true;
      _this.pastAlerts = {};
      axios
        .post(`${env.BACKEND_URL}/api/get_past_alerts`)
        .then(function (response) {
          _this.pastAlerts = response.data;
          _this.loading = false;
        })
        .catch(function (error) {
          if (error.response && error.response.status == "401") {
            _this.logout();
          }
        });
    },
  },
};
</script>