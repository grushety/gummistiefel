<template>
    <div class="chartComparison">
        <div class="timespanConfiguration">
            <div class="axisConfig">
                <div class="axes"> Achsen Konfigurationen: </div>
                <div> X-Achse:
                    <div class="radioOption">
                        <input type="radio" id="0x" :value=0 v-model="xaxis"><label for="0x">Startdatum</label>
                        <input type="radio" id="1x" :value=1 v-model="xaxis" :disabled="zaxis===1"><label for="1x">
                        Niederschlagsmenge </label>
                    </div>
                </div>
                <div> Y-Achse:  Dauer</div>
                <div> Größe der Bubble:
                    <div class="radioOption">
                        <input type="radio" id="0z" :value=0 v-model="zaxis"><label for="0z">Räumliche
                        Ausdehnung</label>
                        <input type="radio" id="1z" :value=1 v-model="zaxis" :disabled="xaxis===1"><label for="1z">
                        Niederschlagsmenge </label>
                    </div>
                </div>
                <div> Farbe : Gesamtintensität </div>
            </div>
            <div class="configPanels">
                <div class="leftPanel param">
                    <div class="inputItem param">
                        <div class="label"> Anzahl der Elemente festlegen</div>
                        <input type="number" v-model="selectedNumberLeft"
                               id="nOfExtremEventsLeft" min=1
                               max=30/>
                    </div>
                    <div class="datePicker param">
                        <div class="label">Zeitperiode auswählen </div>
                        <Datepicker range v-model="selectedDateLeft"
                                    :not-before="disabledBefore"
                                    :not-after="disabledAfter"
                                    :date-format="{year: 'numeric', month: '2-digit', day: '2-digit'}"
                                    lang="de"/>
                    </div>
                </div>
                <div class="filterList">
                    <div v-for="option in filterOptions" :key="option.id" class="filter">
                        <div class="filterItem" @click="setLeftFilter(option)"
                             :class="{'selected': filterLeft === option.name}">{{
                                option.name
                            }}
                        </div>
                    </div>
                </div>
                <div class="rightPanel param">
                    <div class="inputItem param">
                        <div class="label"> Anzahl der Elemente festlegen </div>
                            <input type="number" v-model="selectedNumberRight"
                                   id="nOfExtremEventsRight" min=1
                                   max=30/>
                    </div>
                    <div class="datePicker param">
                        <div class="label">Zeitperiode auswählen </div>
                        <Datepicker range v-model="selectedDateRight"
                                    :not-before="disabledBefore"
                                    :not-after="disabledAfter"
                                    :date-format="{year: 'numeric', month: '2-digit', day: '2-digit'}"
                                    lang="de"/>
                    </div>
                </div>
                <div class="filterList">
                    <div v-for="option in filterOptions" :key="option.id" class="filter">
                        <div class="filterItem" @click="setRightFilter(option)"
                             :class="{'selected': filterRight === option.name}">{{
                                option.name
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <button @click="submit">Änderungen übermitteln</button>
            <div class="showOnMap" v-if="selectedLeftItem || selectedRightItem">
                <div class="selectedEvents">
                    <div class v-html="formattedSelectedItemLeft"></div>
                    <div class v-html="formattedSelectedItemRight"></div>
                </div>
                <button @click="showOnMap" :disabled="!(this.selectedRightItem && this.selectedLeftItem)">
                    Auf der Karte zeigen
                </button>
            </div>
        </div>
        <div class="charts">
            <apexchart
                ref="firstChart"
                width="600"
                height="500"
                @click="clickHandlerLeft"
                :options="options" :series="firstSeries">
            </apexchart>
            <apexchart
                ref="secondChart"
                height="500"
                width="600"
                @click="clickHandlerRight"
                :options="options" :series="secondSeries">
            </apexchart>
        </div>
    </div>
</template>

<script>
    import VueDatepickerUi from 'vue-datepicker-ui'
    import 'vue-datepicker-ui/lib/vuedatepickerui.css';
    import utils from "../../store/utils";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "ChartComparison",
        components: {
            Datepicker: VueDatepickerUi,
        },
        data() {
            return {
                selectedType: 'year',
                selectedNumberLeft: 10,
                selectedNumberRight: 10,
                selectedDateLeft: [new Date("1971-01-01"), new Date("2000-12-31")],
                selectedDateRight: [new Date("2001-01-01"), new Date("2017-12-31")],
                disabledBefore: new Date("1971-01-01"),
                disabledAfter: new Date("2017-12-31"),
                filterOptions: [
                    {id: 0, name: "Gesamtintensität"},
                    {id: 1, name: "Räumliche Ausdehnung"},
                    {id: 2, name: "Dauer"},
                    {id: 3, name: "Niederschlagsmenge"}],
                filterLeft: "Gesamtintensität",
                filterLeftId: 0,
                filterRight: "Räumliche Ausdehnung",
                filterRightId: 1,
                xaxis: 0,
                zaxis: 0,
                options: utils.newBubbleOptions(this.xaxis, this.zaxis),
                firstSeries: [],
                secondSeries: [],
                selectedLeftItem: null,
                selectedRightItem: null,
                idMapLeft: {},
                idMapRight: {},
            }
        },
        async created() {
            this.options = utils.newBubbleOptions(this.xaxis, this.zaxis);
            let leftParams = this.formParams(this.filterLeftId, this.selectedNumberLeft, this.selectedDateLeft);
            let rightParams = this.formParams(this.filterRightId, this.selectedNumberRight, this.selectedDateRight);
            await this.getLeftRangeEvents(leftParams);
            await this.getRightRangeEvents(rightParams);
            this.firstSeries = this.leftRangeEvents;
            this.secondSeries = this.rightRangeEvents;
        },
        watch: {
            firstSeries: {
                deep: true,
                handler(val) {
                    if (val !== 'undefined' && val !== null) {
                        this.idMapLeft = this.computeIdMap(this.firstSeries);
                    }
                }
            },
            secondSeries: {
                deep: true,
                handler(val) {
                    if (val !== 'undefined' && val !== null) {
                        this.idMapRight = this.computeIdMap(this.secondSeries);
                    }
                }
            }
        },
        computed: {
            ...mapState(["leftRangeEvents", "rightRangeEvents"]),
            formattedSelectedItemLeft() {
                return this.selectedLeftItem ? this.formatItem(this.selectedLeftItem) : null;
            },
            formattedSelectedItemRight() {
                return this.selectedRightItem ? this.formatItem(this.selectedRightItem) : null;
            }
        },
        methods: {
            ...mapActions(['getLeftRangeEvents', 'getRightRangeEvents']),
            formParams(filterId, itemNumber, selectedDateRange) {
                return {
                    arg: filterId,
                    k: itemNumber,
                    start: utils.format_date(selectedDateRange[0]),
                    end: utils.format_date(selectedDateRange[1]),
                    xaxis: this.xaxis,
                    zaxis: this.zaxis,
                }
            },
            setLeftFilter(option) {
                this.filterLeft = option.name;
                this.filterLeftId = option.id;
            },
            setRightFilter(option) {
                this.filterRight = option.name;
                this.filterRightId = option.id;
            },
            async submit() {
                let leftParams = this.formParams(this.filterLeftId, this.selectedNumberLeft, this.selectedDateLeft)
                let rightRarams = this.formParams(this.filterRightId, this.selectedNumberRight, this.selectedDateRight)
                await this.getLeftRangeEvents(leftParams);
                await this.getRightRangeEvents(rightRarams);

                this.firstSeries = this.leftRangeEvents;
                this.secondSeries = this.rightRangeEvents;
                this.options = utils.newBubbleOptions(this.xaxis, this.zaxis);
                await this.$refs.firstChart.updateOptions(this.options);
                await this.$refs.firstChart.updateSeries(this.firstSeries);
                await this.$refs.secondChart.updateOptions(this.options);
                await this.$refs.secondChart.updateSeries(this.secondSeries);
            },

            clickHandlerLeft(event, chartContext, config) {
                console.log(config)
                if (config.seriesIndex > -1 && config.dataPointIndex > -1) {
                    this.selectedLeftItem = this.idMapLeft[config.seriesIndex][config.dataPointIndex]
                }
            },
            clickHandlerRight(event, chartContext, config) {
                console.log(config)
                if (config.seriesIndex > -1 && config.dataPointIndex > -1) {
                    this.selectedRightItem = this.idMapRight[config.seriesIndex][config.dataPointIndex]
                    console.log(this.selectedRightItem)
                }
            },
            computeIdMap(series) {
                let map = {};
                for (let i = 0; i < series.length; i++) {
                    if (series[i].data.length > 0) {
                        let j = 0;
                        map[i] = {}
                        series[i].data.forEach(it => {
                            map[i][j] = it
                            j = j + 1;
                        })
                    }
                }
                return map;
            },
            formatItem(item) {
                let html = "<span>Ausgewählte Ereigniss:</span> <br>"
                    + "<span> ID: " + item[3] + "</span>"
                return html;
            },
            showOnMap() {
                this.$emit('setMap', this.selectedLeftItem[3], this.selectedRightItem[3])
            },
        }
    }
</script>

<style scoped>
    .chartComparison {
        padding: 16px 4px;
    }

    .param {
        margin: 8px 16px;
        text-align: start;
    }

    input, select {
        padding: 4px;
        font-family: Candara, Segoe UI Historic, sans-serif;
    }

    .charts {
        display: flex;
        justify-content: space-around;
    }

    .timespanConfiguration {
        background-color: lightgoldenrodyellow;
        padding: 8px;
        border: solid 1px #ead4ac;
        box-shadow:  1px 2px 1px 1px #eeeecb;
    }

    .configPanels {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .label {
        font-weight: bolder;
        font-size: 12px;
        margin: 8px;
    }

    .selectedEvents {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .selected {
        background-color: yellowgreen;
    }

    .filterList {
        min-width: 230px;
        max-width: 230px;
        border: solid 1px yellowgreen;
        font-family: Candara, Segoe UI Historic, sans-serif;
        margin: 16px;
        box-shadow:  3px 3px 3px 1px #d8e5bd;
    }

    .filterItem {
        padding: 4px;
        text-align: center;
        cursor: pointer;
    }

    .filterItem:hover {
        background-color: #c7da9f;
    }
    .axisConfig{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .axes{
        font-weight: bolder;
    }
    .datePicker{
        font-size: 14px;
        padding: 0;
    }
    .datePicker /deep/ input {
        height: 20px;
    }
    .datePicker /deep/ .number{
        height: unset!important;
        width: unset!important;
    }
    .radioOption{
        font-family: Candara, Segoe UI Historic, sans-serif;
        font-size: 12px;
    }

</style>