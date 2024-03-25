<template>
  <el-container>
    <el-header class="container_header">
     <span class="form_builder-title">Form Builder</span>
      <el-button size="small" @click="createNewForm" type="primary"
        >Create New</el-button
      >
    </el-header>

    <el-container>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "/",
    };
  },
  watch: {
  },
  computed: {
    ...mapState({
      forms: (state) => state.forms,
      themingVars: (state) => state.themingVars,
      containerSectionList: (state) => state.containerSectionList,
      activeForm: (state) => state.activeForm,
    }),
  },
  created() {
    this.getFormThemeVar();
  },
  methods: {
    createNewForm() {
      this.$router.push({path:"/Design"});
    },
    saveData() {
      this.containerSectionList.forEach((obj) => {
        if (Array.isArray(obj.fields)) {
          obj.fields = obj.fields.filter((field) => !field.isContainer);
        }
      });
      let payload = this.containerSectionList;
      this.triggerAddFormBuilderApi(payload);
      let themePayload = this.themingVars;
      if (this.themingVars._id.length) {
        let id = this.themingVars._id
        this.triggerThemeVarUpdateApi(id, themePayload);
      } else {
        this.triggerThemeVarAddApi(themePayload);
      }
    },
    async triggerAddFormBuilderApi(payload) {
      try {
        let response = await this.$store.dispatch(
          "triggerAddFormSectionApi",
          payload
        );
        if (response.status == 200) {
          console.log("response", response);
        }
      } catch (error) {}
    },
    async triggerThemeVarAddApi(payload) {
      try {
        let response = await this.$store.dispatch(
          "triggerThemeVarAddApi",
          payload
        );
        if (response.status == 200) {
        }
      } catch (error) {}
    },
    async triggerThemeVarUpdateApi(id, payload) {
      try {
        let response = await this.$store.dispatch(
          "triggerThemeVarUpdateApi",
          {id,payload}
        );
        if (response.status == 200) {
        }
      } catch (error) {}
    },
    async getFormThemeVar() {
      try {
        let response = await this.$store.dispatch("triggerGetFormThemeApi");
        if (response.status == 200) {
        }
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  overflow-x: hidden;
}
.container_header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submit-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.create-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.form_builder-title{
  font-size: 20px;
  font-weight: 700;
}
</style>
<!-- https://itnext.io/anyway-heres-how-to-create-a-multiple-layout-system-with-vue-and-vue-router-b379baa91a05 -->
