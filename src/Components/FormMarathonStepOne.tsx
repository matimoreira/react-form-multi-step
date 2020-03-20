import React from 'react';

interface FormStepOneProps {
	onFormSubmit({}): void;
}



class FormMarathonStepOne extends React.Component<FormStepOneProps> {
	state = { title: '', competitors_limit: '100', category: 1, detail: '' };

	handlerEnviar = (e:any) => {
		e.preventDefault();
		this.props.onFormSubmit( this.state);
	};

	render(){
		return (
			<div>
				<form className='bg-light m-4 p-4 rounded border border-light shadow'>
					<div className="display-4 text-center">Cabecera...</div>
					<label className="control-label">Titulo</label>
					<input className="form-control p-2" type='text' value={this.state.title} onChange={(e) => this.setState({title:e.target.value}) }/>
					<label className="control-label">Limite de Competidores</label>
					<input className="form-control p-2" type='number' value={this.state.competitors_limit} onChange={(e) => this.setState({competitors_limit:e.target.value}) } />
					<label className="control-label">Categoria</label>
					<input className="form-control p-2" type='number' value={this.state.category} onChange={(e) => this.setState({category:e.target.value}) }/>
					<label className="control-label">Detalles</label>
					<textarea className="form-control p-2" rows={1} value={this.state.detail} onChange={(e) => this.setState({detail:e.target.value}) } />
					<div className="d-flex justify-content-end pt-4">
						<a className="btn btn-primary" data-slide="next" href="#carouselExampleControls" onClick={this.handlerEnviar}>Next</a>
					</div>
				</form>
			</div>
		);
	};
}



export default FormMarathonStepOne;
