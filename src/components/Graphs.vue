<template>
    <div>
        Hier sollen unterschiedliche graphen sein
    </div>
</template>

<script>
    import { Bar } from 'vue-chartjs'
    export default {
        name: "Graphs",
        extends: Bar,

        mounted () {
            //this.renderChart(data, options)
        }

    }
</script>

<style scoped>

</style>