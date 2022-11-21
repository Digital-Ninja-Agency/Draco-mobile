export default {
  props: {
    navigation: Object
  },
  methods: {
    openDrawer: function () {
      this.navigation.openDrawer();
    },
    logout: function () {
      this.store.dispatch("LOGOUT", () =>
        this.navigation.dispatch(resetAction)
      );
      this.navigation.navigate("Login");
    },
    goHome: function () {
      let homeView = `Home${this.store.state.userObj.role_name}`;
      this.navigation.navigate(homeView);
    }
  }
};