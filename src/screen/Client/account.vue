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
        <nb-title>Contul meu</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content v-if="childDataLoaded" padder :contentContainerStyle="{flex:1, padding: 0}">
      <client-my-account-web-view />
    </nb-content>
  </nb-container>
</template>

<script>
import clientMyAccountWebView from "components/clientMyAccountWebView";
import * as ScreenOrientation from "expo-screen-orientation";
import preventBackHandler from "components/preventBackHandler.vue";

export default {
  components: {
    clientMyAccountWebView,
    preventBackHandler,
  },
  data: function () {
    return {
      childDataLoaded: false,
    };
  },
  mounted: function () {
    this.childDataLoaded = true;
  },
};
</script>