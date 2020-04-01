import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzdG9ycmVzZXJ2YXRlc2lzIiwiYSI6ImNrMHdvcmduZzAydG8zb28zM2Q0ejI3dDIifQ.M8OxCaPxutyak1dDn7rd8w';

class Mapa extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			map: {
				
				center: ["-55.92408", "-27.37508"],
				container: "container",
				style: 'mapbox://styles/mapbox/streets-v11',
				zoom: 13
			},
			icon: "https://image.flaticon.com/icons/png/512/22/22474.png",
			cords: [],
			origin: [-55.938447219507566, -27.390096789966314],
			destination : [-55.89962780203922, -27.35359593411566]
		};
	}

	componentDidMount() {
		const map = new mapboxgl.Map(this.state.map);
		let route = {
			'type': 'FeatureCollection',
			'features': [
				{
					'type': 'Feature',
					'geometry': {
						'type': 'LineString',
						'coordinates': [this.state.origin, this.state.destination]
					}
				}
			]
		};
		let point = {
			'type': 'FeatureCollection',
			'features': [
				{
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': this.state.origin
					},
					'properties': {
						'title': 'Matias M.',
						'icon': 'turning-circle'
					}
				}
			]
		};
		
		/*let line = turf.lineString(route.features[0], {name: 'line 1'});*/
		let lineDistance = turf.length(route.features[0], {units: 'kilometers'});
		
		let arc = [];
		
		let steps = 10000;
		

		for (var i = 0; i < lineDistance; i += lineDistance / steps) {
			var segment = turf.along(route.features[0], i, {units: 'kilometers'});
			arc.push(segment.geometry.coordinates);
		}
		route.features[0].geometry.coordinates = arc;
		let counter = 0;
		map.on('load', function() {
			map.loadImage('https://res.cloudinary.com/marathon-project/image/upload/v1585738395/flag_z8zddp.png', 
				function(error, image) {
					if (error){console.log(error)};
					map.addImage('banderita', image, {
						"sdf": "true"
					});
				}
			);
			map.addSource('route', {
				'type': 'geojson',
				'data': route
			});
			map.addSource('point', {
				'type': 'geojson',
				'data': point
			});
			map.addLayer({
				'id': 'route',
				'source': 'route',
				'type': 'line',
				'paint': {
					'line-width': 2,
					'line-color': '#007cbf'
				}
			});
			map.addLayer({
				id: 'point',
				type: 'symbol',
				source: 'point',
				'layout': {
					'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
					'text-field': ['get', 'title'],
					'text-anchor': 'top',
					'icon-image': ['get', 'icon'],
					'icon-size': 0.3,
					'icon-allow-overlap': true,
					'text-size': 12,
					'text-offset': [0, 0.6],
				},
				paint: {
					'text-color': 'rgba(0, 159, 99, 0.8)',
					'icon-color': '#ff0000'
				}
			});
			function animate() {
				// Update point geometry to a new position based on counter denoting
				// the index to access the arc.
				point.features[0].geometry.coordinates = route.features[0].geometry.coordinates[counter];
				map.getSource('point').setData(point);
				 
				// Request the next frame of animation so long the end has not been reached.
				if (counter <= steps) {
					requestAnimationFrame(animate);
				}
				 
				counter = counter + 1;
			}
				 
			/*document.getElementById('replay').addEventListener('click', function() {
				// Set the coordinates of the original point back to origin
				point.features[0].geometry.coordinates = origin;
				 
				// Update the source layer
				map.getSource('point').setData(point);
				 
				// Reset the counter
				counter = 0;
				 
				// Restart the animation.
				animate(counter);
			});*/
			 
			// Start the animation.
			animate(counter);
		});
		map.resize();
	}

	render() {
		return (
			<div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
				<div id="container" className="w-100 h-100"></div>
			</div>
		)
	}
}


export default Mapa;