<template>
    <div class="filterPanel">
        <div v-if="showEdit" class="filterConfiguration showGrid">
            <div class="Startereignisse Konfigurationen">
                <div class="subtitle"> Starkereignisse konfigurieren</div>
                <RangeSlider :max-value="maxPrec"
                             :min-value="minPrec"
                             :is-enabled="sprecEnabled"
                             :default-value="sprec"
                             title="Max Niederschlagsmenge"
                             @input="setSprec"
                             @change="sprecEnabled = !sprecEnabled"/>
                <RangeSlider :max-value="maxSi"
                             :min-value="minSi"
                             :is-enabled="ssiEnabled"
                             :step="0.01"
                             :default-value="ssi"
                             title="Gesamtintensität"
                             @input="setSsi"
                             @change="ssiEnabled = !ssiEnabled"/>
                <RangeSlider :max-value="maxArea"
                             :min-value="minArea"
                             :is-enabled="sareaEnabled"
                             :default-value="sarea"
                             title="Räumliche Ausdehnung"
                             @input="setSarea"
                             @change="sareaEnabled = !sareaEnabled"/>
                <RangeSlider :max-value="maxLength"
                             :min-value="minLength"
                             :is-enabled="slengthEnabled"
                             :default-value="slength"
                             title="Dauer"
                             @input="setSlength"
                             @change="slengthEnabled = !slengthEnabled"/>
            </div>
            <div class="Extremereignisse Konfigurationen">
                <div class="subtitle"> Extremereignisse konfigurieren</div>
                <RangeSlider :max-value="maxPrec"
                             :min-value="eMinPrec"
                             :is-enabled="eprecEnabled"
                             :default-value="eprec"
                             title="Max Niederschlagsmenge"
                             @input="setEprec"
                             @change="eprecEnabled = !eprecEnabled"/>
                <RangeSlider :max-value="maxSi"
                             :min-value="eMinSi"
                             :is-enabled="esiEnabled"
                             :step="0.01"
                             :default-value="esi"
                             title="Gesamtintensität"
                             @input="setEsi"
                             @change="esiEnabled = !esiEnabled"/>
                <RangeSlider :max-value="maxArea"
                             :min-value="eMinArea"
                             :is-enabled="eareaEnabled"
                             :default-value="earea"
                             title="Räumliche Ausdehnung"
                             @input="setEarea"
                             @change="eareaEnabled = !eareaEnabled"/>
                <RangeSlider :max-value="maxLength"
                             :min-value="eMinLength"
                             :is-enabled="elengthEnabled"
                             :default-value="elength"
                             title="Dauer"
                             @input="setElength"
                             @change="elengthEnabled = !elengthEnabled"/>
            </div>
            <button @click="setFilters()">speichern</button>
        </div>
        <div v-else>
            <div class="showGrid">
                <p class="filterDescription" v-html="textStrong"></p>
                <p class="filterDescription" v-html="textExtrem"></p>
                <div class="buttonPanel">
                    <button @click="showEdit=true">bearbeiten</button>
                    <button @click="resetFilter">alle Filter zurücksetzen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RangeSlider from "./RangeSlider";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "FilterPanel",
        components: {
            RangeSlider,
        },
        data() {
            return {
                showEdit: false,

                sprecEnabled: false,
                sprec: 0,
                eprecEnabled: false,
                eprec: 0,
                minPrec: 0,
                maxPrec: 193.5,

                ssiEnabled: false,
                ssi: 0,
                esiEnabled: false,
                esi: this.eMinSi,
                minSi: 0,
                maxSi: 2.4,

                sareaEnabled: false,
                sarea: 0,
                eareaEnabled: false,
                earea: this.eMinArea,
                minArea: 0,
                maxArea: 17,

                slengthEnabled: false,
                slength: 0,
                elengthEnabled: false,
                elength: this.eMinLength,
                minLength: 0,
                maxLength: 74,
            }
        },
        created() {
            this.updateFilterValues()
        },
        watch: {
          filter: {
              deep: true,
              handler(){
                  this.updateFilterValues();
              }
          }
        },
        computed: {
            ...mapState(["filter"]),

            eMinArea() {
                return Number(this.sarea);
            },
            eMinSi() {
                return Number(this.ssi);
            },
            eMinPrec() {
                return Number(this.sprec);
            },
            eMinLength() {
                return Number(this.slength);
            },
            textStrong() {
                if (!this.slengthEnabled && !this.sareaEnabled && !this.sprecEnabled && !this.ssiEnabled) {
                    return "Alle Ereignisse als Starkereignisse definiert."
                }
                let s = "Starkereignisse sind definiert als alle Ereignisse die <br>";
                if (this.sprecEnabled) {
                    s = s + "maximale Niederschlagsmenge größer als  " + this.sprec + " "
                }
                if (this.slengthEnabled) {
                    s = s + "Dauer größer als " + this.slength + " "
                }
                if (this.sareaEnabled) {
                    s = s + "räumliche Ausdehnung größer als " + this.sarea + " "
                }
                if (this.ssiEnabled) {
                    s = s + "Gesamtintensität größer als " + this.ssi + " "
                }
                s = s + "haben.";
                return s;
            },
            textExtrem() {
                if (!(this.elengthEnabled || this.eareaEnabled || this.eprecEnabled || this.esiEnabled)) {
                    return "Alle Ereignisse als Extremereignisse definiert."
                }
                let s = "Extremereignisse sind definiert als alle Ereignisse die <br>";
                if (this.eprecEnabled) {
                    s = s + "maximale Niederschlagsmenge größer als  " + this.eprec + " "
                }
                if (this.elengthEnabled) {
                    s = s + "Dauer größer als " + this.elength + " "
                }
                if (this.eareaEnabled) {
                    s = s + "räumliche Ausdehnung größer als " + this.earea + " "
                }
                if (this.esiEnabled) {
                    s = s + "Gesamtintensität größer als " + this.esi + " "
                }
                s = s + "haben.";
                return s;
            }
        },
        methods: {
            ...mapActions(['updateFilter', 'resetFilter']),
            setSprec(prec) {
                this.sprec = prec;
            },
            setEprec(prec) {
                this.eprec = prec;
            },
            setSsi(severity) {
                this.ssi = severity;
            },
            setEsi(severity) {
                this.esi = severity;
            },
            setSarea(area) {
                this.sarea = area;
            },
            setEarea(area) {
                this.earea = area;
            },
            setSlength(duration) {
                this.slength = duration;
            },
            setElength(duration) {
                this.elength = duration;
            },
            setFilters() {
                let filters = {};
                if (this.sprecEnabled) {
                    filters['sprec'] = Number(this.sprec);
                }
                if (this.eprecEnabled) {
                    filters['eprec'] = Number(this.eprec);
                }
                if (this.ssiEnabled) {
                    filters['ssi'] = Number(this.ssi);
                }
                if (this.esiEnabled) {
                    filters['esi'] = Number(this.esi);
                }
                if (this.sareaEnabled) {
                    filters['sarea'] = Number(this.sarea);
                }
                if (this.eareaEnabled) {
                    filters['earea'] = Number(this.earea);
                }
                if (this.slengthEnabled) {
                    filters['slength'] = Number(this.slength);
                }
                if (this.elengthEnabled) {
                    filters['elength'] = Number(this.elength);
                }
                if (this.eprec < this.sprec) {
                    filters['eprec'] = Number(this.sprec);
                }
                if (this.esi < this.ssi) {
                    filters['esi'] = Number(this.ssi);
                }
                if (this.earea < this.sarea) {
                    filters['earea'] = Number(this.sarea);
                }
                if (this.elength < this.slength) {
                    filters['elength'] = Number(this.slength);
                }
                this.updateFilter(filters)
                this.showEdit = false;
            },

            updateFilterValues(){
                this.sprecEnabled = "sprec" in this.filter;
                this.sprec = this.sprecEnabled ? this.filter.sprec : 0;
                this.eprecEnabled = "eprec" in this.filter;
                this.eprec = this.eprecEnabled ? this.filter.eprec : this.eMinPrec;
                this.ssiEnabled = "ssi" in this.filter;
                this.ssi = this.ssiEnabled ? this.filter.ssi : 0;
                this.esiEnabled = "esi" in this.filter;
                this.esi = this.esiEnabled ? this.filter.esi : this.eMinSi;
                this.sareaEnabled = "sarea" in this.filter;
                this.sarea = this.sareaEnabled ? this.filter.sarea : 0;
                this.eareaEnabled = "earea" in this.filter;
                this.earea = this.eareaEnabled ? this.filter.earea : this.eMinArea;
                this.slengthEnabled = "slength" in this.filter;
                this.slength = this.slengthEnabled ? this.filter.slength : 0;
                this.elengthEnabled = "elength" in this.filter;
                this.elength = this.elengthEnabled ? this.filter.elength : this.eMinLength;
            }
        }
    }
</script>


<style scoped>
    .filterPanel {
        border: 2px solid lightgreen;
        border-radius: 4px;
        width: 100%;
        margin: 16px 0;
    }

    .showGrid {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        justify-items: start;
        align-items: center;
    }

    button {
        padding: 2px 8px;
        border: 2px solid #bababa;
        border-radius: 1px;
        background-color: rgba(219, 219, 219, 0.24);

    }

    .filterDescription {
        padding: 4px 12px;
        font-weight: 600;
        font-size: 14px;
    }
    .subtitle{
        margin-bottom: 8px;
        font-weight: 600;
    }
</style>