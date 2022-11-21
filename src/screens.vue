<template>
  <style-wrapper>
    <root>
      <app-navigation></app-navigation>
    </root>
  </style-wrapper>
</template>

<script>
import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "vue-native-router";
import { Root } from "native-base";
import StyleWrapper from "components/styleWrapper";

// Screens
import LoginScreen from "screen/Auth/login.vue";
import HomeAgentScreen from "screen/Agent/homeAgent.vue";
import HomeClientScreen from "screen/Client/homeClient.vue";
import ForgotPasswordScreen from "screen/Auth/forgotPassword.vue";
import RegisterScreen from "screen/Auth/register.vue";
import Sidebar from "screen/Shared/sidebar.vue";
import AboutScreen from "screen/Shared/about.vue";
import MyAccount from "screen/Client/account.vue";
import AlertIndex from "screen/Client/alertIndex.vue";
import AlertShow from "screen/Client/alertShow.vue";

const Drawer = createDrawerNavigator(
  {
    HomeAgent: { screen: HomeAgentScreen },
    HomeClient: { screen: HomeClientScreen },
    AboutScreen: { screen: AboutScreen },
    MyAccount: { screen: MyAccount },
    AlertIndex: { screen: AlertIndex },
    AlertShow: { screen: AlertShow },
  },
  {
    contentComponent: (props) => <Sidebar {...props} />,
    backBehavior: "history",
    drawerType: "slide",
    edgeWidth: 40,
  }
);

const StackNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    Register: { screen: RegisterScreen },
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

const AppNavigation = createAppContainer(StackNavigator);

export default {
  components: { Root, AppNavigation, StyleWrapper },
};
</script> 