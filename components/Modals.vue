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
                class="modal-content"
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

        background-color: white;
        border-radius: 1rem;
    }
    .modal-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
</style>

<style>
    .modal-header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid grey;
    }
    .modal-title {
        font-weight: 600;
        font-size: 1.5rem;
    }
    .modal-body {
        padding: 1rem;
        flex: 1 1 auto;
    }
    .modal-footer {
        padding: 1rem;
        display: flex;
        justify-content: end;
        border-top: 1px solid grey;
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
