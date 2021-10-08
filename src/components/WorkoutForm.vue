<template>
  <div>
    <el-button type="primary"
               icon="el-icon-circle-plus"
               @click="formVisible = true"
               style="float: right;">Add Workout</el-button>
    <el-dialog title="New Workout"
               :visible.sync="formVisible"
               :close-on-click-modal="false">
      <el-form :model="workoutForm"
               ref="workoutForm"
               @validate="validate">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Workout">
            <el-form-item label="Name"
                          prop="name"
                          :rules="[{ required: true, message: 'Name is required' }]">
            <el-input v-model="workoutForm.name" ref="name"></el-input>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="Exercises">
            <el-form-item v-for="(exercise, index) in workoutForm.exercises"
                          :label="'Exercise ' + (index + 1)"
                          :key="exercise.key"
                          :prop="'exercises.' + index + '.name'"
                          :rules="[{ required: true, message: 'Exercise is required' }]">
              <el-input v-model="exercise.name">
                <i class="el-icon-minus el-input-icon"
                   @click="remove(exercise)"
                   slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-plus" @click="add" align="left"></el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <span slot="footer" lass="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary"
                   v-loading="pending"
                   @click="save"
                   :disabled="formInvalid">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "WorkoutForm",
    data() {
      return {
        activeTab: '0',
        pending: false,
        formVisible: false,
        formInvalid: true,
        invalidFields: new Set(),
        workoutForm: { id: '', name: '', exercises: [] }
      }
    },
    created() {
      this.initForm();
    },
    methods: {
      initForm() {
        this.workoutForm.id = this.$uuid.v4();
        this.workoutForm.name = '';
        this.workoutForm.exercises = [];

        this.activeTab = '0';
        this.calcFormInvalid('name', false);
      },
      save() {
        this.$refs['workoutForm'].validate((valid) => {
          if (valid) {
            this.pending = true;
            this.$store.dispatch('addWorkout', this.workoutForm)
              .then(() => {
                this.$message({
                  showClose: true,
                  message: 'Successfully added workout.',
                  type: 'success'
                });
              })
              .then(() => this.$store.dispatch('getWorkouts'))
              .catch((e) => {
                this.$message({
                  showClose: true,
                  message: e.message,
                  type: 'error'
                });
              })
              .finally(() => {
                this.pending = false;
                this.reset();
              });
          } else {
            return false;
          }
        });
      },
      add() {
        const exercises = this.workoutForm.exercises;
        const prop = 'exercises.' + exercises.length + '.name';
        exercises.push({ name: '', id: this.$uuid.v4() });
        this.calcFormInvalid(prop, false);
      },
      remove(exercise) {
        const index = this.workoutForm.exercises
          .findIndex((ex) => ex.id === exercise.id);
        const prop = 'exercises.' + index + '.name';
        this.workoutForm.exercises.splice(index, 1);
        this.calcFormInvalid(prop, true);
      },
      validate(prop, valid) {
        this.calcFormInvalid(prop, valid);
      },
      calcFormInvalid(prop, valid) {
        if (!valid) {
          this.invalidFields.add(prop);
        } else{
          this.invalidFields.delete(prop);
        }
        this.formInvalid = this.invalidFields.size !== 0;
      },
      cancel() {
        this.reset();
      },
      reset() {
        this.formVisible = false;
        this.$refs['workoutForm'].resetFields();
        this.initForm();
      }
    }
  }
</script>

<style scoped>

</style>