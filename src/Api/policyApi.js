import axiosClient from "./axiosClient";


const policyApi = {
    getAll(params){
        const url = '/policy';
        return axiosClient.get(url,{params:params});
    },
    get(id){
        const url =`/policy/${id}`;
        return axiosClient.get(url);
    },
    add(data){
        const url = '/policy';
        return axiosClient.post(url,data);
    },
    update(data){
        const url =`/policy/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id){
        const url =`/policy/${id}`;
        return axiosClient.get(url);
    }
}

export default policyApi;