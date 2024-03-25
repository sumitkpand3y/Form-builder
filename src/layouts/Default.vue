<template>
  <el-container>
    <el-alert
      v-if="isShowAlert"
      title="Update Successfully"
      type="success"
      description="Data has been successfully update."
      show-icon
      class="alert_snackbar"
    >
    </el-alert>
    <el-header class="container_header">
      <div class="title_header">
       <el-button
        @click="backHome"
        size="small"
        type="primary"
        icon="el-icon-s-home"
        circle
        ></el-button
      >
      <el-button
        @click="saveFormData"
        size="small"
        type="primary"
        >Save</el-button
      >
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Design" name="first">
          <Home />
        </el-tab-pane>
        <el-tab-pane label="Preview" name="second">
          <Preview />
        </el-tab-pane>
      </el-tabs>
     
    </el-header>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Home from "../views/Home.vue";
import Preview from "../views/Preview.vue";
export default {
  components: {
    Home,
    Preview,
  },
  data() {
    return {
      activeIndex: "/",
      activeName: "first",
      isShowAlert: false,
    };
  },
  watch: {},
  computed: {
    ...mapState({
      themingVars: (state) => state.themingVars,
      containerSectionList: (state) => state.containerSectionList,
    }),
  },
  created() {
    this.triggerThemeVarGetAllApi();
  },
  methods: {
    createNewForm() {
      this.$router.push({ path: "/Design" });
    },
    backHome() {
      this.$router.back()
    },
    saveFormData() {
      this.containerSectionList.forEach((obj) => {
        if (Array.isArray(obj.fields)) {
          obj.fields = obj.fields.filter((field) => !field.isContainer);
        }
      });
      let payload = this.containerSectionList;
      this.triggerFormBuilderAddApi(payload);
      let themePayload = [this.themingVars];
      this.triggerThemeVarAddApi(themePayload);
    },
    async triggerFormBuilderAddApi(payload) {
      try {
        this.isShowAlert = true;
        let response = await this.$store.dispatch(
          "triggerAddFormSectionApi",
          payload
        );
        if (response.status == 200) {
          setTimeout(() => {
            this.isShowAlert = false;
            this.$router.back();
          }, 1000);
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
        let response = await this.$store.dispatch("triggerThemeVarUpdateApi", {
          id,
          payload,
        });
        if (response.status == 200) {
        }
      } catch (error) {}
    },
    async triggerThemeVarGetAllApi() {
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
  margin-top: 20px;
  // text-align: end;
}
.title_header{
  text-align: end;
}
.alert_snackbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
}
</style>
<!-- https://itnext.io/anyway-heres-how-to-create-a-multiple-layout-system-with-vue-and-vue-router-b379baa91a05 -->
