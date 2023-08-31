<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" required />
    <input type="password" v-model="password" required />

    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      try {
        const res = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        const user = res.data.app_init.user;
        this.$auth.$storage.setUniversal("user", user, true);

        this.$router.push("/projects");
      } catch (e) {
        window.alert(error.message || error);
      }
    },
  },
};
</script>

<style scoped>
form * {
  display: block;
}
</style>
