<template>
  <div>
    <div class="modal-header">
      <div class="modal-title">Project edit</div>
      <button @click="$emit('close')" class="btn-close">Close</button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="submit">
        <input type="text" v-model="name" required />
        <button>Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entity: Object,
  },
  data() {
    return {
      name: this.entity.name,
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

<style scoped>
.btn-close {
  margin-left: auto;
}
form * {
  display: block;
}
</style>
