export default {
    newBubbleOptions(){
        return {
            chart: {
                type: 'bubble',
                width: "800px"
            },
            toolbar: {
                show: true,
                offsetX: 20,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                    customIcons: []
                },
            },

            dataLabels: {
                enabled: true
            },
            xaxis: {
                type: 'datetime',
                tickAmount: 12,
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                }
            },


        };
    },

    newStackedHistogramOptions(){
        return {
            chart: {
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        customIcons: []
                    },
                },
                zoom: {
                    enabled: true
                }

            },
            active: {
                allowMultipleDataPointsSelection: true,
            },
            fill: {
                colors: ['#5fbce9', '#f81d16']
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        }
    },

    getAllMonth() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },

    getExampleDates() {
        return  ['03 Jan 2000 GMT', '05 Jan 2000 GMT', '09 Jan 2000 GMT', '12 Jan 2000 GMT', '17 Jan 2000 GMT', '21 Jan 2000 GMT', '22 Jan 2000 GMT', '25 Jan 2000 GMT', '29 Jan 2000 GMT', '31 Jan 2000 GMT'];

    },

    generateDataForAllYears() {
        let years = [];
        let dataStrongEvents = [];
        let dataExtremEvents = [];
        for (let i = 1979; i < 2018; i++) {
            years.push(i);
            dataStrongEvents.push(this.getRandomArbitrary(0, 50));
            dataExtremEvents.push(this.getRandomArbitrary(0, 30));
        }
        return {years: years, strong: dataStrongEvents, extrem: dataExtremEvents}
    },

    generateDataForMonths() {
        let dataStrongEvents = [];
        let dataExtremEvents = [];
        for (let i = 0; i < 12; i++) {
            dataStrongEvents.push(this.getRandomArbitrary(0, 50));
            dataExtremEvents.push(this.getRandomArbitrary(0, 30));
        }
        let series = [{name: 'Starkereignisse', data: dataStrongEvents},
            {name: 'Extremereignisse', data: dataExtremEvents},];
        return series;
    },

    generateDataForDays(dates) {
        let series = [
            {name: "siTo1", data: [], color:'#FBE5E5'},
            {name: "siTo2", data: [], color: '#F5C3C3'},
            {name: "siTo3", data: [], color: '#EFA1A1'},
            {name: "siTo4", data: [], color: '#DC6160'},
            {name: "siTo5", data: [], color: 'rgba(248,29,22,0.67)'},
            {name: "siTo6", data: [], color: 'rgba(252,29,22,0.94)'},
            {name: "siTo7", data: [], color: 'rgba(215,29,22,0.93)'},
            {name: "siTo8", data: [], color: '#db1b14'},
            {name: "siTo9", data: [], color: '#9A1A1A'},
            {name: "siTo10", data: [], color: '#771515'},
        ];
        dates.forEach((item) => {
            let oneData = []
            //oneData.push(item)
            console.log(new Date(item).getTime())
            let si = (this.getRandomArbitrary(0, 9))
            oneData.push(new Date(item).getTime())
            oneData.push(this.getRandomArbitrary(0,80))
            oneData.push(this.getRandomArbitrary(10, 30));
            series[si].data.push(oneData);
        });
        console.log(series);
        return series
    },

    getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomArbitraryFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
}