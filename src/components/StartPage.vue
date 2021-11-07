<template>
    <div class="startPage">
        <h1>Event list</h1>
        <div class="tabPanel">
            <p class="tab" :class="showTable? 'selected': ''" @click="setShowTable">All data</p>
            <p class="tab" :class="showGraphs? 'selected': ''" @click="setShowGraphs">Graphs</p>
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
            }
        },
        computed: {
            ...mapState(["events"])
        },
        methods: {
            ...mapActions(["getEvents"]),
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
            }
        }
    }
</script>

<style scoped>
    .eventBox {
        text-align: center;
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
    .eventBox{
        display: flex;
        justify-items: center;
        align-content: center;
        justify-content: center;
    }

</style>
