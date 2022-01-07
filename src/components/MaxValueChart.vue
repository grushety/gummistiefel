<template>
    <div class="maxValueChart">
        <div class="controlPanel">
            <label for="nOfExtremEvents"> Legen Sie die Anzahl der anzuzeigenden Extremereignisse fest </label>
            <input type="number" v-model="number" @input="updateChart()" id="nOfExtremEvents" min=0 max=20/>
        </div>
        <div class="chart">
        <apexchart
                ref="maxChart"
                width="500"
                :options="options" :series="series">
        </apexchart>
        </div>
    </div>
</template>

<script>
    import utils from "../utils";
    export default {
        name: "MaxValueChart",
        data() {
            return {
                number: 5,
                series: [],
                options: {},
            }
        },
        created(){
            this.options=utils.newBubbleOptions();
            this.updateChart();
        },
        methods: {
            updateChart(){
                let dates = []
                for(let i = 0; i<this.number; i++){
                    const d = this.randomDate(new Date(2012, 0, 1), new Date());
                    console.log(d);
                    dates.push(d)
                }
                this.series = utils.generateDataForDays(dates);
                this.$refs.maxChart.updateSeries(this.series);
            },
            randomDate() {
                let minDate = new Date("1 Jan 1971 GMT");
                let maxDate = new Date("31 Dec 2017 GMT");
                return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
            }
        }
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
    label{
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 8px ;
    }
</style>