import React from 'react';
import {IMarathon} from  '../formMultiStep/interfaces';

interface CardProps {
	marathon: IMarathon;
}

const Card = (props: CardProps) => {
	let raceStartDate = new Date(props.marathon.raceStartDate);
	return (
		<div className="col-md-6 col-sm-12">
			<div className="card mt-4 rounded border border-light shadow">
				<img src="https://www.runnea.com/archivos/201606/recorrido-maraton-berlin-840xXx80.jpg?0" className="card-img-top" alt="imagen"/>
				<div className="card-body text-left">
					<h5 className="card-title">{props.marathon.title}</h5>
					<p className="card-text">{props.marathon.detail}</p>
					<p className="card-text">{ `Fecha: ${raceStartDate.toLocaleDateString()}`}</p>
					<div className="btn btn-primary">Inscribirse</div>
				</div>
			</div>
		</div>
	)
}
export default Card

/*class Card extends React.Component{
	render(){
		const { urlMap, title, description, dayhour} = this.props;
		return (
			<div class="card text-center">
				<div class="card-header">Featured</div>
				<div class="card-body">
					<img src={urlMap} className="card-img-top" alt="imagen"/>
					<h5 class="card-title">{title}</h5>
					<p class="card-text">{description}</p>
					<a href="#" class="btn btn-primary">{dayhour}</a>
				</div>
				<div class="card-footer text-muted">
					2 days ago
				</div>
			</div>

			
		)
	}
}
export default Card*/