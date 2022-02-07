<template>
    <div class="map-wrapper">
        <gmap-map
                :zoom="zoom"
                :center="center"
                ref="map"
                @zoom_changed="z => { zoom = z }">
            <gmap-marker
                    :key="index"
                    v-for="(marker, index) in markers"
                    :position="marker.pos"
                    :icon="marker.icon"
                    @click="center=marker.pos"
            ></gmap-marker>
        </gmap-map>

        <p class="text-center">
            {{ new Date(timestamp) }}
        </p>
        <div class="time-control">
            <div @click="play" class="play">
                <i v-if="$store.state.interval[key]"  class="fa fa-2x fa-pause-circle" aria-hidden="true"></i>
                <i v-else class="fa fa-2x fa-play-circle" aria-hidden="true"></i>
            </div>
            <div class="timeline" @click="handleTimelineClick">
                <div class="timeline-marker" :style="`left: ${timelinePercentage*100}%`"></div>
            </div>
        </div>
        <br><br>
    </div>
</template>

<script>
export default {
    props: {
        id: Number
    },
    data: () => ({
        zoom: 4,
        markers: [],
        zoomFactors: {
            // values according to https://stackoverflow.com/a/26966583/5062828
            20 : 1128.497220,
            19 : 2256.994440,
            18 : 4513.988880,
            17 : 9027.977761,
            16 : 18055.955520,
            15 : 36111.911040,
            14 : 72223.822090,
            13 : 144447.644200,
            12 : 288895.288400,
            11 : 577790.576700,
            10 : 1155581.153000,
            9  : 2311162.307000,
            8  : 4622324.614000,
            7  : 9244649.227000,
            6  : 18489298.450000,
            5  : 36978596.910000,
            4  : 73957193.820000,
            3  : 147914387.600000,
            2  : 295828775.300000,
            1  : 591657550.500000
        },
        events: [],
        visibleEvents: [],
        timestamp: 0,
        key: crypto.randomUUID()
    }),
    computed: {
        center() {
            const lngs = this.events.map(event => event.lon);
            const lats = this.events.map(event => event.lat);
            
            const minLng = Math.min(...lngs);
            const minLat = Math.min(...lats);
            const maxLng = Math.max(...lngs);
            const maxLat = Math.max(...lats);

            return {
                lat: (maxLat - minLat) / 2 + minLat,
                lng: (maxLng - minLng) / 2 + minLng
            }
        },
        startTime() {
            if (!this.events.length) return 0;
            return this.events.reduce((prev, curr) => prev.date < curr.date ? prev : curr).date.getTime();
        },
        endTime() {
            if (!this.events.length) return 0;
            return this.events.reduce((prev, curr) => prev.date > curr.date ? prev : curr).date.getTime();
        },
        timelinePercentage() {
            return (this.timestamp - this.startTime) / (this.endTime - this.startTime);
        }
    },
    watch: {
        zoom() {
            this.onZoomChanged();
        },
        timestamp() {
            let visibleEvents = [this.events[this.events.length - 1]];
            for (const event of this.events) {
                if (event.date.getTime() >= this.timestamp) {
                    visibleEvents = [event];
                    break
                }
            }
            this.visibleEvents = visibleEvents;
            this.onZoomChanged();
        }
    },
    created() {
        this.$axios.get('/timeseries?id=' + this.id).then(res => {
            this.events = res.data.map(event => ({
                ...event,
                date: new Date(event.date),
                si: event.si + 0.5
            }));
            this.visibleEvents = [this.events[0]];
            this.timestamp = this.events[0].date.getTime();
            
            this.onZoomChanged();
        });
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null,"cx",100);
        circle.setAttributeNS(null,"cy",100);
        circle.setAttributeNS(null,"r",50);
        circle.setAttributeNS(null,"fill","red");
        circle.setAttributeNS(null,"fill-opacity",0.8);
        circle.setAttributeNS(null,"stroke","none");
        svg.appendChild(circle);

        this.icon = 'data:image/svg+xml;base64,' + window.btoa(new XMLSerializer().serializeToString(svg));
    },
    methods: {
        handleTimelineClick(e) {
            const rect = e.target.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            this.timestamp = this.startTime + ((this.endTime - this.startTime) * x)
        },
        play() {
            if (this.$store.state.interval[this.key] == null) {
                const speed = 1; // frames per ms, 1 = highest speed
                this.$store.commit('setInterval', {
                    key: this.key, 
                    cb: () => {
                        console.log("bub")
                        this.timestamp += 60 * 1000 / speed;
                        if (this.timestamp >= this.endTime) {
                            this.$store.commit('clearInterval', this.key)
                        }
                    }, 
                    speed
                })
            } else {
                console.log("pause")
                this.$store.commit('clearInterval', this.key)
            }
        },
        onZoomChanged() {
            this.markers = this.visibleEvents.map(event => {
                const radius = event.area/this.zoomFactors[this.zoom]*1000000000;

                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', radius*2);
                svg.setAttribute('height', radius*2);
                
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttributeNS(null, "cx", radius);
                circle.setAttributeNS(null, "cy", radius);
                circle.setAttributeNS(null, "r", radius);
                circle.setAttributeNS(null, "fill", "red");
                circle.setAttributeNS(null, "fill-opacity", event.si);
                circle.setAttributeNS(null, "stroke", "none");
                
                svg.appendChild(circle);

                return {
                    pos: {
                        lat: event.lat,
                        lng: event.lon
                    },
                    icon: {
                        url: 'data:image/svg+xml;base64,' + window.btoa(new XMLSerializer().serializeToString(svg)),
                        anchor: {x: radius, y: radius}
                    }
                };
            });
        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}

.vue-map-container {
    height: 500px;
    border: 1px solid black;
}
.time-control {
    display: flex;
    height: 20px;
    cursor: pointer;
}

.time-control .play {
    z-index: 10;
}

.play-button {
    margin: 0 auto;
    top: 25%;
    position: relative;
    width: 10px;
    height: 0;
    border-style: solid;
    border-width: 1em 0 1em 1.5em;
    border-color: transparent transparent transparent #000;
    opacity: .75;
}

.timeline {
    border: 1px solid black;
    width: 100%;
    margin-top: 4px;
    height: 20px;
    margin-left: -8px;
    position: relative;
    z-index: 0;
}

.timeline-marker {
    border-left: 2px solid red;
    height: 100%;
    position: absolute;
}

.fa-play-circle {
    z-index: 100;
}
</style>