<template>
    <div class="mainPage">
        <div class="pageTabs">
            <p class="commonView viewTab" :class="{'selected': commonView}" @click="selectView(1)">Datenübersicht</p>
            <p class="compareView viewTab" :class="{'selected': compareView}" @click="selectView(0)">Daten in zwei Perioden
                vergleichen</p>
        </div>
        <div class="commonViewContent" v-if="commonView">
            <div class="filters">
                <FilterPanel/>
            </div>
            <div class="tabs">
                <p class="tab" :class="showMainGraph? 'selected': ''" @click="setShowMain">Main Graph</p>
                <p class="tab" :class="showKMaxGraph? 'selected': ''" @click="setShowKMax">K- Extreme Ereignisse
                    Graph</p>
                <!--<p class="tab" :class="showBoxPlot? 'selected': ''" @click="setShowBoxPlot">K- BoxPlot </p>-->
            </div>
            <div class="chart">
                <MainChart v-if="showMainGraph"/>
                <MaxValueChart v-if="showKMaxGraph" @setMap="setMapSingleView"/>
                <BoxPlotChart v-if="showBoxPlot"/>
            </div>
            <div v-if="singleMapId" class="maps">
                <Map :id="singleMapId" :key="singleMapId" />
            </div>
        </div>
        <div class="compareViewContent" v-if="compareView">
            <div class="compareGraphs">
                <ChartComparison @setMap="setMapDoubleView"/>
            </div>
            <button v-if="leftMapId && rightMapId" @click="playBothMaps" style="margin-bottom:10px">Beide Abspielen</button>
            <div class="maps" v-if="leftMapId && rightMapId" :key="leftMapId + '' + rightMapId">
                <Map :id="leftMapId" class="map" ref="map1" />
                <Map :id="rightMapId" class="map" ref="map2" />
            </div>
        </div>
        <br>
        <br>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
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
                compareView: false,
                commonView: true,
                singleMapId: null,
                leftMapId: null,
                rightMapId: null,
            }
        },
        created() {
           this.getAllEvents();
        },
        computed: {
            ...mapState(['strongEventsFilter', 'extremEventsFilter', 'allEvents']),
        },
        methods: {
            ...mapActions(["getAllEvents"]),
            playBothMaps() {
                console.log("PLAY BOTH")
                this.$refs.map1.play();
                this.$refs.map2.play();
            },
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
            setMapSingleView(id){
                this.singleMapId = id;
            },
            setMapDoubleView(idLeft, idRight){
                console.log(idLeft, idRight)
                this.leftMapId=idLeft;
                this.rightMapId=idRight;
            }
        }
    }
</script>

<style scoped>
    .map {
        display: inline-block;
        width: calc(50% - 40px);
        padding: 0 20px;
    }

    .pageTabs{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .viewTab{
        padding: 8px 0;
        margin: 0;
        font-weight: 600;
    }
    .viewTab:hover{
        cursor:pointer;
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
        font-weight: 500;
    }

    .selected {
        background-color: lightgreen;
    }

    .compareGraphs {
        padding-bottom: 16px;
    }

    .tab:hover {
        cursor: pointer;
        background-color: rgba(133, 206, 144, 0.71);
    }


</style>