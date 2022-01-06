<template>
    <div class="mainChart">
        <apexchart
                width="500"
                :options="options" :series="series">
        </apexchart>

    </div>
</template>

<script>
    export default {
        name: "MainChart",
        props: {
            graphType: {
                type:String,
                default: "year"
            }
        },
        data() {
            return {
                options: {
                    chart: {
                        type: 'bar',
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }

                    },
                    events: {
                        click: function(event, chartContext, config) {
                            console.log(chartContext);
                            console.log(config);
                            // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                        }
                    },
                    xaxis: {
                        categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                        ]
                    }
                },
                series: [
                    {name: 'Starkereignisse', data: [55, 62, 0, 66, 98, 72, 101, 0, 94, 50, 17, 30]},
                    {name: 'Extremereignisse', data: [22, 3, 15, 0, 9, 12, 24, 0, 9, 24, 13, 8]},
                ]
            }
        },
    }
</script>

<style scoped>
    .mainChart {
        align-content: center;
    }

</style>