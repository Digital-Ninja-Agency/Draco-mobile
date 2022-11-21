<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <preventBackHandler :prevent="true" />
    <nb-header>
      <nb-left>
        <nb-button transparent :on-press="openDrawer">
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Alerta noua</nb-title>
      </nb-body>
      <nb-right> <subscriptionShield></subscriptionShield> </nb-right>
    </nb-header>
    <nb-content
      padder
      :scrollEnabled="false"
      :contentContainerStyle="{
        flex: 1,
        marginTop: '5%',
        justifyContent: 'space-between',
        minHeight: windowHeight - 120,
      }"
    >
      <nb-view>
        <nb-text v-if="!store.state.userObj.has_active_subscription"
          :style="{ textAlign: 'center', color: '#d9534f', fontWeight: '700', fontStyle: 'italic' }">
          Butonul nu poate fi actionat deoarece nu aveti o subscriptie Draco activa in contul dvs.
          Pentru activarea subscriptiei folositi butonul cu forma de scut din coltul din dreapta sus.
        </nb-text>
        <nb-text v-else :style="{ padding: 8, textAlign: 'center', fontSize: 20 }"
          >Pentru a trage semnalul de alarma, tineti apasat butonul pentru {{ seconds }} secunde.
        </nb-text>
        <nb-card v-if="timestamp" :style="{ padding: 15, marginTop: 15 }">
          <nb-text :style="{ textAlign: 'center' }"
            >Modul de panica a fost activat la data de:</nb-text
          >
          <nb-text
            :style="{ textAlign: 'center', textTransform: 'capitalize' }"
            >{{ timestamp.format("LLLL") }}</nb-text
          >
        </nb-card>
      </nb-view>
      <nb-view
        :style="{ flex: 1, justifyContent: 'flex-end', marginBottom: '10%' }"
      >
        <nb-button
          full
          danger
          :disabled="!store.state.userObj.has_active_subscription || getDisabledState"
          :onPressIn="startCountdown"
          :onPressOut="resetCountdown"
          :delayLongPress="seconds * 1000"
          :onLongPress="setClientAlert"
          :style="{
            height: 225,
            width: 225,
            borderRadius: 125,
            alignSelf: 'center',
            elevation: 10,
          }"
        >
          <ActivityIndicator
            :size="348"
            color="#d9534f"
            v-if="countdown"
            :style="{ elevation: 10, position: 'relative', top: 34 }"
          />
        </nb-button>
      </nb-view>
      <nb-view>
        <nb-item :style="{ borderBottomWidth: 0 }">
          <nb-input
            :onChangeText="(text) => (address_info = text)"
            :disabled="!store.state.userObj.has_active_subscription || getDisabledState"
            placeholder="Informatii adresa aditionale (optional)"
            :style="{
              borderBottomWidth: 1,
              borderBottomColor: '#D9534F',
              marginBottom: '5%',
            }"
          />
        </nb-item>
      </nb-view>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Alert, Vibration } from "react-native";
import preventBackHandler from "components/preventBackHandler.vue";
import subscriptionShield from "components/subscriptionShield.vue";
import ClientLocation from "mixins/ClientLocation";

export default {
  mixins: [ClientLocation],
  components: {
    preventBackHandler,
    subscriptionShield,
  },
  data: function () {
    return {
      seconds: 2,
      countdownID: "",
      countdown: 0,
      timestamp: "",
      address_info: "",
    };
  },
  computed: {
    getDisabledState() {
      return this.store.state.clientButtonActive;
    },
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  methods: {
    startCountdown: async function () {
      this.countdown = this.seconds;
      this.countdownID = setInterval(() => {
        if (this.countdown > 0) this.countdown--;
      }, 1000);
    },
    resetCountdown: function () {
      clearInterval(this.countdownID);
      this.countdown = "";
    },
  },
  watch: {
    getDisabledState: function (val) {
      if (val == true) {
        this.timestamp = moment();
      } else {
        let userObj = this.store.state.userObj;
        if (userObj && userObj.token) {
          Vibration.vibrate(750, false);
          Alert.alert(
            "Alerta a fost incheiata",
            "Procesul verbal aferent interventiei a fost trimis pe adresa dvs. de email.",
            [
              {
                text: "Am inteles",
                onPress: () => {
                  return;
                },
              },
            ],
            { cancelable: false }
          );
        }
        this.timestamp = "";
        this.address_info = "";
      }
    },
  },
};
</script>