<template>
    <div class="filterPanel">
        <div v-if="showEdit" class="filterConfiguration">
            <RangeSlider :max-value="maxPrec"
                         :min-value="minPrec"
                         :is-enabled="precEnabled"
                         :default-value="precValue"
                         title="Max Niederschlagsmenge"
                         @input="setPrec"
                         @change="precEnabled = !precEnabled"/>
            <RangeSlider :max-value="maxSeverity"
                         :min-value="minSeverity"
                         :is-enabled="severityEnabled"
                         :step="0.01"
                         :default-value="severityValue"
                         title="Gesamtintensität"
                         @input="setSeverity"
                         @change="severityEnabled = !severityEnabled"/>
            <RangeSlider :max-value="maxArea"
                         :min-value="minArea"
                         :is-enabled="areaEnabled"
                         :default-value="areaValue"
                         title="Räumliche Ausdehnung"
                         @input="setArea"
                         @change="areaEnabled = !areaEnabled"/>
            <RangeSlider :max-value="maxDuration"
                         :min-value="minDuration"
                         :is-enabled="durationEnabled"
                         :default-value="durationValue"
                         title="Dauer"
                         @input="setDuration"
                         @change="durationEnabled = !durationEnabled"/>
            <button @click="setFilters()">Save</button>
        </div>
        <div v-else>
            <p class="filterDescription" v-html="text"></p>
            <button @click="showEdit=true">Edit</button>
        </div>
    </div>
</template>

<script>
    import RangeSlider from "./RangeSlider";
    import {mapActions} from "vuex";

    export default {
        name: "FilterPanel",
        components: {
            RangeSlider,
        },
        props: {
            type: String,
            filterName: String,
            filter: Object,
        },
        data() {
            return {
                showEdit: false,
                precEnabled: "maxPrec" in this.filter,
                precValue: this.precEnabled ? this.filter.maxPrec : 50,
                minPrec: 0,
                maxPrec: 100,
                severityEnabled: "severity" in this.filter,
                severityValue: this.severityEnabled ? this.filter.severity : 0.5,
                minSeverity: 0,
                maxSeverity: 1,
                areaEnabled: "area" in this.filter,
                areaValue: this.areaEnabled ? this.filter.area : 3,
                minArea: 0,
                maxArea: 30,
                durationEnabled: "duration" in this.filter,
                durationValue: this.durationEnabled? this.filter.duration: 5,
                minDuration: 0,
                maxDuration: 80,
            }
        },
        computed: {
           text() {
               if(!this.durationEnabled && !this.areaEnabled && !this.precEnabled && !this.severityEnabled){
                   return "Alle Ereignisse als '" + this.filterName + "' definiert."
               }
               let s = "'" + this.filterName + "' sind definiert als alle Ereignisse die <br>";
               if(this.precEnabled){
                   s = s + "maximale Niederschlagsmenge größer als  " + this.precValue + "  <br>"
               }
               if(this.durationEnabled){
                   s = s + "Dauer größer als " + this.durationValue + " <br> "
               }
               if(this.areaEnabled){
                   s = s + "räumliche Ausdehnung größer als " + this.areaValue + " <br> "
               }
               if(this.severityEnabled){
                   s = s + "Gesamtintensität größer als " + this.severityValue + " <br> "
               }
               s = s + "haben.";
               return s;
           }
        },
        methods: {
            ...mapActions(['updateStrongEventsFilters', 'updateExtremEventsFilters']),
            setPrec(prec) {
                this.precValue = prec;
            },
            setSeverity(severity) {
                this.severityValue = severity;
            },
            setArea(area) {
                this.areaValue = area;
            },
            setDuration(duration) {
                this.durationValue = duration;
            },
            setFilters() {
                let filters = {};
                if (this.precEnabled) {
                    filters['maxPrec'] = Number(this.precValue);
                }
                if (this.severityEnabled) {
                    filters['severity'] = Number(this.severityValue);
                }
                if (this.areaEnabled) {
                    filters['area'] = Number(this.areaValue);
                }
                if (this.durationEnabled) {
                    filters['duration'] = Number(this.durationValue);
                }
                if (this.type === "strong") {
                    this.updateStrongEventsFilters(filters)
                }
                if (this.type === "extrem") {
                    this.updateExtremEventsFilters(filters)
                }
                this.showEdit = false;
            }

        }
    }
</script>


<style scoped>
    .filterPanel {
        display: flex;
        flex-direction: column;
        border: 2px solid lightgreen;
        width: 480px;
        border-radius: 4px;
        margin: 4px;
        padding-bottom: 36px;
        position: relative;
    }

    button {
        width: 80px;
        padding: 2px 8px;
        border: 2px solid #bababa;
        border-radius: 1px;
        max-height: 24px;
        background-color: rgba(219, 219, 219, 0.24);
        position: absolute;
        bottom:2px;
        right:2px;

    }
    .filterDescription{
        padding:4px;
        font-weight: 600;
        font-size: 14px;
    }
</style>