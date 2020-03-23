import React from 'react';
import Mapa from './../mapa/Mapa';

interface FormProps {
	onFormSubmit({}): void;
}

const RouteMarathon = (props: FormProps) => {
	return (
		<div>
			<div className='bg-light m-4 p-4 rounded border border-light shadow'>
				<div className="display-4 text-center">Ruta</div>
				<Mapa onFormSubmit={props.onFormSubmit}/>
				
			</div>
		</div>
	);
}



export default RouteMarathon;
