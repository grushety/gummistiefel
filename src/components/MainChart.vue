<template>
    <div class="mainChart">
        <div class="controlPanel">
            <button @click="changeToYearView">Zurück zur Gesamtübersicht</button>
            <p v-if="selectedYear!=''"> Ausgewhältes Jahr: {{selectedYear}}</p>
            <p v-if="selectedMonth!==''"> Ausgewhältes Monat: {{selectedMonth}}</p>
        </div>
        <div class="chart">
            <apexchart ref="mainChart"
                       @click="clickHandler"
                       width="800px"
                       :options="options" :series="series">
            </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../utils.js";

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
                selectedYear: "",
                selectedMonth: "",
                selectedEvent1: "",
                selectedEvent2: "",
                yearsCategories: [],
                monthCategories: [],
                dayLabels: [],
                yearStrongData: [],
                yearExtremData: [],
                options:{},
                series:{},
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
            let yearsData = utils.generateDataForAllYears();
            this.yearsCategories = yearsData.years;
            this.yearStrongData = yearsData.strong;
            this.yearExtremData = yearsData.extrem;
            this.monthCategories = utils.getAllMonth();
            this.dayLabels = utils.getExampleDates();
            this.series =  [{name: 'Starkereignisse', data: this.yearStrongData},
                {name: 'Extremereignisse', data: this.yearExtremData},];
            this.options = utils.newStackedHistogramOptions();
            this.options.xaxis.categories = this.yearsCategories;
        },
        methods: {
            clickHandler(event, chartContext, config) {
                console.log("clicked is " + this.options.xaxis.categories[config.dataPointIndex]);
                if (this.type === "year") {
                    this.selectedYear = this.options.xaxis.categories[config.dataPointIndex];
                    this.type = "month";
                    this.series = utils.generateDataForMonths();
                    this.options = utils.newStackedHistogramOptions();
                    this.options.xaxis.categories = this.monthCategories;
                    this.rerenderChart();
                }
                if (this.type === "month") {
                    if (config.dataPointIndex < 12) {
                        this.selectedMonth = this.options.xaxis.categories[config.dataPointIndex];
                        this.type = "day";
                        this.series = utils.generateDataForDays(this.dayLabels);
                        this.options = utils.newBubbleOptions();
                        this.rerenderChart();
                    }
                }
                if (this.type === "day") {
                    console.log(config)
                }
            },

            changeToYearView() {
                this.type = "year";
                this.series =  [{name: 'Starkereignisse', data: this.yearStrongData},
                    {name: 'Extremereignisse', data: this.yearExtremData},];
                this.options = utils.newStackedHistogramOptions();
                this.options.xaxis.categories = this.yearsCategories;
                this.rerenderChart();
            },
            rerenderChart() {
                this.$refs.mainChart.updateOptions(this.options);
                this.$refs.mainChart.updateSeries(this.series);
            },
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


</style>