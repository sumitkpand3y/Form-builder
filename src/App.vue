<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h1>
        Form Builder
        <small>Made with Vue.JS</small>
      </h1>
    </div>
    <div class="app-wrapper">
      <div id="app">
        <component :is="layout">
          <router-view></router-view>
        </component>
      </div>
    </div>

    <div class="demo-footer">
      <a href="https://github.com/jmeei/vue-formbuilder">GitHub Repo</a>
    </div>
  </div>
</template>

<script>
const default_layout = "default";
const custom_layout = "custom";

export default {
  name: "App",
  computed: {
    layout() {
      return (
        (this.$route.meta.layout === "custom"
          ? custom_layout
          : default_layout) + "-layout"
      );
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/main.scss";
</style>
