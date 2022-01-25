import Vue from 'vue'
import Vuex from 'vuex'
import functions from "./functions";
import utils from "@/store/utils";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    selectedEventCoordinates: [],
    locationMarkers: [],
    bounds: {},

    filter: {
      sarea: 0.5,
      earea: 3,
    },

    // events data for main map
    allEvents: [],
    selectedYearEvents: [],
    selectedMonthEvents: [],

    // event data for k-top map
    allRangeEvents: [],
    originalFormattedAllRangeEvents:[],
    leftRangeEvents: [],
    rightRangeEvents: [],

    eventOfSingleMap: [],
    eventOfLeftMap: [],
    eventOfRightMap: [],
    // Used for play animation on map
    interval: null,
  },
  mutations: {

    setAllEvents (state, events){
      state.allEvents = events;
    },

    setSelectedYearEvents( state, events ){
      state.selectedYearEvents = events;
    },

    setSelectedMonthEvents( state, events) {
      state.selectedMonthEvents = events;
    },

    setAllRangeEvents( state, events){
      state.allRangeEvents = events;
    },

    setOriginalFormattedAllRangeEvents(state, events){
      state.originalFormattedAllRangeEvents = events;
    },

    setLeftRangeEvents( state, events){
      state.leftRangeEvents = events;
    },

    setRightRangeEvents( state, events){
      state.rightRangeEvents = events;
    },

    setEventOfSingleMap(state, event){
      state.eventOfSingleMap=event;
    },

    setEventOfLeftMap(state, event){
      state.eventOfLeftMap=event
    },

    setEventOfRightMap(state, event){
      state.eventOfRightMap=event
    },

    setInterval(state, callback, ms) {
      state.interval = setInterval(callback, ms);
    },
    clearInterval(state) {
      clearInterval(state.interval);
      state.interval = null;
    },

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
      state.si=s;
    },
    setArea(state, a){
      state.area=a;
    },

    setFilter(state, filter){
      state.filter = filter;
    }
    //MUTATION START
  },
  actions: {
    async getAllEvents({state, commit}){
      await functions.setFilter(state.filter)
      const events = await functions.getAllEvents();
      let allEvents = utils.formatDataForAllYears(events)
      commit('setAllEvents', allEvents)
    },

    async getSelectedYearEvents({commit}, selectedYear){
      const events = await functions.getEventsForYear(selectedYear);
      let selectedYearEvents = utils.formatDataForSelectedYear(events);
      commit('setSelectedYearEvents', selectedYearEvents)
    },

    async getSelectedMonthEvents({commit}, params) {
      const events = await functions.getEventsForMonth(params);
      let selectedMonthEvents = utils.formatDataForSelectedMonth(events)
      commit('setSelectedMonthEvents', selectedMonthEvents)
    },

    async getAllRangeEvents({commit}, params){
      params["start"]="1971-01-01"
      params["end"]="2017-12-31"
      const events = await functions.getTopEvents(params)
      commit('setOriginalFormattedAllRangeEvents', events)
      let formattedEvents = utils.formatDataForBubblePlot(events)
      commit('setAllRangeEvents', formattedEvents)
    },

    async getLeftRangeEvents({commit}, params){
      const events = await functions.getTopEvents(params)
      let formattedEvents = utils.formatDataForBubblePlot(events)
      commit('setLeftRangeEvents', formattedEvents)
    },

    async getRightRangeEvents({commit}, params){
      const events = await functions.getTopEvents(params)
      let formattedEvents = utils.formatDataForBubblePlot(events)
      commit('setRightRangeEvents', formattedEvents)
    },

    async setEventOfMap({commit}, params){
      const event = await functions.getEvent(params.id);
      commit('setEventOfLeftMap', event);
    },

    async updateFilter({commit, dispatch}, filter){
      await functions.resetFilter()
      await functions.setFilter(filter)
      commit("setFilter", filter)
      dispatch('getAllEvents')
    },

    async resetFilter({commit, dispatch}){
      await functions.resetFilter()
      commit('setFilter', {})
      dispatch('getAllEvents')
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

  },
  modules: {
  }
});

export default store;
