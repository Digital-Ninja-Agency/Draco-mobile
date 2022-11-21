<template>
  <nb-container :style="{flex:1, backgroundColor: '#fff'}">
    <preventBackHandler :prevent="true" />
    <nb-header>
      <nb-left>
        <nb-button transparent v-bind:on-press="openDrawer">
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Alerte</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content v-if="childDataLoaded" padder :contentContainerStyle="{flex:1, padding: 0}">
      <agent-alert-web-view />
    </nb-content>
  </nb-container>
</template>

<script>
import AgentLocation from "mixins/AgentLocation";
import AgentAlertWebView from "components/agentAlertWebView";
import * as ScreenOrientation from "expo-screen-orientation";
import preventBackHandler from "components/preventBackHandler.vue";

export default {
  components: {
    AgentAlertWebView,
    preventBackHandler,
  },
  mixins: [AgentLocation],
  data: function () {
    return {
      childDataLoaded: false,
    };
  },
  mounted: function () {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    this.agentJoinPresence();
    this.setAgentLocation();
    this.childDataLoaded = true;
  },
};
</script>