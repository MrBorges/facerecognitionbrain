import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      box: {},
      route:'signin',
      isSignedIn: false
    }

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('width: ',width,'height: ',height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) =>{    
    this.setState({box: box});
  }


  onInputChange = (event) => {      
    this.setState({input: event.target.value})
    return event.target.value;
  }

  onButtonSubmit = (event) =>{        
    this.setState( {imageUrl: this.state.input} )    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log('Eeerr... something broke',err))
  }

  onRouteChange = (route) =>{
    if (route === 'signout' || route === 'register') {
      this.setState( {isSignedIn: false} )
    } else if (route === 'home'){
      this.setState( {isSignedIn: true} )  
    }
    this.setState( {route: route} );
  }

  render (){
    return (
      <div>          
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
        
        { this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onButtonSubmit } />
                <FaceRecognition box={this.state.box} imageUrl= {this.state.imageUrl}/>
              </div>
            : (
               this.state.route === 'signin'
               ? <Signin onRouteChange = {this.onRouteChange} />
               : <Register onRouteChange = {this.onRouteChange} />
              )
        }

      </div>
    );
  }
}

export default App;
