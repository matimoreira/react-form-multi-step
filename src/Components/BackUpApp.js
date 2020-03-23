import React from 'react';
import './App.css';

import Header from './Components/formMultiStep/Header';
import FormMultiStep from './Components/formMultiStep/FormMultiStep';
import CardPage from './Components/Card/CardPage'

class App extends React.Component {
	title = 'Maratones';
	state = 
	{
		datosMarathones:[],
		datosMarathon: {
			title: '', 
			RaceStartDate: '', 
			RegistrationDeadline: '',
			RegistrationStartDate: '',
			InitialLatitude: '',
			InitialLongitude: '',
			FinalLatitude: '',
			FinalLongitude: '',
			CompetitorsLimit: 100,
			category: 1,
			detail: '',
			JsonUploaded: false
		},
		datosMap:{},
		pagination: { page: 0, pageSize: 4, pageTotal: 1, hasMore: true}
	};

	handleAddMarathonStepOne = (marathon) => {
		let state = this.state;
		state.datosMarathon.title = marathon.title;

		state.datosMarathon.CompetitorsLimit = parseInt(marathon.competitors_limit);
		state.datosMarathon.category = parseInt(marathon.category);
		state.datosMarathon.detail = marathon.detail;

		this.setState(state);
	}
	handleAddMarathonStepTwo = (marathon) => {
		let state = this.state;

		state.datosMarathon.RaceStartDate = marathon.race_start_date;
		state.datosMarathon.RegistrationDeadline = marathon.registration_deadline;
		state.datosMarathon.RegistrationStartDate = marathon.registration_start_date;

		this.setState(state);
	}
	handleAddMarathonStepThree = async (datosMap) => {
		let state = this.state;

		let LngLatIni = datosMap.route[0];
		let LngLatFin = datosMap.route[datosMap.route.length-1];

		state.datosMarathon.InitialLongitude = ''+LngLatIni[0];
		state.datosMarathon.InitialLatitude = ''+LngLatIni[1];

		state.datosMarathon.FinalLongitude = ''+LngLatFin[0];
		state.datosMarathon.FinalLatitude = ''+LngLatFin[1];

		state.datosMap = datosMap;

		this.setState(state);

		let newMarathon = await this.postMarathon();
		this.postParades(newMarathon);
	}

	settingsPost = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	postMarathon = async () => {

		this.settingsPost.body = this.state.datosMarathon;
		
		try{
			let response = await fetch('https://localhost:44308/api/Marathons/PostMarathon', this.settingsPost);
			return await response.json();
		} catch(e) {
			console.log('fallo post marathon', e);
		}
	}

	postParades = async (newMarathon) => {
		
		console.log('New marathon', newMarathon.idMarathon);
		this.settingsPost.body = newMarathon.idMarathon;

		try{
			//let response = await fetch('https://localhost:44308/api/Marathons/PostMarathon', settings);
			//return response;
		} catch(e) {
			console.log('fallo post parades', e);
		}
	}


	handleGetTotalPage = async () => {
		let response = await fetch(
		`https://localhost:44308/api/Marathons/GetTotalPage/
		${this.state.pagination.pageSize}`);
		let json = await response.json();
		let pagination = this.state.pagination;

		pagination.pageTotal = json;

		console.log(pagination);
		console.log(json);
		this.setState( ( json === '' ? { pageTotal: ['Error'] } : { pagination:  pagination } ) );
		console.log(`this.state.pagination.pageTotal ${this.state.pagination.pageTotal}`);
	}

	handlePaginationMarathon = async (start) => {
		console.log("Llamo a handlePaginationMarathon");
		let json;
		let end = this.state.pagination.pageSize;
		try{
			let response = await fetch(
			`https://localhost:44308/api/Marathons/GetMarathon/
			${start}/
			${end}`
			);
			json = await response.json();
		} catch(e) {
			console.log('fallo post marathon', e);
		}
		let newState = this.state;
		newState.datosMarathones = [...newState.datosMarathones, ...json];
		newState.pagination.page = start;
		newState.pagination.hasMore = start >= newState.pagination.pageTotal ? false : true ;
		this.setState(newState);
		console.log(newState);
		/*console.log(this.state);
		console.log(json);*/
	}

	async componentDidMount() {
		this.handleGetTotalPage();
		this.handlePaginationMarathon(this.state.pagination.page);
	}

	render(){
		return(
			<div className="container mt-3">
				<Header title={this.title}></Header>
				<div className="row">
					<div className="col-md-6">
						<FormMultiStep 
							addMarathonStepOne={this.handleAddMarathonStepOne} 
							addMarathonStepTwo={this.handleAddMarathonStepTwo}
							addMarathonStepThree={this.handleAddMarathonStepThree}>
						</FormMultiStep>
					</div>
					<div className="col-md-6">
						<CardPage 
							datosMarathones={this.state.datosMarathones}
						 	paginationMarathon={this.handlePaginationMarathon}
						 	pagination={this.state.pagination}>
						</CardPage>
					</div>					
				</div>
			</div>

		)
	}
}
/*page={this.state.pagination.page}
pageTotal={this.state.pagination.pageTotal}
has*/
export default App;
