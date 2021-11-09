<template>
    <div>
        <div class="selectPanel">
            <div class="check_group">
                <input type="checkbox" v-model="showLength" id="length" @input="changeLengthVisibility">
                <label for="length">Duration</label>
            </div>
            <div class="check_group">
                <input type="checkbox" v-model="showSeverity" id="severity" @input="changeSeverityVisibility" >
                <label for="severity">Severity</label>
            </div>
            <div class="check_group">
                <input type="checkbox" v-model="showArea" id="area" @input="changeAreaVisibility">
                <label for="area">Area</label>
            </div>
        </div>
        <line-chart :labels="labels" :datasets="datasets"></line-chart>
    </div>
</template>

<script>
    export default {
        name: "DetailsGraph",
        props: {
            events: Array,
        },
        data() {
            return {
                showLength: false,
                showSeverity: false,
                showArea: false,
                datasets: []
            }
        },
        computed: {
            labels() {
                return this.events.map(it => it.date);
            },
            lengths() {
                let l = this.events.map(it => it.size);
                return {
                    label: "Duration",
                    data: l,
                    borderColor: '#814bf8',
                };
            },
            areas() {
                let a = this.events.map(it => it.area);
                return  {
                    label: "Area",
                    data: a,
                    borderColor: '#85f84e',
                }
            },
            severities() {
                let s = this.events.map(it => it.si);
                return {
                    label: "Severity",
                    data: s,
                    borderColor: '#f81d16',
                }
            },
        },
        methods: {
            changeVisibility(item, toVisible){
                let index = this.datasets.indexOf(item);
                if (!toVisible){
                    if(index < 0 )
                        this.datasets.push(item)
                }
                else {
                    if(index!==-1) {
                        this.datasets.splice(index, 1);
                    }
                }
                console.log(this.datasets)
            },
            changeLengthVisibility(){
                console.log(this.lengths)
                this.changeVisibility(this.lengths, this.showLength)
                console.log(this.datasets)
            },
            changeAreaVisibility(){
                this.changeVisibility(this.areas, this.showArea)
            },
            changeSeverityVisibility(){
                this.changeVisibility(this.severities, this.showSeverity)
            }
        }
    }
</script>

<style scoped>
    .selectPanel {
        display: inline-flex;
    }
</style>