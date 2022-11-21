import * as Permissions from "expo-permissions";
import { Alert, Platform, BackHandler } from "react-native";

export default {
  methods: {
    requestAllPermissions: async function (nextAppState) {
      if (nextAppState == "background" || __DEV__) return;

      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (Platform.OS === "android" && status !== 'granted') {
        Alert.alert(
          "Permisiuni Locatie",
          "Aceasta aplicatie colecteaza date despre locatie pentru a activa caracteristica de preluare si urmarire a locatiei dumneavoastra pe harta chiar si atunci cand aplicatia este inchisa sau nu este utilizata.",
          [
            {
              text: "Refuz",
              onPress: () => BackHandler.exitApp(),
            },
            {
              text: "Sunt de acord",
              onPress: () => { this.askForPermissions() },
            },
          ],
          { cancelable: false }
        );
      }

      if (Platform.OS === 'ios') {
        this.askForPermissions()
      }
    },
    askForPermissions: async function () {
      await Permissions.askAsync(
        Permissions.LOCATION,
        Permissions.NOTIFICATIONS, // Allowed by default on Android, but request it in case of manual permission revoke
        Permissions.USER_FACING_NOTIFICATIONS, // Needed for iOS, on Android it's the same as NOTIFICATIONS,
      );
    }
  }
}