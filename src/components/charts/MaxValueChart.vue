<template>
    <div class="maxValueChart">
        <div class="controlPanel">
            <div class="label"> Legen Sie die Anzahl der anzuzeigenden Extremereignisse fest </div> <br>
            <input type="number" v-model="number" id="nOfExtremEvents" min=0 max=30/><br>
            <div class="label"> Sortierkriterium auswählen </div>
            <div class="filterList">
                <div v-for="option in criteria" :key="option.id" class="filter">
                    <div class="filterItem" @click="setCriteria(option)" :class="{'selected': criterium === option.name}">{{
                            option.name
                        }}</div>
                </div>
            </div>
            <button @click="submit">Submit</button>
            <div class="showOnMap" v-if="selectedItem">
                <div class="selectedEvent" v-html="formattedSelectedItem"></div>
                <button @click="showOnMap">Show on map</button>
            </div>
        </div>
        <div class="chart">
            <apexchart
                ref="maxChart"
                @click="clickHandler"
                width="1200"
                :options="options" :series="series"
            >
            </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../../store/utils";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "MaxValueChart",
        data() {
            return {
                number: 5,
                series: this.allRangeEvents,
                options: utils.newBubbleOptions(),
                selectedId: 0,
                criterium: "Gesamtintensität",
                criteria: [{id: 0, name: "Gesamtintensität"}, {id: 1, name: "Räumliche Ausdehnung"}, {id: 2, name: "Dauer"}, {
                    id: 3, name: "Niederschlagsmenge"}],
                idMap: {},
                selectedItem: null,
            }
        },
        async created() {
            let params = {k: this.number, arg: this.selectedId}
            await this.getAllRangeEvents(params)
            this.series = this.allRangeEvents
            this.options = utils.newBubbleOptions()
            this.$refs.maxChart.updateSeries(this.series);
        },
        watch: {
            series: {
                deep: true,
                handler() {
                    this.idMap = this.computeIdMap();
                }
            }
        },
        computed: {
            ...mapState(['allRangeEvents', "originalFormattedAllRangeEvents"]),
            formattedSelectedItem() {
                let html = "<span>Ausgewählte event:</span> <br>"
                    + "<span> ID: " + this.selectedItem[3] + "</span> <br>"
                    + "<span> Anfang: " + utils.format_date(new Date(this.selectedItem[0])) + "</span> <br>"
                    + "<span> Dauer: "  + this.selectedItem[1] + "</span> <br>"
                    + "<span> Area: " + this.selectedItem[2] + "</span> <br>"
                return html;
            },
        },
        methods: {
            ...mapActions(['getAllRangeEvents']),
            async submit() {
                let params = {k: this.number, arg: this.selectedId}
                await this.getAllRangeEvents(params)
                this.series = this.allRangeEvents;
                this.$refs.maxChart.updateSeries(this.series);
            },
            setCriteria(option) {
                this.selectedId = option.id;
                this.criterium = option.name;
            },
            clickHandler(event, chartContext, config) {
                if (config.seriesIndex > -1 && config.dataPointIndex > -1) {
                    this.selectedItem = this.idMap[config.seriesIndex][config.dataPointIndex]
                }
            },
            computeIdMap() {
                let map = {};
                for (let i = 0; i < this.allRangeEvents.length; i++) {
                    if (this.allRangeEvents[i].data.length > 0) {
                        let j = 0;
                        map[i] = {}
                        this.allRangeEvents[i].data.forEach(it => {
                            map[i][j] = it
                            j = j + 1;
                        })
                    }
                }
                return map;
            },
            showOnMap() {
                console.log("emited id: " + this.selectedItem[3])
                this.$emit("setMap", this.selectedItem[3])
            },
        },
    }
</script>

<style scoped>
    .maxValueChart {
        align-content: center;
        display: grid;
        grid-template-columns: 20% auto;
        grid-gap: 40px;
        align-items: start;
        text-align: center;
    }

    .filter {
        cursor: pointer;
    }

    .selectedEvent{
        padding: 16px;
    }

    .label {
        font-weight: bolder;
        margin-top: 16px;
        font-size: 12px;
    }
    .selected {
        border-color: black;
        background-color: yellowgreen;
    }
    .filterList{
        min-width: 250px;
        border: solid 1px yellowgreen;
        margin: 16px;
    }

    .filterItem{
        padding: 8px;
        text-align: center;
        cursor: pointer;
    }
    .filterItem:hover{
        background-color: #c7da9f;
    }
    .controlPanel{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input{
        padding: 8px;
        margin: 16px;
    }

</style>