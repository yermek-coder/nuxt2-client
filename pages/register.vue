<template>
  <form @submit.prevent="register">
    <input type="text" v-model="name" required />
    <input type="email" v-model="email" required />
    <input type="password" v-model="password" required />

    <button>Register</button>
  </form>
</template>

<script>
export default {
  middleware: "guest",

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async register() {
      try {
        await this.$axios.post("auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        this.$router.push("/");
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
