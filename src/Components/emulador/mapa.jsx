import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';
import './mapa.css';
import cogoToast from 'cogo-toast';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzdG9ycmVzZXJ2YXRlc2lzIiwiYSI6ImNrMHdvcmduZzAydG8zb28zM2Q0ejI3dDIifQ.M8OxCaPxutyak1dDn7rd8w';

class Mapa extends React.Component {

	state = {
		map: {
			center: ["-55.93830592072163", "-27.390202155444484"],
			container: "container",
			style: 'mapbox://styles/mapbox/dark-v10',
			zoom: 18
		},
		inicio: Date,
		icon: "https://image.flaticon.com/icons/png/512/22/22474.png",
		geometry: [],
		competitors: [],
		colors: [],
		parades: [],
		origin: [-55.93830592072163, -27.390202155444484],
		destination : [-55.89950266900672, -27.35358193955591]
	};

	constructor(props) {
		super(props);
		/*this.competitors = this.props.competitors;*/
		
		
		let competitors = [
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 3,
				"firstname": "Mati",
				"lastname": "Moreira",
				"dni": "10101101",
				"nick": "Mati",
				"email": "moreiramatias10@gmail.com",
				"pass": "66-DB-84-D7-88-2E-F2-32-1E-45-37-72-D2-27-C4-E4-E9-A5-3C-96-13-1A-AC-8E-65-49-34-2D-D9-7B-32-03",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 4,
				"firstname": "Seba",
				"lastname": "Benitez",
				"dni": "10101101",
				"nick": "Seba",
				"email": "elgato@gmail.com",
				"pass": "66-DB-84-D7-88-2E-F2-32-1E-45-37-72-D2-27-C4-E4-E9-A5-3C-96-13-1A-AC-8E-65-49-34-2D-D9-7B-32-03",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 5,
				"firstname": "Ivan",
				"lastname": "Benitez",
				"dni": "2131231231",
				"nick": "Ivan",
				"email": "elgato2@gmail.com",
				"pass": "66-DB-84-D7-88-2E-F2-32-1E-45-37-72-D2-27-C4-E4-E9-A5-3C-96-13-1A-AC-8E-65-49-34-2D-D9-7B-32-03",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 6,
				"firstname": "Juliano",
				"lastname": "Cismondi",
				"dni": "2131231231",
				"nick": "Ivan",
				"email": "elgato2@gmail.com",
				"pass": "66-DB-84-D7-88-2E-F2-32-1E-45-37-72-D2-27-C4-E4-E9-A5-3C-96-13-1A-AC-8E-65-49-34-2D-D9-7B-32-03",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 7,
				"firstname": "German",
				"lastname": "Sommer",
				"dni": "2131231231",
				"nick": "Ivan",
				"email": "elgato2@gmail.com",
				"pass": "66-DB-84-D7-88-2E-F2-32-1E-45-37-72-D2-27-C4-E4-E9-A5-3C-96-13-1A-AC-8E-65-49-34-2D-D9-7B-32-03",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},
			{
				"idUser": 2,
				"firstname": "MALCOM",
				"lastname": "BEYERSDORF",
				"dni": "10101101",
				"nick": "malcom",
				"email": "malcomgbugd@gmail.com",
				"pass": "01b63560db0dd6152ffead0cf34f60a4740cdfb2",
				"telephone": "3764982880",
				"birthday": null,
				"bodyHeight": 190,
				"bodyWeight": 90,
				"talle": "43",
				"medicaCertificate": true,
				"tipo": 1,
				"registerDate": "2020-04-01T00:00:00",
				"token": "sadaskjdkasnldknsaldknas",
				"active": true,
				"competitor": null
			},];
		let geometry = {
			'type': 'LineString',
			'coordinates': 
				[
					[-55.93830592072163, -27.390202155444484],
					[-55.91998044494477,-27.39230806042768], 
					[-55.915438101352436,-27.358951392378266], 
					[-55.900412690133635,-27.360525684054117], 
					[-55.89950266900672, -27.35358193955591]
				]  };

		let  colors = [
			[192, 57, 43,0.8],
			[142, 68, 173, 0.8],
			[41, 128, 185, 0.8],
			[26, 188, 156, 0.8],
			[39, 174, 96, 0.8],
			[241, 196, 15, 0.8],
			[230, 126, 34, 0.8],
			[149, 165, 166, 0.8],
			[255, 255, 255, 0.8],
			[158, 157, 36, 0.8]];
		
