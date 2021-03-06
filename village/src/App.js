import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then((response) =>
        this.setState(() => ({
          smurfs: response.data,
        }))
      )
      .catch((error) => console.error('Server Error', error));
  }

  postSmurf = (newSmurf) => {
    axios.post('http://localhost:3333/smurfs', newSmurf).then((response) => {
      this.setState({
        smurfs: response.data,
      });
    });
  };

  deleteSmurf = (event, id) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then((response) => {
        this.setState({ smurfs: response.data });
      })
      .catch((error) => console.error('Server Error', error));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">
            <span>Smurfs</span>
          </Link>
          <Link to="/smurf-form">
            <span>Add Smurf</span>
          </Link>
        </nav>
        <Route
          path="/smurf-form"
          render={(props) => (
            <SmurfForm
              {...props}
              smurfs={this.state.smurfs}
              postSmurf={this.postSmurf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
