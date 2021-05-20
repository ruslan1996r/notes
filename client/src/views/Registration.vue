<template>
  <AuthForm @method="register" pageType="Registration" redirect="Login" />
</template>

<script>
import { mapActions } from "vuex";
import AuthForm from "../components/AuthForm.vue";
export default {
  name: "Registration",
  components: {
    AuthForm,
  },
  methods: {
    ...mapActions(["ACTION_register"]),
    register(form) {
      this.ACTION_register(form);
    },
  },
};
</script>