import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import storeWorkouts from "@/store/list.module";

jest.mock("@/helpers/api", () => {
  return {
    wService: {
      list: () => Promise.resolve({
        data: {
          workouts: [
            {
              id: 'b0134e7c-1740-4dd5-8cea-1aa6f4574ab7',
              name: 'test workout 1'
            },
            {
              id: 'dc50809f-d8f2-4967-90e1-730924678fb3',
              name: 'test workout 2'
            }
          ]
        }
      }),
    }
  }
});

describe('workout list store', () => {

  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it('should retrieve workout list and change loading state', async () => {
    const store = new Vuex.Store(storeWorkouts);
    expect(store.getters.wLoading).toBe(false);
    const promise = store.dispatch('getWorkouts');
    expect(store.getters.wLoading).toBe(true);
    await promise;
    expect(store.getters.wLoading).toBe(false);
    expect(store.getters.workouts.length).toBe(2);
  });
});