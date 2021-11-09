<template>
    <div class="mapWrapper">
        <gmap-map
                :zoom="8"
                :center="center"
                ref="map"
                style="width:60%;  height: 500px;">
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in items"
                    :position="m.position"
                    @click="center=m.position"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: "EventMap",
        props: {
            items: Array,
            bounds: Object,
        },
        data() {
            return {
            }
        },
        computed: {
            centerIndex() {
                return this.items.length?~~(this.items.length/2) : 0;
            },
            center(){
                console.log(this.centerIndex)
                return this.items[this.centerIndex].position
            }
        },

    }
</script>

<style scoped>
.mapWrapper{
    padding: 24px;
    margin: 16px;
}
</style>