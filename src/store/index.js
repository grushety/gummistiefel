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
    bounds: {},
    filters:"subset=length(20,100)",
    length: "10,20",
    severity: "",
    area: "",
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
    },
    setFilters(state, filters){
      state.filters=filters;
    },
    setLength(state, l){
      state.length=l;
    },
    setSeverity(state, s){
      state.severity=s;
    },
    setArea(state, a){
      state.area=a;
    }
  },
  actions: {
    async getEvents({commit,state}){
      const events = await functions.getEvents(state.filters);
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
    },
    setFilters({commit, dispatch, state}){
      let filters = "";
      if (state.length.length) {
        filters = "subset=length(" + state.length + ")";
      }
      if (state.severity.length) {
        filters = !filters.length ? "" : filters + "&";
        filters = filters + "subset=si(" + state.severity + ")";
      }
      if (state.area.length) {
        filters = !filters.length ? "" : filters + "&";
        filters = filters + "subset=area(" + state.area + ")";
      }
      commit('setFilters', filters);
      dispatch('getEvents')
    },
    setLength({commit}, l){
      commit('setLength', l)
    },
    setSeverity({commit}, s){
      commit('setSeverity', s)
    },
    setArea({commit}, a){
      commit('setArea', a)
    }
  },
  modules: {
  }
});

export default store;
