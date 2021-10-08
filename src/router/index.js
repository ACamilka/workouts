import Vue from 'vue';
import VueRouter from 'vue-router';

import Container from "@/components/Container";
import WorkoutList from "@/views/WorkoutList";
import WorkoutDetails from "@/views/WorkoutDetails";

Vue.use(VueRouter);

const routes = [
  { path: '/',
    name: 'container',
    component: Container,
    redirect: '/workouts',
    meta: { breadcrumb: { title: 'Workouts' } },
    children: [
      { path: 'workouts',
        name: 'workouts',
        component: WorkoutList },
      { path: 'workouts/:id',
        name: 'workout',
        component: WorkoutDetails,
        meta: { breadcrumb: { title: ({ name }) => `${name}` } } },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;