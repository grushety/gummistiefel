<template>
    <div class="startPage">
        <div class="tabPanel">
            <h1 class="title">Event list</h1>
            <p v-for="showOption in showOptions" :key="showOption.key" class="tab" 
                :class="show == showOption.key ? 'selected' : ''" 
                @click="show = showOption.key"
            >{{ showOption.label }}</p>
            <p class="totalSize">Total number of events : {{events.length}}</p>
        </div>
        <div class="filterPanel">
            <p class="format">Filter data format: min, max</p>
            <div class="lengthFilter input-group">
                <label for="length">Duration</label>
                <input id="length" type="text" v-model="lengthFilter" @input="setLengthFilter()">
            </div>
            <div class="severityFilter input-group">
                <label for="severity">Severity</label>
                <input id="severity" type="text" v-model="severityFilter" @input="setSeverityFilter()">
            </div>
            <div class="areaFilter input-group">
                <label for="area">Area</label>
                <input id="area" type="text" v-model="areaFilter" @input="setAreaFilter()">
            </div>
            <button  class="filterButton" @click="setFilters">Search</button>
        </div>
        <div v-if="show == 'table'" class="eventBox center">
            <table id="firstTable" align="center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Area</th>
                    <th class="small">Duration</th>
                    <th class="small">Severity</th>
                    <th>Start</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="event in events" :key="event.id" class="event" @click=moveToEventPage(event.id)>
                    <td>{{event.id}}</td>
                    <td>{{event.area}}</td>
                    <td class="small">{{event.length}}</td>
                    <td class="small"> {{event.si}}</td>
                    <td>{{event.start}},</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-if="show == 'graph'">
            <Graphs :events="events"></Graphs>
        </div>
        <div v-if="show == 'map'">
            <Map :events="events"></Map>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import router from "../router";
    import Graphs from "./Graphs"
    import Map from "./Map"

    export default {
        name: 'StartPage',
        async created() {
            await this.getEvents();
        },
        components: {
            Graphs,
            Map
        },
        data() {
            return {
                showOptions: [
                    {key: 'table', label: 'All data'},
                    {key: 'graph', label: 'Graphs'},
                    {key: 'map', label: 'Map'},
                ],
                show: 'table',
                lengthFilter: "20,100",
                severityFilter: "",
                areaFilter: "",
            }
        },
        computed: {
            ...mapState(["events"]),
            labels(){
                return this.events.map(it => it.start);
            },
        },
        methods: {
            ...mapActions(["getEvents", "setFilters", "setSeverity", "setLength", "setArea"]),
            moveToEventPage(eventId) {
                router.push({name: 'Event Details', params: {id: eventId}})
            },
            setShowTable() {
                this.showTable = true;
                this.showGraphs = false;
            },
            setShowGraphs() {
                this.showTable = false;
                this.showGraphs = true;
            },
            setShowMap() {
                this.showTable = false;
                this.showGraphs = true;
            },
            setLengthFilter(){
                this.setLength(this.lengthFilter);
            },
            setSeverityFilter(){
                this.setSeverity(this.severityFilter);
            },
            setAreaFilter() {
                this.setArea(this.areaFilter);
            }
        }
    }
</script>

<style scoped>
    .eventBox {
        text-align: center;
    }

    .tabPanel {
        display: inline;
        align-items: center;
        width: 100%;
    }

    .tab {
        padding: 8px 16px;
        margin: 0 4px;
        border: 1px solid lightgreen;
        border-radius: 4px;
        max-height: 20px;
        min-width: 60px;
        background-color: rgba(144, 238, 144, 0.24);
        justify-items: flex-end;
        float: right;
    }

    .selected {
        background-color: lightgreen;
    }

    .tab:hover {
        background-color: rgba(133, 206, 144, 0.71);
        cursor: pointer;
    }

    .eventBox {
        display: flex;
        justify-items: center;
        align-content: center;
        justify-content: center;
    }
    .filterButton{
        align-self: end;
        margin: 8px;
        font-weight: bold;
        color: #455A64;
    }
    .filterPanel {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #ceeec5;
        width: 100%;
        border-radius: 4px;
    }
    .format {
        align-self: flex-end;
        color: #8a8a8a;
        font-size: small;
    }
    .totalSize{
        float: right;
        margin-right: 30px;
    }
    .title {
        float: left;
    }

</style>
