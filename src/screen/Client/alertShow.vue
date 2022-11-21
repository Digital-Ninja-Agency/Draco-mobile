<template>
  <nb-root>
    <nb-header>
      <nb-left>
        <nb-button transparent v-bind:on-press="goBack">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Alerta #{{alert.id}}</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-container :style="{backgroundColor: '#fff'}">
      <nb-content :style="{flex: 1}" :contentContainerStyle="{ minHeight: windowHeight-80 }">
        <image
          :source="banner"
          :style="{height: 175, resizeMode: 'contain', alignSelf: 'center', marginTop: 20, marginBottom: 20}"
        />
        <nb-view v-if="!loading">
          <nb-list>
            <nb-list-item noIndent>
              <nb-left class="left">
                <nb-text :style="{fontWeight: 'bold'}">Data incepere</nb-text>
              </nb-left>
              <nb-right class="right">
                <nb-text>{{getFormattedDate(alert.created_at)}}</nb-text>
              </nb-right>
            </nb-list-item>
            <nb-list-item noIndent>
              <nb-left class="left">
                <nb-text :style="{fontWeight: 'bold'}">Data incheiere</nb-text>
              </nb-left>
              <nb-right class="right">
                <nb-text>{{getFormattedDate(alert.completed_at)}}</nb-text>
              </nb-right>
            </nb-list-item>
            <nb-list-item noIndent>
              <nb-left class="left">
                <nb-text :style="{fontWeight: 'bold'}">Agent</nb-text>
              </nb-left>
              <nb-right class="right">
                <nb-text>{{alert.agent.name}}</nb-text>
              </nb-right>
            </nb-list-item>
            <nb-list-item noIndent>
              <nb-left class="left">
                <nb-text :style="{fontWeight: 'bold'}">Locatie</nb-text>
              </nb-left>
              <nb-right class="right">
                <nb-text :style="{ textAlign: 'right' }">{{client_location}}</nb-text>
              </nb-right>
            </nb-list-item>
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

export default {
  components: {
    NavigationEvents,
  },
  computed: {
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
    alert() {
      return this.navigation.getParam("alert");
    },
  },
  mounted() {
    this.loading = true;
    axios
      .post(`${env.BACKEND_URL}/fetch_distance_eta`, {
        active_alert: {
          id: this.alert.id,
        },
      })
      .then((response) => {
        this.loading = false;
        this.client_location = response.data.current_location;
      });
  },
  data() {
    return {
      banner,
      loading: true,
      client_location: "",
    };
  },
  methods: {
    goBack() {
      this.navigation.goBack();
    },
    getFormattedDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
  },
};
</script>

<style>
.left {
  flex: 2;
}
.right {
  flex: 4;
}
</style>