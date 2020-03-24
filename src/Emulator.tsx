import React from 'react';
import {useState, useEffect} from  'react';

import Header from './Components/formMultiStep/Header';
import FormMultiStep from './Components/formMultiStep/FormMultiStep';
import CardPage from './Components/Card/CardPage';
import {IMarathon, IDatosMap, IParade} from  './Components/formMultiStep/interfaces';

function Marathones() {
	let bandera = 1;
	
	const title = 'Maratones';

	const _state = {
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

	const [datosMarathon, setDatosMarathon] = useState(new Array<IMarathon>());

	const [state, setState] = useState(_state);
	

	const handleGetTotalPage = async () => {
		let response;
		let json;
		try {
			response = await fetch(
			`https://localhost:44308/api/Marathons/GetTotalPage/
			${state.pagination.pageSize}`);
			json = await response.json();
		} catch(e) {
			console.log('fallo handleGetTotalPage');
		}
		let newState = state;
		newState.pagination.pageTotal = json;
		setState(newState);

		/*console.log(newState.pagination);
		console.log(json);*/
	}

	const handlePaginationMarathon = async (start: number) => {
		console.log("Llamo a handlePaginationMarathon");
		let success = true;
		let json;
		let end = state.pagination.pageSize;

		try{
			let response = await fetch(
			`https://localhost:44308/api/Marathons/GetMarathon/
			${start}/
			${end}`
			);
			json = await response.json();
		} catch(e) {
			console.log('fallo post marathon', e);
			 success = false;
		}

		if (success) {
			let newState = state;
			let newDatosMarathon = datosMarathon;
			newDatosMarathon = newDatosMarathon.concat(json);
			/*newState.datosMarathones = [...newState.datosMarathones, ...json];*/
			newState.pagination.page = start;
			newState.pagination.hasMore = start >= newState.pagination.pageTotal ? false : true ;

			setDatosMarathon(newDatosMarathon);
			setState(newState);
			console.log(newState);
			console.log(state);
		}
	}

	useEffect(() => {
		handleGetTotalPage();
		handlePaginationMarathon(state.pagination.page);
	}, []);

	return(
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-12">
					<CardPage 
						datosMarathones={datosMarathon}
						paginationMarathon={handlePaginationMarathon}
						pagination={state.pagination}>
					</CardPage>
				</div>					
			</div>
		</div>

	);
}
export default Marathones;