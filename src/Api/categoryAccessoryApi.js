import axiosClient from "./axiosClient";


const categoryAccessoryApi = {
    getAll(params){
        const url = '/categoryAccessory';
        return axiosClient.get(url,{params:params});


    },
    get(id){
        const url =`/categoryAccessory/${id}`;
        return axiosClient.get(url);
    },
    add(data){
        const url = '/categoryAccessory';
        return axiosClient.post(url,data);
    },
    update(data){
        const url =`/categoryAccessory/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id){
        const url =`/categoryAccessory/${id}`;
        return axiosClient.get(url);
    }
}

export default categoryAccessoryApi;