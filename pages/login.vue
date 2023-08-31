<template>
    <form @submit.prevent="login" @change="pristine = false">
        <label for="email" class="label">Email</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password" class="label">Password</label>
        <input id="password" type="password" v-model="password" required />

        <button type="submit" :disabled="pristine">Login</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                pristine: true,
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
        max-width: 800px;
        margin: 1rem auto;
    }
</style>
