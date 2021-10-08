<template>
  <div>
    <h2>Workout {{ workout.name }}</h2>
    <ExerciseList></ExerciseList>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import ExerciseList from "@/components/ExerciseList";

  export default {
    name: "Workout",
    components: {
      ExerciseList
    },
    mounted() {
      this.getWorkout();
    },
    computed: {
      ...mapGetters(['workout'])
    },
    methods: {
      getWorkout() {
        this.$store.dispatch('getWorkout', this.$route.params.id)
          .catch((e) => {
            this.$message({
              showClose: true,
              message: e.message,
              type: 'error'
            });
            this.$router.push({ path: '/workouts'});
          })
      },
    }
  }
</script>

<style scoped>

</style>