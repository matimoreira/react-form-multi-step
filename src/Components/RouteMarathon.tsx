import React from 'react';

const RouteMarathon = (props: any) => {
	return (
		<div>
			<form className='bg-light m-4 p-4 rounded border border-light shadow'>
				<h1 className="display-5">Mapa</h1>
				<div className="d-flex justify-content-center pt-4">
					<a className="btn btn-info m-1" data-slide="prev" href="#carouselExampleControls">Prev</a>
					<div className="btn btn-primary m-1" >Save</div>
				</div>

			</form>
		</div>
	);
}



export default RouteMarathon;
