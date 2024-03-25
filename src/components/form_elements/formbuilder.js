import Vue from "vue";

import draggable from "vuedraggable";

import TextInput from "@/components/form_elements/FormElementTextInput";
import LongTextInput from "@/components/form_elements/FormElementLongTextInput";
import NumberInput from "@/components/form_elements/FormElementNumberInput";
import SelectList from "@/components/form_elements/FormElementSelectList";
import RadioButton from "@/components/form_elements/FormElementRadioButton";
import Checkbox from "@/components/form_elements/FormElementCheckbox";
import TimePicker from "@/components/form_elements/FormElementTimePicker";
import DatePicker from "@/components/form_elements/FormElementDatePicker";
import DatetimePicker from "@/components/form_elements/FormElementDatetimePicker";
import Rating from "@/components/form_elements/FormElementRating";
import Button from "@/components/form_elements/FormElementButton";
import TextEditor from "@/components/form_elements/FormElementTextEditor";

import Elements from "@/components/form_elements/Elements";
import Properties from "@/components/form_elements/Properties";
import Theming from "@/components/form_elements/Theming";

export const FormBuilder = new Vue({
  components: {
    Elements,
    Properties,
    Theming,
    draggable,
    TextInput,
    LongTextInput,
    NumberInput,
    SelectList,
    RadioButton,
    Checkbox,
    TimePicker,
    DatePicker,
    DatetimePicker,
    Rating,
    Button,
    TextEditor,
  },
  data() {
    return {
      fields: [
        {
          name: "TextInput",
          text: "Text",
          group: "form", //form group
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: true,
          isUnique: false,
        },
        {
          name: "LongTextInput",
          text: "Long Text",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: true,
          isUnique: false,
        },
        {
          name: "NumberInput",
          text: "Number",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "SelectList",
          text: "Select",
          group: "form",
          hasOptions: true,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "RadioButton",
          text: "Radio",
          group: "form",
          hasOptions: true,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "Checkbox",
          text: "Checkbox",
          group: "form",
          hasOptions: true,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "TimePicker",
          text: "Time Picker",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "DatePicker",
          text: "Date Picker",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "DatetimePicker",
          text: "Date-Time Picker",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "Rating",
          text: "Rating",
          group: "form",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
        {
          name: "Button",
          text: "Button",
          group: "button",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: true,
        },
        {
          name: "TextEditor",
          text: "Text editor",
          group: "static",
          hasOptions: false,
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: false,
          isUnique: false,
        },
      ],
      containers: [
        {
          name: "Section",
          text: "Section",
          group: "container",
          isUnique: false,
          fields: [],
        },
        {
          name: "SingleColumn",
          text: "Single Column",
          group: "container",
          isUnique: false,
        },
        {
          name: "TwoColumn",
          text: "Two Column",
          group: "container",
          isUnique: false,
        },
      ],

      sortElementOptions: {
        group: { name: "formbuilder", pull: false, put: true },
        sort: true,
        handle: ".form__actionitem--move",
      },

      dropElementOptions: {
        group: { name: "formbuilder", pull: "clone", put: false },
        sort: false,
        ghostClass: "sortable__ghost",
        filter: ".is-disabled",
      },
      dropElementContainerOptions: {
        group: { name: "container", pull: "clone", put: false },
        sort: false,
        ghostClass: "sortable__ghost",
        filter: ".is-disabled",
      },
      sortElementContainerOptions: {
        group: { name: "container", pull: false, put: true },
        sort: true,
        handle: ".form__containerItem--move",
      },
    };
  },
  methods: {
    deleteElement(index, containerIndex) {
      vm.$store.state.activeForm = [];
      vm.$store.state.activeTabForFields = "elements";
      this.$delete(
        vm.$store.state.containerSectionList[containerIndex].fields,
        index
      );
    },

    cloneElement(index, form, containerIndex) {
      var cloned = _.cloneDeep(form); // clone deep lodash
      vm.$store.state.containerSectionList[containerIndex].fields.splice(index, 0, cloned);
    },

    editElementProperties(form) {
      vm.$store.state.activeForm = form;
      vm.$store.state.activeTabForFields = "properties";
    },
  },
});
