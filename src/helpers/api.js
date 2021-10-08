import Vue from 'vue'

class ApiService {
  constructor(resource) {
    this.baseUrl = `/api/${resource}`;
  }
  request(method, url, data) {
    return Vue.axios[method](url, data)
      .catch(() => {
        throw new Error('Api error');
      });
  }
  list(params) {
    params = { params: params };
    return this.request('get', this.baseUrl, params);
  }
  get(id) {
    return this.request('get', this.baseUrl + `/${id}`);
  }
  create(data) {
    return this.request('post', this.baseUrl, data);
  }
  update(id, data) {
    return this.request('patch', this.baseUrl + `/${id}`, data);
  }
  delete(id) {
    return this.request('delete',this.baseUrl + `/${id}`);
  }
}

export const wService = new ApiService('workouts');
export const eService = new ApiService('exercises');
