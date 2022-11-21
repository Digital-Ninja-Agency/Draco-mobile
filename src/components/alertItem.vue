<template>
  <nb-list-item noIndent thumbnail>
    <nb-left>
      <nb-badge :info="info" :error="error" :style="{marginLeft: 'auto', marginRight: 5, minWidth: 70}">
        <nb-text :style="{fontSize: 12, lineHeight: 24 }">{{ getFormattedStatus }}</nb-text>
      </nb-badge>
    </nb-left>
    <nb-body>
      <nb-text>Alerta #{{alert.id}}</nb-text>
      <nb-text
        note
        :numberOfLines="1"
        v-if="getFormattedDate"
        :style="{ fontSize: 12 }"
      >{{getFormattedDate}}</nb-text>
    </nb-body>
    <nb-right v-if="info">
      <nb-button bordered info small :on-press="info ? clickHandler : null">
        <nb-text :style="{fontSize: 12}">Deschide</nb-text>
      </nb-button>
    </nb-right>
  </nb-list-item>
</template>

<script>
export default {
  props: {
    alert: Object,
  },
  computed: {
    info() {
      return this.alert.status == "completed";
    },
    error() {
      return this.alert.status == "cancelled";
    },
    getFormattedStatus() {
      switch (this.alert.status) {
        case "completed":
          return "Incheiata";
        case "cancelled":
          return "Anulata";
      }
    },
    getFormattedDate() {
      if (!this.alert.completed_at) return;
      return moment(this.alert.completed_at).format("DD.MM.YYYY HH:mm");
    },
  },
  methods: {
    clickHandler() {
      if (this.alert.status == "cancelled") return;
      this.$parent.navigation.navigate("AlertShow", {
        alert: this.alert,
      });
    },
  },
};
</script>