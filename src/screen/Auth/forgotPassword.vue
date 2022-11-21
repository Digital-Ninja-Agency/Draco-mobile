<template>
  <nb-root>
    <nb-container :style="{backgroundColor: '#fff'}">
      <nb-content :scrollEnabled="false" :style="{flex: 1}" :contentContainerStyle="{minHeight: windowHeight-40}">
        <nb-icon
          :style="{padding:20, position: 'absolute', top: 20}"
          :on-press="goBack"
          name="arrow-back"
        />
        <image
          :source="banner"
          :style="{height: 175, resizeMode: 'contain', alignSelf: 'center', marginTop: 40}"
        />
        <nb-text
          :style="{textAlign: 'center', fontSize: 24, color: '#444', marginBottom: 40, marginTop: 20}"
        >Ti-ai uitat parola?</nb-text>
        <nb-form :style="{marginBottom: 50}">
          <nb-item
            :error="(!$v.email.required || !$v.email.email ) && $v.email.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Introdu aici email-ul pentru resetare"
              :onChangeText="text => email = text"              
              auto-capitalize="none"
              :on-blur="() => $v.email.$touch()"
              :onSubmitEditing="resetPassword"
            />
          </nb-item>
        </nb-form>
        <nb-view :style="{ width: '96%', alignSelf: 'center', marginTop: 'auto', marginBottom: 30}">
          <nb-button danger block :on-press="resetPassword" :style="{height: 55}">
            <nb-text>Reseteaza Parola</nb-text>
          </nb-button>
        </nb-view>
      </nb-content>
    </nb-container>
  </nb-root>
</template>

<script>
import { Dimensions, Alert } from "react-native";
import { required, email } from "vuelidate/lib/validators";
import banner from "assets/login-logo-alt-scaled.png";

export default {
  computed: {
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  data: function () {
    return {
      banner,
      email: "",
      loaded: false,
    };
  },
  created() {},
  methods: {
    goBack() {
      this.navigation.goBack();
    },
    resetPassword() {
      if (this.$v.$invalid) {
        return this.$v.$touch();
      }
      let _this = this;

      axios
        .post(`${env.BACKEND_URL}/password/forgot`, {
          email: this.email,
          is_api_request: true,
        })
        .then(function (responseData) {
          _this.email = "";
          Alert.alert(
            "Cererea a fost trimisa cu succes",
            "Cererea de resetare a parolei a fost trimisa cu succes pe adresa de email introdusa. Va rugam sa urmati instructiunile atasate pentru a va reseta parola.",
            [
              {
                text: "Am inteles",
                onPress: () => {
                  _this.navigation.navigate("Login");
                },
              },
            ],
            { cancelable: false }
          );
        })
        .catch(function (error) {
          Alert.alert(
            "Cererea a esuat",
            "Cererea de resetare a parolei nu a putut fi indeplinita. Va rugam verificati adresa de email introdusa.",
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
        });
    },
  },
};
</script>