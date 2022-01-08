<template>
    <div class="mainChart">
        <div class="controlPanel">
            <button @click="changeToYearView" :disabled="type==='years'">Zurück zur Gesamtübersicht</button>
            <div  class="panelItem">
            <label>
                <input type="checkbox" :checked="extremOnly" @input="showExtremEreignisse">
                Nur Extremereignisse Anzeigen
            </label>
            </div>
            <p v-if="selectedYear!==''"> Ausgewhältes Jahr: {{selectedYear}}</p>
            <p v-if="selectedMonth!==''"> Ausgewhältes Monat: {{selectedMonth}}</p>
        </div>
        <div class="chart" v-if="this.series.length>0">
            <apexchart ref="mainChart"
                       @click="clickHandler"
                       width="800px"
                       :options="options" :series="series">
            </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../../utils.js";

    export default {
        name: "MainChart",
        props: {
            graphType: {
                type: String,
                default: "year"
            }
        },
        data() {
            return {
                type: "year",
                extremOnly: false,
                selectedYear: "",
                selectedMonth: "",
                selectedEvent1: "",
                selectedEvent2: "",
                yearsCategories: [],
                monthCategories: [],
                dayLabels: [],
                options: {},
                series: {},
            }
        },
        computed: {
            currentWidth() {
                if (this.type === "year" || this.type === "days") {
                    return "800px";
                } else {
                    return "500px";
                }
            }
        },
        created() {
            this.yearsCategories = utils.getAllYears();
            this.monthCategories = utils.getAllMonth();
            this.dayLabels = utils.getExampleDates();
            this.options = utils.newStackedHistogramOptions();
            this.options.xaxis.categories = this.yearsCategories;
            this.series = utils.generateDataForAllYears();
        },
        methods: {
            clickHandler(event, chartContext, config) {
                console.log("clicked is " + this.options.xaxis.categories[config.dataPointIndex]);
                if (this.type === "year" && !this.selectedYear) {
                    this.selectedYear = this.options.xaxis.categories[config.dataPointIndex];
                    console.log("selected year " + this.selectedYear);
                    this.series = utils.generateDataForMonths();
                    console.log("dataForMonth")
                    console.log(this.series)
                    this.options = utils.newStackedHistogramOptions();
                    this.options.xaxis.categories = utils.getAllMonth();
                    // render the month map
                    this.rerenderChart();
                    this.type = "month";
                    return true;
                }
                if (this.type === "month" && !this.selectedMonth) {
                    if (config.dataPointIndex < 12) {
                        this.selectedMonth = this.options.xaxis.categories[config.dataPointIndex];
                        console.log("selected Month " + this.selectedMonth);
                        this.series = utils.generateDataForDays(this.dayLabels);
                        console.log(this.series)
                        this.options = utils.newBubbleOptions();
                        this.rerenderChart();
                        this.type = "day";
                        return true;
                    }
                }
                if (this.type === "day") {
                    console.log("bin in day by click")
                }
            },

            async changeToYearView() {
                this.type = "year";
                this.series = utils.generateDataForAllYears();
                console.log(this.series);
                this.selectedYear = "";
                this.selectedMonth = "";
                this.options = utils.newStackedHistogramOptions();
                this.options.xaxis.categories = utils.getAllYears();
                this.rerenderChart();
            },
            rerenderChart() {
                this.$refs.mainChart.updateOptions(this.options);
                this.$refs.mainChart.updateSeries(this.series);
            },
            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            showExtremEreignisse(){
                this.extremOnly = !this.extremOnly;
                console.log(this.extremOnly)
                if(this.extremOnly){
                    console.log("bin in extrem only")
                    this.series = [this.series[1]]
                    this.rerenderChart();
                }
                else{
                    if(this.type === "year"){
                        this.series = utils.generateDataForAllYears();
                    }
                    if(this.type === "month"){
                        this.series =  utils.generateDataForMonths();
                    }
                    this.rerenderChart();
                }
            }
        }
    }
</script>

<style scoped>
    .mainChart {
        align-content: center;
        display: grid;
        grid-template-columns: 20% auto;
        grid-gap: 40px;
    }

    button {
        padding: 2px 8px;
        border: 2px solid #bababa;
        border-radius: 1px;
        max-height: 24px;
        background-color: rgba(219, 219, 219, 0.24);
    }
    .panelItem{
        padding:16px 0;
    }


</style>