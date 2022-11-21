<template>
  <nb-root>
    <nb-container :style="{backgroundColor: '#fff'}">
      <nb-content :style="{flex: 1}" :contentContainerStyle="{ minHeight: windowHeight-40 }">
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
        >Inregistreaza-te</nb-text>
        <nb-form :style="{marginBottom: 50}">
          <nb-item
            :error="(!$v.last_name.required) && $v.last_name.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Nume"
              :onChangeText="text => last_name = text"
              :on-blur="() => $v.last_name.$touch()"
            />
          </nb-item>
          <nb-item
            :error="(!$v.first_name.required) && $v.first_name.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Prenume"
              :onChangeText="text => first_name = text"
              :on-blur="() => $v.first_name.$touch()"
            />
          </nb-item>
          <nb-item
            :error="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Email"
              :onChangeText="text => email = text"
              keyboardType="email-address"
              auto-capitalize="none"
              :on-blur="() => $v.email.$touch()"
            />
          </nb-item>
          <nb-item
            :error="(!$v.phone.required || !$v.phone.numeric) && $v.phone.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="Telefon"
              :onChangeText="text => phone = text"
              keyboardType="phone-pad"
              auto-capitalize="none"
              :on-blur="() => $v.phone.$touch()"
            />
          </nb-item>
          <nb-item
            :error="(!$v.cnp.required || !$v.cnp.numeric) && $v.cnp.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input
              placeholder="CNP"
              :onChangeText="text => cnp = text"
              keyboardType="phone-pad"
              auto-capitalize="none"
              :on-blur="() => $v.cnp.$touch()"
            />
          </nb-item>
          <nb-item
            :error="(!$v.dob.required) && $v.dob.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 10, paddingTop: 3, paddingBottom: 3 }"
          >
            <custom-date-picker
              animationType="fade"
              androidMode="default"
              placeHolderText="Data nasterii"
              :defaultDate="getMaxDate()"
              :maximumDate="getMaxDate()"
              :modalTransparent="true"
              :textStyle="{ fontSize: 16 }"
              :placeHolderTextStyle="{ color: '#555', fontSize: 16 }"
              :onDateChange="setDate"
            />
          </nb-item>
          <nb-item
            picker
            :error="(!$v.county.required) && $v.county.$dirty"
            :style="getPickerStyle()"
          >
            <nb-picker
              placeholder="Judet"
              :textStyle="{ fontSize: 16, width: '100%' }"
              :renderHeader="getPickerHeaderComp"
              :placeholderStyle="{ color: '#555', fontSize: 16, width: '100%' }"
              :selectedValue="county"
              :onValueChange="(newVal) => {county = newVal}"
              :style="platform == 'android' ? {color: (county==0)?'#555':'#000'} : {}"
            >
              <nb-item value="0" label="Selecteaza Judet" v-show="platform == 'android'"/>
              <nb-item
                v-for="county in counties"
                :label="county"
                :value="county"
                :key="county"
                :style="{ fontSize: 16 }"
              />
            </nb-picker>
          </nb-item>
          <nb-item picker :error="(!$v.city.required) && $v.city.$dirty" :style="getPickerStyle()">
            <nb-picker
              placeholder="Oras"
              :textStyle="{ fontSize: 16, width: '100%' }"
              :renderHeader="getPickerHeaderComp"
              :placeholderStyle="{ color: '#555', fontSize: 16, width: '100%' }"
              :selectedValue="city"
              :onValueChange="(newVal) => {city = newVal}"
              :enabled="!!county.length && !!cities.length"
              :style="platform == 'android' ? {color: (city==0)?'#555':'#000'} : {}"
            >
              <nb-item value="0" label="Selecteaza Oras" v-show="platform == 'android'" />
              <nb-item
                v-for="city in cities"
                :label="city.name"
                :value="city.name"
                :key="city.name"
                :style="{ fontSize: 16 }"
              />
            </nb-picker>
          </nb-item>
          <nb-item
            :error="(!$v.address.required) && $v.address.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <nb-input placeholder="Adresa" :onChangeText="text => address = text" :on-blur="() => $v.address.$touch()" />
          </nb-item>
          <nb-item
            :error="!$v.password.required && $v.password.$dirty"
            :style="{ marginLeft: 0, paddingLeft: 15 }"
          >
            <customInput
              placeholder="Parola"
              :onChangeText="text => password = text"
              auto-capitalize="none"
              secure-text-entry
              :on-blur="() => $v.password.$touch()"
            />
          </nb-item>
          <nb-item
            last
            :error="(!$v.password_confirmation.sameAsPassword && $v.password_confirmation.$dirty) || (!$v.password.required && $v.password.$dirty)"
          >
            <customInput
              placeholder="Confirma Parola"
              :onChangeText="text => password_confirmation = text"
              auto-capitalize="none"
              secure-text-entry
              :on-blur="() => $v.password_confirmation.$touch()"
            />
          </nb-item>
          <nb-item
            last
            :style="{ marginLeft: -5, padding: 14 }"
            :on-press="() => tnc = !tnc"
            :error="!$v.tnc.checked && $v.tnc.$dirty"
          >
            <custom-check-box :checked="tnc" color="#D9534F" :onPress="() => tnc = !tnc" />
            <nb-body>
              <nb-text :style="{ width: '85%', color: '#555' }">Accept termenii si conditiile</nb-text>
            </nb-body>
          </nb-item>
          <nb-item
            last
            :style="{ marginLeft: -5, padding: 14 }"
            :on-press="() => gdpr = !gdpr"
            :error="!$v.gdpr.checked && $v.gdpr.$dirty"
          >
            <custom-check-box :checked="gdpr" color="#D9534F" :onPress="() => gdpr = !gdpr" />
            <nb-body>
              <nb-text :style="{ width: '85%', color: '#555' }">Accept protectia datelor (GDPR)</nb-text>
            </nb-body>
          </nb-item>
        </nb-form>
        <nb-view :style="{ width: '96%', alignSelf: 'center', marginTop: 'auto', marginBottom: 50}">
          <nb-button danger block :on-press="register" :style="{height: 55}">
            <nb-text>Inregistreaza-te!</nb-text>
          </nb-button>
        </nb-view>
      </nb-content>
    </nb-container>
  </nb-root>
