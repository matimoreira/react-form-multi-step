import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import cogoToast from 'cogo-toast';

const CLOUDINARY_UPLOAD_PRESET = 'as1aba8t';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/marathon-project/image/upload';

export default class FileUploader3 extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  uploadedFileCloudinaryUrl: ''
		};
	}

	onImageDrop(files) {
	this.setState({
		uploadedFile: files[0]
	});

	this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		try{
			let response = await fetch('https://localhost:44308/api/Marathons/PostMarathon', settings);
			return await response.json();
		} catch(e) {
			console.log('fallo post marathon', e);
		}
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
							.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
							.field('file', file);

		upload.end((err, response) => {
			if (err) {
			console.error(err);
			}

			if (response.body.secure_url !== '') {
			this.setState({
				uploadedFileCloudinaryUrl: response.body.secure_url
			});
			}
		});
	}


	render() 
	{
		return(            
			<div>
				<div className="FileUpload">
					<Dropzone
						onDrop={this.onImageDrop.bind(this)}
						onDropAccepted={cogoToast.success("Archivo subido correctamente!")}
						onDropRejected={cogoToast.error("Hubo un error al subir el archivo!")}
						accept="image/*"
						multiple={false}>
						{({getRootProps, getInputProps}) => {
							return (
							<div
								{...getRootProps()}
							>
								<input {...getInputProps()} />
								{
								<p>Try dropping some files here, or click to select files to upload.</p>
								}
							</div>
							)
						}}
					</Dropzone>
				</div>
		
				<div>
				{this.state.uploadedFileCloudinaryUrl === '' ? null :
				<div>
					<p>{this.state.uploadedFile.name}</p>
					<img src={this.state.uploadedFileCloudinaryUrl} />
				</div>}
				</div>
			</div>
		)             
	}
}