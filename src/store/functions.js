import axios from 'axios';
const queryUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/query?";
const getUrl = "http://rz-vm154.gfz-potsdam.de:8080/highprecip/events/get?";
const backendEvents = "http://127.0.0.1:5000/events";
const backendFilter = "http://127.0.0.1:5000/filter";
const backendRange = "http://127.0.0.1:5000/range"
const backendTimeseries  = "http://127.0.0.1:5000/timeseries"

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
    /* old
    async setFilters(filters, type){
        // type for STARKEREIGNISSE und EXTREMEREIGNISSE
        if(type==="STRONG"){
            console.log("update filter for starkereignisse definition")
        }
        if(type==="EXTREM"){
            console.log("update filter for extremereignisse definition")
        }
        console.log(filters);
    },*/

    async setFilters(strongFilter, extremFilter){
        let params = {}
        Object.keys(strongFilter).forEach((key)=>{
            params["s"+key] = strongFilter[key]
        })
        Object.keys(extremFilter).forEach((key)=>{
            params["e"+ key] = extremFilter[key]
        })
        const{data} = await axios.get(backendFilter, {params: params})
        return data
    },

    async getAllEvents(){
        const {data} = await axios.get(backendEvents);
        return data;
    },

    async getEventsForYear(year){
        const {data} = await axios.get(backendEvents , {params: {'year': year}});
        return data;
    },

    async getEventsForMonth(params){
        const {data} = await axios.get(backendEvents , {params: params});
        return data;
    },

    async getTopEvents(params){
        const {data} = await axios.get(backendRange , {params: params});
        return data;
    },

    async getEventForMap(id){
        const {data} = await axios.get(backendTimeseries, {params: {id : id}})
        return data;
    }
}