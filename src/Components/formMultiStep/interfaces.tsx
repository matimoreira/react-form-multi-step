export interface IMarathon {
	idMarathon:number,
	title: string, 
	raceStartDate: string, 
	registrationDeadline: string,
	registrationStartDate: string,
	initialLatitude: string,
	initialLongitude: string,
	finalLatitude: string,
	finalLongitude: string,
	competitorsLimit: number,
	category: number,
	detail: string,
	jsonUploaded: boolean
}

export interface IDatosMap {
	route: number[][],
	parades: IParade [],
}

export interface IParade {
	idParade: number,
	idMarathon: number,
	longitude: string,
	latitude: string,
	ordernumber: number
}