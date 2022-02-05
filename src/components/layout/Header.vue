<template>
    <div class="header">
        <div class="left">
            <div class="header-title">
                <h3 class="title">Visual representation of the "Gummistiefel" project</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header {
        position: relative;
        top: 0;
        left: 0;
        padding: 16px;
        width: 100%;
        background-color: #ECEFF1;
    }

    .title {
        display: inline;
        color: #505050;
        font: Bold 18px/26px Open Sans;
        margin-left: 16px;
        width: 100%;
    }

    a {
        border: solid 1px lightcyan;
        padding: 4px;
        text-decoration: none;
        color: black
    }

</style>
