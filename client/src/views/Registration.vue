<template>
  <AuthForm @method="register" pageType="Registration" redirect="Login" />
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
export default {
  name: "Registration",
  components: {
    AuthForm,
  },
  methods: {
    register(form) {
      console.log("register data", form);
    },
  },
};
</script>