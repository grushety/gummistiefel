import Vue from 'vue'
import Vuex from 'vuex'
import functions from "./functions";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    events: [],
    selectedEvent: [],
    selectedEventCoordinates: [],
    params: {
      subset: "length(20,100)"
    },
    locationMarkers: [],
    bounds: {}
  },
  mutations: {
    setEvents(state, events){
      state.events = events;
    },
    setSelectedEvent(state, event){
      state.selectedEvent = event;
    },
    setLocationMarkers(state, points){
      state.locationMarkers = points;
    },
    setBounds(state, bounds){
      state.bounds = bounds;
    }
  },
  actions: {
    async getEvents({commit,state}){
      const events = await functions.getEvents(state.params);
      commit('setEvents', events)
    },
    async getEvent({commit, dispatch}, id){
      const event = await functions.getEvent(id);
      commit('setSelectedEvent', event);
      dispatch('getLocationMarkers');
    },
    getLocationMarkers({state, commit}){
      let arr = state.selectedEvent.timeseries;
      let points = [];
      let lat = [];
      let lon = [];
      arr.forEach(item => {
        points.push({position: {lat: item.lat, lng: item.lon}})
        lat.push(item.lat);
        lon.push(item.lon);
      });
      let bounds = {west: Math.max(...lat), east:  Math.min(...lat), north: Math.max(...lon), south: Math.min(...lon) };
      commit('setLocationMarkers', points);
      commit('setBounds', bounds);
    }
  },
  modules: {
  }
});

export default store;
