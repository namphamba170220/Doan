import axiosClient from "./axiosClient";

const versionApi = {
  getAll(params) {
    const url = "/versions";
    return axiosClient.get(url, { params: params });
  },
  get(id) {
    const url = `/versions/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/versions";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/versions/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/versions/${id}`;
    return axiosClient.delete(url);
  },
};

export default versionApi;
