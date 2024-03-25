<template>
  <div>
    <el-table :data="tableData" height="550" style="width: 100%">
      >
      <el-table-column label="Section Label" prop="label"> </el-table-column>
      <el-table-column label="Name" prop="fieldType"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handlePreview(scope.row)"
            >Preview</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Confirmation"
      :visible.sync="isDialogVisible"
      width="30%"
    >
      <span>Are you sure to delete this item</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="confirmDelete">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Preview" :visible.sync="isPreviewDialog" width="70%">
      <Preview :rowId="rowId" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPreviewDialog = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Preview from "./Preview.vue";
export default {
  components: { Preview },
  data() {
    return {
      tableData: [],
      isDialogVisible: false,
      isPreviewDialog: false,
      deleteId: "",
      rowId:"",
    };
  },
  created() {
    this.getFormBuilderList();
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ path: "/Design", query: { id: row._id } });
    },
    handlePreview(row) {
      this.rowId = row._id
      this.isPreviewDialog = true;
    },
    handleDelete(row) {
      this.deleteId = row._id;
      this.isDialogVisible = true;
    },
    confirmDelete() {
      this.getFormBuilderDelete();
      this.isDialogVisible = false;
    },

    async getFormBuilderList() {
      try {
        let response = await this.$store.dispatch(
          "triggerFormBuilderGetAllApi"
        );
        if (response.status == 200) {
          this.tableData = response.data.list;
        }
      } catch (error) {}
    },
    async getFormBuilderDelete() {
      try {
        let response = await this.$store.dispatch(
          "triggerFormBuilderDeleteApi",
          this.deleteId
        );
        if (response.status == 200) {
          this.getFormBuilderList();
        }
      } catch (error) {}
    },
  },
};
</script>
