<template>
  <div>
    <ExerciseForm></ExerciseForm>
    <el-table v-loading="eLoading"
              :data="pagedExercises"
              :default-sort = "{prop: 'name', order: 'ascending'}"
              @sort-change="applySort">
      <el-table-column label="Name"
                       prop="name"
                       sortable="custom"></el-table-column>
      <el-table-column label="Completed" width="200">
        <template slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.completed"></i>
        </template>
      </el-table-column>
      <el-table-column label="Actions"
                       prop="actions"
                       width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.completed ? 'Uncomplete' : 'Complete'"
                        placement="bottom">
              <el-button type="primary"
                         :icon="scope.row.completed ? 'el-icon-close' : 'el-icon-check'"
                         size="medium"
                         @click="toggleComplete(scope.row)">
              </el-button>
            </el-tooltip>
            <el-popconfirm title="Please confirm exercise delete action"
                           confirm-button-text="Confirm"
                           confirm-button-type="danger"
                           @confirm="deleteExercise(scope.row.id)">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="medium"
                         slot="reference">
              </el-button>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
               layout="pager"
               :page-size="pageSize"
               :total="exercises.length"
               @current-change="setPage">
    </el-pagination>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import { getSortingFn } from "@/helpers/utils"
  import ExerciseForm from "@/components/ExerciseForm";

  export default {
    name: "ExerciseList",
    components: {
      ExerciseForm
    },
    data() {
      return {
        pageSize: 5,
        page: 1,
      }
    },
    computed: {
      pagedExercises() {
        const start = this.pageSize * this.page - this.pageSize;
        const end = this.pageSize * this.page;
        return this.exercises.slice(start, end);
      },
      ...mapGetters(['exercises', 'eLoading'])
    },
    mounted() {
      this.getExercises();
    },
    methods: {
      getExercises() {
        this.$store.dispatch('getExercises', { workoutId: this.$route.params.id })
          .catch((e) => {
            this.$message({
              showClose: true,
              message: e.message,
              type: 'error'
            });
          });
      },
      toggleComplete(row) {
        this.$store.dispatch('updateExercise', { id: row.id, completed: !row.completed })
          .then(() => {
            this.$message({
              showClose: true,
              message: 'Successfully updated.',
              type: 'success'
            });
            this.getExercises();
          })
          .catch((e) => {
            this.$message({
              showClose: true,
              message: e.message,
              type: 'error'
            });
          });
      },
      deleteExercise(id) {
        this.$store.dispatch('removeExercise', id)
          .then(() => {
            this.$message({
              showClose: true,
              message: 'Successfully deleted.',
              type: 'success'
            });
            this.getExercises();
          }).catch((e) => {
            this.$message({
              showClose: true,
              message: e.message,
              type: 'error'
            });
          });
      },
      setPage(page) {
        this.page = page;
      },
      applySort({ order, prop }) {
        const sortFn = getSortingFn(order, prop);
        return this.exercises.sort(sortFn);
      }
    }
  }
</script>

<style scoped>
</style>