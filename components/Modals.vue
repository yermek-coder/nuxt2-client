<template>
  <div>
    <div v-if="components.length" class="backdrop"></div>
    <div
      class="modal"
      v-for="(modal, index) in components"
      :key="modal.id"
      :style="{ zIndex: index + 1500 }"
    >
      <component
        :is="modal.component"
        v-bind="modal.props"
        @close="close(modal, $event)"
      ></component>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  opacity: 0.3;
  background-color: #000;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 40vw;
  max-height: 60vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
}
</style>

<style>
.modal-header {
  display: flex;
}
.modal-title {
  font-weight: 600;
}
</style>

<script>
export default {
  computed: {
    components() {
      return this.$store.state.modals.modals;
    },
  },
  methods: {
    close(spec, result) {
      this.$store.dispatch("modals/close", { spec, result });
    },
  },
};
</script>
