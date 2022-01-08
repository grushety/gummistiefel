<template>
    <div class="map-wrapper">
        <gmap-map
                :zoom="zoom"
                :center="center"
                ref="map"
                @zoom_changed="z => { zoom = z }"
                style="width:100%;  height: 500px;">
            <gmap-marker
                    :key="index"
                    v-for="(marker, index) in markers"
                    :position="marker.pos"
                    :icon="marker.icon"
                    @click="center=marker.pos"
            ></gmap-marker>
        </gmap-map>
        <div class="time-control">
            <div class="play-button-outer">
                <div class="play-button"></div>
            </div>
            <div class="timeline">
                <div class="timeline-marker"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        //events: Array
    },
    data: () => ({
        markers: [],
        zoom: 4,
        playing: false,
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
        }
    }),
    computed: {
        center() {
            const lngs = this.events.map(event => event.lng);
            const lats = this.events.map(event => event.lat);
            
            const minLng = Math.min(...lngs);
            const minLat = Math.min(...lats);
            const maxLng = Math.max(...lngs);
            const maxLat = Math.max(...lats);

            return {
                lat: (maxLat - minLat) / 2 + minLat,
                lng: (maxLng - minLng) / 2 + minLng
            }
        }
    },
    watch: {
        zoom() {
            this.onZoomChanged();
        }
    },
    created() {
        // dummy data
        this.events = [
            {
                area: 0.5000000059604645,
                id: "197907495",
                length: 26,
                si: 0.29999999329447746,
                start: "1980-01-11T03:00:00",
                lat: -4,
                lng: 8
            },
            {
                area: 0.3000000059604645,
                id: "197907495",
                length: 26,
                si: 0.29999999329447746,
                start: "1980-01-11T03:00:00",
                lat: -10,
                lng: 6
            },
            {
                area: 0.2000000059604645,
                id: "197907495",
                length: 26,
                si: 0.129999999329447746,
                start: "1980-01-11T03:00:00",
                lat: 3,
                lng: 13
            },
            {
                area: 0.8000000059604645,
                id: "197907495",
                length: 26,
                si: 0.629999999329447746,
                start: "1980-01-11T03:00:00",
                lat: 6,
                lng: -12
            }
        ]
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null,"cx",100);
        circle.setAttributeNS(null,"cy",100);
        circle.setAttributeNS(null,"r",50);
        circle.setAttributeNS(null,"fill","blue");
        circle.setAttributeNS(null,"fill-opacity",0.8);
        circle.setAttributeNS(null,"stroke","none");
        svg.appendChild(circle);

        this.icon = 'data:image/svg+xml;base64,' + window.btoa(new XMLSerializer().serializeToString(svg));
        
        this.onZoomChanged(this.zoom);
    },
    methods: {
        play() {},
        onZoomChanged() {
            this.markers = this.events.map(event => {
                const radius = event.area/this.zoomFactors[this.zoom]*10000000000;

                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', radius*2);
                svg.setAttribute('height', radius*2);
                
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttributeNS(null, "cx", radius);
                circle.setAttributeNS(null, "cy", radius);
                circle.setAttributeNS(null, "r", radius);
                circle.setAttributeNS(null, "fill", "blue");
                circle.setAttributeNS(null, "fill-opacity", event.si);
                circle.setAttributeNS(null, "stroke", "none");
                
                svg.appendChild(circle);

                return {
                    pos: {
                        lat: event.lat,
                        lng: event.lng
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
.map-wrapper{
    padding: 24px;
    margin: 16px auto;
    width: 1000px;
}

.time-control {
    margin-top: 2em;
    display: flex;
    height: 64px;
}

.play-button-outer {
  width: 4em;
  height: 4em;
  background-color: rgba(0, 0, 0, .25);
  cursor: pointer;
}

.play-button {
  margin: 0 auto;
  top: 25%;
  position: relative;  
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 1em 0 1em 1.5em;
  border-color: transparent transparent transparent #000;
  opacity: .75; 
}

.play-button-outer:hover {
  background-color: rgba(0, 0, 0, .5);
}

.play-button-outer:hover .play-button {
  opacity: 1;
}

.timeline {
    border: 1px solid black;
    width: 100%;
    position: relative;
}

.timeline-marker {
    border-left: 2px solid red;
    height: 100%;
    position: absolute;
    left: 10%;
}
</style>