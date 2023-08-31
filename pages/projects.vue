<template>
  <ul class="project__list">
    <li v-for="project in projects" @click="edit(project)" class="project">
      <img :src="project.logo_url" />
      <h3>{{ project.name }}</h3>
      <div>{{ project.is_active ? "Active" : "Not active" }}</div>
    </li>
  </ul>
</template>

<style scoped>
.project__list {
  max-width: 800px;
  margin: 0 auto;
}
.project {
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: grey;
}

.project h3 {
  flex-grow: 1;
  margin-left: 1rem;
}
</style>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      projects: [],
    };
  },

  async fetch() {
    try {
      this.projects = (
        await this.$axios.get("projects-manage/index", {
          params: {
            "filters[is_active]": 1,
            sort: "dta_create",
          },
        })
      ).data.projects;
    } catch (error) {
      window.alert(error.message || error);
    }
  },

  methods: {
    async edit(project) {
      const res = await this.$modal({
        component: "ProjectDialog",
        props: { entity: project },
      });
      if (res) {
        const index = this.projects.findIndex((item) => item.id === project.id);
        this.projects.splice(index, 1, res.project);
      }
    },
  },
};
</script>
