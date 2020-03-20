import React from 'react';

const Header = (props: any) => {
	return (
		<div className="row">
			<div className="col-md-6">
				<h3>{`Añadir ${props.title}`}</h3>
				<hr/>
			</div>
			<div className="col-md-6">
				<h3>{`${props.title}`}</h3>
				<hr/>
			</div>
			
		</div>
	);
}



export default Header;