import axios from 'axios';
const queryUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/query?";
const getUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/get?";

//const params = new URLSearchParams();

export default {
    async getEvents(params){
        const {data} = await axios.get(queryUrl+params);
        return data;
    },

    async getEvent(id){
        const {data} = await axios.get(getUrl + "id=" + id);
        return data;
    },
    async setFilters(filters, type){
        // type for STARKEREIGNISSE und EXTREMEREIGNISSE
        if(type==="STRONG"){
            console.log("update filter for starkereignisse definition")
        }
        if(type==="EXTREM"){
            console.log("update filter for extremereignisse definition")
        }
        console.log(filters);
    }
}