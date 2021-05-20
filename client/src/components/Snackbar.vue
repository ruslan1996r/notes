<template>
  <v-snackbar
    dark
    v-model="show"
    :color="color"
    :timeout="2000"
    top
    right
    class="text-center"
  >
    <div class="d-flex justify-center">
      <span class="text-h6">{{ snackbarText }}</span>
      <v-btn text @click="show = false">Close</v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    show: false,
    snackbarText: "",
    color: "",
  }),
  created() {
    this.$store.subscribe(({ type, payload }) => {
      if (type === "SET_SNACKBAR") {
        const { text, color, show = true } = payload;
        this.snackbarText = text;
        this.color = color;
        this.show = show;
      }
    });
  },
};
</script>