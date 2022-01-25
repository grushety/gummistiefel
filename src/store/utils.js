import moment from 'moment'

export default {
    newBubbleOptions() {
        return {
            chart: {
                type: 'bubble',
                offset: 20,
                zoom: {
                    enabled: true,
                    type: 'xy',
                },
            },
            fill: {
                type: 'gradient',
            },
            plotOptions: {
                bubble: {
                    minBubbleRadius: 5,
                }
            },
            toolbar: {
                show: true,
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
                label: {
                    show: true,
                    text: 'Dauer',
                    offsetY: 0,
                }
            },
            tooltip: {
                enabled: true,
                x: {
                    show: true,
                    title: 'Zeit: '

                },

                z: {
                    title: 'Size:'
                }

            },
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
            dataLabels: {
                enabled: true,
            },
            colors: ['#008FFB', '#FEB019'],
            title: {
                text: 'BoxPlot - Scatter Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    formatter: function (val) {
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


    formatDataForAllYears(data) {
        let yearsKeys = this.getAllYears();
        return this.formatDataForHistogram(yearsKeys, data)
    },

    formatDataForSelectedYear(data) {
        let monthsKeys = this.getAllMonthKey();
        return this.formatDataForHistogram(monthsKeys, data)
    },

    formatDataForSelectedMonth(data) {
        let daysKey = this.getAllDaysKey();
        return this.formatDataForHistogram(daysKey, data)
    },

    formatDataForHistogram(keys, data) {
        let dataStrongEvents = [];
        let dataExtremEvents = [];
        keys.forEach((i) => {
            let ext = i in data.extreme ? data.extreme[i] : 0;
            let str = i in data.strong ? data.strong[i] - ext : 0;
            dataStrongEvents.push(str);
            dataExtremEvents.push(ext);
        });
        return [{name: 'Starkereignisse', data: dataStrongEvents, color: '#5fbce9'},
            {name: 'Extremereignisse', data: dataExtremEvents, color: '#f81d16'},]
    },

    formatDataForBubblePlot(events) {
        let series = [
            {name: "si 0-0.1", data: [], color: '#ff8080'},
            {name: "si 0.1-0.2", data: [], color: '#ff6666'},
            {name: "si 0.2-0.3", data: [], color: '#ff3333'},
            {name: "si 0.3-0.4", data: [], color: '#ff1a1a'},
            {name: "si 0.4-0.5", data: [], color: '#ff0000'},
            {name: "si 0.5-0.6", data: [], color: '#cc0000'},
            {name: "si 0.6-0.7", data: [], color: '#990000'},
            {name: "si 0.7-0.8", data: [], color: '#660000'},
            {name: "si 0.8-0.9", data: [], color: '#330000'},
            {name: "si > 0.9", data: [], color: '#1a0000'},
        ];
        events.forEach(item => {
            let dataItem = []
            let si = this.round(item.si, 1) * 10;
            if (si > 9) {
                si = 9;
            }
            dataItem.push(new Date(item.start).getTime())
            dataItem.push(this.round(item.length, 6))
            dataItem.push(this.round(item.area, 2))
            //dataItem.push(this.round(item.maxPrec, 2))
            dataItem.push(item.id)
            series[si].data.push(dataItem);
        })
        return series
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
            {name: "si 0-0.1", data: [], color: '#ff8080'},
            {name: "si 0.1-0.2", data: [], color: '#ff6666'},
            {name: "si 0.2-0.3", data: [], color: '#ff3333'},
            {name: "si 0.3-0.4", data: [], color: '#ff1a1a'},
            {name: "si 0.4-0.5", data: [], color: '#ff0000'},
            {name: "si 0.5-0.6", data: [], color: '#cc0000'},
            {name: "si 0.6-0.7", data: [], color: '#990000'},
            {name: "si 0.7-0.8", data: [], color: '#660000'},
            {name: "si 0.8-0.9", data: [], color: '#330000'},
            {name: "si > 0.9", data: [], color: '#1a0000'},
        ];
        dates.forEach((item) => {
            let oneData = []
            //oneData.push(item)
            let si = (this.getRandomArbitrary(0, 9))
            oneData.push(new Date(item).getTime())
            oneData.push(this.getRandomArbitrary(0, 80))
            oneData.push(this.getRandomArbitrary(5, 20));
            series[si].data.push(oneData);
        });
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
    getBoxplotSeriesForYears(filter) {
        let min = 0;
        let max = 100;
        if (filter === "area") {
            min = 4
            max = 80
        }
        if (filter === "duration") {
            min = 0
            max = 100
        }
        if (filter === "severity") {
            min = 0
            max = 1
        }
        let years = this.getAllYears();
        let data = [];
        years.forEach(item => {
            let obj = {};
            obj.x = new Date(item);
            obj.y = this.generateRandomNumbersForBoxPlot(min, max)
            data.push(obj)
        });
        return [{
            name: 'box',
            type: 'boxPlot',
            data: data,
        }]
    },
    getBoxplotSeriesForMonths(year, filter) {
        let min = 0;
        let max = 100;
        if (filter === "area") {
            min = 4
            max = 80
        }
        if (filter === "duration") {
            min = 0
            max = 100
        }
        if (filter === "severity") {
            min = 0
            max = 1
        }
        let data = [];
        let months = this.getAllMonth();
        months.forEach(item => {
            let obj = {};
            obj.x = new Date("01 " + item + " " + year);
            obj.y = this.generateRandomNumbersForBoxPlot(min, max)
            data.push(obj)
        });
        return [{
            name: 'box',
            type: 'boxPlot',
            data: data,
        }]
    },
    generateRandomNumbersForBoxPlot(min, max) {
        let unsorted = [];
        for (let i = 0; i < 5; i++) {
            let number = this.getRandomArbitrary(min, max)
            unsorted.push(number)
        }
        return unsorted.sort(function (a, b) {
            return a - b
        });
    },

    // help functions
    getAllMonth() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },

    getAllMonthKey() {
        return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    },

    getAllDaysKey() {
        let keys = [];
        for (let i = 1; i < 31; i++) {
            let key = i < 10 ? "0" + String(i) : String(i)
            keys.push(key);
        }
        return keys;
    },

    getMonthCode(monthName) {
        let monthNames = this.getAllMonth();
        let monthCode = this.getAllMonthKey();
        let index = monthNames.indexOf(monthName)
        return index >= 0 ? monthCode[index] : -1;
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

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    },

    format_date(value) {
        if (value) {
            return moment(String(value)).format('YYYY-MM-DD')
        }
    },
}