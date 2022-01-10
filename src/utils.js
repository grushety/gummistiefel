export default {
    newBubbleOptions() {
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
            xaxis: {
                type: 'datetime',
                tickAmount: 12,
            },
            yaxis: {
                max: 90,
            }
        };
    },

    newStackedHistogramOptions() {
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
                },
            },
            active: {
                allowMultipleDataPointsSelection: true,
            },
            fill: {
                colors: ['#5fbce9', '#f81d16']
            },
            xaxis: {
                type: 'category',
                tickAmount: 12,
            },
        }
    },

    newBoxPlotOptions() {
        return {
            chart: {
                type: 'boxPlot',
            },
            colors: ['#008FFB', '#FEB019'],
            title: {
                text: 'BoxPlot - Scatter Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    formatter: function(val) {
                        return new Date(val).getFullYear()
                    }
                }
            },
            tooltip: {
                shared: false,
                intersect: true
            }
        }
    },


    getAllMonth() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },

    getExampleDates() {
        return ['03 Jan 2000 GMT', '05 Jan 2000 GMT', '09 Jan 2000 GMT', '12 Jan 2000 GMT', '17 Jan 2000 GMT', '21 Jan 2000 GMT', '22 Jan 2000 GMT', '25 Jan 2000 GMT', '29 Jan 2000 GMT', '31 Jan 2000 GMT'];

    },

    getAllYears() {
        let years = [];
        for (let i = 1979; i < 2018; i++) {
            years.push(String(i));
        }
        return years;
    },

    generateDataForAllYears() {
        let dataStrongEvents = [];
        let dataExtremEvents = [];
        for (let i = 1979; i < 2018; i++) {
            dataStrongEvents.push(this.getRandomArbitrary(0, 50));
            dataExtremEvents.push(this.getRandomArbitrary(0, 30));
        }
        return [{name: 'Starkereignisse', data: dataStrongEvents,  color: '#5fbce9'},
                {name: 'Extremereignisse', data: dataExtremEvents, color: '#f81d16'}, ]
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
            {name: "siTo1", data: [], color: '#FBE5E5'},
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
            oneData.push(this.getRandomArbitrary(0, 80))
            oneData.push(this.getRandomArbitrary(0, 20));
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

    getBoxplotSeries() {
        return [
            {
                name: 'box',
                type: 'boxPlot',
                data: [
                    {
                        x: new Date('2017-01-01').getTime(),
                        y: [54, 66, 69, 75, 88]
                    },
                    {
                        x: new Date('2018-01-01').getTime(),
                        y: [43, 65, 69, 76, 81]
                    },
                    {
                        x: new Date('2019-01-01').getTime(),
                        y: [31, 39, 45, 51, 59]
                    },
                    {
                        x: new Date('2020-01-01').getTime(),
                        y: [39, 46, 55, 65, 71]
                    },
                    {
                        x: new Date('2021-01-01').getTime(),
                        y: [29, 31, 35, 39, 44]
                    }
                ]
            },
        ]
    },
    getBoxplotSeriesForYears(filter){
        let min=0;
        let max=100;
        if(filter==="area"){
            min=4
            max=80
        }
        if(filter==="duration"){
            min=0
            max=100
        }
        if(filter==="severity"){
            min=0
            max=1
        }
        let years = this.getAllYears();
        let data=[];
        years.forEach(item => {
            let obj = {};
            obj.x=new Date(item);
            obj.y= this.generateRandomNumbersForBoxPlot(min, max)
            data.push(obj)
        });
        return [{
            name: 'box',
            type: 'boxPlot',
            data: data,
        }]
    },
    getBoxplotSeriesForMonths(year, filter){
        let min=0;
        let max=100;
        if(filter==="area"){
            min=4
            max=80
        }
        if(filter==="duration"){
            min=0
            max=100
        }
        if(filter==="severity"){
            min=0
            max=1
        }
        let data = [];
        let months = this.getAllMonth();
        months.forEach(item => {
            let obj = {};
            obj.x=new Date( "01 " + item + " " + year);
            obj.y= this.generateRandomNumbersForBoxPlot(min, max)
            data.push(obj)
        });
        return [{
            name: 'box',
            type: 'boxPlot',
            data: data,
        }]
    },
    generateRandomNumbersForBoxPlot(min, max){
        let unsorted = [];
        for (let i=0; i<5; i++){
            let number = this.getRandomArbitrary(min, max)
            unsorted.push(number)
        }
        return unsorted.sort(function(a, b){return a-b});
    }
}