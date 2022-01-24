<template>
    <div class="maxValueChart">
        <div class="controlPanel">
            <label for="nOfExtremEvents"> Legen Sie die Anzahl der anzuzeigenden Extremereignisse fest </label>
            <input type="number" v-model="number" id="nOfExtremEvents" min=0 max=30/>
            <br>
            <div class="filterList">
                <div v-for="option in criteria" :key="option.id" class="filter">
                    <p @click="setCriteria(option)" :class="{'selected': criterium === option.name}">{{
                            option.name
                        }}</p>
                </div>
            </div>
            <button @click="submit">Submit</button>
            <div class="showOnMap" v-if="selectedItem">
                <div class v-html="formattedSelectedItem"></div>
                <button @click="showOnMap">Show on map</button>
            </div>
        </div>
        <div class="chart">
            <apexchart
                ref="maxChart"
                @click="clickHandler"
                width="1200"
                :options="options" :series="series">
            </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../../utils";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "MaxValueChart",
        data() {
            return {
                number: 5,
                series: this.allRangeEvents,
                options: utils.newBubbleOptions(),
                selectedId: 0,
                criterium: "severity",
                criteria: [{id: 0, name: "severity"}, {id: 1, name: "area"}, {id: 2, name: "length"}, {
                    id: 3,
                    name: "maxPrec"
                }],
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
                let html = "<p>Ausgewählte event:</p> <br>"
                    + "<p> id: " + this.selectedItem[3] + "</p> <br>"
                    + "<p> begin: " + utils.format_date(new Date(this.selectedItem[0])) + "</p>"
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
        text-align: left;
    }

    label {
        font-weight: 600;
        font-size: 14px;
    }

    .selected {
        background-color: aquamarine;
    }

    .filter {
        cursor: pointer;
    }


</style>