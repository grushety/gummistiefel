<template>
    <div class = "header">
        <img id="logo" src="../assets/hu-logo.jpg" title="logo" :alt="'logo'">
        <div class="header-title">
            <h3 class="title">Visuelle Darstellung des Gummistiefelprojekts </h3>
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
        display: inline-flex;
        padding: 16px;
        width: 100%;
        background-color: #ECEFF1;
        align-items: center;
    }

    .title {
        display: inline;
        color: #505050;
        font: Bold 20px/27px Open Sans;
        margin-left: 16px;
    }

    #logo {
        width: 50px;
        border-radius: 50%;
    }

</style>
