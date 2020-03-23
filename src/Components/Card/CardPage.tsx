import React from 'react';
import CardList from './CardList';
import {IMarathon} from  '../formMultiStep/interfaces';

interface CardPageProps {
	children: never[];
	datosMarathones: Array<IMarathon>;
	paginationMarathon({}): void;
	pagination: {page: number, pageSize: number, pageTotal: number, hasMore: boolean};
	/*page: number;
	pageTotal: number;*/
}

const CardPage = (props: CardPageProps) => {
	console.log(props.datosMarathones);
	return (
		<div className="container">
			<CardList 
				datosMarathones={props.datosMarathones} 
				paginationMarathon={props.paginationMarathon} 
				pagination={props.pagination}
			/>
		</div>
		
	)
}
export default CardPage
/*
page={props.page}
pageTotal={props.pageTotal}

<div className="row justify-content-md-center">
				
					<CardList datosMarathones={props.datosMarathones}/>
			</div>*/
