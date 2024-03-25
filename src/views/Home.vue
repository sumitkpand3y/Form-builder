<template>
  <div class="main__wrapper">
    <el-container>
      <el-main :style="cssProps">
        <div class="wrapper--forms">
          <!-- Show empty state if empty -->

          <draggable
            :list="containerSectionList"
            class="dragArea"
            v-bind="sortElementContainerOptions"
          >
            <div
              v-for="(section, sectionIndex) in FormBuilderList"
              :key="sectionIndex"
              class="form_section form__containerItem--move"
            >
              <el-row>
                <el-col :span="11">
                  <el-input
                    class="section_input-color"
                    v-model="section.label"
                  ></el-input>
                </el-col>
                <el-dropdown
                  class="section_setting-icon"
                  type="primary"
                  trigger="click"
                  @command="handleCommand($event, section)"
                >
                  <i class="el-icon-setting"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="One"
                      >Single Column</el-dropdown-item
                    >
                    <el-dropdown-item command="Two"
                      >Two Column</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-row>
              <el-row>
                <div v-if="section.fields.length == 0" class="emptyState">
                  <span class="emptyState__emoji">╭( ✖_✖ )╮</span>

                  <p class="emptyState__p">Drag one element to get started</p>
                </div>
                <draggable
                  :list="section.fields"
                  class="dragArea"
                  v-bind="sortElementOptions"
                  @change="setColumnData(section)"
                >
                  <!-- The form elements starts (on the right) -->
                  <el-col
                    :span="section.isSingleColumn ? 23 : 11"
                    v-for="(form, index) in getFilterFields(section.fields)"
                    :key="index"
                    v-bind="form"
                    class="form__group"
                    :class="{ 'is--active': form === activeForm }"
                  >
                    <span class="form__selectedlabel">{{
                      form.fieldType
                    }}</span>

                    <div
                      class="form__actionitem--move"
                      @click="editElementProperties(form)"
                    >
                      <div class="form-field-component">
                        <label
                          class="form__label"
                          v-model="form.label"
                          v-show="form.hasOwnProperty('label')"
                          >{{ form.label }}
                          <span v-show="form.isRequired" class="label_require"
                            >*</span
                          ></label
                        >

                        <component
                          :is="form.fieldType"
                          :currentField="form"
                          class="form__field"
                        >
                        </component>
                        <el-dropdown
                          class="form_field-action-icon"
                          type="primary"
                          trigger="click"
                          @command="
                            handleActionCommand(
                              $event,
                              index,
                              form,
                              sectionIndex
                            )
                          "
                        >
                          <i class="el-icon-more"></i>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="One">
                              <i class="el-icon-plus"></i
                              >Clone</el-dropdown-item
                            >
                            <el-dropdown-item command="Two">
                              <i class="el-icon-delete"></i
                              >Delete</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>

                      <small
                        class="form__helpblock"
                        v-model="form.helpBlockText"
                        v-show="form.isHelpBlockVisible"
                        >{{ form.helpBlockText }}
                      </small>
                    </div>
                  </el-col>
                </draggable>
              </el-row>
            </div>
          </draggable>
        </div>

        <div class="wrapper--snippet">
          <pre>{{ FormBuilderList }}</pre>
        </div>
      </el-main>

      <el-aside class="wrapper--sidebar" width="450px">
        <el-tabs type="border-card" v-model="activeTabForFields">
          <el-tab-pane name="elements" label="Elements">
            <elements @setColumn="setColumn" />
          </el-tab-pane>

          <el-tab-pane name="properties" label="Properties">
            <properties
              v-show="Object.keys(activeForm).length > 0"
            ></properties>
          </el-tab-pane>

          <el-tab-pane name="designs" label="Styles">
            <theming></theming>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
import { mapState } from "vuex";

// Vue.use(VueResource);

export default {
  name: "Home",
  data() {
    return {
      sortElementOptions: FormBuilder.$data.sortElementOptions,
      sortElementContainerOptions:
        FormBuilder.$data.sortElementContainerOptions,
      setColumnItem: "",
    };
  },
  watch: {
    $route(val) {
      if (val.query.id) {
        this.formBuilderGetOneApi(val.query.id);
      }
    },
  },
  created() {
    let queryId = this.$route.query.id;
    if (queryId) {
      this.formBuilderGetOneApi(queryId);
    }
  },

  computed: {
    ...mapState({
      themingVars: (state) => state.themingVars,
      containerSectionList: (state) => state.containerSectionList,
      activeForm: (state) => state.activeForm,
      activeTabForFields: (state) => state.activeTabForFields,
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
      let sectionData = [];
      sectionData = this.containerSectionList.filter(
        (item) => item.fieldType === "Section"
      );
      return sectionData;
    },
  },
  components: FormBuilder.$options.components,

  methods: {
    async formBuilderGetOneApi(id) {
      try {
        await this.$store.dispatch("triggerGetFormBuilderFindOne", id);
      } catch (error) {
        console.log("Error on getting one data from API");
      }
    },
    getFilterFields(item) {
      let result = [];
      result = item.filter((val) => !val.isContainer);
      return result;
    },
    setColumnData(section) {
      this.handleCommand(this.setColumnItem, section);
    },
    handleCommand(item, section) {
      if (item === "One") {
        section.isSingleColumn = true;
        section.isTwoColumn = false;
      }
      if (item === "Two") {
        section.isSingleColumn = false;
        section.isTwoColumn = true;
      }
    },
    setColumn(item) {
      this.setColumnItem = item;
    },
    handleActionCommand(item, index, form, sectionIndex) {
      if (item === "One") {
        this.cloneElement(index, form, sectionIndex);
      }
      if (item === "Two") {
        this.deleteElement(index, sectionIndex);
      }
    },
    deleteElement(index, sectionIndex) {
      FormBuilder.deleteElement(index, sectionIndex);
    },

    cloneElement(index, form, sectionIndex) {
      FormBuilder.cloneElement(index, form, sectionIndex);
    },

    editElementProperties(form) {
      FormBuilder.editElementProperties(form);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main__wrapper {
  height: 100%;
}

.emptyState {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dragArea {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 200px;
  z-index: 2;
  margin-bottom: 20px;
}

.form__selectedlabel {
  display: none;
  background: lighten(black, 20%);
  padding: 3px 5px;
  color: white;
  font-size: 10px;
  position: absolute;
  top: -17px;
  right: 15px;
}

.form__group {
  padding: 10px;
  margin: 10px 10px;
  border: 2px solid transparent;
  position: relative;
  background-color: rgba(221, 221, 221, 0.2);
  border-radius: 8px;

  &.is--active {
    border-color: lighten(rgb(12, 34, 223), 40%);
  }
}
.label_require {
  color: red;
  font-size: large;
}
.form_section {
  padding: 10px;
}
.form__field {
  width: 63%;
  height: 50px;
  margin-top: 8px;
}
.section_setting-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.form_field-action-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
