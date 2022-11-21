import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Alert, Vibration } from "react-native";

export default {
  methods: {
    setClientAlert: async function () {
      let _this = this;

      Permissions.askAsync(Permissions.LOCATION)
        .then(status => {

          Location.enableNetworkProviderAsync()
            .then(isEnabled => {
              _this.store.dispatch('TOGGLE_CLIENT_BUTTON_STATE');
              Vibration.vibrate(750, false);
              
              axios
                .post(`${env.BACKEND_URL}/api/create_alert`, {
                  address_info: _this.address_info
                })
                .then(function (responseData) {
                  _this.store.commit("SET_CLIENT_ALERT", responseData.data);
                  _this.setClientLocation();
                })
                .catch(function (error) {
                  if (error.response && error.response.status == "401") {
                    _this.logout();
                  }
                });
            })
            .catch(() => {
              Vibration.vibrate(750, false);
              Alert.alert(
                "Avem nevoie de localizare",
                "Pentru a putea folosi butonul de panica, avem nevoie ca dispozitivul dumneavoastra sa aiba serviciul de Locatie activat.",
                [
                  {
                    text: "Am inteles", onPress: () => { return; }
                  }
                ],
                { cancelable: false }
              );
            });
        })
        .catch(() => { });
    },
    setClientLocation: async function () {

      Location.startLocationUpdatesAsync("LocationTask", {
        accuracy: Location.Accuracy.BestForNavigation,
        deferredUpdatesInterval: 5000,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "OSS Panic Button",
          notificationTitle: "Te localizam pentru a-ti trimite ajutoare.",
          notificationColor: "#FFFFFF"
        }
      });

    }
  }
}