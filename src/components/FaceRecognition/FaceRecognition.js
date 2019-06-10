import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( { imageUrl , box }) =>{
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
			<img alt='user chosen input'src={imageUrl} id='inputimage' width='500px' height='auto'/>
			<div className='bounding-box' style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
			</div>
		</div>
		);
}

export default FaceRecognition;