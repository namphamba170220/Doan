import axiosClient from "./axiosClient";


const heroSliderApi = {
    getAll(params){
        const url = '/heroSliderData';
        return axiosClient.get(url,{params:params});


    },
    get(id){
        const url =`/heroSliderData/${id}`;
        return axiosClient.get(url);
    },
    add(data){
        const url = '/heroSliderData';
        return axiosClient.post(url,data);
    },
    update(data){
        const url =`/heroSliderData/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id){
        const url =`/heroSliderData/${id}`;
        return axiosClient.get(url);
    }
}

export default heroSliderApi;