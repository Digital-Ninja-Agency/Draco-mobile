<template>
  <nb-root>
    <nb-header>
      <nb-left>
        <nb-button transparent v-bind:on-press="openDrawer">
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Despre Draco</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-container :style="{backgroundColor: '#fff'}">
      <nb-content :style="{flex: 1}" :contentContainerStyle="{ minHeight: windowHeight-80 }">
        <image
          :source="banner"
          :style="{height: 175, resizeMode: 'contain', alignSelf: 'center', marginTop: 20}"
        />
        <view>
          <text
            :style="{paddingTop: 20, paddingBottom: 20, textAlign: 'center'}"
          >Versiune Draco {{buildNumber}}</text>
        </view>
        <nb-list>
          <nb-list-item noIndent :on-press="goTerms">
            <nb-text>Termeni si Conditii</nb-text>
          </nb-list-item>
          <nb-list-item noIndent :on-press="goCookies">
            <nb-text>Politica de Cookie</nb-text>
          </nb-list-item>
          <nb-list-item noIndent :on-press="goPrivacy">
            <nb-text>GDPR</nb-text>
          </nb-list-item>
        </nb-list>
      </nb-content>
    </nb-container>
  </nb-root>
</template>

<script>
import banner from "assets/icon-square-scaled.png";
import { Dimensions } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import appJson from "../../../app.json";

export default {
  computed: {
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  data() {
    return {
      banner,
      buildNumber: null,
    };
  },
  methods: {
    goTerms() {
      WebBrowser.openBrowserAsync('https://draco.help/termeni-si-conditii/');
    },
    goCookies() {
      WebBrowser.openBrowserAsync('https://draco.help/politica-cookie-urilor/');
    },
    goPrivacy() {
      WebBrowser.openBrowserAsync('https://draco.help/politica-de-confidentialitate/');
    },
  },
  mounted: function(){
    this.buildNumber = appJson.expo.ios.buildNumber;
  }
};
</script>