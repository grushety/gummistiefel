<template>
    <div id="app">
        <Header/>
        <div class="page wrapper">
            <router-view></router-view>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from './components/layout/Header.vue'
    import Footer from './components/layout/Footer.vue'

    export default {
        name: 'App',
        components: {
            Header,
            Footer
        }
    }
</script>

<style>
    #app {
        font-family: Candara, Segoe UI Historic, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        color: #455A64;
        text-align: center;
    }
    html, body {
        height: 100%;
    }
    .wrapper {
        min-height: calc(100vh - 120px);
        margin: 0 auto -50px;
    }

    table {
        font-family: 'Open Sans', sans-serif;
        width: 750px;
        border-collapse: collapse;
        border: 1px solid #B0BEC5;
        border-radius: 8px;
        margin: 10px 10px 0 10px;
    }

    table th {
        text-align: left;
        padding: 8px;
        color: #455A64;
        background-color: #CFD8DC;
        min-width: 30px;
        font-family: "Segoe UI Historic", "fantasy";
    }
    thead{
      border-radius: 10px;
    }

    tr:hover {
        background-color: #B0BEC5;
        cursor: pointer;
    }

    table td {
        text-align: left;
        font-family: Segoe UI Historic, "fantasy";
        padding: 8px;
        border-right: 2px solid #CFD8DC;
    }

    table td:last-child {
        border-right: none;
    }

    table tbody tr:nth-child(2n) td {
        background: #ECEFF1;
    }

    td, th {
        overflow: hidden;
        text-overflow: "…";
    }

    h1 {
        padding: 0 8px;
        margin:0;
    }

    .page {
        padding: 0 8px 8px 8px;
    }
    button {
        padding: 8px 16px;
        margin: 0 4px;
        border: 2px solid lightgreen;
        border-radius: 4px;
        min-height: 36px;
        background-color: rgba(144, 238, 144, 0.24)
    }
    button:hover {
        background-color: rgba(133, 206, 144, 0.71);
        cursor: pointer;
    }
    button:active{
        background-color: rgba(133, 206, 144, 0.71);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 8px;
    }

    label {
        padding-bottom: 4px;
        font-family: Calibri, fantasy;
    }

    input {
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid darkgray;
        color: #455A64;
    }

    input:focus {
        box-shadow: none;
        outline: none;
        border: 2px solid #8a8a8a;
    }

    .controlPanel{
        background: lightgoldenrodyellow;
        padding: 16px 8px;
        border: solid 1px orange;
        text-align: center;
    }

    label{
        font-family: 'Open Sans', sans-serif;
    }


</style>
