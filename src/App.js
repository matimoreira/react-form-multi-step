import React from 'react';
import './App.css';

import Header from './Components/Header';
import FormMultiStep from './Components/FormMultiStep';

class App extends React.Component {
	title = 'Maratones';
	state = 
	{
		datosMarathones: [{
			IdMarathon: 1, 
			title: '', 
			RaceStartDate: '2020-05-03 00:00:00.000', 
			RegistrationDeadline: '2020-05-02 00:00:00.000',
			RegistrationStartDate: '2020-04-02 00:00:00.000',
			InitialLatitude: '-27.36543787922855',
			InitialLongitude: '-55.916355238035294',
			FinalLatitude: '-27.377938174767543',
			FinalLongitude: '-55.916355238035294',
			CompetitorsLimit: 100,
			category: 1,
			detail: 'Carrera en favor de los niños de Africa',
			JsonUploaded: false
		}],
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
		pagination: { page: 0, pageSize: 5, pageTotal: 1}
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


	render(){
		return(
			<div className="container mt-3">
				<Header title={this.title}></Header>
				<div className="row">
					<div className="col-md-6">
						<FormMultiStep 
							addMarathonStepOne={this.handleAddMarathonStepOne} 
							addMarathonStepTwo={this.handleAddMarathonStepTwo}
							addMarathonStepThree={this.handleAddMarathonStepThree}></FormMultiStep>
					</div>
					<div className="col-md-6">

					</div>					
				</div>
			</div>

		)
	}
}

export default App;
