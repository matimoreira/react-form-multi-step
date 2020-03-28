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

export interface IFormStepOneProps {
	onFormSubmit({}, errors: boolean): void;
}

export interface IFormStepTwoProps {
	onFormSubmit({}): void;
}

export interface IFormInput{
	id: string | undefined,
	label: string,
	type: string,
	placeholder: string,
	value: string | number,
	setValue(value:any):void,
	handleBlur(e : any):void,
	/*validation(value:any):void,*/
	valid_feedback: string,
	invalid_feedback?: string,
	isTextArea: boolean,
	isSelect: boolean,
	optionsValues?: any[],
	optionsLabels?: string[],
	isValid?: boolean,
	isInvalid?:boolean
}