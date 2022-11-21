<template>
  <NavigationEvents :onWillFocus="preventBackHandler" :onWillBlur="removeBackHandler" />
</template>

<script>
import { NavigationEvents } from "react-navigation";
import { BackHandler } from "react-native";

export default {
  props: {
    prevent: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    NavigationEvents,
  },
  data() {
    return {
      backHandlerFn: null,
    };
  },
  methods: {
    preventBackHandler: function () {
      this.backHandlerFn = BackHandler.addEventListener(
        "hardwareBackPress",
        () => this.prevent
      );
    },
    removeBackHandler: function () {
      if (this.backHandlerFn != null)
        this.backHandlerFn = this.backHandlerFn.remove();
    },
  },
};
</script>