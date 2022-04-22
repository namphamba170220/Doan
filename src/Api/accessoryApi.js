import axiosClient from "./axiosClient";

const accessoryApi = {
  getAll() {
    const url = "/accessory";
    return axiosClient.get(url);
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
    console.log(data);
    const url = `/accessory/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/accessory/${id}`;
    return axiosClient.delete(url);
  },
};

export default accessoryApi;
