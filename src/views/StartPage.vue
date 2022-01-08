<template>
    <div class="mainPage">
        <div class="filters">
            <FilterPanel type="strong" filter-name="Starkereignisse" :filter="strongEventsFilter"/>
            <FilterPanel type="extrem" filter-name="Extremereignisse" :filter="extremEventsFilter"/>
        </div>
        <div class="tabs">
            <p class="tab" :class="showMainGraph? 'selected': ''" @click="setShowMain">Main Graph</p>
            <p class="tab" :class="showKMaxGraph? 'selected': ''" @click="setShowKMax">K- Exteme Ereignisse Graph</p>
            <p class="tab" :class="showBoxPlot? 'selected': ''" @click="setShowBoxPlot">K- BoxPlot </p>
        </div>
        <div class="chart">
            <MainChart v-if="showMainGraph"/>
            <MaxValueChart v-if="showKMaxGraph"/>

        </div>
        <div class="maps">
            <Map></Map>
        </div>
        <div class="compareGraphs">
            <ChartComparison/>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import FilterPanel from "../components/filters/FilterPanel";
    import MainChart from "../components/charts/MainChart"
    import MaxValueChart from "../components/charts/MaxValueChart";
    import ChartComparison from "../components/charts/ChartComparison";
    import Map from "../components/Map";

    export default {
        name: "StartPage",
        components: {
            FilterPanel,
            MainChart,
            MaxValueChart,
            ChartComparison,
            Map,
        },
        data() {
            return{
                showMainGraph:true,
                showKMaxGraph:false,
                showBoxPlot:false,
            }
        },
        computed: {
            ...mapState(['strongEventsFilter', 'extremEventsFilter']),
        },
        methods: {
            setShowMain(){
                this.showMainGraph=true;
                this.showKMaxGraph=false;
                this.showBoxPlot = false;

            },
            setShowKMax(){
                this.showMainGraph=false;
                this.showKMaxGraph=true;
                this.showBoxPlot = false;
            },
            setShowBoxPlot(){
                this.showMainGraph=false;
                this.showKMaxGraph=false;
                this.showBoxPlot = true;
            }
        }
    }
</script>

<style scoped>
    .filters{
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }
    .tabs {
        align-items: center;
        width: 100%;
        margin-bottom:24px;
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
    .maps{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .compareGraphs{
        padding-bottom: 16px;
    }

</style>