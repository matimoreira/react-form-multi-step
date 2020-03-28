import React from 'react';
import {useState, useEffect} from  'react';
import { Button, Form} from 'react-bootstrap';
import { Formik } from "formik";
import { useFormik } from 'formik';
import * as Yup from "yup";

import {IFormStepOneProps as FormStepOneProps} from  './interfaces';
import FormInput from './FormInput';


function FormMarathonStepOne(props: FormStepOneProps) {
	const _state = { title: '', competitorsLimit: 100, category: 1, detail: '' };
	const [state, setState] = useState(_state);

	const schema = Yup.object({
		title: Yup.string().required('El titulo no puede estar vacio :/'),
		competitorsLimit: Yup.number().min(2, 'Si no son mas de 1, no puede ser una competencia').required(),
		category: Yup.string().required(),
		detail: Yup.string().min(20, 'El detalle debe tener al menos 20 caracteres ?)').required('Pensamos que los competidores desearían querer saber más')
	});

	const handlerEnviar = (e:any) => {
		let newState = state;




		newState.title = formik.values.title;
		newState.competitorsLimit = formik.values.competitorsLimit;
		newState.category = formik.values.category;
		newState.detail = formik.values. detail;

		setState(newState);
		props.onFormSubmit(state, (!!formik.errors.title || !!formik.errors.competitorsLimit || !!formik.errors.category || !!formik.errors.detail) || newState.title =='');
	}

	const formik = useFormik({
		initialValues: {title: '', competitorsLimit: 100, category: 5, detail: ''},
		validationSchema:schema,
		onSubmit: values => {
      		alert(JSON.stringify(state, null, 2));
    	},
	});

	const disableLink = () => {
		let a = document.getElementById('next');
		a!.setAttribute('href', '');
	}

	return(
		<Form id="FormMarathonStepOne"  noValidate className="bg-light m-4 p-4 rounded border border-light shadow needs-validation" onSubmit={formik.handleSubmit}>
			<div className="display-4 text-center">Datos</div>
			<FormInput 
				id="title"
				label="Titulo"
				type="text"
				value={formik.values.title}
				setValue={formik.handleChange}
				handleBlur={formik.handleBlur}
				valid_feedback="Un buen titulo"
				invalid_feedback={formik.errors.title}
				placeholder="Maraton por ..."
				isSelect={false}
				isTextArea={false}
				isValid={formik.touched.title && !formik.errors.title}
				isInvalid={!!formik.errors.title}
				/>
			<FormInput 
				id="competitorsLimit"
				label="Limite de Competidores"
				type="number"
				value={formik.values.competitorsLimit}
				setValue={formik.handleChange}
				handleBlur={formik.handleBlur}
				valid_feedback="Nos parece bien :D"
				invalid_feedback={formik.errors.competitorsLimit}
				placeholder="Un numero entre mayor a 0"
				isSelect={false}
				isTextArea={false}
				isValid={formik.touched.competitorsLimit && !formik.errors.competitorsLimit}
				isInvalid={!!formik.errors.competitorsLimit}
				/>
			<FormInput 
				id="category"
				label="Categoria"
				type="select"
				value={formik.values.category}
				setValue={formik.handleChange}
				handleBlur={formik.handleBlur}
				valid_feedback="Una buena decisión"
				invalid_feedback={formik.errors.category}
				placeholder="Un numero entre mayor a 0"
				isSelect={true}
				optionsValues={[5, 10,20,40,80]}
				optionsLabels={['5K', '10K', '20K', '40K', '80K']}
				isTextArea={false}
				isValid={formik.touched.category && !formik.errors.category}
				isInvalid={!!formik.errors.category}
				/>
			<FormInput 
				id="detail"
				label="Detalles"
				type="text"
				value={formik.values.detail}
				setValue={formik.handleChange}
				handleBlur={formik.handleBlur}
				valid_feedback="Perfecto :J"
				invalid_feedback={formik.errors.detail}
				placeholder="Una descripcion de la maraton"
				isSelect={false}
				isTextArea={true}
				isValid={formik.touched.detail && !formik.errors.detail}
				isInvalid={!!formik.errors.detail}
				/>
			<div className="d-flex justify-content-end pt-4">
				<a className="btn btn-primary m-1" data-slide="next" href="#carouselExampleControls" onClick={handlerEnviar}>Next</a>
			</div>
		</Form>
	);
}
export default FormMarathonStepOne;

