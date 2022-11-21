import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

export default {
  methods: {
    agentJoinPresence: async function () {
      this.initEcho();
      let channelName = `agents`;
      this.Echo.join(channelName);
      this.store.commit('CHANNEL_JOINED', { instance: this.Echo, name: channelName });
    },

    notifyOnAlerts: async function () {
      // let user_id = this.store.state.userObj.id;
      // this.Echo.private(`agent_alerts.${user_id}`)
      //   .listen(
      //     `.App\\Events\\AlertAssigned`,
      //      async (e) => {
      //       Vibration.vibrate(750, true);
      //       const soundObject = new Audio.Sound();
      //       try {
      //         await soundObject.loadAsync(require('assets/notification.mp3'));
      //         await soundObject.playAsync();
      //         // Your sound is playing!
      //       } catch (error) {
      //         // An error occurred!
      //       }
      //     }
      //   );
    },

    setAgentLocation: async function () {
      let _this = this;

      await Permissions.askAsync(Permissions.LOCATION)
        .then(status => {
          Location.enableNetworkProviderAsync()
            .then(isEnabled => {

              Location.startLocationUpdatesAsync('LocationTask', {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 10000,
                distanceInterval: 15,
                showsBackgroundLocationIndicator: true,
                foregroundService: {
                  notificationTitle: 'OSS Panic Button',
                  notificationTitle: 'Trimitem locatia ta catre dispecerat.',
                  notificationColor: '#FFFFFF'
                }
              });
            }).catch((isRejected) => {
              Alert.alert(
                "Avem nevoie de localizare",
                "Pentru a putea folosi butonul de panica, avem nevoie ca dispozitivul dumneavoastra sa aiba serviciul de Locatie activat.",
                [
                  { text: "Am inteles", onPress: () => { _this.setAgentLocation(); } }
                ],
                { cancelable: false }
              );
            });

        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}