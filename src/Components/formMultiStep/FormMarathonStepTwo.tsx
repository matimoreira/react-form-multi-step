import React from 'react';
import {useState, useEffect} from  'react';

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import {IFormStepTwoProps} from  './interfaces';
registerLocale('es', es)


function FormMarathonStepTwo(props: IFormStepTwoProps) {
	const _datosMarathon = {
		raceStartDate: '', 
		registrationDeadline: '',
		registrationStartDate: ''
	};
	const addDays = (date: Date, days: number): Date => {
		let newDate = new Date();
		newDate.setDate(date.getDate() + days);
		return newDate;
	}

	const [raceStartDate, setRaceStartDate] = useState(addDays(new Date(), 1));
	const [registrationDeadline, setRegistrationDeadline] = useState(addDays(new Date(), 1));
	const [registrationStartDate, setRegistrationStartDate] = useState(addDays(new Date(), 1));
	
	const [datosMarathon, setDatosMarathon] = useState(_datosMarathon);

	const handlerEnviar = () => {
		let newDatosMarathon = datosMarathon;
		console.log(raceStartDate.toJSON());
		console.log(JSON.stringify(raceStartDate));
		console.log(new Date(raceStartDate.toJSON()))
		newDatosMarathon.raceStartDate = raceStartDate.toJSON();
		newDatosMarathon.registrationDeadline = JSON.stringify(registrationDeadline);
		newDatosMarathon.registrationStartDate = JSON.stringify(registrationStartDate);
		setDatosMarathon(newDatosMarathon);
		props.onFormSubmit( datosMarathon);
	};

	

	return (
			<div>
				<form className='bg-light m-4 p-4 rounded border border-light shadow'>
					<div className="display-4 text-center">Fechas...</div>
					<div className="control-label">Fecha y Hora de inicio</div>
					<DatePicker
						popperClassName="ninguna"
						className="form-control m-2 w-100"
						locale="es"
						withPortal
						showTimeSelect
						timeIntervals={15}
						timeFormat="HH:mm"
						dateFormat="yyyy-MM-dd HH:mm"
						selected={raceStartDate}
						minDate={new Date()}
						onChange={
							(date) => { 
								let newRaceStartDate = raceStartDate;
								newRaceStartDate = !date ? new Date() : date;
								console.log('date: ',date);						
								setRaceStartDate(newRaceStartDate);
							}
						}
					/>
					<div className="control-label">Fecha de inicio para los registros</div>
					<DatePicker
						popperClassName="ninguna"
						className="form-control m-2 w-100"
						locale="es"
						withPortal
						showTimeSelect
						timeIntervals={15}
						timeFormat="HH:mm"
						dateFormat="yyyy-MM-dd HH:mm"
						selected={registrationStartDate}
						minDate={new Date()}
						maxDate={raceStartDate} 
						onChange={
							(date) => { 
								let newRegistrationStartDate = registrationStartDate;
								newRegistrationStartDate = !date ? new Date() : date;
								setRegistrationStartDate(newRegistrationStartDate);
							}
						}
					/>
					<div className="control-label">Fecha de fin para los registros</div>
					<DatePicker
						popperClassName="ninguna"
						className="form-control m-2 w-100"
						locale="es"
						withPortal
						showTimeSelect
						timeIntervals={15}
						timeFormat="HH:mm"
						dateFormat="yyyy-MM-dd HH:mm"
						selected={registrationDeadline} 
						minDate={addDays(registrationStartDate, 1)}
						maxDate={raceStartDate} 
						onChange={
							(date) => { 
								let newRegistrationDeadline = registrationDeadline;
								newRegistrationDeadline = !date ? new Date() : date;
								setRegistrationDeadline(newRegistrationDeadline);
							}
						}
					/>
					<div className="d-flex justify-content-between pt-4" >
						<a className="btn btn-info m-1" data-slide="prev" href="#carouselExampleControls">Prev</a>

						<a className="btn btn-primary m-1" data-slide="next" href="#carouselExampleControls" onClick={handlerEnviar}>Next</a>
					</div>
				</form>
			</div>
		);

}
export default FormMarathonStepTwo