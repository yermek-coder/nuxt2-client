<template>
    <div class="nav">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="@/assets/images/logo_150.png" alt="Quwi" />
            </div>
            <div class="nav-links">
                <template v-if="isAuthenticated">
                    <nuxt-link to="/">Projects</nuxt-link>
                    <a @click="logout" href="javascript:">Logout</a>
                </template>
                <template v-else>
                    <nuxt-link to="/login">Login</nuxt-link>
                    <nuxt-link to="/register">Register</nuxt-link>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
        background-color: white;
    }
    .nav-container {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        max-width: 800px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }
    .nav-links {
        display: flex;
        gap: 1rem;
    }
    .nav-logo {
    }
    .nav-logo img {
        width: 30px;
        height: 30px;
    }

    a {
        position: relative;
        color: #000;
        text-decoration: none;
    }

    .nuxt-link-active {
        color: #000;
        text-decoration: none;
    }

    a:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        bottom: -2px;
        left: 0;
        background-color: #000;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }

    .nuxt-link-active::before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
</style>

<script>
    import { mapGetters } from "vuex";

    export default {
        computed: {
            ...mapGetters(["isAuthenticated", "loggedInUser"]),
        },
        methods: {
            async logout() {
                await this.$auth.logout();
                this.$router.push("/login");
            },
        },
    };
</script>
