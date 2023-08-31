<template>
  <nav>
    <template v-if="isAuthenticated">
      <nuxt-link to="/projects">Projects</nuxt-link>
      <a @click="logout" href="javascript:">Logout</a>
    </template>

    <template v-else>
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </template>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
}
</style>
