<template>
    <div class="chartComparison">
        <div class="timespanConfiguration">
            <div class="selectedTimespans param">
                <div class="gridWrapper">
                    <div class="timespan"> Erste Zeitspanne: </div>
                    <input class="timespanInput" v-model="firstTimespan" readonly/>
                    <i class="fa fa-pencil-alt" @click="editFirst" aria-hidden="true"></i>
                    <i class="fa fa-times" @click="removeFirstTimespan" aria-hidden="true"></i>
                    <div class="timespan"> Zwiete Zeitspanne:</div>
                    <input class="timespanInput" v-model="secondTimespan" readonly />
                    <i class="fa fa-pencil-alt" @click="editSecond" aria-hidden="true"></i>
                    <i class="fa fa-times" @click="removeSecondTimespan" aria-hidden="true"></i>
                </div>
            </div>
            <div class="timeConfigPanel">
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
                <div class="datePicker param">
                    <label>Startdatum für Periode auswählen </label>
                    <DatePicker v-model="selectedDate" @selected="changeStartDate"/>
                </div>
            </div>
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
                selectedType: 'years',
                selectedNumber: '12',
                firstTimespan: '01 Jan 1980 - 01 Jan 1992',
                secondTimespan: '01 Jan 2000 - 01 Jan 2012',
                editingFirst: false,
                editingLast:false,
                selectedDate: new Date('1971, 1,  1'),
                options: [
                    {id: 1, name: 'years'},
                    {id: 2, name: 'months'},
                    {id: 3, name: 'days'}
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

            },
            removeFirstTimespan() {
                this.firstTimespan = "";
            },
            removeSecondTimespan() {
                this.secondTimespan = "";
            },
            calculateEndDate(startDate) {
                console.log("Start string " + startDate);
                let start = new Date(startDate);
                console.log("Start date " + start);
                let end = null;
                if (this.selectedType === 'years') {
                    end = start.setFullYear(start.getFullYear() + this.selectedNumber);
                    console.log("End date " + end);
                    return end;
                }
                if (this.selectedType === "months") {
                    end = start.setMonth(start.getMonth() + this.selectedNumber);
                    console.log("End date " + end);
                    return end;
                }
                if (this.selectedType === "days") {
                    end = start.setDate(start.getDate() + this.selectedNumber);
                    console.log("End date " + end);
                    return end;
                }
            },
            editFirst() {

            },
            editSecond() {

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
        display: flex;
        justify-content: space-between;
        background-color: lightgoldenrodyellow;
        border: solid 1px palegoldenrod;
        padding-right: 40px;
    }

    i {
        font-size: 10px;
    }

    .gridWrapper {
        display: grid;
        grid-template-columns: 150px 190px 30px 30px;
        justify-items: center;
        align-items: center;
    }

    .timespanInput{
        padding: 4px;
    }
    .fa-pencil-alt{

    }
</style>