		let parades = [
			{
				"idParade": 1,
				"idMarathon": 1,
				"ordernumber": 2,
				"latitude": "-55.91998044494477",
				"longitude": "-27.39230806042768",
				"idMarathonNavigation": null,
				"timeMark": []
			},
			{
				"idParade": 2,
				"idMarathon": 1,
				"ordernumber": 3,
				"latitude": "-55.915438101352436",
				"longitude": "-27.358951392378266",
				"idMarathonNavigation": null,
				"timeMark": []
			},
			{
				"idParade": 3,
				"idMarathon": 1,
				"ordernumber": 4,
				"latitude": "-55.900412690133635",
				"longitude": "-27.360525684054117",
				"idMarathonNavigation": null,
				"timeMark": []
			},{
				"idParade": 4,
				"idMarathon": 1,
				"ordernumber": 5,
				"latitude": "-55.89950266900672",
				"longitude": "-27.35358193955591",
				"idMarathonNavigation": null,
				"timeMark": []
			}
		];

		this.state = {
			map: {
				
				center: ["-55.93830592072163", "-27.390202155444484"],
				container: "container",
				style: 'mapbox://styles/mapbox/dark-v10',
				zoom: 18
			},
			inicio: Date,
			icon: "https://image.flaticon.com/icons/png/512/22/22474.png",
			geometry: geometry,
			competitors: competitors,
			colors: colors,
			parades: parades,
			origin: [-55.93830592072163, -27.390202155444484],
			destination : [-55.89950266900672, -27.35358193955591]
		};
	}


	// Retorna un entero aleatorio entre min (incluido) y max (excluido)
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	async componentDidMount() {

		try {
			cogoToast.info('Importando ruta...');
			let response = await fetch('https://localhost:44308/api/Marathons/GetMarathonRoute/' + this.props.idMarathon);
			let route = await response.json();
			console.log(route);

			await cogoToast.info('Obteniento paradas...');
			response = await fetch('https://localhost:44308/api/Parades/GetByMarathon/' + this.props.idMarathon);
			let parades = await response.json();
			console.log(parades);

			await cogoToast.info('Cargando corredores...');
			response = await fetch('https://localhost:44308/api/Results/GetUsersByMarathon/' + this.props.idMarathon);
			let users = await response.json();
			console.log(users);
		} catch (e) {
			console.log('error: ', e);
		}

		const map = new mapboxgl.Map(this.state.map);
		let center = 0;
		let clock = Date;

		let competitors = this.state.competitors;
		let parades = this.state.parades;

		let arriveParade = Array.from({length: competitors.length}, (vc, ic) =>  Array.from({length: parades.length}, (vp, ip) => ({'state': false, 'time': '', 'idUser': competitors[ic].idUser, 'idParade': parades[ip].idParade })));
		console.log(arriveParade)

		let featuresRoute = competitors.map(() => {
			return { 'type': 'Feature', 'geometry': {'type': this.state.geometry.type, 'coordinates': this.state.geometry.coordinates}};
		});

		let route = {
			'type': 'FeatureCollection',
			'features': featuresRoute
		};
		let featuresPoint = competitors.map((element) => {
			return( 
				{
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': this.state.origin
					},
					'properties': {
						'id': element.idUser,
						'title': `${element.firstname} ${element.lastname[0].toUpperCase()}.`,
						'icon': 'dot-11',
						'color': `rgba(${this.state.colors[this.getRandomInt(0,10)]})`
					}
				}
			);
		});
		
		let point = {
			'type': 'FeatureCollection',
			'features': featuresPoint
		};
		
		let lineDistance = turf.length(route.features[0], {units: 'kilometers'});
		let steps = new Array();
		console.log(competitors);
		competitors.forEach((element, indice, array) => {
			let arc = [];
			let step = this.getRandomInt(50000, 70000);
			steps.push(step);
			for (var i = 0; i < lineDistance; i += lineDistance / step) {
				var segment = turf.along(route.features[indice], i, {units: 'kilometers'});
				arc.push(segment.geometry.coordinates);
			}
			route.features[indice].geometry.coordinates = arc;
		});
		map.on('load', function() {
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
					'icon-size': 1.5,
					'icon-allow-overlap': true,
					'text-size': 12,
					'text-offset': [0, 0.6],
					'text-ignore-placement': true,
					'text-allow-overlap': true,
					'icon-ignore-placement': true,
					/*'text-halo-blur': 1,
					'text-halo-color': 'rgba(255, 255, 255, 0.8)',
					'text-halo-width': 1*/
				},
				paint: {
					'text-color': ['get', 'color']
				}
			});
			function flyToStore(currentFeature, index) {
				map.flyTo({
					center: currentFeature.geometry.coordinates
				});
				/*center = index;*/
			}

			function buildLocationList(data) {
				data.features.forEach(function(store, i){
					/**
						* Create a shortcut for `store.properties`,
						* which will be used several times below.
					**/
					let prop = store.properties;
					/* Add a new listing section to the sidebar. */
					let listings = document.getElementById('listings');
					let listing = listings.appendChild(document.createElement('li'));
					/* Assign a unique `id` to the listing. */
					listing.id = "listing-" + prop.id;
					/* Assign the `item` class to each listing for styling. */
					listing.className = 'list-group-item list-group-flush bg-dark text-left';
					/* Add the link to the individual listing created above. */
					let link = listing.appendChild(document.createElement('a'));
					link.className = 'btn text-decoration-none text-secondary ';
					link.id = "link-" + prop.id;
					link.innerHTML = prop.title;
					link.addEventListener('click', function(e){
						for (var i=0; i < data.features.length; i++) {
							if (this.id === "link-" + data.features[i].properties.id) {
								var clickedListing = data.features[i];
								flyToStore(clickedListing, i);
							}
						}
						var activeItem = document.getElementsByClassName('active');
						if (activeItem[0]) {
							activeItem[0].classList.remove('active');
						}
						this.parentNode.classList.add('active');
					});
				});
			}



			function animate(featureIdx, counter, steps, arriveParade) {
				if (counter >= route.features[featureIdx].geometry.coordinates.length-1){
					return;
				}				

				point.features[featureIdx].geometry.coordinates = route.features[featureIdx].geometry.coordinates[counter];
				map.getSource('point').setData(point);
				/*map.setCenter(point.features[center].geometry.coordinates);*/

				parades.forEach(function(element, index){
					let _from = turf.point(point.features[featureIdx].geometry.coordinates);
					let _to = turf.point([parades[index].latitude, parades[index].longitude]);
					let options = {units: 'metres'};
					if (turf.distance(_from, _to, options) < 1) {
						if (!arriveParade[index].state) {
							console.log(point.features[featureIdx].properties.title, arriveParade[index]);
							arriveParade[index].state = true; 
							arriveParade[index].time = new Date();
						}
					}
				});
				// Request the next frame of animation so long the end has not been reached.
				if (counter < steps) {
					requestAnimationFrame(function(){animate(featureIdx , counter+1, steps, arriveParade);});
				}
			}
				 
			document.getElementById('play').addEventListener('click', function() {
				clock = new Date();
				competitors.forEach((element, indice) => {
					animate(indice, 0, steps[indice], arriveParade[indice]);
				});
				document.getElementById('play').classList.add("d-none");
			});
			buildLocationList(point)
		});
		map.resize();
	}

	render() {
		return (
			<div className="container-fluid bg-dark">
				<div className="row vh-100 d-flex align-items-center justify-content-center">
					<div className="col-md-3 w-100 h-100 d-flex align-items-center justify-content-center m-0 pr-0 pt-5 pb-5 pl-5">
						<ul className="list-group w-100 mh-100 shadow-lg overflow-auto m-0 p-0 rounded-left" id='listings'>
							<div className="btn list-group-item list-group-flush bg-dark text-white text-center">Competidores</div>
						</ul>
					</div>
					<div className="col-md-9 w-100 h-100 d-flex align-items-center justify-content-center pl-0 pr-5 pt-5 pb-5">
						<div id="container" className="w-100 h-100  shadow-lg rounded-right"></div>
						<button id="play" className="btn btn-primary btn-lg position-absolute rounded-circle" ><i className="fas fa-play"></i></button>
					</div>	
				</div>
			</div>
		)
	}
}


export default Mapa;