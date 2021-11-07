<template>
    <div id="app">
        <Header/>
        <div class="page">
            <router-view></router-view>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

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
        padding: 8px;
    }

    .page {
        padding: 8px;
    }

</style>
