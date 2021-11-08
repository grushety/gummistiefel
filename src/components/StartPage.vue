<template>
    <div class="startPage">
        <div class="tabPanel">
            <h1>Event list</h1>
            <p class="totalSize">Total number of events : {{events.length}}</p>
            <p class="tab" :class="showTable? 'selected': ''" @click="setShowTable">All data</p>
            <p class="tab" :class="showGraphs? 'selected': ''" @click="setShowGraphs">Graphs</p>
        </div>
        <p>Please enter you filter data in format: max, min</p>
        <div class="filterPanel">
            <div class="lengthFilter input-group">
                <label for="length">Dauer</label>
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
        <div v-if="showTable" class="eventBox center">
            <table id="firstTable" align="center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Area</th>
                    <th class="small">Dauer</th>
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
        <div v-if="showGraphs">
            <Graphs></Graphs>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import router from "../router";
    import Graphs from "./Graphs"

    export default {
        name: 'StartPage',
        async created() {
            await this.getEvents();
        },
        components: {
            Graphs,
        },
        data() {
            return {
                showTable: true,
                showGraphs: false,
                lengthFilter: "10,20",
                severityFilter: "",
                areaFilter: "",
            }
        },
        computed: {
            ...mapState(["events"])
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
        display: flex;
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
    .totalSize{
        justify-self: flex-end;
    }

</style>
