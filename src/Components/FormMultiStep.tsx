import React from 'react';
import FormMarathonStepOne from './FormMarathonStepOne';
import FormMarathonStepTwo from './FormMarathonStepTwo';
import RouteMarathon from './RouteMarathon';

interface FormProps {
	addMarathonStepOne({}): void;
	addMarathonStepTwo({}): void;
	addMarathonStepThree({}): void;
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