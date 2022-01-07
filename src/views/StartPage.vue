<template>
    <div class="mainPage">
        <div class="filters">
            <FilterPanel type="strong" filter-name="Starkereignisse" :filter="strongEventsFilter"/>
            <FilterPanel type="extrem" filter-name="Extremereignisse" :filter="extremEventsFilter"/>
        </div>
        <div class="tabs">
            <p class="tab" :class="showMainGraph? 'selected': ''" @click="setShowMain">Main Graph</p>
            <p class="tab" :class="showKMaxGraph? 'selected': ''" @click="setShowKMax">K- Exteme Ereignisse Graph</p>
        </div>
        <div class="chart">
            <MainChart v-if="showMainGraph"/>
            <MaxValueChart v-if="showKMaxGraph"/>
        </div>
        <div class="maps">
            Hier kommen die Karte dran
        </div>
        <div class="compareGraphs">
            Hier kommen die Graphen zu vergleichen
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import FilterPanel from "../components/FilterPanel";
    import MainChart from "../components/MainChart"
    import MaxValueChart from "../components/MaxValueChart";

    export default {
        name: "StartPage",
        components: {
            FilterPanel,
            MainChart,
            MaxValueChart,
        },
        data() {
            return{
                showMainGraph:true,
                showKMaxGraph:false,
            }
        },
        computed: {
            ...mapState(['strongEventsFilter', 'extremEventsFilter']),
        },
        methods: {
            setShowMain(){
                this.showMainGraph=true;
                this.showKMaxGraph=false;
            },
            setShowKMax(){
                this.showMainGraph=false;
                this.showKMaxGraph=true;
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
</style>