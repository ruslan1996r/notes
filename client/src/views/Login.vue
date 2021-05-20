<template>
  <AuthForm
    v-if="!isLoading"
    @method="login"
    pageType="Login"
    redirect="Registration"
  />
  <Preloader v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AuthForm from "../components/AuthForm.vue";
import Preloader from "../components/Preloader.vue";
export default {
  name: "Login",
  components: {
    AuthForm,
    Preloader,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  methods: {
    ...mapActions(["ACTION_login", "ACTION_set_user"]),
    login(form) {
      this.ACTION_login(form);
    },
  },
  mounted() {
    this.ACTION_set_user();
  },
};
</script>