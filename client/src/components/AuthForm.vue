<template>
  <v-card class="d-flex flex-column align-center justify-center" height="100%">
    <h1 class="mb-5 text-center">{{ pageType }} page</h1>
    <v-form
      ref="form"
      class="d-flex flex-column align-center"
      style="width: 250px"
    >
      <v-text-field
        v-model="username"
        :rules="rules"
        label="Username"
        style="width: 100%"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules"
        label="Password"
        style="width: 100%"
      ></v-text-field>
      <v-btn color="primary" @click="submit" width="150" class="mt-3">{{
        pageType
      }}</v-btn>
    </v-form>
    <router-link class="mt-5" :to="`/${redirect.toLocaleLowerCase()}`">{{
      redirect
    }}</router-link>
  </v-card>
</template>

<script>
import { Validations } from "../utils/validations";
export default {
  name: "Login",
  props: ["pageType", "redirect"],
  data: () => ({
    username: "",
    password: "",
    rules: [Validations.nonEmpty],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const form = {
          username: this.username,
          password: this.password,
        };
        this.$emit("method", form);
      }
    },
  },
};
</script>