import { wService } from "@/helpers/api";
import { ApiException } from "@/helpers/utils";

const state = {
  workouts: [],
  wLoading: false
};

const getters = {
  workouts(state) {
    return state.workouts;
  },
  wLoading(state) {
    return state.wLoading;
  }
};

const mutations = {
  setWorkouts(state, workouts) {
    state.workouts = workouts;
  },
  setLoading(state, loading) {
    state.wLoading = loading;
  }
};

const actions = {
  async getWorkouts({ commit }) {
    commit('setLoading', true);
    return await wService.list().then((resp) => {
      commit('setWorkouts', resp.data.workouts);
      commit('setLoading', false);
    }).catch(() => {
      commit('setLoading', false);
      throw new ApiException('Unable to get workouts.')
    });
  },
  async addWorkout(context, payload) {
    return await wService.create(payload).catch(() => {
      throw new ApiException('Unable to add workout.')
    });
  },
  async deleteWorkout(context, payload) {
    return await wService.delete(payload).catch(() => {
      throw new ApiException('Unable to delete workout.')
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}