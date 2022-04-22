import axiosClient from "./axiosClient";

// http://localhost:3004/user?email=phambanamhaui@gmail.com&password=asds

const userApi = {
  getAll(params) {
    const url = "/user";
    return axiosClient.get(url, { params: params });
  },
  get(id) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/user";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/user/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/user/${id}`;
    return axiosClient.delete(url);
  },
  login(email, password) {
    const url = `/user?email=${email}&password=${password}`;
    return axiosClient.get(url);
  },
  register(email, password, fullName) {
    const url = `/user`;
    return axiosClient.post(url, { email, password, fullName });
  },
};

export default userApi;