</template>

<script>
import React from "react";
import { Dimensions, Alert, Platform } from "react-native";
import {
  required,
  email,
  numeric,
  sameAs,
  minLength,
} from "vuelidate/lib/validators";
import banner from "assets/login-logo-alt-scaled.png";
import customDatePicker from "components/customDatePicker";
import { customCheckBox } from "components/customCheckbox";
import { customInput } from 'components/customInput';

import {
  Icon,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Toast,
} from "native-base";

export default {
  components: {
    customDatePicker,
    customCheckBox,
    customInput
  },
  computed: {
    windowHeight() {
      return Math.round(Dimensions.get("window").height);
    },
  },
  validations: {
    last_name: {
      required,
    },
    first_name: {
      required,
    },
    address: {
      required,
    },
    city: {
      required,
    },
    county: {
      required,
    },
    phone: {
      required,
      numeric,
    },
    cnp: {
      required,
      numeric,
    },
    email: {
      required,
      email,
    },
    dob: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    password_confirmation: {
      sameAsPassword: sameAs("password"),
    },
    tnc: {
      checked: (value) => value === true,
    },
    gdpr: {
      checked: (value) => value === true,
    },
  },
  data: function () {
    return {
      banner,
      platform: "",
      counties: [],
      cities: [],
      loaded: false,
      errors: {},
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      county: "",
      phone: "",
      cnp: "",
      dob: "",
      password_confirmation: "",
      password: "",
      tnc: false,
      gdpr: false,
    };
  },
  async created() {
    await this.setCountiesList();
    this.platform = Platform.OS;
  },
  methods: {
    goBack() {
      this.navigation.goBack();
    },
    setCountiesList() {
      axios
        .get(`${env.BACKEND_URL}/localities/counties`, {
          responseType: "json",
        })
        .then((response) => {
          this.counties = response.data;
        });
    },
    register() {
      let _this = this;
      if (this.$v.$invalid) {
        return this.$v.$touch();
      }
      axios
        .post(`${env.BACKEND_URL}/register`, {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          city: this.city,
          county: this.county,
          phone: this.phone,
          cnp: this.cnp,
          dob: this.dob,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          Alert.alert(
            "Countul a fost creat cu success",
            "Pentru a continua sa va logati in aplicatie va rugam sa va activati contul verificand email-ul pe care l-ati folosit pentru a va inregistra.",
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
        .catch((error) => {
          _this.errors = error.response.data.errors;
          _this.showErrorToast();
        });
    },
    setDate(date) {
      this.dob = date;
    },
    getMaxDate() {
      let date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return date;
    },
    getPickerStyle() {
      let paddings = {
        paddingLeft: 5,
        paddingTop: 3,
        paddingBottom: 3,
      };

      if (this.platform === "android") {
        paddings = {
          paddingLeft: 12,
          paddingTop: 1,
          paddingBottom: 1,
        };
      }

      return { ...paddings, marginLeft: 0 };
    },
    getPickerHeaderComp: function (backAction) {
      return (
        <Header style={{ backgroundColor: "#000" }}>
          <Left style={{ flex: 2 }}>
            <Button transparent onPress={backAction}>
              <Icon name="arrow-back" style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body style={{ flex: 5 }}>
            <Title>Alege o optiune</Title>
          </Body>
        </Header>
      );
    },
    showErrorToast() {
      let _this = this,
        errors = this.errors;

      Object.entries(errors).forEach(([key, val]) => {
        Toast.show({
          text: val[0],
        });
      });
    },
  },
  watch: {
    county(value) {
      if (value == 0) {
        this.cities = [];
        return;
      }
      axios
        .get(`${env.BACKEND_URL}/localities/county_localities/${value}`, {
          responseType: "json",
        })
        .then((response) => {
          this.cities = response.data;
        });
    },
  },
};
</script>