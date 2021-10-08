<template>
  <div>
    <el-button type="primary"
               icon="el-icon-circle-plus"
               @click="formVisible = true"
               style="float: right;">Add Exercise</el-button>
    <el-dialog title="New Exercise"
               :visible.sync="formVisible"
               :close-on-click-modal="false">
      <el-form :model="exerciseForm" ref="exerciseForm">
        <el-form-item label="Name"
                      prop="name"
                      :rules="[{ required: true, message: 'name is required' }]">
          <el-input v-model="exerciseForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" lass="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary"
                   @click="add"
                   v-loading="pending"
                   :disabled="exerciseForm.name === ''">Add</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ExerciseForm",
    data() {
      return {
        pending: false,
        formVisible: false,
        exerciseForm: { id: '', name: '', workoutId: '' }
      }
    },
    created() {
      this.initForm();
    },
    methods: {
      initForm() {
        this.exerciseForm.id = this.$uuid.v4();
        this.exerciseForm.name = '';
        this.exerciseForm.workoutId = this.$route.params.id;
      },
      add() {
        this.$refs['exerciseForm'].validate((valid) => {
          if (valid) {
            this.pending = true;
            this.$store.dispatch('addExercise', this.exerciseForm)
            .then(() => {
              const data = { workoutId: this.exerciseForm.workoutId };
              this.$message({
                showClose: true,
                message: 'Successfully added exercise.',
                type: 'success'
              });
              return this.$store.dispatch('getExercises', data);
            }).catch((e) => {
              this.$message({
                showClose: true,
                message: e.message,
                type: 'error'
              });
            }).finally(() => {
              this.pending = false;
              this.reset();
            });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.reset();
      },
      reset() {
        this.formVisible = false;
        this.$refs['exerciseForm'].resetFields();
        this.initForm();
      }
    }
  }
</script>

<style scoped>

</style>