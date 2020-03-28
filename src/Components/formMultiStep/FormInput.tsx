import React from 'react';
import {useState, useEffect} from  'react';
import {IFormInput as FormInputProps} from  './interfaces';
import { Button, Form} from 'react-bootstrap';

function FormInput(props: FormInputProps) {




	const input = () => {
		if (props.isSelect) {

			let options = (props.optionsValues != undefined ? props.optionsValues : [] ).map((value, i) => {
				return( 
					<option value={value} >{(props.optionsLabels != undefined ? props.optionsLabels : [] )[i]}</option>
				)
			});

			return(
				<Form.Control as="select"
					name={props.id} 
					value={props.value}
					isValid={props.isValid} 
					isInvalid={props.isInvalid}
					onBlur={props.handleBlur}
					onChange={props.setValue}>
						{options}
				</Form.Control>
			);
		}
		return(
			<Form.Control as={( props.isTextArea ? "textarea" : "input")}
				type={props.type}
				placeholder={props.placeholder}
				name={props.id}
				value={props.value}
				onChange={props.setValue}
				onBlur={props.handleBlur}
				isValid={props.isValid}
				isInvalid={props.isInvalid}
			/>
			/*<Form.Control as={( props.isTextArea ? "textarea" : "input")}
				required={ props.required ? true : false}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={(e:any) => props.setValue(e.target.value)}
			/>*/
		);
	}

	return (
		<div>
			<Form.Group controlId={props.id}>
				<Form.Label>{props.label}</Form.Label>
				{input()}
				<Form.Control.Feedback type="invalid">{props.invalid_feedback}</Form.Control.Feedback>
				<Form.Control.Feedback>{props.valid_feedback}</Form.Control.Feedback>
			</Form.Group>
		</div>
	)
}
export default FormInput;



/*<Form.Group controlId={props.id}>
	<Form.Label>{props.label}</Form.Label>
	{input()}
	<Form.Control.Feedback type="invalid">{props.invalid_feedback}</Form.Control.Feedback>
	<Form.Control.Feedback>{props.valid_feedback}</Form.Control.Feedback>
</Form.Group>*/
			/*<Form.Group controlId={props.id}>
				<Form.Label>{props.label}</Form.Label>
				<Form.Control
					type="text"
					name="firstName"
					value={values.firstName}
					onChange={handleChange}
					isValid={touched.firstName && !errors.firstName}
				/>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
			</Form.Group>*/