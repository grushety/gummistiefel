<template>
    <div class="boxPlotChart" v-if="series">
        <div class="controlPanel">
            <div class="filters">
                <button @click="changeToYearView()" v-if="type!=='year'">Zurück zur Gesamtübersicht</button>
                <label>
                    <input type="checkbox" :checked="extremOnly" @input="showExtremEreignisse">
                    Nur Extremereignisse Anzeigen
                </label>
                <p v-if="selectedYear!==''"> Ausgewhältes Jahr: {{selectedYear}}</p>
                <p>Bitte wählen Sie das Attribut aus, um Statistiken dazu anzuzeigen</p>
                <label>
                    <input type="checkbox" :checked="severitySelected" @input="select('severity')">Severity
                </label>
                <label>
                    <input type="checkbox" :checked="areaSelected" @input="select('area')">Area
                </label>
                <label>
                    <input type="checkbox" :checked="durationSelected" @input="select('duration')">Duration
                </label>
                <label>
                    <input type="checkbox" :checked="maxPrecSelected" @input="select('maxPrec')">MaxPrec
                </label>
            </div>
        </div>
        <apexchart ref="boxPlotChart"
                   @click="clickHandler"
                   width="800px"
                   :options="options" :series="series">
        </apexchart>
    </div>
</template>

<script>
    import utils from "../../utils";

    export default {
        name: "BoxPlotChart",
        data() {
            return {
                series: utils.getBoxplotSeriesForYears(),
                options: utils.newBoxPlotOptions(),
                type: 'year',
                filter: 'area',
                severitySelected: true,
                areaSelected: false,
                durationSelected: false,
                maxPrecSelected: false,
                extremOnly: false,
                selectedYear: "",
            }
        },
        create() {
        },
        methods: {
            clickHandler(event, chartContext, config) {
                console.log(config)
                console.log(event)
                if (config.dataPointIndex!==-1) {
                    let allYears = utils.getAllYears()
                    if (this.type === "year" && !this.selectedYear) {
                        this.selectedYear = allYears[config.dataPointIndex];
                        this.series = utils.getBoxplotSeriesForMonths(this.selectedYear, this.filter);
                        this.type = "month";
                        this.rerenderChart();
                    }
                }
            },

            rerenderChart() {
                this.$refs.boxPlotChart.updateOptions(this.options);
                this.$refs.boxPlotmainChart.updateSeries(this.series);
            },
            select(filter) {
                this.filter = filter;
                switch (filter) {
                    case "severity":
                        this.severitySelected = true;
                        this.areaSelected = false;
                        this.durationSelected = false;
                        this.maxPrecSelected = false;
                        break;
                    case "area":
                        this.severitySelected = false;
                        this.areaSelected = true;
                        this.durationSelected = false;
                        this.maxPrecSelected = false;
                        break;
                    case "duration":
                        this.severitySelected = false;
                        this.areaSelected = false;
                        this.durationSelected = true;
                        this.maxPrecSelected = false;
                        break;
                    case "maxPrec":
                        this.severitySelected = false;
                        this.areaSelected = false;
                        this.durationSelected = false;
                        this.maxPrecSelected = true;
                        break;
                    default:
                        this.severitySelected = true;
                        this.areaSelected = false;
                        this.durationSelected = false;
                        this.maxPrecSelected = false;
                        break;
                }
            },
            changeToYearView() {
                this.selectedYear = "";
                this.type = "year"
                this.series = utils.getBoxplotSeriesForYears(this.filter)
                this.rerenderChart();
            },
            showExtremEreignisse() {

            }
        }

    }
</script>

<style scoped>
    .boxPlotChart {
        align-content: center;
        display: grid;
        grid-template-columns: 20% auto;
        grid-gap: 40px;
    }

    .filters {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

</style>