import React from 'react';
import './App.css';

import Header from './Components/Header';
import FormMultiStep from './Components/FormMultiStep';

class App extends React.Component {
	title = 'Maratones';
	state = 
	{
		datosMarathones: [{
			id_marathon: 1, 
			title: '', 
			race_start_date: '2020-05-03 00:00:00.000', 
			registration_deadline: '2020-05-02 00:00:00.000',
			registration_start_date: '2020-04-02 00:00:00.000',
			initial_latitude: '-27.36543787922855',
			initial_longitude: '-55.916355238035294',
			final_latitude: '-27.377938174767543',
			final_longitude: '-55.916355238035294',
			competitors_limit: '100',
			category: 1,
			detail: 'Carrera en favor de los niños de Africa',
			json_uploaded: 0
		}],
		datosMarathon: {
			id_marathon: 1, 
			title: '', 
			race_start_date: '', 
			registration_deadline: '',
			registration_start_date: '',
			initial_latitude: '',
			initial_longitude: '',
			final_latitude: '',
			final_longitude: '',
			competitors_limit: '100',
			category: 1,
			detail: '',
			json_uploaded: 0
		},
		datosMap:{},
		pagination: { page: 0, pageSize: 5, pageTotal: 1}
	};
	handleAddMarathonStepOne = (marathon) => {
		let state = this.state;
		state.datosMarathon.title = marathon.title;

		state.datosMarathon.competitors_limit = marathon.competitors_limit;
		state.datosMarathon.category = marathon.category;
		state.datosMarathon.detail = marathon.detail;

		this.setState(state);

		
		console.log(marathon);
		console.log(this.state.datosMarathon);
	}
	handleAddMarathonStepTwo = (marathon) => {
		let state = this.state;

		state.datosMarathon.race_start_date = marathon.race_start_date;
		state.datosMarathon.registration_deadline = marathon.registration_deadline;
		state.datosMarathon.registration_start_date = marathon.registration_start_date;

		this.setState(state);
		
		console.log(marathon);
		console.log(this.state.datosMarathon);
	}
	render(){
		return(
			<div className="container mt-3">
				<Header title={this.title}></Header>
				<div className="row">
					<div className="col-md-6">
						<FormMultiStep addMarathonStepOne={this.handleAddMarathonStepOne} addMarathonStepTwo={this.handleAddMarathonStepTwo}></FormMultiStep>
					</div>
					<div className="col-md-6">

					</div>					
				</div>
			</div>

		)
	}
}

export default App;
