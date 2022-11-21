import * as TaskManager from "expo-task-manager";
import * as ScreenOrientation from 'expo-screen-orientation';

export function LOGGING_IN(state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL(state, { userObj }) {
  state.userObj = userObj;
  state.logging_in = false;
}

export function LOGIN_UNSUCCESFULL(state) {
  state.userObj = {};
  state.logging_in = false;
  state.alert_id = null;
}

export function LOGGED_OUT(state) {
  state.userObj = {};
  state.logging_in = false;
  state.alert_id = null;
  state.clientButtonActive = false;
  state.active_channels.forEach(channel => channel.instance.leave(channel.name));
  TaskManager.unregisterAllTasksAsync();
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

export function CHANNEL_JOINED(state, channel) {
  state.active_channels.push(channel);
}

export function SET_CLIENT_ALERT(state, alert_id) {
  state.alert_id = alert_id;
}

export function TOGGLE_CLIENT_BUTTON_STATE(state) {
  state.clientButtonActive = !state.clientButtonActive;
}