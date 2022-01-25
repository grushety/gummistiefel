import axios from 'axios';
const backend = "http://127.0.0.1:5000/"

//const params = new URLSearchParams();

export default {
    async setFilter(filter){
        await axios.get(backend + "filter", {params: filter})
        return "ok"
    },

    async resetFilter(){
        let zeroFilter = {ssi:0, esi:0, sprec:0, eprec:0, slength:0, elength:0, sarea:0, earea:0}
        await axios.get( backend + "filter", {params: zeroFilter})
        return "ok"
    },

    async getAllEvents(){
        const {data} = await axios.get(backend + "events");
        return data;
    },

    async getEventsForYear(year){
        const {data} = await axios.get(backend + "events", {params: {'year': year}});
        return data;
    },

    async getEventsForMonth(params){
        const {data} = await axios.get(backend + "events", {params: params});
        return data;
    },

    async getTopEvents(params){
        const {data} = await axios.get(backend + "range" , {params: params});
        return data;
    },

    async getEventForMap(id){
        const {data} = await axios.get(backend + "timeseries", {params: {id : id}})
        return data;
    }
}