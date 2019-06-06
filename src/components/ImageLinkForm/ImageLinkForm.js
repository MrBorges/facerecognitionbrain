import React from 'react';
//import './ImageLinkForm.css';

const ImageLinkForm = () =>{
	return (
		<div>		
			<p className='f3 center'>
				{'This magic brain will detect faces.'}	
			</p>
			<div className='center pa4 br3 shadow-5 w-80'>
				<input className='f4 pa2 w-70 center' type='text'/>
				<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>{'Detect'}</button>
			</div>
		</div>
		);
}

export default ImageLinkForm;