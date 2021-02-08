import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const initState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignin: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageinput');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * imageWidth,
      toprow: clarifaiFace.top_row * imageHeight,
      rightcol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomrow: imageHeight - (clarifaiFace.bottom_row * imageHeight),
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input}) 
      fetch("http://localhost:3000/imageurl", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
        .then(response => response.json())
        .then(response => {
          if(response) {
            fetch("http://localhost:3000/image", {
              method: "PUT",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
              .catch(err => console.log(err))
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignin: true})
    } else if (route === 'signout') {
      this.setState(initState)
    }
    this.setState({route: route})
  }

  render() {
    const { isSignin, route, box, imageUrl, user } = this.state;
    return (
      <div className='App'>
        <Navigation isSignin={isSignin} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank user={user} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit}
                />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (route === 'signin' || route === 'signout'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )         
        }
      </div>
    );
  }
}

export default App;
