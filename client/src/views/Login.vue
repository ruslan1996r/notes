<template>
  <AuthForm @method="login" pageType="Login" redirect="Registration" />
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
import AuthApi from "../api/auth";
export default {
  name: "Login",
  components: {
    AuthForm,
  },
  computed: {
    testStore() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    login(form) {
      AuthApi.test();
      console.log("login data", form, console.log("testStore", this.testStore));
    },
  },
};
</script>