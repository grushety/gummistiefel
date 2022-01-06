<template>
    <div class="maxValueChart">
        <apexchart
                width="500"
                :options="options" :series="series">
        </apexchart>
    </div>
</template>

<script>
    export default {
        name: "MaxValueChart",
        data() {
            return {
                series: [{name: 'Bubble1', data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                        min: 10,
                        max: 60
                    })},
                    {name: 'Bubble2', data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                            min: 10,
                            max: 60
                        })},],
                options: {
                    chart: {
                        height: 350,
                        type: 'bubble',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        opacity: 0.8
                    },
                    title: {
                        text: 'Simple Bubble Chart'
                    },
                    xaxis: {
                        tickAmount: 12,
                        type: 'category',
                        labels: {
                            format: 'dd/MM',
                            formatter: function (value, timestamp) {
                                return new Date(timestamp) // The formatter function overrides format property
                            },
                        }
                    },
                    yaxis: {
                        max: 70
                    }
                },
            }

        },
        methods: {
            generateData(baseval, count, yrange) {
                let i = 0;
                let series = [];
                while (i < count) {
                    let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
                    let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
                    let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

                    series.push([x, y, z]);
                    baseval += 86400000;
                    i++;
                }
                return series;
            }
        }
    }
</script>

<style scoped>

</style>