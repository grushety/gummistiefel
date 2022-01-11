<template>
    <div class="mainPage">
        <div class="pageTabs">
            <p class="compareView viewTab" :class="{'selected': compareView}" @click="selectView(0)">Daten in zwei Perioden
                vergleichen</p>
            <p class="commonView viewTab" :class="{'selected': commonView}" @click="selectView(1)">Datenübersicht</p>
        </div>
        <div class="commonViewContent" v-if="commonView">
            <div class="filters">
                <FilterPanel type="strong" filter-name="Starkereignisse" :filter="strongEventsFilter"/>
                <FilterPanel type="extrem" filter-name="Extremereignisse" :filter="extremEventsFilter"/>
            </div>
            <div class="tabs">
                <p class="tab" :class="showMainGraph? 'selected': ''" @click="setShowMain">Main Graph</p>
                <p class="tab" :class="showKMaxGraph? 'selected': ''" @click="setShowKMax">K- Exteme Ereignisse
                    Graph</p>
                <p class="tab" :class="showBoxPlot? 'selected': ''" @click="setShowBoxPlot">K- BoxPlot </p>
            </div>
            <div class="chart">
                <MainChart v-if="showMainGraph"/>
                <MaxValueChart v-if="showKMaxGraph"/>
                <BoxPlotChart v-if="showBoxPlot"/>
            </div>
            <div class="maps">
                <Map></Map>
            </div>
        </div>
        <div class="compareViewContent" v-if="compareView">
            <div class="compareGraphs">
                <ChartComparison/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import FilterPanel from "../components/filters/FilterPanel";
    import MainChart from "../components/charts/MainChart"
    import MaxValueChart from "../components/charts/MaxValueChart";
    import BoxPlotChart from "../components/charts/BoxPlotChart";
    import ChartComparison from "../components/charts/ChartComparison";
    import Map from "../components/Map";

    export default {
        name: "StartPage",
        components: {
            FilterPanel,
            MainChart,
            MaxValueChart,
            ChartComparison,
            BoxPlotChart,
            Map,
        },
        data() {
            return {
                showMainGraph: true,
                showKMaxGraph: false,
                showBoxPlot: false,
                compareView: true,
                commonView: false,
            }
        },
        computed: {
            ...mapState(['strongEventsFilter', 'extremEventsFilter']),
        },
        methods: {
            setShowMain() {
                this.showMainGraph = true;
                this.showKMaxGraph = false;
                this.showBoxPlot = false;

            },
            setShowKMax() {
                this.showMainGraph = false;
                this.showKMaxGraph = true;
                this.showBoxPlot = false;
            },
            setShowBoxPlot() {
                this.showMainGraph = false;
                this.showKMaxGraph = false;
                this.showBoxPlot = true;
            },
            selectView(index) {
                if (index === 0) {
                    this.compareView = true;
                    this.commonView = false;
                } else {
                    this.compareView = false;
                    this.commonView = true;
                }
            },
        }
    }
</script>

<style scoped>
    .pageTabs{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .viewTab{
        padding: 8px 0;
        margin: 0;
    }
    .viewTab:hover{
        cursor:pointer;
    }
    .filters {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }

    .tabs {
        align-items: center;
        width: 100%;
        margin-bottom: 24px;
    }

    .tab {
        padding: 8px 16px;
        margin: 0 4px;
        border: 1px solid lightgreen;
        border-radius: 4px;
        max-height: 20px;
        min-width: 60px;
        background-color: rgba(144, 238, 144, 0.24);
        display: inline-flex;
    }

    .selected {
        background-color: lightgreen;
    }

    .maps {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .compareGraphs {
        padding-bottom: 16px;
    }

    .tab:hover {
        cursor: pointer;
        background-color: rgba(133, 206, 144, 0.71);
    }

</style>