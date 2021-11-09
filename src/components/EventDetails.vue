<template>
    <div class="EventDetails">
        <h1>Event Details</h1>
        <div class="tabPanel">
            <router-link class="backLink" style="text-decoration: none; color: inherit;"
                         :to="{name: 'Events'}">back</router-link>
            <p class="tab" :class="showTable? 'selected': ''" @click="setShowTable">All data</p>
            <p class="tab" :class="showMap? 'selected': ''" @click="setShowMap">Map</p>
            <p class="tab" :class="showGraphs? 'selected': ''" @click="setShowGraphs">Graphs</p>
        </div>
        <div class="showTable" v-if="showTable">
            <div class="eventBox">
                <table id="firstTable">
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>Area</th>
                        <th class="small">Duration</th>
                        <th class="small">Severity</th>
                        <th>Zeit</th>
                        <th class="mid">Latitude</th>
                        <th class="mid">Longitude</th>
                        <th class="mid">Max Lat</th>
                        <th class="mid">Max Lon</th>
                        <th class="mid">Max Precision</th>
                        <th class="mid">Min Precision</th>
                        <th class="mid">Stdv</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="timeserie in selectedEvent.timeseries" :key="timeserie.id" class="event"
                        @click=moveToEventPage(timeserie.id)>
                        <td>{{timeserie.index}}</td>
                        <td>{{timeserie.area}}</td>
                        <td class="small">{{timeserie.size}}</td>
                        <td class="small"> {{timeserie.si}}</td>
                        <td class="mid">{{timeserie.date}},</td>
                        <td class="mid">{{timeserie.lat}}</td>
                        <td class="mid">{{timeserie.lon}}</td>
                        <td class="mid">{{timeserie.latMax}}</td>
                        <td class="mid">{{timeserie.lonMax}}</td>
                        <td class="mid">{{timeserie.maxPrec}}</td>
                        <td class="mid">{{timeserie.meanPre}}</td>
                        <td class="mid">{{timeserie.stdv}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="showMap" v-if="showMap">
            <EventMap :items="locationMarkers" :bounds="bounds"/>
        </div>

        <div class="showGraphs" v-if="showGraphs">
            <DetailsGraph :events="selectedEvent.timeseries" ></DetailsGraph>
        </div>
    </div>
</template>

<script>
    import store from "../store";
    import {mapState} from "vuex";
    import EventMap from "./EventMap"
    import DetailsGraph from "./DetailsGraph"

    export default {
        name: "EventDetails",
        components: {
            EventMap,
            DetailsGraph,
        },
        data() {
            return {
                showTable: true,
                showMap: false,
                showGraphs: false,
            }
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch("getEvent", to.params.id);
            next();
        },
        computed: {
            ...mapState(["selectedEvent", "locationMarkers", "bounds"])
        },
        methods: {
            setShowTable(){
                this.showTable = true;
                this.showMap = false;
                this.showGraphs = false;
            },
            setShowMap(){
                this.showTable = false;
                this.showMap = true;
                this.showGraphs = false;
            },
            setShowGraphs(){
                this.showTable = false;
                this.showMap = false;
                this.showGraphs = true;
            }
        },
    }
</script>

<style scoped>
    .mid {
        max-width: 100px;
    }
    .tabPanel{
        display: flex;
    }
    .tab{
        padding: 8px 16px;
        margin: 0 4px;
        border: 1px solid lightgreen;
        border-radius:4px;
        background-color: rgba(144, 238, 144, 0.24)
    }
    .selected {
        background-color: lightgreen;
    }
    .tab:hover{
        background-color:rgba(133, 206, 144, 0.71);
        cursor: pointer;
    }
    .backLink>>a{
        text-decoration: none;
    }
    .backLink{
        padding: 8px 16px;
        margin: 0 4px;
        border-radius:50px;
        background-color: lightgray;
    }
    .backLink:hover {
        background-color: #bababa;
    }
    .small{
        max-width: 50px;
    }

</style>