<template>
  <div class="el-tabs__inner">
    <el-row :gutter="10" class="row-bg">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="Form Elements" name="1">
          <draggable
            :list="fields"
            :clone="clone"
            class="dragArea"
            v-bind="dropElementOptions"
          >
            <el-col
              :span="12"
              :class="{ 'is-disabled': checkStopDragCondition(field) }"
              v-for="(field, index) in fields"
              :key="index"
            >
              <el-button class="button__sidebar" type="info">
                {{ field.text }}
              </el-button>
            </el-col>
          </draggable>
        </el-collapse-item>
        <el-collapse-item title="Containers" name="2">
          <draggable
            :list="containersFiels"
            :clone="cloneSection"
            class="dragAreaSecond"
            v-bind="dropElementContainerOptions"
          >
            <el-col
              :span="12"
              :class="{ 'is-disabled': checkStopDragCondition(field) }"
              v-for="(field, index) in containersFiels"
              :key="index"
            >
              <el-button class="button__sidebar" type="info">
                {{ field.text }}
              </el-button>
            </el-col>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
import draggable from "vuedraggable";
import { mapState} from "vuex";

export default {
  name: "Elements",
  components: { draggable },
  data() {
    return {
      activeNames: ["1"],
      fields: FormBuilder.$data.fields,
      containersFiels: FormBuilder.$data.containers,
      dropElementOptions: FormBuilder.$data.dropElementOptions,
      dropElementContainerOptions:
        FormBuilder.$data.dropElementContainerOptions,
    };
  },
  computed: {
    ...mapState({
      forms: (state) => state.forms,
    }),
  },
  methods: {
    clone(field) {
      let newField = {
        fieldType: field.name,
        isUnique: field.isUnique,
        isContainer: false,
      };

      // Show placeholder
      if (field.isPlaceholderVisible) {
        newField["isPlaceholderVisible"] = false;
        newField["placeholder"] = "Input your text here...";
      }

      // Decide whether display label, required field, helpblock
      if (field.group == "form") {
        newField["label"] = "Enter label";
        newField["isHelpBlockVisible"] = false;
        newField["helpBlockText"] = "Please input your helpblock here...";
        newField["isRequired"] = false;
      }

      if (field.group == "button") {
        newField["buttonText"] = "Submit your form";
      }

      if (field.name == "TextEditor") {
        newField["fieldText"] = "Start typing...";
      }

      // Add dummy options for loading the radio/checkbox
      if (field.hasOptions) {
        newField["options"] = [
          { optionLabel: "Option 1", optionValue: "Option 1" },
          { optionLabel: "Option 2", optionValue: "Option 2" },
        ];
      }
      return newField;
    },
    cloneSection(field) {
      let containerNewField = {
          fieldType: field.name,
          isUnique: field.isUnique,
          isContainer: true,
      };
      if (field.name === "Section") {
        containerNewField["label"] = "";
        containerNewField["fields"] = [];
        containerNewField["isSingleColumn"] = false;
        containerNewField["isTwoColumn"] = true;
      }
      if (field.name === "SingleColumn") {
        this.$emit("setColumn", "One")
      }
      if (field.name === "TwoColumn") {
        this.$emit("setColumn", "Two")
      }
       return containerNewField;
    },
    checkStopDragCondition(field) {
      var form = this.forms,
        formArray = [];

      for (var key in form) {
        formArray.push([...formArray, form[key]["fieldType"]]);
      }

      // Check if the fieldname exist in formArray
      // And when the field.isUnique too
      return _.includes(formArray, field.name) && field.isUnique;
    },
  },
};
</script>

<style lang="scss" scoped>
.button__sidebar {
  width: 100%;
  margin-bottom: 10px;

  .is-disabled & {
    opacity: 0.4;
  }
}

// Display this ghost in <main> only
.wrapper--forms .sortable__ghost {
  position: relative;
  width: 100%;
  border-bottom: 2px solid black;
  margin-top: 2px;
  margin-bottom: 2px;

  [type="button"] {
    display: none;
  }

  &:before {
    content: "Drag it here";
    background-color: black;
    color: white;
    position: absolute;
    left: 50%;
    font-size: 10px;
    border-radius: 10px;
    line-height: 15px;
    padding: 0 10px;
    top: -6px;
    transform: translateX(-50%);
  }
}
</style>
