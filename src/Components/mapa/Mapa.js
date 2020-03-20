import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import './Mapa.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VzdG9ycmVzZXJ2YXRlc2lzIiwiYSI6ImNrMHdvcmduZzAydG8zb28zM2Q0ejI3dDIifQ.M8OxCaPxutyak1dDn7rd8w';

class Mapa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: {
				lng: "-55.92408",
				lat: "-27.37508"
			},
			parades: []
		};
	}



	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.state.screen.lng, this.state.screen.lat],
			zoom: 13
		});


		map.on('move', () => {
			let state = this.state;
			state.screen.lng = map.getCenter().lng.toFixed(5);
			state.screen.lat = map.getCenter().lat.toFixed(5);
			this.setState(state);
		});

		const btnAgregarParada = document.getElementById('btn--agregar-parada');
		const btnGuardarParada = document.getElementById('btn--guardar-parada');
		const btnCancelar = document.getElementById('btn--cancelar');
		
		document.addEventListener('click', ()=>{
			map.resize();
		});

		let marker;
		btnAgregarParada.addEventListener('click', ()=>{

			btnAgregarParada.classList.add('d-none');
			btnCancelar.classList.remove('d-none');
			btnGuardarParada.classList.remove('d-none');
			
			marker = new mapboxgl.Marker({
				draggable: true
			})
			.setLngLat([this.state.screen.lng, this.state.screen.lat])
			.addTo(map);
		});

		btnGuardarParada.addEventListener('click', ()=>{
			btnAgregarParada.classList.remove('d-none');
			btnCancelar.classList.add('d-none');
			btnGuardarParada.classList.add('d-none');
			
			let state = this.state;
			let parade = marker.getLngLat();
			// cambia el tipo de dato de lng y lat de int a string
			parade.lng = ''+parade.lng;
			parade.lat = ''+parade.lat;
			parade.order = state.parades.length + 1;
			state.parades.push(parade);

			this.setState(state);
			console.log(this.state);
			marker.remove();
		});

		btnCancelar.addEventListener('click', ()=>{
			btnAgregarParada.classList.remove('d-none');
			btnCancelar.classList.add('d-none');
			btnGuardarParada.classList.add('d-none');

			marker.remove();
		});

		var draw = new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				line_string: true,
				trash: true
			},
			styles: [
				{
					'id': 'gl-draw-line',
					'type': 'line',
					'filter': [
						'all',
						['==', '$type', 'LineString'],
						['!=', 'mode', 'static']
					],
					'layout': {
						'line-cap': 'round',
						'line-join': 'round'
					},
					'paint': {
						'line-color': '#20E2E4',
						'line-dasharray': [0.2, 2],
						'line-width': 4,
						'line-opacity': 0.7
					}
				},
				{
					'id': 'gl-draw-polygon-and-line-vertex-active',
					'type': 'circle',
					'filter': [
						'all',
						['==', 'meta', 'vertex'],
						['==', '$type', 'Point'],
						['!=', 'mode', 'static']
					],
					'paint': {
						'circle-radius': 6,
						'circle-color': '#121CF0'
					}
				}
			]
		});

		map.addControl(draw);


		// usa coordenadas dibujadas para realizar peticion de direcciones
		const updateRoute = () => {
			removeRoute();
			var data = draw.getAll();
			var lastFeature = data.features.length -1;
			var coords = data.features[lastFeature].geometry.coordinates;


			var newCoords = coords.join(';');
			getMatch(newCoords);
		}

		// realiza peticion de direcciones
		const getMatch = (e) => {
			let url = `https://api.mapbox.com/directions/v5/mapbox/walking/${e}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;
			
			
			let req = new XMLHttpRequest();
			req.responseType = 'json';
			req.open('GET', url, true);
			req.onload = () => {
				let jsonResp = req.response;
				let geometry = jsonResp.routes[0].geometry;
				let mts = jsonResp.routes[0].distance;

				let state = this.state;
				state.mts = Math.ceil(mts);
				// cambia el tipo de dato de lng y lat de int a string
				state.route = geometry.coordinates.map(coord => {
					coord[0] = ''+coord[0];
					coord[1] = ''+coord[1];
					return coord;
				});

				this.setState(state);

				addRoute(geometry);
			}
			req.send();			
		}

		function addRoute(coords) {
			if (map.getSource('route')) {
				map.removeLayer('route');
				map.removeSource('route');
			} else {
				map.addLayer({
					'id': 'route',
					'type': 'line',
					'source': {
						'type': 'geojson',
						'data': {
							'type': 'Feature',
							'properties': {},
							'geometry': coords
						}
					},
					'layout': {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': '#00A700',
						'line-width': 5,
						'line-opacity': 0.8
					}
				});
			}
		}

		function removeRoute() {
			if (!map.getSource('route')) return;
			
			map.removeLayer('route');
			map.removeSource('route');
		}
		
		map.on('draw.create', updateRoute);
		map.on('draw.update', updateRoute);
		map.on('draw.delete', removeRoute);
	}

	handlerEnviar = (e) => {
        this.props.onFormSubmit(this.state);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div ref={el => this.mapContainer = el} className="mapContainer" />
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-left">
						<div className='sidebarStyle'>
							<button id="btn--agregar-parada" className="btn btn-primary "><i className="fas fa-plus"></i> Agregar Parada</button>
							<button id="btn--guardar-parada" className="btn btn-success d-none"><i className="fas fa-map-marked-alt"></i> Guardar Punto</button>
							<button id="btn--cancelar" className="btn btn-danger ml-1 d-none"><i className="fas fa-trash-alt"></i> Cancelar</button>
						</div>
						<div className="d-flex justify-content-between pt-4">
							<a className="btn btn-info m-1" data-slide="prev" href="#carouselExampleControls">Prev</a>
							<div className="btn btn-primary m-1" onClick={this.handlerEnviar} >Save</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Mapa;