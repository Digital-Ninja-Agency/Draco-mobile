import { AsyncStorage, Alert } from 'react-native';
import { Toast } from 'native-base';
import * as Device from 'expo-device';
import { getToken } from "expo-push-notification-helper";

export function LOGIN({ commit, dispatch, state }, { userObj, navigate }) {
  commit('LOGGING_IN', true);
  return new Promise(async (resolve, reject) => {
    let expo_push_token = null;
    try {
      expo_push_token = await getToken();
    } catch (error) { }

    axios.post(`${env.BACKEND_URL}/api/token`, {
      email: userObj.email,
      password: userObj.password,
      device_name: Device.modelName,
      expo_push_token: expo_push_token,
    })
      .then(response => {
        userObj.id = response.data.user.id;
        userObj.token = response.data.token;
        userObj.name = response.data.user.name;
        userObj.role_name = response.data.user.role_name;
        userObj.has_active_subscription = response.data.user.has_active_subscription;
        userObj.is_vip = response.data.user.is_vip;
        delete userObj.password;

        commit('LOGIN_SUCCESFULL', { userObj })
        AsyncStorage.setItem('userObj', JSON.stringify(userObj));

        navigate(`Home${userObj.role_name}`);
        resolve();
        return;
      })
      .catch(error => {
        if (error.response && error.response.status == "406") {
          Alert.alert(
            "Email-ul nu a fost verificat",
            "Va rugam sa intrati pe adresa de email cu care v-ati inregistrat, si sa urmati instructiunile pentru a va activa contul.",
            [
              { text: "Am inteles", onPress: () => { return; } },
              {
                text: "Retrimite Email", onPress: () => {
                  axios.post(`${env.BACKEND_URL}/email/resend_api`, {
                    email: userObj.email,
                    password: userObj.password
                  })
                    .then(response => { })
                    .catch(error => { });
                }
              }
            ],
            { cancelable: false }
          );
        }
        dispatch('LOGIN_UNSUCCESFULL');
      });
  })
}

export function LOGIN_UNSUCCESFULL({ commit, state }) {
  Toast.show({
    text: 'Email sau Parola invalida.',
    buttonText: 'Okay'
  });
  return commit('LOGIN_UNSUCCESFULL')
}

export function SET_USER({ commit, state }, { userObj }) {
  return commit('LOGIN_SUCCESFULL', { userObj })
}

export function LOGOUT({ commit, state }, callback) {
  AsyncStorage.setItem('userObj', '');
  return commit('LOGGED_OUT');
}

export function TOGGLE_CLIENT_BUTTON_STATE({ commit, state }) {
  return commit('TOGGLE_CLIENT_BUTTON_STATE');
}