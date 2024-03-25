<template>
  <div class="main__wrapper">
    <el-container>
      <el-main :style="cssProps">
        <div class="dragArea wrapper--forms">
          <div
            v-for="(section, sectionIndex) in FormBuilderList"
            :key="sectionIndex"
            class="form_section"
          >
            <el-row v-if="section.label">
              <el-col :span="24">
                <span>{{ section.label }}</span>
              </el-col>
            </el-row>
            <div class="">
              <el-row>
                <div>
                  <el-col
                    :span="section.isSingleColumn ? 23 : 11"
                    v-for="(form, index) in getFilterFields(section.fields)"
                    :key="index"
                    v-bind="form"
                    class="form__group"
                  >
                    <div class="form-field-component">
                      <label
                        class="form__label"
                        v-model="form.label"
                        v-show="form.hasOwnProperty('label')"
                        >{{ form.label }} <span v-show="form.isRequired" class="label_require"
                            >*</span
                          ></label
                      >

                      <component
                        :is="form.fieldType"
                        :currentField="form"
                        class="form__field"
                      >
                      </component>
                    </div>

                    <small
                      class="form__helpblock"
                      v-model="form.helpBlockText"
                      v-show="form.isHelpBlockVisible"
                    >
                      {{ form.helpBlockText }}
                    </small>
                  </el-col>
                </div>
              </el-row>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
import { mapState } from "vuex";
export default {
  name: "Publish",
  components: FormBuilder.$options.components,
  props: ["rowId"],
  computed: {
    ...mapState({
      forms: (state) => state.forms,
      themingVars: (state) => state.themingVars,
      containerSectionList: (state) => state.containerSectionList,
    }),
    cssProps() {
      // Return an object that will generate css properties key
      // to match with the themingVars
      //
      // Example output: { '--theme-primary-color': this.themingVars.primaryColor }
      var result = {},
        themingVars = this.themingVars;

      for (var v in themingVars) {
        if (themingVars.hasOwnProperty(v)) {
          var newV = "--theme-" + _.kebabCase(v),
            suffix = "";

          // Add px to the value if the default value contain 'px'
          if (_.includes(newV, "size")) suffix = "px";
          else if (_.includes(newV, "margin")) suffix = "px";
          else if (_.includes(newV, "radius")) suffix = "px";

          result[newV] = themingVars[v] + suffix;
        }
      }

      return result;
    },
    FormBuilderList() {
      let data = [];
      data = this.containerSectionList.filter(
        (item) => item.fieldType === "Section"
      );
      return data;
    },
  },
  watch: {
    rowId(val) {
      if (val) {
        this.formBuilderGetOneApi(val);
      }
    },
  },
  created() {
    if (this.rowId) {
      this.formBuilderGetOneApi(this.rowId);
    }
  },
  methods: {
    async formBuilderGetOneApi(id) {
      try {
        await this.$store.dispatch("triggerGetFormBuilderFindOne", id);
      } catch (error) {
        console.log(error);
      }
    },
    getFilterFields(item) {
      let result = [];
      result = item.filter((val) => !val.isContainer);
      return result;
    },
  },
};
</script>
<style scoped>
.form_section {
  padding: 10px;
}
.dragArea {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 200px;
  z-index: 2;
}
.form__field {
  width: 63%;
  height: 50px;
  margin-top: 8px;
}
.form__group {
  padding: 10px;
  margin: 10px 10px;
  border: 2px solid transparent;
  position: relative;
  background-color: rgba(221, 221, 221, 0.2);
  border-radius: 8px;
}
.label_require {
  color: red;
  font-size: large;
}
</style>
