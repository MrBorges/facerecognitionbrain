import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';

  const app = new Clarifai.App({
   apiKey: 'b2b2838ced0b4137b9cb4859657f8b3f'
  });


class App extends Component {

  constructor(){   // we use this constructor to create a state in the app component
    super(); // so we can use 'this.'
    this.state = {
      input: '',
      imageUrl: '',
    }

  }


  onInputChange = (event) => {  
    console.log(event.target.value);
    this.setState({input: event.target.value})
    return event.target.value;
  }

  onButtonSubmit = (event) =>{        
    this.setState( {imageUrl: this.state.input} )
    console.log('Clicked');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
      console.log('Something broke', err);

    }
    );
  }

  render (){
    return (
      <div>      
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onButtonSubmit } />
        <FaceRecognition imageUrl= {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
