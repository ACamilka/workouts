<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(breadcrumb, idx) in breadcrumbList"
                        :to="{ name: breadcrumb.name }"
                        :key="idx">
      {{ breadcrumb.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {
    name: "Breadcrumb",
    data() {
      return {
        breadcrumbList: []
      }
    },
    mounted() {
      this.update();
    },
    computed: {
      ...mapGetters({ currentWorkout: 'workout' })
    },
    watch: {
      '$route': 'update',
      'currentWorkout': 'update'
    },
    methods: {
      update() {
        const route = this.$route;
        this.breadcrumbList = route.matched.reduce((dest, src) => {
          const meta = src.meta;
          if (meta && meta.breadcrumb && meta.breadcrumb.title) {
            let title = meta.breadcrumb.title;
            if (title instanceof Function) {
              title = title(this.currentWorkout)
            }
            dest.push({
              title: title,
              name: src.name,
            });
          }
          return dest;
        }, []);
      }
    }
  }
</script>

<style scoped>

</style>