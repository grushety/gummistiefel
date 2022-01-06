<template>
    <div class="range-slider">
        <input type="checkbox" :checked="isEnabled" @input="changeStatus" class="flag col-1" >
        <div class="currentData">
            <p >{{title}}</p> <p v-if="isEnabled">: {{value}}</p>
        </div>
        <p>{{minValue}}</p>
        <input type="range" :min="minValue" :max="maxValue" :disabled="!isEnabled"
               v-model="value" class="slider" id="precSlider" :step="step"
               @input="setValue" >
        <p>{{maxValue}}</p>
    </div>
</template>

<script>
    export default {
        name: "RangeSlider",
        props:{
            isEnabled: Boolean,
            minValue: Number,
            maxValue: Number,
            defaultValue: Number,
            title: String,
            step:{
                type:Number,
                default: 1,
            },
        },
        data(){
            return{
                value: this.defaultValue,
            }
        },
        methods: {
            setValue(){
                this.$emit('input', this.value)
            },
            changeStatus(){
                this.$emit('change')
            },
        }
    }
</script>

<style scoped>
    .range-slider{
        display: flex;
        justify-content: flex-start;
        align-content: start;
    }
    .currentData{
        display: inline-flex;
        margin-right: 20px;
        min-width: 220px;
    }
    .flag{
        margin: 8px;
    }
    p{
        margin: 4px;
        padding:0;
    }
</style>