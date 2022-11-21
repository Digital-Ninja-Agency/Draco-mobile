<template>
  <nb-root>
    <nb-container v-if="loaded" :style="{backgroundColor: '#fff'}">
      <nb-content :scrollEnabled="false" :style="{flex: 1}" :contentContainerStyle="{minHeight: windowHeight-40}">
        <image
          :source="banner"
          :style="{height: 175, resizeMode: 'contain', alignSelf: 'center', marginTop: 40}"
        />
        <nb-text
          :style="{textAlign: 'center', fontSize: 24, color: '#444', marginBottom: 40, marginTop: 20}"
        >Autentificare</nb-text>
        <nb-form>
          <nb-item
            :error="(!$v.emailValue.required || !$v.emailValue.email ) && $v.emailValue.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Email"
              :onChangeText="text => emailValue = text"
              auto-capitalize="none"
              autoCompleteType="off"
              importantForAutofill="off"
              :autoCorrect="false"
              keyboardType="email-address"
              :on-blur="() => $v.emailValue.$touch()"
              :onSubmitEditing="goToPassword"
            />
          </nb-item>
          <nb-item last :error="!$v.password.required && $v.password.$dirty">
            <customInput
              placeholder="Parola"
              :onChangeText="text => password = text"
              ref="passwordInput"
              auto-capitalize="none"
              autoCompleteType="off"
              importantForAutofill="off"
              placeholderTextColor="#444"
              secure-text-entry
              :autoCorrect="false"
              :on-blur="() => $v.password.$touch()"
              :onSubmitEditing="login"
            />
          </nb-item>
        </nb-form>
        <nb-view padder :style="{flex: 1}">
          <nb-button
            transparent
            :style="{alignSelf: 'center', marginTop: 10}"
            :on-press="goRegister"
          >
            <nb-text :style="{color: '#a0a0a0'}">Inregistreaza-te!</nb-text>
          </nb-button>
          <nb-button
            transparent
            :style="{alignSelf: 'center', marginTop: 5}"
            :on-press="goForgotPassword"
          >
            <nb-text :style="{color: '#bbb'}">Ai uitat parola?</nb-text>
          </nb-button>
        </nb-view>
        <nb-view
          :style="{ width: '96%', alignSelf: 'center', marginTop: 'auto', marginBottom: 120 }"
        >
          <nb-button danger block :on-press="login" :style="{height: 55}">
            <nb-spinner color="white" v-if="logging_in" size="small" />
            <nb-text>Autentificare</nb-text>
          </nb-button>
        </nb-view>
      </nb-content>
    </nb-container>
    <!-- <nb-spinner v-if="!loaded"></nb-spinner> -->
  </nb-root>
</template>

<script>
import { Dimensions, AsyncStorage } from "react-native";
import { required, email } from "vuelidate/lib/validators";
import { customInput } from 'components/customInput';
import banner from "assets/login-logo-alt-scaled.png";

export default {
  components: {
    customInput,
  },
  computed: {
    logging_in() {
      return this.store.state.logging_in;
    },
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  validations: {
    emailValue: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  data: function () {
    return {
      banner,
      emailValue: "",
      password: "",
      loaded: false,
    };
  },
  created() {
    AsyncStorage.getItem("userObj").then((val) => {
      let userObj = JSON.parse(val);

      if (userObj && userObj.token) {
        this.loaded = true;
        let homeView = "Home" + userObj.role_name;

        this.navigation.navigate(homeView);
        this.store.dispatch("SET_USER", { userObj });
      } else {
        this.loaded = true;
      }
    });
  },
  methods: {
    login() {
      if (!this.$v.$invalid) {
        this.store.dispatch("LOGIN", {
          userObj: { email: this.emailValue, password: this.password },
          navigate: this.navigation.navigate,
        });
      } else {
        this.store.dispatch("LOGIN_UNSUCCESFULL");
      }
    },
    goForgotPassword() {
      this.navigation.push("ForgotPassword");
    },
    goRegister() {
      this.navigation.push("Register");
    },
    goToPassword() {
      this.$refs.passwordInput._root.focus();
    },
  },
};
</script>