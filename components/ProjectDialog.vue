<template>
    <form @submit.prevent="submit" @change="pristine = false">
        <div class="modal-header">
            <div class="modal-title">Project edit</div>
            <button type="button" @click="$emit('close')" class="btn-close">
                Close
            </button>
        </div>
        <div class="modal-body">
            <label for="name" class="label">Name</label>
            <input id="name" type="text" v-model="name" required />
        </div>
        <div class="modal-footer">
            <button :disabled="pristine">Save</button>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            entity: Object,
        },
        data() {
            return {
                name: this.entity.name,
                pristine: true,
            };
        },
        methods: {
            async submit() {
                try {
                    const { data: project } = await this.$axios.post(
                        "projects-manage/update",
                        { name: this.name },
                        {
                            params: { id: this.entity.id },
                        }
                    );
                    this.$emit("close", project);
                } catch (error) {
                    window.alert(error.message || error);
                }
            },
        },
    };
</script>

<style scoped></style>
