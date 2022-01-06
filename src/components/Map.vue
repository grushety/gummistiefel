<template>
    <div class="map-wrapper">
        <gmap-map
                :zoom="4"
                :center="center"
                ref="map"
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
        playing: false
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
        console.log(this.icon)

        this.markers = this.events.map(event => {
            const radius = event.area*100;

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

            const icon = {
                url: 'data:image/svg+xml;base64,' + window.btoa(new XMLSerializer().serializeToString(svg)),
                anchor: {x: radius, y: radius}
            }

            return {
                pos: {
                    lat: event.lat,
                    lng: event.lng
                },
                icon
            };
        })
    },
    methods: {
        play() {}
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