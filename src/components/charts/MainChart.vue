<template>
    <div class="mainChart">
        <div class="controlPanel">
            <button @click="changeToYearView">Zurück zur Gesamtübersicht</button>
            <div class="panelItem">
                <label>
                    <input type="checkbox" :checked="extremOnly" @input="showExtremEreignisse">
                    Nur Extremereignisse Anzeigen
                </label>
            </div>
            <p v-if="selectedYear!==''"> Ausgewhältes Jahr: {{ selectedYear }}</p>
            <p v-if="selectedMonth!==''"> Ausgewhältes Monat: {{ selectedMonth }}</p>
        </div>
        <div class="chart">
            <apexchart ref="mainChart"
                       @click="clickHandler"
                       width="1100px"
                       height="600px"
                       :options="options" :series="series">
            </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../../store/utils.js";
    import {mapActions, mapState} from "vuex";

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
                options: utils.newStackedHistogramOptions(),
                series: this.allEvents,
            }
        },
        computed: {
            ...mapState(['allEvents', 'selectedYearEvents', 'selectedMonthEvents']),
            currentWidth() {
                if (this.type === "year" || this.type === "days") {
                    return "800px";
                } else {
                    return "500px";
                }
            }
        },
        watch: {
            allEvents: {
                deep: true,
                handler(val) {
                    console.log(val)
                    this.options = utils.newStackedHistogramOptions();
                    this.options.xaxis.categories = this.yearsCategories;
                    this.series = this.allEvents;
                    this.rerenderChart();
                }
            }
        },
        created() {
            this.getAllEvents();
            this.yearsCategories = utils.getAllYears();
            this.monthCategories = utils.getAllMonth();
            this.dayLabels = utils.getExampleDates();
            this.options = utils.newStackedHistogramOptions();
            this.options.xaxis.categories = this.yearsCategories;
            this.series = this.allEvents;
        },
        methods: {
            ...mapActions(["getAllEvents", 'getSelectedYearEvents', 'getSelectedMonthEvents']),
            async clickHandler(event, chartContext, config) {
                console.log("clicked is " + this.options.xaxis.categories[config.dataPointIndex]);
                if (this.type === "year" && !this.selectedYear) {
                    this.selectedYear = this.options.xaxis.categories[config.dataPointIndex];
                    console.log("selected year " + this.selectedYear);
                    await this.getSelectedYearEvents(this.selectedYear);
                    this.series = this.selectedYearEvents;
                    this.options = utils.newStackedHistogramOptions();
                    this.options.xaxis.categories = utils.getAllMonth();

                    this.rerenderChart();
                    this.type = "month";
                    return true;
                }
                if (this.type === "month" && !this.selectedMonth) {
                    if (config.dataPointIndex < 12) {
                        this.selectedMonth = this.options.xaxis.categories[config.dataPointIndex];
                        console.log("selected Month " + this.selectedMonth);
                        let monthCode = utils.getMonthCode(this.selectedMonth);
                        console.log("Month " + this.selectedMonth + " code " + monthCode)
                        await this.getSelectedMonthEvents({year: this.selectedYear, month: monthCode});
                        this.series = this.selectedMonthEvents;
                        this.options = utils.newStackedHistogramOptions();
                        this.options.xaxis.categories = utils.getAllDaysKey();
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
                await this.getAllEvents();
                this.series = this.allEvents;
                this.selectedYear = "";
                this.selectedMonth = "";
                this.options = utils.newStackedHistogramOptions();
                this.options.xaxis.categories = utils.getAllYears();
                this.extremOnly=false;
                this.rerenderChart();
            },
            rerenderChart() {
                if (this.$refs.mainChart !== 'undefined') {
                    this.$refs.mainChart.updateOptions(this.options);
                    this.$refs.mainChart.updateSeries(this.series);
                }
            },
            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            showExtremEreignisse() {
                this.extremOnly = !this.extremOnly;
                console.log(this.extremOnly)
                if (this.extremOnly) {
                    console.log("bin in extrem only")
                    this.series = [this.series[1]]
                    this.rerenderChart();
                } else {
                    if (this.type === "year") {
                        this.series = utils.generateDataForAllYears();
                    }
                    if (this.type === "month") {
                        this.series = utils.generateDataForMonths();
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
        align-items: start;
        grid-gap: 40px;
    }

    button {
        padding: 2px 8px;
        border: 2px solid #bababa;
        border-radius: 1px;
        max-height: 24px;
        background-color: rgba(219, 219, 219, 0.24);
    }

    .panelItem {
        padding: 16px 0;
    }


</style>