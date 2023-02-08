import React, { useState } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import './App.css';

function App() {
	const [imageSrc, setImageSrc] = useState('');
	const [cropper, setCropper] = useState();
	// const [cropData, setCropData] = useState();
	// const [fileMetadata, setFileMetadata] = useState();

	const [resultImages, setResultImages] = useState([]);

	const [uploading, setUploading] = useState(false);

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			// setFileMetadata(event.target.files[0]);

			const reader = new FileReader();
			reader.addEventListener('load', () =>
				setImageSrc(reader.result?.toString() || '')
			);
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const submitQueryImage = (event) => {
		event.preventDefault();
		if (typeof cropper !== 'undefined') {
			const image = cropper.getCroppedCanvas().toDataURL();

			const formData = new FormData();
			formData.append('image', image);
			formData.append('value', 2);

			setUploading(true);
			axios
				.post('/api/test2', formData)
				.then((res) => {
					setResultImages(res.data);
					setUploading(false);
				})
				.catch((err) => {
					setUploading(false);
				});
		};
	};

	return (
		<div>
			<input
				type="file"
				accept="image/png,image/jpeg"
				onChange={onSelectFile}
				disable={uploading.toString()}
			/>
			{imageSrc && (
				<div>
					<Cropper
						style={{ height: '50%', width: '50%' }}
						minCropBoxHeight={10}
						minCropBoxWidth={10}
						preview=".img-preview"
						viewMode={2}
						src={imageSrc}
						checkOrientation={false}
						onInitialized={(instance) => {
							setCropper(instance);
						}}
					/>

					<div className="box" style={{ width: '50%' }}>
						<h1>Preview</h1>
						<div
							className="img-preview"
							style={{ width: '100%', height: '200px' }}
						/>
					</div>

					<div>
						<button
							onClick={submitQueryImage}
							disable={uploading.toString()}
						>
							Submit
						</button>
					</div>
					{/* <img src={cropData} alt='Result' /> */}

					<div className='result-container'>
						{
							!uploading ?
								resultImages.map((result, index) => {
									// console.log(result.image);
									return (
										<img
											className='result-image'
											key={index}
											src={result.image}
											alt={`Result ${index}`}
										/>
									);
								})
								: (
									<div>Loading</div>
								)
						}

					</div>
				</div>
			)}
		</div>
	);
};

export default App;
