<template>
    <form @submit.prevent="register" @change="pristine = false">
        <label for="name" class="label">Name</label>
        <input id="name" type="text" v-model="name" required />

        <label for="email" class="label">Email</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password" class="label">Password</label>
        <input id="password" type="password" v-model="password" required />

        <button :disabled="pristine">Register</button>
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
                pristine: true,
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
        max-width: 800px;
        margin: 1rem auto;
    }
</style>
