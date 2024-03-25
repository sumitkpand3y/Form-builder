import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    forms: [],
    containerSectionList: [
      {
        fieldType: "Section",
        isUnique: false,
        label: "",
        isSingleColumn: false,
        isTwoColumn: true,
        fields: [],
        isContainer: true,
      },
    ],
    copyContainer: [
      {
        fieldType: "Section",
        isUnique: false,
        label: "",
        isSingleColumn: false,
        isTwoColumn: true,
        fields: [],
        isContainer: true,
      },
    ],
    collectionName: "formBuilder",
    baseUrl: "https://generic-api-fgfd.onrender.com/v1/",
    activeForm: [],
    activeTabForFields: "elements",
    themingVars: {},
    duplicateThemingVars: {
      globalFontFamily: "Arial",
      globalFontColor: "#777777",
      globalLinkColor: "#206C92",
      globalFontSize: "16",
      globalAlignment: "flex",
      globalTextAlignment: "start",

      labelFontWeight: "500",
      labelFontSize: "13",
      labelMarginBottom: "10",

      helpTextColor: "#cccccc",
      helpTextFontSize: "10",
      helpTextMarginTop: "2",

      inputBorderRadius: "4",
      inputBorderColor: "#dcdfe6",
      inputHoverBorderColor: "#c0c4cc",
      inputFocusBorderColor: "#000000",
      inputShadowColor: "#9D9D9D",

      sectionBorderRadius: "4",
      sectionBorderStyle: "solid",
      sectionBorderColor: "#3f3e3e",
      sectionHoverBorderColor: "#c0c4cc",
      sectionFocusBorderColor: "#000000",
      sectionShadowColor: "#9D9D9D",
      sectionMargin: "20",

      buttonBackground: "#000000",
      buttonBorderColor: "#000000",
      buttonColor: "#FFFFFF",
    },
  },
  mutations: {
    SET_THEME_VAR(state, data) {
      state.themingVars = data;
    },
    SET_CONTAINER_ITEM(state, data) {
      state.containerSectionList = data;
    },
  },
  actions: {
    async triggerAddFormSectionApi({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `addOne/form-Builder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerThemeVarAddApi({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `addOne/form-Theme`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerThemeVarUpdateApi({ commit }, { id, payload }) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `updateOne/form-Theme/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerSetCurrentData({ commit }) {
     commit("SET_CONTAINER_ITEM", this.state.copyContainer);
    },

    async triggerFormBuilderGetAllApi({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `getAll/form-Builder`, { method: "POST" })
            .then((response) => response.json())
            .then((data) => {
              commit("SET_CONTAINER_ITEM", this.state.copyContainer);
              resolve(data);
            })
            .catch((error) => {
              // commit("SET_CONTAINER_ITEM", this.state.copyContainer);
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerGetFormThemeApi({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `getAll/form-Theme`, { method: "POST" })
            .then((response) => response.json())
            .then((data) => {
              commit(
                "SET_THEME_VAR",
                data.data.list.length
                  ? data.data.list[0]
                  : this.state.duplicateThemingVars
              );
            })
            .catch((error) => {
              commit("SET_THEME_VAR", this.state.duplicateThemingVars);
              console.error("Error fetching data:", error);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerFormBuilderDeleteApi({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `deleteOne/form-Builder/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    async triggerGetFormBuilderFindOne({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          fetch(this.state.baseUrl + `getOne/form-Builder/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              commit("SET_CONTAINER_ITEM", [data.data]);
              resolve(data);
            })
            .catch((error) => {
              reject(new Error("Failed!"));
            });
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
