import React from 'react';

interface FormStepTwoProps {
	onFormSubmit({}): void;
}
class FormMarathonStepTwo extends React.Component<FormStepTwoProps> {
	state = { race_start_date: '', registration_deadline: '', registration_start_date: ''};
	handlerEnviar = (e:any) => {
		e.preventDefault();
		this.props.onFormSubmit( this.state);
	};

	render(){
		return (
			<div>
				<form className='bg-light m-4 p-4 rounded border border-light shadow'>
					<div className="display-4 text-center">Fechas...</div>
					<label className="control-label" >Fecha y Hora de inicio</label>
					<input className="form-control p-2" type='date' value={this.state.race_start_date} onChange={(e) => this.setState({race_start_date:e.target.value}) } />
					<label className="control-label">Fecha de inicio para los registros</label>
					<input className="form-control p-2" type='date' value={this.state.registration_deadline} onChange={(e) => this.setState({registration_deadline:e.target.value}) } />
					<label className="control-label">Fecha de fin para los registros</label>
					<input className="form-control p-2" type='date' value={this.state.registration_start_date} onChange={(e) => this.setState({registration_start_date:e.target.value}) } />
					<div className="d-flex justify-content-between pt-4" >
						<a className="btn btn-info m-1" data-slide="prev" href="#carouselExampleControls">Prev</a>

						<a className="btn btn-primary m-1" data-slide="next" href="#carouselExampleControls" onClick={this.handlerEnviar}>Next</a>
					</div>
				</form>
			</div>
		);
	};
}



export default FormMarathonStepTwo;
