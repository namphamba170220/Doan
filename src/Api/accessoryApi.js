import axiosClient from "./axiosClient";

const accessoryApi = {
  getAll(params) {
    const url = "/accessory";
    return axiosClient.get(url, { params: params });
  },
  get(id) {
    const url = `/accessory/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/accessory";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/accessory/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/accessory/${id}`;
    return axiosClient.get(url);
  },
};

export default accessoryApi;
