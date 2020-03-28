import React from 'react';
import FormMarathonStepOne from './FormMarathonStepOne';
import FormMarathonStepTwo from './FormMarathonStepTwo';
import RouteMarathon from './RouteMarathon';
import {IMarathon, IDatosMap, IParade} from  './interfaces';

/*interface IMarathon {
	IdMarathon:number,
	Title: string, 
	RaceStartDate: string, 
	RegistrationDeadline: string,
	RegistrationStartDate: string,
	InitialLatitude: string,
	InitialLongitude: string,
	FinalLatitude: string,
	FinalLongitude: string,
	CompetitorsLimit: number,
	Category: number,
	Detail: string,
	JsonUploaded: boolean
}

interface IDatosMap {
	route: number[][],
	parades: IParade[]
}

interface IParade {
	IdParade: number,
	IdMarathon: number,
	Longitude: string,
	Latitude: string,
	Ordernumber: number
}
*/
interface FormProps {
	children: never[];
	addMarathonStepOne(marathon: IMarathon, errors: boolean): void;
	addMarathonStepTwo(marathon: IMarathon): void;
	addMarathonStepThree: (datosMap: IDatosMap) => Promise<void>;
}


const FormMultiStep = (props: FormProps) => {
	return (
		<div id="carouselExampleControls" className="carousel slide" data-pause="true">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<FormMarathonStepOne onFormSubmit={props.addMarathonStepOne}></FormMarathonStepOne>
				</div>
				<div className="carousel-item">
					<FormMarathonStepTwo onFormSubmit={props.addMarathonStepTwo}></FormMarathonStepTwo>
				</div>
				<div className="carousel-item">
					<RouteMarathon onFormSubmit={props.addMarathonStepThree}></RouteMarathon>
				</div>
			</div>
		</div>
	);
}



export default FormMultiStep;