<template>
  <v-app-bar fixed app>
    <v-row class="justify-space-between align-center">
      <v-col>
        <h1 @click="$router.push('/main')" style="cursor: pointer">
          {{ userName }}
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn @click="logout" color="primary"
          >Logout <v-icon class="ml-3">mdi-logout-variant</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("ACTION_logout");
    },
  },
};
</script>