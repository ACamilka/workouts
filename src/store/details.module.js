import { wService, eService } from "@/helpers/api";
import {ApiException} from "@/helpers/utils";

const state = {
  workout: {},
  exercises: [],
  eLoading: false
};

const getters = {
  workout(state) {
    return state.workout;
  },
  exercises(state) {
    return state.exercises;
  },
  eLoading(state) {
    return state.eLoading;
  }
};

const mutations = {
  setWorkout(state, workout) {
    state.workout = workout;
  },
  setExercises(state, exercises) {
    state.exercises = exercises;
  },
  setLoading(state, loading) {
    state.eLoading = loading;
  },
};

const actions = {
  async getWorkout({ commit }, payload) {
    return await wService.get(payload).then(resp => {
      commit('setWorkout', resp.data);
    }).catch(() => {
      throw new ApiException('Unable to get workout.')
    });

  },
  async getExercises({ state, commit }, payload) {
    commit('setLoading', true);
    payload = payload ? payload : { workoutId: state.workout.id };
    return await eService.list(payload).then(resp => {
      commit('setExercises', resp.data.exercises);
      commit('setLoading', false);
    }).catch(() => {
      commit('setLoading', false);
      throw new ApiException('Unable to get exercises.')
    });
  },
  async addExercise(context, payload) {
    await eService.create(payload).catch(() => {
      throw new ApiException('Unable to add exercise.')
    });
  },
  async updateExercise(context, { id, ...data }) {
    await eService.update(id, data).catch(() => {
      throw new ApiException('Unable to update exercise.')
    });
  },
  async removeExercise(context, payload) {
    await eService.delete(payload).catch(() => {
      throw new ApiException('Unable to delete exercise.')
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}