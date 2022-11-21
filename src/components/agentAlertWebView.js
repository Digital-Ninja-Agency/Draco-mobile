import React, { Component } from 'react';
import { BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Dimensions } from "react-native";
import storePlugin from "store/storePlugin";

const screenHeight = Math.round(Dimensions.get('window').height) - 80;

export default class App extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    const userToken = storePlugin.store.state.userObj.token;

    return (
      <WebView
        source={{ uri: env.BACKEND_URL, headers: {Authorization: "Bearer "+userToken} }}
        javaScriptEnabled={true}
        ref={(webView) => { this.webView.ref = webView; }}
        style={{ flex: 1, height: screenHeight, backgroundColor: 'transparent' }}
        onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
      />
    );
  }
}