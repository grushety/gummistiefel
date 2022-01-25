<template>
    <div class="chartComparison">
        <div class="timespanConfiguration">
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
            <button @click="submit">submit</button>
            <div class="showOnMap" v-if="selectedLeftItem || selectedRightItem">
                <div class="selectedEvents">
                    <div class v-html="formattedSelectedItemLeft"></div>
                    <div class v-html="formattedSelectedItemRight"></div>
                </div>
                <button @click="showOnMap" :disabled="!(this.selectedRightItem && this.selectedLeftItem)">Show on
                    map
                </button>
            </div>
        </div>
        <div class="charts">
            <apexchart
                ref="firstChart"
                width="800"
                height="700"
                @click="clickHandlerLeft"
                :options="options" :series="firstSeries">
            </apexchart>
            <apexchart
                ref="secondChart"
                height="700"
                width="800"
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
                selectedDateLeft: [new Date("1971-01-01"), new Date("2017-12-31")],
                selectedDateRight: [new Date("1971-01-01"), new Date("2017-12-31")],
                filterOptions: [{id: 0, name: "Gesamtintensität"}, {id: 1, name: "Räumliche Ausdehnung"}, {id: 2, name: "Dauer"}, {
                    id: 3, name: "Niederschlagsmenge"}],
                filterLeft: "Gesamtintensität",
                filterLeftId: 0,
                filterRight: "Gesamtintensität",
                filterRightId: 0,
                options: utils.newBubbleOptions(),
                firstSeries: [],
                secondSeries: [],
                selectedLeftItem: null,
                selectedRightItem: null,
                idMapLeft: {},
                idMapRight: {}
            }
        },
        async created() {
            let leftParams = this.formParams(this.filterLeftId, this.selectedNumberLeft, this.selectedDateLeft)
            let rightParams = this.formParams(this.filterRightId, this.selectedNumberRight, this.selectedDateRight)
            await this.getLeftRangeEvents(leftParams)
            await this.getRightRangeEvents(rightParams)

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
                    end: utils.format_date(selectedDateRange[1])
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
                await this.getLeftRangeEvents(leftParams)
                await this.getRightRangeEvents(rightRarams)

                this.firstSeries = this.leftRangeEvents;
                this.secondSeries = this.rightRangeEvents;
                this.$refs.firstChart.updateSeries(this.firstSeries);
                this.$refs.secondChart.updateSeries(this.secondSeries);
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
                    + "<span> ID: " + item[3] + "</span> <br>"
                    + "<span> Anfang: " + utils.format_date(new Date(item[0])) + "</span>"
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
        padding: 8px;
    }

    .charts {
        display: flex;
        justify-content: space-around;
    }

    .timespanConfiguration {
        background-color: lightgoldenrodyellow;
        padding: 16px 8px;
        border: solid 1px orange;
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
        min-width: 250px;
        max-width: 250px;
        border: solid 1px yellowgreen;
        margin: 16px;
    }

    .filterItem {
        padding: 8px;
        text-align: center;
        cursor: pointer;
    }

    .filterItem:hover {
        background-color: #c7da9f;
    }

</style>