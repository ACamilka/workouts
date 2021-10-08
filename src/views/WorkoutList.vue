<template>
  <div>
    <h2>Workouts</h2>
    <el-row>
      <el-col :span="6">
        <el-input v-model="search" placeholder="Search"></el-input>
      </el-col>
      <el-col :span="12" :offset="6">
        <WorkoutForm></WorkoutForm>
      </el-col>
    </el-row>
    <el-table v-loading="wLoading"
              :data="pagedWorkouts"
              :default-sort = "{prop: 'name', order: 'ascending'}"
              @sort-change="applySort">
      <el-table-column label="Name"
                       prop="name"
                       sortable="custom">
        <template slot-scope="scope">
          <router-link :to="{ name: 'workout', params: { id: scope.row.id} }" exact>
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Completed" width="200">
        <template slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.completed"></i>
        </template>
      </el-table-column>
      <el-table-column label="Actions"
                       prop="actions"
                       width="200">
        <template slot-scope="scope">
          <el-popconfirm title="Please confirm workflow delete action"
                         confirm-button-text="Confirm"
                         confirm-button-type="danger"
                         hide-icon="true"
                         @confirm="deleteWorkout(scope.row.id)">
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="medium"
                       slot="reference">
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-row :span="12">
      <el-pagination background
                     layout="pager"
                     :page-size="pageSize"
                     :total="filteredWorkouts.length"
                     @current-change="setPage">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>

  import { mapGetters } from "vuex";
  import { getSortingFn } from "@/helpers/utils"
  import WorkoutForm from "@/components/WorkoutForm";

  export default {
    name: "WorkoutList",
    components: {
      WorkoutForm,
    },
    data() {
      return {
        pageSize: 5,
        page: 1,
        search: ""
      }
    },
    computed: {
      filteredWorkouts() {
        const search = this.search.toLowerCase();
        return this.workouts.filter(workout => {
          return !search || workout.name.toLowerCase().includes(search);
        })
      },
      pagedWorkouts() {
        const start = this.pageSize * this.page - this.pageSize;
        const end = this.pageSize * this.page;
        return this.filteredWorkouts.slice(start, end);
      },
      ...mapGetters(['workouts', 'wLoading'])
    },
    mounted() {
      this.getWorkouts();
    },
    methods: {
      getWorkouts() {
        this.$store.dispatch('getWorkouts')
          .catch((e) => {
            this.$message({
              showClose: true,
              message: e.message,
              type: 'error'
            });
          });
      },
      deleteWorkout(id) {
        this.$store.dispatch('deleteWorkout', id)
        .then(() => {
          this.$message({
            message: 'Successfully deleted.',
            type: 'success'
          });
          this.getWorkouts();
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
        return this.workouts.sort(sortFn);
      }
    }
  }
</script>

<style scoped>
  a, a:visited {
    color: #606266;
  }
</style>