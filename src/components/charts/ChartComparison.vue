<template>
    <div class="chartComparison">
        <div class="timespanConfiguration">
            <div class="flex">
            <div class="selectedTimespans param">
                <div class="selectItem param">
                    <label> Datengranularität auswählen <br>
                        <select class="form-control" v-model="selectedType" @change="changeType">
                            <option v-for="option in options" :key="option.id">{{ option.name }}</option>
                        </select>
                    </label>
                </div>
                <div class="inputItem param">
                    <label> Anzahl der Zeitelemente festlegen <br>
                        <input type="number" v-model="selectedNumber" @input="changeNumber" id="nOfExtremEvents" min=1
                               max=40/>
                    </label>
                </div>
            </div>
            <div class="timeConfigPanel">
                <div class="gridWrapper">
                    <div class="timespan"> Erste Zeitspanne:</div>
                    <input class="timespanInput" :class="{'selected': editingFirst}" v-model="firstTimespan" readonly/>
                    <div @click="editFirst()">
                        <i class="fa fa-pencil-alt" aria-hidden="true"></i>
                    </div>
                    <div @click="removeFirstTimespan()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div class="timespan"> Zwiete Zeitspanne:</div>
                    <input class="timespanInput" :class="{'selected': editingLast}" v-model="secondTimespan" readonly/>
                    <div @click="editSecond()">
                        <i class="fa fa-pencil-alt" aria-hidden="true"></i>
                    </div>
                    <div @click="removeSecondTimespan()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="datePicker param">
                    <label>Startdatum für Periode auswählen </label>
                    <DatePicker v-model="selectedDate" @selected="changeStartDate" :minimum-view="selectedType" />
                </div>
            </div>
            </div>
            <button>submit</button>
        </div>
        <div class="charts">
            <apexchart
                    ref="firstChart"
                    width="500"
                    :options="firstOptions" :series="firstSeries">
            </apexchart>
            <apexchart
                    ref="secondChart"
                    width="500"
                    :options="firstOptions" :series="secondSeries">
            </apexchart>

        </div>
    </div>
</template>

<script>
    import DatePicker from 'vuejs-datepicker';
    import utils from "../../utils";

    export default {
        name: "ChartComparison",
        components: {
            DatePicker,
        },
        data() {
            return {
                selectedType: 'year',
                selectedNumber: '12',
                firstTimespan: 'Jan 01 1980 - Jan 01 1992',
                secondTimespan: 'Jan 01 2000 - Jan 01 2012',
                editingFirst: false,
                editingLast: false,
                selectedDate: new Date('1971, 1,  1'),
                options: [
                    {id: 1, name: 'year'},
                    {id: 2, name: 'month'},
                    {id: 3, name: 'day'}
                ],
                firstOptions: utils.newStackedHistogramOptions(),
                secondOptions: utils.newStackedHistogramOptions(),
                firstSeries: [],
                secondSeries: [],
            }
        },
        created() {
            let series = utils.generateDataForAllYears();
            this.yearsCategories = utils.getAllYears();
            this.firstSeries = series;
            this.secondSeries = series;
            this.firstOptions.xaxis.categories = this.yearsCategories;
            this.secondOptions.xaxis.categories = this.yearsCategories;
        },
        computed: {},
        methods: {
            changeType() {
                console.log(this.selectedType)
            },
            changeNumber() {
                console.log(this.selectedNumber)
            },
            changeStartDate() {
                console.log(this.selectedDate);
                if (this.selectedNumber === '') {
                    this.$alert("Bitte die Anzahl der Timeintervalle angeben")
                }
                this.calculateEndDate(this.selectedDate)
                this.editingLast = false;
                this.editingFirst = false;
            },
            removeFirstTimespan() {
                this.firstTimespan = "";
            },
            removeSecondTimespan() {
                this.secondTimespan = "";
            },
            calculateEndDate(startDate) {
                console.log(startDate)
                let start = new Date(startDate);
                let end = null;
                if (this.selectedType === 'year') {
                    end = start.setFullYear(start.getFullYear() + this.selectedNumber);
                }
                if (this.selectedType === "month") {
                    end = start.setMonth(start.getMonth() + this.selectedNumber);
                }
                if (this.selectedType === "day") {
                    end = start.setDate(start.getDate() + this.selectedNumber);
                }
                let endFormated =new Date(end).toDateString().substring(4,15);
                let startFormated =start.toDateString().substring(4,15);
                let result = startFormated+ " - " + endFormated
                if(!this.editingFirst && !this.editingLast){
                    this.$alert("Bitte wählen Sie den Zeitraum zum Bearbeiten aus")
                }
                if(this.editingFirst){
                    this.firstTimespan = result;
                }
                if(this.editingLast){
                    this.secondTimespan= result;
                }

            },
            editFirst() {
                console.log("pressed editing first")
                this.editingFirst = true;
                this.editingLast = false;
            },
            editSecond() {
                console.log("pressed editing last")
                this.editingLast = true;
                this.editingFirst = false;
            },
        }
    }
</script>

<style scoped>
    .chartComparison {
        padding: 16px 4px;
    }

    .timeConfigPanel {
        display: flex;
        justify-items: flex-start;
    }

    .param {
        margin: 8px 16px;
        text-align: start;
    }

    select {
        width: 100%;
        padding: 3px;
        border-radius: 4px;
    }

    input, select {
        margin-top: 8px;
    }

    .vdp-datepicker {
        margin-top: 8px;
    }

    .charts {
        display: flex;
        justify-content: space-around;
    }

    .timespanConfiguration {
        background-color: lightgoldenrodyellow;
        border: solid 1px palegoldenrod;
        padding-right: 40px;
    }

    .flex{
        display: flex;
        justify-content: space-between;
    }

    i {
        font-size: 10px;
    }

    .gridWrapper {
        display: grid;
        grid-template-columns: 190px 30px 30px;
        justify-items: center;
        align-items: center;
    }

    .timespanInput {
        padding: 4px;
    }
    .timespan{
        grid-column:1/4;
        justify-self: flex-start;
    }

    .fa-pencil-alt {

    }

    .selected {
        border-color: black;
    }
</style>