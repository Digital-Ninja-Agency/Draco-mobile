<template>
  <touchable-opacity :on-press="refresh_user">
    <image
      :source="banner"
      :style="{
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        zIndex: 9999999999,
      }"
      :on-press="refresh_user"
    />
  </touchable-opacity>
</template>

<script>
import React from "react";
import * as Linking from "expo-linking";
import { Alert, AppState, AsyncStorage } from "react-native";

import bannerGreen from "assets/shield-green.png";
import bannerWhite from "assets/shield-white.png";
import bannerYellow from "assets/shield-yellow.png";

export default {
  computed: {
    banner() {
      if (this.user.is_vip) {
        return bannerWhite;
      } else if (this.user.has_active_subscription) {
        return bannerGreen;
      } else {
        return bannerYellow;
      }
    },
  },

  data() {
    return {
      user: {},
    };
  },

  mounted() {
    this.user = this.store.state.userObj;
    AppState.addEventListener("change", this.handleAppStateChange);
  },

  methods: {
    handleAppStateChange(nextAppState) {
      this.update_user_account_data(false);
    },

    refresh_user() {
      this.update_user_account_data(true);
    },

    update_user_account_data(alertSubscription) {
      axios
        .get(`${env.BACKEND_URL}/my_account/json_user`)
        .then((response) => {
          let userObj = this.store.state.userObj;

          userObj.has_active_subscription =
            response.data.has_active_subscription;
          userObj.is_vip = response.data.is_vip;

          AsyncStorage.setItem("userObj", JSON.stringify(userObj));
          this.user = userObj;
          if (alertSubscription) {
            this.user_subscription_type_alert();
          }
        })
        .catch((error) => {});
    },

    user_subscription_type_alert() {
      let alertMsg = "";
      if (this.user.is_vip) {
        alertMsg = "Sunteti membru Draco VIP.";
      } else if (this.user.has_active_subscription) {
        alertMsg = "Abonamentul dvs. Draco este activ.";
      } else {
        alertMsg = "Nu aveti niciun abonament Draco activ.";
      }

      Alert.alert(
        "Subscriptie Draco",
        alertMsg,
        [
          {
            text: "Inchide",
            onPress: () => {},
          },
          {
            text: "Verifica",
            onPress: () => {
              Linking.openURL("https://app.draco.help/subscription");
            },
          },
        ],
        { cancelable: true }
      );
    },
  },
};
</script> 