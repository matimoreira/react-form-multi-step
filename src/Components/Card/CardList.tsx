import React from 'react';
import Card from './Card';
import InfiniteScroll from "react-infinite-scroll-component";
import {IMarathon} from  '../formMultiStep/interfaces';

interface CardListProps {
	datosMarathones: Array<IMarathon>;
	paginationMarathon({}): void;
	pagination: {page: number, pageSize: number, pageTotal: number, hasMore: boolean};
	/*page: number;
	pageTotal: number;*/
}

const CardList = (props: CardListProps) => {

	console.log('props.datosMarathones: ', props.datosMarathones);

	let hasMore = true;

	const listOfMarathones = props.datosMarathones.map((row, i) => {
		return <Card marathon={row} key={i} ></Card>
	});

	const fetchMoreData = () => {		
		setTimeout(() => { props.paginationMarathon(props.pagination.page + 1) }, 1500);
	};


	return (
		<div  className="w-100">
			<InfiniteScroll
				dataLength={props.datosMarathones.length}
				next={fetchMoreData}
				hasMore={props.pagination.hasMore}
				loader={
					<div className="text-center mt-4 mb-4" >
						<div className="spinner-border text-info" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				}
				endMessage={
					<div className="text-center mt-4 mb-4">
						<b>Es todo!! Ya has visto todas las Maratones</b>
					</div>
				}
			>
				<div  className="row m-1">{ listOfMarathones }</div>
			</InfiniteScroll>
		</div>
		
	)
}
export default CardList