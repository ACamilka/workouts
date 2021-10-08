import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import ElementUI from "element-ui";

import router from "@/router";
import Breadcrumb from "@/components/Breadcrumb";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

describe('Breadcrumb', () => {

  let getters;
  let store;
  const workout = {
    id: "a461e9bc-6fa4-4eae-be0d-c52c1fc7fa43",
    name: 'test workout'
  };

  beforeEach(() => {
    getters = {
      workout: () => workout
    };
    store = new Vuex.Store({ getters });
  });

  it('should display workout details breadcrumb', () => {
    router.push({ name: 'workout', params: { id: workout.id }});
    const wrapper = shallowMount(Breadcrumb, { store, localVue, router, });
    expect(wrapper.vm.breadcrumbList.length).toBe(2);
    expect(wrapper.vm.breadcrumbList).toMatchSnapshot();
  });

});