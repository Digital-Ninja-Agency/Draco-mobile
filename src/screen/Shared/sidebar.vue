<template>
  <nb-container>
    <nb-content :style="stylesObj.drawerContent" :bounces="false">
      <image :source="drawerCover" class="drawer-cover" :style="stylesObj.drawerCoverObj" />
      <nb-list>
        <nb-list-item noIndent :on-press="goHome">
          <nb-text>{{ isClient ? 'Alerta noua' : 'Alerte' }}</nb-text>
        </nb-list-item>
        <nb-list-item v-if="isClient" noIndent :on-press="goAlertIndex">
          <nb-text>Istoric alerte</nb-text>
        </nb-list-item>
        <nb-list-item
          v-if="isClient"
          noIndent
          :on-press="goMyAccount"
          :style="{paddingTop: 10, paddingBottom: 10}"
        >
          <nb-text>Contul meu</nb-text>
          <nb-badge info :style="{marginLeft: 'auto', marginRight: 5 }">
            <nb-text :style="{fontSize: 12, lineHeight: 24}">{{userData.role_name}}</nb-text>
          </nb-badge>
        </nb-list-item>
        <nb-list-item noIndent :on-press="goAbout">
          <nb-text>Despre Draco</nb-text>
        </nb-list-item>
        <nb-list-item noIndent :on-press="logout">
          <nb-text>Logout</nb-text>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { NavigationActions, StackActions } from "react-navigation";
import { Dimensions, Platform } from "react-native";

import drawerCover from "assets/icon-square-scaled.png";
import profilePic from "assets/user.png";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "MainActivity" })],
});

export default {
  methods: {
    goAbout() {
      this.navigation.navigate("AboutScreen");
    },
    goMyAccount() {
      this.navigation.navigate("MyAccount");
    },
    goAlertIndex() {
      this.navigation.navigate("AlertIndex");
    },
  },
  computed: {
    userData() {
      return this.store.state.userObj;
    },
    isClient() {
      return this.store.state.userObj.role_name === "Client";
    },
  },
  data: {
    drawerCover,
    profilePic,
    stylesObj: {
      profilePic: {
        height: 20,
        width: 20,
        borderRadius: Platform.OS === "android" ? 40 : 20,
      },
      drawerContent: {
        paddingTop: Platform.OS === "android" ? 0 : 30,
      },
      drawerCoverObj: {
        height: deviceHeight / 4,
        marginTop: 10,
        alignSelf: "center",
        resizeMode: "contain",
      },
    },
  },
};
</script>

<style>
.sidebar-email {
  padding-right: 20px;
  padding-bottom: 2px;
}
</style>