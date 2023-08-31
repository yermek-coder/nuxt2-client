export const state = () => ({
  modals: [],
});

export const mutations = {
  addModal(state, modals) {
    state.modals.push(modals);
  },
  removeModal(state, id) {
    state.modals.splice(state.modals.indexOf(id), 1);
  },
};

export const getters = {};

export const actions = {
  open({ commit }, options) {
    commit("addModal", options);
    options.id = new Date().getTime();
    return new Promise((resolve) => {
      options.$resolve = resolve;
    });
  },

  close({ commit, state }, { spec, result = null }) {
    const id = spec.id || spec;
    const ref = state.modals.filter((modal) => modal.id === id).pop();
    if (ref) {
      commit("removeModal", ref);
      ref.$resolve(result);
    }
  },
};

export const strict = true;
