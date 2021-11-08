import axios from 'axios';
const queryUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/query?";
const getUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/get?";

//const params = new URLSearchParams();

export default {
    async getEvents(params){
        console.log(queryUrl+params)
        const {data} = await axios.get(queryUrl+params);
        return data;
    },

    async getEvent(id){
        console.log(id);
        const {data} = await axios.get(getUrl + "id=" + id);
        return data;
    },
}