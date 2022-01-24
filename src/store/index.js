import Vue from 'vue'
import Vuex from 'vuex'
import functions from "./functions";
import utils from "@/utils";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    // for DEMO
    events: [],
    selectedEvent: [],
    selectedEventCoordinates: [],
    params: {
      subset: "length(20,100)"
    },
    locationMarkers: [],
    bounds: {},
    filters:"subset=length(20,100)",
    length: "20,100",
    severity: "",
    area: "",
    //for DEMO

    //START
    strongEventsFilter : {prec: 10},
    extremEventsFilter: {si: 0.2, area: 3, length: 10},

    // events data for main map
    allEvents: [],
    selectedYearEvents: [],
    selectedMonthEvents: [],

    // event data for ktop map
    allRangeEvents: [],
    originalFormattedAllRangeEvents:[],
    leftRangeEvents: [],
    rightRangeEvents: [],

    // Used for play animation on map
    interval: null,
  },
  mutations: {
    setStrongEventsFilter(state, filter){
      this.state.strongEventsFilter = filter;
      functions.setFilters(this.state.strongEventsFilter, this.state.extremEventsFilter).then(data => {
        console.log(data)
      });
    },

    setExtremEventsFilter(state, filter){
      this.state.extremEventsFilter = filter;
      functions.setFilters(this.state.strongEventsFilter, this.state.extremEventsFilter).then(data => {
        console.log(data)
      });
    },

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

    /////////////////////////////////////////////
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
    //MUTATION START
  },
  actions: {
    async getAllEvents({commit}){
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

    //////////////////////////////////////////////////////////////////
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

    /* obsolete
    setFilters({commit, dispatch, state}){
      let filters = "";
      if (state.length.length) {
        filters = "subset=length(" + state.length + ")";
      }
      if (state.si.length) {
        filters = !filters.length ? "" : filters + "&";
        filters = filters + "subset=si(" + state.si + ")";
      }
      if (state.area.length) {
        filters = !filters.length ? "" : filters + "&";
        filters = filters + "subset=area(" + state.area + ")";
      }
      commit('setFilters', filters);
      dispatch('getEvents')
    },*/

    setLength({commit}, l){
      commit('setLength', l)
    },
    setSeverity({commit}, s){
      commit('setSeverity', s)
    },
    setArea({commit}, a){
      commit('setArea', a)
    },

    //START
    updateStrongEventsFilters({commit}, filters){
      commit('setStrongEventsFilter', filters);
    },
    updateExtremEventsFilters({commit}, filters){
      commit('setExtremEventsFilter', filters)
    }
  },
  modules: {
  }
});

export default store;
